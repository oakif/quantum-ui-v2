#!/usr/bin/env python3
"""PreToolUse: run `just finalize` before any agent-driven ship of the
repo, so `pkg/generated` and `pkg/dist` can't lag behind `ui/components`
when downstream consumers (which symlink to `pkg/`) read the package.

Triggers:
  - mcp__devtools-mcp__ship_it
  - mcp__devtools-mcp__ship_via_pr
  - Bash commands that perform a merge (`git merge ...`, `gh pr merge ...`)

If finalize succeeds, the original tool call proceeds. If it fails, the
hook exits non-zero with finalize's stderr surfaced to the agent so it
can diagnose.

Hook conventions used:
  - Read JSON event from stdin: {tool_name, tool_input, cwd, ...}
  - Exit 0  -> allow the tool call
  - Exit 2  -> deny; stderr becomes the agent-facing reason
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
from pathlib import Path

GATED_TOOLS = {
    "mcp__devtools-mcp__ship_it",
    "mcp__devtools-mcp__ship_via_pr",
}

# Bash subcommands that initiate a merge into another branch. Excludes
# `--abort`, `--continue`, `--quit`, dry-run-style flags, etc.
MERGE_RE = re.compile(
    r"(?:^|[\s;&|()])"
    r"(?:git\s+merge|gh\s+pr\s+merge)"
    r"(?![\w-])"
)
MERGE_NEGATIVE_RE = re.compile(r"--(?:abort|continue|quit)\b")


def should_gate(tool_name: str, tool_input: dict) -> bool:
    if tool_name in GATED_TOOLS:
        return True
    if tool_name == "Bash":
        command = tool_input.get("command") or ""
        if MERGE_RE.search(command) and not MERGE_NEGATIVE_RE.search(command):
            return True
    return False


def find_project_root(start: str) -> Path | None:
    """Walk up from `start` looking for the quantum-ui-v2 project root.

    Identified by the presence of `pkg/scripts/finalize.ts`. Worktrees and
    the main checkout both satisfy this. The hook never runs finalize from
    inside another project that happens to invoke ship tooling.
    """
    p = Path(start).resolve()
    for candidate in [p, *p.parents]:
        if (candidate / "pkg" / "scripts" / "finalize.ts").is_file():
            return candidate
    return None


def main() -> int:
    try:
        event = json.load(sys.stdin)
    except Exception:
        return 0  # malformed input: don't get in the way

    tool_name = event.get("tool_name") or ""
    tool_input = event.get("tool_input") or {}
    cwd = event.get("cwd") or os.getcwd()

    if not should_gate(tool_name, tool_input):
        return 0

    root = find_project_root(cwd)
    if root is None:
        # Not our project; pass through silently.
        return 0

    print(f"finalize-gate: running `just finalize` in {root}...", file=sys.stderr)
    result = subprocess.run(
        ["just", "finalize"],
        cwd=str(root),
        capture_output=True,
        text=True,
    )

    if result.returncode == 0:
        print("finalize-gate: ok", file=sys.stderr)
        return 0

    # Surface finalize's output as the denial reason so the agent can fix it.
    sys.stderr.write(
        "blocked: `just finalize` failed. pkg/generated or pkg/dist is out\n"
        "of sync with ui/components and a ship would leave downstream consumers\n"
        "(symlinked to pkg/) on a stale API. fix the build, run `just finalize`\n"
        "manually to confirm, then retry the ship.\n\n"
        f"---- finalize stdout ----\n{result.stdout}\n"
        f"---- finalize stderr ----\n{result.stderr}\n"
    )
    return 2


if __name__ == "__main__":
    sys.exit(main())
