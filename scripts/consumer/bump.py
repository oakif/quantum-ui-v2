#!/usr/bin/env python3
# Push the quantum-ui submodule's current branch + HEAD, then bump the
# consumer's submodule pointer to that SHA and commit. Run from the
# consumer's project root (where this submodule is checked out).

import subprocess
import sys
from pathlib import Path


def run(cmd: list[str], cwd: Path, capture: bool = False) -> str:
    result = subprocess.run(
        cmd,
        cwd=cwd,
        check=True,
        capture_output=capture,
        text=True,
    )
    return result.stdout.strip() if capture else ''


def main() -> int:
    consumer_root = Path.cwd()
    quantum_ui_root = Path(__file__).resolve().parent.parent.parent

    status = run(['git', 'status', '--porcelain'], cwd=quantum_ui_root, capture=True)
    if status:
        rel = quantum_ui_root.relative_to(consumer_root) if quantum_ui_root.is_relative_to(consumer_root) else quantum_ui_root
        print(f'submodule has uncommitted changes, commit them first inside {rel}/', file=sys.stderr)
        return 1

    try:
        branch = run(['git', 'symbolic-ref', '--short', 'HEAD'], cwd=quantum_ui_root, capture=True)
    except subprocess.CalledProcessError:
        branch = ''

    if branch:
        run(['git', 'push', 'origin', branch], cwd=quantum_ui_root)

    new_sha = run(['git', 'rev-parse', 'HEAD'], cwd=quantum_ui_root, capture=True)
    short = new_sha[:9]

    run(['git', 'add', str(quantum_ui_root)], cwd=consumer_root)
    run(['git', 'commit', '-m', f'bump `quantum-ui` submodule to {short}'], cwd=consumer_root)

    print(f'→ quantum-ui pointer bumped to {short}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
