---
title: QQBot OpenClaw 配置教程
description: 面向首次接入 QQ 开放平台官方机器人用户的 QQBot OpenClaw 配置教程。
---

# QQBot OpenClaw 配置教程

本文说明如何通过 **QQBot OpenClaw** 渠道，将 Nekro Agent 接入 **QQ 开放平台官方机器人**（群聊 / 私聊）。

> 这是 Nekro Agent 连接 QQ 的**官方渠道**方式。它基于 QQ 开放平台的 OpenClaw 入口创建机器人，与
> [OneBot V11 / NapCat](/docs/02_quick_start/adapters/onebot_v11) 这种「登录 QQ 号 + 协议端」的方式不一样：
> 前者是**官方机器人应用**，身份是开放平台分配的 openid，而不是你的 QQ 号。

## 开始前准备

- 您已经部署好 Nekro Agent，并且可以打开 WebUI
- 您有一个用于登录 QQ 开放平台的手机 QQ 账号
- 您知道 Nekro Agent 的访问地址，例如 `http://<服务器IP>:8021`

## 第一步：扫码创建机器人

1. 打开 Nekro Agent WebUI
2. 进入「适配器」->「QQBot OpenClaw」
3. 打开 `接入向导`（onboarding）页面
4. 用手机 QQ 扫码右侧二维码，进入 QQ 开放平台的 **OpenClaw 专用入口**
   （入口地址：<https://q.qq.com/qqbot/openclaw/index.html>）
5. 登录后按页面提示**创建机器人**

::: tip 小提示

扫码只是用来打开开放平台入口、创建机器人，**并不代表 Nekro 已经登录成功**。运行时仍需在下面第 2 步拿到并填写凭据。

:::

## 第二步：复制凭据

创建机器人后，页面会给出下面的信息：

- **AppID**（`APP_ID`）：机器人的应用 ID
- **AppSecret**（`CLIENT_SECRET`）：机器人的密钥，用于换取 OpenClaw QQBot Gateway 的 AccessToken

> ⚠️ **AppSecret 离开开放平台页面后可能无法再次明文查看**，请立即复制并妥善保存。

## 第三步：填写凭据并连接

1. 回到 Nekro Agent WebUI
2. 进入「QQBot OpenClaw」适配器的 `配置` 页面
3. 打开 `启用适配器` 开关
4. 填写 `APP_ID` 和 `CLIENT_SECRET`
5. 保存配置
6. **重启 Nekro Agent**（或在 `接入向导` 页点击 `重新连接` 重连 Gateway）

保存并重启后，回到 `接入向导` 页面，顶部状态应从「未配置」依次变为「已配置 -> 运行中 -> 已连接」。

## 这几个字段怎么填

| 字段 | 说明 |
| --- | --- |
| `APP_ID` | QQ 开放平台 OpenClaw 入口创建机器人后获得的 AppID，必填，修改后需重启 |
| `CLIENT_SECRET` | 创建机器人后获得的 AppSecret，敏感字段，用于换取 Gateway AccessToken，修改后需重启 |
| `GROUP_POLICY` | 群聊策略：`open` 接收所有群；`allowlist` 仅接收白名单；`disabled` 禁用群聊 |
| `GROUP_ALLOW_FROM` | `GROUP_POLICY=allowlist` 时允许的 `group_openid` 列表；填 `*` 表示全部允许 |
| `DEFAULT_REQUIRE_MENTION` | 普通群消息默认只记录上下文、不触发回复；关闭后普通群消息可直接触发（默认开启） |
| `IGNORE_OTHER_MENTIONS` | 群消息包含 `@` 但没有 `@` 本机器人时，是否忽略触发 |
| `GROUP_HISTORY_LIMIT` | 群上下文记录上限，跟随 OpenClaw 默认值（默认 50） |
| `PROACTIVE_SEND_ENABLED` | 没有最近入站消息 / 引用消息时仍尝试主动发送（默认开启） |

## 群聊触发规则

QQBot OpenClaw 的群消息默认只作为**上下文**记录，不会主动回复。要触发回复，需要：

- 在群里 `@ 本机器人`
- 或 `引用` 本机器人之前发出的某条消息

这是为了避免机器人在大群里刷屏。普通群消息的触发行为，可以通过上面的 `DEFAULT_REQUIRE_MENTION` 调整。

## 维护操作

在 `接入向导` 页面的「维护操作」区域，您可以：

- `测试令牌`：校验当前 `CLIENT_SECRET` 能否正常换取 AccessToken
- `重新连接`：重启 Gateway 后台连接
- `清理会话`：清理短期会话状态
- `清理引用索引`：清理用于消息引用的索引数据

## 配置完成后您会看到什么

- 私聊会显示为：`qqoc-c2c:{user_openid}`
- 群聊会显示为：`qqoc-group:{group_openid}`

> 身份 ID（`openid`）是 QQ 开放平台/OpenClaw 分配的，**不是传统的 QQ 号**。这是正常现象，不需要手动修改。

## 常见问题

### 状态一直停在「未配置」

1. 检查 `配置` 页里 `APP_ID` / `CLIENT_SECRET` 是否已保存
2. 保存后是否重启了 Nekro Agent
3. 重启后到 `接入向导` 页点一下 `刷新状态`

### 状态为「已配置 / 运行中」但不显示「已连接」

1. 在 `接入向导` 页点击 `测试令牌`，确认凭据有效
2. 若凭据无效，重新在开放平台复制 AppSecret 并更新
3. 确认机器人已在开放平台侧上线

### 群消息不回复

1. 确认本机器人**确实是官方机器人渠道**，且已在群里
2. 尝试在群里 `@ 本机器人` 或 `引用` 机器人消息来触发
3. 确认 `GROUP_POLICY` 不是 `disabled`，且没有命中 `allowlist` 限制

## 下一步

- 适配器配好了，但 Bot 还不会回话？前往 [系统配置](/docs/02_quick_start/config/system) 配好至少一个**聊天模型组**
- 想用「登录 QQ 号 + 协议端」的方式接 QQ？参考 [OneBot V11 / NapCat](/docs/02_quick_start/adapters/onebot_v11)
- 想给 Bot 配人设？参考 [人设技巧](/docs/03_advanced/persona_tips)
