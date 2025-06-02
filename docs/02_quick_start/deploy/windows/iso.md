---
title: Windows 部署 Nekro Agent 完整系统镜像
description: 在 Windows 系统上使用 完整系统镜像 部署 Nekro Agent 的详细步骤
---

# Nekro Agent 完整系统镜像
## 简介
Nekro Agent 完整系统镜像，适用于 Hyper-V 和 VMware 虚拟机。
:::info 注意
完整系统镜像可能落后于最新版本，建议使用 WSL 或 Hyper-V 部署

慕容泠鸢 提供镜像存储服务
:::


#### 下载链接
Hyper-V [虚拟机镜像](https://pan.mrly.cc/s/b1ux)
:::tip 提示
系统用户名: nekroagent   系统密码: nekro

系统版本: Ubuntu 22.04 LTS

更新时间: 2025年5月21日
:::
VMware 待实现
#### Hyper-V 导入步骤
1. 下载镜像并解压
2. 打开 Hyper-V 管理器，选择“导入虚拟机”
3. 选择解压后的文件夹，选择 NekroAgent 文件夹
4. 选择“就地注册虚拟机(使用现有的唯一ID)(R)”
5. 选择“下一步”，选择“完成”

:::warning 警告
安装完成后请立即修改密码
:::

#### VMware 导入步骤
待实现