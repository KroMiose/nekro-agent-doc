---
title: Windows 部署 Nekro Agent (通过 WSL2)
description: 在 Windows 系统上通过 WSL2 部署 Nekro Agent 的详细步骤，推荐使用一键安装脚本。
---

# Windows (WSL2) 部署教程

本文档将指导您在 Windows 系统上，通过适用于 Linux 的 Windows 子系统 (WSL2) 部署 Nekro Agent。我们强烈推荐使用我们提供的一键化安装脚本，它能为您自动处理好所有环境配置和安装步骤。

## <DocIcon name="rocket" /> 一键安装 (推荐)

该脚本将全自动完成以下工作：
- 检查并启用 WSL2 和虚拟化相关功能 (可能需要重启一次电脑)。
- 下载并安装一个专用于 Nekro Agent 的 Debian 系统环境。
- 在该环境中自动执行 Linux 版的安装脚本，完成 Agent 的部署。

### 环境要求
- Windows 10 版本 2004 及更高版本，或 Windows 11。
- 已在电脑的 BIOS/UEFI 中启用硬件虚拟化。如果不确定，可以先尝试运行脚本，若失败再检查此项。

### 安装步骤

1.  **以管理员身份打开 PowerShell**。
    - 在开始菜单搜索 "PowerShell"，右键点击 "Windows PowerShell"，选择 "以管理员身份运行"。

2.  **设置执行策略** (如果首次运行脚本)。
    在 PowerShell 中输入以下命令并回车，以允许执行本次的安装脚本：
    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force
    ```

3.  **执行安装脚本**。
    复制并粘贴以下命令到 PowerShell 中并执行：
    ```powershell
    irm https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/install.ps1 | iex
    ```

4.  **遵循脚本提示完成安装**。
    - 脚本会首先进行环境准备，此过程可能提示您需要 **重启电脑**。如果需要，请重启后以相同方式 **再次运行脚本**。
    - 环境准备就绪后，脚本会自动创建名为 `nekro-agent` 的 WSL 环境，并拉起一个新的终端窗口在其中执行 Linux 版的安装脚本。
    - 您需要在这个新的终端窗口中，根据 [Linux 部署教程](../linux.md) 的指引，进行交互式选择（例如是否安装 Napcat 等）。

### 自定义安装路径

默认情况下，WSL 虚拟磁盘文件将安装在 `C:\Users\<您的用户名>\AppData\Local\NekroAgent`。如果您想指定其他安装位置（例如 D 盘），可以在执行脚本时通过 `-InstallPath` 参数指定：

```powershell
# 将 <您的路径> 替换为您想要的文件夹路径
$scriptContent = irm https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/install.ps1
iex "& { $scriptContent } -InstallPath '<您的路径>'"
```

### 网络问题处理

如果因为网络原因无法执行上述 `irm` 命令，您可以：
1.  手动下载脚本文件 `wslinstall.ps1`：[点击下载](https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/wslinstall.ps1)
2.  将下载好的 `wslinstall.ps1` 文件保存到电脑中（例如 `D:\`）。
3.  在管理员 PowerShell 中，执行本地的脚本文件，同样可以附加 `-InstallPath` 参数：
    ```powershell
    # 示例：脚本保存在 D:\wslinstall.ps1，安装到 D:\WSL\NekroAgent
    D:\wslinstall.ps1 -InstallPath 'D:\WSL\NekroAgent'
    ```

## <DocIcon name="settings" /> 部署后操作

安装完成后，您可以随时通过以下方式管理您的 Nekro Agent 环境：

- **进入 WSL 环境**:
  打开 PowerShell 或 CMD，输入以下命令即可进入 Nekro Agent 所在的 Linux 环境：
  ```powershell
  wsl -d nekro-agent
  ```
  - 默认用户名: `nekro`
  - 默认密码: `123456`

- **后续操作**:
  进入 WSL 环境后，所有操作均与 Linux 环境一致。您可以参考 [Linux 部署教程](../linux.md) 进行查看日志、管理服务等操作。

## <DocIcon name="hand" /> 手动安装

如果您不想使用自动化脚本，或者希望在已有的 WSL 发行版中进行安装，可以按照以下步骤操作：

1.  **安装 WSL2**:
    按照 [微软官方文档](https://learn.microsoft.com/zh-cn/windows/wsl/install) 指引，安装并配置好一个 WSL2 发行版 (如 Ubuntu)。

2.  **进入 WSL 环境**:
    启动您安装的 WSL 发行版。

3.  **遵循 Linux 部署教程**:
    在 WSL 终端中，完全参照 [Linux 部署教程](../linux.md) 的步骤进行部署即可。

## 附录：常用 WSL 命令

为了方便初次接触 WSL 的用户，这里列出了一些常用的管理命令。您可以在 Windows 的 PowerShell 或 CMD 中执行它们。

- **列出已安装的 Linux 发行版**
  ```powershell
  wsl --list --verbose
  # 简写: wsl -l -v
  ```
  这个命令会显示所有已安装的发行版、它们的运行状态（Running/Stopped）以及所使用的 WSL 版本（1 或 2）。

- **启动、停止和重启 WSL**
  ```powershell
  # 启动指定的发行版 (我们的是 nekro-agent)
  wsl -d nekro-agent

  # 终止指定的发行版 (相当于让其重启)
  wsl --terminate nekro-agent

  # 关闭所有正在运行的发行版和 WSL 服务
  wsl --shutdown
  ```
  如果遇到网络问题或其它奇怪的故障，尝试运行 `wsl --shutdown` 后再重新启动发行版通常能解决问题。

- **访问文件系统**
  - **从 Windows 访问 WSL 文件**:
    在文件资源管理器的地址栏输入 `\\wsl$` 并回车，即可看到所有已安装的发行版的文件系统。`nekro-agent` 的文件通常位于 `\\wsl$\nekro-agent\` 目录下。
  - **从 WSL 访问 Windows 文件**:
    在 WSL 终端中，您的 Windows 盘符被挂载在 `/mnt/` 目录下。例如，C 盘的路径是 `/mnt/c`，D 盘是 `/mnt/d`。

- **卸载发行版 (危险操作！)**
  如果您需要彻底删除 `nekro-agent` 的 WSL 环境，可以使用以下命令。
  **警告：此操作会删除该发行版内的所有数据且无法恢复！**
  ```powershell
  wsl --unregister nekro-agent
  ```
