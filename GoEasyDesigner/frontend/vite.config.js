import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import vueJsx from '@vitejs/plugin-vue-jsx'


// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: "0.0.0.0",
        hmr: {
            host: 'localhost',
            protocol: 'ws',
        }
    },
    preview: {
        host: "0.0.0.0",
        port: 3000,
    },
    publicDir: "public",
    plugins: [
        vue(),
        vueJsx(),
        AutoImport({
            imports: ['vue'],
            resolvers: [
                ElementPlusResolver(),

                // Auto import icon components
                // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon',
                }),
            ],
        }),
        Components({
            resolvers: [
                // Auto register icon components
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
                // Auto register Element Plus components
                // 自动导入 Element Plus 组件
                ElementPlusResolver(),
            ],
        }),

    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        // jsxInject: `import React from 'react'`,
    },
})
