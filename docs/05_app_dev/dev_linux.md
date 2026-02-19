---
title: Linux开发部署指南
description: Nekro Agent Linux环境下的开发部署完整指南
---

# Linux 开发环境准备

::: warning 警告
此文档仅用于开发环境，不推荐用于部署或使用。
:::

## 准备工作

开发环境要求：

- 一个可用的 Postgresql 数据库
- 安装 Python 环境 (推荐 Python 3.11)
- 安装 `uv` (Python 包管理器)
- Docker & Docker Compose

### 安装 UV 和 poe

```bash
# Linux/macOS
curl -LsSf https://astral.sh/uv/install.sh | sh

# 验证安装
uv --version

# 安装 poe
uv tool install poethepoet

# 验证安装
poe --version
```

::: tip 关于 sudo 权限
由于项目需要调用 Docker，部分开发场景可能需要 sudo 权限。为确保 `uv` 和 `poe` 在 sudo 下可用：

**安装 UV 和 poe 到系统路径**

```bash
# 安装 UV 到系统路径
sudo cp ~/.local/bin/uv /usr/local/bin/
sudo cp ~/.local/bin/uvx /usr/local/bin/
sudo chmod +x /usr/local/bin/uv /usr/local/bin/uvx

# 安装 poe 到系统路径
sudo cp ~/.local/share/uv/tools/poethepoet/bin/poe /usr/local/bin/
sudo chmod +x /usr/local/bin/poe

# 在新终端中验证使用 sudo 执行命令
sudo uv --version
sudo poe --help
```

**使用 sudo 运行开发服务器：**

```bash
sudo -E uv run poe dev
# 或
sudo -E poe dev
```

`-E` 参数保留当前用户的环境变量。
:::

## 源码部署

### 1. 克隆仓库

```bash
git clone https://github.com/KroMiose/nekro-agent.git
```

### 2. 安装依赖

```bash
cd nekro-agent

# 使用 UV 安装依赖 (包括开发依赖)
uv sync --all-extras
```

### 3. 启动开发依赖服务

为了确保开发环境的 PostgreSQL 数据库拥有合适的权限写入配置，需要先创建数据目录并设置权限：

```bash
mkdir -p data/dev_postgres_data
sudo chown -R 999:999 data/dev_postgres_data
```

启动开发所需的 PostgreSQL、Qdrant 等依赖服务：

```bash
# 启动开发服务编排 (PostgreSQL + Qdrant + NapCat)
docker compose -f docker/docker-compose.dev.yml up -d
```

::: tip 服务端口说明
开发环境服务端口映射：
- PostgreSQL: `5433` (避免与本地默认 5432 冲突)
- Qdrant: `6334` (避免与生产环境默认 6333 冲突)
- NapCat: `6199` (避免与默认 6099 冲突)
:::

### 4. 配置环境变量

复制环境变量配置模板并根据需要修改：

```bash
# 复制配置模板（已预配置连接开发服务）
cp .env.example .env.dev

# 根据需要修改配置（可选）
vim .env.dev
```

::: info 配置说明
`.env.example` 已预配置好开发环境的默认值，包括：

- 数据库连接信息（连接到上一步启动的开发服务）
- Qdrant 向量数据库配置
- 开发环境预设的安全密钥

大多数情况下无需修改即可直接使用。如需自定义配置，请参考 [config.py](https://github.com/KroMiose/nekro-agent/blob/main/nekro_agent/core/config.py)
:::

### 5. 拉取沙盒镜像

拉取用于沙盒环境的 Docker 镜像：

```bash
# 拉取稳定版本
sudo docker pull kromiose/nekro-agent-sandbox:latest

# 或拉取预览版本（包含最新功能）
sudo docker pull kromiose/nekro-agent-sandbox:preview
```

如果需要修改镜像中的依赖包，可修改 `sandbox/dockerfile` 和 `sandbox/pyproject.toml` 文件，然后使用 `sudo bash sandbox.sh --build` 重新构建镜像

### 6. 运行 Bot

::: warning 注意
由于插件工作时需要动态使用 Docker 创建沙盒执行环境以及设定容器共享目录权限等，建议将当前用户添加到 `docker` 组中，并重启 shell 以生效

```bash
sudo usermod -aG docker $USER
```

:::

```bash
# 正常启动
uv run nb run

# 开发调试模式下启用重载监视并排除动态扩展目录
uv run nb run --reload --reload-excludes ext_workdir
```

### 7. OneBot 配置

使用任意 OneBot 协议客户端登录机器人并使用反向 WebSocket 连接方式，配置好连接地址：

```
ws://127.0.0.1:8021/onebot/v11/ws
```

::: tip
这里的端口可在 `.env.prod` 中配置，默认为 `8021`
:::

### 8. 调试模式

项目中包含 `.vscode/launch.json` 文件，可以直接使用 VSCode 进行调试，使用其内置的调试启动配置即可。

## 前端开发（可选）

如需开发前端页面，可按以下步骤进行：

### 1. 安装 Node.js

推荐使用 `nvm` (Node Version Manager) 来管理 Node.js 版本。

1.  安装 `nvm`:
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    ```
2.  安装完成后，根据提示将 `nvm` 的加载命令添加到你的 shell 配置文件中 (例如 `~/.bashrc`, `~/.zshrc`) 并重启终端。
3.  安装 Node.js 20:
    ```bash
    nvm install 20
    nvm use 20
    ```
    你也可以通过系统的包管理器安装，但请确保版本是 20.x。

### 2. 配置 pnpm

```bash
# 全局安装 pnpm
npm install -g pnpm

# 设置镜像加速
pnpm config set registry https://registry.npmmirror.com
```

### 3. 安装前端依赖

```bash
cd frontend

# 安装依赖
pnpm install --frozen-lockfile
```

### 4. 启动前端

```bash
cd ./frontend
pnpm dev
```

当看到如下日志时，即可在浏览器访问：

```
VITE vx.x.x  ready in xxx ms

➜  Local:   http://localhost:xxxx/ <-这里是端口号
➜  Network: use --host to expose
➜  press h + enter to show help
```

## Docker 镜像说明

Nekro Agent 提供两种 Docker 镜像标签：

- **latest**: 稳定版本，适用于生产环境
- **preview**: 预览版本，包含最新功能，适用于测试和开发

```bash
# 使用稳定版本（推荐）
docker pull kromiose/nekro-agent:latest

# 使用预览版本（体验最新功能）
docker pull kromiose/nekro-agent:preview
```
