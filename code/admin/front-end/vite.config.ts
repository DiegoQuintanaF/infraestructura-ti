import { VitePluginConfig, vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

installGlobals()

const remixConfig: VitePluginConfig = {
  basename: '/',
  buildDirectory: 'dist',
  ignoredRouteFiles: ['**/*.css'],
  serverBuildFile: 'index.js'
}

export default defineConfig({
  plugins: [remix(remixConfig), tsconfigPaths()]
})
