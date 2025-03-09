# 📖 常见问题

## Q: 为什么我的机器人无法发送 文字/图片 以外的文件内容？

A: 请检查你的协议实现端是否支持文件发送，如果支持，请继续

由于 OneBot V11 协议的限制，发送文件时需要协议端能够直接访问到该文件的路径，因此你需要根据实际部署情况为 NekroAgent 配置文件访问基准路径，以下是一个示例:

假设你的协议端部署在容器中，你需要先挂载 NekroAgent 的数据目录到协议端容器中，即 `${HOME}/srv/nekro_agent_data:/app/nekro_agent_data`，然后为 NekroAgent 配置文件访问基准路径:

```yaml
SANDBOX_ONEBOT_SERVER_MOUNT_DIR: "/app/nekro_agent_data"
```

这样 NekroAgent 就可以访问到协议实现端的数据目录，从而发送文件内容了

## Q: 如何在同一设备上部署多个 NekroAgent 实例？

A: 请先使用 `export NEKRO_DATA_DIR=<你的目录>` 设定好不冲突的目录，然后运行安装脚本并按提示修改 `.env` 文件，设定合适的前缀以避免容器名冲突，设定合适的端口以避免端口冲突，继续完成部署即可
