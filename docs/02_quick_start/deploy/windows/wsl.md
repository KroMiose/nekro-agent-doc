---
title: Windows 部署 Nekro Agent for WSl2
description: 在 Windows 系统上使用 WSL2 部署 Nekro Agent 的详细步骤
---

# 基于 Linux 的 Windows 子系统
## 🌈 环境准备

由于 Nekro Agent 基于 Docker 运行，我们需要先在 Windows 上安装 WSL2（Windows Subsystem for Linux 2）。

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

1. 以管理员身份打开 PowerShell，执行以下命令启用 WSL 功能：

```powershell
wsl --install
```

默认安装 Ubuntu，若想使用其他发行版请使用 `wsl --install <Distribution Name>` 或使用 `wsl --install --no-distribution` 仅安装必要组件。可用发行版见`wsl -l -o`

2. 重启电脑完成安装
3. 启动 Ubuntu（默认安装的发行版）完成用户设置，或选择安装指定发行版
4. 确认 WSL2 安装成功：

```powershell
wsl -l -v
```

输出应显示 VERSION 为 2

## 🚀 部署方式

在 WSL2 的 Ubuntu 终端中进行以下操作：

WSL 环境与 Linux 几乎一致，后续步骤见 [Linux 部署教程](/docs/02_quick_start/deploy/linux#Linux-部署教程)
