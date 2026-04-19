set shell := ["zsh", "-lc"]

# ── Project config ──────────────────────────────────────
hostname := "quantum-ui"
port := "37412"

# ── Run commands ────────────────────────────────────────
# `just run dev`  → demo app + build:watch (downstream apps get live rebuilds)
# `just run prod` → production build + serve
# `just run`      → defaults to prod

run mode="prod": setup _puma-check
    #!/usr/bin/env bash
    set -euo pipefail
    trap 'kill 0' EXIT
    if [ "{{mode}}" = "dev" ]; then
        cd packages/ui && pnpm build:watch &
        cd apps/quantum-ui && pnpm dev --port {{port}} &
        wait
    else
        cd apps/quantum-ui && pnpm registry:build && pnpm build
        cd apps/quantum-ui && pnpm start --port {{port}}
    fi

# ── Setup ───────────────────────────────────────────────
setup:
    pnpm install
    pnpm --filter=shadcn build

# ── Build ───────────────────────────────────────────────
build-registry:
    cd apps/quantum-ui && pnpm registry:build

# ── Utilities ───────────────────────────────────────────
warm:
    #!/usr/bin/env zsh
    echo "Waiting for dev server on port {{port}}..."
    while ! curl -s -o /dev/null http://localhost:{{port}}; do sleep 0.5; done
    echo "Warming up routes..."
    routes=( \
        "/" \
        "/docs" \
        "/docs/components" \
        "/docs/installation" \
        "/charts/area" \
        "/charts/bar" \
        "/charts/line" \
        "/charts/pie" \
        "/examples/dashboard" \
        "/examples/tasks" \
        "/examples/playground" \
        "/examples/authentication" \
    )
    for r in "${routes[@]}"; do
        curl -s -o /dev/null "http://localhost:{{port}}${r}" &
    done
    wait
    echo "All routes warmed."

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
        echo "  → https://{{hostname}}.test"
    else
        echo "  → http://localhost:{{port}}"
        echo "  tip: install puma-dev for a friendly URL (brew install puma/puma/puma-dev)"
    fi
    echo ""
