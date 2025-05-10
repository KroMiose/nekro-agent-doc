---
title: 快速上手
description: Nekro Agent 插件开发快速上手指南，从环境准备到创建第一个"Hello World"插件。
---

# 快速上手

本章节将引导你快速搭建插件开发环境，并创建你的第一个 Nekro Agent 插件。

## 开发环境准备

在开始之前，请确保你已经安装并成功运行了 Nekro Agent。插件开发通常在 Nekro Agent 项目的 `plugins/workdir/` 目录下进行。

你需要：

1.  **Python 环境**：与 Nekro Agent 主程序兼容的 Python 版本（通常为 Python 3.10+）。
2.  **Nekro Agent 源码或已安装实例**：方便查看核心代码和 API 定义。
3.  **代码编辑器**：如 VSCode、PyCharm 等，用于编写插件代码。

## 创建你的第一个插件: "Hello Plugin"

让我们创建一个简单的插件，它会提供一个沙盒方法，当被调用时返回 "Hello from Plugin!"。

### 1. 创建插件目录和文件

在 Nekro Agent 的插件工作目录（通常是 `plugins/workdir/`）下，创建一个新的插件目录，例如 `hello_plugin`。

```
plugins/
└── workdir/
    └── hello_plugin/
        ├── __init__.py
        └── plugin.py
```

*   `__init__.py`: 这个文件**至关重要**。它使得 `hello_plugin` 目录可以被 Python 视为一个包。更重要的是，Nekro Agent 的插件加载机制通常会从这个 `__init__.py` 文件中查找并导入 `NekroPlugin` 的实例。如果你的 `NekroPlugin` 实例（通常命名为 `plugin`）定义在同目录下的 `plugin.py` 文件中，那么 `__init__.py` **必须**从 `plugin.py` 导入并导出该实例。其内容应如下：
    ```python
    # hello_plugin/__init__.py
    from .plugin import plugin

    # 可选，但推荐，用于明确导出的接口
    __all__ = ["plugin"]
    ```
*   `plugin.py`: 这是我们插件的核心代码文件，其中定义了 `NekroPlugin` 实例以及相关的沙盒方法、配置等。

### 2. 编写插件核心代码 (`plugin.py`)

打开 `hello_plugin/plugin.py` 文件，并输入以下内容：

```python
from nekro_agent.api.plugin import NekroPlugin, SandboxMethodType
from nekro_agent.api.schemas import AgentCtx

# 1. 创建插件实例
plugin = NekroPlugin(
    name="你好插件",  # 插件在 UI 中显示的名称
    module_name="hello_plugin",  # 插件的模块名，应与目录名一致且唯一
    description="一个简单的 Hello World 插件示例。",
    author="你的名字",
    version="0.1.0",
    url="https://your.plugin.repo.url" # 可选，插件的仓库或主页地址
)

# 2. 注册一个沙盒方法
@plugin.mount_sandbox_method(
    method_type=SandboxMethodType.TOOL, # 方法类型为 TOOL，结果直接返回给 AI
    name="say_hello",                  
    description="返回一个问候语。"       
)
async def say_hello_from_plugin(_ctx: AgentCtx) -> str:
    """插件的问候方法

    不需要任何参数，直接返回一个固定的问候字符串。

    Returns:
        str: "Hello from Plugin!"
    """
    return "Hello from Plugin!"

# 你可以在这里添加更多的插件逻辑，如配置、初始化方法等

```

**代码解释**：

*   **`from nekro_agent.api.plugin import NekroPlugin, SandboxMethodType`**: 导入了创建插件实例和定义沙盒方法类型所需的核心类。
*   **`from nekro_agent.api.schemas import AgentCtx`**: 导入了 `AgentCtx`，它是沙盒方法和许多其他插件回调函数的标准上下文参数，包含了会话信息等。
*   **`plugin = NekroPlugin(...)`**: 创建了一个 `NekroPlugin` 类的实例。你需要提供插件的名称、模块名、描述等基本信息。
    *   `name`: 用户在界面上看到的插件名称。
    *   `module_name`: 插件的唯一标识符，通常与你的插件目录名一致。
    *   `author`: 插件作者名。
*   **`@plugin.mount_sandbox_method(...)`**: 这是一个装饰器，用于将一个函数注册为插件的沙盒方法。AI 可以通过沙盒环境调用这些方法。
    *   `method_type=SandboxMethodType.TOOL`: 指定了这个方法是一个"工具"类型的方法。这类方法的返回值会直接提供给 AI 使用。
*   **`async def say_hello_from_plugin(_ctx: AgentCtx) -> str:`**: 定义了沙盒方法的实际执行逻辑。
    *   它是一个异步函数 (`async def`)。
    *   第一个参数必须是 `_ctx: AgentCtx`。
    *   类型注解 `-> str` 表明它返回一个字符串。
    *   文档字符串 (docstring) 详细描述了方法的功能、参数和返回值，这对于 AI 正确使用该方法至关重要。

### 3. 加载和测试插件

1.  **启动/重启 Nekro Agent**：
    如果你是在 `plugins/workdir/` 目录下创建的插件，Nekro Agent 在启动时通常会自动扫描并加载该目录下的所有插件。
    如果 Agent 已经在运行，你可能需要重启 Agent 或通过其管理界面重新加载插件。

2.  **在 Agent 中测试**：
    加载成功后，你就可以在与 Nekro Agent 的对话中尝试调用这个插件方法了。例如，你可以对 Agent 说：
    `"调用 say_hello 方法"`
    或者更自然地：
    `"让 hello_plugin 说你好"`

    Agent 的 AI 模型会根据你的指令，结合函数中的文档字符串，决定是否以及如何调用 `say_hello` 方法。如果调用成功，AI 应该会告诉你插件返回了 "Hello from Plugin!"。

    你也可以通过指令调用代码：
    ```python
    /exec say_hello()
    ```
    发送指令前确保机器人也处在同一会话内

恭喜！你已经成功创建并测试了你的第一个 Nekro Agent 插件。

在接下来的章节中，我们将深入学习插件的各项核心概念和高级功能。 