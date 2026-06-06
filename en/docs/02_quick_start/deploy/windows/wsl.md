---
title: Windows Deployment of Nekro Agent (via WSL2)
description: Detailed steps for deploying Nekro Agent on Windows systems through WSL2, with recommended use of one-click installation script.
---

# Windows (WSL2) Deployment Tutorial

This document will guide you through deploying Nekro Agent on Windows systems through the Windows Subsystem for Linux (WSL2). We highly recommend using our one-click installation script, which will automatically handle all environment configuration and installation steps for you.

## <DocIcon name="rocket" /> One-Click Installation (Recommended)

This script will automatically complete the following tasks:
- Check and enable WSL2 and virtualization-related features (may require one computer restart).
- Download and install a Debian system environment specifically for Nekro Agent.
- Automatically execute the Linux version installation script in this environment to complete Agent deployment.

### Environment Requirements
- Windows 10 version 2004 and higher, or Windows 11.
- Hardware virtualization has been enabled in your computer's BIOS/UEFI. If unsure, you can try running the script first, and check this item if it fails.

### Installation Steps

1.  **Open PowerShell as Administrator**.
    - Search for "PowerShell" in the Start menu, right-click on "Windows PowerShell", and select "Run as administrator".

2.  **Set Execution Policy** (if running script for the first time).
    Enter the following command in PowerShell and press Enter to allow execution of this installation script:
    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force
    ```

3.  **Execute Installation Script**.
    Copy and paste the following command into PowerShell and execute:
    ```powershell
    irm https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/install.ps1 | iex
    ```

4.  **Follow Script Prompts to Complete Installation**.
    - The script will first prepare the environment, which may prompt you to **restart your computer**. If needed, please restart and **run the script again** in the same way.
    - After the environment is ready, the script will automatically create a WSL environment named `nekro-agent` and open a new terminal window to execute the Linux version installation script.
    - In this new terminal window, you need to make interactive choices according to the [Linux Deployment Tutorial](../linux.md) (such as whether to install Napcat, etc.).

### Custom Installation Path

By default, the WSL virtual disk file will be installed at `C:\Users\<Your Username>\AppData\Local\NekroAgent`. If you want to specify another installation location (such as D drive), you can specify it through the `-InstallPath` parameter when executing the script:

```powershell
# Replace <Your Path> with your desired folder path
$scriptContent = irm https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/install.ps1
iex "& { $scriptContent } -InstallPath '<Your Path>'"
```

### Network Issue Handling

If you cannot execute the above `irm` command due to network issues, you can:
1.  Manually download the script file `wslinstall.ps1`: [Click to download](https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/wslinstall.ps1)
2.  Save the downloaded `wslinstall.ps1` file to your computer (for example, `D:\`).
3.  In administrator PowerShell, execute the local script file, and you can also add the `-InstallPath` parameter:
    ```powershell
    # Example: Script saved in D:\wslinstall.ps1, install to D:\WSL\NekroAgent
    D:\wslinstall.ps1 -InstallPath 'D:\WSL\NekroAgent'
    ```

## <DocIcon name="settings" /> Post-Deployment Operations

After installation is complete, you can manage your Nekro Agent environment at any time through the following methods:

- **Enter WSL Environment**:
  Open PowerShell or CMD and enter the following command to enter the Linux environment where Nekro Agent is located:
  ```powershell
  wsl -d nekro-agent
  ```
  - Default username: `nekro`
  - Default password: `123456`

- **Subsequent Operations**:
  After entering the WSL environment, all operations are consistent with the Linux environment. You can refer to the [Linux Deployment Tutorial](../linux.md) for viewing logs, managing services, and other operations.

## <DocIcon name="hand" /> Manual Installation

If you don't want to use the automation script, or want to install in an existing WSL distribution, you can follow these steps:

1.  **Install WSL2**:
    Follow the [Microsoft official documentation](https://learn.microsoft.com/en-us/windows/wsl/install) to install and configure a WSL2 distribution (such as Ubuntu).

2.  **Enter WSL Environment**:
    Start your installed WSL distribution.

3.  **Follow Linux Deployment Tutorial**:
    In the WSL terminal, completely follow the steps in the [Linux Deployment Tutorial](../linux.md) for deployment.

## Appendix: Common WSL Commands

For users new to WSL, here are some commonly used management commands. You can execute them in Windows PowerShell or CMD.

- **List Installed Linux Distributions**
  ```powershell
  wsl --list --verbose
  # Abbreviation: wsl -l -v
  ```
  This command will display all installed distributions, their running status (Running/Stopped), and the WSL version they use (1 or 2).

- **Start, Stop, and Restart WSL**
  ```powershell
  # Start the specified distribution (ours is nekro-agent)
  wsl -d nekro-agent

  # Terminate the specified distribution (equivalent to restarting it)
  wsl --terminate nekro-agent

  # Close all running distributions and WSL services
  wsl --shutdown
  ```
  If you encounter network issues or other strange faults, try running `wsl --shutdown` and then restarting the distribution, which usually solves the problem.

- **Access File System**
  - **Access WSL Files from Windows**:
    Enter `\\wsl$` in the address bar of File Explorer and press Enter to see the file systems of all installed distributions. Files for `nekro-agent` are usually located in the `\\wsl$\nekro-agent\` directory.
  - **Access Windows Files from WSL**:
    In the WSL terminal, your Windows drive letters are mounted in the `/mnt/` directory. For example, the path to C drive is `/mnt/c`, and D drive is `/mnt/d`.

- **Uninstall Distribution (Dangerous Operation!)**
  If you need to completely delete the `nekro-agent` WSL environment, you can use the following command.
  **Warning: This operation will delete all data in this distribution and cannot be recovered!**
  ```powershell
  wsl --unregister nekro-agent
  ```
