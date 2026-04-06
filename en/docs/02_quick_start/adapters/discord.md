---
title: Discord Configuration Guide
description: Configuration guide for first-time users connecting Nekro Agent to Discord.
---

# Discord Configuration Guide

This guide explains how to configure the Discord adapter and connect Nekro Agent to a Discord Bot.

## Before You Start

- You have already deployed Nekro Agent
- You can open the [Discord Developer Portal](https://discord.com/developers/applications)
- You have a Discord server where you can invite a bot

## Step 1: Create a Discord application and bot

1. Open the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click `New Application`
3. Enter the application name and create it
4. Open `Bot` in the left sidebar

![Create application](/assets/adapters/discord/create.png)

## Step 2: Copy the Bot Token

On the `Bot` page:

1. Find `Token`
2. Click copy, or reset the token and copy the new value
3. Save it for later use in Nekro Agent

![Token](/assets/adapters/discord/token.png)

## Step 3: Enable the required intents

To let the bot read messages normally, enable at least:

- `PRESENCE INTENT`
- `MESSAGE CONTENT INTENT`

If you do not enable `MESSAGE CONTENT INTENT`, the bot usually cannot receive message content.

![Intents switches on the Discord Bot page](/assets/adapters/discord/config.png)

## Step 4: Invite the bot to your server

1. Open `OAuth2` -> `URL Generator`
2. Under `SCOPES`, check:
   - `bot`
   - `applications.commands`
3. Under `BOT PERMISSIONS`, check at least:
   - `Read Messages/View Channels`
   - `Send Messages`
   - `Embed Links`
   - `Attach Files`
   - `Read Message History`
4. Open the generated invite link and add the bot to your server

![Permissions 1](/assets/adapters/discord/config2.png)

![Permissions 2](/assets/adapters/discord/config3.png)

![Invite link](/assets/adapters/discord/config4.png)

## Step 5: Fill in the settings in Nekro Agent

1. Open `Adapters` -> `Discord`
2. Turn on `Enable Adapter`
3. Fill in `Discord Bot Token`
4. If your network requires a proxy, also fill in `Proxy URL`
5. Save the settings and restart Nekro Agent

![Discord configuration page in Nekro Agent](/assets/adapters/discord/na_config.png)

## Step 6: Confirm that the setup works

1. In your Discord server, find a channel where the bot has permission
2. Send a test message
3. If Nekro Agent can reply normally, the setup is successful

## What you actually need to fill in

- `Discord Bot Token`: Required. From the Discord Developer Portal

## Common Problems

### The bot is online, but does not reply

Check these first:

1. Whether `MESSAGE CONTENT INTENT` is enabled
2. Whether the bot has permission to read and send messages in the current channel
3. Whether the token filled into Nekro Agent is still valid

### The bot never joined the server

This is usually caused by missing permissions in the invite link, or by choosing the wrong server during the invite flow. Regenerating the invite link usually fixes it.
