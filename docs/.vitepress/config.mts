import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "肖先森",
  description: "...",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Interview', link: '/interview/AsyncAwait' },
      { text: 'Vue', link: '/vue/index' },
      { text: 'Javascript', link: '/javascript/weekmap' },

    ],

    sidebar: {
      '/javascript/':[
        {
          text:'基础知识',
          collapsed: false,
          items: [
            { text: 'WeekMap', link: '/javascript/weekmap' },
          ]
        }
      ],
      '/interview/':[
        {
          text:'手写题目',
          collapsed: false,
          items: [
            { text: 'AsyncAwait', link: '/interview/AsyncAwait' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
