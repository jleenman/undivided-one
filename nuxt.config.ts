export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ssr: true,
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover' },
        { name: 'theme-color', content: '#0b0b09' },
      ],
      link: [{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    },
  },
  nitro: {
    preset: 'github_pages',
    prerender: {
      routes: [
        '/',
        '/nl',
        '/en',
        '/nl/start',
        '/en/start',
        '/nl/question',
        '/en/question',
        '/nl/argument',
        '/en/argument',
        '/nl/essay',
        '/en/essay',
        '/nl/confession',
        '/en/confession',
      ],
    },
  },
  typescript: {
    strict: true,
    typeCheck: false,
  },
})
