import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Using './' ensures assets are loaded relatively, making the app work
  // on both root domains (example.com) and subdirectories (example.com/my-app)
  // without needing manual configuration changes.
  base: './',
})