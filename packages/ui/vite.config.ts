import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

const v4Root = resolve(__dirname, '../../apps/v4')
const style = process.env.QUANTUM_UI_STYLE ?? 'coss-ui'
const registry = resolve(v4Root, `registry/${style}`)

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      rollupTypes: true,
      include: ['src', registry],
      exclude: [
        '**/data-table-filter-list.tsx',
        '**/data-table-filter-menu.tsx',
        '**/data-table-sort-list.tsx',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@/': `${v4Root}/`,
      '~ui/': `${registry}/`,
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
