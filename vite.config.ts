import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app/static/stat/[name].[hash].js',
        chunkFileNames: 'assets/app/static/stat/[name].[hash].js',
        assetFileNames: 'assets/app/static/stat/[name].[hash].[ext]'
      }
    },
  },
})
