---
title: WeCom AI Bot Configuration Guide
description: Configuration guide for first-time users connecting through WeCom AI Bot.
---

# WeCom AI Bot Configuration Guide

This guide explains how to configure the WeCom AI Bot adapter and connect Nekro Agent through WeCom's official long connection mode.

## Before You Start

- You have already deployed Nekro Agent
- You have access to the WeCom admin console
- You can create or manage WeCom AI Bots

## Step 1: Create an AI Bot in the WeCom admin console

1. Open the WeCom AI Bot admin page
   - Web entry: `Security Management` -> `Management Tools` -> `Smart Robot`
   - Desktop entry: `Workbench` -> `Smart Robot`
2. Click `Create Bot`, then click `Manual Creation`, scroll to the bottom of the panel on the right, and choose `Create in API Mode`
3. Choose `Use Long Connection`
4. Record the following values:
   - `BOT_ID`
   - `BOT_SECRET`

![Manual creation](/assets/adapters/wecom_ai/create1.png)

![API mode](/assets/adapters/wecom_ai/create2.png)

![BOT_ID and BOT_SECRET in the WeCom AI Bot console](/assets/adapters/wecom_ai/botid&secret.png)

## Step 2: Fill in the settings in Nekro Agent

1. Open `Adapters` -> `WeCom AI Bot`
2. Turn on `Enable Adapter`
3. Fill in `Bot ID`
4. Fill in `Secret`
5. Save the settings and restart Nekro Agent

![WeCom AI Bot configuration page in Nekro Agent](/assets/adapters/wecom_ai/na_config.png)

## Step 3: Confirm that the long connection is established

After the configuration is complete, check in this order:

1. Open the Nekro Agent logs
2. Confirm that there are no credential errors
3. Send a test message to the bot
4. If Nekro Agent can receive and reply normally, the setup is successful

## The fields beginners usually need to care about

- `BOT_ID`: Provided by the WeCom AI Bot console
- `BOT_SECRET`: Provided by the WeCom AI Bot console

The following optional items can usually stay at their default values during the first setup:

- `Heartbeat Interval`
- `Request Timeout`
- `Base Reconnect Interval`
- `Maximum Reconnect Count`
- `All received messages trigger AI`
- `Accept text messages`
- `Log event callbacks`
- `Log raw frames`
- `Maximum log length`

## What this mode is suitable for

- You want to use WeCom's official capability
- You do not want to expose a public callback URL
- You want the bot to send and receive messages directly over a long connection

## Current known limitations

- Active sending currently mainly supports Markdown, images, and files
- Voice, video, template cards, and similar features are still incomplete
- In some username or group-name scenarios, raw IDs may still be shown

## Common Problems

### The logs keep saying it cannot connect

Check these first:

1. Whether `BOT_ID` and `BOT_SECRET` were copied correctly
2. Whether the bot was actually created successfully in the WeCom console
3. Whether the environment running Nekro Agent can reach WeCom's official services

### The connection works, but messages are incomplete

This is caused by the current adapter capability boundary, especially for voice, video, and template card messages.
