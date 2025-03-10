import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nekro Agent 文档站",
  description: "更智能、更优雅的代理执行 AI",
  head: [
    ['link', { rel: 'icon', href: 'https://img.picui.cn/free/2025/03/10/67ce9955d9600.png' }],
    ['meta', { name: 'msvalidate.01', content: 'D97C6AD736A2167C559A3848690C857E' }],
    ['meta', { name: 'google-site-verification', content: '4UhKgVLa3cPvgaPx-lyNnzdg6XVEAGIC4gueoQ81gF4' }]
  ],
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
