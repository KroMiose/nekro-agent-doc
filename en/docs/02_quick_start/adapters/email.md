---
title: Email Configuration Guide
description: Configuration guide for first-time users connecting Nekro Agent to email inboxes.
---

# Email Configuration Guide

This guide uses QQ Mail as an example to explain how to configure the Email adapter and connect Nekro Agent to email sending and receiving workflows.

::: tip Tip

The current adapter version does not support mailboxes that require OAuth authentication, such as Gmail or Outlook.

:::

::: tip Tip

Different mailbox providers use different settings. Always follow the actual mailbox provider's requirements.

:::

## Before You Start

- You have already deployed Nekro Agent
- You have an email account prepared for testing
- IMAP and SMTP are already enabled in the mailbox console
- You have obtained the mailbox authorization code or app-specific password

## Step 1: Open the mail provider console and get the authorization code

1. Log in to QQ Mail
2. Click `Account & Security` from the account menu in the upper-right corner
3. In the page that opens, click `Security Settings`, then enable the service under `POP3/IMAP/SMTP/Exchange/CardDAV`
4. Follow the instructions to enable the related services
5. Record the authorization code

![Settings 1](/assets/adapters/email/config.png)

![Settings 2](/assets/adapters/email/config2.png)

![Authorization code](/assets/adapters/email/config3.png)

## Step 2: Add the mailbox account in Nekro Agent

1. Open `Adapters` -> `Email`
2. Turn on `Enable Adapter`
3. Add a new account in `Email Account List`
4. Fill in `Provider`
5. Fill in `Email Address` and `Authorization Code`
6. If this account should also send mail, turn on `Enable Sending`
7. If you want to always send with this account by default, also turn on `Default Sender`
8. Save the settings and restart Nekro Agent

![Email configuration page in Nekro Agent](/assets/adapters/email/na_config.png)

### How to fill in the common fields

- `Provider`: Common values are `QQ Mail`, `163 Mail`, or `Custom`
- `Username`: Full email address, for example `user@example.com`
- `Password / Authorization Code`: The authorization code or app-specific password
- `Enable Sending`: Whether this mailbox can send mail
- `Default Sender`: Whether this mailbox is the default sender

If you choose `Custom`, you also need to fill in:

- `Custom IMAP Host`
- `Custom IMAP Port`
- `Custom SMTP Host`
- `Custom SMTP Port`
- `Custom SMTP SSL Port`

## Step 3: Configure polling and notifications

These are the global settings you should check first:

- `Polling Interval (Seconds)`: How often to check for new mail. Default is 30 seconds
- `Unread Only`: Whether to fetch only unread emails
- `Maximum Fetch Count`: Maximum number of messages fetched each time
- `Mark as Read After Fetch`: Whether to mark messages as read after fetching
- `Enable New Mail Notification`: Whether to enable new mail notifications
- `Notification Chat`: Which chat to send the notification to

When using it for the first time, it is recommended to keep the default values and change them only when necessary.

## Step 4: Confirm that the setup works

1. Send a test email to this mailbox
2. Wait for one polling cycle
3. Check whether a new Email chat appears in Nekro Agent
4. If sending is enabled, also try asking the AI to send a test email

## What You Will See After the Setup

Each mailbox account appears as an individual chat:

```text
email-<your-email-address>
```

For example:

```text
email-123456@qq.com
```

## Where attachments are stored

Mail attachments are automatically saved to:

```text
data/uploads/email_attachment/{mailbox-account}/{message-uid}/{attachment-file-name}
```

If you plan to let the AI handle attachments, make sure the data directory is writable.

## Common Problems

### The username and password seem correct, but it still cannot connect

Most of the time, the problem is that you entered the login password instead of the authorization code.

### Mail can be received, but cannot be sent

Check these first:

1. Whether `Enable Sending` is enabled for the current account
2. Whether SMTP is enabled on the mailbox provider side
3. Whether this mailbox is set as the default sender, or whether you explicitly selected the account when sending

### Two mailboxes are both set as the default sender

This is not allowed. There can only be one default sender.
