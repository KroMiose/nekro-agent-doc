---
title: 企业微信 AI Bot 配置教程
description: 面向首次接入企业微信 AI Bot 用户的 Nekro Agent 配置教程。
---

# 企业微信 AI Bot 配置教程

本文说明如何配置企业微信 AI Bot 适配器，并将 Nekro Agent 接入企业微信官方长连接。

## 开始前准备

- 你已经部署好 Nekro Agent
- 你有企业微信后台权限
- 你可以创建或管理企业微信 AI Bot

## 第一步：在企业微信后台创建 AI Bot

1. 进入企业微信 AI Bot 后台
   - 网页端入口：`安全管理` -> `管理工具` -> `智能机器人`
   - 桌面端入口：`工作台` -> `智能机器人`
2. 点击 `创建机器人` 然后点击 `手动创建` 右侧配置向下滚动到底部选择 `API模式创建`
3. 选择 `使用长连接`
4. 记录提供的：
   - `BOT_ID`
   - `BOT_SECRET`

![手动创建](/assets/adapters/wecom_ai/create1.png)

![API模式](/assets/adapters/wecom_ai/create2.png)

![企业微信 AI Bot 后台中的 BOT_ID 和 BOT_SECRET](/assets/adapters/wecom_ai/botid&secret.png)

## 第二步：在 Nekro Agent 中填写配置   

1. 打开「适配器」->「WeCom AI Bot」
2. 打开 `启用适配器`
3. 填写 `Bot ID`
4. 填写 `Secret`
5. 保存并重启 Nekro Agent

![Nekro Agent 中的WeCom AI Bot 配置页](/assets/adapters/wecom_ai/na_config.png)

## 第三步：确认长连接是否建立成功

完成配置后，按下面顺序检查：

1. 查看 Nekro Agent 日志
2. 确认没有凭据错误
3. 给机器人发送一条测试消息
4. 如果 Nekro Agent 能正常收到并回复，说明已经配置成功

## 一般新手只需要关心的字段

- `BOT_ID`：企业微信 AI Bot 后台提供
- `BOT_SECRET`：企业微信 AI Bot 后台提供

下面这些可选项，第一次配置时一般保持默认即可：

- `心跳间隔`
- `请求超时`
- `基础重连间隔`
- `最大重连次数`
- `所有收到的消息均触发AI`
- `接入文本消息`
- `记录事件回调`
- `记录原始帧`
- `日志最大长度`

## 这个模式适合什么场景

- 你想走企业微信官方能力
- 你不想暴露公网回调地址
- 你希望机器人通过长连接直接收发消息

## 当前已知限制

- 主动发送目前主要支持 Markdown、图片、文件
- 语音、视频、模板卡片等能力还不完整
- 部分用户名、群名场景下可能仍会显示原始 ID

## 常见问题

### 日志里一直提示没连上

优先检查：

1. `BOT_ID` 和 `BOT_SECRET` 是否复制错
2. 机器人是否在企业微信后台真正创建完成
3. Nekro Agent 所在环境是否能正常访问企业微信官方服务

### 连接正常，但消息表现不完整

这是当前适配器能力边界导致的，尤其是语音、视频、模板卡片这类消息类型。
