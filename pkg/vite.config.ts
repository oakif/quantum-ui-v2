import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { defineConfig, type Plugin } from 'vite'

const style = process.env.QUANTUM_UI_STYLE ?? 'coss'
const generatedDir = resolve(__dirname, `generated/${style}`)
const uiDir = resolve(__dirname, '../ui')
const upstreamDir = resolve(__dirname, '../upstream')
const cossUiDir = resolve(upstreamDir, 'registry/coss-ui')

// Resolves ~ui/ imports: try generated dir first, fall back to legacy coss-ui
function uiResolverPlugin(): Plugin {
  return {
    name: 'ui-resolver',
    resolveId(source) {
      if (!source.startsWith('~ui/')) return null
      const rel = source.slice(4)

      const exts = ['.tsx', '.ts', '/index.ts', '/index.tsx']
      // Also check component-name/component-name.tsx pattern
      const basename = rel.split('/').pop() ?? rel
      const componentExts = [`/${basename}.tsx`, `/${basename}.ts`, ...exts]

      for (const ext of componentExts) {
        const genPath = resolve(generatedDir, rel + ext)
        if (existsSync(genPath)) return genPath
      }

      for (const ext of ['.tsx', '.ts']) {
        const legacyPath = resolve(cossUiDir, rel + ext)
        if (existsSync(legacyPath)) return legacyPath
      }

      return null
    },
  }
}

export default defineConfig({
  plugins: [
    uiResolverPlugin(),
    react(),
    tailwindcss(),
    dts({
      rollupTypes: true,
      include: ['src', generatedDir, cossUiDir],
    }),
  ],
  resolve: {
    alias: {
      '@ui/': `${uiDir}/`,
      '@/': `${upstreamDir}/`,
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'QuantumUI',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
    cssCodeSplit: false,
  },
})
