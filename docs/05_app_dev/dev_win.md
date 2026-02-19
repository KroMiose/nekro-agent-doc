---
title: Windows开发部署指南
description: Nekro Agent Windows环境下的开发部署完整指南
---

# Windows 开发环境准备

::: warning 警告
此文档仅用于开发环境，不推荐用于部署或使用。
:::

::: tip 提示
Windows 和 Linux 的开发流程基本相同。本文档仅列出 Windows 特有的安装步骤，其他步骤请参考 [Linux 开发部署指南](./dev_linux.md)。
:::

## Windows 特有准备工作

### 1. 安装 Python 3.11

访问 [Python 官网](https://www.python.org/downloads/windows/) 下载并安装 Python 3.11：

1. 下载 Windows installer (64-bit)
2. 安装时**务必勾选** "Add Python to PATH"
3. 选择 "Install Now"

### 2. 安装 UV

在 PowerShell 中执行：

```powershell
# Windows
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# 验证安装
uv --version
```

### 3. 安装 Docker Desktop

1. 访问 [Docker Desktop 官网](https://www.docker.com/products/docker-desktop/)
2. 下载 Windows 版本
3. 安装并启动 Docker Desktop
4. 确认 Docker 服务正常运行：`docker info`

::: tip 关于权限
Windows 用户通常不需要管理员权限运行开发服务器。Docker Desktop 会自动配置权限。

**如果遇到权限问题：**

1. **以管理员身份运行 PowerShell**
   - 右键点击 PowerShell 图标
   - 选择"以管理员身份运行"

2. **确保 Docker Desktop 正常运行**
   - Docker Desktop 需要在后台运行
   - 首次启动可能需要管理员权限

3. **使用 WSL2（推荐）**
   ```powershell
   # 安装 WSL2
   wsl --install
   
   # 在 WSL2 中开发，参考 Linux 开发文档
   ```
:::

## 源码部署

### 快速开始

Windows 的开发流程与 Linux 基本相同，主要区别在于命令行工具（使用 PowerShell）。请按照以下步骤操作：

1. **克隆仓库并安装依赖** - 参考 [Linux 指南：源码部署 步骤 1-2](./dev_linux.md#源码部署)
2. **启动开发依赖服务** - 参考 [Linux 指南：步骤 3](./dev_linux.md#_3-启动开发依赖服务)
3. **配置环境变量** - 参考下方 Windows 特定命令
4. **拉取沙盒镜像** - 参考 [Linux 指南：步骤 5](./dev_linux.md#_5-拉取沙盒镜像)
5. **运行 Bot** - 参考 [Linux 指南：步骤 6](./dev_linux.md#_6-运行-bot)
6. **OneBot 配置** - 参考 [Linux 指南：步骤 7](./dev_linux.md#_7-onebot-配置)

### Windows 特定命令

#### 配置环境变量（步骤 3）

```powershell
# 复制配置模板（已预配置连接开发服务）
copy .env.example .env.dev

# 根据需要修改配置（可选）
notepad .env.dev
```

### 一键复制命令（PowerShell）

```powershell
# 克隆并进入项目
git clone https://github.com/KroMiose/nekro-agent.git
cd nekro-agent

# 安装依赖
uv sync --all-extras

# 启动开发服务
docker compose -f docker/docker-compose.dev.yml up -d

# 配置环境变量
copy .env.example .env.dev

# 拉取沙盒镜像
docker pull kromiose/nekro-agent-sandbox:latest

# 启动应用
uv run nb run --reload --reload-excludes ext_workdir
```

## 使用 WSL2 开发（推荐）

WSL2 提供了更好的兼容性和性能，强烈推荐 Windows 用户使用：

### 1. 安装 WSL2

```powershell
# 在 PowerShell（管理员）中执行
wsl --install

# 重启电脑后，设置 Ubuntu 用户名和密码
```

### 2. 在 WSL2 中开发

```bash
# 进入 WSL2
wsl

# 完全按照 Linux 开发指南操作
```

然后在 WSL2 中完全按照 [Linux 开发部署指南](./dev_linux.md) 进行操作。

::: tip WSL2 优势
- 完全的 Linux 兼容性
- 更好的性能
- 更简单的依赖管理
- 避免 Windows 路径和权限问题
:::

## 前端开发（可选）

### 安装 Node.js

1. 访问 [Node.js 官网](https://nodejs.org/)
2. 下载并安装 LTS 版本（推荐 20.x）

### 后续步骤

前端开发的其他步骤与 Linux 相同，请参考 [Linux 指南：前端开发](./dev_linux.md#前端开发-可选)。

或使用一键命令（PowerShell）：

```powershell
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

## 常见问题

### Docker Desktop 无法启动

1. 确保已启用 Hyper-V 或 WSL2
2. 检查 BIOS 中是否启用了虚拟化
3. 以管理员身份运行 Docker Desktop

### 路径问题

Windows 使用反斜杠 `\`，但在 Git Bash 或 WSL2 中使用正斜杠 `/`。建议使用 WSL2 开发以避免路径问题。

### 权限问题

如果遇到权限错误，尝试：
1. 以管理员身份运行 PowerShell
2. 或使用 WSL2（推荐）

## Docker 镜像说明

请参考 [Linux 指南：Docker 镜像说明](./dev_linux.md#docker-镜像说明)。
