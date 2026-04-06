---
title: 企业微信自建应用配置教程
description: 面向首次接入企业微信自建应用用户的 Nekro Agent 配置教程。
---

# 企业微信自建应用配置教程

本文说明如何配置企业微信自建应用适配器，并将 Nekro Agent 接入企业微信应用回调模式。

## 开始前准备

- 你已经部署好 Nekro Agent
- 你有企业微信后台权限
- 你已经准备好一个可公网访问的 HTTP/HTTPS 地址

## 第一步：在企业微信后台创建自建应用

1. 进入企业微信自建应用后台
   - 网页端入口：`应用管理` -> `应用管理` -> `创建应用`
   - 桌面端：暂不支持
2. 填写应用名称，简介，选择可见范围并上传一张图片作为应用图标
3. 在应用主页记录下 `AgentId` `Secret` ,其中 `Secret` 需要点击查看后前往桌面端/手机端对应企业查看
4. 在 `接收消息` 中点击 `设置API接收`
5. 填写 `URL` 随机获取并记下 `Token` `EncodingAESKey` ,其中 `URL` 为提前准备好的公网可访问的HTTP/HTTPS地址，该地址应该指向 `Nekro Agent` 的wecom_crop接收地址：`http://ip:port/api/adapters/wxwork_corp_app/callback` 若您没有公网域名，那么该适配器不适合您，请前往[企业微信官方机器人](/docs/02_quick_start/adapters/wecom_bot.md)
6. 获取到两个 token 后，先不要点击保存，先进行第二步，配置启用适配器并重启 Nekro Agent 后，再点击保存，否则会出现 URL 验证失败
7. 保存好应用后，前往应用管理页面，配置可信IP，首先，在您部署的机器上，运行 `curl ifconfig.me` 然后将输出填写进 `企业可信IP` 输入框内并保存

![agentid](/assets/adapters/wecom_crop/config1.png)

![secret](/assets/adapters/wecom_crop/secret.png)

![url](/assets/adapters/wecom_crop/config2.png)

## 第二步：在 Nekro Agent 中填写配置

1. 打开「适配器」->「WeCom Corp App」
2. 打开 `启用适配器`
3. 填写：
   - `Corp ID`
   - `Secret`
   - `Agent ID`
   - `Callback Token`
   - `Callback EncodingAESKey`
4. 保存并重启 Nekro Agent

其中 `Corp ID` 需要前往企业后台获取：
   - 网页端：`我的企业` -> `企业ID`
   - 桌面端：暂不支持

![Nekro Agent 中的企业微信自建应用配置页](/assets/adapters/wecom_crop/na_config.png)

## 第三步：确认是否配置成功

1. 给应用发送一条测试消息
2. 如果 Nekro Agent 能收到并回复，说明已经配置成功

## 第四步（可选）：在微信客服内通过自建应用使用 Nekro Agent

1. 前往 `微信客服` 管理页面
   - 网页端：`应用管理` -> `应用管理` -> `微信客服`
   - 桌面端：`工作台` -> `微信客服`
2. 创建一个客服账号
3. 点击微信客服下方的 `API` 小按钮，在弹出的选择框内配置 `可调用接口的应用` 勾选刚刚创建的自建应用并确认
4. 点击 `可调用接口的应用` 下方的 `前往配置` 在新页面内点击 `操作` 下方的 `...` 后点击 `配置客服账号` 勾选刚刚创建的客服账号并确认即可

![API](/assets/adapters/wecom_crop/config3.png)

![接口](/assets/adapters/wecom_crop/config4.png)

![配置](/assets/adapters/wecom_crop/config5.png)

![...](/assets/adapters/wecom_crop/config6.png)

![配置客服](/assets/adapters/wecom_crop/config7.png)

## 这个模式要注意什么

- 当前主要支持私聊消息收发

## 常见问题

### 企业微信后台提示回调验证失败

优先检查：

1. 回调地址是否能从公网访问
2. `CALLBACK_TOKEN` 是否两边一致
3. `CALLBACK_ENCODING_AES_KEY` 是否两边一致

### 应用能验证成功，但机器人不回消息

这时一般要检查 Nekro Agent 端填写的 `CORP_ID`、`Secret`、`AgentId` 是否正确。
