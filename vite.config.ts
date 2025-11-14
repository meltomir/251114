// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ★ ここだけ大事：base はリポ名に合わせて "/251114/"
export default defineConfig({
  base: '/251114/',
  build: { outDir: 'docs' }, // ← ビルド先を docs に
  plugins: [
    react({
      babel: { plugins: [['babel-plugin-react-compiler']] },
    }),
  ],
})
