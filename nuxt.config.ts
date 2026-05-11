import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  devServer: {
    port: 3003,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['~/assets/css/globals.css'],
  modules: ['@nuxtjs/google-fonts', '@vite-pwa/nuxt'],
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'theme-color',
          media: '(prefers-color-scheme: light)',
          content: '#7c3aed',
        },
        {
          name: 'theme-color',
          media: '(prefers-color-scheme: dark)',
          content: '#a78bfa',
        },
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon-180x180.png',
        },
      ],
    },
  },
  googleFonts: {
    families: {
      'Hubot Sans': true,
      'DM Sans': [300, 400, 500, 700],
      'JetBrains Mono': [400, 500],
    },
  },
  pwa: {
    registerWebManifestInRouteRules: true,
    manifest: {
      name: 'The Shed',
      short_name: 'The Shed',
      description: 'A collection of useful browser tools',
      theme_color: '#7c3aed',
      background_color: '#f0f0f5',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/',
      icons: [
        { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
        { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600,
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
})
