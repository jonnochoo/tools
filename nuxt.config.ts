// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  devServer: {
    port: 3002,
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },
  googleFonts: {
    families: {
      'Hubot Sans': true,
      'DM Sans': [300, 400, 500, 700],
      'JetBrains Mono': [400, 500],
    },
  },
})
