// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui', // don't add tailwindcss here, it's already added by @nuxt/ui
    '@vueuse/nuxt',
  ],

  imports: {
    dirs: [
      'utils/**',
    ],
  },

  devtools: { enabled: true },

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/cat.ico' },
      ],
    },
  },

  css: ['~/assets/main.css'],
  compatibilityDate: '2024-11-01',

  eslint: {
    config: {
      stylistic: true,
    },
  },

  image: {
    quality: 80,
  },
})
