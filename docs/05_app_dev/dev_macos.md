---
title: macOS开发部署指南
description: Nekro Agent macOS环境下的开发部署完整指南
---

# macOS 开发环境准备

::: warning 警告
此文档仅用于开发环境，不推荐用于部署或使用。
:::

::: tip 提示
macOS 和 Linux 的开发流程基本相同。本文档仅列出 macOS 特有的安装步骤，其他步骤请参考 [Linux 开发部署指南](./dev_linux.md)。
:::

## macOS 特有准备工作

### 1. 安装 Homebrew

如果尚未安装 Homebrew：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. 安装 Python 3.11

```bash
brew install python@3.11
```

### 3. 安装 UV

```bash
# 使用 Homebrew（推荐）
brew install uv

# 或使用官方安装脚本
curl -LsSf https://astral.sh/uv/install.sh | sh

# 验证安装
uv --version
```

### 4. 安装 OrbStack

macOS 上推荐使用 OrbStack，它比 Docker Desktop 更轻量、性能更好，且完全兼容 Docker。

```bash
brew install --cask orbstack
```

安装完成后启动 OrbStack 应用，它会自动提供 Docker 兼容的命令行工具。

::: tip 为什么选择 OrbStack？
- ⚡ **更快**：启动速度和运行性能显著优于 Docker Desktop
- 💾 **更轻量**：占用更少的系统资源
- 🔧 **开箱即用**：无需 sudo 权限，自动配置完成
- 🐧 **Linux VM 支持**：可创建 Linux 虚拟机用于完全兼容的开发环境
- 🆓 **免费**：个人使用完全免费
:::

## 源码部署

### 快速开始

macOS 的开发流程与 Linux 完全相同，请按照以下步骤操作：

1. **克隆仓库并安装依赖** - 参考 [Linux 指南：源码部署 步骤 1-2](./dev_linux.md#源码部署)
2. **启动开发依赖服务** - 参考 [Linux 指南：步骤 3](./dev_linux.md#_3-启动开发依赖服务)
3. **配置环境变量** - 参考 [Linux 指南：步骤 4](./dev_linux.md#_4-配置环境变量)
4. **拉取沙盒镜像** - 参考 [Linux 指南：步骤 5](./dev_linux.md#_5-拉取沙盒镜像)
5. **运行 Bot** - 参考 [Linux 指南：步骤 6](./dev_linux.md#_6-运行-bot)
6. **OneBot 配置** - 参考 [Linux 指南：步骤 7](./dev_linux.md#_7-onebot-配置)

### 一键复制命令

```bash
# 克隆并进入项目
git clone https://github.com/KroMiose/nekro-agent.git
cd nekro-agent

# 安装依赖
uv sync --all-extras

# 启动开发服务
docker compose -f docker/docker-compose.dev.yml up -d

# 配置环境变量
cp .env.example .env.dev

# 拉取沙盒镜像
docker pull kromiose/nekro-agent-sandbox:latest

# 启动应用
uv run nb run --reload --reload-excludes ext_workdir
```

## 使用 OrbStack 虚拟机开发（替代方案）

如果在 macOS 原生环境中遇到兼容性问题，可以使用 OrbStack 虚拟机：

```bash
# 创建 Ubuntu 虚拟机
orb create ubuntu nekro-dev

# 进入虚拟机
orb -m nekro-dev

# 在虚拟机中按照 Linux 开发指南操作
```

然后在虚拟机中完全按照 [Linux 开发部署指南](./dev_linux.md) 进行操作。

## 前端开发（可选）

### 安装 Node.js

```bash
brew install node@20
```

### 后续步骤

前端开发的其他步骤与 Linux 相同，请参考 [Linux 指南：前端开发](./dev_linux.md#前端开发-可选)。

或使用一键命令：

```bash
cd frontend
npm install -g pnpm
pnpm config set registry https://registry.npmmirror.com
pnpm install --frozen-lockfile
pnpm dev
```

## 调试模式

项目包含 `.vscode/launch.json` 文件，可直接使用 VSCode 调试：

1. 打开项目根目录
2. 按 `F5` 启动调试
3. 观察终端输出

## Docker 镜像说明

请参考 [Linux 指南：Docker 镜像说明](./dev_linux.md#docker-镜像说明)。
