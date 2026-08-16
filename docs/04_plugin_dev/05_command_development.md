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

### mount_command 参数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `name` | `str` | 必填 | 命令名 |
| `description` | `str` | 必填 | 命令描述 |
| `aliases` | `list[str]` | `None` | 别名列表 |
| `permission` | `CommandPermission` | `None` | 权限级别 |
| `usage` | `str` | `""` | 使用说明 |
| `category` | `str` | `"plugin"` | 分类 |
| `tags` | `list[str]` | `None` | 标签列表，便于 Agent 检索 |
| `internal` | `bool` | `False` | 内部命令（不在帮助列表和补全中显示） |
| `i18n_description` | `I18nDict` | `None` | 国际化描述（由 `i18n_text()` 创建） |
| `i18n_usage` | `I18nDict` | `None` | 国际化用法说明 |
| `i18n_category` | `I18nDict` | `None` | 国际化分类 |

## 核心概念

### CommandExecutionContext

命令执行上下文，区别于沙盒方法中的 `AgentCtx`。主要提供：

- 当前命令来源的频道
- 操作者身份与权限
- 当前语言设置

| 字段 | 类型 | 说明 |
|---|---|---|
| `user_id` | `str` | 用户 ID |
| `chat_key` | `str` | 频道标识 |
| `username` | `str` | 用户名 |
| `adapter_key` | `str` | 适配器标识 |
| `is_super_user` | `bool` | 是否为超级用户 |
| `is_advanced_user` | `bool` | 是否为高级用户 |
| `lang` | `SupportedLang` | 命令响应语言（默认 `ZH_CN`） |

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

`Arg` 描述命令参数的语义，支持两种写法（效果等价）。

**写法一（推荐，简洁）——直接作为默认值：**

```python
async def weather_command(
    context: CommandExecutionContext,
    location: str = Arg("城市名", default="北京", positional=True),
) -> CommandResponse:
    ...
```

**写法二——配合 Annotated：**

```python
async def weather_command(
    context: CommandExecutionContext,
    location: Annotated[str, Arg("城市名", positional=True)] = "北京",
) -> CommandResponse:
    ...
```

#### Arg 参数

```python
Arg(
    description: str = "",       # 参数描述
    *,                           # 以下均为关键字参数
    default: Any = _UNSET,       # 默认值；不设置时表示必填
    positional: bool = False,    # 是否为位置参数（可按顺序传入，无需写参数名）
    greedy: bool = False,        # 是否为贪婪参数（吃掉剩余所有文本）
    choices: list[str] | None,   # 可选值列表，传入不在列表中的值会报错
    range: tuple[Any, Any] | None,  # 数值范围约束，如 (0, 100)
    prompt_hint: str | None,     # 提示信息，导出到 Agent Tool-Use 时作为 x-prompt-hint
)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `description` | `str` | `""` | 参数描述 |
| `default` | `Any` | `_UNSET` | 默认值；未设置时参数为必填 |
| `positional` | `bool` | `False` | 是否为位置参数，可按顺序传入 |
| `greedy` | `bool` | `False` | 贪婪模式，吃掉剩余所有原始文本 |
| `choices` | `list[str]` | `None` | 可选值列表，超出范围报错 |
| `range` | `tuple[Any, Any]` | `None` | 数值范围约束 `(min, max)` |
| `prompt_hint` | `str` | `None` | 提示信息，导出到 Tool-Use 时供 Agent 参考 |

## 参数解析语法

### 位置参数

标记 `positional=True` 的参数可以直接按声明顺序传值：

```
/hello Alice
```

### K-V 参数

支持 `key:value` 或 `key:"value"` 格式，key 必须与参数名一致：

```
/weather location:"上海"
/config.set key:model value:gpt-4
```

值中包含空格时使用引号包裹：`key:"hello world"`。

### 混合使用

位置参数和 K-V 参数可以混合使用，K-V 参数优先匹配：

```
/hello name:Bob      # K-V 方式
/hello Bob            # 位置方式
```

## 用 CmdCtl 返回结果

| 方法 | 说明 |
|---|---|
| `CmdCtl.success(content)` | 成功终态 |
| `CmdCtl.failed(content)` | 失败终态 |
| `CmdCtl.message(content)` | 中间消息（流式命令中使用） |
| `CmdCtl.wait(message, callback_cmd, ...)` | 交互等待 |

### content 参数类型

`success`、`failed`、`message` 的 `content` 参数类型为 `CommandContent = Union[str, I18nDict, list[CommandOutputSegment]]`，支持三种形式：

- **`str`**：纯文本
- **`I18nDict`**（由 `i18n_text()` 创建）：按当前系统语言自动解析
- **`list[CommandOutputSegment]`**：富媒体输出段列表（见下文"富媒体输出"）

### CmdCtl.success / CmdCtl.failed

```python
# 纯文本
CmdCtl.success("操作完成")

# 国际化文本
from nekro_agent.schemas.i18n import i18n_text
CmdCtl.success(i18n_text(zh_CN="操作完成", en_US="Done"))

# 带结构化数据（供 Agent 读取）
CmdCtl.success("查询完成", data={"count": 42})
```

### CmdCtl.wait

`wait` 用于挂起命令、等待用户选择或输入后路由到指定的回调命令。

```python
CmdCtl.wait(
    message: str,                    # 提示信息（必填）
    callback_cmd: str,               # 接收后续输入的命令名（必填，通常标记 internal=True）
    options: list[str] | None,       # 可选项列表
    timeout: float = 60.0,           # 超时秒数
    on_timeout_message: str = "",    # 超时提示
    context_data: dict | None,       # 透传给 callback_cmd 的上下文数据
)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `message` | `str` | 必填 | 提示信息 |
| `callback_cmd` | `str` | 必填 | 接收后续输入的命令名 |
| `options` | `list[str]` | `None` | 可选项列表 |
| `timeout` | `float` | `60.0` | 超时秒数 |
| `on_timeout_message` | `str` | `""` | 超时后显示的提示 |
| `context_data` | `dict` | `None` | 透传给 callback_cmd 的上下文数据 |

## 富媒体输出 (CommandOutputSegment)

命令不仅限于纯文本输出，还可以通过 `CommandOutputSegment` 输出富媒体内容（图片、文件等）。

```python
from nekro_agent.services.command.schemas import CommandOutputSegment, CommandOutputSegmentType

# 输出图片
segments = [
    CommandOutputSegment(type=CommandOutputSegmentType.TEXT, text="分析结果："),
    CommandOutputSegment(type=CommandOutputSegmentType.IMAGE, file_path="/tmp/chart.png"),
]
return CmdCtl.success(segments)

# 输出文件
segments = [
    CommandOutputSegment(type=CommandOutputSegmentType.FILE, file_path="/tmp/report.pdf"),
]
return CmdCtl.success(segments)
```

### CommandOutputSegmentType

| 值 | 说明 |
|---|---|
| `TEXT` | 文本段 |
| `IMAGE` | 图片段 |
| `FILE` | 文件段 |

### CommandOutputSegment 字段

| 字段 | 类型 | 说明 |
|---|---|---|
| `type` | `CommandOutputSegmentType` | 段类型（必填） |
| `text` | `str` | 文本内容（TEXT 类型使用） |
| `file_path` | `str` | 文件路径（IMAGE/FILE 类型，后端发送用） |
| `file_name` | `str` | 文件名（可省略，自动从 file_path 推导） |
| `mime_type` | `str` | MIME 类型（可省略，自动推导） |
| `web_url` | `str` | WebUI 直接渲染用的 URL |

提供 `file_path` 时，`file_name` 和 `mime_type` 可省略，系统会自动推导。

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

多命令插件建议用命令组组织。子命令在注册表中展平为 `group.sub` 格式。

```python
config_group = plugin.mount_command_group(
    name="config",
    description="配置管理",
    permission=CommandPermission.ADVANCED,
    category="配置",
    tags=["config"],  # 默认标签，子命令可覆盖
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

调用时使用 `group.sub` 格式：

```
/config.set key:"model" value:"gpt-4"
```

### mount_command_group 参数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `name` | `str` | 必填 | 组名 |
| `description` | `str` | 必填 | 组描述 |
| `permission` | `CommandPermission` | `None` | 默认权限级别（子命令可覆盖） |
| `category` | `str` | `"plugin"` | 默认分类 |
| `tags` | `list[str]` | `None` | 默认标签 |

### command_group.command() 参数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `name` | `str` | 必填 | 子命令名（将生成 `group.name` 完整名） |
| `description` | `str` | 必填 | 子命令描述 |
| `aliases` | `list[str]` | `None` | 别名列表（自动添加 group 前缀） |
| `permission` | `CommandPermission` | `None` | 权限级别（默认继承组级别） |
| `usage` | `str` | `""` | 使用说明 |
| `category` | `str` | `""` | 分类（默认继承组级别） |
| `tags` | `list[str]` | `None` | 标签（默认继承组标签） |
| `internal` | `bool` | `False` | 内部命令 |
| `i18n_description` | `I18nDict` | `None` | 国际化描述 |
| `i18n_usage` | `I18nDict` | `None` | 国际化用法说明 |
| `i18n_category` | `I18nDict` | `None` | 国际化分类 |

命令组适合配置类、调试类、多子功能的插件。

## 国际化 (i18n) 支持

命令元数据支持国际化字段，可通过 `i18n_text()` 创建多语言文本：

```python
from nekro_agent.schemas.i18n import i18n_text

@plugin.mount_command(
    name="weather",
    description="查询天气",
    i18n_description=i18n_text(zh_CN="查询天气", en_US="Query weather"),
    i18n_usage=i18n_text(zh_CN="weather [城市名]", en_US="weather [city]"),
    i18n_category=i18n_text(zh_CN="工具", en_US="Tools"),
)
async def weather_command(context: CommandExecutionContext):
    ...
```

系统会根据 `CommandExecutionContext.lang` 自动选择对应语言的文本。

## 标签 (tags) 系统

命令元数据支持 `tags` 字段，用于分类和 Agent 检索。tags 为字符串列表：

```python
@plugin.mount_command(
    name="weather",
    description="查询天气",
    tags=["weather", "query", "tool"],
)
```

标签在 Agent Tool-Use 导出时一同暴露，帮助 AI 更准确地选择和调用命令。

## Agent Tool-Use 导出

命令系统内置 `AgentToolExporter`，会自动将已启用的非内部命令导出为 OpenAI Function Calling 格式，使 AI Agent 能够发现和调用插件命令。

导出时自动生成 JSON Schema：

- 参数类型映射：`str` -> `"string"`, `int` -> `"integer"`, `float` -> `"number"`, `bool` -> `"boolean"`
- `Arg.choices` 导出为 `"enum"`
- `Arg.description` 导出为 `"description"`
- `Arg.prompt_hint` 导出为 `"x-prompt-hint"`
- 无默认值的参数标记为 `"required"`

AI Agent 调用命令时，系统自动执行命令并将流式输出合并为单一响应（包含 `process_log`、`message`、`data` 等字段）。

## 与命令中心的关系

插件注册的命令会进入命令系统，在以下位置可见：

- 命令管理页（查看、启用/禁用）
- 命令输出页（实时查看执行结果）
- WebUI 执行入口（直接触发，不经过聊天平台）

命令的描述、分类、权限和使用说明都会影响命令中心的展示质量，应认真填写。

## 相关文档

- [系统 API 参考](/docs/04_plugin_dev/04_system_api_reference)
- [插件定时任务开发](/docs/04_plugin_dev/06_timer_development)
