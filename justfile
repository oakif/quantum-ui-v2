set shell := ["zsh", "-lc"]

setup:
  pnpm install
  pnpm --filter=shadcn build

run-dev:
  cd apps/quantum-ui-v2 && pnpm dev

run:
  cd apps/quantum-ui-v2 && pnpm registry:build && pnpm build && pnpm start

build-registry:
  cd apps/quantum-ui-v2 && pnpm registry:build
