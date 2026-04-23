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
await recurring_timer.pause_job(job_id)
await recurring_timer.resume_job(job_id)
await recurring_timer.run_now(job_id)
await recurring_timer.update_job(job_id, cron_expr="0 10 * * *")
await recurring_timer.delete_job(job_id)
jobs = await recurring_timer.list_jobs(chat_key)
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

这种组合适合自动工作流推进、定时巡检和后台定期通知。

## 相关文档

- [系统 API 参考](/docs/04_plugin_dev/04_system_api_reference)
- [插件命令开发](/docs/04_plugin_dev/05_command_development)
- [工作区定时器](/docs/03_workspace/timers)
