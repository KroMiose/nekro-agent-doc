---
title: 常见问题解答
description: Nekro Agent 使用中常见问题解决方案
---

# 📖 常见问题

::: tip 问题提交
遇到未收录的问题欢迎[提交issue](https://github.com/KroMiose/nekro-agent/issues)

## 💡 消息发送问题

::: warning 文件发送限制
请确认协议端支持文件发送功能，并检查文件路径配置
:::

### Q: 为什么我的机器人无法发送 文字/图片 以外的文件内容？

A: 请检查你的协议实现端是否支持文件发送，如果支持，请继续

由于 OneBot V11 协议的限制，发送文件时需要协议端能够直接访问到该文件的路径，因此你需要根据实际部署情况为 NekroAgent 配置文件访问基准路径，以下是一个示例:

假设你的协议端部署在容器中，你需要先挂载 NekroAgent 的数据目录到协议端容器中，即 `${HOME}/srv/nekro_agent_data:/app/nekro_agent_data`，然后为 NekroAgent 配置文件访问基准路径:

```yaml
SANDBOX_ONEBOT_SERVER_MOUNT_DIR: "/app/nekro_agent_data"
```

这样 NekroAgent 就可以访问到协议实现端的数据目录，从而发送文件内容了

## Q: 如何在同一设备上部署多个 NekroAgent 实例？

A: 请先使用 `export NEKRO_DATA_DIR=<你的目录>` 设定好不冲突的目录，然后运行安装脚本并按提示修改 `.env` 文件，设定合适的前缀以避免容器名冲突，设定合适的端口以避免端口冲突，继续完成部署即可

## Q: 为什么我的沙盒一直 错误&失败？

A: 部分模型的能力各不相同，请根据实际情况调整参数，或者更换模型
推荐使用 `gemini-2.0-flash` 或更强的模型

## Q: 为什么我的日志一直出现 `LLM API error` ？

A: 请参照常见错误排查指南

## Q: `启用思维链` 这个开关是干嘛的，我需要打开吗 ？

A: 启用思维链可以让你 `不支持思维链的模型` 更加聪明并减小模型幻觉，如果你的模型 `支持思维链` ，请不要启用这个开关