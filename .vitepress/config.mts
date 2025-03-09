import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nekro Agent",
  description: "更智能、更优雅的代理执行 AI",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '部署文档', link: '/dosc/部署/Quick_Start' },
      { text: '开发文档', link: '/dosc/开发/Extension_Development' },
      { text: '加入社群', link: 'https://qm.qq.com/q/eT30LxDcSA' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: '开始了解 Nekro Agent', link: '/dosc/home' },
          { text: '快速开始', link: '/dosc/部署/Quick_Start' },
          { text: '升级Nekro Agent', link: '/dosc/updata' },
          { text: '基础命令', link: '/dosc/command' },
          { text: '常见问题', link: '/dosc/QA' },
          { text: '贡献列表', link: '/dosc/Contribution_list' },
          { text: '开发文档', link: '/dosc/开发/Extension_Development' }
        ]

      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/KroMiose/nekro-agent' }
    ]
  }
})
