---
title: 插件定时任务开发
description: 使用 Nekro Agent timer 与 recurring_timer API 为插件实现一次性和周期性定时任务
---

# 插件定时任务开发

插件定时任务主要通过两个 API 实现：

- `nekro_agent.api.timer` — 一次性与临时定时器
- `nekro_agent.api.recurring_timer` — 循环定时任务（cron）

## 选择依据

| 需求 | 推荐 API |
|---|---|
| 一次性提醒、临时自我唤醒 | `timer` |
| 周期重复执行、cron 表达式 | `recurring_timer` |
| 需要暂停/恢复/立即执行 | `recurring_timer` |
| 工作日/节假日模式 | `recurring_timer` |

## 一次性定时器

### 基本用法

```python
import time
from nekro_agent.api import timer

async def remind_later(chat_key: str) -> bool:
    return await timer.set_timer(
        chat_key=chat_key,
        trigger_time=int(time.time()) + 300,
        event_desc="五分钟后提醒用户继续当前任务",
    )
```

如需保证同一频道只保留最新一个短期提醒，使用 `set_temp_timer`：

```python
await timer.set_temp_timer(
    chat_key=chat_key,
    trigger_time=int(time.time()) + 60,
    event_desc="一分钟后再次检查状态",
)
```

### trigger_time 特殊值

`trigger_time` 参数除正常 Unix 时间戳外还支持以下特殊值：

| 值 | 行为 |
|---|---|
| `0` | 立即触发当前频道的 Agent 任务（等效于 `schedule_agent_task`） |
| 负数（如 `-1`） | 清空当前频道的定时器 |

### 管理定时器

```python
from nekro_agent.api import timer

# 获取当前频道所有未触发的定时器
timers = await timer.get_timers(chat_key)

# 清空当前频道的所有定时器
await timer.clear_timers(chat_key)

# 只清空临时定时器
await timer.clear_timers(chat_key, temporary=True)

# 只清空非临时定时器
await timer.clear_timers(chat_key, temporary=False)
```

### 持久化与 misfire 补发

一次性定时器（`set_timer` / `set_temp_timer` 设置的无回调普通定时器）会被自动持久化到磁盘。服务重启后会自动恢复：

- **未过期的定时器**：恢复后继续按原定时间触发。
- **已过期但在宽限期内（默认 300 秒）的定时器**：立即补发一次系统消息。
- **已过期且超出宽限期**：丢弃。

## 循环定时任务

```python
from nekro_agent.api import recurring_timer

async def create_daily_job(chat_key: str) -> str:
    job = await recurring_timer.create_cron_job(
        chat_key=chat_key,
        cron_expr="0 9 * * *",
        event_desc="每天上午九点执行日报提醒",
        timezone="Asia/Shanghai",
        workday_mode="mon_fri",
        title="工作日报提醒",
    )
    return job.job_id
```

### 常用操作

```python
# 暂停 / 恢复 / 立即执行 / 删除
await recurring_timer.pause_job(job_id)
await recurring_timer.resume_job(job_id)
await recurring_timer.run_now(job_id)
await recurring_timer.delete_job(job_id)

# 更新任务（可同时更新多个字段）
await recurring_timer.update_job(
    job_id,
    cron_expr="0 10 * * *",
    event_desc="更新后的描述",
    timezone="Asia/Shanghai",
    workday_mode="mon_fri",
    title="新标题",
)

# 查询
jobs = await recurring_timer.list_jobs(chat_key)                          # 全部
active_jobs = await recurring_timer.list_jobs(chat_key, status="active")  # 仅活跃
job = await recurring_timer.get_job(job_id)                               # 单个任务

# 任务统计摘要：返回 (活跃数, 暂停数, 即将触发列表, 最近触发列表)
active, paused, upcoming, recent = await recurring_timer.get_job_summary(
    chat_key, upcoming_limit=5, recent_limit=5,
)

# 获取任务对外短 ID
short_id = recurring_timer.get_job_id(job)
```

### 校验工具

```python
from nekro_agent.api import recurring_timer

# 校验 cron 表达式是否合法（5 段格式：min hour day month dow）
recurring_timer.validate_cron_expr("0 9 * * 1-5")

# 校验时区是否合法（IANA TZ）
recurring_timer.validate_timezone("Asia/Shanghai")
```

### 工作日模式

`workday_mode` 参数用于在指定时间范围内按工作日规则过滤触发：

| 值 | 说明 |
|---|---|
| `none` | 不限制，按 cron 正常触发 |
| `mon_fri` | 仅周一至周五 |
| `weekend` | 仅周末 |
| `cn_workday` | 仅中国法定工作日（含调休补班） |
| `cn_restday` | 仅中国法定休息日（含调休放假） |

> **降级策略**：当中国节假日数据不可用时，`cn_workday` 会降级为 `mon_fri`（周一至周五），`cn_restday` 会降级为 `weekend`（周六日）。

## 与 push_system 结合

定时器触发后，通常需要将上下文推回 Agent 继续处理。推荐使用 `message.push_system`：

```python
from nekro_agent.api import message

async def on_timer_trigger(chat_key: str):
    await message.push_system(
        chat_key=chat_key,
        message="定时任务触发：请执行每日汇总并发送报告",
        trigger_agent=True,
    )
```

**完整签名**：

```python
async def push_system(
    chat_key: str,
    message: str,
    ctx: Optional[AgentCtx] = None,
    trigger_agent: bool = False,
) -> None
```

| 参数 | 说明 |
|---|---|
| `chat_key` | 聊天标识，格式为 `{adapter_key}-{channel_id}` |
| `message` | 系统消息内容 |
| `ctx` | Agent 上下文对象（可选） |
| `trigger_agent` | 是否触发 AI 响应，默认 `False` |

这种组合适合自动工作流推进、定时巡检和后台定期通知。

## Misfire 策略（周期任务）

当服务重启或调度阻塞导致 cron 任务错过预定触发时间时，由以下字段控制补发行为：

| 字段 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `misfire_policy` | `str` | `"fire_once"` | 错过触发策略。`fire_once`：在宽限期内补发一次；`skip`：跳过本次 |
| `misfire_grace_seconds` | `int` | `300` | 宽限秒数，超过此时间则不再补发 |

## 连续失败自动暂停

周期任务连续触发失败 **3 次**后会自动暂停，并向频道发送通知消息，提示用户可调用 `resume_job` 恢复或 `update_job` 修正参数。

成功触发后 `consecutive_failures` 计数器会自动归零。

## 相关文档

- [系统 API 参考](/docs/04_plugin_dev/04_system_api_reference)
- [插件命令开发](/docs/04_plugin_dev/05_command_development)
