import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// element-plus 自动按需引入配置
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

console.log(fileURLToPath(new URL('./src', import.meta.url)))

// https://vitejs.dev/config/
export default defineConfig({
    base: './', // 配置 build 路径问题
    plugins: [
        vue({
            template: {
                compilerOptions: {}
            }
        }),
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // -- 配置正向代理
    server: {
        host: '127.0.0.1',
        port: 5174, // -- 配置开发端口
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000', //目标服务器地址
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        target: 'esnext'
    }
})
