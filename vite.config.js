import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/certificate_create/',
    plugins: [react()],
    build: {
        outDir: 'build'
    }
})
