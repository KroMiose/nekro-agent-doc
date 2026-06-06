---
title: System Configuration Guide
description: Detailed explanation of Nekro Agent system configuration, including basic configuration items, configuration key-value concepts, and necessary model group configuration methods
---

# System Configuration

Nekro Agent provides flexible system configuration options, allowing you to customize system behavior according to your needs. This document will introduce the main system configuration items required to complete basic chat conversation functionality.

## <DocIcon name="settings" /> Accessing Configuration

### Through WebUI Configuration (Recommended)

1. Access WebUI: `http://<your server IP>:8021`
2. After logging in, go to "System Configuration" → "Basic Configuration"

Note:

1. Before modifying configuration items, be sure to hover your mouse over the `!` icon on the configuration item to view the configuration item description (if available). These descriptions often provide very useful instructions for using the configuration item
2. Configuration modifications need to click the "Save" button to take effect

### Through Configuration File Modification

::: warning Note
Unless necessary, it is not recommended to modify system configuration through configuration files. If you need to make modifications, please ensure you fully understand the basic syntax of YAML and have a deep understanding of the meaning of configuration items, otherwise it may cause the system to not run normally
:::

Under the default installation path, the configuration file is located at `~/srv/nekro_agent/configs/nekro-agent.yaml`

Note: After directly modifying the configuration file, you need to use the `/conf-reload` command or restart the NA service to take effect

## <DocIcon name="file" /> Concepts

### Configuration Key

The configuration key is the unique identifier used to identify configuration items in the configuration file, composed of **uppercase English words and underscores**. You can see it below all configuration names in the WebUI's "System Configuration" → "Basic Configuration" page, corresponding one-to-one with the index keys in the configuration file. For example, `ENABLE_NEKRO_CLOUD` is the configuration key used to control whether to enable the NekroAI cloud service function. The following necessary configuration items will be displayed in the form of `<configuration name> - [configuration key]`. You can use `Ctrl + F` to search for the configuration key on the page to quickly locate the corresponding configuration item

### Configuration Value

The configuration value is the value corresponding to the configuration key. You can see it below all configuration names in the WebUI's "System Configuration" → "Basic Configuration" page, corresponding one-to-one with the field values in the configuration file. For example, the configuration value of `ENABLE_NEKRO_CLOUD` is `true`, indicating that the NekroAI cloud service function is enabled

## <DocIcon name="key" /> Necessary Basic Configuration

In the "System Configuration" → "Basic Configuration" page, it is recommended to complete the following important configuration items first to avoid affecting normal use

### Administrator Account - [SUPER_USERS]

The administrator account is used to configure accounts allowed to use system commands. Usually configured as the administrator user's QQ account, multiple accounts can be configured. It should be noted that QQ users configured as administrators can use `QQ account + default password (123456)` to log in to WebUI for management operations. Please be sure to change the password in time after logging in

## <DocIcon name="lock" /> Necessary Model Group Configuration

In the "System Configuration" → "Model Groups" page, please configure at least one available LLM conversation model group, otherwise you will not be able to use it normally

To facilitate users' quick configuration, the system has preset three types of model group configurations for chat, drawing, and embedding from [Nekro Official Relay Station](https://api.nekro.ai). You can directly go to [Nekro Official Relay Station](https://api.nekro.ai) to register an account and create a key to fill in separately to start using (new user registration gives 1 dollar site balance, which can meet some low-frequency, low-cost model usage needs). If you have other official or unofficial OpenAI compatible interface model channels, you can replace the API address yourself to access and use

### More Models

Please go to [Model Selection Guide](/en/docs/03_advanced/model_usage) to view more multi-dimensional tests and recommendations for models