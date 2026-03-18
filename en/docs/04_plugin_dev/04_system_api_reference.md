---
title: System API Reference
description: Core system service API reference available in Nekro Agent plugin development, including message, context, timer, core tools, and plugin and database model APIs.
---

# System API Reference

Nekro Agent provides a series of core system service APIs for plugin developers, enabling deep integration between plugins and Agent's core functionality. These APIs are typically accessed through modules in the `nekro_agent.api` package.

This reference will outline the main API modules and their common functions. For more detailed parameters, return values, and specific usage, please directly consult the Nekro Agent source code or use the IDE's intelligent prompt feature.

## 1. Core Services (`nekro_agent.api.core`)

The `core` module provides some basic and core tools and services.

*   **Logging**
    *   **Recommended**: Use the plugin instance’s **`plugin.logger`**. It is automatically tagged with `plugin_key` so logs can be filtered by plugin in the WebUI Logs page. Use it like a standard logger, e.g. `plugin.logger.info("Plugin started")`, `plugin.logger.error("Operation failed", exc_info=True)`.
    *   **Alternative**: `core.logger` provides global logging with levels `debug`, `info`, `warning`, `error`, `success`, `critical`. Use it when the plugin instance is not available or in non-plugin code.
    *   Prefer `plugin.logger` inside plugins for run status and key events so you can filter and debug by plugin.

*   **Qdrant Vector Database Client**
    *   `core.get_qdrant_client() -> Optional[QdrantClient]` (async): Get the global Qdrant client instance.
    *   `core.get_qdrant_config() -> Optional[dict]` (async): Get Qdrant connection configuration.
    *   See the [Using Vector Database](/en/docs/04_plugin_dev/03_advanced_features/3.3_vector_database.md) chapter for details.

*   **Global Configuration Access (`core.config`)**
    *   Can directly access Nekro Agent's global configuration items (defined in the Agent main configuration file).
    *   Example: `api_base = core.config.NEKRO_API_BASE` (assuming the configuration item exists)
    *   Plugins should prioritize using their own configuration system (`plugin.config`), and only use `core.config` when they truly need to access Agent's global configuration.

## 2. Message Service (`nekro_agent.api.message`)

The `message` module is responsible for handling message sending.

*   **Send Text Message (`message.send_text`)**
    *   `message.send_text(chat_key: str, text: str, ctx: AgentCtx)` (async)
    *   Send a plain text message to the specified `chat_key` (session identifier).
    *   `ctx` is required and provides sending context.

*   **Send Image Message (`message.send_image`)**
    *   `message.send_image(chat_key: str, image_path: str, ctx: AgentCtx)` (async)
    *   `image_path` can be an image URL (str) or local file path (str).
    *   `ctx` is required and provides sending context.

*   **Send File Message (`message.send_file`)**
    *   `message.send_file(chat_key: str, file_path: str, ctx: AgentCtx)` (async)
    *   Send a file. The `file_path` parameter is the same as above.
    *   `ctx` is required and provides sending context.

## 3. Timer Service (`nekro_agent.api.timer`)

The `timer` module provides one-shot and temporary timers; recurring (cron) jobs and workday modes are provided by the built-in **Timer** plugin.

*   **One-shot timer (`timer.set_timer`)**
    *   `timer.set_timer(chat_key: str, trigger_time: int, event_desc: str) -> bool` (async)
    *   Fires at the given timestamp. One-shot and temporary timers are persisted to the data directory and restored after restart.
*   **Temporary timer (`timer.set_temp_timer`)**
    *   `timer.set_temp_timer(chat_key: str, trigger_time: int, event_desc: str) -> bool` (async)
    *   Only the latest temporary timer per chat is kept; suitable for short self-wakeup.
*   **Clear timers (`timer.clear_timers`)**
    *   `timer.clear_timers(chat_key: str, temporary: Optional[bool] = None) -> bool` (async)
    *   When `temporary` is `None`, clears all; when `True`/`False`, clears only temporary or non-temporary.

**Recurring jobs and workday mode**: The built-in Timer plugin provides persistent cron jobs (e.g. `create_recurring_timer`, `list_recurring_timers`) and `workday_mode`: `none` (cron only), `mon_fri` (weekdays), `weekend` (weekends only), `cn_workday` (China statutory workdays, including in-lieu workdays), `cn_restday` (China rest days). China workday/restday support is **enabled by default**; no extra configuration is required.

This API reference provides an overview. It is strongly recommended that plugin developers combine source code, IDE tools, and specific example plugins in actual development to deeply understand and use these APIs.