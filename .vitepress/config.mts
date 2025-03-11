import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nekro Agent 文档站",
  description: "更智能、更优雅的代理执行 AI",
  head: [
    ['link', { rel: 'icon', href: 'https://img.picui.cn/free/2025/03/10/67ce9955d9600.png' }],
    ['meta', { name: 'keywords', content: 'NekroAgent AI,NekroAgent,nekroagent,nekro agent,Neko,neko,agent,Agent,Nekro,nekro-agent,AI 代理系统,智能自动化工具,AI 助手,自主智能代理,AI任务执行,机器学习代理,AI 任务管理,自动化AI解决方案,AI 智能决策,文档站搭建,文档管理系统,静态文档站,VitePress 文档,文档网站优化,Markdown 文档站,API文档管理,技术文档站,开发者文档' }],
    ['meta', { name: 'description', content: 'Nekro Cloud 文档站 | Nekro Agent 更智能、更优雅的代理执行' }],
    ['meta', { name: 'robots', content: 'all' }],
    ['meta', { name: 'revisit-after', content: '1 days' }],
    ['meta', { name: 'msvalidate.01', content: 'D97C6AD736A2167C559A3848690C857E' }],
    ['meta', { name: 'google-site-verification', content: '4UhKgVLa3cPvgaPx-lyNnzdg6XVEAGIC4gueoQ81gF4' }]
  ],
  
  sitemap: {
    hostname: 'https://doc.nekro.cloud'
  },
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '部署文档', link: '/docs_zh/Deploy/Quick_Start' },
      { text: '开发文档', link: '/docs_zh/Dev/Dev_deploy_linux' },
      { text: '加入社群', link: 'https://qm.qq.com/q/eT30LxDcSA' }
    ],
    
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: '开始了解 Nekro Agent', link: '/docs_zh/home' },
          { text: '快速开始', link: '/docs_zh/Deploy/Quick_Start' },
          { text: '升级Nekro Agent', link: '/docs_zh/updata' },
          { text: '基础命令', link: '/docs_zh/command' },
          { text: '常见问题', link: '/docs_zh/QA' },
          { text: '贡献列表', link: '/docs_zh/Contribution_list' },
          { text: '开发部署', link: '/docs_zh/Dev/Dev_deploy_linux' },
          { text: '开发部署 for Windows', link: '/docs_zh/Dev/Dev_deploy_win' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/KroMiose/nekro-agent' }
    ]
  }
})
