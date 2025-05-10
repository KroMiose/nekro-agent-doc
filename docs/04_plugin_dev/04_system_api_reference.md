\
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

*   **HTTP 客户端 (`core.http_client`)**
    *   提供一个全局共享的 `httpx.AsyncClient` 实例，用于执行异步 HTTP 请求。
    *   推荐插件使用此共享客户端以复用连接池和统一管理。
    *   示例:
        ```python
        async def fetch_data(url: str):
            try:
                response = await core.http_client.get(url, timeout=10.0)
                response.raise_for_status() # 如果状态码不是 2xx 则抛出异常
                return await response.json()
            except httpx.HTTPStatusError as e:
                core.logger.error(f"HTTP 请求失败: {e.response.status_code} - {e.request.url}")
            except httpx.RequestError as e:
                core.logger.error(f"请求发生错误: {e.request.url} - {e}")
            return None
        ```

*   **Embedding 服务 (概念性)**
    *   虽然原文档未直接列出，但通常 Agent 系统会提供文本嵌入服务，例如 `core.embed_text(text: str, model: str) -> List[float]`。插件开发者应查找相关 API 以便与向量数据库配合使用。

## 2. 消息服务 (`nekro_agent.api.message`)

`message` 模块负责处理消息的发送。

*   **发送文本消息 (`message.send_text`)**
    *   `message.send_text(chat_key: str, text: str, ctx: AgentCtx, **kwargs)` (async)
    *   向指定的 `chat_key` (会话标识) 发送纯文本消息。
    *   `ctx` 是必需的，提供了发送上下文。

*   **发送 Markdown 消息 (`message.send_markdown`)**
    *   `message.send_markdown(chat_key: str, text: str, ctx: AgentCtx, **kwargs)` (async)
    *   发送支持 Markdown 格式的文本消息。

*   **发送图片消息 (`message.send_image`)**
    *   `message.send_image(chat_key: str, image: Union[str, bytes, Path], ctx: AgentCtx, **kwargs)` (async)
    *   `image` 可以是图片的 URL (str)、字节数据 (bytes) 或本地文件路径 (`pathlib.Path`)。

*   **发送文件消息 (`message.send_file`)**
    *   `message.send_file(chat_key: str, file: Union[str, bytes, Path], ctx: AgentCtx, filename: Optional[str] = None, **kwargs)` (async)
    *   发送文件。`file` 参数同上。`filename` 可指定显示的文件名。

*   **发送卡片消息 (`message.send_card_message`)**
    *   具体 API 取决于所支持的卡片消息格式（如 Adaptive Cards, QQ频道 Ark 等）。通常需要传入一个符合特定 schema 的字典或对象。
    *   `message.send_card_message(chat_key: str, card_content: Any, ctx: AgentCtx, **kwargs)` (async)

*   **撤回消息 (`message.recall_message`)**
    *   `message.recall_message(chat_key: str, message_id: str, ctx: AgentCtx, **kwargs)` (async)
    *   需要消息的唯一 ID (`message_id`)。

*   **根据平台特性发送 (`message.send_by_platform`)**
    *   一个更底层的接口，允许根据 `ctx.platform` 选择特定的消息构造和发送逻辑。

## 3. 上下文服务 (`nekro_agent.api.context`)

`context` 模块用于创建和管理 `AgentCtx` 对象。

*   **创建临时上下文 (`context.create_temp_ctx`)**
    *   `context.create_temp_ctx(chat_key: str, user_id: Optional[str] = None, event: Optional[Any] = None, **kwargs) -> AgentCtx` (async)
    *   在某些场景下（如 Webhook 或定时任务中），可能没有现成的 `AgentCtx`。此函数可以创建一个临时的上下文对象，主要用于消息发送或其他需要 `AgentCtx` 但不依赖完整事件流的场景。
    *   应谨慎使用，因为它可能不包含用户触发的原始事件信息。

## 4. 定时器服务 (`nekro_agent.api.timer`)

`timer` 模块允许插件注册和管理定时任务。这通常通过插件配置类中的特定字段类型并结合 Agent 核心的定时任务调度器实现。

*   **注册定时任务**：通常不是通过直接调用 `timer` 模块的函数，而是在插件的配置类 (`ConfigBase` 的子类) 中定义类型为 `CronJob` 或类似特定 Pydantic 模型的字段。

    ```python
    from nekro_agent.schemas.config import CronJob # 假设路径

    class MyTimerPluginConfig(ConfigBase):
        my_scheduled_task: CronJob = Field(
            default="0 9 * * *", # 每天上午9点执行
            title="每日报告任务",
            description="设置每日报告的 CRON 表达式。",
            json_schema_extra={
                "job_id": "my_daily_report_job", # 唯一的作业 ID
                "func_path": "my_timer_plugin.plugin.run_daily_report" # 指向插件中要执行的异步函数
            }
        )
    ```
    *   `job_id`: 任务的唯一标识符。
    *   `func_path`: 一个点分隔的字符串路径，指向插件模块内要执行的异步函数 (例如 `your_plugin_module.plugin_file.async_function_name`)。这个函数被调用时，通常会接收一个 `AgentCtx` (可能是临时的)。
*   Agent 核心会解析这些配置，并使用底层的调度库（如 `apscheduler`）来执行任务。
*   **动态管理**：如果需要更细致地动态添加、删除或修改定时任务，可能需要查阅 Agent 是否暴露了更底层的定时器管理 API (例如通过 `plugin.timer_manager` 或类似对象)。

## 5. 插件自身 API (`plugin` 对象)

插件实例 (`plugin`) 自身也提供了一些有用的属性和方法：

*   `plugin.name` (str): 插件名称。
*   `plugin.module_name` (str): 插件模块名。
*   `plugin.config` (ConfigBase): 访问已加载的插件配置实例。
*   `plugin.store` (PluginStore): 访问插件的键值存储。
    *   详见 [数据存储](./02_plugin_basics/2.4_storage.md) 章节。
*   `plugin.get_plugin_path() -> Path`: 获取插件的数据文件目录路径。
*   `plugin.get_vector_collection_name(suffix: Optional[str] = None) -> str`: 获取插件在向量数据库中的专属集合名称。
*   `plugin.sandbox_methods` (List[SandboxMethod]): (只读) 包含所有通过 `@plugin.mount_sandbox_method()` 静态注册的沙盒方法对象列表。

## 6. 数据库模型 API (ORM)

Nekro Agent 通常会使用一个 ORM (对象关系映射器)，如 Tortoise ORM，来与主数据库交互。如果插件需要直接操作 Agent 的核心数据模型（如用户、会话、插件注册信息等），可能需要通过 Agent 暴露的模型类进行。

*   **访问模型类**：模型类通常定义在 `nekro_agent.models` 或类似的路径下。
    *   例如: `from nekro_agent.models import User, Channel`
*   **CRUD 操作**：使用 ORM 提供的方法进行创建、读取、更新、删除操作。
    *   示例 (Tortoise ORM):
        ```python
        from nekro_agent.models import UserChannelConfig # 假设有此模型

        async def get_user_channel_setting(user_id: str, channel_id: str, key: str):
            setting = await UserChannelConfig.filter(
                user_id=user_id, 
                channel_id=channel_id, 
                key=key
            ).first()
            return setting.value if setting else None
        
        async def set_user_channel_setting(user_id: str, channel_id: str, key: str, value: str):
            await UserChannelConfig.update_or_create(
                defaults={"value": value},
                user_id=user_id,
                channel_id=channel_id,
                key=key
            )
        ```

**注意**：直接操作核心数据库模型需要非常小心，确保充分理解数据结构和潜在影响，避免破坏 Agent 的数据一致性或核心功能。优先使用 Agent 提供的封装好的服务 API（如 `plugin.store`, `message` 服务等）。仅在确实需要且没有其他替代方案时，才考虑直接操作 ORM 模型。

---

这个 API 参考提供了一个概览。强烈建议插件开发者在实际开发中结合源代码、IDE 工具和具体的示例插件来深入理解和使用这些 API。 