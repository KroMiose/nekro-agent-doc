---
title: Nekro Agent 快速开始
description: 帮助您快速开始使用 Nekro Agent 的指南，包括部署选择、基本配置和首次使用的详细步骤
---

# 快速开始

欢迎使用 Nekro Agent `(以下简称 NA)`！本文档将帮助您快速开始使用这个强大的 AI 代理系统。

::: warning <DocIcon name="warning" label="注意" /> 安全警告 <DocIcon name="warning" label="注意" />

本项目运行时允许 AI 在独立 Docker 容器环境中执行任意代码，应用已采用多种包括但不限于容器隔离、权限限定等安全措施，但仍存在一定的安全风险，例如:

1. IP 地址泄漏
2. 容器逃逸
3. 其它未知风险

! 请知悉结果接受自行承担风险后继续，作者不对使用本项目造成的任何损失负责 !
:::

## <DocIcon name="map" /> 全景：从零到第一条对话

下面这张图概括了您需要做的所有事，**前 4 步合在一起大约 30 分钟**就能让 Bot 在您的平台上回出第一句话。

<img src="/assets/quickstart/overview_flow_light.png" alt="Nekro Agent 部署与使用全景：4 步从部署到第一条对话" class="light-only" />
<img src="/assets/quickstart/overview_flow_dark.png" alt="Nekro Agent 部署与使用全景：4 步从部署到第一条对话" class="dark-only" />

## 官方部署选择

根据您的操作系统选择官方推荐的部署方式：

- **Linux / macOS**：[NA-Tools 部署](/docs/02_quick_start/deploy/na-tools.md) — 官方 CLI 工具，支持一键部署、备份、恢复和多实例管理
- **Windows 10/11**：[Windows 启动器部署](/docs/02_quick_start/deploy/windows/na-for-win) — 图形化启动器，基于 WSL2 自动完成部署和管理

旧版脚本、Hyper-V、WSL2 手动部署和完整镜像文档仍会保留用于历史参考，但不再作为新用户推荐入口。

## 社区贡献部署方案

以下方案来自社区贡献，适合有对应环境或偏好时参考使用：

- [1Panel 应用部署](https://github.com/lgc2333/nekro-agent-deploy-1panel) — 社区提供的 1Panel 面板部署方案
- [iStoreOS 系统部署](/docs/community/iStoreOS) — 社区提供的 iStoreOS / OpenWRT 场景部署方案

## 基本配置

成功部署后，您需要完成以下基本配置：

1. **适配器配置**：先连接到您选择的聊天平台，确认 Nekro Agent 能收到测试消息
2. **模型配置**：再设置 AI 模型及 API 密钥，确认模型可以正常回复
3. **系统配置**：最后设置基本系统参数和用户权限

::: warning <DocIcon name="warning" label="注意" /> 重要安全信息 <DocIcon name="warning" label="注意" />
为安全起见，请务必阅读以下信息:

1. 若您同步部署了 napcat ，务必修改默认密码：公网 napcat 必须使用强密码（建议 12 位以上，含数字、字母、符号）
   :::

详细配置说明请参考以下文档：

- [适配器配置](/docs/02_quick_start/adapter_config)
- [系统配置](/docs/02_quick_start/config/system)
- [应用更新](/docs/02_quick_start/config/update)

## 首次使用

### 访问管理界面

完成部署后，您可以通过以下地址访问管理界面：

- `http://<您的服务器IP>:8021` (远程访问)
- `http://localhost:8021` (本地访问)

### 登录管理界面

首次登录时，请使用部署过程中生成的管理员账户和密码进行登录

::: tip 选择您的路径

**最短可用路径（约 1-3 分钟）—— 让机器人能回话**

1. 完成 [适配器配置](/docs/02_quick_start/adapter_config)
2. 完成基础 [模型配置](/docs/03_advanced/model_config)（至少配一个聊天用的模型组并填好 API 密钥）
3. 在您选择的平台跟 Bot 说一句话，确认能收到回复

完成以上 3 步就已经可以用了。**没有配模型组之前，Bot 即使收到消息也不会回复**，这是新手最容易卡住的点。

**进阶路径（Nekro Agent 2.3.3 完整能力）**

跑通最短路径后，再按需阅读：

- [工作区总览](/docs/03_workspace/overview) → [工作区快速上手](/docs/03_workspace/quickstart)：创建第一个工作区
- [Claude Code 沙盒](/docs/03_workspace/claude_code_sandbox)：理解隔离任务环境
- [知识库](/docs/03_workspace/knowledge_base) 与 [记忆系统](/docs/03_workspace/memory_system)：长期资料与长期记忆
:::

## 快速参考

### 常用管理命令

```bash
# 查看 NA 容器日志
sudo docker logs -f nekro_agent

# 查看 NapCat 容器日志
sudo docker logs -f nekro_napcat

# 重启服务
sudo docker restart nekro_agent
```

### 常用聊天指令

```
/na-info - 显示当前应用信息
/na-help - 显示帮助信息
/reset - 重置当前会话
```

::: tip <DocIcon name="lightbulb" /> 功能探索
好奇 Nekro Agent 能做什么？查看 [应用场景展示](/docs/01_intro/application_scenarios) 了解丰富多样的实际使用案例和创意玩法！
:::
