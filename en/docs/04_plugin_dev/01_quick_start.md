---
title: Quick Start
description: Nekro Agent plugin development quick start guide, from environment preparation to creating your first "Hello World" plugin.
---

# Quick Start

This chapter will guide you to quickly set up a plugin development environment and create your first Nekro Agent plugin.

## Development Environment Preparation

Before starting, please make sure you have installed and successfully run Nekro Agent. Plugin development is usually done in the `plugins/workdir/` directory of the Nekro Agent project.

You will need:

1.  **Python Environment**: A Python version compatible with the Nekro Agent main program (usually Python 3.10+).
2.  **Nekro Agent Source Code or Installed Instance**: Convenient for viewing core code and API definitions.
3.  **Code Editor**: Such as VSCode, PyCharm, etc., for writing plugin code.

## Create Your First Plugin: "Hello Plugin"

Let's create a simple plugin that will provide a sandbox method that returns "Hello from Plugin!" when called.

### 1. Create Plugin Directory and Files

In the plugin working directory of Nekro Agent (usually `plugins/workdir/`), create a new plugin directory, for example `hello_plugin`.

```
plugins/
└── workdir/
    └── hello_plugin/
        ├── __init__.py
        └── plugin.py
```

*   `__init__.py`: This file is **crucial**. It makes the `hello_plugin` directory recognizable as a Python package. More importantly, Nekro Agent's plugin loading mechanism usually finds and imports the `NekroPlugin` instance from this `__init__.py` file. If your `NekroPlugin` instance (usually named `plugin`) is defined in the `plugin.py` file in the same directory, then `__init__.py` **must** import and export this instance from `plugin.py`. Its content should be as follows:
    ```python
    # hello_plugin/__init__.py
    from .plugin import plugin

    # Optional, but recommended, for explicitly exported interfaces
    __all__ = ["plugin"]
    ```
*   `plugin.py`: This is the core code file of our plugin, which defines the `NekroPlugin` instance and related sandbox methods, configurations, etc.

### 2. Write Plugin Core Code (`plugin.py`)

Open the `hello_plugin/plugin.py` file and enter the following content:

```python
from nekro_agent.api.plugin import NekroPlugin, SandboxMethodType
from nekro_agent.api.schemas import AgentCtx

# 1. Create plugin instance
plugin = NekroPlugin(
    name="Hello Plugin",  # Name displayed in UI
    module_name="hello_plugin",  # Plugin module name, should be consistent with directory name and unique
    description="A simple Hello World plugin example.",
    author="Your Name",
    version="0.1.0",
    url="https://your.plugin.repo.url" # Optional, repository or homepage URL of the plugin
)

# 2. Register a sandbox method
@plugin.mount_sandbox_method(
    method_type=SandboxMethodType.TOOL, # Method type is TOOL, result is directly returned to AI
    name="say_hello",
    description="Returns a greeting."
)
async def say_hello_from_plugin(_ctx: AgentCtx) -> str:
    """Greeting method of the plugin

    Requires no parameters, directly returns a fixed greeting string.

    Returns:
        str: "Hello from Plugin!"
    """
    return "Hello from Plugin!"

# You can add more plugin logic here, such as configuration, initialization methods, etc.

```

**Code Explanation**:

*   **`from nekro_agent.api.plugin import NekroPlugin, SandboxMethodType`**: Imports the core classes needed to create plugin instances and define sandbox method types.
*   **`from nekro_agent.api.schemas import AgentCtx`**: Imports `AgentCtx`, which is the standard context parameter for sandbox methods and many other plugin callback functions, containing session information, etc.
*   **`plugin = NekroPlugin(...)`**: Creates an instance of the `NekroPlugin` class. You need to provide basic information such as the plugin's name, module name, description, etc.
    *   `name`: The plugin name seen by users in the interface.
    *   `module_name`: The unique identifier of the plugin, usually consistent with your plugin directory name.
    *   `author`: Plugin author name.
*   **`@plugin.mount_sandbox_method(...)`**: This is a decorator used to register a function as a sandbox method of the plugin. AI can call these methods through the sandbox environment.
    *   `method_type=SandboxMethodType.TOOL`: Specifies that this method is a "tool" type method. The return value of such methods will be directly provided to AI for use.
*   **`async def say_hello_from_plugin(_ctx: AgentCtx) -> str:`**: Defines the actual execution logic of the sandbox method.
    *   It is an asynchronous function (`async def`).
    *   The first parameter must be `_ctx: AgentCtx`.
    *   Type annotation `-> str` indicates it returns a string.
    *   The docstring describes in detail the function, parameters, and return values of the method, which is crucial for AI to correctly use this method.

### 3. Load and Test Plugin

1.  **Start/Restart Nekro Agent**:
    If you created the plugin in the `plugins/workdir/` directory, Nekro Agent will usually automatically scan and load all plugins in this directory at startup.
    If Agent is already running, you may need to restart Agent or reload plugins through its management interface.

2.  **Test in Agent**:
    After successful loading, you can try to call this plugin method in your conversation with Nekro Agent. For example, you can say to Agent:
    `"Call the say_hello_from_plugin method"`
    Or more naturally:
    `"Let hello_plugin say hello"`

    The AI model of Agent will decide whether and how to call the `say_hello_from_plugin` method based on your instructions, combined with the docstring in the function. If the call is successful, AI should tell you that the plugin returned "Hello from Plugin!".

    You can also call the code through instructions:
    ```python
    /exec say_hello_from_plugin()
    ```
    Before sending the instruction, make sure the bot is also in the same session

Congratulations! You have successfully created and tested your first Nekro Agent plugin.

In the following chapters, we will delve into the core concepts and advanced features of plugins.