import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

const v4Root = resolve(__dirname, '../../apps/v4')
const registry = resolve(v4Root, 'registry/new-york-v4/ui')

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ rollupTypes: true, include: ['src', registry] }),
  ],
  resolve: {
    alias: {
      '@/': `${v4Root}/`,
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
