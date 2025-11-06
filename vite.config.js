import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.PUBLIC_BASE_PATH || "/",
  server:{
    port: process.env.PORT || 8080, 
    host: '0.0.0.0'
  }

})
