# Nekro Agent 文档站

<div align="center">
  <img src="https://oss.nekro.ai/nekro_agent_logo.png" width="200" alt="Nekro Agent Logo">
  <h3>安全、高效、优雅的智能交互体验</h3>
</div>

## 📖 项目简介

Nekro Agent 文档站是基于 VitePress 开发的官方文档网站，旨在提供全面、清晰的 Nekro Agent 使用指南。通过这个文档站，用户可以轻松了解 Nekro Agent 的部署方法、配置选项、进阶功能和插件开发等内容。

🔗 在线访问：[https://doc.nekro.ai](https://doc.nekro.ai)

## 🗂️ 文档结构

文档站内容按照以下结构组织：

- **快速了解**：能力展示、多人互动、沙盒复杂指令、插件系统与云服务
- **快速开始**：Linux/Windows/MacOS 部署教程、协议端配置、系统配置
- **进阶指南**：模型组配置、人设技巧、用户管理、云服务等
- **插件开发**：通信架构、事件回调、最佳实践、系统 API
- **故障排除**：常见错误与处理、常见问题解答

## 🚀 本地开发

### 环境要求

- Node.js 16.x 或更高版本
- npm

### 开发步骤

1. 克隆本仓库

   ```bash
   git clone https://github.com/KroMiose/nekro-agent-doc.git
   cd nekro-agent-doc
   ```

2. 安装依赖

   ```bash
   npm install
   ```

3. 启动开发服务器

   ```bash
   npm run docs:dev
   ```

4. 在浏览器中访问 `http://localhost:5173` 预览文档站

### 构建文档

```bash
npm run docs:build
```

构建后的文件将生成在 `.vitepress/dist` 目录中

## 📝 贡献指南

我们非常欢迎社区成员为 Nekro Agent 文档做出贡献！您可以通过以下方式参与：

1. **提交问题**：如果您发现文档中的错误或有改进建议，请[提交 Issue](https://github.com/KroMiose/nekro-agent-doc/issues/new/choose)
2. **完善文档**：您可以帮助我们完善现有文档或添加新的内容
3. **翻译文档**：帮助将文档翻译成其他语言

### 贡献步骤

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-doc`)
3. 提交您的更改 (`git commit -m 'Add some amazing doc'`)
4. 推送到分支 (`git push origin feature/amazing-doc`)
5. 打开一个 Pull Request

## 📁 项目结构

```
nekro-agent-doc/
├── .github/            # GitHub 配置
│   └── ISSUE_TEMPLATE/ # Issue 模板
├── .vitepress/         # VitePress 配置
│   ├── config.mts      # 主配置文件
│   └── theme/          # 主题配置
├── assets/             # 文档资源文件
│   ├── demo/           # 演示图片
│   └── windows/        # Windows 相关图片
├── docs/               # 文档内容
│   ├── 01_intro/       # 介绍文档
│   ├── 02_quick_start/ # 快速开始指南
│   ├── 03_advanced/    # 进阶功能文档
│   ├── 04_plugin_dev/  # 插件开发文档
│   ├── 05_app_dev/     # 应用开发文档
│   └── 06_troubleshooting/ # 故障排除文档
├── public/             # 公共静态资源
├── index.md            # 首页
└── package.json        # 项目依赖配置
```

## 📱 联系我们

- QQ 交流群: 636925153
- GitHub: [https://github.com/KroMiose/nekro-agent](https://github.com/KroMiose/nekro-agent)
