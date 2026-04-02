---
title: 应用更新指南
description: Nekro Agent 应用更新的方法与步骤，包括编排更新命令和更新日志查看途径
---

# 应用更新

Nekro Agent 会定期发布更新，包括功能改进、bug 修复和安全补丁。本文档将介绍如何安全地更新您的 Nekro Agent 实例。

## 🚀 编排更新（推荐）

Nekro Agent 提供了简便的编排更新命令，当新版本发布时，你可以使用以下一键命令更新应用

::: warning 注意事项

如果使用了 Wsl 或 OrbStack 虚拟机部署，以下命令需要进入虚拟机中执行

:::

::: tip 小贴士

若您使用 NekroAgent Windows 启动器安装，可跳转[启动器更新流程](/docs/02_quick_start/config/update.md#启动器更新流程)观看

:::

### 进入数据目录

```bash
# 如果修改了数据目录，请根据实际情况设置
export NEKRO_DATA_DIR=${HOME}/srv/nekro_agent && \
cd ${NEKRO_DATA_DIR}
```

### 仅更新 Nekro Agent 和沙盒镜像 (推荐)

```bash
sudo docker pull kromiose/nekro-agent-sandbox:latest && \
sudo docker-compose --env-file .env pull nekro_agent && \
sudo docker-compose --env-file .env up --build -d nekro_agent
```

### 更新所有镜像并重启容器 (如果需要同时更新 NapCat 或其他数据支持服务)

> 该命令会更新 `nekro-agent` 镜像和所有依赖的镜像，可能导致 Bot 掉线需要重新登录

```bash
sudo docker pull kromiose/nekro-agent-sandbox:latest && \
sudo docker-compose --env-file .env pull && \
sudo docker-compose --env-file .env up --build -d
```

### 启动器更新流程

进入`镜像管理`页面，点击检查更新，后按照弹窗提示进行操作即可，如下图所示
![更新](/assets/windows/manage9.png)

## 🧪 切换到预览版

如果你想提前体验最新功能，或协助测试尚未进入正式版的更新，可以将部署镜像从 `latest` 切换为 `preview`。

::: warning 注意事项

- `preview` 会跟随 `main` 分支持续更新，功能更新更快，但也更可能包含尚未充分验证的改动。
- 如果你的实例用于稳定生产环境，建议继续使用 `latest`。
- 以下步骤默认你使用的是安装脚本生成的 `docker-compose.yml`，且文件位于数据目录中。

:::

::: tip 小贴士

若您使用 NekroAgent Windows 启动器安装，可跳转[启动器切换预览版流程](/docs/02_quick_start/config/update.md#启动器切换预览版流程)观看

:::

### 第一步：确认当前镜像标签

```bash
grep -n "image: kromiose/nekro-agent" docker-compose.yml
```

如果输出中已经是 `kromiose/nekro-agent:preview`，可以直接执行下方的升级命令。

### 第二步：将主镜像标签从 `latest` 改为 `preview`

```bash
sed -i 's|image: kromiose/nekro-agent:latest|image: kromiose/nekro-agent:preview|g' docker-compose.yml
```

如果你使用的是 macOS 自带的 `sed`，请改用：

```bash
sed -i '' 's|image: kromiose/nekro-agent:latest|image: kromiose/nekro-agent:preview|g' docker-compose.yml
```

修改后可再次检查：

```bash
grep -n "image: kromiose/nekro-agent" docker-compose.yml
```

### 第三步：拉取预览版镜像并执行升级

```bash
sudo docker pull kromiose/nekro-agent-sandbox:preview && \
sudo docker-compose --env-file .env pull nekro_agent && \
sudo docker-compose --env-file .env up --build -d nekro_agent
```

如果你还希望同时更新 NapCat 或其他依赖服务，可以改用：

```bash
sudo docker pull kromiose/nekro-agent-sandbox:preview && \
sudo docker-compose --env-file .env pull && \
sudo docker-compose --env-file .env up --build -d
```

### 第四步：确认是否切换成功

```bash
sudo docker-compose --env-file .env ps
```

如需查看主服务日志，可执行：

```bash
sudo docker-compose --env-file .env logs -f nekro_agent
```

### 启动器切换预览版流程

1. 进入`系统设置`页面，点击`启用高级功能`按钮，然后回到`总览控制台`点击`切换至预览版`按钮，后根据提示操作即可，如下图所示
![切换](/assets/windows/manage10.png)

### 如何切回正式版

将 `docker-compose.yml` 中的镜像标签改回 `latest`，然后重新执行一次正式版更新命令即可：

```bash
sed -i 's|image: kromiose/nekro-agent:preview|image: kromiose/nekro-agent:latest|g' docker-compose.yml
```

若您通过启动器切换至预览版的同时，备份了正式版数据，可在`总览控制台`点击`恢复正式版`按钮后，根据提示操作，如下图所示
![降级](/assets/windows/manage11.png)

## 📝 更新日志

每次更新后，可以在 [GitHub Releases](https://github.com/KroMiose/nekro-agent/releases) 查看更新日志了解变更内容
