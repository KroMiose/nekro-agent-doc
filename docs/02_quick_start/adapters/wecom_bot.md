---
title: 企业微信 AI Bot 配置教程
description: 面向首次接入企业微信 AI Bot 用户的 Nekro Agent 配置教程。
---

# 企业微信 AI Bot 配置教程

本文说明如何配置企业微信 AI Bot 适配器，并将 Nekro Agent 接入企业微信官方长连接。

## 开始前准备

- 您已经部署好 Nekro Agent
- 您有企业微信后台权限
- 您可以创建或管理企业微信 AI Bot

## 第一步：在企业微信后台创建 AI Bot

1. 进入企业微信 AI Bot 后台
   - 网页端入口：`安全管理` -> `管理工具` -> `智能机器人`
   - 桌面端入口：`工作台` -> `智能机器人`
2. 点击 `创建机器人` 然后点击 `手动创建` 右侧配置向下滚动到底部选择 `API模式创建`
3. 选择 `使用长连接`
4. 记录提供的：
   - `BOT_ID`
   - `BOT_SECRET`

![手动创建](/assets/adapters/wecom_ai/create1.png)

![API模式](/assets/adapters/wecom_ai/create2.png)

![企业微信 AI Bot 后台中的 BOT_ID 和 BOT_SECRET](/assets/adapters/wecom_ai/botid&secret.png)

## 第二步：在 Nekro Agent 中填写配置

1. 打开「适配器」->「WeCom AI Bot」
2. 打开 `启用适配器`
3. 填写 `Bot ID`
4. 填写 `Secret`
5. 保存并重启 Nekro Agent

![Nekro Agent 中的WeCom AI Bot 配置页](/assets/adapters/wecom_ai/na_config.png)

## 第三步：确认长连接是否建立成功

完成配置后，按下面顺序检查：

1. 查看 Nekro Agent 日志
2. 确认没有凭据错误
3. 给机器人发送一条测试消息
4. 如果 Nekro Agent 能正常收到并回复，说明已经配置成功

## 第四步(可选)：将用户ID映射为用户名

由于企业微信API限制，适配器只能拿到用户ID，但自建应用拥有将对应ID映射为用户名的API，故我们可以通过自建应用来映射用户名

::: tip 提示
该部分内容，需要您拥有一个根域名与一台固定IP服务器，若没有，则可跳过该部分阅读
:::

1. 进入企业微信的 `应用管理` 页面，点击创建应用
2. 填写相关信息后，记录下应用 Secret 与 企业ID(在 `我的企业` 中查看)

![Secret](/assets/adapters/wecom_ai/secret.png)

![企业ID](/assets/adapters/wecom_ai/ID.png)

3. 向下滚动页面，点击 `设置可信域名` 按钮，根据提示操作

![域名](/assets/adapters/wecom_ai/domain.png)

::: tip 提示
接下来的流程，适用于有固定IP服务器且将Nekro Agent部署在上面的个人或企业用户，若您没有或未部署，可跳过该部分，直接查看下面部分的教程即可
:::

4. 返回 Nekro Agent 填写 `自建应用 Secret` 与 `企业 ID`
5. `用户名查询模式` 选择 `direct`
6. 在您运行 Nekro Agent 的服务器上，执行 `curl ip.sb` 将返回的ip地址(格式为xx.xx.xx.xx，例192.168.0.1)填入 `企业可信ip` 内

![ip](/assets/adapters/wecom_ai/ip.png)

7. 保存后重启 Nekro Agent
8. 测试映射结果

![config](/assets/adapters/wecom_ai/user_name_config.png)

### 以下流程适用于没有固定公网 IP 部署环境、但仍希望映射用户名的用户

1. 准备一台固定公网 IP 服务器；不建议只为了映射用户名而额外购买服务器
2. 在固定公网 IP 服务器上部署 [用户名代理服务](https://github.com/liugu2023/wxwork_user_proxy)
3. 在 Nekro Agent 中填写 `用户名代理共享密钥`
4. 在「系统配置」→「命令中心」输入 `instance_id`，获取 `实例唯一ID`
5. 参考代理服务 `README` 填写配置文件，包括 `应用 Secret`、`企业ID`、`用户名代理共享密钥` 和 `实例唯一ID`
6. 启动代理服务
7. 在 Nekro Agent 中填写 `用户名代理地址`，一般为 `http://ip:port/api/wxwork/user/resolve`
8. 将 `用户名查询模式` 切换为 `proxy`
9. 在运行代理服务的服务器上执行 `curl ip.sb`，将返回的 IP 地址填入 `企业可信 IP`

![ip](/assets/adapters/wecom_ai/ip.png)

10. 测试映射结果
## 一般新手只需要关心的字段

- `BOT_ID`：企业微信 AI Bot 后台提供
- `BOT_SECRET`：企业微信 AI Bot 后台提供

下面这些可选项，第一次配置时一般保持默认即可：

- `心跳间隔`
- `请求超时`
- `基础重连间隔`
- `最大重连次数`
- `所有收到的消息均触发AI`
- `接入文本消息`
- `记录事件回调`
- `记录原始帧`
- `日志最大长度`

## 这个模式适合什么场景

- 您想走企业微信官方能力
- 您不想暴露公网回调地址
- 您希望机器人通过长连接直接收发消息

## 当前已知限制

- 主动发送目前主要支持 Markdown、图片、文件
- 语音、视频、模板卡片等能力还不完整
- 部分用户名、群名场景下可能仍会显示原始 ID

## 常见问题

### 日志里一直提示没连上

优先检查：

1. `BOT_ID` 和 `BOT_SECRET` 是否复制错
2. 机器人是否在企业微信后台真正创建完成
3. Nekro Agent 所在环境是否能正常访问企业微信官方服务

### 连接正常，但消息表现不完整

这是当前适配器能力边界导致的，尤其是语音、视频、模板卡片这类消息类型。
