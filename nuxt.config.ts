import tailwindcss from '@tailwindcss/vite'

const sw = process.env.SW === 'true'
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
  modules: ['@nuxtjs/google-fonts'],
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
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
      ],
      link: [
        {
          rel: 'manifest',
          href: '/manifest.json',
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon-180x180.png',
        },
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
      ],
      script: [
        {
          innerHTML: `
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
              document.documentElement.classList.add('dark');
            }
          `,
          async: false,
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
})
