---
title: Windows 部署 Nekro Agent for Hyper-V
description: 在 Windows 系统上使用 Hyper-V 部署 Nekro Agent 的详细步骤
---

# Windows for Hyper-V 部署教程

本文档将指导您在 Windows 系统上部署 Nekro Agent。

## 🌈 环境准备

由于 Nekro Agent 基于 Docker 运行，我们需要先在 Windows 上安装 Hyper-V。

### 安装 Hyper-V

启用 Hyper-V 在 Windows 上创建虚拟机。 可以通过多种方式启用 Hyper-V，包括使用 Windows 控制面板、PowerShell 或使用部署映像服务和管理工具（DISM）。 本文逐步讲解每个选项。

::: info 备注
Hyper-V 作为可选功能内置于 Windows 中，无需下载 Hyper-V。
:::

#### 检查 Windows 系统要求
Windows 10（专业版或企业版），或 Windows 11（专业版或企业版）
具有二级地址转换的 64 位处理器（SLAT）。
CPU 支持 VM 监视器模式扩展（Intel CPU 上的 VT-c）。
最小内存为 4 GB。

::: info 备注
无法在 Windows 10 家庭版或 Windows 11 家庭版上使用正常方法安装 Hyper-V 角色。
:::

有关详细信息和故障排除，请参阅 Windows Hyper-V 系统要求。

#### 使用 PowerShell 启用 Hyper-V
在 Windows 桌面上，选择“开始”按钮并键入名称 Windows PowerShell 的任何部分。

右键单击 Windows PowerShell，然后选择“ 以管理员身份运行”。

::: warning 警告
必须以管理员身份运行 PowerShell，否则命令将失败。
:::

1.运行下面的命令：
```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```
![enable-hyper-v-powershell](/assets/windows/enable-hyper-v-powershell.png)

2.输入 Y ，让计算机重启以完成安装。

### 使用 CMD 和 DISM 启用 Hyper-V
部署映像服务和管理工具（DISM）可帮助配置 Windows 和 Windows 映像。 在其许多应用程序中，DISM 可以在作系统运行时启用 Windows 功能。

要使用 DISM 启动 Hyper-V 角色，请执行以下步骤：

1.在 Windows 桌面上，选择“开始”按钮并键入名称 Windows PowerShell 的任何部分。

2.右键单击 Windows PowerShell，然后选择“ 以管理员身份运行”。

3.键入以下命令：

```powershell
DISM /Online /Enable-Feature /All /FeatureName:Microsoft-Hyper-V
```
![enable-hyper-v-dism](/assets/windows/enable-hyper-v-dism.png)

4.可以看到该功能已启用，并且“操作已成功完成”。

### 通过“设置”启用 Hyper-V 角色
1.选择 “开始”，然后搜索并选择 “设置”

2.选择 “应用”和“功能”。 然后选择 “程序和功能”

3.选择 打开或关闭的 Windows 功能。

4.选择 Hyper-V ，然后选择“ 确定”。

5.重新启动计算机以完成安装。

### 在 Windows 10 上启用 Hyper-V
在 Windows 11 上启用 Hyper-V
导航到控制面板。 选择 “开始”，然后搜索 控制面板 以打开该应用程序。

1.选择 “程序”，然后选择 “程序和功能”。

2.选择 “打开或关闭 Windows 功能”。

3.选择 Hyper-V ，然后选择“ 确定”。
![enable-hyper-v](/assets/windows/enable-hyper-v.png)

安装完成后，系统会提示重启计算机。

## 使用 Hyper-V 安装 Linux 虚拟机
### 安装 Linux 虚拟机
1.打开 Hyper-V 管理器。 选择 “快速创建”，然后选择 Ubuntu 22.04 LTS 

2.选择 “创建虚拟机”。

3.等待创建完成后启动并设置系统

@[bilibili](BV1BqJizaEDs)

## 安装 Nekro Agent
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
- 云服务器需放行端口：
  - 8021：NekroAgent 主服务
  - 6099：Napcat 服务
- 请注意保存安装脚本中提供的面板登陆信息，以便后续配置使用

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
