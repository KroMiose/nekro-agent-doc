---
title: Nekro Agent 快速开始
description: 帮助您快速开始使用 Nekro Agent 的指南，包括部署选择、基本配置和首次使用的详细步骤
---

# 快速开始

欢迎使用 Nekro Agent `(以下简称 NA)`！本文档将帮助您快速开始使用这个强大的 AI 代理系统。

::: warning ⚠ 安全警告 ⚠

本项目运行时允许 AI 在独立 Docker 容器环境中执行任意代码，应用已采用多种包括但不限于容器隔离、权限限定等安全措施，但仍存在一定的安全风险，例如:

1. IP 地址泄漏
2. 容器逃逸
3. 其它未知风险

! 请知悉结果接受自行承担风险后继续，作者不对使用本项目造成的任何损失负责 !
:::

## 官方部署选择

根据您的操作系统选择合适的部署方式：

- [Linux 部署教程](/docs/02_quick_start/deploy/linux) - 适用于各类 Linux 发行版
- [Windows 部署教程](/docs/02_quick_start/deploy/windows) - 适用于 Windows 10/11 系统
- [MacOS 部署教程](/docs/02_quick_start/deploy/macos) - 适用于 MacOS 系统

## 社区部署方案

- [Nekro-Agent-Toolkit](/docs/community/nekro-agent-toolkit) 跨平台部署 Cli 工具

  - **跨平台**部署方案和便捷式的**安装、备份、恢复**NekroAgent 的方案。

- [1Panel 应用部署](https://github.com/lgc2333/nekro-agent-deploy-1panel)

  - 基于 **1Panel 面板**的开箱即用一键部署方案，支持纯界面部署操作和 OpenResty 反向代理配置，自动配置 NapCat 协议端。

- [iStoreOS 系统部署](/docs/community/iStoreOS)

  - 在基于 **OpenWRT** 的软路由系统运行 Nekro Agent，提供一键安装脚本。

## 基本配置

成功部署后，您需要完成以下基本配置：

1. **协议端配置**：连接到您选择的聊天平台
2. **模型配置**：设置 AI 模型及 API 密钥
3. **系统配置**：设置基本系统参数和用户权限

::: warning ⚠ 重要安全信息 ⚠
为安全起见，请务必阅读以下信息:

1. 务必修改协议端默认密码：公网 WebUI 必须使用强密码（建议 12 位以上，含数字、字母、符号）
2. 为安全起见，请避免使用默认端口
   :::

详细配置说明请参考以下文档：

- [协议端配置](/docs/02_quick_start/config/protocol)
- [系统配置](/docs/02_quick_start/config/system)
- [应用更新](/docs/02_quick_start/config/update)

## 首次使用

### 访问管理界面

完成部署后，您可以通过以下地址访问管理界面：

- `http://<您的服务器IP>:8021` (远程访问)
- `http://localhost:8021` (本地访问)

### 登录管理界面

首次登录时，请使用部署过程中生成的管理员账户和密码进行登录

### 基本使用流程

1. **连接协议端**：完成协议端配置并确认连接状态
2. **设置人设**：配置 AI 的基本人设和行为模式
3. **测试对话**：通过您选择的平台与 AI 进行对话测试
4. **扩展功能**：按需启用所需的扩展功能

## 下一步

完成基础配置后，您可以探索更多高级功能：

- [模型组配置](/docs/03_advanced/model_config) - 配置多种模型组合

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

::: tip 💡 功能探索
好奇 Nekro Agent 能做什么？查看 [应用场景展示](/docs/01_intro/application_scenarios) 了解丰富多样的实际使用案例和创意玩法！
:::
