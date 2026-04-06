---
title: Telegram 配置教程
description: 面向首次接入 Telegram 用户的 Nekro Agent 配置教程。
---

# Telegram 配置教程

本文说明如何配置 Telegram 适配器，并将 Nekro Agent 接入 Telegram Bot。

## 开始前准备

- 你已经部署好 Nekro Agent，并能登录 WebUI
- 你的网络可以访问 Telegram
- 如果你的网络不能直连 Telegram，请提前准备好代理地址

## 第一步：用 BotFather 创建机器人

1. 在 Telegram 中找到 [@BotFather](https://t.me/BotFather)
2. 发送 `/newbot`
3. 按提示填写机器人名称和用户名
4. 记下返回的 `Bot Token`

![BotFather 创建机器人并返回 Token](/assets/adapters/telegram/create.png)

## 第二步：关闭机器人的隐私设置

::: tip 小贴士

如果不关闭隐私保护的话，机器人在群聊内无法接收到不以 `/` 开头的消息

:::

1. 在 Telegram 中找到 [@BotFather](https://t.me/BotFather)
2. 发送 `/setprivacy`
3. 选择刚刚创建的机器人
4. 点击 `Disable`

![关闭隐私保护](/assets/adapters/telegram/change_privacy.png)

## 第三步：在 Nekro Agent 里填写配置

1. 打开「适配器」->「Telegram」
2. 打开 `启用适配器`
3. 把刚才拿到的 `Bot Token` 填进去
4. 如果你的网络需要代理，再填写 `代理地址`
5. 保存并重启 Nekro Agent

![Nekro Agent 中的 Telegram 配置页](/assets/adapters/telegram/na_config.png)

## 第四步：确认是否配置成功

1. 私聊机器人发送一条消息
2. 如果是群聊，就在群里 `@机器人` 再发送消息
3. 看到 Nekro Agent 正常回复，就说明已经接通

## 只需要记住的两个配置项

- `Bot Token`：必填，来自 `@BotFather`
- `代理地址`：按需填写，只有在 Telegram 无法直连时才需要

## 常见问题

### 启动后一直没反应

先按这个顺序排查：

1. `Bot Token` 有没有复制错
2. 机器人是否真的已经创建成功
3. 服务器是否能访问 Telegram
4. 是否应该填写代理但你没有填

### 私聊可以，群聊不回复

群聊里通常是这几个问题：

1. 没有 `@` 机器人
2. 隐私设置未关闭且消息未以 `/` 开头
