---
title: Advanced Configuration
description: Advanced configuration options for Nekro Agent, covering reply quotas, debugging, upload limits, sandbox settings, and advanced management commands.
---

# Advanced Configuration

Advanced configuration is not something you need to modify during initial deployment. Once normal chat is working, adjust these settings based on your actual needs.

::: tip Where to Configure
Navigate to WebUI "System Configuration" -> "Basic Configuration." You can use the page search to quickly locate configuration item names.
:::

## When to Change Advanced Configuration

| Scenario | Recommended Section |
|---|---|
| Bot replies too frequently; want to control costs or prevent spamming | [Reply Quota](#reply-quota) |
| Want to control which messages trigger the bot | [Trigger and Ignore Rules](#trigger-and-ignore-rules) |
| Want to make regular commands easier to type | [Command Experience](#command-experience) |
| Want to debug why the AI responded a certain way | [Debugging and Logging](#debugging-and-logging) |
| Upload files are too large and are being rejected | [File Upload](#file-upload) |
| Image recognition is poor or too expensive | [Vision Capability](#vision-capability) |
| Model service requests need a proxy | [Network and Proxy](#network-and-proxy) |
| Sandbox tasks frequently time out or have insufficient concurrency | [Sandbox Configuration](#sandbox-configuration) |
| Need to use dangerous management commands | [Advanced Management Commands](#advanced-management-commands) |

## Reply Quota

Reply quotas limit the number of bot replies in a channel, suitable for controlling API costs, reducing spamming, or protecting public channels.

| Configuration Item | Default Value | Description |
|---|---|---|
| `AI_CHAT_ENABLE_HOURLY_LIMIT` | `false` | Enable hourly limits to distribute the daily quota more evenly across each hour |
| `AI_CHAT_QUOTA_SUPER_USERS_EXEMPT` | `true` | Administrators are exempt from reply quotas |
| `AI_CHAT_QUOTA_WHITELIST_USERS` | `[]` | Whitelisted user list; users in this list are exempt from reply quotas |

::: tip When Quota Is Exhausted
When the quota is exhausted, the bot typically stops replying silently rather than posting "quota exhausted" in the group. If the bot suddenly goes quiet, check the quota settings first.
:::

## Trigger and Ignore Rules

Trigger rules determine when the bot responds to messages. In public group chats or high-volume channels, it is recommended to control the trigger scope based on actual needs.

Common configuration options include:

| Type | Description |
|---|---|
| Trigger Regex | Only messages matching the specified pattern are more likely to trigger the bot |
| Ignore Regex | Messages matching the specified pattern will be ignored by the bot |
| Random Reply | Allow the bot to participate in chat by probability even when not explicitly called |
| Observation Mode | Only log and observe messages without actively replying |

When configuring regex rules, it is recommended to test in a small-scale channel first. Rules that are too broad will cause the bot to reply frequently, while rules that are too narrow may prevent normal messages from triggering.

::: tip Channel-Level Configuration Takes Priority
If you only want to adjust a specific group or channel, use the override configuration in [Channel Management](/en/docs/03_advanced/channel_management) rather than modifying global rules directly.
:::

## Command Experience

| Configuration Item | Default Value | Description |
|---|---|---|
| `COMMAND_MATCH_ALLOW_HYPHEN_FOR_UNDERSCORE` | `true` | Allow hyphens to be used instead of underscores in commands. For example, `/na-info` will match `/na_info` |

It is recommended to keep this enabled by default. This makes it easier to type commands on mobile devices.

## Debugging and Logging

These settings are primarily for troubleshooting. It is recommended to keep them disabled during normal operation and only enable them temporarily when needed.

| Configuration Item | Default Value | Description |
|---|---|---|
| `SAVE_PROMPTS_LOG` | `false` | Save chat prompt generation logs, useful for debugging what context the AI received |
| `DEBUG_IN_CHAT` | `false` | Output debug information in chat, suitable for temporarily locating issues |
| `APP_LOG_LEVEL` | `INFO` | Application log level. Change to `DEBUG` for more detailed logs |

::: warning Disable After Debugging
Debug logs may contain large amounts of context information. After troubleshooting, it is recommended to disable debug-related settings.
:::

## File Upload

| Configuration Item | Default Value | Description |
|---|---|---|
| `MAX_UPLOAD_SIZE_MB` | `10` | Maximum upload file size in MB |

If you frequently have the AI analyze large images, documents, or spreadsheets, you can increase this value as needed.

::: warning Avoid Setting It Too Large
The larger the upload limit, the higher the processing time and resource consumption may be. Only adjust based on actual needs.
:::

## Vision Capability

Vision capability allows the bot to understand image content. It typically depends on model groups that support image input.

Common scenarios to watch for:

| Scenario | Recommendation |
|---|---|
| Image recognition fails | Check whether the current model supports vision input |
| Images are too large or too numerous | Adjust the upload limit or ask users to compress before sending |
| Costs are too high | Limit image trigger scenarios to avoid sending every image to the model |
| Group chat image flooding | Use trigger rules or channel override configuration to limit responses |

If you are only doing regular text chat, there is no need to enable or adjust vision-related settings.

## Network and Proxy

When model services, plugin interfaces, or certain external resources need to be accessed through a proxy, you can configure proxy-related options in the system configuration.

When using a proxy, it is recommended to confirm:

- The proxy address is accessible from the Nekro Agent container or runtime environment
- Proxy authentication information is correctly filled in
- Whether different services need to use the same proxy
- Whether internal network addresses should bypass the proxy

If the proxy is misconfigured, common symptoms include model request timeouts, plugins being unable to access external services, or update check failures. Use the [Log Center](/en/docs/03_advanced/logs) to view specific errors.

## Sandbox Configuration

The sandbox is used for executing AI-generated tasks. In most cases, the default settings are sufficient.

| Configuration Item | Default Value | When to Change |
|---|---|---|
| `SANDBOX_RUNNING_TIMEOUT` | `120` | Increase when regular sandbox tasks frequently time out before completing |
| `SANDBOX_MAX_CONCURRENT` | `4` | Increase when there are many concurrent tasks and the machine has sufficient resources |
| `SANDBOX_IMAGE_NAME` | `kromiose/nekro-agent-sandbox` | Change when using a custom general sandbox image |
| `SANDBOX_CHAT_API_URL` | Auto-generated | Check when the sandbox cannot access the Nekro Agent API |
| `SANDBOX_ONEBOT_SERVER_MOUNT_DIR` | `/app/nekro_agent_data` | Check when the OneBot protocol bridge cannot access NA resource files |

### Claude Code Sandbox

If you use workspaces and Claude Code, you may also need to pay attention to the following settings:

| Configuration Item | Default Value | When to Change |
|---|---|---|
| `CC_SANDBOX_IMAGE` | `kromiose/nekro-cc-sandbox` | Change when using a custom Claude Code sandbox image |
| `CC_SANDBOX_IMAGE_TAG` | `latest` | Change when pinning or switching the CC sandbox image version |
| `CC_SANDBOX_PORT_RANGE_START` | `40000` | Adjust when the host port range is occupied |
| `CC_SANDBOX_PORT_RANGE_END` | `49999` | Adjust when the host port range is occupied |
| `CC_SANDBOX_STARTUP_TIMEOUT` | `120` | Increase when the CC sandbox starts slowly or frequently times out |

::: tip Check the Workspace Page First
If the Claude Code sandbox fails to start, it is recommended to first check the workspace page and sandbox logs before deciding whether to adjust these settings.
:::

## Advanced Management Commands

| Configuration Item | Default Value | Description |
|---|---|---|
| `ENABLE_ADVANCED_COMMAND` | `false` | Enable advanced management commands |

Advanced management commands may include high-risk operations such as data cleanup or workspace deletion. Only enable them when clearly needed.

::: danger Use with Caution
After enabling, ensure that only trusted administrators can use the related commands. After completing operations, if there is no ongoing need, it is recommended to disable this setting.
:::

## Recommended Adjustment Order

If you are unsure where to start, it is recommended to follow this order:

1. Keep the default configuration and complete the deployment
2. Confirm the bot can chat normally
3. Set reply quotas based on channel size
4. Adjust upload limits based on file processing needs
5. Configure trigger and ignore rules based on channel size
6. Temporarily enable debugging and logging when issues arise
7. Adjust Claude Code sandbox settings as needed after using workspaces

## Related Documentation

- [System Configuration](/en/docs/02_quick_start/config/system) -- Required configuration and model group settings
- [Model Management](/en/docs/03_advanced/model_config) -- Manage model groups and call parameters
- [Workspace Overview](/en/docs/03_workspace/overview) -- Learn about workspaces and the Claude Code sandbox
- [Application Updates](/en/docs/02_quick_start/config/update)
