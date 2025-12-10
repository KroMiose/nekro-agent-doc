# 模型**弃用&停用&重定向**

由于模型提供商调整 以下模型将会停用 
::: info 信息
自动重定向操作由**Google Gemini**进行**NekroAgent 官方中转**为保护用户服务**稳定性**不会主动删除对应模型

停用后 **实验版** 模型会重定向为 **正式版**

**旧版** 模型将会重定向 **新版** 模型

**注意:** 模型停用后后我们可能在没有通知您的情况下将**停用的**模型**计费**将会切换到**对应新版本模型**的**计费**

请您务必及时关注此页面
:::

::: warning 模型停用警告
更新日期 2025 年 12 月 10 日

根据 [Google Gemini API 弃用公告](https://ai.google.dev/gemini-api/docs/deprecations?hl=zh-cn) 和 [版本说明](https://ai.google.dev/gemini-api/docs/changelog?hl=zh-cn)，以下模型将在指定时间停用，请及时迁移：

- **gemini-2.0-flash**：预计最早于 **2026 年 2 月**停用，建议更换为 `gemini-2.5-flash`
- **gemini-2.5-pro**：预计最早于 **2026 年 6 月**停用，建议更换为 `gemini-3-pro`
- **gemini-2.5-flash**：预计最早于 **2026 年 6 月**停用
- **gemini-2.5-flash-thinking**：预计最早于 **2026 年 6 月**停用
- **gemini-2.5-flash-image-preview**：将于 **2026 年 1 月 15 日**关闭

::: danger 已关闭的模型
以下模型已经关闭，请求将无法使用或会自动重定向：

**已关闭（2025年6月26日）**：
- `gemini-2.5-pro-exp-03-25` - 已关闭，请使用 `gemini-2.5-pro`

**已关闭（2025年9月29日）**：
- `gemini-1.5-pro` - 已关闭
- `gemini-1.5-flash` - 已关闭
- `gemini-1.5-flash-8b` - 已关闭

**已关闭（2025年11月10日）**：
- `imagen-3.0-generate-002` - 已关闭，请改用 Imagen 4

**已关闭（2025年11月4日公告）**：
- `gemini-2.5-flash-lite-preview-06-17` - 2025年11月18日关闭
- `gemini-2.5-flash-preview-05-20` - 2025年11月18日关闭
- `gemini-2.0-flash-thinking-exp` - 2025年12月2日关闭
- `gemini-2.0-flash-thinking-exp-01-21` - 2025年12月2日关闭
- `gemini-2.0-flash-thinking-exp-1219` - 2025年12月2日关闭
- `gemini-2.5-pro-preview-03-25` - 2025年12月2日关闭
- `gemini-2.5-pro-preview-05-06` - 2025年12月2日关闭
- `gemini-2.5-pro-preview-06-05` - 2025年12月2日关闭
- `gemini-2.0-flash-lite-preview` - 2025年12月9日关闭
- `gemini-2.0-flash-lite-preview-02-05` - 2025年12月9日关闭

**自动重定向（2025年6月26日）**：
- `gemini-2.5-pro-preview-05-06` → 自动重定向到 `gemini-2.5-pro`
- `gemini-2.5-pro-preview-03-25` → 自动重定向到 `gemini-2.5-pro`

自动重定向操作由 Google Gemini 进行  NekroAgent 官方中转 为保护用户服务稳定性不会主动删除对应模型
:::

::: tip 实验性模型说明
文档中标注为 `exp`（实验版）或 `preview`（预览版）的模型为实验性模型，这些模型：
- 可能随时被更新或关闭，生命周期较短
- 建议定期关注 [Google Gemini API 版本说明](https://ai.google.dev/gemini-api/docs/changelog?hl=zh-cn) 获取最新更新
- 生产环境建议优先使用稳定版（GA）模型，或准备备用方案
- 实验性模型通常会在正式版发布后逐步关闭
- **部分预览版模型会自动重定向到稳定版**，建议直接使用稳定版模型名称
:::