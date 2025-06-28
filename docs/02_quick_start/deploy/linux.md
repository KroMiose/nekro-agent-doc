---
title: Linux 部署 Nekro Agent
description: 在 Linux 环境下部署 Nekro Agent 的完整指南，包括标准部署和核心部署两种方式的详细步骤。
---

# Linux 部署教程

本文档将指导您在 Linux 系统上部署 Nekro Agent。我们的安装脚本提供了两种部署模式，请根据您的需求选择。

## 🚀 方式一：标准部署（推荐）

此模式将一键部署 Nekro Agent 核心服务及 Napcat 协议端，是为大多数用户推荐的完整解决方案。

### 部署命令

```bash
# 从 Github (推荐)
sudo -E bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/install.sh)" - --with-napcat
```

如果从 Github 下载脚本遇到网络问题，您可以使用国内的 GitCode 镜像源：

```bash
# 从 GitCode (国内加速)
sudo -E bash -c "$(curl -fsSL https://raw.gitcode.com/gh_mirrors/ne/nekro-agent/raw/main/docker/install.sh)" - --with-napcat
```

> **提示**:
> - 上述命令中的 `--with-napcat` 参数会启动全自动标准部署。
> - 如果不加此参数，脚本会以交互模式启动，届时请选择 `Y` 以安装 Napcat。

部署完成后，请参考[协议端配置-Napcat](/docs/02_quick_start/config/protocol.html#napcat-集成部署-推荐)文档完成后续配置。

## 🚀 方式二：核心部署

此模式仅部署 Nekro Agent 核心服务，适用于需要使用其它适配器平台或自行配置 OneBot V11 协议端的高级用户。

### 部署命令

运行以下命令，并在脚本询问时选择不安装 Napcat 服务。

```bash
# 从 Github (推荐)
sudo -E bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/install.sh)"
```

```bash
# 从 GitCode (国内加速)
sudo -E bash -c "$(curl -fsSL https://raw.gitcode.com/gh_mirrors/ne/nekro-agent/raw/main/docker/install.sh)"
```

当脚本询问时，输入 `n`:

```text
是否同时使用 napcat 服务？[Y/n] n
```

部署完成后，Nekro Agent 将会监听以下地址，请将您的 OneBot V11 协议端连接至此：

`ws://<你的服务ip>:8021/onebot/v11/ws`

## 📝 注意事项

- **安装目录**:
  - 默认安装在 `~/srv/nekro_agent`。
  - 如需自定义，请在 **执行脚本前** 设置环境变量: `export NEKRO_DATA_DIR=<你的目录>`

- **端口放行**:
  - 如果您使用云服务器，请在安全组中放行所需端口：
  - `8021/tcp`: Nekro Agent 主服务 (所有模式都需要)。
  - `6099/tcp`: Napcat 服务 (仅在标准部署时需要)。

- **保存凭证**:
  - 安装脚本执行完毕后，会输出 **管理员密码** 和 **OneBot 访问令牌** 等重要信息，请务必妥善保存。

## ⚙️ 部署后配置

- **标准部署**: 前往[协议端配置](/docs/02_quick_start/config/protocol.html#napcat-集成部署-推荐)文档，根据文档说明完成配置。
- **核心部署**: 前往[协议端配置](/docs/02_quick_start/config/protocol)文档，参考说明继续配置。
