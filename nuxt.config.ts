// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    // Server-only: rextester proxy (no key needed, but useful to toggle)
    rextesterUrl: 'https://rextester.com/rundotnet/api',
    public: {
      appName: 'R//LEARN',
    }
  },

  nitro: {
    routeRules: {
      '/api/**': { cors: true }
    }
  },

  app: {
    head: {
      title: 'R//LEARN — Plataforma Interactiva de R',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Aprende programación en R con ejercicios interactivos aplicados a química' }
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Share+Tech+Mono&display=swap'
        }
      ]
    }
  },

  compatibilityDate: '2024-04-03'
})
