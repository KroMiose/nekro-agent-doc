---
title: 插件核心概念
description: 深入了解 Nekro Agent 插件的核心组成部分，包括插件实例、生命周期、沙盒方法、配置、存储和提示词注入。
---

# 插件核心概念

在上一章节中，你已经成功创建并运行了一个简单的插件。本章节将带你深入了解构成 Nekro Agent 插件的各个核心概念。掌握这些概念是开发更复杂、功能更强大插件的基础。

我们将依次探讨以下主题：

1.  **[插件实例与生命周期](./02_plugin_basics/2.1_plugin_instance.md)**：学习如何定义插件 (`NekroPlugin`) 以及插件从加载到卸载的完整生命周期事件。
2.  **[沙盒方法详解](./02_plugin_basics/2.2_sandbox_methods.md)**：深入理解插件向 AI 提供功能的主要接口——沙盒方法，包括其不同类型和实现规范。
3.  **[插件配置](./02_plugin_basics/2.3_configuration.md)**：了解如何为你的插件添加可由用户自定义的配置项，并通过 WebUI 进行管理。
4.  **[数据存储](./02_plugin_basics/2.4_storage.md)**：学习如何使用插件存储来持久化数据，无论是会话相关的还是全局的。
5.  **[提示词注入](./02_plugin_basics/2.5_prompt_injection.md)**：探索如何通过向 AI 注入提示词来影响其行为和提供上下文信息。
6.  **[Agent 上下文 (AgentCtx)](./02_plugin_basics/2.6_agent_context.md)**：深入了解插件开发中的核心上下文对象，包括文件系统、消息发送、配置访问等功能。

让我们逐一开始吧！ 