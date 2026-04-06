---
title: Telegram Configuration Guide
description: Configuration guide for first-time users connecting Nekro Agent to Telegram.
---

# Telegram Configuration Guide

This guide explains how to configure the Telegram adapter and connect Nekro Agent to a Telegram Bot.

## Before You Start

- You have already deployed Nekro Agent and can open the WebUI
- Your network can reach Telegram
- If your network cannot reach Telegram directly, prepare a proxy URL in advance

## Step 1: Create a bot with BotFather

1. Find [@BotFather](https://t.me/BotFather) in Telegram
2. Send `/newbot`
3. Follow the prompts to set the bot name and username
4. Record the returned `Bot Token`

![BotFather creates a bot and returns a token](/assets/adapters/telegram/create.png)

## Step 2: Disable the bot privacy setting

::: tip Tip

If privacy mode stays enabled, the bot cannot receive regular group messages that do not start with `/`.

:::

1. Find [@BotFather](https://t.me/BotFather) in Telegram
2. Send `/setprivacy`
3. Select the bot you just created
4. Click `Disable`

![Disable privacy mode](/assets/adapters/telegram/change_privacy.png)

## Step 3: Fill in the settings in Nekro Agent

1. Open `Adapters` -> `Telegram`
2. Turn on `Enable Adapter`
3. Fill in the `Bot Token` you obtained earlier
4. If your network requires a proxy, also fill in `Proxy URL`
5. Save the settings and restart Nekro Agent

![Telegram configuration page in Nekro Agent](/assets/adapters/telegram/na_config.png)

## Step 4: Confirm that the setup works

1. Send a message to the bot in a private chat
2. If you are testing in a group, `@mention` the bot and send a message
3. If Nekro Agent replies normally, the configuration is successful

## The only two settings most users need to remember

- `Bot Token`: Required. Provided by `@BotFather`
- `Proxy URL`: Only needed when Telegram cannot be reached directly

## Common Problems

### Nothing happens after startup

Check in this order:

1. Whether the `Bot Token` was copied correctly
2. Whether the bot was actually created successfully
3. Whether the server can reach Telegram
4. Whether a proxy is required but not configured

### The bot replies in private chat but not in groups

In group chats, the problem is usually one of the following:

1. The bot was not `@mentioned`
2. Privacy mode is still enabled and the message does not start with `/`
