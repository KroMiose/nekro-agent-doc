---
title: Discord 配置教程
description: 面向首次接入 Discord 用户的 Nekro Agent 配置教程。
---

# Discord 配置教程

本文说明如何配置 Discord 适配器，并将 Nekro Agent 接入 Discord Bot。

## 开始前准备

- 你已经部署好 Nekro Agent
- 你能打开 [Discord Developer Portal](https://discord.com/developers/applications)
- 你有一个可以邀请 Bot 的 Discord 服务器

## 第一步：创建 Discord 应用和 Bot

1. 打开 [Discord Developer Portal](https://discord.com/developers/applications)
2. 点击 `新 App`
3. 输入应用名称并创建
4. 进入左侧 `机器人`

![创建应用](/assets/adapters/discord/create.png)

## 第二步：复制 Bot Token

在 `机器人` 页面中：

1. 找到 `令牌`
2. 点击复制，或者重置后复制新 Token
3. 把这个 Token 保存好，稍后要填到 Nekro Agent

![令牌](/assets/adapters/discord/token.png)

## 第三步：开启必要权限

为了让机器人能正常读取消息，至少要开启：

- `PRESENCE INTENT`
- `MESSAGE CONTENT INTENT`

如果你不打开 `MESSAGE CONTENT INTENT`，机器人通常收不到消息正文。

![Discord Bot 页面中的 Intents 开关](/assets/adapters/discord/config.png)

## 第四步：把 Bot 邀请到你的服务器

1. 打开 `OAuth2` -> `URL 生成器`
2. 在 `SCOPES` 中勾选：
   - `bot`
   - `applications.commands`
3. 在 `BOT PERMISSIONS` 中至少勾选：
   - `Read Messages/View Channels`
   - `Send Messages`
   - `Embed Links`
   - `Attach Files`
   - `Read Message History`
4. 打开生成的邀请链接，把 Bot 拉进你的服务器

![权限1](/assets/adapters/discord/config2.png)

![权限2](/assets/adapters/discord/config3.png)

![邀请链接](/assets/adapters/discord/config4.png)

## 第五步：在 Nekro Agent 里填写配置

1. 打开「适配器」->「Discord」
2. 打开 `启用适配器`
3. 填入 `Discord Bot Token`
4. 如果你的网络需要代理，再填写 `代理地址`
5. 保存并重启 Nekro Agent

![Nekro Agent 中的 Discord 配置页](/assets/adapters/discord/na_config.png)

## 第六步：确认是否配置成功

1. 在 Discord 服务器里找一个机器人有权限的频道
2. 发送一条测试消息
3. 如果 Nekro Agent 能正常回复，说明已经配置成功

## 你实际只需要填写什么

- `Discord Bot Token`：必填，来自 Discord Developer Portal

## 常见问题

### 机器人在线，但不回复

优先检查：

1. `MESSAGE CONTENT INTENT` 有没有打开
2. Bot 在当前频道是否有读取和发言权限
3. 你填进 Nekro Agent 的 Token 是否仍然有效

### 机器人根本没进服务器

一般是邀请链接权限不够，或者邀请时选错了服务器。重新生成一次邀请链接通常就能解决。
