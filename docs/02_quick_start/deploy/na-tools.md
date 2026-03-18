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

---

## 📦 第一步：安装 na-tools

na-tools 需要 **Python 3.10+** 环境。我们推荐使用 [uv](https://docs.astral.sh/uv/) 来安装，它可以自动管理 Python 环境，避免污染系统。

### 1. 安装 uv（如果尚未安装）

在终端中运行以下命令：

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

安装完成后，**重新打开终端**或执行 `source ~/.bashrc`（zsh 用户执行 `source ~/.zshrc`）以使 `uv` 命令生效。

### 2. 使用 uv 安装 na-tools

```bash
uv tool install na-tools
```

### 3. 验证安装

```bash
na-tools --version
```

如果看到版本号输出（如 `na-tools, version x.x.x`），说明安装成功。

:::tip 升级 na-tools
后续如需升级 na-tools 本身，运行：
```bash
uv tool upgrade na-tools
```
:::

---

## 🚀 第二步：一键部署 Nekro Agent

运行以下命令开始安装流程：

```bash
na-tools install
```

安装过程会**交互式引导**您完成以下步骤：

### 安装流程详解

**1. Docker 环境检测**

na-tools 会自动检测您的系统是否已安装 Docker：

- **Linux 用户**：如果未安装 Docker，工具会尝试自动安装。
- **macOS 用户**：如果未安装 Docker，工具会引导您手动安装 [Docker Desktop](https://www.docker.com/products/docker-desktop/)。请安装并启动 Docker Desktop 后再重新运行 `na-tools install`。

**2. 选择数据目录**

工具会提示您选择 Nekro Agent 的数据存放目录，默认路径通常为 `~/nekro_agent_data`。直接按 **Enter** 即可使用默认路径，也可以输入自定义路径。

**3. 是否包含 NapCat**

工具会询问是否安装 NapCat（QQ 协议端）。如果您需要连接 QQ，请选择 **是**。

**4. 配置基本参数**

工具会自动生成 `.env` 配置文件，包含端口、Token 等信息。您可以在此步骤确认或修改配置。

**5. 下载并启动服务**

工具会自动：
- 下载 `docker-compose.yml` 编排文件
- 拉取所需的 Docker 镜像
- 启动所有服务容器

**6. 沙盒镜像（可选）**

安装过程中会询问是否拉取 CC 沙盒镜像（`kromiose/nekro-cc-sandbox`），这是可选组件。如果不确定，可以先选择 **否**，后续可通过 `na-tools update --update-cc-sandbox` 补充安装。

**7. 部署完成**

安装完成后，终端会显示一个信息面板，包含：

- **Web 访问地址**（默认 `http://你的IP:8021`）
- **管理员密码**
- **访问 Token**
- **NapCat 端口**（如果安装了 NapCat）

:::warning 请保存这些信息
部署完成后显示的密码和 Token 非常重要，请务必记录下来。后续登录 Web 管理界面和 API 调用都需要用到。
:::

### 安装选项速查

如果您想跳过交互式询问，可以通过命令行参数直接指定：

```bash
# 指定数据目录和端口
na-tools install --data-dir ~/my_nekro_data --port 9000

# 明确包含/不包含 NapCat
na-tools install --with-napcat
na-tools install --without-napcat

# 明确包含/不包含 CC 沙盒
na-tools install --with-cc-sandbox
na-tools install --without-cc-sandbox

# 非交互模式（全部使用默认值，适合自动化脚本）
na-tools install --non-interactive

# 安装 Preview 预览版（可能不稳定，不推荐新手使用）
na-tools install --preview
```

---

## ⚙️ 第三步：初始配置

部署完成后，您需要配置 **模型 API** 才能正常使用 Nekro Agent。

### 方式一：交互式配置向导（推荐新手）

运行以下命令进入配置向导，一步步引导您完成所有配置：

```bash
na-tools config
```

向导会依次引导您配置：

1. **模型 API**：设置 API 地址、API 密钥和聊天模型名称
2. **管理员**：添加管理员 QQ 号（用于管理 Bot 权限）
3. **聊天人设**：设置 Bot 的名称和描述（可选）

配置完成后，向导会询问是否重启服务以应用更改。

### 方式二：快捷配置命令

如果您只需要配置某一项，可以使用对应的子命令：

#### 配置模型 API

```bash
na-tools config model
```

会交互式询问：
- **API 地址**（如 `https://api.openai.com/v1`）
- **API 密钥**（如 `sk-xxxx`）
- **模型名称**（如 `gpt-4o`）
- 是否启用视觉能力
- 是否启用外置思维链

#### 添加/移除管理员

```bash
# 添加管理员（替换为实际的 QQ 号）
na-tools config admin --add 123456789

# 移除管理员
na-tools config admin --remove 123456789

# 查看当前管理员列表
na-tools config admin
```

#### 查看/修改单项配置

```bash
# 查看当前配置摘要
na-tools config show

# 查看某个配置项的值
na-tools config get CHAT_MODEL

# 设置某个配置项
na-tools config set CHAT_MODEL gpt-4o
```

#### 配置 Docker 镜像源

如果您在国内拉取 Docker 镜像速度较慢，可以设置镜像源：

```bash
# 设置镜像源
na-tools config mirror https://mirror.example.com

# 查看当前镜像源
na-tools config mirror

# 清除镜像源（恢复默认）
na-tools config mirror ""
```

---

## 🔌 第四步：配置 NapCat（连接 QQ）

如果您在安装时选择了包含 NapCat，需要完成以下配置才能让 Bot 连接 QQ。

### 1. 登录 NapCat

运行引导命令：

```bash
na-tools napcat
```

工具会显示 NapCat WebUI 的访问地址（默认 `http://127.0.0.1:6099/webui`）。

**操作步骤**：

1. 查看 NapCat 日志获取 WebUI Token：
   ```bash
   na-tools logs napcat
   ```
2. 在浏览器中打开 WebUI 地址
3. 使用日志中显示的 Token 登录
4. 在 WebUI 中完成 QQ 扫码登录

### 2. 自动配置 OneBot 连接

登录成功后，回到终端确认已完成登录。工具会要求您输入已登录的 QQ 号，然后**自动生成 OneBot WebSocket 连接配置**，免去手动编辑配置文件的麻烦。

您也可以直接指定 QQ 号跳过交互：

```bash
na-tools napcat --qq 123456789
```

配置完成后，工具会询问是否重启 NapCat 以应用配置。

---

## 💡 日常管理命令

### 查看服务状态

```bash
na-tools status
```

### 查看日志

```bash
# 查看 Nekro Agent 主服务日志（默认最后 100 行）
na-tools logs

# 查看 NapCat 日志
na-tools logs napcat

# 持续跟踪日志（类似 tail -f，按 Ctrl+C 停止）
na-tools logs -f

# 查看最后 500 行日志
na-tools logs -n 500
```

可选的服务名称：`nekro_agent`（默认）、`nekro_postgres`、`nekro_qdrant`、`nekro_napcat`

### 更新服务

```bash
# 更新到最新稳定版（会询问是否先备份）
na-tools update

# 更新前自动备份
na-tools update --backup

# 更新时不备份
na-tools update --no-backup

# 同时更新 CC 沙盒镜像
na-tools update --update-cc-sandbox

# 不更新沙盒镜像
na-tools update --no-update-sandbox
```

---

## 💾 备份与恢复

### 创建备份

```bash
# 一键备份（自动停止服务 → 备份数据 → 重启服务）
na-tools backup
```

备份内容包括：
- 数据目录下所有文件（`.env`、`docker-compose.yml`、应用配置等）
- Docker 存储卷（PostgreSQL、Qdrant 数据库数据）
- 自动排除缓存和临时文件以减小备份体积

#### 备份选项

```bash
# 指定备份文件输出路径
na-tools backup -o /path/to/my_backup.tar.gz

# 为备份添加名称标识，方便后续识别
na-tools backup --name before-migration
# 文件名示例：nekro_agent_backup_before-migration_20260318_120000.tar.gz

# 备份后不自动重启服务
na-tools backup --no-restart
```

### 查看备份列表

```bash
na-tools backup list
```

输出示例：
```
ℹ 发现以下历史备份：
  [1] nekro_agent_backup_pre-preview_20260318_120000.tar.gz (备份时间: 2026-03-18 12:00:00, 名称: pre-preview, 大小: 45.2 MB)
  [2] nekro_agent_backup_20260317_100000.tar.gz (备份时间: 2026-03-17 10:00:00, 大小: 43.8 MB)
```

### 恢复备份

```bash
# 交互式选择备份文件恢复
na-tools restore

# 指定备份文件恢复
na-tools restore /path/to/backup.tar.gz

# 恢复到指定数据目录
na-tools restore --data-dir /path/to/target_dir
```

恢复流程：停止服务 → 解压备份 → 恢复数据库卷 → 询问是否启动服务。

---

## 🧪 Preview 预览版

Preview 频道提供预览版镜像，可以提前体验新功能，但**可能不稳定**。

### 全新安装 Preview 版

```bash
na-tools install --preview
```

### 从稳定版切换到 Preview

```bash
na-tools update --preview
```

切换前会**自动创建备份**（名称为 `pre-preview`），用于后续回退。

### 从 Preview 回退到稳定版

```bash
na-tools update --rollback
```

回退流程：
1. 将镜像切回稳定版 `latest`
2. 自动查找最近的 `pre-preview` 备份
3. 询问是否从该备份恢复数据
4. 拉取稳定版镜像并重启服务

---

## 📂 多实例管理

na-tools 支持在**同一台机器**上管理多个 Nekro Agent 实例，每个实例拥有独立的数据目录和配置。

### 安装多个实例

```bash
# 安装第一个实例（使用默认目录）
na-tools install

# 安装第二个实例到不同目录
na-tools install --data-dir ~/nekro_agent_dev
```

### 查看所有实例

```bash
na-tools list
```

输出示例：
```
 * [1] /home/user/nekro_agent_data (最后使用: 2026-03-18 12:00:00)    ← 当前激活
   [2] /home/user/nekro_agent_dev  (最后使用: 2026-03-17 10:00:00)
```

`*` 标记表示当前激活的实例。

### 切换实例

```bash
# 按序号切换
na-tools use 2

# 按路径切换
na-tools use ~/nekro_agent_dev
```

切换后，所有命令（`status`、`logs`、`backup` 等）都会操作切换后的实例。

### 绑定已有安装

如果您之前通过其他方式（如手动 Docker Compose）安装了 Nekro Agent，可以将其绑定到 na-tools 管理：

```bash
na-tools bind --data-dir /path/to/existing/nekro_data
```

绑定时可以为实例命名，方便识别：

```bash
na-tools bind --data-dir /opt/nekro_data --name production
```

### 移除实例

```bash
# 移除实例（同时删除数据）
na-tools remove

# 移除实例但保留数据目录
na-tools remove --keep-data

# 移除指定目录的实例
na-tools remove --data-dir ~/nekro_agent_dev

# 跳过确认直接执行（谨慎使用）
na-tools remove --force
```

:::danger 注意
`na-tools remove` 默认会**删除数据目录和 Docker 卷**，操作不可恢复。如果只是想解除管理而保留数据，请使用 `--keep-data` 选项。
:::

---

## 📋 命令速查表

### 部署管理

| 命令 | 说明 |
|------|------|
| `na-tools install` | 安装 Nekro Agent（Docker 检测 → 配置 → 部署） |
| `na-tools update` | 更新服务到最新版本 |
| `na-tools remove` | 卸载并移除 NA 实例 |

### 实例管理

| 命令 | 说明 |
|------|------|
| `na-tools bind` | 绑定已安装的 NA 实例到管理列表 |
| `na-tools use <序号/路径>` | 切换当前激活的实例 |
| `na-tools list` | 列出所有已安装的实例 |
| `na-tools status` | 查看服务运行状态 |

### 数据管理

| 命令 | 说明 |
|------|------|
| `na-tools backup` | 备份数据和配置 |
| `na-tools backup list` | 列出所有历史备份 |
| `na-tools restore` | 从备份恢复（交互式选择或指定文件） |
| `na-tools config` | 交互式配置向导 |
| `na-tools config model` | 快捷配置模型 API |
| `na-tools config admin` | 管理管理员列表 |
| `na-tools config show` | 查看当前配置摘要 |
| `na-tools config mirror` | 管理 Docker 镜像源 |

### 日志与工具

| 命令 | 说明 |
|------|------|
| `na-tools logs [服务名]` | 查看服务日志 |
| `na-tools napcat` | 引导 NapCat 登录并自动配置 OneBot 连接 |

---

## ⚠️ 常见问题

### Docker 相关

**Q: 提示 "Docker 未安装"？**

- **Linux**：na-tools 会尝试自动安装 Docker，如果失败请参考 [Docker 官方安装文档](https://docs.docker.com/engine/install/)。
- **macOS**：请手动安装 [Docker Desktop](https://www.docker.com/products/docker-desktop/)，安装后**启动 Docker Desktop** 再重新运行 `na-tools install`。

**Q: 提示权限不足？**

Linux 下执行 Docker 操作可能需要 `sudo` 权限。na-tools 在权限不足时会自动尝试通过 `sudo` 重新执行命令。

您也可以将当前用户加入 `docker` 组来避免每次输入密码：

```bash
sudo usermod -aG docker $USER
# 重新登录终端后生效
```

### 端口相关

**Q: 提示端口被占用？**

默认端口：
- `8021`：Nekro Agent 主服务
- `6099`：NapCat WebUI

如果这些端口已被其他程序占用，您可以在安装时指定不同端口：

```bash
na-tools install --port 9000
```

### 镜像下载相关

**Q: Docker 镜像下载很慢或失败？**

可以配置国内镜像源加速：

```bash
na-tools config mirror https://your-mirror.example.com
```

设置后，后续的 `install` 和 `update` 操作都会使用该镜像源。
