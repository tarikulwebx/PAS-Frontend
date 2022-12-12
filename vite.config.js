import { fileURLToPath } from 'url'

import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import { createVuePlugin as vue2 } from 'vite-plugin-vue2'
// @ts-ignore
import vueTemplateBabelCompiler from 'vue-template-babel-compiler'
import scriptSetup from 'unplugin-vue2-script-setup/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5000,
  },
  preview: {
    port: 8080
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        cleanupOutdatedCaches: false
      },
      manifest: {
        "lang": "ja-JP",
        "name": "postal automation system",
        "short_name": "PAS",
        "description": "Postal automation system",
        "theme_color": "#000000",
        "background_color": "#000000",
        "display": "standalone",
        "start_url": "/",
        "scope": "/",
        "orientation": "any",
        "icons": [
          {
            "src": "img/icons/120x120.png",
            "sizes": "120x120",
            "type": "image/png"
          },
          {
            "src": "img/icons/180x180.png",
            "sizes": "180x180",
            "type": "image/png"
          },
          {
            "src": "img/icons/384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "img/icons/512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "img/icons/maskable-icon.png",
            "type": "image/png",
            "purpose": "any maskable"
          },
          {
            "src": "img/icons/maskable-icon-o.png",
            "type": "image/png",
            "purpose": "any maskable"
          }
        ]
      }
    }),
    vue2({
      jsx: true,
      vueTemplateOptions: {
        compiler: vueTemplateBabelCompiler
      }
    }),
    scriptSetup(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
