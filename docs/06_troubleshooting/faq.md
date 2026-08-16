---
title: 常见问题解答(FAQ)
description: Nekro Agent 使用过程中的常见问题和解决方法汇总，涵盖部署、配置、工作区和功能相关的各类常见问题
---

# 常见问题解答

本文档收集了使用 Nekro Agent 过程中的常见问题和解决方法。

## 部署相关

### Q: Docker 容器无法启动

**A**: 常见原因包括：

1. 端口冲突：检查 8021 和 6099 端口是否被占用
2. 配置文件错误：检查 configs/nekro-agent.yaml 格式是否正确
3. 权限问题：确保安装目录有正确的权限

查看日志以获取详细错误信息：

```bash
docker-compose logs -f nekro_agent
```

### Q: 安装后无法访问 WebUI

**A**: 请检查：

1. 容器是否正常运行：`docker-compose ps`
2. 防火墙是否开放了 8021 端口
3. 服务器安全组设置是否允许该端口访问
4. 尝试使用不同的浏览器访问

### Q: 出现 `Cannot connect to the Docker daemon` 错误

**A**: Docker 服务未启动或用户权限问题。

```bash
sudo systemctl start docker
```

### Q: 出现 `port is already allocated` 错误

**A**: 指定的端口已被其他程序占用。

```bash
# 查看占用端口的进程
sudo lsof -i :8021

# 修改 .env 文件中的端口配置
vim .env
# 修改 NEKRO_AGENT_PORT 或 NAPCAT_PORT 为其他未占用端口
```

### Q: 出现 `Failed to pull image` 错误

**A**: 网络连接问题或 Docker Hub 访问受限。解决方法：配置 Docker 镜像加速。

### Q: 如何在同一设备上部署多个 NekroAgent 实例?

**A**: 请先使用 `export NEKRO_DATA_DIR=<您的目录>` 设置好不冲突的目录，然后运行安装脚本并按提示修改 `.env` 文件，设置合适的前缀以避免容器名冲突，设置合适的端口以避免端口冲突，继续完成部署即可

## 配置相关

### Q: 如何更改默认端口？

**A**: 编辑 `.env` 文件，修改以下变量：

```
NEKRO_AGENT_PORT=8021  # 修改为您希望的端口
NAPCAT_PORT=6099       # 如果使用 NapCat，也可以修改该端口
```

修改后需要重启服务：`docker-compose down && docker-compose up -d`

### Q: 模型 API 调用失败怎么办？

**A**: 可能的原因包括：

1. API 密钥错误：检查 API_KEY 配置
2. 网络问题：检查网络连接，一些模型供应商可能需要配置代理才能访问
3. 模型名称错误：确认 CHAT_MODEL 名称是否正确
4. 余额不足：检查 API 账户余额

### Q: 怎么知道模型组配置是否生效？

**A**: 配置模型组后，在任意已激活的频道中发送一条消息。如果 AI 正常响应，说明主对话模型组配置正确。如果报错，检查 WebUI 日志页面中的错误详情。

### Q: 配置文件修改后不生效

**A**: 直接修改配置文件后，需要执行以下操作之一：

1. 在聊天平台中发送 `/conf-reload` 命令（需要管理员权限）
2. 重启 Nekro Agent 服务

建议优先使用 WebUI 修改配置，修改后点击「保存」即可立即生效。

## 工作区相关

### Q: 主对话能用，但 Claude Code 沙盒不能用

**A**: 最常见的原因是没有给工作区单独配置 **CC 模型组**。Claude Code 沙盒使用独立的 CC 模型组，不会继承主对话模型。请在工作区设置中选择可用的 CC 模型组。

### Q: 沙盒启动失败或提示镜像未准备好

**A**: 请按以下步骤处理：

1. 检查工作区页面是否有镜像拉取提示，按提示完成拉取
2. 确认 Docker 能正常拉取镜像（网络问题可考虑配置镜像加速）
3. 确认服务器磁盘空间充足
4. 拉取完成后重新启动沙盒

### Q: 工作区建好了，但任务串来串去

**A**: 通常是频道绑定不正确。检查以下几点：

1. 确认频道已绑定到正确的工作区
2. 不同用途的频道不要绑到同一个工作区
3. 一般建议一个频道对应一个工作区

### Q: 记忆系统启用后没有效果

**A**: 记忆系统需要满足以下条件：

1. 在「系统配置」中将 `MEMORY_ENABLE_SYSTEM` 设为 `true`
2. 配置了可用的 embedding 模型组（`MEMORY_EMBEDDING_MODEL_GROUP`）
3. embedding 维度与所选模型匹配（`MEMORY_EMBEDDING_DIMENSION`）
4. 工作区已绑定频道，且频道有足够的历史消息供沉淀
5. Qdrant 向量数据库服务正常运行

### Q: 知识库上传后 AI 没有使用其中的内容

**A**: 检查以下几点：

1. 确认 `KB_EMBEDDING_MODEL_GROUP` 已配置且有效
2. 确认知识库已绑定到对应工作区
3. 确认文件已成功处理（查看知识库列表中的状态）
4. Qdrant 向量数据库服务是否正常

### Q: MCP 服务无法使用

**A**: MCP 服务依赖 Claude Code 沙盒。需要确认：

1. 当前工作区已启用 Claude Code 沙盒
2. 沙盒运行状态正常
3. MCP 服务配置正确
4. CC 模型组可用

## 功能相关

### Q: 为什么我的机器人无法发送 文字/图片 以外的文件内容?

**A**: 请检查您的协议实现是否支持文件发送，如果支持，请继续

由于 OneBot V11 协议的限制，发送文件时需要协议端能够直接访问到该文件的路径，因此您需要根据实际部署情况设为 NekroAgent 配置文件访问基准路径，以下是一个示例:

假设您的协议端部署在容器中，您需要先挂载 NekroAgent 的数据目录到协议端容器中，即 `${HOME}/srv/nekro_agent:/app/nekro_agent_data`，然后为 NekroAgent 配置文件访问基准路径:

```
SANDBOX_ONEBOT_SERVER_MOUNT_DIR: "/app/nekro_agent_data"
```

这样 NekroAgent 就可以访问到协议实现端的数据目录，从而发送文件内容了

### Q: AI 不响应我的消息怎么办？

**A**: 按优先级逐项排查：

1. 频道状态：确认频道未处于旁观或停用状态（在「频道管理」中查看）
2. 用户状态：确认用户未被禁止触发或封禁（在「用户管理」中查看）
3. 协议端连接：检查协议端是否正常连接
4. 模型配置：确认模型组配置正确且 API 可用
5. 日志排查：检查 WebUI 日志页面中的错误信息

### Q: 如何切换 AI 人设？

**A**: 在 WebUI 的「人设管理」中设置好人设信息，在「会话管理」中选择人设

### Q: 沙盒执行代码超时怎么办？

**A**: 调整沙盒执行时间限制：

```yaml
SANDBOX_RUNTIME_LIMIT: 60 # 调整为更大的值，单位为秒
```

### Q: 命令不起作用

**A**: 按以下顺序排查：

1. 确认全局命令开关已开启（`COMMAND_ENABLED`）
2. 确认该命令在命令中心中处于启用状态
3. 确认当前用户权限满足命令要求
4. 如果是频道内的命令，检查频道覆盖配置

### Q: 定时器创建后没有触发

**A**: 检查以下几点：

1. 定时器状态是否为活跃（未暂停）
2. cron 表达式是否正确
3. 时区设置是否匹配
4. 如果绑定了工作区，确认工作区状态正常

### Q: 如何彻底卸载 Nekro Agent？

**A**: 执行以下命令：

```bash
# 停止并删除容器
cd <您的安装目录>
sudo docker-compose down

# 删除挂载卷 (如果安装时设置了实例前缀，以下挂载卷需要添加上对应的前缀)
sudo docker volume rm nekro_postgres_data
sudo docker volume rm nekro_qdrant_data

# 可选：删除镜像
sudo docker rmi kromiose/nekro-agent kromiose/nekro-agent-sandbox

# 删除安装目录
cd ..
rm -rf <安装目录>
```

## 获取支持

如果以上方法无法解决您的问题，可以通过以下渠道获取支持：

1. 查阅 [GitHub Issues](https://github.com/KroMiose/nekro-agent/issues)
2. 加入官方 QQ 群: 636925153
3. 提交新的 Issue 描述您的问题
