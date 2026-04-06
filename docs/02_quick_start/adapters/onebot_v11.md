---
title: OneBot V11 / NapCat 配置教程
description: 面向首次接入 QQ 平台用户的 OneBot V11 / NapCat 配置教程。
---

# OneBot V11 / NapCat 配置教程

本文说明如何配置 OneBot V11 / NapCat，并将 Nekro Agent 接入 QQ。

::: tip 小提示

若您使用 NekroAgent Windows 启动器安装，可直接在启动器的 NapCat 页面点击一键配网即可完成配网。

:::

## 开始前准备

- 你已经部署好 Nekro Agent，并且可以打开 WebUI
- 你有一个准备用来挂机器人的 QQ 账号
- 你知道 Nekro Agent 的访问地址，例如 `http://<服务器IP>:8021`

## 第一步：先在 Nekro Agent 里打开 OneBot V11

1. 打开 Nekro Agent WebUI
2. 进入「适配器」->「OneBot V11」
3. 进入 `配置` 页面
4. 打开 `启用适配器` 开关
5. 填写 `机器人 QQ 号`
6. 填写 `NapCat WebUI 访问地址`
7. 保存适配器配置
8. 重启 Nekro Agent
9. 回到「OneBot V11」适配器后，进入 `Napcat` 页面
10. 记下页面里显示的 `OneBot 服务访问密钥` 和 `NapCat 登录 Token`

![Nekro Agent 中的 OneBot V11 配置页](/assets/adapters/onebot_v11/nekro-agent-onebot-config.png)

### 这几个字段怎么填

- `BOT_QQ`：要登录的机器人 QQ 号
- `RESOLVE_CQ_CODE`：一般保持默认即可；只有你明确需要让协议端解析 CQ 码时再打开
- `NAPCAT_ACCESS_URL`：NapCat WebUI 地址，常见是 `http://<服务器IP>:6099/webui`
- `NAPCAT_CONTAINER_NAME`：默认部署一般不用改

## 第二步：登录 NapCat

1. 打开 NapCat WebUI，常见地址是 `http://<服务器IP>:6099/webui`
2. 输入刚才记下的 `NapCat 登录 Token` 登录
3. 使用页面提供的方式登录 QQ
4. 确认 NapCat 页面已经显示为在线状态
5. 如果是第一次进入，先到 `系统配置` -> `修改密码` 页面内修改默认密码

![NapCat 登录页](/assets/adapters/onebot_v11/nc-login.png)

## 第三步：在 NapCat 里配置反向 WebSocket

1. 进入 NapCat 的「网络配置」
2. 新增一个 `WebSocket 客户端`
3. 地址填写：

```text
ws://nekro_agent:8021/onebot/v11/ws
```

如果不是一体化容器部署，也可以改成：

```text
ws://<你的服务器IP>:8021/onebot/v11/ws
```

4. 鉴权密钥填写刚才在 Nekro Agent 页面里看到的 `OneBot 服务访问密钥`
5. 保存并启用这条连接

![NapCat 网络配置页](/assets/adapters/onebot_v11/nc-internet.png)

## 第四步：确认是否接通成功

完成上面的设置后，按下面顺序检查：

1. 进入 NapCat 的 `猫猫日志`
2. 查看日志内是否有 ws 类错误
3. 若无相关错误，向机器人发送一条私信
4. 回到 Nekro Agent 进入 `系统日志` 查看是否有您刚才发送的消息
5. 若有，则说明配置成功

## 如果你不是用 NapCat

如果你使用的是其他兼容 `OneBot V11` 的协议端，只要把它的反向 WebSocket 地址指向下面这个接口即可：

```text
ws://<你的服务器IP>:8021/onebot/v11/ws
```

如果你还要用到图片、文件上传之类的能力，需要额外确认 Nekro Agent 和协议端之间的目录挂载是否一致。

## 配置完成后你会看到什么

- 群聊会显示为：`onebot_v11-group_群号`
- 私聊会显示为：`onebot_v11-private_QQ号`

这两种都是正常现象，不需要手动修改。

## 常见问题

### NapCat 已经登录，但 Nekro Agent 没收到消息

优先检查这几项：

1. 反向 WebSocket 地址有没有填错
2. `OneBot 服务访问密钥` 有没有填错
3. NapCat 的连接开关是否真的已经启用
4. Nekro Agent 的 `OneBot V11` 适配器是否已经开启

### 可以收消息，但发不出去

一般是下面几种情况：

1. 机器人账号被平台限制
2. 机器人账号被禁言
3. 协议端和 Nekro Agent 之间的连接已经断开

### 图片或文件发送失败

如果你不是标准一体化部署，通常要检查目录挂载：

1. 协议端是否支持图片和文件发送
2. Nekro Agent 与协议端是否看得到同一份文件路径
3. 文件大小是否超出平台限制
