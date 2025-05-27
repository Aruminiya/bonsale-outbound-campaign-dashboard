import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5100,
    allowedHosts: ['131a-125-229-185-153.ngrok-free.app'],
  },
  
})
