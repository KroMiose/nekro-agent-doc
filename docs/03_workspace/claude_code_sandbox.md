---
title: Claude Code 沙盒
description: Claude Code 沙盒是工作区的核心执行引擎，让 AI 真正具备编程、文件处理和工具调用能力
---

# Claude Code 沙盒

<p style="font-size: 1.2em;"><strong>是否依赖 CC 沙盒：是</strong></p>

<p style="font-size: 1.2em;"><strong>是否必须绑定工作区：是</strong></p>

Claude Code 沙盒（CC 沙盒）是工作区的核心执行引擎。

没有它，AI 只能聊天；有了它，AI 可以**写代码、跑脚本、处理文件、操作浏览器、连接外部服务**。如果说工作区是 AI 的办公室，CC 沙盒就是办公桌上的电脑。

每个工作区拥有独立的 CC 沙盒实例，运行在隔离的 Docker 容器中。任务在后台异步执行，完成后自动把结果推送回对话。

![Claude Code 沙盒页面或启动入口](/assets/workspace/claude_code_sandbox/sandbox_entry.png)

::: warning 独立模型配置
CC 沙盒使用独立的 **CC 模型组**，不继承主对话模型。即使主 Agent 已经能正常聊天，CC 沙盒也需要单独配置模型才能工作，具体见[CC模型组](/docs/03_workspace/quickstart.md#第三步-配置-cc-模型组)。这是最常见的问题来源。
:::

## 沙盒能做什么

### 编程与代码执行

沙盒预装了完整的开发环境：

| 工具 | 版本 | 用途 |
|---|---|---|
| Python | 3.13 | 数据分析、脚本、自动化 |
| Node.js | 20 | Web 开发、工具链 |
| git | — | 版本控制 |
| gh | — | GitHub CLI，创建 PR、管理 Issue |
| uv | — | Python 包管理（推荐替代 pip） |
| npm | — | Node.js 包管理 |
| curl / wget | — | HTTP 请求 |
| jq | — | JSON 处理 |
| ssh | — | 远程连接 |

您不需要自己安装这些工具，它们在沙盒启动时就已经就绪。

### 浏览器自动化

沙盒内置了 `agent-browser`（基于 Playwright + Chromium），可以直接打开网页、截图、提取信息。AI 可以用它来：

- 查看网页并提取内容
- 截取网页截图
- 自动化填写表单

### 文件处理

AI 可以在沙盒中直接处理文件：

- 读取、创建、编辑文件
- 对话中发送的图片和文件可以上传到沙盒
- 沙盒产出的文件自动通过共享目录返回给您
- 支持生成图表、报告、补丁、压缩包等各种格式

### 外部工具集成

通过 [MCP 服务](/docs/03_workspace/mcp_management)，沙盒可以连接外部工具和数据源，进一步扩展能力。

## 典型使用场景

| 场景 | 具体示例 |
|---|---|
| **数据分析** | 「分析这份 CSV 数据，生成趋势图表」 |
| **代码开发** | 「帮我写一个 FastAPI 接口，处理用户注册逻辑」 |
| **文件转换** | 「把这批 Markdown 文件转换成 HTML」 |
| **信息采集** | 「打开这个网页，提取所有产品价格信息」 |
| **报告生成** | 「根据这些数据生成一份周报」 |
| **GitHub 操作** | 「在这个仓库创建一个 PR，修复登录页的样式问题」 |
| **项目脚手架** | 「帮我初始化一个 React + TypeScript 项目」 |
| **批量处理** | 「重命名这些文件并按日期归类」 |

## 如何开始

1. 创建工作区并绑定频道
2. 配置 **CC 模型组**（在「系统配置」→「模型管理」中添加）
3. 在工作区中选择 CC 模型组
4. 启动 CC 沙盒
5. 在频道中给 AI 发送任务

![Claude Code 沙盒运行状态](/assets/workspace/claude_code_sandbox/sandbox_status.png)

## 任务如何执行

CC 沙盒采用异步委托模式：

1. 您在频道中描述任务
2. 主 Agent 理解任务后，将完整的任务描述委托给 CC 沙盒
3. CC 沙盒在后台独立执行（您可以继续聊天）
4. 执行完成后，结果自动推送回对话

每个频道同时只能运行一个 CC 任务。如果需要取消当前任务，可以发起新任务或使用取消命令。

## 文件交换

主对话和 CC 沙盒之间通过共享目录交换文件：

- **上传到沙盒**：对话中发送的图片、文件会自动传入沙盒
- **从沙盒取回**：CC 沙盒产出的文件放在 `/workspace/default/shared/` 目录，系统自动将其发送给您

## 沙盒维护

### 重启

遇到以下情况时，先尝试重启：

- 沙盒状态异常
- 回复出现异常
- 运行卡顿
- MCP 服务更新后需要重新加载

### 重建

如果重启无法解决问题（例如环境长期异常），使用重建。重建会重新创建容器，但保留工作区数据。

### 重置会话

如果 AI 的上下文被旧任务带偏，使用重置会话。这只清除对话上下文，不影响沙盒环境。

![沙盒异常时的重启或重置入口](/assets/workspace/claude_code_sandbox/restart_or_reset.png)

## 相关文档

- [工作区总览](/docs/03_workspace/overview)
- [快速上手](/docs/03_workspace/quickstart)
- [MCP 服务管理](/docs/03_workspace/mcp_management) — 扩展沙盒的工具能力
- [记忆系统](/docs/03_workspace/memory_system) — CC 任务结论自动沉淀为长期记忆
