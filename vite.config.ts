import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
        }

    },
    server: {
        port: 5173,
        host: true,
        open: true,
        proxy: {
            // https://cn.vitejs.dev/config/#server-proxy
            '/dev': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (p) => p.replace(/^\/dev/, '')
            }
        }
    },
    css: {
        postcss: {
            plugins: [
                {
                    postcssPlugin: 'internal:charset-removal',
                    AtRule: {
                        charset: (atRule) => {
                            if (atRule.name === 'charset') {
                                atRule.remove();
                            }
                        }
                    }
                }
            ]
        }
    }

})
