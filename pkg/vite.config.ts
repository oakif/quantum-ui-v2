import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

const style = process.env.QUANTUM_UI_STYLE ?? 'coss'
const generatedDir = resolve(__dirname, `generated/${style}`)
const uiDir = resolve(__dirname, '../ui')

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      rollupTypes: true,
      include: ['src', generatedDir],
    }),
  ],
  resolve: {
    alias: {
      '~ui/': `${generatedDir}/`,
      '@ui/': `${uiDir}/`,
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
