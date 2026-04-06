---
title: OneBot V11 / NapCat Configuration Guide
description: Configuration guide for first-time QQ platform users connecting through OneBot V11 / NapCat.
---

# OneBot V11 / NapCat Configuration Guide

This guide explains how to configure OneBot V11 / NapCat and connect Nekro Agent to QQ.

::: tip Tip

If you installed NekroAgent with the Windows Launcher, you can complete the network setup directly from the launcher's NapCat page with one click.

:::

## Before You Start

- You have already deployed Nekro Agent and can open the WebUI
- You have a QQ account that will be used for the bot
- You know the Nekro Agent access address, for example `http://<server-ip>:8021`

## Step 1: Enable OneBot V11 in Nekro Agent first

1. Open the Nekro Agent WebUI
2. Go to `Adapters` -> `OneBot V11`
3. Open the `Configuration` page
4. Turn on `Enable Adapter`
5. Fill in `Bot QQ Number`
6. Fill in `NapCat WebUI URL`
7. Save the adapter configuration
8. Restart Nekro Agent
9. Go back to the `OneBot V11` adapter and open the `NapCat` page
10. Note the `OneBot Service Access Key` and `NapCat Login Token` shown on the page

![OneBot V11 configuration page in Nekro Agent](/assets/adapters/onebot_v11/nekro-agent-onebot-config.png)

### How to fill these fields

- `BOT_QQ`: QQ number used by the bot
- `RESOLVE_CQ_CODE`: Leave default in most cases; only enable it if you explicitly need the protocol side to parse CQ code
- `NAPCAT_ACCESS_URL`: NapCat WebUI address, commonly `http://<server-ip>:6099/webui`
- `NAPCAT_CONTAINER_NAME`: Usually does not need to be changed in a default deployment

## Step 2: Log in to NapCat

1. Open the NapCat WebUI, commonly at `http://<server-ip>:6099/webui`
2. Log in with the `NapCat Login Token` you noted earlier
3. Use the method provided on the page to log in to QQ
4. Make sure NapCat shows an online status
5. If this is your first time opening it, go to `System Settings` -> `Change Password` and change the default password first

![NapCat login page](/assets/adapters/onebot_v11/nc-login.png)

## Step 3: Configure reverse WebSocket in NapCat

1. Open `Network Configuration` in NapCat
2. Add a `WebSocket Client`
3. Fill in the address:

```text
ws://nekro_agent:8021/onebot/v11/ws
```

If you are not using the all-in-one container deployment, you can change it to:

```text
ws://<your-server-ip>:8021/onebot/v11/ws
```

4. Set the authentication key to the `OneBot Service Access Key` shown in Nekro Agent
5. Save and enable this connection

![NapCat network configuration page](/assets/adapters/onebot_v11/nc-internet.png)

## Step 4: Confirm that the connection works

After completing the setup above, check in this order:

1. Open `Cat Logs` in NapCat
2. Check whether there are any WebSocket-related errors
3. Send a private message to the bot
4. Go back to Nekro Agent and open `System Logs` to see whether the message you sent appears
5. If it does, the configuration is successful

## If You Are Not Using NapCat

If you are using another `OneBot V11` compatible protocol implementation, you only need to point its reverse WebSocket URL to:

```text
ws://<your-server-ip>:8021/onebot/v11/ws
```

If you also need image upload, file upload, or similar features, make sure Nekro Agent and the protocol implementation share the same mounted file paths.

## What You Will See After the Setup

- Group chats appear as `onebot_v11-group_<group-id>`
- Private chats appear as `onebot_v11-private_<qq-number>`

Both are normal and do not need to be changed manually.

## Common Problems

### NapCat is online, but Nekro Agent does not receive messages

Check these first:

1. Whether the reverse WebSocket URL is correct
2. Whether the `OneBot Service Access Key` is correct
3. Whether the connection switch in NapCat is actually enabled
4. Whether the `OneBot V11` adapter is enabled in Nekro Agent

### Messages can be received, but not sent

This is usually caused by one of the following:

1. The bot account is restricted by the platform
2. The bot account has been muted
3. The connection between the protocol implementation and Nekro Agent has been disconnected

### Images or files fail to send

If you are not using the standard all-in-one deployment, check the file mounting first:

1. Whether the protocol implementation supports sending images and files
2. Whether Nekro Agent and the protocol implementation can access the same file path
3. Whether the file size exceeds the platform limit
