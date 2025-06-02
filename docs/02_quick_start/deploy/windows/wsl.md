---
title: Windows 部署 Nekro Agent for WSl2
description: 在 Windows 系统上使用 WSL2 部署 Nekro Agent 的详细步骤
---

# 基于 Linux 的 Windows 子系统
## 🌈 环境准备

由于 Nekro Agent 基于 Docker 运行，我们需要先在 Windows 上安装 WSL2（Windows Subsystem for Linux 2）。

<<<<<<< HEAD
### 安装 WSL2
=======
> 须确保设备支持且在 BIOS/UEFI 已启用虚拟化（不清楚可先继续后续步骤）

### 脚本安装

在 PowerShell 执行以下命令：

  > 脚本逻辑：
  >
  > 1. 检测提权
  > 2. 确保已启用 WSL2 相关功能（可能需要重启，视脚本运行结果而定）
  > 3. 以 `nekro-agent` 名称安装 debian 发行版
  > 4. 对发行版进行用户、/etc/wsl.conf 等配置

  1. 确保可执行脚本：

  ```ps1
  Set-ExecutionPolicy Bypass -Scope Process -Force
  ```

  2. 执行在线脚本：

  发行版 `vhdx` 文件默认位于 `"$env:LOCALAPPDATA\NekroAgent"`

  ```powershell
  irm https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/install.ps1 | iex
  ``` 

  脚本提供了 InstallPath 选项供自定义导入位置，例如：

  ```powershell
  $scriptUrl = "https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/install.ps1"
  iex "& { $(irm $scriptUrl) } -InstallPath 'D:\WSL\NekroAgent'"
  ```

  由于该 `install.ps1` 脚本会获取另一个位于 GitHub 的脚本 ，若安装环境无法连接 Github，可能无法正常工作，可下载使用实际脚本 [wslinstall.ps1](https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/wslinstall.ps1)。

### 手动安装
>>>>>>> fc3ebb314ee81d2197c7ab5a5dec45711986aadf

1. 以管理员身份打开 PowerShell，执行以下命令启用 WSL 功能：

```powershell
wsl --install
```

<<<<<<< HEAD
2. 重启电脑完成安装
3. 启动 Ubuntu（默认安装的发行版），设置用户名和密码
=======
默认安装 Ubuntu，若想使用其他发行版请使用 `wsl --install <Distribution Name>` 或使用 `wsl --install --no-distribution` 仅安装必要组件。可用发行版见`wsl -l -o`

2. 重启电脑完成安装
3. 启动 Ubuntu（默认安装的发行版）完成用户设置，或选择安装指定发行版
>>>>>>> fc3ebb314ee81d2197c7ab5a5dec45711986aadf
4. 确认 WSL2 安装成功：

```powershell
wsl -l -v
```

输出应显示 VERSION 为 2

## 🚀 部署方式

在 WSL2 的 Ubuntu 终端中进行以下操作：

<<<<<<< HEAD
### 方式一：标准部署（推荐）

集成 Napcat 协议端的自动化部署版本，一键完成所有服务组件与协议端部署

```bash
sudo -E bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/quick_start_x_napcat.sh)"
```

如果部署过程出现网络问题无法正确下载脚本，可使用国内 GitCode 加速部署命令：

> 注意: GitCode 加速的部署方式依赖于 GitCode 同步速度，可能无法及时同步最新版本，如有条件尽量使用 Github 脚本部署

```bash
sudo -E bash -c "$(curl -fsSL https://raw.gitcode.com/gh_mirrors/ne/nekro-agent/raw/main/docker/quick_start_x_napcat.sh)" - -g
```

::: warning 注意事项

- 默认安装目录：`~/srv/nekro_agent`
- 如需修改安装目录：执行 `export NEKRO_DATA_DIR=<你的目录>`
- 本地部署需放行端口：
  - 8021：NekroAgent 主服务
  - 6099：Napcat 服务
- 请注意保存安装脚本中提供的面板登陆信息，以便后续配置使用
- 如有防火墙提示，请允许访问

:::

按照提示完成部署后，按照[协议端配置](/docs/02_quick_start/config/protocol.html#napcat-集成部署-推荐)文档说明完成配置

### 方式二：核心部署

仅部署 NekroAgent 核心服务组件，需要自行配置 OneBot V11 协议端。

```bash
sudo -E bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/quick_start.sh)"
```

监听的协议端连接地址：`ws://<你的服务ip>:8021/onebot/v11/ws`

### 部署后配置

前往[协议端配置](/docs/02_quick_start/config/protocol)文档，根据文档说明完成配置。
=======
WSL 环境与 Linux 几乎一致，后续步骤见 [Linux 部署教程](/docs/02_quick_start/deploy/linux#Linux-部署教程)
>>>>>>> fc3ebb314ee81d2197c7ab5a5dec45711986aadf
