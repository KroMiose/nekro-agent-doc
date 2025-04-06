---
title: 快速部署指南
description: Nekro Agent 快速安装与配置手册
---

# 🚀 快速开始

欢迎使用 **Nekro Agent**！本文档将引导您快速完成服务部署与基础配置。

::: warning 警告
本文仅适用于 Linux 系统，**请勿在 Windows/macOS 等平台使用本指南操作**。
:::

## 部署方式

### ✅ 方式一：标准部署（推荐）

集成 Napcat 协议端的自动化部署版本，一键完成环境准备与配置。

```bash
sudo -E bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/quick_start_x_napcat.sh)"
```

::: warning 注意事项
- 默认安装目录：`~/srv/nekro_agent`  
- 修改安装目录：部署前执行 `export NEKRO_DATA_DIR=<你的目录>`  
- 云服务器需开放以下端口：
  - `8021`：Nekro Agent 主服务
  - `6099`：Napcat 协议服务  
- 若出现异常，请参考：[常见错误列表](../CommonErrors.md)
:::

#### ✅ 部署完成后配置

1. 访问 Web UI：`http://<你的服务器IP>:8021`
2. 使用安装脚本提供的账号密码登录
3. 配置 NapCat 协议端：
   - **系统配置 → 基本配置**：设置 NapCat WebUI 地址为 `http://<你的服务器IP>:6099/webui`
   - **协议端 → NapCat → 容器日志**：复制登录 Token
   - **协议端 → NapCat → WebUI**：使用 Token 登录并扫码绑定账号
   - **网络配置**：添加 WebSocket 客户端，地址填写 `ws://nekro_agent:8021/onebot/v11/ws`

---

### 🧩 方式二：简单部署

仅部署 Nekro Agent 核心服务，需要手动连接 OneBot V11 协议端。

```bash
sudo -E bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/quick_start.sh)"
```

- 协议端连接地址：`ws://<你的服务器IP>:8021/onebot/v11/ws`

---

## ⚙️ 配置说明

::: tip 提示
自 `v0.7.0` 起，推荐使用 Web UI 进行大部分配置。以下内容仅适用于 Web UI 出现异常时的手动配置。
:::

- 配置文件位置：`~/srv/nekro_agent/configs/nekro-agent.yaml`

### 🔧 核心配置项示例

```yaml
# Bot 基础信息
SUPER_USERS: ["12345678"]    # 管理员 QQ
BOT_QQ: "12345678"           # 机器人 QQ（必填）

# 模型调用配置
USE_MODEL_GROUP: default
MODEL_GROUPS:
  default:
    CHAT_MODEL: gemini-1.5.pro
    BASE_URL: https://api.nekro.top/v1
    API_KEY: sk-xxxxxxxx       # Nekro 中转站 API Key
  openai:
    CHAT_MODEL: gpt-4o
    BASE_URL: https://api.openai.com/v1
    API_KEY: sk-xxxxxxxx       # OpenAI API Key

# 功能开关
AI_ENABLE_VISION: true
AI_VISION_IMAGE_LIMIT: 5

# 人设（可选）
AI_CHAT_PRESET_NAME: 可洛喵
AI_CHAT_PRESET_SETTING: |
  你是可洛喵，是一名可爱的二次元技术宅女。
  喜欢使用颜文字，常以"喵"结尾，聪明自信，热爱挑战困难任务。

# 启用扩展模块
EXTENSION_MODULES:
  - extensions.basic
  - extensions.judgement
  - extensions.status
  - extensions.artist
  - extensions.group_honor
  - extensions.ai_voice
  - extensions.google_search
  - extensions.timer
```

完整字段解释请参考：[config.py 源码](https://github.com/KroMiose/nekro-agent/blob/main/nekro_agent/core/config.py)

---

如果你需要，我还可以帮你：

- 自动生成 TOC / 目录
- 拆出独立的“模型配置指南”、“插件模块说明”等子文档
- 写一个“开发者快速调试指南”  
随时说你需要什么！