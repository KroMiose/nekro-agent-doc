---
title: Skills Library
description: Manage Claude Code skills so the workspace can automatically acquire specialized capabilities when needed
---

# Skills Library

<p style="font-size: 1.2em;"><strong>Depends on CC Sandbox: Yes</strong></p>

<p style="font-size: 1.2em;"><strong>Must be bound to a workspace: Recommended</strong></p>

The skills library is used to manage skills available to Claude Code. Skills can be understood as a set of operation instructions, scripts, or resources tailored to specific tasks, such as Git workflows, browser automation, data processing, and plugin generation.

When skills are enabled in a workspace, Claude Code can invoke them as needed when processing tasks, reducing repetitive prompts and improving the stability of complex tasks.

::: tip When to Use
If you frequently have the AI complete a certain type of recurring task — such as maintaining repositories, generating plugins, analyzing web pages, or processing resource files — you can organize the corresponding capabilities into skills and add them to the skills library.
:::

## Skill Sources

The skills library typically includes the following sources:

| Source | Description |
|---|---|
| Built-in Skills | Common skills provided with the system, ready to enable directly |
| Local Upload | Import skill packages from local files, suitable for internal team capability consolidation |
| Repository Clone | Sync skills from a Git repository, suitable for continuously updated skill collections |
| Workspace Skills | Bound to a specific workspace, used only in tasks within that workspace |

## Basic Usage Flow

1. Go to WebUI "Workspace" -> "Skills Library"
2. Review existing skills, checking their names, descriptions, and sources
3. Upload, clone, or sync skills as needed
4. Associate skills with the target workspace
5. Use them in Claude Code tasks within the workspace

Once enabled, you don't need to manually copy instructions each time. Claude Code will determine whether to use the corresponding skill based on the task context.

## Uploading Skills

Local upload is suitable for importing already-packaged skills. Before uploading, we recommend checking:

- The skill name is clear and expresses its purpose
- The skill description focuses on task objectives rather than implementation details
- Installation steps don't depend on local private paths
- It does not contain sensitive information such as keys, tokens, or cookies

After uploading, you can view the description in the skill details and sync it to workspaces as needed.

## Cloning Skills from a Repository

If a skill comes from a Git repository, you can clone it using the repository URL. This is suitable for:

- Teams that collectively maintain a set of skills
- Skills that need to stay up to date with upstream changes
- Multiple Nekro Agent instances sharing the same skill set

After cloning, you can sync to get the latest version from the skills library. Before syncing, we recommend confirming that upstream changes are trustworthy to avoid bringing unnecessary instructions or scripts into the workspace.

## Workspace Sync

Skills can be synced to one or more workspaces. Once synced, Claude Code tasks in that workspace can use these skills.

We recommend selecting skills based on workspace responsibilities:

| Workspace Type | Recommended Skills |
|---|---|
| Documentation Project | Document organization, link checking, translation assistance |
| Code Project | Git workflows, testing, code generation, dependency management |
| Operations Project | Log analysis, configuration checking, script execution |
| Content Project | Material processing, web analysis, format conversion |

Don't sync all skills to all workspaces. The more skills available, the more context the AI needs to evaluate, which may actually reduce task focus.

## Auto-Injection

Some skills can be configured for auto-injection. Auto-injection is suitable for very stable, frequently needed foundational capabilities, such as fixed repository collaboration workflows or team conventions.

When using auto-injection, we recommend following these guidelines:

- Only inject skills that are truly needed long-term
- Avoid multiple skills providing conflicting operation requirements
- Keep skill descriptions concise and clear
- Observe a few task runs after updating a skill

If you find that Claude Code is referencing irrelevant skills in tasks, first check whether the auto-injection scope is too broad.

## Usage Tips

- **Consolidate by task**: Don't create skills for the sake of "completeness"; prioritize consolidating high-frequency tasks
- **Quality over quantity**: Only sync truly relevant skills to each workspace
- **Try before rolling out**: Validate new skills in a single workspace first, then sync to more workspaces
- **Clean up regularly**: Skills that are unused for a long time, have outdated descriptions, or depend on broken resources should be removed promptly
- **Mind security**: Do not store account passwords, access tokens, or internal sensitive addresses in skills

## Frequently Asked Questions

### The skill is synced, so why isn't it being used in tasks?

Skills are not mandatory execution items. Claude Code determines whether to use a skill based on the task. If you want more reliable triggering, optimize the skill name and description to make its purpose clearer.

### Can skills be used as plugins?

We don't recommend mixing them. Plugins are runtime capabilities for Nekro Agent, targeting chat, commands, tools, and system integration; skills are task assistance instructions for Claude Code, primarily serving code, file, and automation tasks within workspaces.

### Will deleting a skill affect historical tasks?

After deletion, new tasks can no longer use that skill. Historical task records are typically not affected, but if you continue with similar tasks later, you may need to re-select or sync skills.

## Related Documentation

- [Workspace Overview](/en/docs/03_workspace/overview)
- [Claude Code Sandbox](/en/docs/03_workspace/claude_code_sandbox)
- [MCP Service Management](/en/docs/03_workspace/mcp_management)
- [Plugin Usage Principles](/en/docs/03_advanced/plugin_usage)
