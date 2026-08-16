---
title: Resource Center
description: The Resource Center is used to centrally manage reusable accounts, tokens, servers, and database connection information, and mount them to workspaces for Claude Code to use
---

# Resource Center

<p style="font-size: 1.2em;"><strong>Depends on CC Sandbox: Managing resources does not depend on it; using resources with Claude Code does</strong></p>

<p style="font-size: 1.2em;"><strong>Must be bound to a workspace: Resources need to be mounted to a workspace for use</strong></p>

The Resource Center is used to centrally manage external resources that workspaces need, such as server login credentials, database connections, GitHub credentials, and third-party API tokens.

When you mount a resource to a workspace, the Claude Code instance in that workspace can use these resources when executing tasks. You don't need to resend accounts, passwords, connection addresses, or tokens each time.

## What You Can Do

The Resource Center is suitable for managing:

- Server SSH connection information
- PostgreSQL, MySQL, Redis, and other database connection information
- GitHub CLI credentials
- Third-party service API tokens
- Common backend system account credentials
- Connection configurations that need to be reused across multiple workspaces

::: tip When to Use the Resource Center
If a set of information will be used repeatedly by multiple workspaces, or contains multiple fields — such as host, port, username, and password — it's suitable for centralized management in the Resource Center.
:::

::: warning Notice
The Resource Center can store sensitive credentials. Only enter information you have confirmed can be entrusted to the corresponding workspace, and avoid mounting high-privilege credentials to workspaces that don't need them.
:::

## Entry Points

The Resource Center has two entry points:

| Entry Point | Purpose |
|---|---|
| Left menu "Workspace" → "Resource Center" | Create, edit, and delete global resources |
| Workspace detail page "Resource Mount" tab | Mount or unmount resources for the current workspace |

After creating a resource in the "Resource Center", it only enters the resource library. Resources are only available to Claude Code in a workspace after being mounted to that workspace.

## Creating a Resource

Go to "Workspace" → "Resource Center" and click "New Resource".

You can either fill in the resource directly or start from an initialization template.

When creating a resource, you primarily fill in the following:

| Configuration | How to Fill In |
|---|---|
| Resource Name | Clearly describe what this resource is, e.g., `Production Server SSH`, `GitHub Bot Account` |
| Resource Tags | Comma-separated, e.g., `ssh, deploy, github`, for easy searching and categorization |
| Resource Notes | Description for administrators, e.g., purpose, associated project, applicable scope |
| Resource Prompt | Tell Claude Code when it can use this resource and what to watch out for |
| Field Configuration | Fill in actual connection information or credentials, e.g., host, port, username, password, token |

We recommend writing resource prompts clearly, for example:

- "For viewing deployment logs and performing read-only inspections"
- "Only for querying database status; do not modify or delete data unless explicitly requested"
- "For GitHub PR, Issue, and Actions troubleshooting"

## Using Initialization Templates

When creating a new resource, you can click "Select Template" to quickly apply common resource configurations.

Currently available templates include:

- SSH Key Connection
- SSH Password Connection
- Root Password Connection
- PostgreSQL Connection
- MySQL Connection
- Redis Connection
- GitHub CLI Credentials
- Generic Token Credentials
- Account/Password Credentials

Templates automatically populate common fields, tags, and prompts. You can still modify them after applying.

## Configuring Fields

Each resource consists of one or more fields. Fields are the specific pieces of information that the resource needs to store.

Common field examples:

| Resource Type | Common Fields |
|---|---|
| SSH Connection | Host address, port, username, password or private key |
| Database Connection | Host address, port, database name, username, password |
| GitHub Credentials | Access token, account name |
| API Token | Access token, service URL |
| Account/Password | Account, password, login URL |

### Field Types

Field types help you organize resource content. Common types include:

- Text
- Password/Token
- Host Address
- Port
- Private Key
- Username
- Database Name
- JSON

### Sensitive Information

We recommend enabling "Sensitive Information" for password, token, and private key fields.

Content recommended to mark as sensitive:

- Login passwords
- API tokens
- SSH private keys
- Database passwords
- Cookies or session credentials

### Compatible Environment Variable Names

Some tools read variables with fixed names by default. You can fill in these names under "Compatible Environment Variable Names" to make it easier for Claude Code to use the corresponding tools.

Common examples:

| Scenario | Compatible Variable Names to Fill In |
|---|---|
| GitHub CLI | `GH_TOKEN`, `GITHUB_TOKEN` |
| Custom API Token | Fill in according to your tool's requirements, e.g., `API_TOKEN` |

::: warning Avoid Duplicates
Within the same workspace, do not let multiple resources use the same compatible environment variable name. If conflicts exist during mounting, the system will prompt you to resolve them.
:::

## Mounting Resources to a Workspace

After creating a resource, you need to mount it to a workspace to use it.

Steps:

1. Go to the target workspace detail page
2. Open the "Resource Mount" tab
3. Find the desired resource in the resource library
4. Click "Mount"

Once mounted, you can delegate tasks in the channel bound to that workspace, for example:

- "Use the server resource to check recent deployment logs"
- "Use the GitHub credentials to check the Actions failure in this repository"
- "Connect to the database and show me the order statistics for the last 24 hours"

## Managing Mounted Resources

In the workspace "Resource Mount" page, you can:

- View resources currently mounted to the workspace
- Unmount resources from the workspace
- Drag to reorder resources
- View resource tags
- See which workspaces reference the resource

Unmounting a resource only revokes the current workspace's access; it does not delete the resource itself.

## Deleting a Resource

Resources can be deleted from the global "Resource Center".

If a resource is currently mounted to a workspace, the system will list the affected workspaces before deletion. After confirming deletion, those mount relationships will also be removed.

::: danger Deletion Is Permanent
Deleting a resource cannot be undone. After deletion, workspace tasks that depend on that resource may no longer be able to access the corresponding server, database, or external service.
:::

## Common Configuration Examples

### GitHub CLI Credentials

Suitable for letting Claude Code view PRs, Issues, Actions, or assist with GitHub repository tasks.

Configuration tips:

1. Create a new resource and select the "GitHub CLI Credentials" template
2. Fill in the access token
3. Confirm that the token field has "Sensitive Information" enabled
4. Keep the compatible variable names `GH_TOKEN`, `GITHUB_TOKEN`
5. Mount to workspaces that need to operate on GitHub

### Server SSH Connection

Suitable for deployment checks, log investigation, server inspections, and similar tasks.

Configuration tips:

1. Create a new resource and select the SSH Key Connection or SSH Password Connection template
2. Fill in the host address, port, username, and authentication information
3. Mark passwords, private keys, and passphrases as sensitive information
4. Specify allowed operations in the resource prompt
5. Mount to operations or project workspaces

### Database Connection

Suitable for querying data, checking connection status, exporting schema information, and similar tasks.

Configuration tips:

1. Create a new resource and select the PostgreSQL, MySQL, or Redis template
2. Fill in the host address, port, database name, username, and password
3. Mark passwords as sensitive information
4. Specify read-only by default in the resource prompt
5. Mount to data analysis or operations workspaces

## Difference from Workspace Environment Variables

The workspace configuration page can also set environment variables directly, but the Resource Center is better suited for managing a set of reusable information.

| Capability | Suitable Scenario |
|---|---|
| Workspace Environment Variables | Simple configuration that belongs only to the current workspace |
| Resource Center | Reusable, categorizable resources with multiple fields that need to be mounted to multiple workspaces |

If it's just one or two simple variables unique to a single workspace, you can put them in workspace environment variables.

If it's reusable resources like servers, databases, accounts, or tokens, we recommend using the Resource Center.

## Next Steps

- [Workspace Overview](/en/docs/03_workspace/overview) — Learn about workspace capability components
- [Claude Code Sandbox](/en/docs/03_workspace/claude_code_sandbox) — Learn how Claude Code executes tasks in a workspace
- [MCP Service Management](/en/docs/03_workspace/mcp_management) — Connect external tools and services
- [Workspace Timers](/en/docs/03_workspace/timers) — Combine with resources for automated inspections
