import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './', // 👈 THIS IS THE CRITICAL FIX! Tells Vite to use relative paths.
  plugins: [react()],
})