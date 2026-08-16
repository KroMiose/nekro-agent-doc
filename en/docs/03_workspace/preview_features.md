---
title: Version 2.3.3 Features
description: Version 2.3.3 brings the workspace, Claude Code Sandbox, memory system, and MCP management into stable release
---

# Version 2.3.3 Features

`2.3.3` is the first official version of Nekro Agent centered around the workspace.

This version upgrades the AI from a "chat tool" to a "working partner that gets things done": the workspace system gives tasks their own dedicated space, the Claude Code Sandbox gives the AI code execution and file processing capabilities, the memory system gives the AI long-term context, and MCP allows the AI to connect to external tools and data sources.

## Core Capabilities

### Workspace System

Every task has its own dedicated space. Workspaces provide unified management of channels, models, knowledge, memory, and tool configurations.

- Create a workspace and bind one or more channels
- Each workspace independently configures its CC Model Group
- Workspace-level prompts, skills, and environment variable management
- Workspaces do not interfere with each other

→ See [Workspace Overview](/en/docs/03_workspace/overview)

### Claude Code Sandbox

The core execution engine of the workspace. The AI can no longer only chat — it can actually get hands-on.

- Pre-installed with Python 3.13, Node.js 20, Git, GitHub CLI, and a complete development toolchain
- Built-in browser automation (Playwright + Chromium)
- Bidirectional file exchange: upload files to the sandbox; files produced by the sandbox are automatically sent back
- Asynchronous task execution: tasks run in the background and results are automatically pushed on completion
- Supports restart, rebuild, and session reset

→ See [Claude Code Sandbox](/en/docs/03_workspace/claude_code_sandbox)

### Memory System

The AI now has long-term memory and gets to know you better over time.

The memory system automatically organizes project context, member preferences, historical decisions, and task conclusions within the workspace, and references them as needed in subsequent conversations.

- Automatically consolidate long-term context from conversations and tasks
- Automatically recall relevant information in subsequent Q&A
- Important information is more easily retained; information that is no longer relevant gradually decreases in priority
- Supports manual rebuild

→ See [Memory System](/en/docs/03_workspace/memory_system)

### MCP Service Management

Connect external tools and data sources through the MCP protocol, extending the AI's capability boundaries.

- Supports three transport types: stdio, SSE, and HTTP
- Workspace-level configuration; different workspaces use different tools
- Card-based management interface for intuitive operation
- Rich community ecosystem: GitHub, databases, search engines, monitoring systems, and more

→ See [MCP Service Management](/en/docs/03_workspace/mcp_management)

### CC Model Group

An independent CC Model Group configuration separate from the base model group, designed specifically for Claude Code Sandbox scenarios. CC Sandbox task complexity is typically higher than regular conversations, and an independent model configuration allows you to select more suitable models for sandbox tasks.

## Capability Dependencies on CC Sandbox

| Capability | Depends on CC Sandbox | Must Be Bound to Workspace |
|---|---|---|
| Claude Code Sandbox | — | Yes |
| Knowledge Base | No | Yes |
| Memory System | No | Yes |
| MCP Services | Yes | Yes |
| Resource Center | Required for Claude Code usage | Resources need to be mounted to a workspace |
| Timers | No | No |

**You don't need to configure everything at once.** We recommend starting by creating a workspace, first enabling the knowledge base and memory system (no CC Sandbox required), then gradually configuring the CC Sandbox and MCP services.

## Other Improvements

- **Command System Refactor**: Systematic upgrade of command registration, parsing, grouping, permissions, completion, and front-end management
- **Timer Management**: Timer list, status viewing, and management operations
- **WebUI Enhancements**: Chat message styling, SSE real-time push, Agent activity cards, workspace navigation

## Upgrade Recommendations

1. After upgrading from a previous version, create a workspace first and bind a test channel
2. Upload some documents to the knowledge base, enable the memory system, and experience the effects of knowledge and memory
3. Configure the CC Model Group, start the CC Sandbox, and try a task that requires code execution
4. If you need external tools, configure MCP services
5. After verifying everything works in the test channel, migrate to your production channels

## Related Documentation

- [Workspace Overview](/en/docs/03_workspace/overview) — Comprehensive overview of workspace capabilities
- [Quick Start](/en/docs/03_workspace/quickstart) — Create your first workspace in five minutes
- [Claude Code Sandbox](/en/docs/03_workspace/claude_code_sandbox) — Core execution capabilities
- [Knowledge Base](/en/docs/03_workspace/knowledge_base) — Specialized domain knowledge
- [Memory System](/en/docs/03_workspace/memory_system) — Long-term memory
- [MCP Service Management](/en/docs/03_workspace/mcp_management) — External tool connections
