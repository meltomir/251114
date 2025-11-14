// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/251114/',      // ← リポ名に合わせる（必須）
  build: { outDir: 'docs' },  // ← Pages で docs を公開
  plugins: [react({ babel: { plugins: [['babel-plugin-react-compiler']] } })],
})
