---
title: Log Center
description: View, filter, download, and real-time track Nekro Agent logs in the WebUI
---

# Log Center

The Log Center is used to view Nekro Agent's operational logs within the WebUI. It is useful for troubleshooting issues related to deployment, adapters, model calls, plugins, workspaces, and sandboxes.

::: warning Logs May Contain Sensitive Information
When troubleshooting, be aware that logs may contain channel names, user information, request URLs, error context, and similar data. Before seeking help publicly, it is recommended to redact sensitive details.
:::

## What the Log Center Can Do

| Feature | Description |
|---|---|
| View Historical Logs | Review recent operational records and error messages |
| Filter by Source | View output from a specific module or service only |
| Real-time Log Stream | Continuously observe new logs while the page is open |
| Download Logs | Save log files for feedback or archiving |
| Filter by Severity Level | Locate issues based on INFO, WARNING, ERROR, and other levels |

## When to Check Logs

Open the Log Center in the following situations:

- The bot is not replying, but the adapter shows it is online
- Model calls are failing, timing out, or returning errors
- Plugin commands fail to execute
- Workspace or Claude Code sandbox fails to start
- Knowledge base upload, vectorization, or retrieval is abnormal
- The WebUI page displays an unknown error

## Understanding Log Levels

| Level | Meaning | Recommendation |
|---|---|---|
| DEBUG | Detailed debugging information | Enable temporarily for troubleshooting only |
| INFO | Normal operational information | Monitor during routine observation |
| WARNING | Issues that may affect functionality | Check configuration if they appear frequently |
| ERROR | Feature execution failure | Prioritize resolution |
| CRITICAL | Severe anomaly | Investigate service status as soon as possible |

For more detailed logs, adjust `APP_LOG_LEVEL` in the "System Configuration" page. After troubleshooting, it is recommended to restore the default level to avoid excessive log output.

## Troubleshooting Suggestions

### Adapter Connection Issues

First filter or search for the adapter name, such as OneBot, Telegram, Discord, Feishu, WeCom, etc. Focus on:

- Authentication failures
- Incorrect webhook URLs
- Network connection failures
- Message parsing errors

### Model Call Issues

Search for the model group name, Base URL, or error keywords. Common causes include:

- Incorrect API Key or insufficient quota
- Incompatible Base URL
- Incorrectly entered model name
- Request timeouts
- Upstream service rate limiting

### Workspace and Sandbox Issues

If a workspace task fails, first check the workspace page for hints, then search the Log Center for keywords such as "workspace," "sandbox," or "Claude Code."

Common causes include image pull failures, insufficient port ranges, sandbox startup timeouts, and abnormal workspace paths.

### Plugin Issues

Plugin-related errors typically include the plugin name or command name. When troubleshooting, try temporarily disabling recently added or updated plugins to narrow down the scope.

## Downloading Logs for Feedback

When reporting issues to the community or developers, it is recommended to provide:

1. The approximate time the issue occurred
2. The relevant log excerpts
3. The adapter and deployment method used
4. Whether any recent version updates or configuration changes were made

Please remove sensitive information such as API keys, tokens, cookies, and internal network addresses before sending.

## Related Configuration

Log-related configuration can be found in [Advanced Configuration](/en/docs/02_quick_start/config/advanced#debugging-and-logging). Common settings include:

- `APP_LOG_LEVEL`
- `SAVE_PROMPTS_LOG`
- `DEBUG_IN_CHAT`

## Related Documentation

- [Dashboard](/en/docs/03_advanced/dashboard)
- [Advanced Configuration](/en/docs/02_quick_start/config/advanced)
- [FAQ](/en/docs/06_troubleshooting/faq)
