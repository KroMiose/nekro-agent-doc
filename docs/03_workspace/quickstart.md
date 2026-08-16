---
title: 快速上手
description: 五分钟创建第一个工作区，让 AI 从「聊天」变成「做事」
---

# 快速上手

本文带您在五分钟内创建第一个工作区，并让 Claude Code 沙盒跑起来。

完成后您会得到一个能执行代码、处理文件、持续推进任务的 AI 工作空间。

## 开始前准备

- Nekro Agent 已部署完成，WebUI 可以正常访问
- 至少有一个已激活的聊天频道
- 已配置好主对话模型组（AI 能正常聊天）

## 第一步：创建工作区

进入 WebUI 的「工作区」页面，点击创建。

名称建议直接按用途取，例如 `数据分析`、`项目 A`、`日常助手`。

![创建工作区](/assets/workspace/quickstart/create_workspace.png)

## 第二步：绑定频道

把要使用的频道绑定到工作区。绑定后，该频道的对话和任务将自动使用工作区的配置。

建议一个频道对应一个工作区，保持上下文清晰。

![工作区绑定频道](/assets/workspace/quickstart/bind_channel.png)

## 第三步：配置 CC 模型组

::: warning 关键步骤
这是最容易遗漏的一步。Claude Code 沙盒使用独立的 **CC 模型组**，不会继承主对话模型。即使主 Agent 已经能正常聊天，工作区里的 Claude Code 也需要单独配置模型才能工作。
:::

在「系统配置」→「模型管理」→「CC 模型组」中配置一个可用的模型，然后在工作区设置中选择它。

为了方便快速上手，系统默认预置了来自 [NekroAI 中转站](https://api.nekro.ai) 的 CC 模型组配置。您可以前往 [NekroAI 中转站](https://api.nekro.ai) 注册账号并创建 API Key，然后把它填入 CC 模型组的「API 密钥」字段；接入点和模型名称可先使用预置值。

![工作区选择 CC 模型组](/assets/workspace/quickstart/select_cc_model_group.png)

## 第四步：启动 Claude Code 沙盒

在工作区详情页中启动 Claude Code 沙盒。

首次启动可能需要拉取镜像，按界面提示完成即可。镜像准备好后，沙盒会在几秒内启动完成。

![启动 Claude Code 沙盒](/assets/workspace/quickstart/start_cc_sandbox.png)

## 第五步：体验第一个任务

回到绑定的频道，给 AI 一个真实任务试试：

- 「帮我写一个 Python 脚本，统计一段文本中每个词出现的次数」
- 「分析这张图片里的内容」
- 「帮我生成一个本周工作总结的模板」

如果 AI 能正常执行代码并返回结果，说明工作区已经就绪。

::: tip 试一试更复杂的
工作区的价值在于处理复杂任务。试着给 AI 一个需要多步骤完成的任务，例如「分析这份数据并生成可视化图表」或「整理这些文件并输出一份摘要报告」。
:::

## 如果遇到问题

### 主对话正常，但 Claude Code 不工作

99% 是因为没有配置 CC 模型组。回到[第三步](#第三步-配置-cc-模型组)检查。

### 沙盒启动失败

检查镜像是否已拉取完成。如果网络受限，可以配置 Docker 镜像加速。

### 任务和上下文混乱

确认频道绑定到了正确的工作区。不同用途的频道不要共用同一个工作区。

## 下一步

工作区运行起来后，建议继续探索：

- [Claude Code 沙盒](/docs/03_workspace/claude_code_sandbox) — 了解沙盒的完整能力
- [知识库](/docs/03_workspace/knowledge_base) — 上传文档让 AI 成为您的领域专家
- [记忆系统](/docs/03_workspace/memory_system) — 开启长期记忆，让 AI 越用越好
- [MCP 服务管理](/docs/03_workspace/mcp_management) — 接入外部工具扩展能力
- [资源中心](/docs/03_workspace/resource_center) — 管理服务器、数据库、令牌等可复用资源
- [工作区定时器](/docs/03_workspace/timers) — 设置自动化任务
