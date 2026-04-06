---
title: WeCom Custom App Configuration Guide
description: Configuration guide for first-time users connecting through a WeCom custom app.
---

# WeCom Custom App Configuration Guide

This guide explains how to configure the WeCom custom app adapter and connect Nekro Agent through WeCom's app callback mode.

## Before You Start

- You have already deployed Nekro Agent
- You have access to the WeCom admin console
- You have prepared a public HTTP/HTTPS address that can be reached from the Internet

## Step 1: Create a custom app in the WeCom admin console

1. Open the WeCom custom app admin page
   - Web entry: `App Management` -> `App Management` -> `Create App`
   - Desktop: not supported
2. Fill in the app name and description, choose the visibility scope, and upload an image as the app icon
3. On the app home page, record `AgentId` and `Secret`. To view `Secret`, click to reveal it and verify it in the corresponding enterprise account on desktop or mobile if required
4. Under `Receive Messages`, click `Set API Receive`
5. Fill in `URL`, then generate and record `Token` and `EncodingAESKey`. `URL` must be the public HTTP/HTTPS address you prepared in advance, and it should point to Nekro Agent's WeCom custom app callback endpoint: `http://ip:port/api/adapters/wxwork_corp_app/callback`. If you do not have a public domain, this adapter is not suitable for you. Use [WeCom AI Bot](/en/docs/02_quick_start/adapters/wecom_bot) instead
6. After you obtain the two tokens, do not click save yet. Complete step 2 first, enable the adapter, and restart Nekro Agent. Then return here and click save. Otherwise the URL verification will fail
7. After the app is saved, go to the app management page and configure the trusted IP. On the machine where you deployed the service, run `curl ifconfig.me`, then fill the output into `Enterprise Trusted IP` and save

![AgentId](/assets/adapters/wecom_crop/config1.png)

![Secret](/assets/adapters/wecom_crop/secret.png)

![Callback URL](/assets/adapters/wecom_crop/config2.png)

## Step 2: Fill in the settings in Nekro Agent

1. Open `Adapters` -> `WeCom Corp App`
2. Turn on `Enable Adapter`
3. Fill in:
   - `Corp ID`
   - `Secret`
   - `Agent ID`
   - `Callback Token`
   - `Callback EncodingAESKey`
4. Save the settings and restart Nekro Agent

`Corp ID` needs to be obtained from the enterprise console:

- Web: `My Company` -> `Company ID`
- Desktop: not supported

![WeCom custom app configuration page in Nekro Agent](/assets/adapters/wecom_crop/na_config.png)

## Step 3: Confirm that the setup works

1. Send a test message to the app
2. If Nekro Agent can receive and reply, the setup is successful

## Step 4 (Optional): Use Nekro Agent through WeChat Customer Service with the custom app

1. Go to the `WeChat Customer Service` admin page
   - Web: `App Management` -> `App Management` -> `WeChat Customer Service`
   - Desktop: `Workbench` -> `WeChat Customer Service`
2. Create a customer service account
3. Click the small `API` button below WeChat Customer Service. In the pop-up selector, configure `Apps Allowed to Call API`, check the custom app you just created, and confirm
4. Click `Go to Configuration` below `Apps Allowed to Call API`. On the new page, click `...` under `Actions`, then click `Configure Customer Service Account`, select the customer service account you just created, and confirm

![API](/assets/adapters/wecom_crop/config3.png)

![API access](/assets/adapters/wecom_crop/config4.png)

![Configuration](/assets/adapters/wecom_crop/config5.png)

![More actions](/assets/adapters/wecom_crop/config6.png)

![Configure customer service account](/assets/adapters/wecom_crop/config7.png)

## What to keep in mind for this mode

- It currently mainly supports sending and receiving private messages

## Common Problems

### The WeCom console says callback verification failed

Check these first:

1. Whether the callback URL can be reached from the public Internet
2. Whether `CALLBACK_TOKEN` matches on both sides
3. Whether `CALLBACK_ENCODING_AES_KEY` matches on both sides

### The app is verified successfully, but the bot does not reply

In this case, check whether `CORP_ID`, `Secret`, and `AgentId` in Nekro Agent were filled in correctly.
