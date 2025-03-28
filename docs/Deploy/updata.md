# 更新 Nekro Agent

::: tip 提示
请您务必关注 Nekro Agent 的更新日志，以了解新版本的新功能和改进。
:::

当 NekroAgent 新版本发布时，你可以使用以下一键命令更新应用:
::: warning 注意
Windows 用户无法使用此命令
:::
```bash
# 设置数据目录
export NEKRO_DATA_DIR=${HOME}/srv/nekro_agent
# 更新 `nekro-agent` 镜像并重启容器
cd ${NEKRO_DATA_DIR} && \
 sudo -E docker-compose --env-file .env pull && \
 sudo -E docker-compose --env-file .env down && \
 sudo -E docker-compose --env-file .env up --build -d
```

::: warning 注意
部分更新可能需要重置数据库
:::

如果需要重置数据库，请执行以下命令：

```bash
我是重置数据库的命令
```