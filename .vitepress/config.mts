import { defineConfig } from "vitepress";
import markdownItVideo from "@vrcd-community/markdown-it-video";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // --- Markdown 扩展配置 ---
  markdown: {
    config: (md) => {
      md.use(markdownItVideo, {
        youtube: { width: '100%', height: '387px' },
        bilibili: { width: '100%', height: '387px' }
      });
    }
  },

  // --- Head 区域深度优化 (共享配置) ---
  head: [
    // 0. IE浏览器检测脚本 - 必须在其他脚本之前加载
    ["script", { src: "/ie-detector-legacy.js" }],
    
    // 1. 基础资源
    ["link", { rel: "icon", href: "/favicon.webp" }],
    ["meta", { name: "viewport", content: "width=device-width, initial-scale=1.0, viewport-fit=cover" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],

    // 2. 爬虫与收录
    ["meta", { name: "robots", content: "index, follow, max-image-preview:large" }],
    ["meta", { name: "revisit-after", content: "1 days" }],
    ["meta", { name: "msvalidate.01", content: "D97C6AD736A2167C559A3848690C857E" }],
    ["meta", { name: "google-site-verification", content: "4UhKgVLa3cPvgaPx-lyNnzdg6XVEAGIC4gueoQ81gF4" }],

    // 3. 关键词 (保留原有的混合关键词作为兜底)
    [
      "meta",
      {
        name: "keywords",
        content: [
          "NekroAgent,NekroAgent AI,Nekro,Nekro Cloud,Nekro Bot,nekro-agent",
          "Neko Agent,Neko Bot,Neko AI",
          "NekroAI,Nekro AI,nekroai",
          "Github,github,GitHub",
          "死灵代理人,英灵代理人,死亡代理人",
          "赛博猫娘,机械娘,虚拟女友,AI老婆,二次元AI,情感陪伴,沉浸式对话,语擦,语C,角色扮演,AI人设",
          "QQ机器人,QQ Bot,QQ频道机器人,微信机器人,Discord Bot,Telegram Bot",
          "OneBot,OneBot V11,NapCat,Lagrange,LLOneBot,Go-CQHTTP,NoneBot,Koishi,Shamrock", "mirai", "gocq", "yunzai", "原神机器人", "猫娘机器人",
          "AI Agent,Autonomous Agents,Multi-Agent,LLM,Transformer,MoE",
          "自主智能体,多智能体协作,大语言模型,思维链,CoT",
          "RAG,Retrieval-Augmented Generation,Vector Database,Knowledge Graph",
          "Function Calling,Tool Use,Workflow Automation,API Integration",
          "Local LLM,Ollama,vLLM,Llama.cpp,Docker,VitePress"
        ].join(",")
      }
    ],

    // 4. 社交媒体分享 (Open Graph)
    ["meta", { property: "og:site_name", content: "NekroAgent AI" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:image", content: "https://doc.nekro.ai/nekro_agent_logo.webp" }],
    ["meta", { property: "og:url", content: "https://doc.nekro.ai" }],

    // 5. 结构化数据 (JSON-LD) - 混合型定义
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "NekroAgent",
        "alternateName": ["Nekro Bot", "赛博猫娘AI", "Nekro AI"],
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Cross-platform",
        "description": "An autonomous AI agent framework for developers and ACG enthusiasts, featuring Cyber Catgirl personas, QQ Bot integration, and LLM-based workflow automation.",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" },
        "keywords": "AI Agent, QQ Robot, Cyber Catgirl, LLM, DeepSeek, RAG, Automation",
        "featureList": [
          "Immersive Roleplay (语C/赛博猫娘)",
          "QQ/OneBot/NapCat Integration",
          "Autonomous Task Execution",
          "RAG Knowledge Base",
          "Function Calling & Tools"
        ]
      })
    ]
  ],

  sitemap: {
    hostname: "https://doc.nekro.ai",
  },

  // --- 国际化配置 ---
  locales: {
    root: {
      label: '简体中文',
      link: '/',
      lang: 'zh-CN',
      title: "NekroAgent 文档",
      description: "NekroAgent 是一款基于 LLM 的开源自主智能体框架。支持构建赛博猫娘、QQ 机器人及企业级自动化工作流。",
      themeConfig: {
        nav: [
          { text: "主页", link: "/" },
          { text: "贡献文档", link: "https://github.com/KroMiose/nekro-agent-doc/issues/new/choose" },
          { text: "加入社群", link: "https://qm.qq.com/q/eT30LxDcSA" },
        ],
        sidebar: {
          "/docs": [
            {
              text: "快速了解",
              collapsed: true,
              items: [
                { text: "概览", link: "/docs/01_intro/overview" },
                { text: "应用场景", link: "/docs/01_intro/application_scenarios" },
                { text: "社区宣发激励计划", link: "/docs/01_intro/event" },
                { text: "NekroAI 成员招募", link: "/docs/01_intro/recruitment" },
                { text: "文档站隐私政策", link: "/docs/01_intro/privacy" },
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
                    { text: "Linux 部署教程", link: "/docs/02_quick_start/deploy/linux" },
                    { text: "Windows 部署教程", link: "/docs/02_quick_start/deploy/windows" },
                    { text: "MacOS 部署教程", link: "/docs/02_quick_start/deploy/macos" }
                  ],
                },
                {
                  text: "社区部署",
                  collapsed: true,
                  items: [
                    { text: "Nekro-Agent-Toolkit", link: "/docs/community/nekro-agent-toolkit" },
                    { text: "iStoreOS 部署教程", link: "/docs/community/iStoreOS" }
                  ]
                },
                {
                  text: "基本配置",
                  collapsed: true,
                  items: [
                    { text: "协议端配置", link: "/docs/02_quick_start/config/protocol" },
                    { text: "系统配置", link: "/docs/02_quick_start/config/system" },
                    { text: "应用更新", link: "/docs/02_quick_start/config/update" },
                  ],
                },
              ],
            },
            {
              text: "进阶指南",
              collapsed: true,
              items: [
                { text: "模型组配置", link: "/docs/03_advanced/model_config" },
                { text: "模型选择", link: "/docs/03_advanced/model_usage" },
                { text: "人设技巧", link: "/docs/03_advanced/persona_tips" },
                { text: "会话独立人设", link: "/docs/03_advanced/session_persona" },
                { text: "用户管理", link: "/docs/03_advanced/user_management" },
                { text: "插件用例", link: "/docs/03_advanced/plugin_usage" },
                { text: "插件生成器", link: "/docs/03_advanced/plugin_generator" },
                { text: "基础命令指南", link: "/docs/03_advanced/commands_basic" },
                { text: "调试命令指南", link: "/docs/03_advanced/commands_debug" },
              ],
            },
            {
              text: "插件开发",
              collapsed: true,
              items: [
                { text: "引言", link: "/docs/04_plugin_dev/00_introduction" },
                { text: "快速上手", link: "/docs/04_plugin_dev/01_quick_start" },
                {
                  text: "插件核心概念",
                  link: "/docs/04_plugin_dev/02_plugin_basics",
                  collapsed: true,
                  items: [
                    { text: "插件实例与生命周期", link: "/docs/04_plugin_dev/02_plugin_basics/2.1_plugin_instance" },
                    { text: "沙盒方法详解", link: "/docs/04_plugin_dev/02_plugin_basics/2.2_sandbox_methods" },
                    { text: "插件配置", link: "/docs/04_plugin_dev/02_plugin_basics/2.3_configuration" },
                    { text: "数据存储", link: "/docs/04_plugin_dev/02_plugin_basics/2.4_storage" },
                    { text: "提示词注入", link: "/docs/04_plugin_dev/02_plugin_basics/2.5_prompt_injection" },
                    { text: "上下文对象", link: "/docs/04_plugin_dev/02_plugin_basics/2.6_agent_context" },
                  ],
                },
                {
                  text: "高级功能",
                  link: "/docs/04_plugin_dev/03_advanced_features",
                  collapsed: true,
                  items: [
                    { text: "Webhook 接入点（弃用）", link: "/docs/04_plugin_dev/03_advanced_features/3.1_webhooks" },
                    { text: "文件交互", link: "/docs/04_plugin_dev/03_advanced_features/3.2_file_interaction" },
                    { text: "使用向量数据库", link: "/docs/04_plugin_dev/03_advanced_features/3.3_vector_database" },
                    { text: "动态路由", link: "/docs/04_plugin_dev/03_advanced_features/3.4_dynamic_router" },
                    { text: "动态包导入", link: "/docs/04_plugin_dev/03_advanced_features/3.5_dynamic_package_import" },
                  ],
                },
                { text: "系统 API 参考", link: "/docs/04_plugin_dev/04_system_api_reference" },
              ],
            },
            {
              text: "应用开发",
              collapsed: true,
              items: [
                { text: "Linux 开发环境准备", link: "/docs/05_app_dev/dev_linux" },
                { text: "Windows 开发环境准备", link: "/docs/05_app_dev/dev_win" },
                { text: "MacOS 开发环境准备", link: "/docs/05_app_dev/dev_macos" },
              ],
            },
            {
              text: "故障排除",
              collapsed: true,
              items: [
                { text: "常见问题解答", link: "/docs/06_troubleshooting/faq" },
              ],
            },
          ]
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en',
      title: "NekroAgent Docs",
      description: "NekroAgent is an open-source autonomous agent framework based on LLM.",
      themeConfig: {
        nav: [
          { text: "Home", link: "/en/docs/index_en.html" },
          { text: "Contribute", link: "https://github.com/KroMiose/nekro-agent-doc/issues/new/choose" },
          { text: "Join Community", link: "https://discord.com/invite/eMsgwFnxUB" },
        ],
        sidebar: {
          "/en/docs/": [
            {
              text: "Introduction",
              collapsed: true,
              items: [
                { text: "Overview", link: "/en/docs/01_intro/overview" },
                { text: "Scenarios", link: "/en/docs/01_intro/application_scenarios" },
                { text: "Incentive Plan", link: "/en/docs/01_intro/event" },
                { text: "Recruitment", link: "/en/docs/01_intro/recruitment" },
                { text: "Privacy Policy", link: "/en/docs/01_intro/privacy" },
              ],
            },
            {
              text: "Quick Start",
              collapsed: true,
              items: [
                { text: "Quick Start", link: "/en/docs/02_quick_start/quickstart" },
                {
                  text: "Deployment",
                  collapsed: true,
                  items: [
                    { text: "Linux", link: "/en/docs/02_quick_start/deploy/linux" },
                    { text: "Windows", link: "/en/docs/02_quick_start/deploy/windows" },
                    { text: "MacOS", link: "/en/docs/02_quick_start/deploy/macos" }
                  ],
                },
                {
                  text: "Community Deployment",
                  collapsed: true,
                  items: [
                    { text: "Nekro-Agent-Toolkit", link: "/en/docs/community/nekro-agent-toolkit" },
                    { text: "iStoreOS", link: "/en/docs/community/iStoreOS" }
                  ]
                },
                {
                  text: "Configuration",
                  collapsed: true,
                  items: [
                    { text: "Protocol", link: "/en/docs/02_quick_start/config/protocol" },
                    { text: "System", link: "/en/docs/02_quick_start/config/system" },
                    { text: "Update", link: "/en/docs/02_quick_start/config/update" },
                  ],
                },
              ],
            },
            {
              text: "Advanced",
              collapsed: true,
              items: [
                { text: "Model Config", link: "/en/docs/03_advanced/model_config" },
                { text: "Model Selection", link: "/en/docs/03_advanced/model_usage" },
                { text: "Persona Tips", link: "/en/docs/03_advanced/persona_tips" },
                { text: "Session Persona", link: "/en/docs/03_advanced/session_persona" },
                { text: "User Management", link: "/en/docs/03_advanced/user_management" },
                { text: "Plugin Usage", link: "/en/docs/03_advanced/plugin_usage" },
                { text: "Plugin Generator", link: "/en/docs/03_advanced/plugin_generator" },
                { text: "Basic Commands", link: "/en/docs/03_advanced/commands_basic" },
                { text: "Debug Commands", link: "/en/docs/03_advanced/commands_debug" },
              ],
            },
            {
              text: "Plugin Dev",
              collapsed: true,
              items: [
                { text: "Introduction", link: "/en/docs/04_plugin_dev/00_introduction" },
                { text: "Quick Start", link: "/en/docs/04_plugin_dev/01_quick_start" },
                {
                  text: "Core Concepts",
                  link: "/en/docs/04_plugin_dev/02_plugin_basics",
                  collapsed: true,
                  items: [
                    { text: "Instance & Lifecycle", link: "/en/docs/04_plugin_dev/02_plugin_basics/2.1_plugin_instance" },
                    { text: "Sandbox Methods", link: "/en/docs/04_plugin_dev/02_plugin_basics/2.2_sandbox_methods" },
                    { text: "Configuration", link: "/en/docs/04_plugin_dev/02_plugin_basics/2.3_configuration" },
                    { text: "Storage", link: "/en/docs/04_plugin_dev/02_plugin_basics/2.4_storage" },
                    { text: "Prompt Injection", link: "/en/docs/04_plugin_dev/02_plugin_basics/2.5_prompt_injection" },
                    { text: "Context Object", link: "/en/docs/04_plugin_dev/02_plugin_basics/2.6_agent_context" },
                  ],
                },
                {
                  text: "Advanced",
                  link: "/en/docs/04_plugin_dev/03_advanced_features",
                  collapsed: true,
                  items: [
                    { text: "Webhooks (Deprecated)", link: "/en/docs/04_plugin_dev/03_advanced_features/3.1_webhooks" },
                    { text: "File Interaction", link: "/en/docs/04_plugin_dev/03_advanced_features/3.2_file_interaction" },
                    { text: "Vector Database", link: "/en/docs/04_plugin_dev/03_advanced_features/3.3_vector_database" },
                    { text: "Dynamic Router", link: "/en/docs/04_plugin_dev/03_advanced_features/3.4_dynamic_router" },
                    { text: "Dynamic Package", link: "/en/docs/04_plugin_dev/03_advanced_features/3.5_dynamic_package_import" },
                  ],
                },
                { text: "System API", link: "/en/docs/04_plugin_dev/04_system_api_reference" },
              ],
            },
            {
              text: "App Dev",
              collapsed: true,
              items: [
                { text: "Linux Dev Env", link: "/en/docs/05_app_dev/dev_linux" },
                { text: "Windows Dev Env", link: "/en/docs/05_app_dev/dev_win" },
                { text: "MacOS Dev Env", link: "/en/docs/05_app_dev/dev_macos" },
              ],
            },
            {
              text: "Troubleshooting",
              collapsed: true,
              items: [
                { text: "FAQ", link: "/en/docs/06_troubleshooting/faq" },
              ],
            },
          ]
        }
      }
    },
    ja: {
      label: '日本語',
      lang: 'ja-JP',
      link: '/ja',
      title: "NekroAgent ドキュメント",
      description: "NekroAgentは、LLMに基づくオープンソースの自律型エージェントフレームワークです。",
      themeConfig: {
        nav: [
          { text: "ホーム", link: "/ja/docs/index_ja.html" },
          { text: "貢献", link: "https://github.com/KroMiose/nekro-agent-doc/issues/new/choose" },
          { text: "コミュニティに参加", link: "https://discord.com/invite/eMsgwFnxUB" },
        ],
        sidebar: {
          "/ja/docs/": [
            {
              text: "はじめに",
              collapsed: true,
              items: [
                { text: "概要", link: "/ja/docs/01_intro/overview" },
                { text: "適用シナリオ", link: "/ja/docs/01_intro/application_scenarios" },
                { text: "インセンティブプラン", link: "/ja/docs/01_intro/event" },
                { text: "採用情報", link: "/ja/docs/01_intro/recruitment" },
                { text: "プライバシーポリシー", link: "/ja/docs/01_intro/privacy" },
              ],
            },
            {
              text: "クイックスタート",
              collapsed: true,
              items: [
                { text: "クイックスタート", link: "/ja/docs/02_quick_start/quickstart" },
                {
                  text: "デプロイ",
                  collapsed: true,
                  items: [
                    { text: "Linux", link: "/ja/docs/02_quick_start/deploy/linux" },
                    { text: "Windows", link: "/ja/docs/02_quick_start/deploy/windows" },
                    { text: "MacOS", link: "/ja/docs/02_quick_start/deploy/macos" }
                  ],
                },
                {
                  text: "コミュニティデプロイ",
                  collapsed: true,
                  items: [
                    { text: "Nekro-Agent-Toolkit", link: "/ja/docs/community/nekro-agent-toolkit" },
                    { text: "iStoreOS", link: "/ja/docs/community/iStoreOS" }
                  ]
                },
                {
                  text: "構成",
                  collapsed: true,
                  items: [
                    { text: "プロトコル", link: "/ja/docs/02_quick_start/config/protocol" },
                    { text: "システム", link: "/ja/docs/02_quick_start/config/system" },
                    { text: "アップデート", link: "/ja/docs/02_quick_start/config/update" },
                  ],
                },
              ],
            },
            {
              text: "高度な機能",
              collapsed: true,
              items: [
                { text: "モデル構成", link: "/ja/docs/03_advanced/model_config" },
                { text: "モデル選択", link: "/ja/docs/03_advanced/model_usage" },
                { text: "ペルソナのヒント", link: "/ja/docs/03_advanced/persona_tips" },
                { text: "セッションペルソナ", link: "/ja/docs/03_advanced/session_persona" },
                { text: "ユーザー管理", link: "/ja/docs/03_advanced/user_management" },
                { text: "プラグインの使用", link: "/ja/docs/03_advanced/plugin_usage" },
                { text: "プラグインジェネレーター", link: "/ja/docs/03_advanced/plugin_generator" },
                { text: "基本コマンド", link: "/ja/docs/03_advanced/commands_basic" },
                { text: "デバッグコマンド", link: "/ja/docs/03_advanced/commands_debug" },
              ],
            },
            {
              text: "プラグイン開発",
              collapsed: true,
              items: [
                { text: "はじめに", link: "/ja/docs/04_plugin_dev/00_introduction" },
                { text: "クイックスタート", link: "/ja/docs/04_plugin_dev/01_quick_start" },
                {
                  text: "コアコンセプト",
                  link: "/ja/docs/04_plugin_dev/02_plugin_basics",
                  collapsed: true,
                  items: [
                    { text: "インスタンスとライフサイクル", link: "/ja/docs/04_plugin_dev/02_plugin_basics/2.1_plugin_instance" },
                    { text: "サンドボックスメソッド", link: "/ja/docs/04_plugin_dev/02_plugin_basics/2.2_sandbox_methods" },
                    { text: "構成", link: "/ja/docs/04_plugin_dev/02_plugin_basics/2.3_configuration" },
                    { text: "ストレージ", link: "/ja/docs/04_plugin_dev/02_plugin_basics/2.4_storage" },
                    { text: "プロンプトインジェクション", link: "/ja/docs/04_plugin_dev/02_plugin_basics/2.5_prompt_injection" },
                    { text: "コンテキストオブジェクト", link: "/ja/docs/04_plugin_dev/02_plugin_basics/2.6_agent_context" },
                  ],
                },
                {
                  text: "高度な機能",
                  link: "/ja/docs/04_plugin_dev/03_advanced_features",
                  collapsed: true,
                  items: [
                    { text: "Webhook (非推奨)", link: "/ja/docs/04_plugin_dev/03_advanced_features/3.1_webhooks" },
                    { text: "ファイル相互作用", link: "/ja/docs/04_plugin_dev/03_advanced_features/3.2_file_interaction" },
                    { text: "ベクトルデータベース", link: "/ja/docs/04_plugin_dev/03_advanced_features/3.3_vector_database" },
                    { text: "動的ルーター", link: "/ja/docs/04_plugin_dev/03_advanced_features/3.4_dynamic_router" },
                    { text: "動的パッケージ", link: "/ja/docs/04_plugin_dev/03_advanced_features/3.5_dynamic_package_import" },
                  ],
                },
                { text: "システムAPI", link: "/ja/docs/04_plugin_dev/04_system_api_reference" },
              ],
            },
            {
              text: "アプリ開発",
              collapsed: true,
              items: [
                { text: "Linux開発環境", link: "/ja/docs/05_app_dev/dev_linux" },
                { text: "Windows開発環境", link: "/ja/docs/05_app_dev/dev_win" },
                { text: "MacOS開発環境", link: "/ja/docs/05_app_dev/dev_macos" },
              ],
            },
            {
              text: "トラブルシューティング",
              collapsed: true,
              items: [
                { text: "よくある質問", link: "/ja/docs/06_troubleshooting/faq" },
              ],
            },
          ]
        }
      }
    }
  },

  themeConfig: {
    logo: '/nekro_agent_logo.webp',
    search: { provider: 'local' },

    // 共享的社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/KroMiose/nekro-agent" },
    ]
  }
});