/**
 * Brings pkg/generated and pkg/dist back in sync with ui/components.
 *
 * Steps:
 *   1. Sync ui/components/* -> pkg/generated/<style>/* via build-styles.
 *   2. Rebuild pkg/dist via vite.
 *   3. Verify every named export from ui/components is present in
 *      pkg/dist/index.d.ts. Fail with a list of missing names if not.
 *
 * Why this exists: downstream consumers (e.g. an `anki` checkout)
 * symlink to `pkg/` and read `dist/` directly. When the agent edits
 * ui/components but forgets to rebuild, downstream sees stale API.
 *
 * Usage:
 *   npx tsx pkg/scripts/finalize.ts
 *   just finalize
 *   pnpm finalize
 */

import { execSync } from 'node:child_process'
import * as fs from 'node:fs'
import * as path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '../..')
const UI_COMPONENTS = path.join(ROOT, 'ui/components')
const DIST_DTS = path.join(ROOT, 'pkg/dist/index.d.ts')

function run(cmd: string): void {
  console.log(`> ${cmd}`)
  execSync(cmd, { stdio: 'inherit', cwd: ROOT })
}

/**
 * Extract named exports from a TS/TSX source. Handles:
 *   export { A, B, type C }
 *   export { A as B }
 *   export function/const/let/var/class/interface/type/enum X
 *   export declare function/const/... X    (from .d.ts)
 *
 * Skips re-exports without explicit names (`export * from ...`) and
 * default exports.
 */
function extract_exports(source: string): Set<string> {
  const names = new Set<string>()

  // Named export blocks: `export { A, B as C, type D }` (also `export type { ... }`)
  for (const match of source.matchAll(/export\s+(?:type\s+)?\{([^}]+)\}/g)) {
    for (const raw of match[1].split(',')) {
      const clean = raw.trim().replace(/^type\s+/, '')
      if (!clean) continue
      const alias_match = clean.match(/^\S+\s+as\s+(\S+)$/)
      const name = alias_match ? alias_match[1] : clean.split(/\s+/)[0]
      if (name) names.add(name)
    }
  }

  // Inline declarations: `export [declare] function|const|... X`
  const decl = /export\s+(?:declare\s+)?(?:function|const|let|var|class|interface|type|enum)\s+(\w+)/g
  for (const match of source.matchAll(decl)) {
    names.add(match[1])
  }

  return names
}

function collect_ui_exports(): Set<string> {
  const result = new Set<string>()

  if (!fs.existsSync(UI_COMPONENTS)) {
    throw new Error(`ui/components/ not found at ${UI_COMPONENTS}`)
  }

  for (const dir of fs.readdirSync(UI_COMPONENTS, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue
    const component_dir = path.join(UI_COMPONENTS, dir.name)
    for (const file of fs.readdirSync(component_dir)) {
      if (!file.endsWith('.tsx') && !file.endsWith('.ts')) continue
      const source = fs.readFileSync(path.join(component_dir, file), 'utf-8')
      for (const name of extract_exports(source)) {
        result.add(name)
      }
    }
  }

  return result
}

function collect_dist_exports(): Set<string> {
  const source = fs.readFileSync(DIST_DTS, 'utf-8')
  return extract_exports(source)
}

console.log('1/3  Syncing ui/components -> pkg/generated...')
run('npx tsx pkg/scripts/build-styles.ts')

console.log('\n2/3  Rebuilding pkg/dist...')
run('pnpm --filter=@oakif/quantum-ui build')

console.log('\n3/3  Verifying dist exports match ui/components...')
if (!fs.existsSync(DIST_DTS)) {
  console.error(`\nfail: ${DIST_DTS} does not exist after build`)
  process.exit(1)
}

const ui_exports = collect_ui_exports()
const dist_exports = collect_dist_exports()

const missing = [...ui_exports].filter((name) => !dist_exports.has(name)).sort()

if (missing.length > 0) {
  console.error(`\nfail: ${missing.length} export(s) in ui/components are missing from pkg/dist/index.d.ts:`)
  for (const name of missing) console.error(`  - ${name}`)
  console.error(`\nthe vite build likely failed silently or the entry doesn't re-export these.`)
  process.exit(1)
}

console.log(`ok: all ${ui_exports.size} ui/components exports present in dist/index.d.ts`)
