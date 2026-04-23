---
title: 插件命令开发
description: 使用 Nekro Agent 命令系统为插件注册命令、命令组及流式命令响应
---

# 插件命令开发

插件可以直接注册命令，将管理能力、运维操作和调试功能作为结构化命令暴露到命令中心，而不必把所有逻辑都做成沙盒方法。

**适合做成命令的场景：**
- 管理员主动触发的操作
- 需要明确权限边界的功能
- 需要出现在命令中心并支持 WebUI 执行的能力
- 需要结构化参数的指令

**适合继续做成沙盒方法的场景：**
- 主要由 AI 在任务执行时自动调用
- 不需要用户直接触发

## 基础写法

使用 `plugin.mount_command(...)` 注册命令：

```python
from typing import Annotated

from nekro_agent.api.plugin import (
    NekroPlugin, CmdCtl, Arg,
    CommandPermission, CommandExecutionContext, CommandResponse,
)

plugin = NekroPlugin(
    name="示例插件",
    module_name="example_plugin",
    description="命令示例",
    version="0.1.0",
    author="your_name",
    url="https://example.com",
)

@plugin.mount_command(
    name="hello",
    description="返回一条问候语",
    aliases=["hi"],
    permission=CommandPermission.PUBLIC,
    usage="hello [name]",
    category="示例",
)
async def hello_command(
    context: CommandExecutionContext,
    name: Annotated[str, Arg("称呼对象", positional=True)] = "Nekro",
) -> CommandResponse:
    return CmdCtl.success(f"你好，{name}")
```

## 核心概念

### CommandExecutionContext

命令执行上下文，区别于沙盒方法中的 `AgentCtx`。主要提供：

- 当前命令来源的频道
- 操作者身份与权限
- 当前语言设置

### CommandPermission

命令权限级别：

| 值 | 说明 |
|---|---|
| `PUBLIC` | 所有用户可用 |
| `USER` | 注册用户可用 |
| `ADVANCED` | 高级用户可用 |
| `SUPER_USER` | 超级管理员专用 |

破坏性或运维性质的命令建议至少限制到 `ADVANCED` 或 `SUPER_USER`。

### Arg

`Arg` 描述命令参数的语义，配合 `Annotated` 使用：

```python
name: Annotated[str, Arg("称呼对象", positional=True)]
```

`positional=True` 表示该参数为位置参数，可以直接按顺序传入，无需写参数名。

## 用 CmdCtl 返回结果

| 方法 | 说明 |
|---|---|
| `CmdCtl.success(msg)` | 操作成功 |
| `CmdCtl.failed(msg)` | 操作失败 |
| `CmdCtl.message(msg)` | 中间消息（流式命令中使用） |
| `CmdCtl.wait(msg)` | 等待状态 |

## 流式命令

执行时间较长的命令可以使用 `yield` 持续输出中间状态：

```python
@plugin.mount_command(
    name="rebuild",
    description="重建数据",
    permission=CommandPermission.SUPER_USER,
)
async def rebuild_command(context: CommandExecutionContext):
    yield CmdCtl.message("开始重建...")
    await do_step_one()
    yield CmdCtl.message("步骤一完成，继续处理...")
    await do_step_two()
    yield CmdCtl.success("重建完成")
```

流式命令适用于重建、扫描、批处理等耗时操作，输出结果可在命令中心的命令输出页实时查看。

## 命令组

多命令插件建议用命令组组织：

```python
config_group = plugin.mount_command_group(
    name="config",
    description="配置管理",
    permission=CommandPermission.ADVANCED,
    category="配置",
)

@config_group.command(
    name="set",
    description="设置配置项",
    usage="config.set <key> <value>",
)
async def config_set(
    context: CommandExecutionContext,
    key: Annotated[str, Arg("配置键", positional=True)],
    value: Annotated[str, Arg("配置值", positional=True)],
):
    return CmdCtl.success(f"已设置 {key} = {value}")
```

命令组适合配置类、调试类、多子功能的插件。

## 与命令中心的关系

插件注册的命令会进入命令系统，在以下位置可见：

- 命令管理页（查看、启用/禁用）
- 命令输出页（实时查看执行结果）
- WebUI 执行入口（直接触发，不经过聊天平台）

命令的描述、分类、权限和使用说明都会影响命令中心的展示质量，应认真填写。

## 相关文档

- [系统 API 参考](/docs/04_plugin_dev/04_system_api_reference)
- [插件定时任务开发](/docs/04_plugin_dev/06_timer_development)
