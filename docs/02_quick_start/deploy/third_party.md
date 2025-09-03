---
title: Nekro Agent 社区部署脚本
description: 使用社区部署脚本快速部署 Nekro Agent。
---

# 社区安装脚本推荐

本文档将推荐给你一些社区的安装脚本，以便于Nekro-Agent安装部署。

##  [Nekro-Agent-Toolkit](https://github.com/greenhandzdl/nekro-agent-toolkit)

* 环境要求:

  - `sudo`
  - `docker`和`docker-compose` `docker compose`，或者Mac上用`orbstack`
  - `python3`, `pipx`
* 安装：
  
```bash
pipx install nekro-agent-toolkit
nekro-agent-toolkit -h # nekro-agent-toolkit 帮助页面
```

* 优势：
  - 完整的工具箱支持安装、更新、备份一条龙工作。
  - 理论上跨平台带来统一的用户体验。
  
* 使用说明：

  ##### 安装`Nekro-Agent`
```zsh
# 仅生成.env供云端部署
❯ nekro-agent-toolkit -i ./ --dry-run
# 完整部署（带NapCat，推荐）
❯ nekro-agent-toolkit -i ./ --with-napcat
# 交互安装
❯ nekro-agent-toolkit -i ./  
```

##### 	更新`Nekro-Agent`

```zsh
# 仅仅更新Nekro-Agent
❯ nekro-agent-toolkit -u ./
# 更新所有容器
❯ nekro-agent-toolkit -ua ./
```

##### 	备份与恢复`Nekro-Agent`

```zsh
# 假设目录文件
❯ tree -L 1 na
na
├── configs
├── docker-compose.yml
├── napcat_data
├── plugin_data
├── plugins
└── wallpapers

6 directories, 1 file

# 备份（建议）
❯ nekro-agent-toolkit -b ./na ~/Documents
# 备份（不推荐）
❯ cd ./na && nekro-agent-toolkit -b ./ ~/Documents
# 恢复
❯ nekro-agent-toolkit -r  ~/Documents/na_backup_1756924863.tar.zstd ./na
# 迁移(如果遇到报错，可以尝试先恢复再安装)
❯ nekro-agent-toolkit -ri  ~/Documents/na_backup_1756924863.tar.zstd ./na
```

