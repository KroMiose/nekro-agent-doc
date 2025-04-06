# 🔄 更新 Nekro Agent

::: tip 提示
建议您定期关注 更新日志，及时了解 Nekro Agent 的新功能、修复与优化内容。
:::

## 一键更新脚本（Linux）

当 Nekro Agent 发布新版本时，可以通过以下命令快速拉取镜像并重启服务：

::: warning 注意
**仅支持 Linux 系统，Windows 用户请勿使用该脚本。**
:::

```bash
# 设置数据目录（如未自定义安装目录请勿修改）
export NEKRO_DATA_DIR=${HOME}/srv/nekro_agent

# 进入目录并执行更新
cd ${NEKRO_DATA_DIR} && \
sudo -E docker-compose --env-file .env pull && \
sudo -E docker-compose --env-file .env down && \
sudo -E docker-compose --env-file .env up --build -d
```

---

## 🧹 数据库重置（可选）

::: warning 注意
某些版本更新可能会导致数据库结构不兼容，**请谨慎执行数据库重置操作，数据将被清空**。
:::

如遇数据库错误或需要全新部署，可执行以下命令重置数据库：

### 请在 QQ 内执行以下命令：

```bash 
/nekro_db_reset
```

> ⚠️ **此操作不可恢复，请务必备份数据后再执行。**