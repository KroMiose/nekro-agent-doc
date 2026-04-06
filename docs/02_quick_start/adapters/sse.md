---
title: SSE 配置教程
description: 说明如何配置 SSE 适配器，并将自定义客户端接入 Nekro Agent。
---

# SSE 配置教程

本文说明如何配置 SSE 适配器，并将自定义客户端接入 Nekro Agent。

::: warning 使用范围
该适配器只适合已经了解相关协议知识，并且已经熟悉 Nekro Agent 的用户使用。
:::

## 开始前准备

- 你已经部署好 Nekro Agent
- 你准备好了一个要接入的自定义客户端或网页前端
- 你知道如何向 HTTP 接口发请求并保持 SSE 长连接

## 第一步：先在 Nekro Agent 中启用 SSE

1. 打开「适配器配置」->「SSE」
2. 打开 `ENABLED`
3. 按需填写 `ACCESS_KEY`
4. 如果你要传文件，再打开 `ALLOW_FILE_TRANSFER`
5. 保存并重启 Nekro Agent

## 第二步：决定客户端要怎么连

SSE 适配器最常用的两个接口是：

- 建立连接：

```text
GET /api/adapters/sse/connect
```

- 发送命令：

```text
POST /api/adapters/sse/connect
```

如果你设置了 `ACCESS_KEY`，客户端还需要带上相同的访问密钥。

## 第三步：让客户端建立 SSE 连接

客户端建立连接时，常见会带这些参数：

- `client_name`
- `platform`
- `access_key`

示例：

```text
GET /api/adapters/sse/connect?client_name=my-web&platform=web&access_key=your_key
```

连接建立后，Nekro Agent 就可以把消息推给这个客户端。

## 第四步：如果你要发命令，记得带请求头

向命令接口发请求时，常见需要带：

- `X-Client-ID`
- `X-Access-Key`

如果你没有设置 `ACCESS_KEY`，`X-Access-Key` 可以不带。

## 第五步：确认是否配置成功

1. 让客户端先建立 SSE 长连接
2. 在 Nekro Agent 中向这个 SSE 聊天发送一条测试消息
3. 如果客户端能收到，说明配置成功

## 你最需要理解的几个配置项

- `访问密钥`：访问密钥。要不要加一道访问校验
- `是否允许文件传输`：是否允许文件和图片传输
- `最大文件大小（字节）`：文件大小上限
- `允许的文件类型`：允许哪些类型的文件
- `响应超时时间（秒）`：等待客户端回执多久
- `忽略客户端回执`：是否忽略客户端回执

## 配好后聊天键长什么样

SSE 内部常见聊天键格式为：

```text
sse-{platform}-{channel_id}
```

例如：

```text
sse-web-private_user001
```

## 常见问题

### 客户端一直连不上

先检查：

1. Nekro Agent 是否已经启用 SSE 适配器
2. 访问地址是否正确
3. `access_key` 是否和服务端一致

### 消息发出去了，但 Nekro Agent 说失败

这通常是因为客户端没有按时返回回执。你可以：

1. 先修客户端回执逻辑
2. 或临时打开 `IGNORE_RESPONSE`

但第二种方案只适合调试，因为它可能把实际没送达的消息也判成成功
