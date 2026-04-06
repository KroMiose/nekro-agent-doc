---
title: Feishu Configuration Guide
description: Configuration guide for first-time users connecting Nekro Agent to Feishu.
---

# Feishu Configuration Guide

This guide explains how to configure the Feishu adapter and connect Nekro Agent to Feishu.

## Before You Start

- You have already deployed Nekro Agent
- You have permission to create an enterprise self-built app in Feishu
- You can open the [Feishu Open Platform](https://open.feishu.cn/app)

## Step 1: Create a Feishu app and add the bot capability

1. Open the [Feishu Open Platform](https://open.feishu.cn/app)
2. Create an `Enterprise Self-built App`
3. Fill in the app name and description
4. Add the `Bot` capability to the app

![Create app](/assets/adapters/feishu/create.png)

![Add capability](/assets/adapters/feishu/add.png)

## Step 2: Get `App ID` and `App Secret`

Open `Credentials & Basic Information` and record these two values:

- `App ID`
- `App Secret`

You will fill both of them into Nekro Agent later.

![Credentials](/assets/adapters/feishu/id.png)

## Step 3: Switch event subscription to long connection mode

1. Open `Events & Callbacks` -> `Event Configuration`
2. Select `Long Connection` mode
3. Add the event `im.message.receive_v1`

Be careful on the Feishu side: you must use long connection mode here. Do not configure it as an HTTP callback.

![Feishu event subscription set to long connection mode](/assets/adapters/feishu/config.png)

## Step 4: Configure app permissions

Open `Permission Management`, click `Bulk Import/Export Permissions`, replace the existing content with the following, and then click next:

```json
{
  "scopes": {
    "tenant": [
      "contact:contact.base:readonly",
      "contact:user.base:readonly",
      "im:chat",
      "im:message",
      "im:message.group_at_msg:readonly",
      "im:message.group_msg",
      "im:message.p2p_msg:readonly",
      "im:message.reactions:write_only",
      "im:message:send_as_bot",
      "im:resource"
    ],
    "user": []
  }
}
```

If the permissions are incomplete, the most common symptom is that the adapter can connect, but cannot send messages or cannot receive group messages.

![Bulk import](/assets/adapters/feishu/config2.png)

![Permission input](/assets/adapters/feishu/config3.png)

## Step 5: Fill in the settings in Nekro Agent

1. Open `Adapter Configuration` -> `Feishu`
2. Turn on `Enable Adapter`
3. Fill in `App ID`
4. Fill in `App Secret`
5. Save the settings and restart Nekro Agent

![Feishu configuration page in Nekro Agent](/assets/adapters/feishu/na_config.png)

## Step 6: Publish and install the app

1. Create a version in the Feishu console
2. Submit it for release as required by the platform
3. Confirm that the app has been installed in the target tenant
4. Add the bot to a test group, or send a private message to the bot directly

![Publish](/assets/adapters/feishu/publish.png)

## Step 7: Confirm that the setup works

1. Send a message to the bot in a private chat
2. Or `@mention` the bot in a group and send a message
3. If Nekro Agent replies normally, the setup is successful

## What you actually need to fill in

- `APP_ID`: From the Feishu Open Platform
- `APP_SECRET`: From the Feishu Open Platform

## Common Problems

### The Feishu console is configured, but the bot does not reply

Check these first:

1. Whether event subscription is really set to `Long Connection`
2. Whether `APP_ID` and `APP_SECRET` were copied correctly
3. Whether the app has already been published and installed
4. Whether all required permissions have been enabled

### The bot replies in private chat, but not in groups

This usually means the group-message related permissions are missing, or the bot has not been added to the group correctly.
