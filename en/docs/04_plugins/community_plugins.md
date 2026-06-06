---
title: Community Plugins
description: Community plugins extend Nekro Agent's capabilities. This guide explains how to select, install, and manage community plugins.
---

# Community Plugins

Community plugins are extensions provided by community authors. They enable Nekro Agent to support more platforms, tools, activities, and automation scenarios.

Compared to built-in plugins, community plugins offer richer capabilities but require more attention to source, maintenance status, and permission scope.

## What Can They Do

Common uses of community plugins include:

- Integrating with third-party services
- Adding group chat entertainment features
- Extending data query capabilities
- Connecting to external APIs
- Adding platform-specific capabilities
- Customizing business workflows
- Extending role-playing or interactive experiences

::: warning Security Notice
Community plugins may come from external repositories. Before installing or updating, verify the plugin's source, author documentation, permission scope, and maintenance status.
:::

## Where to Manage Them

Navigate to the "Plugin Management" page in the WebUI to view installed plugins and enable, disable, configure, or update them.

If the system provides a plugin marketplace or repository entry, it is recommended to install from the official recommended source first.

## What to Check Before Installing

Before installing a community plugin, it is recommended to verify:

| Check Item | Recommendation |
|---|---|
| Plugin source | Prefer plugins with a clear source and a trustworthy author |
| Plugin purpose | Confirm it actually solves your needs; avoid installing just to try it out |
| Documentation | Prefer plugins with clear configuration instructions |
| Maintenance status | Prefer plugins that are actively maintained |
| Permission scope | Check whether it accesses external services, sends messages, manages groups, or handles sensitive information |

## Installation Recommendations

It is recommended to install community plugins as follows:

1. Read the plugin documentation first
2. Confirm the plugin is compatible with your current Nekro Agent version
3. Enable it in a test channel after installation
4. Configure the required parameters
5. Send a simple task to verify it works
6. Once stable, deploy to production channels

::: tip Recommendation
In production environments, avoid installing many community plugins at once. Add one plugin at a time, confirm it is stable, then continue adding more.
:::

## Configuring Community Plugins

Different community plugins have different configuration fields. Typically, you need to fill in the following on the Plugin Management page:

- API Key
- Service address
- Account or authorization credentials
- Default toggles
- Channel restrictions
- Permission or administrator settings

If the credentials are unique to that plugin, simply fill them in the plugin configuration. If the same set of accounts, tokens, servers, or database information needs to be reused across multiple workspaces or tasks, consider placing them in the [Resource Center](/en/docs/03_workspace/resource_center) for centralized management.

## Updating Plugins

Before updating a community plugin, it is recommended to verify:

- Whether the update is relevant to your current usage
- Whether configuration fields have changed
- Whether it may affect existing functionality
- Whether you need to back up your configuration first
- Whether it is better to test in a staging channel first

If the current plugin is running stably and the new version only adds features you don't need yet, there is no rush to update.

## When to Disable or Uninstall

It is recommended to disable or uninstall a plugin when:

- It has not been used for a long time
- It duplicates the functionality of another plugin
- It frequently causes errors or disrupts normal conversations
- Its source is unclear
- Maintenance has stopped and compatibility issues exist
- It requires excessive permissions with insufficient benefit

## Frequently Asked Questions

### Is it better to install more plugins?

No. The more plugins installed, the more options the AI has, and the more likely it is to choose the wrong tool. It is recommended to keep only the plugins you truly need.

### Can community plugins go straight to production?

It is not recommended. It is best to enable them in a test channel first, confirm the configuration is correct and behavior is as expected, then deploy to production channels.

### What if a plugin requires credentials?

If the configuration is unique to that plugin, fill it in directly in the plugin settings. If the same credentials will be reused across multiple workspaces or tasks, consider placing them in the Resource Center for centralized management.

## Next Steps

- [Plugin Usage Principles](/en/docs/03_advanced/plugin_usage) -- Learn about plugin selection and management best practices
- [Built-in Plugins](/en/docs/04_plugins/builtin_plugins) -- First, understand the system's built-in capabilities
- [Plugin Generator](/en/docs/03_advanced/plugin_generator) -- Create your own plugins
- [Plugin Development Introduction](/en/docs/04_plugin_dev/00_introduction) -- Learn how to develop plugins
