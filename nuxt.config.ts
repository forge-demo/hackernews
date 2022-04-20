import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  head: {
    titleTemplate: 'Nuxt HN | %s',
    meta: [
      { property: 'og:image', content: 'https://user-images.githubusercontent.com/904724/58238637-f189ca00-7d47-11e9-8213-ae072d7cd3aa.png' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:site', content: '@nuxt_js' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/icon.png' },
      { rel: 'dns-prefetch', href: 'https://api.hackerwebapp.com' },
      { rel: 'preconnect', href: 'https://api.hackerwebapp.com' }
    ]
  },

  loading: {
    color: '#00C48D'
  },

  manifest: {
    name: 'Nuxt Hacker News',
    short_name: 'Nuxt HN',
    description: 'HackerNews clone built with Nuxt3',
    theme_color: '#2F495E',
    start_url: '/news'
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/pwa'
  ],

  postcss: {
    plugins: {
      'postcss-nested': {}
    }
  },

  serverMiddleware: [
    '~/serverMiddleware/cacheHeader'
  ],

  experimental: {
    reactivityTransform: true,
    viteNode: true
  }
})
