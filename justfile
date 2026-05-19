set shell := ["zsh", "-lc"]

# ── Project config ──────────────────────────────────────
hostname := "quantum-ui"
port := "37412"

# ── Run commands ────────────────────────────────────────
# `just run dev`  → build styles (watch) + demo app + pkg build:watch
# `just run prod` → build styles + build pkg + demo build + serve
# `just run`      → defaults to prod

run mode="prod": setup _puma-check
    #!/usr/bin/env bash
    set -euo pipefail
    trap 'kill 0' EXIT
    if [ "{{mode}}" = "dev" ]; then
        npx tsx pkg/scripts/build-styles.ts --watch &
        cd pkg && pnpm build:watch &
        cd demo && pnpm dev --port {{port}} &
        wait
    else
        npx tsx pkg/scripts/build-styles.ts
        cd pkg && pnpm build
        cd demo && pnpm build && pnpm start --port {{port}}
    fi

# ── Setup ──────────────────────────────────────��────────
setup:
    pnpm install

# ── Build ───────────────────────────────────────────────
build-styles:
    npx tsx pkg/scripts/build-styles.ts

# ── Finalize ────────────────────────────────────────────
# Sync ui/components -> pkg/generated, rebuild pkg/dist, verify exports.
# Run before shipping a ticket that touched ui/components/, so downstream
# consumers (which symlink to pkg/) see the new API.
finalize:
    npx tsx pkg/scripts/finalize.ts

# ── puma-dev integration ────────────────────────────────
_puma-check:
    #!/usr/bin/env bash
    echo ""
    if command -v puma-dev &>/dev/null; then
        puma_file="$HOME/.puma-dev/{{hostname}}"
        if [ -f "$puma_file" ]; then
            current=$(cat "$puma_file")
            if [ "$current" != "{{port}}" ]; then
                echo "  ⚠  ~/.puma-dev/{{hostname}} points to port $current (expected {{port}})"
                exit 1
            fi
        else
            echo "{{port}}" > "$puma_file"
        fi
        echo "  �� https://{{hostname}}.test"
    else
        echo "  → http://localhost:{{port}}"
        echo "  tip: install puma-dev for a friendly URL (brew install puma/puma/puma-dev)"
    fi
    echo ""
