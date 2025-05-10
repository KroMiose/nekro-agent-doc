---
title: 系统 API 参考
description: Nekro Agent 插件开发中可用的核心系统服务 API 参考，包括消息、上下文、定时器、核心工具及插件和数据库模型 API。
---

# 系统 API 参考

Nekro Agent 为插件开发者提供了一系列核心系统服务的 API，使得插件能够与 Agent 的核心功能进行深度集成。这些 API 通常通过 `nekro_agent.api` 包下的模块进行访问。

本参考将概述主要的 API 模块及其常用功能。更详细的参数、返回值和具体用法，请直接查阅 Nekro Agent 的源代码或使用 IDE 的智能提示功能。

## 1. 核心服务 (`nekro_agent.api.core`)

`core` 模块提供了一些基础和核心的工具及服务。

*   **日志服务 (`core.logger`)**
    *   提供标准的日志记录功能，支持不同级别（如 `debug`, `info`, `warning`, `error`, `success`, `critical`）。
    *   示例: `core.logger.info("插件已启动")`
    *   插件应使用此 logger 记录其运行状态和关键事件，方便调试和监控。

*   **Qdrant 向量数据库客户端**
    *   `core.get_qdrant_client() -> Optional[QdrantClient]` (async): 获取全局 Qdrant 客户端实例。
    *   `core.get_qdrant_config() -> Optional[dict]` (async): 获取 Qdrant 连接配置。
    *   详见 [使用向量数据库](./03_advanced_features/3.4_vector_database.md) 章节。

*   **全局配置访问 (`core.config`)**
    *   可以直接访问 Nekro Agent 的全局配置项（定义在 Agent 主配置文件中）。
    *   示例: `api_base = core.config.NEKRO_API_BASE` (假设配置项存在)
    *   插件应优先使用自身的配置系统 (`plugin.config`)，仅在确实需要访问 Agent 全局配置时才使用 `core.config`。

## 2. 消息服务 (`nekro_agent.api.message`)

`message` 模块负责处理消息的发送。

*   **发送文本消息 (`message.send_text`)**
    *   `message.send_text(chat_key: str, text: str, ctx: AgentCtx)` (async)
    *   向指定的 `chat_key` (会话标识) 发送纯文本消息。
    *   `ctx` 是必需的，提供了发送上下文。

*   **发送图片消息 (`message.send_image`)**
    *   `message.send_image(chat_key: str, image_path: str, ctx: AgentCtx)` (async)
    *   `image_path` 可以是图片的 URL (str) 或本地文件路径 (str)。
    *   `ctx` 是必需的，提供了发送上下文。

*   **发送文件消息 (`message.send_file`)**
    *   `message.send_file(chat_key: str, file_path: str, ctx: AgentCtx)` (async)
    *   发送文件。`file_path` 参数同上。
    *   `ctx` 是必需的，提供了发送上下文。

这个 API 参考提供了一个概览。强烈建议插件开发者在实际开发中结合源代码、IDE 工具和具体的示例插件来深入理解和使用这些 API。 