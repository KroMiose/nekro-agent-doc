---
title: 飞书配置教程
description: 面向首次接入飞书用户的 Nekro Agent 配置教程。
---

# 飞书配置教程

本文说明如何配置飞书适配器，并将 Nekro Agent 接入飞书。

## 开始前准备

- 你已经部署好 Nekro Agent
- 你有权限创建飞书企业自建应用
- 你可以进入 [飞书开放平台](https://open.feishu.cn/app)

## 第一步：创建飞书应用并添加机器人能力

1. 打开 [飞书开放平台](https://open.feishu.cn/app)
2. 创建「企业自建应用」
3. 填写应用名称和描述
4. 在应用能力里添加「机器人」

![创建](/assets/adapters/feishu/create.png)

![添加](/assets/adapters/feishu/add.png)

## 第二步：拿到 `App ID` 和 `App Secret`

进入「凭证与基础信息」，记录下面两个值：

- `App ID`
- `App Secret`

这两个值稍后都要填到 Nekro Agent 中。

![凭据](/assets/adapters/feishu/id.png)

## 第三步：把事件订阅切到长连接模式

1. 打开「事件与回调」->「事件配置」
2. 选择「长连接」模式
3. 添加事件 `im.message.receive_v1`

飞书这边要特别注意：这里必须用长连接，不要配成 HTTP 回调。

![飞书事件订阅设置为长连接](/assets/adapters/feishu/config.png)

## 第四步：配置应用权限

进入 `权限管理` 点击 `批量导入/导出权限` 复制下方文字并替换原本的内容后点击下一步

```
{
  "scopes": {
    "tenant": [
      "contact:contact.base:readonly",
      "contact:user.base:readonly",
      "im:chat",
      "im:message",
      "im:message.group_at_msg:readonly",
      "im:message.group_msg",
      "im:message.p2p_msg:readonly",
      "im:message.reactions:write_only",
      "im:message:send_as_bot",
      "im:resource"
    ],
    "user": []
  }
}
```

如果权限没配够，最常见的现象就是能连上，但发不了消息，或者收不到群消息。

![批量导入](/assets/adapters/feishu/config2.png)

![输入框](/assets/adapters/feishu/config3.png)

## 第五步：在 Nekro Agent 里填写配置

1. 打开「适配器配置」->「飞书」
2. 打开 `启用适配器`
3. 填写 `App ID`
4. 填写 `App Secret`
5. 保存并重启 Nekro Agent

![Nekro Agent 中的飞书配置页](/assets/adapters/feishu/na_config.png)

## 第六步：发布并安装应用

1. 在飞书后台创建版本
2. 按平台要求提交发布
3. 确认应用已经安装到目标租户
4. 把机器人拉进测试群，或者直接给机器人发私聊

![发布](/assets/adapters/feishu/publish.png)

## 第七步：确认是否配置成功

1. 私聊机器人发送一条消息
2. 或者在群里 `@机器人` 发送一条消息
3. 如果 Nekro Agent 正常回复，说明配置成功

## 你实际需要填写什么

- `APP_ID`：来自飞书开放平台
- `APP_SECRET`：来自飞书开放平台

## 常见问题

### 飞书后台已经配好了，但机器人不回消息

优先检查：

1. 事件订阅是否真的选了「长连接」
2. `APP_ID` / `APP_SECRET` 是否复制正确
3. 应用是否已经发布并安装
4. 权限是否已经全部开齐

### 群里不回，私聊能回

这通常是群消息相关权限没开，或者机器人还没有被正确拉进群。
