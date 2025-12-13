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

  // --- 站点核心信息 ---
  // 标题融合了技术属性（自主智能体）和应用场景（赛博猫娘/QQ机器人）
  title: "NekroAgent 文档",
  description: "NekroAgent 是一款基于 LLM 的开源自主智能体框架。支持构建赛博猫娘、QQ 机器人及企业级自动化工作流。集成 RAG 检索增强、CoT 推理、Function Calling 工具调用与 OneBot 协议。支持 DeepSeek/OpenAI，适配 Linux/Docker 私有化部署。",

  // --- Head 区域深度优化 ---
  head: [
    // 1. 基础资源
    ["link", { rel: "icon", href: "favicon.webp" }],
    ["meta", { name: "viewport", content: "width=device-width, initial-scale=1.0, viewport-fit=cover" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],

    // 2. 爬虫与收录
    ["meta", { name: "robots", content: "index, follow, max-image-preview:large" }],
    ["meta", { name: "revisit-after", content: "1 days" }],
    ["meta", { name: "msvalidate.01", content: "D97C6AD736A2167C559A3848690C857E" }],
    ["meta", { name: "google-site-verification", content: "4UhKgVLa3cPvgaPx-lyNnzdg6XVEAGIC4gueoQ81gF4" }],

    // --- 3. 终极关键词矩阵 (ALL-IN-ONE) ---
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
          "ネクロエージェント,ネクロAI,死霊代理人,英霊代理人",
          "네크로 에이전트,네크로 AI",
          "NekroAgent,Некро Агент,Некро ИИ",

          "赛博猫娘,机械娘,虚拟女友,AI老婆,二次元AI,情感陪伴,沉浸式对话,语擦,语C,角色扮演,AI人设",
          "Cyber Catgirl,Robot Girl,Virtual Girlfriend,Waifu AI,AI Companion,Roleplay,RP,Character AI,NSFW AI", "Not Safe For Workers AI",
          "サイバー猫耳,メカ娘,バーチャルカノジョ,AIカノジョ,俺の嫁,なりきり,ロールプレイ",
          "사이버 캣걸,메카 소녀,가상 여자친구,AI 여친,롤플레이,상황극",
          "Кибер-нэко,Девушка-робот,Виртуальная девушка,AI Вайфу,Ролевая игра,РП",

          "QQ机器人,QQ Bot,QQ频道机器人,微信机器人,Discord Bot,Telegram Bot",
          "OneBot,OneBot V11,NapCat,Lagrange,LLOneBot,Go-CQHTTP,NoneBot,Koishi,Shamrock", "mirai", "gocq", "yunzai", "原神机器人", "猫娘机器人",
          "Message Push,Auto Reply,消息推送,自动回复",
          "自動応答,チャットボット,自動化",
          "자동 응답,챗봇",
          "Чат-бот,Автоответчик",

          "AI Agent,Autonomous Agents,Multi-Agent,LLM,Transformer,MoE",
          "自主智能体,多智能体协作,大语言模型,思维链,CoT",
          "AIエージェント,マルチエージェント,大規模言語モデル",
          "AI 에이전트,거대 언어 모델",
          "AI Агент,Мульти-агент,Большие языковые модели",
          "GPT-4o,Claude 3.5,DeepSeek,Llama 3,Qwen,Mistral",

          "Cloudflare,Workers,Workers AI,Cloudflare Pages,R2,D1,Hyperdrive",
          "CF,赛博菩萨,Cloudflare Tunnel,Argo Tunnel,Zero Trust,WARP", // CN Hot Keywords
          "Edge AI,Serverless AI,Edge Computing,Global CDN,DDoS Protection",
          "クラウドフレア,エッジコンピューティング,サーバーレス", // JP
          "클라우드플레어,엣지 컴퓨팅,서버리스", // KR
          "Cloudflare,Бессерверные вычисления,Edge AI", // RU

          "OpenAI,ChatGPT,GPT-4o,GPT-5,GPT-5.1,GPT-5.1 Thinking,GPT-5 Thinking,o1,o3,o3 pro,o3-mini,o4-mini,gpt-oss,DALL-E 3,Sora 2,Sora 2 Pro,Sora 2 Plus,MuseNet,Whisper," +
          "Google,DeepMind,Gemini,Gemini 2.5 Flash,Gemini 2.5 Pro,Gemini 3 Pro,Gemini 3 Deep Think,Gemini Diffusion,Nano Banana,Nano Banana Pro,Gemma 3,Imagen 4,Veo 3.0,Veo 3.1,V2A," +
          "Anthropic,Claude,Claude 3.5,Claude Sonnet 4,Claude Sonnet 4.5,Claude Opus 4.5,Claude Haiku 4.5,Claude Extended Thinking," +
          "xAI,Grok,Grok 3,Grok 4.0,Grok 4.1,Grok 4.1 Thinking," +
          "Meta,Llama 4,Llama 4 Scout,Llama 4 Marverick,Llama 4 Behemoth," +
          "Microsoft,Copilot,Phi-4,Phi-reasoning,Phi-4-mini,Phi-4-plus,Azure OpenAI," +
          "Mistral AI,Mistral Large 2,Mistral Large 3,Mistral 3 Medium,Ministral 3,Pixtral Large,Magistral Medium,Magistral Small," +

          "DeepSeek,DeepSeek-V3.1,DeepSeek-V3.1-Terminus,DeepSeek-V3.2,DeepSeek-V3.2-Thinking,DeepSeek-V3.2-Speciale,DeepSeek-R1,深度求索,幻方量化," +
          "Alibaba,Qwen,Qwen3,Qwen3-Max,Qwen3-Omni,Qwen3-VL,Qwen3-Next,Qwen3-Max-Thinking,Qwen3-TTS,Wan 2.2,Wan 2.5,Z-Image,通义千问,通义万相," +
          "ByteDance,Doubao,Doubao-Seed-1.6,Doubao-Seed-1.6-Thinking,Seed1.5-VL,Seed-OSS,Seedream 4.5,Seedance,字节跳动,豆包," +
          "Tencent,Hunyuan,HY 2.0,HY 2.0 Think,Hunyuan-T1,Hunyuan-A13B,Hunyuan Video 1.5,Hunyuan Image 3.0,HunyuanVideo-Foley,腾讯混元,元宝," +
          "Zhipu AI,GLM-4.5,GLM-4.5V,GLM-4.6,GLM-4.6V,GLM-4.6V-Flash,GLM-4.1V-Thinking,CogView 4,智谱AI,智谱清言,智谱清影," +
          "Moonshot AI,Kimi,Kimi-K2,Kimi-K2-Thinking,Kimi-VL,Kimi-VL-Thinking,K1.6,月之暗面," +
          "Baidu,Ernie 4.5,Ernie 5.0,X1 Turbo,X1.1,Wenxin Yiyan,百度,文心一言,文小言," +

          "MiniMax,Hailuo 2.3,MiniMax-Text-01,MiniMax-VL-01,MiniMax-M1,MiniMax-M2,Music-2,Speech-2.6,海螺AI," +
          "Kuaishou,Kling,Kling O1,Kling Video 2.6,Kling Image 2.1,可灵AI,可灵视频,可灵图片," +
          "StepFun,Step-2,Step-3,Step-r1,ACE-Step,阶跃星辰," +
          "Black Forest Labs,Flux 2,Flux 2 Pro,Flux 2 Flex,Flux 2 Dev," +
          "Midjourney,Midjourney v7,Midjourney Video," +
          "Runway,Gen-4.5,Luma AI,Dream Machine,Ray 3," +
          "Pika,Pika 2.2,Suno,Suno v5,Mureka V7," +
          "Stability AI,Stable Diffusion 3.5,Stable Video Diffusion,Stable Audio",

          "内网穿透,端口转发,反向代理,免服务器部署", // CN
          "Port Forwarding,Reverse Proxy,Localhost Tunneling,Ngrok alternative", // EN
          "ポート開放不要,トンネリング,リバースプロキシ", // JP
          "포트 포워딩,터널링,리버스 프록시", // KR
          "Туннелирование,Обратный прокси", // RU

          "Vercel,Netlify,Supabase,AWS Lambda,Railway,Zeabur,Hugging Face Spaces",

          "RAG,Retrieval-Augmented Generation,Vector Database,Knowledge Graph",
          "检索增强生成,向量数据库,知识图谱",
          "検索拡張生成,ベクトルデータベース",
          "ChromaDB,Milvus,Pinecone,Faiss",

          "Function Calling,Tool Use,Workflow Automation,API Integration",
          "函数调用,工具使用,工作流自动化,API集成",
          "Local LLM,Ollama,vLLM,Llama.cpp,Docker,VitePress"
        ].join(",")
      }
    ],

    // --- 4. 社交媒体分享 (Open Graph) ---
    ["meta", { property: "og:site_name", content: "NekroAgent AI" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "NekroAgent | 打造你的专属赛博猫娘与全能 AI 助手" }],
    ["meta", { property: "og:description", content: "集成 LLM 大模型、OneBot 协议与工作流自动化。无论是沉浸式语C还是自动化群管，NekroAgent 都能轻松搞定。" }],
    ["meta", { property: "og:image", content: "https://doc.nekro.ai/nekro_agent_logo.webp" }],
    ["meta", { property: "og:url", content: "https://doc.nekro.ai" }],

    // --- 5. 结构化数据 (JSON-LD) - 混合型定义 ---
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "NekroAgent",
        "alternateName": ["Nekro Bot", "赛博猫娘AI", "Nekro AI"],
        "applicationCategory": "DeveloperApplication", // 同时也兼具娱乐属性
        "operatingSystem": "Cross-platform",
        "description": "An autonomous AI agent framework for developers and ACG enthusiasts, featuring Cyber Catgirl personas, QQ Bot integration, and LLM-based workflow automation.",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CNY" },
        // 这里的关键词会被 Google 抓取用于丰富摘要
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

  themeConfig: {
    logo: '/nekro_agent_logo.webp',
    search: { provider: 'local' },
    nav: [
      { text: "主页", link: "/" },
      { text: "贡献文档", link: "https://github.com/KroMiose/nekro-agent-doc/issues/new/choose" },
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
            { text: "社区宣发激励计划", link: "/docs/01_intro/event" },
            { text: "NekroAI 成员招募", link: "/docs/01_intro/recruitment" },
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
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/KroMiose/nekro-agent" },
    ]
  }
});