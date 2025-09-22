import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import { copyFileSync, existsSync } from 'fs'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.build.json',
    }),
    {
      name: 'copy-styles-declaration',
      writeBundle() {
        const srcPath = resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/styles.d.ts')
        const destPath = resolve(fileURLToPath(new URL('.', import.meta.url)), 'dist/styles.d.ts')
        if (existsSync(srcPath)) {
          copyFileSync(srcPath, destPath)
          console.log('✓ Copied src/styles.d.ts to dist/styles.d.ts')
        }
      },
    },
  ],
  build: {
    lib: {
      entry: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/index.ts'),
      name: 'NowpaymentsComponents',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-hook-form'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-hook-form': 'ReactHookForm',
        },
        assetFileNames: assetInfo => {
          if (assetInfo.names?.[0] === 'style.css') return 'index.css'
          return assetInfo.names?.[0] || 'asset'
        },
      },
    },
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@/hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@/types': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@/utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@/styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
    },
  },
})