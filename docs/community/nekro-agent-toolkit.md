---
title: Nekro-Agent-Toolkit
description: 使用Nekro-Agent-Toolkit快速部署NekroAgent。
---

# Nekro-Agent-Toolkit

> Nekro-Agent-Toolkit 是一个用于安装、更新、备份 Nekro Agent 的工具。

##  [Nekro-Agent-Toolkit](https://github.com/greenhandzdl/nekro-agent-toolkit)

> [!NOTE]
> Windows\Linux\MacOS 环境均已通过测试，BSD环境可能兼容。
> Windows用户需要仔细阅读[用户文档](https://github.com/greenhandzdl/nekro-agent-toolkit/wiki)，否则会遇到启动NekroAgent的已知错误。

* 环境要求:

  - `sudo`:用于提权，Windows环境下不要选择提权（没有任何操作需要提权，只需要重试），Linux环境下如果配置好docker的用户权限，则不需要提权，MacOS环境下需要提权。
  - Windows环境:`docker desktop`
  - Linux环境:`docker`和`docker-compose` `docker compose`
  - MacOS环境:`orbstack`
  - `python3`, `pipx`
  - 选择性依赖:`zstd`，`ufw`

* 优势：
  - 完整的工具箱支持**安装、更新、备份**一条龙工作。
  - 理论上**跨平台**带来统一的用户体验。

* [用户文档(戳我阅读)](https://github.com/greenhandzdl/nekro-agent-toolkit/wiki):如果看不懂，你可能需要沉浸式翻译器等翻译插件。
  
* 功能介绍：

```zsh
~
❯ nekro-agent-toolkit -v
nekro-agent-toolkit 1.4.19

~
❯ nekro-agent-toolkit -h
usage: nekro-agent-toolkit [-h] [-i [PATH] | -u [PATH] | -ua [PATH] |
                           -b [ARG ...] | -r [ARG ...] | -ri ARG [ARG ...] |
                           -v] [-sd [PATH]] [--with-napcat] [--dry-run] [-y]

Nekro Agent 安装、更新与备份的统一管理工具。

options:
  -h, --help            show this help message and exit
  -i, --install [PATH]  安装 Nekro Agent 到指定路径。
  -u, --update [PATH]   对指定路径的安装执行部分更新。
  -ua, --upgrade [PATH]
                        对指定路径的安装执行完全更新（升级）。
  -b, --backup [ARG ...]
                        备份数据目录到指定文件夹。
  -r, --recovery [ARG ...]
                        从备份文件恢复到指定数据目录。
  -ri, --recover-install ARG [ARG ...]
                        恢复并安装。这会解压备份文件到目标目录，然后在此之上运行安装流程。
  -v, --version         显示版本信息。
  -sd, --set-data [PATH]
                        设置或清除默认数据目录。
  --with-napcat         与 --install 或 --recover-install 配合使用，部署 NapCat 服务。
  --dry-run             与 --install 或 --recover-install 配合使用，执行预演。
  -y, --yes             自动确认所有提示，以非交互模式运行。

用法示例:
  nekro-agent-toolkit --install ./na_data
    # 在 ./na_data 目录中安装 Nekro Agent

  nekro-agent-toolkit --update ./na_data
    # 对指定目录的安装执行部分更新

  nekro-agent-toolkit --upgrade ./na_data
    # 对指定目录的安装执行完全更新（升级）

  nekro-agent-toolkit --backup ./na_data ./backups
    # 备份 na_data 目录到 backups 文件夹

  nekro-agent-toolkit --recovery ./backups/na_backup_123.tar.zstd ./na_data_new
    # 从备份文件恢复到 na_data_new 目录

  nekro-agent-toolkit --recover-install ./backup.tar.zst ./restored_install
    # 从备份恢复数据，并在此基础上执行安装
```

> [!WARNING]
> ### NekroAgent安装后建议阅读： 
> 
>   [快速开始#基本配置](/docs/02_quick_start/quickstart.html#基本配置)
> 
>   [NapCat登陆并修改默认密码](/docs/02_quick_start/config/protocol.html)
>
>   [NekroAgent相关项配置](/docs/02_quick_start/config/system.html)
