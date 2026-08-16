---
title: MCP 服务管理
description: 通过 MCP 协议为工作区接入外部工具和数据源，让 AI 能力突破对话边界
---

# MCP 服务管理

<p style="font-size: 1.2em;"><strong>是否依赖 CC 沙盒：是</strong></p>

<p style="font-size: 1.2em;"><strong>是否必须绑定工作区：是</strong></p>

MCP（Model Context Protocol）让 AI 的能力**突破对话边界**。

通过 MCP 协议，您可以为工作区接入各种外部工具和数据源——数据库查询、API 调用、监控系统、项目管理平台、搜索引擎等。AI 不再局限于文本对话，而是可以**直接操作真实的工具和服务**。

MCP 服务运行在 Claude Code 沙盒内，因此需要先启用 CC 沙盒。

![MCP 服务列表](/assets/workspace/mcp_management/mcp_service_list.png)

## MCP 能做什么

MCP 是一个开放协议，社区已经有大量现成的 MCP 服务可以直接使用。以下是一些典型场景：

| 场景 | MCP 服务示例 | AI 可以做什么 |
|---|---|---|
| **搜索** | Brave Search、Google Search | 实时搜索互联网，获取最新信息 |
| **代码管理** | GitHub、GitLab | 创建 PR、管理 Issue、查看仓库 |
| **数据库** | PostgreSQL、MySQL、SQLite | 直接查询和操作数据库 |
| **文件存储** | S3、Google Drive | 读写云端文件 |
| **监控** | Datadog、Sentry | 查看监控指标、错误日志 |
| **通信** | Slack、Discord | 发送消息、获取频道信息 |
| **知识管理** | Notion、Confluence | 读取和更新文档 |
| **任务管理** | Linear、Jira | 管理项目任务和看板 |

这只是冰山一角。任何支持 MCP 协议的服务都可以接入。

## 为什么按工作区管理

不同工作区承担不同用途，需要的工具也不同：

- **开发工作区**：GitHub + PostgreSQL + Sentry
- **运维工作区**：Datadog + 服务器管理工具
- **内容工作区**：Notion + Google Search + 图片生成

按工作区管理 MCP 服务可以：

- **精确控制能力范围**：每个工作区只加载需要的工具
- **避免干扰**：无关的工具不会出现在 AI 的可用列表中
- **独立配置**：不同工作区可以连接不同的数据源实例

## 前置条件

使用 MCP 服务前，确认以下准备已完成：

1. 工作区已创建并绑定频道
2. 工作区已配置可用的 CC 模型组
3. Claude Code 沙盒已启动且正常运行

## 支持的传输类型

MCP 服务支持三种接入方式：

| 类型 | 适用场景 | 配置方式 |
|---|---|---|
| **stdio** | 最常见，基于本地命令行进程 | 指定命令和参数 |
| **SSE** | 远程服务，基于 Server-Sent Events | 指定 URL |
| **HTTP** | 远程服务，基于 Streamable HTTP | 指定 URL |

大多数社区 MCP 服务使用 stdio 类型，通过 `npx` 或 `uvx` 启动。

## 配置步骤

### 1. 进入 MCP 管理页面

在工作区详情页中找到 MCP 服务管理区域。

### 2. 添加 MCP 服务

![添加 MCP 服务](/assets/workspace/mcp_management/add_mcp_service.png)

根据传输类型填写配置：

**stdio 类型**（本地命令）：
- 服务名称
- 启动命令（如 `npx`）
- 命令参数（如 `["-y", "@modelcontextprotocol/server-github"]`）
- 环境变量（如 `{"GITHUB_TOKEN": "ghp_xxx"}`）

**SSE / HTTP 类型**（远程服务）：
- 服务名称
- 服务 URL
- 请求头（如认证信息）

### 3. 保存并同步

配置完成后保存。MCP 服务会在 CC 沙盒启动时自动加载。

如果在沙盒运行期间修改了 MCP 配置，需要同步或重启沙盒才能生效。

## 使用建议

- **按需添加**：不需要一次配置所有工具，遇到需要时再添加即可
- **注意认证信息**：MCP 服务通常需要 API Token 等认证，通过环境变量传入
- **验证连接**：添加后在对话中让 AI 调用一次新工具，确认配置正确
- **关注社区**：MCP 协议的生态在快速增长，定期关注新发布的 MCP 服务可以为 AI 带来更多能力

## 相关文档

- [Claude Code 沙盒](/docs/03_workspace/claude_code_sandbox) — MCP 运行在 CC 沙盒中
- [工作区总览](/docs/03_workspace/overview)
- [快速上手](/docs/03_workspace/quickstart)
