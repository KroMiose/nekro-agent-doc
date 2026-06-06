---
title: Nekro Agent 概述
description: Nekro Agent 是一款面向真实场景的 AI Agent 框架，融合工作区、Claude Code 沙盒、长期记忆、结构化 MCP 管理与多平台交互能力
---

<div align="center">
  <img src="/assets/NA_logo.webp" width="1024" alt="内容为 NekroAgent 图标的第二种样式">
  <p><img src="/assets/NoneBotPlugin.svg" width="240" alt="内容为 NoneBotPlugin 文字"></p>
</div>

<div align="center">
  <DocIcon name="sparkles" /> 新一代 AI 代理框架，安全、高效、优雅的智能交互体验 <DocIcon name="sparkles" /><br/>
  <DocIcon name="train" /> 源自首批大模型应用 <a href="https://github.com/KroMiose/nonebot_plugin_naturel_gpt"> Naturel GPT</a> 的 Agent 升级重构续作 <DocIcon name="rainbow" /><br/>
  <DocIcon name="message-text" /> 技术交流/学习/答疑/讨论：<a href="https://jq.qq.com/?_wv=1027&k=71t9iCT7">加入社区交流群: 636925153</a> <DocIcon name="message" />
</div>

::: tip 2.3.3 正式版
工作区、Claude Code 沙盒、记忆系统与结构化 MCP 管理等内容已在 Nekro Agent `2.3.3` 正式版中提供。后续版本中，界面与行为仍可能继续调整。
:::

## <DocIcon name="rocket" /> 核心能力

如果您是第一次了解 Nekro Agent，可以先把它理解成三步：先部署服务，再接入聊天平台，最后按需要创建工作区，让 AI 在工作区里长期处理任务。

Nekro Agent 不只是一个“会聊天的机器人框架”，而是一个以工作区为核心的通用 Agent 运行平台。当前能力可以概括为：

- **工作区与 Claude Code 沙盒**：按项目或频道组织上下文，让 AI 能在独立工作区中处理文件、运行任务和持续协作。
- **代码生成与安全执行**：在隔离环境中完成脚本执行、文件处理、数据分析、仓库协作等复杂任务。
- **长期记忆（记忆系统）**：自动记住项目背景、成员偏好、历史决定和任务结论，减少重复交代。
- **MCP 与技能体系**：按工作区接入外部工具和专项技能，让 AI 能连接数据库、搜索、监控、仓库等服务。
- **命令、定时器与运行管理**：通过命令中心、定时器、频道状态和插件开关管理 Bot 的日常运行。
- **多平台、多人、多模态交互**：支持 QQ、Discord、Telegram、Minecraft、Bilibili Live、WeChat、Email、SSE(SDK) 等接入，并能处理图片、文件等资源。
- **可视化与实时状态**：通过 WebUI 查看配置、日志、工作区状态和任务进展。

<DocIcon name="send" /> 想了解 Nekro Agent 能做什么？查看 [应用场景展示](/docs/01_intro/application_scenarios) 了解丰富的实际使用案例！

## <DocIcon name="compass" /> 推荐阅读路径

如果是第一次接触新版 Nekro Agent，建议按以下顺序阅读：

1. [快速开始](/docs/02_quick_start/quickstart)
2. [工作区总览](/docs/03_workspace/overview)
3. [工作区快速上手](/docs/03_workspace/quickstart)
4. [Claude Code 沙盒](/docs/03_workspace/claude_code_sandbox)
5. [记忆系统](/docs/03_workspace/memory_system)

这组页面主要围绕工作区、Claude Code、记忆系统和相关管理能力展开说明。

## <DocIcon name="star" /> Nekro AI

**Nekro AI** 是 Nekro Agent 的云端服务平台，作为整个生态系统的服务中枢，提供插件与人设的统一管理与分发能力。致力于帮助用户与开发者更高效地构建和分享智能 AI 代理系统

- **插件商店**：集中化管理各类功能扩展插件，支持一键安装、升级与图形化配置，便于开发者发布和共享能力模块
- **人设商店**：提供多样化的角色人设分享平台，支持上传下载和个性化定制，满足多场景下的智能体人格构建需求

Nekro AI 致力于打造一个开放、协同、高可用的服务生态，助力 Nekro Agent 应用生态的长足发展！

## <DocIcon name="lightbulb" /> 功能列表

### 当前重点能力

- <DocIcon name="circle-check" label="是" /> 工作区统一管理频道、提示词、技能、MCP、记忆系统与 Claude Code 沙盒
- <DocIcon name="circle-check" label="是" /> 命令系统、定时器系统、日志与实时状态推送
- <DocIcon name="circle-check" label="是" /> 高扩展插件体系与插件开发 API
- <DocIcon name="circle-check" label="是" /> 多平台接入、多人互动、多模态消息处理
- <DocIcon name="circle-check" label="是" /> 云端插件与人设资源共享
- <DocIcon name="circle-check" label="是" /> AI 加持的插件编辑器与动态依赖导入
- <DocIcon name="circle-check" label="是" /> 灵活的模型调度、插件激活策略与会话配置能力

### 2.3.3 重点能力

- <DocIcon name="circle-check" label="是" /> 工作区 / Claude Code 沙盒工作流
- <DocIcon name="circle-check" label="是" /> 记忆系统与记忆召回
- <DocIcon name="circle-check" label="是" /> 结构化 MCP 管理
- <DocIcon name="circle-check" label="是" /> CC 模型组与相关管理界面

## <DocIcon name="handshake" /> 贡献列表

感谢以下开发者对本项目做出的贡献

<a href="https://github.com/KroMiose/nekro-agent/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=KroMiose/nekro-agent&max=1000" />
</a>
