---
title: 协议端配置指南
description: Nekro Agent 协议端配置的详细说明，包括 NapCat 集成部署和其他协议端的连接方法及故障排除
---

# 协议端配置

Nekro Agent 支持多种支持 OneBot V11 的协议端连接方式，本文档将介绍如何配置不同的协议端。

## NapCat 集成部署 (推荐)

[NapCat](https://github.com/NapNeko/NapCatQQ) 是现代化的基于 QQNT 的 Bot 协议端实现，如果你使用了包含 NapCat 部署的一键脚本，请直接跳转至第 4 步，使用 Token 登录 NapCat 按照步骤配置好 Websocket 客户端即可

::: warning 警告！

1. 务必修改NapCat默认密码：公网WebU 必须使用强密码（建议12位以上，含数字、字母、符号）
2. 务必使用Token验证：OneBot服务务必设置有效 Token，避免空Token或弱口令
3. 为安全起见，请避免使用默认端口

:::

#### 配置步骤

::: warning 注意

1. 以下步骤以默认安装配置为例，如果在部署过程中修改了端口，请将步骤中的 8021、6099 端口替换为实际端口号
2. 如果使用了云服务器进行部署，请先在云服务器的安全组中放行 8021、6099 端口 (或修改后的端口)

:::

1. 打开 Nekro Agent WebUI：`http://<你的服务ip>:8021`
2. 使用安装脚本提供的账号密码登录
3. 配置 NapCat：

   - 默认情况下 NapCat WebUI 地址应当为 `http://<你的服务ip>:6099/webui` (可在 「系统配置」→「基本配置」中修改)
   - 在「协议端」→「NapCat」→「容器日志」获取 NapCat 登录 Token (新版本 NapCat 默认登陆 Token 为 `napcat` 请在登陆后及时修改！)
   - 在「协议端」→「NapCat」→「WebUI」使用 Token 登录并登陆需要作为 Bot 的 QQ 帐号
   - 在「网络配置」中添加 Websocket 客户端：
     - 添加 URL：`ws://nekro_agent:8021/onebot/v11/ws` (URL 走容器网络通信方式，不论是否修改了端口都使用此地址)
     - 配置 OneBot 访问密钥，即本页面上方显示的 `OneBot 访问密钥`
     - 打开「启用」开关并保存

配置完成后，请参考[系统配置指南](/docs/02_quick_start/config/system.html)文档继续基本应用配置即可开始使用

### 其他协议端

如果你使用了其他协议端，请将其反向 WebSocket 地址配置为：`ws://<你的服务ip>:8021/onebot/v11/ws`，即可连接 NekroAgent 开始使用

:::warning
使用其他协议端需要自行配置 NekroAgent 数据挂载目录，否则可能无法正常收发图片、文件等资源
:::

## 故障排除

### 连接问题

- **连接失败**：检查网络连接和防火墙设置
- **鉴权失败**：检查 OneBot 服务访问密钥是否正确设置（在 NekroAgent 的 WebUI 中 「协议端」→「NapCat」→「WebUI」获取）

### 消息接收问题

- **收不到消息**：检查两端日志，确认是否正确建立连接（NekroAgent 系统日志中显示 `connection open` 字样）
- **消息格式错误**：检查是否使用了兼容的 OneBot 实现
