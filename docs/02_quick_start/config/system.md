---
title: 系统配置指南
description: Nekro Agent 系统配置入门——让 Bot 正常对话所需的基本配置。
---

# 系统配置

本页只讲让 Bot **正常聊天 + 用上系统大部分功能**所需的基本配置。配完这页，Bot 就可以开口说话了。

更高级的调优项（回复配额、调试日志、命令匹配规则等）请见 [高级配置](/docs/02_quick_start/config/advanced)。

## <DocIcon name="settings" /> 在哪里配

### 通过 WebUI 配置（推荐）

1. 访问 WebUI：`http://<您的服务器IP>:8021`
2. 登录后进入「系统配置」→「基本配置」

每个配置项旁边都有一个 `?` 图标，鼠标悬停查看说明。**修改后记得点「保存」**。

## <DocIcon name="file" /> 配置项怎么找

WebUI 每个配置项下方都有一个**英文大写键名**（如 `ENABLE_NEKRO_CLOUD`）。文档里凡是写到具体配置项，都会附上这个键名 —— 您在 WebUI 用 `Ctrl + F` 搜键名即可定位。

## <DocIcon name="key" /> 必填的两项

::: tip 基本配置里只有两件事您必须动手
其它字段都有合理默认值，**不动它就能跑**。本文后面其它小节是"想用某种能力时再开"的可选配置。
:::

### 主对话模型组 - [USE_MODEL_GROUP]

**必填**。AI 用哪个模型回话。先在「模型管理」里建好一个聊天模型组并填好 API 密钥，然后在这里指向它的名字。**没配这个 Bot 收到消息也不会回复**。

[模型组怎么配 →](#必要模型组配置)

### 管理员列表 - [SUPER_USERS]

**强烈建议填**。决定谁能用 Bot 的高权限管理命令（重置会话、管理插件等）。填您在所属平台的用户 ID（在 WebUI 的「用户管理」→「平台用户ID」列查到），可以填多个。

不填也能用，但您自己就是普通用户，没法用管理命令。

## <DocIcon name="lock" /> 必要模型组配置

::: tip 什么是「模型组」？
**模型组**是把一个 LLM 服务的**接入地址 + 密钥 + 模型名称 + 调参**打包后取的一个名字。NA 在不同场景（聊天、绘图、向量检索等）会引用不同的模型组名字 —— 这样您既能复用一套配置，又能让"聊天用便宜模型、记忆沉淀用强模型"这种组合成为可能。
:::

在「系统配置」→「模型管理」里至少配置一个**聊天类型**的模型组，否则 Bot 无法工作。

系统默认预置了来自 [NekroAI 中转站](https://api.nekro.ai) 的聊天、绘图、嵌入三个类型模型组配置。您可以前往 [NekroAI 中转站](https://api.nekro.ai) 注册账号并创建 API Key，然后在对应模型组的「API 密钥」字段中填入；接入点和模型名称可先使用预置值。若您使用其他 OpenAI 兼容接口，也可以按服务商说明替换 API 接入点、模型名称和密钥。

### 模型组字段说明

| 字段 | 说明 |
|---|---|
| 模型组名称 | 唯一标识，用于在配置中引用 |
| 模型名称 | 实际调用的模型，如 `gemini-2.5-pro`、`gpt-4.1` |
| API 接入点 | OpenAI 兼容的 Base URL |
| API 密钥 | 对应接入点的鉴权密钥 |
| 模型类型 | `chat`（聊天）、`embedding`（向量嵌入）或 `draw`（绘图） |
| 启用视觉功能 | 模型是否支持图片理解，不支持则关闭 |
| 启用外置思维链 | 为不自带推理格式的模型启用额外思考提示；原生支持思考能力的模型通常无需开启 |
| 附加参数 | temperature、max_tokens、top_p 等可选参数 |

### 主要模型调度场景

| 场景 | 对应配置项 | 说明 |
|---|---|---|
| 主对话模型 | `USE_MODEL_GROUP` | 会话的默认模型 |
| 备用模型 | `FALLBACK_MODEL_GROUP` | 主模型失败时使用 |
| 异常处理模型 | `DEBUG_MIGRATION_MODEL_GROUP` | 主流程需要修正或继续处理时使用 |
| 插件代码生成 | `PLUGIN_GENERATE_MODEL_GROUP` | 插件编辑器生成代码 |
| 插件代码应用 | `PLUGIN_APPLY_MODEL_GROUP` | 插件编辑器应用修改 |

记忆系统和知识库需要 embedding 模型组，相关配置见 [记忆系统](/docs/03_workspace/memory_system) 和 [知识库](/docs/03_workspace/knowledge_base)。

## <DocIcon name="cloud" /> 云服务配置

### NekroAI 云服务 - [ENABLE_NEKRO_CLOUD]

启用后可使用 NekroAI 提供的插件市场、人设市场等共享能力。系统会收集部分使用统计（脱敏，不含隐私）。

### 云服务 API Key - [NEKRO_CLOUD_API_KEY]

前往 [NekroAI 社区](https://cloud.nekro.ai/me) 获取，用于访问云端插件和人设资源。

## 下一步

完成上面这些后，Bot 就能正常对话了。按需走以下路径：

- **跑通对话**：回到对应适配器页面（如 [OneBot V11](/docs/02_quick_start/adapters/onebot_v11)）做一次连通性测试
- **配 Bot 人设**：[人设技巧](/docs/03_advanced/persona_tips)
- **想调成本/调用频率**：[高级配置](/docs/02_quick_start/config/advanced)
- **想用知识库/记忆**：[知识库](/docs/03_workspace/knowledge_base)、[记忆系统](/docs/03_workspace/memory_system)
- **启用工作区能力**：[工作区总览](/docs/03_workspace/overview) → [工作区快速上手](/docs/03_workspace/quickstart)

## 相关文档

- [模型管理](/docs/03_advanced/model_config)
- [模型选择指南](/docs/03_advanced/model_usage)
- [应用更新](/docs/02_quick_start/config/update)
