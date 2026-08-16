---
title: Space Cleanup
description: Scan and clean up caches, logs, and temporary files generated during Nekro Agent operation
---

# Space Cleanup

Space Cleanup is used to view Nekro Agent's disk usage and clean up caches, logs, or temporary files generated during operation. It is useful when disk space is insufficient, log files are too large, or sandbox task remnants have accumulated.

::: danger Confirm Scope Before Cleaning
Space Cleanup will delete files. Before executing, carefully review the page prompts and item descriptions. Do not accidentally remove important data as cache.
:::

## When to Clean Up

| Symptom | Recommended Action |
|---|---|
| Server disk space is running low | Scan usage first, then clean by category |
| Log files are too large | Clean old logs or lower the log level |
| Temporary files have accumulated over time | Clean cache and temporary directories |
| Sandbox tasks were interrupted abnormally | Check for leftover working directories |
| Upload or knowledge base processing failed | Confirm whether the disk has enough space |

## Basic Workflow

1. Navigate to the Space Cleanup page in the WebUI
2. Run a disk scan to view the usage of various file types
3. Expand specific items to confirm the cleanup scope
4. Select only the items you are sure are no longer needed
5. Run the cleanup and scan again to confirm the results

If you are unsure whether a certain item can be deleted, it is recommended to keep it, or only clean items explicitly marked as cache, temporary files, or old logs.

## Common Cleanable Content

| Type | Description |
|---|---|
| Old Logs | Historical operational logs, typically used for troubleshooting |
| Temporary Files | Content generated during upload, conversion, or processing tasks |
| Cache Files | Intermediate data that can be regenerated |
| Sandbox Remnants | Working directories or task files not automatically cleaned after abnormal exits |

The actual cleanable items on the page may vary depending on the deployment method and version. Refer to the WebUI display.

## Content Not Recommended for Casual Cleanup

The following items should generally not be deleted through the Space Cleanup page:

- Database files
- User-uploaded resources that are still in use
- Knowledge base original documents
- Workspace project files
- Plugin data and configurations
- `.env` files, keys, certificates, and other deployment configurations

If disk pressure is significant, it is also recommended to back up these long-term data before processing them.

## Notes Before Cleaning Logs

Logs are an important basis for troubleshooting. Before cleaning, confirm:

- Whether there are any unresolved recent issues
- Whether you need to download logs for feedback first
- Whether a higher-than-necessary log level is enabled

If logs are growing too quickly, check `APP_LOG_LEVEL` in the "System Configuration" page. After troubleshooting, avoid keeping it set to `DEBUG` long-term.

## Difference from System-Level Cleanup

The Space Cleanup page only targets content related to Nekro Agent's operation and is suitable for routine maintenance. It does not replace system-level maintenance, such as:

- Docker image and container cleanup
- System log cleanup
- Database backup and compression
- Server disk expansion

If using Docker deployment, the disk usage of images, containers, and volumes still needs to be checked separately on the host machine.

## Related Documentation

- [Log Center](/en/docs/03_advanced/logs)
- [Dashboard](/en/docs/03_advanced/dashboard)
- [Advanced Configuration](/en/docs/02_quick_start/config/advanced)
- [FAQ](/en/docs/06_troubleshooting/faq)
