---
title: Dashboard
description: View the operational overview, message trends, and system status of Nekro Agent
---

# Dashboard

The dashboard provides a quick overview of Nekro Agent's current operational status. It is useful for routine inspections, identifying abnormally active channels, observing message trends, and confirming whether the service is running normally.

::: tip Check the Dashboard Before Logs
If the bot suddenly becomes slower, quieter, or shows unusual call volumes, it is recommended to first check the dashboard for overall trends, then dive into the Log Center for details.
:::

## What You Can See

The dashboard typically displays the following information:

| Section | Purpose |
|---|---|
| Overview Cards | View core metrics such as messages, channels, users, and tasks |
| Trend Charts | Observe message volume or API call changes over a period of time |
| Leaderboard Lists | Identify the most active channels, users, or feature entry points |
| Distribution Statistics | Understand the proportion of different message types, adapters, or statuses |
| Real-time Status | Check whether the service is currently online and whether there are any anomalies |

Page layouts may vary slightly across versions. Refer to the actual WebUI display.

## Common Usage Scenarios

### Bot Suddenly Stops Replying

Check in this order:

1. Whether the dashboard still shows incoming messages
2. Whether active channels are concentrated in a few specific channels
3. Whether the trend chart shows a significant drop from a certain point in time
4. Then check the Log Center for error messages during the same time period

If the dashboard shows no new messages, check the adapter connection first. If there are messages but no replies, check the model, quota, and logs.

### Sudden Spike in API Calls

Focus on leaderboards and trends:

- Whether a specific channel has an abnormally high message volume
- Whether a specific user is frequently triggering the bot
- Whether more permissive trigger rules were recently enabled
- Whether new plugins or commands are bringing additional calls

If necessary, use channel management features such as disabling, observation mode, or override configuration to limit the scope.

### Monitoring Status After a Version Update

After updating Nekro Agent, use the dashboard to confirm:

- Whether message trends have returned to normal
- Whether channel and user data display correctly
- Whether there are abnormally high error or failure trends
- Whether features like workspaces, knowledge bases, and plugins are still active

## Data Refresh

Some dashboard data refreshes automatically, and some statistics may be calculated over fixed time windows. If data does not change immediately in the short term, wait a moment or refresh the page.

If the page has not updated for a long time but the bot is still working, check whether the WebUI connection to the backend service is functioning properly.

## Relationship with Other Pages

| What You Want to Do | Where to Go |
|---|---|
| View overall status | Dashboard |
| Check specific errors | [Log Center](/en/docs/03_advanced/logs) |
| Restrict a specific channel | [Channel Management](/en/docs/03_advanced/channel_management) |
| Adjust model and call parameters | [Model Management](/en/docs/03_advanced/model_config) |
| Clean up disk usage | [Space Cleanup](/en/docs/03_advanced/space_cleanup) |

## Related Documentation

- [Log Center](/en/docs/03_advanced/logs)
- [Channel Management](/en/docs/03_advanced/channel_management)
- [Command Center](/en/docs/03_advanced/command_center)
- [Advanced Configuration](/en/docs/02_quick_start/config/advanced)
