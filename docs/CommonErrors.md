---
title: 常见错误排查指南
description: Nekro Agent 常见错误解决方案与排查方法
---
# 常见错误排查指南

## 安装脚本问题

### 1. 无法下载安装脚本

具体表现为：

```bash
curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused
```
请检查您的网络连接是否正常，或尝试更换github镜像站后重新运行脚本。

### 2. 安装脚本无法启动主服务

1. 检查你的网络环境是否可以连接到 DockerHub ，如果无法连接，请更换镜像源。
2. 请检查您的Docker容器列表，如您想部署多个 NekroAgent 请参照[FAQ](QA.md)。

::: warning 警告
此文档仍需更新，敬请期待。
:::
