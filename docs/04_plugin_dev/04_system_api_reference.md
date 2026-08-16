---
title: 系统 API 参考
description: Nekro Agent 插件开发中常用的系统 API 参考，涵盖 message、timer、recurring_timer、plugin、core 与 signal 模块
---

# 系统 API 参考

本文档覆盖插件开发中最常用的公共 API，帮助开发者快速确认各模块的职责范围和典型用法。完整的参数列表和类型注解以源码及 IDE 提示为准。

## 模块总览

插件开发常用的公共 API 均位于 `nekro_agent.api` 下：

| 模块 | 主要职责 |
|---|---|
| `core` | 基础能力与全局上下文入口 |
| `message` | 向用户或 Agent 发送消息 |
| `timer` | 一次性与临时定时器 |
| `recurring_timer` | 循环定时任务（cron） |
| `plugin` | 插件基类、命令系统、异步任务、动态包导入 |
| `signal` | 消息处理链路控制信号 |
| `i18n` | 国际化工具（`i18n_text`、`I18nDict`、`SupportedLang`、`get_text`） |
| `schemas` | 通用类型定义（`AgentCtx`、`WebhookRequest`、`AgentMessageSegment`、`AgentMessageSegmentType`） |

## `nekro_agent.api.core`

提供基础能力和全局上下文入口。

**常用内容：**

- `core.CoreConfig` — 核心配置类
- `core.ModelConfigGroup` — 模型配置组
- `core.config` — 系统全局配置实例
- `core.logger` — 全局日志，适合没有插件实例上下文的公共代码
- `core.get_qdrant_client()` — 向量数据库客户端
- `core.get_qdrant_config()` — 向量数据库配置

插件内部日志建议使用 `plugin.logger`，它会自动附带插件维度信息，便于在 WebUI 日志页按插件过滤。

## `nekro_agent.api.message`

负责将内容发回用户或将系统消息送回 Agent。

**常用函数：**

- `send_text(chat_key, message, ctx, *, record=True, ref_msg_id=None)`
- `send_image(chat_key, image_path, ctx, *, record=True, ref_msg_id=None)`
- `send_file(chat_key, file_path, ctx, *, record=True, ref_msg_id=None)`
- `push_system(chat_key, message, ctx=None, trigger_agent=False)`
- `download_from_url(url, ctx)`

**`send_text` vs `push_system`：**

- `send_text` — 向用户发送可见消息
- `push_system` — 向 Agent 注入系统消息上下文，适合把外部事件、定时触发、异步任务结果推回 Agent 继续处理

## `nekro_agent.api.timer`

负责一次性与临时定时器。

**常用函数：**

- `set_timer(chat_key, trigger_time, event_desc)` — 设置一次性定时器
- `set_temp_timer(chat_key, trigger_time, event_desc)` — 设置临时定时器（同频道下同时只保留最新一个）
- `clear_timers(chat_key, temporary=None)` — 清除定时器
- `get_timers(chat_key)` — 查询当前定时器列表

适用于一次性提醒、短期自我唤醒、某个时间点再次触发 Agent 的场景。需要长期重复执行、cron 表达式或工作日模式时，应使用 `recurring_timer`。

## `nekro_agent.api.recurring_timer`

用于正式的循环定时任务编排，封装了持久化、调度恢复、cron 校验和时区处理。

**常用函数：**

- `create_cron_job(chat_key, cron_expr, event_desc, timezone, workday_mode="none", title=None)`
- `update_job(job_id, ...)` — 更新任务配置
- `get_job(job_id)` — 查询单个任务
- `delete_job(job_id)` — 删除任务
- `pause_job(job_id)` — 暂停任务
- `resume_job(job_id)` — 恢复任务
- `run_now(job_id)` — 立即执行一次
- `list_jobs(chat_key, status=None, limit=50)` — 列出任务
- `get_job_summary(chat_key, upcoming_limit, recent_limit)` — 获取任务摘要
- `validate_cron_expr(cron_expr)` — 校验 cron 表达式
- `validate_timezone(timezone)` — 校验时区字符串

适用于每日例行任务、周期巡检、定时同步及面向工作区的长期自动化流程。

## `nekro_agent.api.plugin`

插件开发的核心导入入口，暴露了插件基类、命令系统、异步任务及若干工具类型。

**主要导出项：**

| 类 / 对象 | 说明 |
|---|---|
| `NekroPlugin` | 插件基类 |
| `ConfigBase` | 插件配置基类 |
| `ExtraField` | 配置字段的扩展元信息（如国际化标题、描述） |
| `PluginStore` | 插件数据存储接口（`get` / `set` / `delete`） |
| `SandboxMethod`, `SandboxMethodType` | 沙盒方法装饰器类型 |
| `CmdCtl` | 命令响应控制器 |
| `CommandGroup` | 命令组 |
| `CommandPermission` | 命令权限级别 |
| `CommandExecutionContext` | 命令执行上下文 |
| `CommandResponse` | 命令响应类型 |
| `Arg` | 命令参数描述符 |
| `TaskCtl`, `TaskSignal` | 异步任务状态信号 |
| `AsyncTaskHandle` | 异步任务句柄 |
| `TaskRunner` | 任务运行器 |
| `task` | 全局任务控制对象（`TaskAPI` 实例） |
| `dynamic_import_pkg` | 动态包导入工具 |

### NekroPlugin

插件基类，所有插件必须实例化此类。构造函数接受以下参数：

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `name` | `str` | 是 | 插件名称（默认语言） |
| `module_name` | `str` | 是 | 插件模块名（仅允许字母、数字、下划线） |
| `description` | `str` | 是 | 插件描述（默认语言） |
| `version` | `str` | 是 | 插件版本 |
| `author` | `str` | 是 | 插件作者（仅允许字母、数字、下划线） |
| `url` | `str` | 是 | 插件仓库/主页地址 |
| `support_adapter` | `List[str]` | 否 | 支持的适配器列表，`None` 表示全部支持 |
| `is_builtin` | `bool` | 否 | 是否为内置插件 |
| `is_package` | `bool` | 否 | 是否为包插件 |
| `i18n_name` | `I18nDict` | 否 | 插件名称国际化字典 |
| `i18n_description` | `I18nDict` | 否 | 插件描述国际化字典 |
| `allow_sleep` | `bool \| None` | 否 | 是否允许 Agent 休眠 |
| `sleep_brief` | `str` | 否 | 休眠时的简要说明 |

**装饰器方法（挂载回调与功能）：**

- `mount_config()` — 挂载插件配置类（继承自 `ConfigBase`）
- `mount_init_method()` — 挂载初始化方法，在插件加载时执行
- `mount_cleanup_method()` — 挂载清理方法，在插件卸载时执行
- `mount_prompt_inject_method(name, description)` — 挂载提示注入方法，在对话开始前执行，返回内容注入到 Agent 提示中
- `mount_on_channel_reset()` — 挂载频道重置回调
- `mount_on_user_message()` — 挂载用户消息回调，可返回 `MsgSignal` 控制消息处理流程
- `mount_on_system_message()` — 挂载系统消息回调，可返回 `MsgSignal` 控制消息处理流程
- `mount_webhook_method(endpoint, name, description)` — 挂载 Webhook 端点
- `mount_router()` — 挂载 FastAPI 路由，插件路由挂载在 `/plugins/{plugin_key}` 下
- `mount_async_task(task_type)` — 注册异步任务函数
- `mount_command(name, description, ...)` — 注册插件命令
- `mount_command_group(name, description, ...)` — 创建命令组，将多个子命令组织在一个前缀下
- `mount_collect_methods()` — 挂载自定义方法收集函数，根据上下文动态过滤可用的沙盒方法
- `on_enabled()` — 注册插件启用时的回调
- `on_disabled()` — 注册插件禁用时的回调

**实例方法与属性：**

- `get_config()` — 获取插件配置实例
- `save_config(config)` — 保存插件配置到文件
- `get_plugin_data_dir()` — 获取插件专属数据目录（`DATA_DIR/plugin_data/{author}.{module_name}/`）
- `store` — 属性，返回 `PluginStore` 实例，用于键值对数据存储
- `get_vector_collection_name(key)` — 获取插件在向量数据库中的集合名称

### PluginStore

插件数据存储接口，通过 `plugin.store` 属性获取。提供基于键值对的持久化存储，支持按聊天频道和用户维度隔离数据。

- `get(chat_key="", user_key="", store_key="")` — 获取存储值，返回 `Optional[str]`
- `set(chat_key="", user_key="", store_key="", value="")` — 设置存储值，返回 `0`（创建）或 `1`（更新）
- `delete(chat_key="", user_key="", store_key="")` — 删除存储值，返回 `0`（删除成功）或 `1`（记录不存在）

所有参数均可为空字符串，用于控制数据的隔离粒度（全局 / 频道级 / 用户级）。

### 命令相关

**`CommandPermission`** — 权限级别：`PUBLIC` / `USER` / `ADVANCED` / `SUPER_USER`

**`CmdCtl`** — 命令响应控制器，通过类方法返回标准响应：
- `CmdCtl.success(msg)` — 成功
- `CmdCtl.failed(msg)` — 失败
- `CmdCtl.message(msg)` — 中间输出（配合 `yield` 实现流式命令）
- `CmdCtl.wait(message, callback_cmd, options=None, timeout=60.0, on_timeout_message="", context_data=None)` — 交互等待，挂起命令并等待用户后续输入，路由到 `callback_cmd`

**`Arg`** — 命令参数描述符，配合 `Annotated` 声明参数语义和位置属性，帮助命令解析器生成结构化参数。支持两种写法（效果等价）：

```python
# 写法一（推荐）：直接作为默认值
location: str = Arg("城市名", default="北京", positional=True)

# 写法二：配合 Annotated
location: Annotated[str, Arg("城市名", positional=True)] = "北京"
```

构造参数：

| 参数 | 类型 | 说明 |
|---|---|---|
| `description` | `str` | 参数描述 |
| `default` | `Any` | 默认值（未设置时表示必填） |
| `positional` | `bool` | 是否为位置参数（默认 `False`） |
| `greedy` | `bool` | 是否贪婪匹配（消耗剩余所有输入） |
| `choices` | `list[str]` | 可选值列表 |
| `range` | `tuple[Any, Any]` | 数值范围约束 |
| `prompt_hint` | `str` | 提示信息（用于 Agent Tool-Use 的 JSON Schema） |

**`CommandExecutionContext`** — 命令执行上下文，提供命令来源频道、操作者、语言和权限信息。与 `AgentCtx` 不同，它偏向命令执行侧而非消息/文件系统侧。

### 异步任务相关

**`TaskCtl`** — 任务内部状态上报：`report_progress` / `success` / `fail` / `cancel`

**`AsyncTaskHandle`** — 任务句柄，提供以下能力：

- `wait(key, timeout=None)` — 等待外部信号，任务在此处暂停
- `notify(key, data=None)` — 通知等待点恢复
- `cancel_wait(key)` — 取消特定等待点
- `cancel_all()` — 取消所有等待点，返回取消数量
- `notify_agent(message, trigger=True)` — 向主 Agent 推送系统消息
- `is_cancelled` — 属性，任务是否已被取消

**`task`** — 全局任务控制对象（`TaskAPI` 实例），提供以下方法：

- `task.start(task_type, task_id, chat_key, plugin, *args, on_terminal=None, **kwargs)` — 启动任务，返回 `AsyncTaskHandle`
- `task.get_handle(task_type, task_id)` — 获取任务句柄
- `task.get_state(task_type, task_id)` — 获取任务最新状态
- `task.is_running(task_type, task_id)` — 检查任务是否运行中
- `task.cancel(task_type, task_id)` — 取消任务
- `task.stop_all()` — 停止所有任务
- `task.get_running_tasks()` — 获取运行中的任务 Key 列表
- `task.runner()` — 获取底层 `TaskRunner` 实例

详细用法参见 [异步任务](/docs/04_plugin_dev/03_advanced_features/3.6_async_tasks)。

## `nekro_agent.api.schemas`

提供通用类型定义。

**主要导出项：**

- `AgentCtx` — Agent 执行上下文
- `WebhookRequest` — Webhook 请求模型
- `AgentMessageSegment` / `AgentMessageSegmentType` — Agent 消息段类型

### AgentCtx

`AgentCtx` 是插件开发中最核心的上下文对象，封装了 Agent 在执行任务时所需的全部信息。

**常用属性：**

- `chat_key` — 聊天频道唯一 ID
- `from_platform_userid` — 触发本次 Agent 的用户平台 ID
- `container_key` — 沙盒容器标识
- `adapter_key` — 适配器标识（如 `onebot_v11`）
- `channel_id` / `channel_name` / `channel_type` — 频道信息
- `fs` — 文件系统工具（`mixed_forward_file` / `get_file`）
- `ms` — 消息模块（用于向其他频道发送消息）
- `adapter` — 适配器实例
- `db_chat_channel` — 数据库聊天频道实例
- `db_user` — 触发用户的数据库实例

**常用方法：**

- `get_bound_workspace()` — 获取当前频道绑定的工作区实例，未绑定时返回 `None`
- `get_preset_by_id(preset_id)` — 根据人设 ID 获取人设数据，`-1` 返回 `None`
- `get_effective_preset_by_id(preset_id=-1)` — 获取生效人设，`-1` 时返回默认人设（总是有值）
- `set_preset(preset_id=None)` — 设置当前生效人设，返回是否发生变更
- `current_preset()` — 获取当前生效的人设（等价于 `get_effective_preset_by_id()`）
- `get_core_config()` — 获取当前生效的核心配置（三层配置混合）
- `send_text(content, record=True)` — 发送文本到当前频道
- `send_image(file_path, record=True)` — 发送图片到当前频道
- `send_file(file_path, record=True)` — 发送文件到当前频道
- `push_system(message, trigger_agent=False)` — 推送系统消息

## `nekro_agent.api.signal`

用于消息处理链路中的控制信号，适用于需要干预 Agent 处理流程的场景。对工具插件、命令插件和定时任务插件来说，通常不是优先需要掌握的模块。

**`MsgSignal`** — 消息处理控制信号，处理顺序为：记录消息 -> 触发处理。

| 信号 | 值 | 说明 |
|---|---|---|
| `FORCE_TRIGGER` | `-1` | 强制触发后续处理（即使消息原本不会触发） |
| `CONTINUE` | `0` | 继续处理消息，默认行为 |
| `BLOCK_TRIGGER` | `1` | 允许消息被记录到历史，但阻止消息触发后续处理 |
| `BLOCK_ALL` | `2` | 阻止消息被记录到历史，同时也会阻止消息触发后续处理 |

## 典型插件类型的导入组合

### 工具插件

```python
from nekro_agent.api import message, core
from nekro_agent.api.plugin import NekroPlugin, SandboxMethodType
from nekro_agent.api.schemas import AgentCtx
```

### 命令插件

```python
from nekro_agent.api.plugin import (
    NekroPlugin, CmdCtl, Arg,
    CommandPermission, CommandExecutionContext, CommandResponse,
)
```

### 自动化插件

```python
from nekro_agent.api import timer, recurring_timer, message
from nekro_agent.api.plugin import NekroPlugin, AsyncTaskHandle, TaskCtl, task
```

## 相关文档

- [插件命令开发](/docs/04_plugin_dev/05_command_development)
- [插件定时任务开发](/docs/04_plugin_dev/06_timer_development)
- [异步任务](/docs/04_plugin_dev/03_advanced_features/3.6_async_tasks)
- [数据存储](/docs/04_plugin_dev/02_plugin_basics/2.4_storage)
- [文件交互](/docs/04_plugin_dev/03_advanced_features/3.2_file_interaction)
