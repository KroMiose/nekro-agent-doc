---
title: QQBot OpenClaw Configuration Guide
description: Configuration guide for first-time users connecting Nekro Agent to the QQ Open Platform official bot through QQBot OpenClaw.
---

# QQBot OpenClaw Configuration Guide

This guide explains how to connect Nekro Agent to the **QQ Open Platform official bot** (group chat / private chat) through the **QQBot OpenClaw** channel.

> This is the **official channel** way to connect Nekro Agent to QQ. It creates a bot in the QQ Open Platform OpenClaw entry, which is different from
> the [OneBot V11 / NapCat](/en/docs/02_quick_start/adapters/onebot_v11) approach of logging in a QQ account plus a protocol client.
> The former is an **official bot application** whose identity is an openid assigned by the platform, not your QQ number.

## Before You Start

- You have already deployed Nekro Agent and can open the WebUI
- You have a mobile QQ account to log in to the QQ Open Platform
- You know the Nekro Agent access address, for example `http://<server-ip>:8021`

## Step 1: Scan the QR code to create the bot

1. Open the Nekro Agent WebUI
2. Go to `Adapters` -> `QQBot OpenClaw`
3. Open the `Onboarding` page
4. Scan the QR code on the right with your mobile QQ to enter the **OpenClaw entry** of the QQ Open Platform
   (entry address: <https://q.qq.com/qqbot/openclaw/index.html>)
5. Log in and **create the bot** as prompted

::: tip Tip

Scanning the QR code only opens the platform entry and creates the bot; it does **not** mean Nekro has logged in successfully. You still need the credentials from Step 2 to connect at runtime.

:::

## Step 2: Copy the credentials

After creating the bot, the page will show:

- **AppID** (`APP_ID`): the bot application ID
- **AppSecret** (`CLIENT_SECRET`): the bot secret, used to exchange the AccessToken for the OpenClaw QQBot Gateway

> ⚠️ **AppSecret may not be shown in plaintext again after you leave the platform page.** Copy and store it safely right away.

## Step 3: Fill in the credentials and connect

1. Return to the Nekro Agent WebUI
2. Open the `QQBot OpenClaw` adapter's `Configuration` page
3. Turn on `Enable Adapter`
4. Fill in `APP_ID` and `CLIENT_SECRET`
5. Save the adapter configuration
6. **Restart Nekro Agent** (or click `Reconnect` in the `Onboarding` page to reconnect the Gateway)

After saving and restarting, the status at the top of the `Onboarding` page should progress from `Not configured` to `Configured -> Running -> Connected`.

## How to fill these fields

| Field | Description |
| --- | --- |
| `APP_ID` | AppID obtained after creating the bot in the QQ Open Platform OpenClaw entry. Required; requires restart after change |
| `CLIENT_SECRET` | AppSecret obtained after creating the bot. Sensitive; used to exchange the Gateway AccessToken; requires restart after change |
| `GROUP_POLICY` | Group policy: `open` accepts all groups; `allowlist` accepts only allowlisted groups; `disabled` disables group chat |
| `GROUP_ALLOW_FROM` | List of `group_openid` allowed when `GROUP_POLICY=allowlist`; use `*` to allow all |
| `DEFAULT_REQUIRE_MENTION` | Normal group messages are only collected without triggering by default; disable to let them trigger (default on) |
| `IGNORE_OTHER_MENTIONS` | Whether to ignore the trigger when a group message mentions others but not this bot |
| `GROUP_HISTORY_LIMIT` | Group context history limit, following the OpenClaw default (default 50) |
| `PROACTIVE_SEND_ENABLED` | Try proactive sends when no recent inbound/ref message exists (default on) |

## Group trigger rules

QQBot OpenClaw group messages are only recorded as **context** by default and will not reply automatically. To trigger a reply you need to:

- `@ this bot` in the group
- or `quote` a previous message sent by this bot

This avoids the bot spamming large groups. You can adjust normal group message triggering through `DEFAULT_REQUIRE_MENTION` above.

## Maintenance

In the `Maintenance` section of the `Onboarding` page you can:

- `Test Token`: verify whether the current `CLIENT_SECRET` can exchange an AccessToken normally
- `Reconnect`: restart the Gateway background connection
- `Clear Session`: clear short-term session state
- `Clear Refs`: clear the reference index used for message quoting

## What you will see after configuration

- Private chat will show as: `qqoc-c2c:{user_openid}`
- Group chat will show as: `qqoc-group:{group_openid}`

> Identity IDs (`openid`) are assigned by the QQ Open Platform/OpenClaw. **They are not traditional QQ numbers.** This is normal and requires no manual change.

## Troubleshooting

### Status stays at `Not configured`

1. Check whether `APP_ID` / `CLIENT_SECRET` were saved on the `Configuration` page
2. Whether Nekro Agent was restarted after saving
3. Click `Refresh` on the `Onboarding` page after restarting

### Status is `Configured / Running` but not `Connected`

1. Click `Test Token` on the `Onboarding` page to confirm the credential is valid
2. If the credential is invalid, re-copy the AppSecret from the platform and update it
3. Confirm the bot has gone live on the platform side

### Group messages are not replied to

1. Confirm this bot is actually on the **official bot channel** and is in the group
2. Try `@ this bot` or `quote` the bot's message in the group to trigger
3. Confirm `GROUP_POLICY` is not `disabled` and is not limited by the `allowlist`

## Next Steps

- Adapter configured but the bot still does not reply? Go to [System Configuration](/en/docs/02_quick_start/config/system) and configure at least one **chat model group**
- Want to connect QQ via the `login a QQ account + protocol client` approach? See [OneBot V11 / NapCat](/en/docs/02_quick_start/adapters/onebot_v11)
- Want to set a persona for the bot? See [Persona Tips](/en/docs/03_advanced/persona_tips)
