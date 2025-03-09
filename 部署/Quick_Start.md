# 快速开始

欢迎使用 Nekro Agent，本文档将帮助您快速部署服务。

## 🚀 部署方式

### 方式一：标准部署（推荐）

集成 Napcat 协议端的自动化部署版本，一键完成所有配置。

```bash
sudo -E bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/quick_start_x_napcat.sh)"
```

::: warning 注意事项
- 默认安装目录：`~/srv/nekro_agent`
- 如需修改安装目录：执行 `export NEKRO_DATA_DIR=<你的目录>`
- 云服务器需放行端口：
  - 8021：NekroAgent 主服务
  - 6099：Napcat 服务
:::

#### 部署后配置

1. 访问 WebUI：`http://<你的服务ip>:8021`
2. 使用安装脚本提供的账号密码登录
3. 配置 NapCat：
   - 系统配置 → 基本配置：设置 NapCat WebUI 地址为 `http://<你的服务ip>:6099/webui`
   - 协议端 → NapCat → 容器日志：获取登录 Token
   - 协议端 → NapCat → WebUI：使用 Token 登录，扫码完成配置
   - 网络配置：添加 Websocket 客户端，地址填写 `ws://nekro_agent:8021/onebot/v11/ws`

### 方式二：简单部署

仅部署 NekroAgent 核心服务，需要自行配置 OneBot V11 协议端。

```bash
sudo -E bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/quick_start.sh)"
```

协议端连接地址：`ws://<你的服务ip>:8021/onebot/v11/ws`

## ⚙️ 配置说明

::: tip
0.7.0 版本后支持通过 WebUI 进行大部分配置。以下配置仅在 WebUI 出现问题时使用。
:::

配置文件位置：`~/srv/nekro_agent/configs/nekro-agent.yaml`

### 核心配置项

```yaml
# Bot 基础配置
SUPER_USERS: ["12345678"]  # 管理员QQ号
BOT_QQ: "12345678"         # 机器人QQ号（必填）

# 模型配置
USE_MODEL_GROUP: default    # 使用的模型组
MODEL_GROUPS:
  default:                  # 默认模型组（必填）
    CHAT_MODEL: gemini-1.5.pro
    BASE_URL: https://api.nekro.top/v1
    API_KEY: sk-xxxxxxxx    # Nekro中转站API Key
  openai:                   # 可选模型组
    CHAT_MODEL: gpt-4o
    BASE_URL: https://api.openai.com/v1
    API_KEY: sk-xxxxxxxx    # OpenAI API Key

# 功能配置
AI_ENABLE_VISION: true      # 启用视觉功能
AI_VISION_IMAGE_LIMIT: 5    # 单次图片限制

# 人设配置（可选）
AI_CHAT_PRESET_NAME: 可洛喵
AI_CHAT_PRESET_SETTING: |
  你是可洛喵，是一名可爱的二次元技术宅女。喜欢使用颜文字，
  通常以"喵"作为结尾。聪明自信，喜欢挑战困难的任务。

# 扩展模块（按需启用）
EXTENSION_MODULES:
  - extensions.basic        # 基础消息处理
  - extensions.judgement    # 群聊管理
  - extensions.status       # 状态记忆增强
  - extensions.artist       # AI绘图
  - extensions.group_honor  # 群荣誉系统
  - extensions.ai_voice     # AI语音
  - extensions.google_search # 谷歌搜索
  - extensions.timer        # 定时器
```

完整配置说明请参考 [config.py](https://github.com/KroMiose/nekro-agent/blob/main/nekro_agent/core/config.py)