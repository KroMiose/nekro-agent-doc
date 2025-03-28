---
title: 常见错误排查指南
description: Nekro Agent 常见错误解决方案与排查方法
---

# 常见错误排查指南

::: tip 排查提示
建议先查看容器日志定位问题：`docker compose logs -f nekro_agent`
:::

## 🚨 LLM 相关错误

## 🚨 LLM 相关错误

### 1.1 错误信息：`LLM API error: 'Timeout'`

这通常是由于网络超时导致的错误。请检查您的网络链接是否正常，如正常请尝试重新启动容器或服务器。

### 1.2 错误信息：`LLM API error: 'NoneType' object is not subscriptable`

这通常是由于模型返回的结果为空导致的错误。常见于Google系，可能为 Google 的安全审查导致，具体成因未知。

解决方法，更换模型或更改人设。

没搞完临时放这里