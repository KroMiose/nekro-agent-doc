---
title: NA-Tools 部署 (官方 CLI)
description: 使用官方提供的一键式 CLI 工具 na-tools 在 macOS 或 Linux 上部署和管理 Nekro Agent。
---

# NA-Tools 部署教程

`na-tools` 是官方提供的跨平台自动部署 CLI 工具，支持 **macOS** 和 **Linux** 系统。它提供了从安装、配置到备份、恢复的全生命周期管理功能。

## ✨ 为什么选择 na-tools？

- **跨平台支持**：同时支持 Linux (Ubuntu/Debian 等) 和 macOS。
- **全自动环境检测**：自动检测并引导安装 Docker 环境。
- **便捷配置管理**：无需手动编辑 YAML，通过命令行即可修改模型配置、管理管理员。
- **完善的备份恢复**：一键备份数据和配置，支持交互式恢复。
- **多实例管理**：支持在一台机器上部署多个 Nekro Agent 实例。

## 📦 安装 na-tools

我们推荐使用 [uv](https://docs.astral.sh/uv/) 来管理和安装 `na-tools`。这可以确保工具运行在隔离的环境中，避免污染系统 Python 环境。

### 1. 安装 uv (如果尚未安装)

```bash
# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### 2. 使用 uv 安装 na-tools

```bash
# 使用 uv 将 na-tools 安装为全局工具
uv tool install na-tools
```

> **提示**: 安装完成后，您可以直接在终端输入 `na-tools` 来运行工具。

## 🚀 一键部署

运行以下命令开始安装流程，`na-tools` 将引导您完成 Docker 检测、目录设置和初始配置：

```bash
na-tools install
```

## 💡 常用管理命令

安装完成后，您可以使用以下命令轻松管理您的 Nekro Agent：

| 命令 | 说明 |
|------|------|
| `na-tools status` | 查看当前服务运行状态 |
| `na-tools config model` | **(推荐)** 快捷配置模型 API 信息 |
| `na-tools config admin --add <ID>` | 添加新的管理员 QQ 号 |
| `na-tools update` | 将核心服务及协议端更新到最新版本 |
| `na-tools backup` | 备份当前所有数据和配置文件 |
| `na-tools restore` | 从备份列表中交互式选择并恢复 |
| `na-tools logs` | 查看服务运行日志 |

## 📂 多实例管理

如果您需要部署多个 Nekro Agent 实例：

```bash
# 列出所有已安装的实例及其状态
na-tools list

# 切换到另一个安装目录（或按序号切换）
na-tools use 1
```

## ⚠️ 注意事项

- **macOS 用户**：如果在安装过程中提示未发现 Docker，请按照引导手动安装 [Docker Desktop](https://www.docker.com/products/docker-desktop/)。
- **端口冲突**：默认使用 `8021` (NA) 和 `6099` (NapCat) 端口，如已被占用，请在 `na-tools install` 过程或之后通过 `na-tools config` 修改。
- **权限**：在 Linux 下执行某些 Docker 操作可能需要 `sudo` 或将当前用户加入 `docker` 组。
