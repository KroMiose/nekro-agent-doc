---
title: SSE Configuration Guide
description: Explains how to configure the SSE adapter and connect a custom client to Nekro Agent.
---

# SSE Configuration Guide

This guide explains how to configure the SSE adapter and connect a custom client to Nekro Agent.

::: warning Scope of Use
This adapter is only suitable for users who already understand the related protocol details and are already familiar with Nekro Agent.
:::

## Before You Start

- You have already deployed Nekro Agent
- You have prepared a custom client or web frontend that will connect to it
- You know how to send requests to an HTTP endpoint and keep an SSE long-lived connection

## Step 1: Enable SSE in Nekro Agent first

1. Open `Adapter Configuration` -> `SSE`
2. Turn on `ENABLED`
3. Fill in `ACCESS_KEY` if needed
4. Turn on `ALLOW_FILE_TRANSFER` if you need to send files
5. Save the settings and restart Nekro Agent

## Step 2: Decide how the client should connect

The two most commonly used endpoints of the SSE adapter are:

- Establish the connection:

```text
GET /api/adapters/sse/connect
```

- Send commands:

```text
POST /api/adapters/sse/connect
```

If you set `ACCESS_KEY`, the client must provide the same access key as well.

## Step 3: Let the client establish the SSE connection

When the client establishes the connection, these parameters are commonly used:

- `client_name`
- `platform`
- `access_key`

Example:

```text
GET /api/adapters/sse/connect?client_name=my-web&platform=web&access_key=your_key
```

Once the connection is established, Nekro Agent can push messages to this client.

## Step 4: Include the required request headers when sending commands

When sending requests to the command endpoint, you will usually need:

- `X-Client-ID`
- `X-Access-Key`

If you did not set `ACCESS_KEY`, `X-Access-Key` can be omitted.

## Step 5: Confirm that the setup works

1. Let the client establish the SSE long connection first
2. Send a test message to this SSE chat from Nekro Agent
3. If the client receives it, the setup is successful

## The settings you need to understand most

- `Access Key`: Whether to add an access check
- `Allow File Transfer`: Whether to allow file and image transfer
- `Maximum File Size (Bytes)`: File size limit
- `Allowed File Types`: Which file types are allowed
- `Response Timeout (Seconds)`: How long to wait for a client acknowledgment
- `Ignore Client Response`: Whether to ignore the client acknowledgment

## What the chat key looks like after setup

The common internal chat key format for SSE is:

```text
sse-{platform}-{channel_id}
```

For example:

```text
sse-web-private_user001
```

## Common Problems

### The client cannot connect

Check these first:

1. Whether the SSE adapter is enabled in Nekro Agent
2. Whether the access address is correct
3. Whether `access_key` matches the server side

### The message was sent, but Nekro Agent says it failed

This usually means the client did not return an acknowledgment in time. You can:

1. Fix the client acknowledgment logic first
2. Or temporarily turn on `IGNORE_RESPONSE`

However, the second option is only suitable for debugging, because it may mark an undelivered message as successful.
