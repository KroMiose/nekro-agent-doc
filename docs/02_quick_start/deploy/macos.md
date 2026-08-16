---
title: macOS 部署 Nekro Agent
description: 在macOS系统上部署 Nekro Agent 的完整指南，使用 OrbStack 作为容器管理工具，包含环境准备和两种部署方式的详细步骤
---

# MacOS 部署教程

本文档将指导您在 MacOS 系统上部署 Nekro Agent。

## <DocIcon name="rainbow" /> 环境准备

由于 Nekro Agent 基于 Docker 运行，我们推荐使用 OrbStack 作为 MacOS 上的容器管理工具，并通过其虚拟机功能进行部署。

### 安装 OrbStack

#### 方法一：使用 Homebrew 安装（推荐）

```bash
brew install --cask orbstack
```

#### 方法二：直接下载安装

1. 访问 [OrbStack 官网](https://orbstack.dev/) 下载最新版本
2. 安装完成后启动 OrbStack 应用
3. 确认 OrbStack 正常运行（状态栏应显示 OrbStack 图标）

### 创建并使用 OrbStack 虚拟机

1. 打开 OrbStack 应用
2. 点击"Create Machine"创建一个新的 Linux 虚拟机（推荐选择 Ubuntu）
3. 或使用命令行创建：

```bash
orb create ubuntu my-machine
```

### 在 OrbStack 中使用虚拟机

OrbStack 提供了简单的方式进入虚拟机和执行命令：

- 直接输入 `orb` 命令进入默认虚拟机的终端
- 使用 `orb -m <虚拟机名称>` 进入指定虚拟机
- 使用 `orb <命令>` 在默认虚拟机中执行命令
- 使用 `orb -m <虚拟机名称> <命令>` 在指定虚拟机中执行命令

例如：

```bash
# 进入默认虚拟机
orb

# 进入名为 ubuntu 的虚拟机
orb -m ubuntu

# 在默认虚拟机中执行 ls 命令
orb ls

# 在 ubuntu 虚拟机中执行 ls 命令
orb -m ubuntu ls
```

## <DocIcon name="rocket" /> 部署方式（在 OrbStack 虚拟机中）

进入 OrbStack 虚拟机后，部署过程与在标准 Linux 环境中完全相同。

请参考 [Linux 部署教程](./linux.md) 完成后续的部署和配置。
