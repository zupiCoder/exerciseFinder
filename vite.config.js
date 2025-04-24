import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
export const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
