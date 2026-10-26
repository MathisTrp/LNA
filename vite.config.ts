import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' : le build fonctionne aussi bien en local que sur un hébergement statique (GitHub Pages, Netlify…)
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
