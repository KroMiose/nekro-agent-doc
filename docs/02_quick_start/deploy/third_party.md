---
title: Nekro Agent 社区部署脚本
description: 使用社区部署脚本快速部署 Nekro Agent。
---

# 社区安装脚本推荐

本文档将推荐社区的安装脚本，以便于Nekro-Agent安装部署。

##  [Nekro-Agent-Toolkit](https://github.com/greenhandzdl/nekro-agent-toolkit)

* 环境要求:

  - `sudo`:用于提权，以配置好docker权限不用
  - `docker`和`docker-compose` `docker compose`，或者Mac上用`orbstack`
  - `python3`, `pipx`
* 安装：
  
```bash
pipx install nekro-agent-toolkit
```

* 优势：
  - 完整的工具箱支持**安装、更新、备份**一条龙工作。
  - 理论上**跨平台**带来统一的用户体验。
  
* 使用说明：

  ##### 安装`Nekro-Agent`
```zsh
# 推荐：设置默认数据目录，后面可以省略<data_dir>参数
❯ nekro-agent-toolkit -st <data_dir>

# 仅生成.env文件，不安装。
❯ nekro-agent-toolkit -i <data_dir> --dry-run
# 完整部署（带NapCat，推荐）
❯ nekro-agent-toolkit -i <data_dir> --with-napcat
# 交互安装
❯ nekro-agent-toolkit -i <data_dir>
```

  ##### 帮助`Nekro-Agent-Toolkit`
```zsh
# 可以参考：https://github.com/greenhandzdl/nekro-agent-toolkit
❯ nekro-agent-toolkit -h
```

> [!WARNING]
> ### Nekro-Agent安装后说明： 
> 
>   [快速开始](../quickstart.html#基本配置)
> 
>   [NapCat登陆并修改默认密码](../config/protocol.html)
>
>   [Nekro-Agent相关项配置](../config/system.html)
