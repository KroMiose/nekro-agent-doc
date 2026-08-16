---
title: 模型管理
description: Nekro Agent 统一模型管理界面说明，包括基础模型组与 CC 模型组的配置方法及调度场景
---

# 模型管理

模型管理页面（「系统配置」→「模型管理」）采用两个 Tab 统一管理系统中所有模型配置：

- **基础模型组**：供主 Agent 会话流程使用的 OpenAI 兼容接入配置
- **CC 模型组**：供 Claude Code 沙盒任务使用的模型预设配置

两类模型组的配置界面和调度逻辑相互独立，按需分别维护。

如果您只是想先让机器人正常聊天，优先配置基础模型组即可；如果您要使用工作区里的 Claude Code 沙盒，再继续配置 CC 模型组。

![模型管理页面](/assets/advanced/model_config/model_management_tabs.png)

## 基础模型组

基础模型组是一组 OpenAI 兼容接口的调用参数，包含模型名称、API 接入点和密钥。系统支持同时维护多个模型组，并在不同场景中按需引用。

### 配置字段

| 字段 | 说明 |
|---|---|
| 模型组名称 | 唯一标识，用于在系统配置中引用 |
| 模型名称 | 实际调用的模型，如 `gemini-2.5-pro`、`gpt-4.1` |
| API 接入点 | OpenAI 兼容的 Base URL |
| API 密钥 | 对应接入点的鉴权密钥 |
| 附加参数 | temperature、max_tokens 等可选参数 |

::: info
API 接入点支持任意 OpenAI 兼容接口，兼容市面上大多数 LLM 供应商和中转服务。
:::

### 模型组类型

基础模型组不只用于聊天。根据用途不同，常见模型组可以分为：

| 类型 | 用途 |
|---|---|
| Chat 模型组 | 负责日常对话、插件调用、工作流推理 |
| Embedding 模型组 | 负责知识库向量化和检索 |
| Draw 模型组 | 负责绘图、图片生成等能力 |

配置知识库前，请先确认 embedding 模型组可用，并在系统配置中选择对应模型组。配置绘图相关插件或能力时，再准备 draw 模型组。

### 附加参数

附加参数用于给模型请求补充额外选项，例如温度、最大输出长度、思维链开关或供应商专有参数。

填写时建议遵循：

- 只填写当前模型服务确认支持的参数
- 不同模型组分开配置，不要把聊天参数直接复制到 embedding 模型组
- 修改后先用页面测试功能验证可用性
- 如果模型服务返回参数错误，优先清空附加参数再重试

### 系统中的调度场景

基础模型组在多个场景中被引用，通过系统配置（「系统配置」→「系统」）中的对应字段绑定：

| 场景 | 对应配置项 |
|---|---|
| 主对话模型（默认） | `USE_MODEL_GROUP` |
| 异常处理模型 | `DEBUG_MIGRATION_MODEL_GROUP` |
| 主模型调用失败时的备用 | `FALLBACK_MODEL_GROUP` |
| 插件编辑器代码生成 | `PLUGIN_GENERATE_MODEL_GROUP` |
| 插件编辑器代码应用 | `PLUGIN_APPLY_MODEL_GROUP` |
| 记忆整理（可选覆盖） | `MEMORY_CONSOLIDATION_MODEL_GROUP` |

建议至少配置主对话模型和备用模型。需要使用插件编辑器时，再单独配置代码生成和代码应用模型；启用记忆系统后，再按效果决定是否为记忆整理指定更合适的模型。

## CC 模型组

CC 模型组是供 Claude Code 沙盒使用的模型预设，与基础模型组独立管理。工作区在配置 Claude Code 时选择对应的 CC 模型组。

CC 模型组的配置界面和参数与基础模型组有所不同，专为 Claude Code 会话场景设计。具体配置项以页面实际显示为准。

![CC 模型组配置页](/assets/advanced/model_config/cc_model_group.png)

::: tip 2.3.3 正式版
CC 模型组功能已在 Nekro Agent `2.3.3` 正式版中提供。后续版本中，工作区与 Claude Code 的配置关联方式仍可能继续优化。
:::

## 模型选型建议

各场景的推荐模型参见 [模型选择指南](/docs/03_advanced/model_usage)。

## 相关文档

- [模型选择指南](/docs/03_advanced/model_usage)
- [工作区总览](/docs/03_workspace/overview)
- [工作区快速上手](/docs/03_workspace/quickstart)
