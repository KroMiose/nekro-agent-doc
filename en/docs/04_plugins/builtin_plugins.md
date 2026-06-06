---
title: Built-in Plugins
description: Overview of Nekro Agent's built-in plugin capabilities, helping users understand what default plugins can do and how to enable them
---

# Built-in Plugins

Built-in plugins are the foundational capabilities that ship with Nekro Agent. They cover common scenarios such as message interaction, image viewing, scheduled tasks, search, voice, dice rolling, and group management.

Most users can start with the built-in plugins without needing to install many community plugins right away.

## Where to Enable Them

Navigate to the "Plugin Management" page in the WebUI to view, enable, disable, and configure plugins.

It is recommended to follow this order:

1. First, ensure the core plugins remain enabled
2. Enable additional plugins like search, voice, and timer as needed
3. Configure the required keys or parameters for each plugin
4. Test in a channel to confirm the plugin works correctly

::: tip Recommendation
When getting started, only enable the plugins you actually need. Fewer plugins mean clearer capabilities for the AI and simpler troubleshooting.
:::

## Common Built-in Plugins

| Plugin | What It Does | Suitable Scenarios |
|---|---|---|
| Basic Interaction Plugin | Send text, images, and files; view partial data content | Daily chat, file sharing, basic interaction |
| Image Viewer | Help AI view and understand image content | Image recognition, screenshot analysis, meme understanding |
| Timer Toolset | Create reminders, one-time scheduled tasks, and recurring tasks | Timed reminders, daily broadcasts, periodic checks |
| Google Search Tool | Retrieve real-time search results | Querying news, research materials, web information |
| AI Voice Plugin | Convert text to AI-generated voice | Voice replies, character voice output |
| Dice Roller | Dice checks and random selections | TRPG, random events, group chat entertainment |
| Discipline Officer | Assist with group management and muting | Group chat moderation, violation handling |
| Notebook Plugin | Record and retrieve simple notes | Temporary notes, lightweight information storage |
| Whiteboard Plugin | Maintain shared content that can be repeatedly edited | Group announcement drafts, collaborative records |
| History Rewind | Review or organize historical messages | Tracing context, summarizing discussions |
| Status Plugin | View system or session status | Troubleshooting, confirming operational status |
| Dynamic Import Tool | Let AI supplement Python capabilities on demand | Data processing, web parsing, script tasks |

## Platform-Specific Plugins

Some built-in plugins are only useful in specific platform or adapter scenarios.

| Plugin | Suitable Scenarios |
|---|---|
| Bilibili Live Tool Plugin | Message sending, Live2D expressions, sound effects, and animation control for the Bilibili Live adapter |
| Minecraft Tool Plugin | Minecraft-related server or player interaction scenarios |
| Email Tool Plugin | Email sending and email-related automation tasks |
| Group Honor Plugin | Supports group honor and other group chat information capabilities |

If you are not using the corresponding platform, you can keep these plugins disabled.

## Plugins Requiring Additional Configuration

Some plugins need configuration after being enabled before they can work properly.

Common examples:

| Plugin | What You Need |
|---|---|
| Google Search Tool | Google Search API Key and CX |
| AI Voice Plugin | Voice service address, character, or related service configuration |
| Email Tool Plugin | Email account, authorization code, SMTP/IMAP information, etc. |
| Discipline Officer | Management permissions, managed channels, or mute limits |
| Bilibili Live Tool Plugin | Live adapter-related configuration |

Refer to the Plugin Management page for the specific configuration fields.

## Usage Recommendations

### Keep Core Capabilities Stable

Core plugins like Basic Interaction, Image Viewer, and Status are fundamental to daily use. Unless you clearly understand the impact, it is not recommended to disable them arbitrarily.

### Avoid Enabling Duplicate Capabilities

If multiple plugins can accomplish similar tasks, the AI may have difficulty choosing. It is recommended to keep only one stable, commonly used plugin for each capability.

### Use Caution with High-Privilege Plugins in Production

For plugins involving group management, servers, or external service calls, it is recommended to first confirm the permission scope and usage scenarios before enabling them in production channels.

## Next Steps

- [Plugin Usage Principles](/en/docs/03_advanced/plugin_usage) -- Learn how to select and manage plugins
- [Community Plugins](/en/docs/04_plugins/community_plugins) -- Learn how to choose third-party plugins
- [Plugin Generator](/en/docs/03_advanced/plugin_generator) -- Create plugins using a visual approach
