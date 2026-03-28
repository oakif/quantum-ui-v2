set shell := ["zsh", "-lc"]

run-dev:
  cd apps/quantum-ui-v2 && pnpm dev

build-registry:
  cd apps/quantum-ui-v2 && pnpm registry:build
