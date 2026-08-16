---
title: WeChat OpenILink 配置教程
description: 面向首次接入微信的 Nekro Agent 用户的 WeChat OpenILink 适配器配置教程，基于 wechatbot-sdk 扫码登录。
---

# WeChat OpenILink 配置教程

本文说明如何配置 WeChat OpenILink 适配器，并将 Nekro Agent 接入微信。该适配器基于 `wechatbot-sdk`，通过**扫码登录**完成认证。

::: warning 实验性功能 & 风险提示
- WeChat OpenILink 当前处于 **MVP（最小可用）阶段**，能力以接收文本、发送文本/图片/文件为主，**不支持群聊**。
:::

## 开始前准备

- 您已经部署好 Nekro Agent，并且可以打开 WebUI
- 您想与 bot 聊天的微信账号

## 第一步：在 Nekro Agent 里启用适配器

1. 打开 Nekro Agent WebUI
2. 进入「适配器」->「WeChat OpenILink」
3. 打开 `启用适配器` 开关
4. 保存配置

![na配置页](/assets/adapters/wechat_openilink/wechat_openilink_config.png)

## 第二步：重启 Nekro Agent 并完成扫码登录

1. 重启 Nekro Agent 容器，让适配器开始初始化
2. 进入「适配器」->「WeChat OpenILink」-> 「登录」
3. 使用您想要与 bot 聊天的微信扫码登录

![登录页](/assets/adapters/wechat_openilink/wechat_openilink_login.png)

::: tip 登录超时
默认登录超时为 `180 秒`。如果您在这个时间内没有完成扫码，适配器会初始化失败并报错。重新触发流程：再次重启 Nekro Agent 即可。
:::

## 第三步：确认是否接通成功

1. 向微信自动打开的窗口内发送一条消息。
2. 看到 Nekro Agent 正常回复，就说明已经接通

::: warning 群聊暂不可用
本适配器目前**仅在私聊触发**，无法添加进入群聊。
:::

## 常见问题

### 启动后登录页二维码生成失败

- 确认适配器**已经启用**并已保存配置
- 确认 Nekro Agent 已经**完整重启**（仅保存配置不会触发适配器重新初始化）
- 检查日志里是否有网络错误，确认服务器能访问 `BASE_URL`

### 扫码完成后却没收到任何消息

按这个顺序排查：

1. Nekro Agent 主服务日志里是否有 `wechat_openilink` 相关报错
2. 模型组是否已正确配置（参考 [模型管理](/docs/03_advanced/model_config)），否则即使收到消息也不会有 AI 回复

## 下一步

- 还没配模型？前往 [模型管理](/docs/03_advanced/model_config) 配好至少一个聊天模型组
- 想给机器人配个性？参考 [人设技巧](/docs/03_advanced/persona_tips)
- 配多了一个微信号或多平台账号？参考 [频道管理](/docs/03_advanced/channel_management)
