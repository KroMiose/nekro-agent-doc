---
title: 模型管理
description: Nekro Agent 统一模型管理界面说明，包括基础模型组与 CC 模型组的配置方法及调度场景
---

# 模型管理

模型管理页面（「系统配置」→「模型管理」）采用两个 Tab 统一管理系统中所有模型配置：

- **基础模型组**：供主 Agent 会话流程使用的 OpenAI 兼容接入配置
- **CC 模型组**：供 Claude Code 沙盒任务使用的模型预设配置

两类模型组的配置界面和调度逻辑相互独立，按需分别维护。

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

### 系统中的调度场景

基础模型组在多个场景中被引用，通过系统配置（「系统配置」→「系统」）中的对应字段绑定：

| 场景 | 对应配置项 |
|---|---|
| 主对话模型（默认） | `USE_MODEL_GROUP` |
| 调试 / Agent 迁移阶段 | `DEBUG_MIGRATION_MODEL_GROUP` |
| 主模型调用失败时的备用 | `FALLBACK_MODEL_GROUP` |
| 插件编辑器代码生成 | `PLUGIN_GENERATE_MODEL_GROUP` |
| 插件编辑器代码应用 | `PLUGIN_APPLY_MODEL_GROUP` |
| 记忆整合（可选覆盖） | `MEMORY_CONSOLIDATION_MODEL_GROUP` |

**会话调度策略：**

1. 会话开始时使用 `USE_MODEL_GROUP`（主模型）
2. 主模型输出触发 Agent 类方法或产生错误时，后续调用切换到 `DEBUG_MIGRATION_MODEL_GROUP`
3. 任一模型调用失败则回落到 `FALLBACK_MODEL_GROUP`
4. 备用模型也失败时，本次响应以失败结束

## CC 模型组

CC 模型组是供 Claude Code 沙盒使用的模型预设，与基础模型组独立管理。工作区在配置 Claude Code 时选择对应的 CC 模型组。

CC 模型组的配置界面和参数与基础模型组有所不同，专为 Claude Code 会话场景设计。具体配置项以页面实际显示为准。

::: warning 2.3.0 预览版
CC 模型组功能适用于 Nekro Agent `2.3.0` 预览版（`preview` 镜像 / `main` 分支构建）。工作区与 Claude Code 的配置关联方式在正式版发布前仍可能调整。
:::

## 模型选型建议

各场景的推荐模型参见 [模型选择指南](/docs/03_advanced/model_usage)。

## 相关文档

- [模型选择指南](/docs/03_advanced/model_usage)
- [工作区总览](/docs/03_workspace/overview)
- [工作区快速上手](/docs/03_workspace/quickstart)
