// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/251114/',        // ← リポ名
  build: { outDir: 'docs' }, // ← GitHub Pages で配信するフォルダ
  plugins: [react({ babel: { plugins: [['babel-plugin-react-compiler']] } })],
})
