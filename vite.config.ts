import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ここの base は “リポジトリ名/” に必ず合わせる
export default defineConfig({
  base: '/251114/',
  build: { outDir: 'docs' },  // Pages の公開フォルダ
  plugins: [
    react({
      babel: { plugins: [['babel-plugin-react-compiler']] },
    }),
  ],
})
