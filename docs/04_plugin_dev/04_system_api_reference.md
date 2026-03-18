---
title: 系统 API 参考
description: Nekro Agent 插件开发中可用的核心系统服务 API 参考，包括消息、上下文、定时器、核心工具及插件和数据库模型 API。
---

# 系统 API 参考

Nekro Agent 为插件开发者提供了一系列核心系统服务的 API，使得插件能够与 Agent 的核心功能进行深度集成。这些 API 通常通过 `nekro_agent.api` 包下的模块进行访问。

本参考将概述主要的 API 模块及其常用功能。更详细的参数、返回值和具体用法，请直接查阅 Nekro Agent 的源代码或使用 IDE 的智能提示功能。

## 1. 核心服务 (`nekro_agent.api.core`)

`core` 模块提供了一些基础和核心的工具及服务。

*   **日志服务**
    *   **推荐**：使用插件实例自带的 **`plugin.logger`**。该 logger 会自动打上 `plugin_key` 等标记，便于在 WebUI「日志」页按插件过滤查看。用法与标准 logger 一致，例如：`plugin.logger.info("插件已启动")`、`plugin.logger.error("操作失败", exc_info=True)`。
    *   **备选**：`core.logger` 提供全局日志，支持级别 `debug`、`info`、`warning`、`error`、`success`、`critical`。若尚未拿到插件实例或为非插件代码，可使用 `core.logger`。
    *   插件内应统一使用 `plugin.logger` 记录运行状态与关键事件，便于调试与按插件维度排查问题。

*   **Qdrant 向量数据库客户端**
    *   `core.get_qdrant_client() -> Optional[QdrantClient]` (async): 获取全局 Qdrant 客户端实例。
    *   `core.get_qdrant_config() -> Optional[dict]` (async): 获取 Qdrant 连接配置。
    *   详见 [使用向量数据库](/docs/04_plugin_dev/03_advanced_features/3.3_vector_database.md) 章节。

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

## 3. 定时器服务 (`nekro_agent.api.timer`)

`timer` 模块提供一次性与临时定时器能力；周期任务（Cron）与工作日模式由内置插件「定时器工具集」提供。

*   **一次性定时器 (`timer.set_timer`)**
    *   `timer.set_timer(chat_key: str, trigger_time: int, event_desc: str) -> bool` (async)
    *   在指定时间戳触发提醒。一次性/临时定时器会持久化到数据目录，服务重启后可恢复。
*   **临时定时器 (`timer.set_temp_timer`)**
    *   `timer.set_temp_timer(chat_key: str, trigger_time: int, event_desc: str) -> bool` (async)
    *   每个会话仅保留最后一个临时定时器，适合短期自我唤醒。
*   **清空定时器 (`timer.clear_timers`)**
    *   `timer.clear_timers(chat_key: str, temporary: Optional[bool] = None) -> bool` (async)
    *   `temporary` 为 `None` 时清空全部，为 `True`/`False` 时仅清空临时/非临时。

**周期任务与工作日模式**：内置插件「定时器工具集」提供持久化周期任务（如 `create_recurring_timer`、`list_recurring_timers` 等）及 `workday_mode`：`none`（完全按 cron）、`mon_fri`（周一至周五）、`weekend`（仅周末）、`cn_workday`（中国法定工作日，含调休/补班）、`cn_restday`（中国休息日）。中国法定工作日/休息日**默认支持**，无需额外配置。

这个 API 参考提供了一个概览。强烈建议插件开发者在实际开发中结合源代码、IDE 工具和具体的示例插件来深入理解和使用这些 API。 
