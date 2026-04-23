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

## `nekro_agent.api.core`

提供基础能力和全局上下文入口。

**常用内容：**

- `core.logger` — 全局日志，适合没有插件实例上下文的公共代码
- `core.config` — 系统全局配置
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
| `task` | 全局任务控制对象 |
| `dynamic_import_pkg` | 动态包导入工具 |

### 命令相关

**`CommandPermission`** — 权限级别：`PUBLIC` / `USER` / `ADVANCED` / `SUPER_USER`

**`CmdCtl`** — 命令响应控制器，通过类方法返回标准响应：
- `CmdCtl.success(msg)` — 成功
- `CmdCtl.failed(msg)` — 失败
- `CmdCtl.message(msg)` — 中间输出（配合 `yield` 实现流式命令）
- `CmdCtl.wait(msg)` — 等待状态

**`Arg`** — 命令参数描述符，配合 `Annotated` 声明参数语义和位置属性，帮助命令解析器生成结构化参数。

**`CommandExecutionContext`** — 命令执行上下文，提供命令来源频道、操作者、语言和权限信息。与 `AgentCtx` 不同，它偏向命令执行侧而非消息/文件系统侧。

### 异步任务相关

**`TaskCtl`** — 任务内部状态上报：`report_progress` / `success` / `fail` / `cancel`

**`AsyncTaskHandle`** — 任务句柄，提供 `wait` / `notify` / `notify_agent` / `cancel_all` 等能力。

**`task`** — 全局任务控制对象，用于从外部启动、查询、取消任务。

详细用法参见 [异步任务](/docs/04_plugin_dev/03_advanced_features/3.6_async_tasks)。

## `nekro_agent.api.signal`

用于消息处理链路中的控制信号，适用于需要干预 Agent 处理流程的场景。对工具插件、命令插件和定时任务插件来说，通常不是优先需要掌握的模块。

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
