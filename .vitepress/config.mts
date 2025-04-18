import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nekro Agent 文档站",
  description: "更智能、更优雅的代理执行 AI",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://img.picui.cn/free/2025/03/10/67ce9955d9600.png",
      },
    ],
    [
      "meta",
      {
        name: "keywords",
        content:
          "NekroAgent AI,NekroAgent,nekroagent,nekro agent,Neko,neko,agent,Agent,Nekro,nekro-agent,AI 代理系统,智能自动化工具,AI 助手,自主智能代理,AI任务执行,机器学习代理,AI 任务管理,自动化AI解决方案,AI 智能决策,文档站搭建,文档管理系统,静态文档站,VitePress 文档,文档网站优化,Markdown 文档站,API文档管理,技术文档站,开发者文档",
      },
    ],
    [
      "meta",
      {
        name: "description",
        content: "Nekro Cloud 文档站 | Nekro Agent 更智能、更优雅的代理执行",
      },
    ],
    ["meta", { name: "robots", content: "all" }],
    ["meta", { name: "revisit-after", content: "1 days" }],
    [
      "meta",
      { name: "msvalidate.01", content: "D97C6AD736A2167C559A3848690C857E" },
    ],
    [
      "meta",
      {
        name: "google-site-verification",
        content: "4UhKgVLa3cPvgaPx-lyNnzdg6XVEAGIC4gueoQ81gF4",
      },
    ],
  ],

  sitemap: {
    hostname: "https://doc.nekro.ai",
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      {
        text: "贡献文档",
        link: "https://github.com/KroMiose/nekro-agent-doc/issues/new/choose",
      },
      { text: "加入社群", link: "https://qm.qq.com/q/eT30LxDcSA" },
    ],

    sidebar: {
      "/docs/": [
        {
          text: "快速了解",
          collapsed: true,
          items: [
            { text: "概览", link: "/docs/01_intro/overview" },
            { text: "应用场景", link: "/docs/01_intro/application_scenarios" },
          ],
        },
        {
          text: "快速开始",
          collapsed: true,
          items: [
            { text: "快速开始", link: "/docs/02_quick_start/quickstart" },
            {
              text: "快速部署",
              collapsed: true,
              items: [
                {
                  text: "Linux 部署教程",
                  link: "/docs/02_quick_start/deploy/linux",
                },
                {
                  text: "Windows 部署教程",
                  link: "/docs/02_quick_start/deploy/windows",
                },
                {
                  text: "MacOS 部署教程",
                  link: "/docs/02_quick_start/deploy/macos",
                },
              ],
            },
            {
              text: "基本配置",
              collapsed: true,
              items: [
                {
                  text: "协议端配置",
                  link: "/docs/02_quick_start/config/protocol",
                },
                {
                  text: "系统配置",
                  link: "/docs/02_quick_start/config/system",
                },
                {
                  text: "应用更新",
                  link: "/docs/02_quick_start/config/update",
                },
              ],
            },
          ],
        },
        {
          text: "进阶指南",
          collapsed: true,
          items: [
            { text: "模型组配置", link: "/docs/03_advanced/model_config" },
            { text: "人设技巧", link: "/docs/03_advanced/persona_tips" },
            { text: "会话独立人设", link: "/docs/03_advanced/session_persona" },
            { text: "用户管理", link: "/docs/03_advanced/user_management" },
            { text: "插件用例", link: "/docs/03_advanced/plugin_usage" },
            { text: "插件生成器", link: "/docs/03_advanced/plugin_generator" },
          ],
        },
        {
          text: "插件开发",
          collapsed: true,
          items: [
            {
              text: "基本概念",
              collapsed: true,
              items: [
                {
                  text: "通信架构",
                  link: "/docs/04_plugin_dev/01_concepts/architecture",
                },
                {
                  text: "响应周期",
                  link: "/docs/04_plugin_dev/01_concepts/lifecycle",
                },
                {
                  text: "沙盒方法",
                  link: "/docs/04_plugin_dev/01_concepts/sandbox-methods",
                },
                {
                  text: "插件类型",
                  link: "/docs/04_plugin_dev/01_concepts/plugin-types",
                },
              ],
            },
            {
              text: "事件回调",
              collapsed: true,
              items: [
                { text: "初始化", link: "/docs/04_plugin_dev/02_events/init" },
                {
                  text: "提示词注入",
                  link: "/docs/04_plugin_dev/02_events/prompt-injection",
                },
                {
                  text: "沙盒方法",
                  link: "/docs/04_plugin_dev/02_events/sandbox-methods",
                },
                {
                  text: "清理环境",
                  link: "/docs/04_plugin_dev/02_events/cleanup",
                },
              ],
            },
            {
              text: "最佳实践",
              collapsed: true,
              items: [
                {
                  text: "插件共享市场",
                  link: "/docs/04_plugin_dev/03_best_practices/marketplace",
                },
                {
                  text: "文件交互",
                  link: "/docs/04_plugin_dev/03_best_practices/file-interaction",
                },
                {
                  text: "提示词工程",
                  link: "/docs/04_plugin_dev/03_best_practices/prompt-engineering",
                },
              ],
            },
            { text: "系统 API", link: "/docs/04_plugin_dev/04_system_api" },
          ],
        },
        {
          text: "应用开发",
          collapsed: true,
          items: [
            {
              text: "Linux 开发环境准备",
              link: "/docs/05_app_dev/dev_linux",
            },
            {
              text: "Windows 开发环境准备",
              link: "/docs/05_app_dev/dev_win",
            },
            {
              text: "MacOS 开发环境准备",
              link: "/docs/05_app_dev/dev_macos",
            },
          ],
        },
        {
          text: "故障排除",
          collapsed: true,
          items: [
            {
              text: "常见错误与处理",
              link: "/docs/06_troubleshooting/common-errors",
            },
            { text: "常见问题解答", link: "/docs/06_troubleshooting/faq" },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/KroMiose/nekro-agent" },
    ],
  },
});
