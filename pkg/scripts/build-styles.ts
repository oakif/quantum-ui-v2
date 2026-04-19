/**
 * Simple build script for quantum-ui component styles.
 *
 * Reads component TSX files with cn-* semantic tokens,
 * reads per-component CSS style files that map those tokens to Tailwind classes,
 * and outputs fully-styled components.
 *
 * Usage:
 *   npx tsx pkg/scripts/build-styles.ts [--watch]
 */

import * as fs from 'node:fs'
import * as path from 'node:path'

const UI_DIR = path.resolve(import.meta.dirname, '../../ui')
const COMPONENTS_DIR = path.join(UI_DIR, 'components')
const DIST_DIR = path.resolve(import.meta.dirname, '../generated')

type StyleMap = Record<string, string>

function create_style_map(css_content: string): StyleMap {
  const result: StyleMap = {}

  // Parse CSS rules like: .cn-switch { @apply ...; }
  // Matches: .cn-name { ... } blocks, extracting @apply directives
  const rule_regex = /\.(cn-[\w-]+)\s*\{([^}]*)\}/g
  let match: RegExpExecArray | null

  while ((match = rule_regex.exec(css_content)) !== null) {
    const class_name = match[1]
    const body = match[2]

    // Extract @apply values
    const apply_regex = /@apply\s+([^;]+);/g
    const tailwind_classes: string[] = []
    let apply_match: RegExpExecArray | null

    while ((apply_match = apply_regex.exec(body)) !== null) {
      tailwind_classes.push(apply_match[1].trim())
    }

    if (tailwind_classes.length > 0) {
      const classes = tailwind_classes.join(' ')
      result[class_name] = result[class_name]
        ? `${classes} ${result[class_name]}`
        : classes
    }
  }

  return result
}

function resolve_imports(css_content: string, css_file_path: string): string {
  return css_content.replace(/@import\s+['"](.+?)['"]\s*;/g, (_match, import_path) => {
    const resolved = path.resolve(path.dirname(css_file_path), import_path)
    if (fs.existsSync(resolved)) {
      const imported = fs.readFileSync(resolved, 'utf-8')
      return resolve_imports(imported, resolved)
    }
    console.warn(`  warning: could not resolve import ${import_path}`)
    return ''
  })
}

function apply_style_map(tsx_content: string, style_map: StyleMap): string {
  // Replace cn-* tokens in string literals with their Tailwind equivalents
  let result = tsx_content.replace(/\bcn-[\w-]+\b/g, (token) => {
    const replacement = style_map[token]
    if (replacement) return replacement
    console.warn(`  warning: no style mapping for ${token}`)
    return token
  })

  // Rewrite @ui/ imports to relative paths within generated output
  result = result.replace(
    /from ["']@ui\/lib\/([\w./-]+)["']/g,
    'from "../lib/$1"',
  )
  result = result.replace(
    /from ["']@ui\/components\/([\w./-]+)["']/g,
    'from "../$1"',
  )
  result = result.replace(
    /from ["']@ui\/hooks\/([\w./-]+)["']/g,
    'from "../hooks/$1"',
  )
  // Also handle @/ imports (legacy, from upstream data-table utils)
  result = result.replace(
    /from ["']@\/lib\/([\w./-]+)["']/g,
    'from "../lib/$1"',
  )
  result = result.replace(
    /from ["']@\/hooks\/([\w./-]+)["']/g,
    'from "../hooks/$1"',
  )

  return result
}

function copy_tree(src: string, dest: string) {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const src_path = path.join(src, entry.name)
    const dest_path = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copy_tree(src_path, dest_path)
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
      // Rewrite imports in TS files
      const content = fs.readFileSync(src_path, 'utf-8')
      fs.writeFileSync(dest_path, apply_style_map(content, {}))
    } else {
      fs.copyFileSync(src_path, dest_path)
    }
  }
}

function copy_supporting_files(style_name: string) {
  copy_tree(path.join(UI_DIR, 'lib'), path.join(DIST_DIR, style_name, 'lib'))
  copy_tree(path.join(UI_DIR, 'hooks'), path.join(DIST_DIR, style_name, 'hooks'))
}

function discover_styles(): string[] {
  const styles = new Set<string>()
  const component_dirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())

  for (const dir of component_dirs) {
    const files = fs.readdirSync(path.join(COMPONENTS_DIR, dir.name))
    for (const file of files) {
      if (file.endsWith('.css') && !file.startsWith('_')) {
        styles.add(file.replace('.css', ''))
      }
    }
  }

  return [...styles].sort()
}

function build_component(component_name: string, style_name: string): boolean {
  const component_dir = path.join(COMPONENTS_DIR, component_name)
  const css_file = path.join(component_dir, `${style_name}.css`)

  if (!fs.existsSync(css_file)) {
    // No style file for this component+style combo; copy files with import rewriting only
    const tsx_files = fs.readdirSync(component_dir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'))
    const out_dir = path.join(DIST_DIR, style_name, component_name)
    fs.mkdirSync(out_dir, { recursive: true })

    for (const tsx_file of tsx_files) {
      const content = fs.readFileSync(path.join(component_dir, tsx_file), 'utf-8')
      fs.writeFileSync(path.join(out_dir, tsx_file), apply_style_map(content, {}))
    }
    return true
  }

  // Read and resolve CSS imports
  const raw_css = fs.readFileSync(css_file, 'utf-8')
  const resolved_css = resolve_imports(raw_css, css_file)
  const style_map = create_style_map(resolved_css)

  // Process all TSX files in the component directory
  const tsx_files = fs.readdirSync(component_dir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'))
  const out_dir = path.join(DIST_DIR, style_name, component_name)
  fs.mkdirSync(out_dir, { recursive: true })

  for (const tsx_file of tsx_files) {
    const tsx_content = fs.readFileSync(path.join(component_dir, tsx_file), 'utf-8')
    const styled_content = apply_style_map(tsx_content, style_map)
    fs.writeFileSync(path.join(out_dir, tsx_file), styled_content)
  }

  return true
}

function generate_index(style_name: string) {
  const style_dir = path.join(DIST_DIR, style_name)
  if (!fs.existsSync(style_dir)) return

  const component_dirs = fs.readdirSync(style_dir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))

  const exports: string[] = []

  for (const dir of component_dirs) {
    const tsx_files = fs.readdirSync(path.join(style_dir, dir.name))
      .filter(f => f.endsWith('.tsx') || f.endsWith('.ts'))

    for (const tsx_file of tsx_files) {
      const file_path = path.join(style_dir, dir.name, tsx_file)
      const content = fs.readFileSync(file_path, 'utf-8')

      // Extract named exports: "export { X, Y }", "export function X", "export const X", "export type X"
      const names: string[] = []

      // export { X, Y, Z }
      for (const match of content.matchAll(/export\s+\{([^}]+)\}/g)) {
        names.push(...match[1].split(',').map(n => n.trim()).filter(Boolean))
      }

      // export function X, export const X, export type X
      for (const match of content.matchAll(/export\s+(?:function|const|type)\s+(\w+)/g)) {
        const name = match[1]
        if (!names.includes(name)) names.push(name)
      }

      if (names.length > 0) {
        const rel_path = `./${dir.name}/${tsx_file.replace('.tsx', '')}`
        exports.push(`export { ${names.join(', ')} } from '${rel_path}'`)
      }
    }
  }

  fs.writeFileSync(
    path.join(style_dir, 'index.ts'),
    exports.join('\n') + '\n',
  )
}

function build_all() {
  const styles = discover_styles()
  const component_dirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)

  console.log(`styles: ${styles.join(', ')}`)
  console.log(`components: ${component_dirs.join(', ')}`)

  // Clean dist
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true })
  }

  for (const style of styles) {
    console.log(`\nbuilding style: ${style}`)
    copy_supporting_files(style)
    console.log('  lib/ + hooks/ copied')
    for (const component of component_dirs) {
      process.stdout.write(`  ${component}...`)
      build_component(component, style)
      console.log(' done')
    }
    generate_index(style)
    console.log(`  index.ts generated`)
  }

  console.log('\nbuild complete')
}

// Watch mode
if (process.argv.includes('--watch')) {
  build_all()
  console.log('\nwatching for changes...')

  const debounce_timers = new Map<string, NodeJS.Timeout>()

  for (const dir of [COMPONENTS_DIR, path.join(UI_DIR, 'styles')]) {
    fs.watch(dir, { recursive: true }, (_event, filename) => {
      if (!filename) return
      const key = filename.toString()

      const existing = debounce_timers.get(key)
      if (existing) clearTimeout(existing)

      debounce_timers.set(key, setTimeout(() => {
        debounce_timers.delete(key)
        console.log(`\nchange detected: ${key}`)
        build_all()
      }, 100))
    })
  }
} else {
  build_all()
}
