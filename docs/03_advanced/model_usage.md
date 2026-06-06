---
title: 模型选择指南
description: Nekro Agent 模型选择指南，帮助用户根据不同场景选择最适合的 LLM 模型，包括性能、价格和适用场景的详细分析
---

# 模型选择指南

本文档将帮助您了解 NekroAgent 中的不同场景下最适合使用的模型，并提供详细的性能、价格和适用性分析。目前主要提供 [NekroAgent 官方中转](https://api.nekro.ai) 供应的模型选择信息，后续会逐步增加其他来源模型。

#### 评级说明

在推荐模型中，我们使用以下评级标准：

| 评级 | 对应等级   | 说明 |
| ---- | ---------- | ---- |
| <DocIcon name="crown" label="极佳" />   | <DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" /> | 极佳 |
| <DocIcon name="medal" label="优秀" />   | <DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" />   | 优秀 |
| <DocIcon name="award" label="良好" />   | <DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" />     | 良好 |
| <DocIcon name="badge-check" label="一般" />   | <DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" />       | 一般 |
| <DocIcon name="circle-off" label="较差" />   | <DocIcon name="star" label="星级" />         | 较差 |

::: warning 注意
以下推荐结果仅供参考，不同来源的相同模型可能因渠道转化策略、配置设定不同、并发情况、即时状态等原因，其最终性能可能存在差异，我们鼓励您根据实际使用情况多方尝试包括不在以下表单中的模型，选择最适合您的模型！

以下量表中的模型来自 [NekroAgent 官方中转 - 可用模型列表](https://api.nekro.ai/panel/model_price)，如果您认为以下量表与实际体验有较大差异，欢迎联系我们反馈，我们将持续维护并更新量表以更符合实际体验
:::

## NekroAgent 主应用

### 聊天对话流程

NekroAgent 的聊天会话主要使用 `主模型组(USE_MODEL_GROUP)`。建议同时配置 `备用模型组(FALLBACK_MODEL_GROUP)`，在主模型服务不可用时提高稳定性。

如果您经常使用复杂工具调用、插件编辑器或调试能力，也可以单独配置 `异常处理模型(DEBUG_MIGRATION_MODEL_GROUP)`，选择更擅长代码和复杂任务的模型。

以下是 **聊天对话流程** 中推荐使用的模型列表:

> 本列表更新 2026 年 5 月 24 日

| 模型名称                          | 质量 | 速度 | 稳定 | 性价比 | 视觉 | 内置思维 | 备注                                                                 |
| --------------------------------- | ---- | ---- | ---- | ------ | ---- | -------- | -------------------------------------------------------------------- |
| claude-sonnet-4-6                 | <DocIcon name="crown" label="极佳" />   | <DocIcon name="award" label="良好" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="award" label="良好" />     | <DocIcon name="eye" label="视觉" />   | <DocIcon name="circle-x" label="否" />       | Anthropic 当前推荐主力模型，综合能力强，适合主对话模型                 |
| claude-opus-4-6                   | <DocIcon name="crown" label="极佳" />   | <DocIcon name="badge-check" label="一般" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="badge-check" label="一般" />     | <DocIcon name="eye" label="视觉" />   | <DocIcon name="circle-x" label="否" />       | Anthropic 高质量模型，适合复杂推理、长任务和高质量输出场景             |
| gemini-3.1-pro-preview            | <DocIcon name="crown" label="极佳" />   | <DocIcon name="award" label="良好" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="badge-check" label="一般" />     | <DocIcon name="eye" label="视觉" />   | <DocIcon name="brain" />       | Gemini 高质量主力模型，适合复杂任务 <DocIcon name="warning" label="注意" /> 预览版模型                      |
| gemini-3.5-flash                  | <DocIcon name="medal" label="优秀" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="medal" label="优秀" />     | <DocIcon name="eye" label="视觉" />   | <DocIcon name="circle-x" label="否" />       | Gemini Flash 系列较新型号，适合作为高性价比主力模型                    |
| gemini-3.1-flash-lite-preview     | <DocIcon name="award" label="良好" />   | <DocIcon name="crown" label="极佳" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="crown" label="极佳" />     | <DocIcon name="eye" label="视觉" />   | <DocIcon name="circle-x" label="否" />       | 极速小模型，推理成本低，适合简单任务或快速迭代 <DocIcon name="warning" label="注意" /> 预览版模型            |
| gpt-5.5                           | <DocIcon name="medal" label="优秀" />   | <DocIcon name="award" label="良好" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="award" label="良好" />     | <DocIcon name="eye" label="视觉" />   | <DocIcon name="circle-x" label="否" />       | GPT 系列较新主力模型，适合通用生产力场景                               |
| gpt-5.4-mini                      | <DocIcon name="award" label="良好" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="medal" label="优秀" />     | <DocIcon name="eye" label="视觉" />   | <DocIcon name="circle-x" label="否" />       | GPT 系列小模型，适合低成本快速回复                                     |
| MiniMax-M2.7                      | <DocIcon name="medal" label="优秀" />   | <DocIcon name="award" label="良好" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="medal" label="优秀" />     | <DocIcon name="circle-x" label="否" />   | <DocIcon name="circle-x" label="否" />       | MiniMax 系列较新模型，中文对话和通用任务表现均衡                       |
| deepseek-v3                       | <DocIcon name="medal" label="优秀" />   | <DocIcon name="badge-check" label="一般" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="award" label="良好" />     | <DocIcon name="circle-x" label="否" />   | <DocIcon name="circle-x" label="否" />       | DeepSeek V3 系列通用聊天模型，中文能力优秀                             |
| deepseek-reasoner                 | <DocIcon name="medal" label="优秀" />   | <DocIcon name="badge-check" label="一般" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="award" label="良好" />     | <DocIcon name="circle-x" label="否" />   | <DocIcon name="brain" />       | DeepSeek 推理模型，适合需要更强逻辑推演的任务                           |
| doubao-1.5-vision-pro-32k-250115  | <DocIcon name="award" label="良好" />   | <DocIcon name="award" label="良好" />   | <DocIcon name="crown" label="极佳" />   | <DocIcon name="award" label="良好" />     | <DocIcon name="eye" label="视觉" />   | <DocIcon name="circle-x" label="否" />       | 字节提供的国产视觉模型，稳定性好，适合作为多模态备用模型                |
| qwen-plus-latest                  | <DocIcon name="award" label="良好" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="medal" label="优秀" />     | <DocIcon name="circle-x" label="否" />   | <DocIcon name="circle-x" label="否" />       | Qwen Plus 系列较新模型，适合中文日常对话和低成本任务                    |
| qwen-max-latest                   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="award" label="良好" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="award" label="良好" />     | <DocIcon name="circle-x" label="否" />   | <DocIcon name="circle-x" label="否" />       | Qwen Max 系列较新模型，适合更高质量的中文任务                           |
| grok-3                            | <DocIcon name="award" label="良好" />   | <DocIcon name="award" label="良好" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="badge-check" label="一般" />     | <DocIcon name="eye" label="视觉" />   | <DocIcon name="circle-x" label="否" />       | xAI 推出的语言模型，个性鲜明，适合风格化对话                            |

注意:

- 通常来说，支持 `内置思维` 的模型不推荐再开启 `外置思维链`，否则可能降低生成速度或影响输出格式
- 如果主模型需要处理图片，请尽量让备用模型也支持视觉能力，避免切换模型后无法继续处理图片消息
- 不同渠道的同名模型可能有参数差异，遇到请求报错时可先清空附加参数再测试

### 插件开发

NekroAgent 的 **插件编辑器** 中的生成修改建议模型使用 `插件代码生成模型组(PLUGIN_GENERATE_MODEL_GROUP)`，用来为用户的需求生成代码解决方案，推荐使用强编码能力、高质量的模型，以下是推荐模型列表:

| 模型名称                          | 质量 | 速度 | 稳定 | 性价比 | 视觉 | 思维 | 备注                                     |
| --------------------------------- | ---- | ---- | ---- | ------ | ---- | ---- | ---------------------------------------- |
| claude-opus-4-6                   | <DocIcon name="crown" label="极佳" />   | <DocIcon name="badge-check" label="一般" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="badge-check" label="一般" />     | <DocIcon name="eye" label="视觉" />   | <DocIcon name="brain" />   | Anthropic 高质量模型，适合复杂插件开发和重构任务 |
| claude-sonnet-4-6                 | <DocIcon name="crown" label="极佳" />   | <DocIcon name="award" label="良好" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="award" label="良好" />     | <DocIcon name="eye" label="视觉" />   | <DocIcon name="brain" />   | Anthropic 当前推荐主力编码模型，质量和速度较均衡 |
| gemini-3.1-pro-preview            | <DocIcon name="crown" label="极佳" />   | <DocIcon name="award" label="良好" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="badge-check" label="一般" />     | <DocIcon name="eye" label="视觉" />   | <DocIcon name="brain" />   | Gemini 高质量主力模型，编程领域表现较好 <DocIcon name="warning" label="注意" /> 预览版模型 |

在生成模型生成修改建议后，我们还需要通过 `插件代码应用模型组(PLUGIN_APPLY_MODEL_GROUP)` 来在当前插件编辑器中应用修改建议，推荐使用强提示词遵循能力、生成速度快的模型，以下是推荐模型列表:

| 模型名称         | 质量 | 速度 | 稳定 | 性价比 | 视觉 | 思维 | 备注 |
| ---------------- | ---- | ---- | ---- | ------ | ---- | ---- | ---- |
| gemini-3.5-flash       | <DocIcon name="medal" label="优秀" />   | <DocIcon name="crown" label="极佳" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="crown" label="极佳" />     | <DocIcon name="eye" label="视觉" />   | <DocIcon name="circle-x" label="否" />   | 推荐的快速逻辑应用模型 |
| claude-haiku-4-5       | <DocIcon name="award" label="良好" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="award" label="良好" />     | <DocIcon name="eye" label="视觉" />   | <DocIcon name="circle-x" label="否" />   | Anthropic 快速模型，适合简单代码应用和格式修正 |

## 内置插件

### 表情包插件

表情包插件需要使用一个 `向量嵌入模型` 来提供表情包搜索能力，强烈建议使用 `text-embedding-v3` 模型:

| 模型名称                | 质量 | 速度 | 稳定 | 性价比 | 视觉 | 维度 | 备注                                                             |
| ----------------------- | ---- | ---- | ---- | ------ | ---- | ---- | ---------------------------------------------------------------- |
| text-embedding-v3       | <DocIcon name="crown" label="极佳" />   | <DocIcon name="crown" label="极佳" />   | <DocIcon name="crown" label="极佳" />   | <DocIcon name="crown" label="极佳" />     | <DocIcon name="circle-x" label="否" />   | 1024 | 阿里云提供的非常便宜且高效的文本嵌入模型                         |
| multimodal-embedding-v1 | <DocIcon name="crown" label="极佳" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="crown" label="极佳" />   | <DocIcon name="crown" label="极佳" />     | <DocIcon name="circle-check" label="是" />   | 1024 | 阿里云提供的多模态嵌入模型，但对输入限制较多，仅推荐特殊用途使用 |

### 绘图 (学会画画)

绘图插件支持 OpenAI 标准绘图 API (例如 DALL-E 3) 和任意支持对话生成图像的 OpenAI 聊天补全 API，以下是推荐模型列表:

| 模型名称                       | 质量 | 速度 | 稳定 | 性价比 | 图生图 | 格式         | 备注                                               |
| ------------------------------ | ---- | ---- | ---- | ------ | ------ | ------------ | -------------------------------------------------- |
| gemini-3.1-flash-image-preview | <DocIcon name="crown" label="极佳" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="medal" label="优秀" />     | <DocIcon name="circle-check" label="是" />     | 聊天模式     | Gemini 3.1 绘图模型，具备较好的理解能力与视觉质量   |
| gpt-image-2                    | <DocIcon name="crown" label="极佳" />   | <DocIcon name="award" label="良好" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="award" label="良好" />     | <DocIcon name="circle-check" label="是" />     | 图像生成模式 | OpenAI 较新的图像模型，适合高质量绘图任务           |
| sora_image                     | <DocIcon name="medal" label="优秀" />   | <DocIcon name="circle-off" label="较差" />   | <DocIcon name="medal" label="优秀" />   | <DocIcon name="award" label="良好" />     | <DocIcon name="circle-check" label="是" />     | 聊天模式     | 与 ChatGPT 官网绘图体验接近，逻辑遵循好但速度较慢   |
| Kolors                         | <DocIcon name="award" label="良好" />   | <DocIcon name="crown" label="极佳" />   | <DocIcon name="crown" label="极佳" />   | <DocIcon name="medal" label="优秀" />     | <DocIcon name="circle-check" label="是" />     | 图像生成模式 | 国内经典绘图模型，适合 CG 风格任务                 |

## 注意事项

1. 模型性能可能会随时间更新而变化
2. 价格信息仅供参考，实际价格请以官方报价为准
3. 建议根据实际使用情况定期评估模型选择
4. **实验性模型（exp/preview）**：这些模型为实验性质，可能随时更新或关闭，建议：
   - 生产环境使用时准备备用模型组
   - 同系列模型优先选择官方中转列表中可用的较新版本
   - 如果旧模型出现重定向、限流或关闭，及时切换到同系列新版
5. **模型命名**：同一模型可能同时存在别名和日期版本。一般优先选择官方中转列表中仍在维护、名称更靠新的型号，例如 `claude-sonnet-4-6`、`claude-haiku-4-5`、`MiniMax-M2.7`、`qwen-plus-latest`。

::: warning 重要提示
在使用任何生成式人工智能服务时，请务必注意遵守相关服务条款和法律法规
:::
