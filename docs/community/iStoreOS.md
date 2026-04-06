---
title: iStoreOS 部署 Nekro Agent
description: 在 iStoreOS 软路由系统上部署 Nekro Agent。iStoreOS 基于 OpenWRT，使用 ash shell 环境，我们提供专门适配的安装脚本。
---


# iStoreOS 部署 Nekro Agent

在 iStoreOS 软路由系统上部署 Nekro Agent。iStoreOS 基于 OpenWRT，使用 ash shell 环境，我们提供专门适配的安装脚本。


## 📋 前置要求

在开始部署前，请确保您的 iStoreOS 系统满足以下条件：

- **Docker 环境**：iStoreOS Docker 已迁移根目录
- **存储空间**：Docker 根目录至少有 10GB 可用空间
- **网络连接**：能够正常访问 GitHub 和 Docker.io

## 🚀 部署方式

### 一键部署

一键部署 Nekro Agent 核心服务及 Napcat 协议端，提供完整的机器人解决方案。

::: warning 安全警告
1. **务必修改 NapCat 默认密码**：公网 WebUI 必须使用强密码（建议12位以上，含数字、字母、符号）
2. **务必使用 Token 验证**：OneBot 服务务必设置有效 Token，避免空 Token 或弱口令
3. **为安全起见，请避免使用默认端口**
:::

#### 部署命令

```bash
# bin/ash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/refs/heads/main/docker/wrtinstall.sh)" - --with-napcat
```

部署完成后，请参考[OneBot V11 / NapCat 配置](/docs/02_quick_start/adapters/onebot_v11)文档完成后续配置。


## ⚙️ 安装过程详解

### 1. 环境检测

安装脚本会自动执行以下检查：

- **Docker 环境**：验证 Docker 是否已安装并运行
- **Docker Compose**：自动安装或使用现有版本
- **存储空间**：检查 Docker 根目录是否有足够空间

### 2. 目录配置

- **默认目录**：`~/srv/nekro_agent`
- **自定义目录**：手动编辑`.env`文件

### 3. 自动配置

脚本会自动完成以下配置：

- **生成安全凭证**：自动创建随机的访问令牌和管理员密码
- **下载配置文件**：从仓库获取最新的 docker-compose 配置
- **拉取服务镜像**：下载所需的 Docker 镜像

### 4. 防火墙配置

安装脚本会自动配置 OpenWRT 防火墙，放行以下端口：

- **Nekro Agent 主服务**：`8021/tcp`（可在 .env 中自定义）
- **Napcat 服务**：`6099/tcp`（可在 .env 中自定义）

## ⚙️ 部署后配置

- **标准部署**: 前往[OneBot V11 / NapCat 配置](/docs/02_quick_start/adapters/onebot_v11)文档，根据文档说明完成配置。
- **核心部署**: 前往[OneBot V11 / NapCat 配置](/docs/02_quick_start/adapters/onebot_v11)文档，参考说明继续配置。

## 🚀 应用更新

iStoreOS 环境请使用以下命令更新应用

### 进入数据目录

```bash
# 如果修改了数据目录，请根据实际情况设置
export NEKRO_DATA_DIR=${HOME}/srv/nekro_agent && \
cd ${NEKRO_DATA_DIR}
```

### 仅更新 Nekro Agent 和沙盒镜像 (推荐)

```bash
 docker pull kromiose/nekro-agent-sandbox && \
 docker-compose --env-file .env pull nekro_agent && \
 docker-compose --env-file .env up --build -d nekro_agent
```

### 更新所有镜像并重启容器 (如果需要同时更新 NapCat 或其他数据支持服务)

> 该命令会更新 `nekro-agent` 镜像和所有依赖的镜像，可能导致 Bot 掉线需要重新登录

```bash
 docker-compose --env-file .env pull && \
 docker-compose --env-file .env up --build -d
```

## 📝 更新日志

每次更新后，可以在 [GitHub Releases](https://github.com/KroMiose/nekro-agent/releases) 查看更新日志了解变更内容




