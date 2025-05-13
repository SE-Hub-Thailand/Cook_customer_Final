import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isDev = process.env.NODE_ENV !== 'production'

export default defineConfig({
  plugins: [react()],
  ...(isDev && {
    server: {
      port: 5173,
      host: true,
      strictPort: true,
      origin: 'https://8990-2001-fb1-40-a08f-e54a-988c-b3a9-3cdd.ngrok-free.app',
      hmr: {
        protocol: 'wss',
        host: '8990-2001-fb1-40-a08f-e54a-988c-b3a9-3cdd.ngrok-free.app',
        clientPort: 443
      },
      proxy: {
        '/api': {
          target: 'https://cookkeptuser.sehub-thailand.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }),
  optimizeDeps: {
    include: ['leaflet', 'react', 'react-dom', '@line/liff']
  }
})

// https://vitejs.dev/config/
// export default defineConfig({
//   // server: {
//   //   port: 3000, // กำหนดพอร์ตที่ต้องการ
//   // },
//     plugins: [react()],
//   })

// import react from '@vitejs/plugin-react'
// import { defineConfig } from 'vite'
// import fs from 'fs'
// import path from 'path'

// export default defineConfig({
//   server: {
//     https: {
//       key: '/root/Cook_lineOA/key.pem',
//       cert: '/root/Cook_lineOA/cert.pem',
//     },
//     host: true,  // หรือใช้ '--host' ก็ได้
//     port: 5173,  // คุณสามารถเปลี่ยน port ได้ถ้าต้องการ
//   },
//   plugins: [react()],
// })
