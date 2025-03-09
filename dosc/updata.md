# 🆙 更新应用

当 NekroAgent 新版本发布时，你可以使用以下一键命令更新应用

```bash
# 设置数据目录
export NEKRO_DATA_DIR=${HOME}/srv/nekro_agent
# 更新 `nekro-agent` 镜像并重启容器
cd ${NEKRO_DATA_DIR} && \
 sudo -E docker-compose --env-file .env pull && \
 sudo -E docker-compose --env-file .env down && \
 sudo -E docker-compose --env-file .env up --build -d
```