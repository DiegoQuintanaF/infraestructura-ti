import { VitePluginConfig, vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

installGlobals()

const remixConfig: VitePluginConfig = {
  basename: '/',
  buildDirectory: 'dist',
  ignoredRouteFiles: ['**/*.css'],
  routes(defineRoutes) {
    return defineRoutes((route) => {
      route('/cartelera', 'routes/__index.tsx', { index: true })
      route('login', 'routes/login/index.tsx')
      route('purchases', 'routes/purchases/index.tsx', () => {
        route(':purchaseId', 'routes/purchases/$purchaseId/index.tsx')
      })
      route('checkout', 'routes/checkout/index.tsx')
      route('register', 'routes/register/index.tsx')
      route('cartelera', 'routes/cartelera/layout.tsx', () => {
        route('', 'routes/cartelera/index.tsx', { index: true })
        route(':movieId', 'routes/cartelera/$movieId/index.tsx')
      })
    })
    // return defineRoutes((route) => {
    //   route('/', 'routes/__index.tsx', { index: true })
    //   route('login', 'routes/login/index.tsx')
    //   route('register', 'routes/register/index.tsx')
    //   route('cartelera', 'routes/cartelera/layout.tsx', () => {
    //     route('', 'routes/cartelera/index.tsx', { index: true })
    //     route(':movieId', 'routes/cartelera/$movieId/index.tsx')
    //   })
    // })
  },
  serverBuildFile: 'index.js'
}

export default defineConfig({
  plugins: [remix(remixConfig), tsconfigPaths()]
})
