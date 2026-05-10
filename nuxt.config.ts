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
  modules: ['@nuxtjs/google-fonts'],
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
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
