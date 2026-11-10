import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: process.env.GH_PAGES ? '/qtz/' : '/',
  server: {
    port: 7100,
  },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      spa: { enabled: true },
      prerender: {
        enabled: true,
        crawlLinks: false,
        pages: [
          { path: '/' },
          { path: '/login' },
          { path: '/signup' },
          { path: '/pricing' },
          { path: '/enterprise' },
          { path: '/search/jobs' },
          { path: '/search/talent' },
          { path: '/dashboard' },
          { path: '/messages' },
          { path: '/post-job' },
        ],
      },
    }),
    viteReact(),
  ],
})
