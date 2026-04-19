---
title: Nekro Agent Windows启动器（基于WSL2）
description: 使用启动器的一键安装教程。
---

# NA启动器使用流程

本文档将展示 Nekro Agent Windows 启动器（下称启动器）的安装与使用流程。

## 环境要求

- Windows 10 版本 2004 及更高版本，或 Windows 11。
- 已在电脑的 BIOS/UEFI 中启用硬件虚拟化。可使用powershell命令  
`Get-CimInstance -ClassName Win32_Processor | Select-Object Name, VirtualizationFirmwareEnabled`检测，运行命令后，若`VirtualizationFirmwareEnabled`对应为`True`，则说明虚拟化已开启。

### 使用步骤

1. **安装启动器**
    - 从下方链接中下载启动器最新安装包，并完成启动器安装  
    [Github Release](https://github.com/NekroAI/nekro-agent-for-windows/releases)  
    [123云盘](https://www.123865.com/s/R0I3Td-v0Rw)

2. **运行环境检测，部署服务**
    - 首次打开程序，启动器会对基础环境进行检测，如下图所示
    ![检测](/assets/windows/manage1.png)
    - 若wsl组件缺失，进入安装流程，期间系统会**重启一次**，重启前会有弹窗提示，请及时保存重要文件；若环境缺失，则进入创建流程，如下图所示
    ![创建](/assets/windows/manage2_1.png)
    - 点击创建运行环境后进入磁盘存储位置的选择页面，如下图所示，建议选择非系统盘作为磁盘存储位置
    ![存储](/assets/windows/manage2_2.png)
    - 点击创建后，启动器会自行下载创建wsl环境，耐心等待即可
    - 等到wsl环境初始化完成后，将进入正式部署环节，首先启动器会让您选择部署版本，若您第一次接触 Nekro Agent 或 AI 机器人，推荐您选择完整版，如下图所示
    ![选择版本](/assets/windows/manage3.png)
    - 选择版本后，启动器会让您选择端口号，一般**默认**即可，若出现端口冲突，则可进行更改，上方的路径可在部署完成后复制进文件资源启动器，用于访问Nekro Agent数据目录，如下图所示
    ![详细配置](/assets/windows/manage4.png)
    - 配置完成后，启动器会自动拉取所需镜像，由于镜像文件较大，下载所需时间稍长，耐心等待即可，如下图所示
    ![下载](/assets/windows/manage5.png)
    - 下载完成后，启动器会自动进入启动流程，过程中会弹出用于展示相关凭据的弹窗，请妥善保存，如下图所示
    ![凭据](/assets/windows/manage6.png)
    - 服务成功启动后，弹窗可被关闭，启动器同时会跳转至内置浏览器，您可根据使用需求切换相应服务（如有），同时，您可以点击填充凭据按钮自动填充na/napcat的登录凭据，免去记忆凭据的过程，如下图所示
    ![内置浏览器](/assets/windows/manage7.png)
    - 到这里，NekroAgent的部署已经完成。

## ⚙️ 部署后配置

- **标准部署（对应启动器完整版）**: 前往[OneBot V11 / NapCat 配置](/docs/02_quick_start/adapters/onebot_v11)文档，根据文档说明完成配置。
- **核心部署（对应启动器精简版）**: 前往[OneBot V11 / NapCat 配置](/docs/02_quick_start/adapters/onebot_v11)文档，参考说明继续配置。
