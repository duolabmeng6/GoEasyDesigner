import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    optimizeDeps: {
        include: [
            './src/窗口/设计文件.json',
            './src/窗口/窗口事件.js',
            './src/窗口/辅助代码.js',
            './src/窗口/窗口事件.js',
        ]
    }
})
