set shell := ["zsh", "-lc"]

setup:
  pnpm install
  pnpm --filter=shadcn build

run-dev:
  cd apps/quantum-ui && pnpm dev

run:
  cd apps/quantum-ui && pnpm registry:build && pnpm build && pnpm start

warm port="4000":
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

build-registry:
  cd apps/quantum-ui && pnpm registry:build
