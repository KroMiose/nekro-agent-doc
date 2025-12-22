---
title: Linux Deployment of Nekro Agent
description: Complete guide to deploying Nekro Agent in a Linux environment, including detailed steps for both standard and core deployment methods.
---

# Linux Deployment Tutorial

This document will guide you through deploying Nekro Agent on a Linux system. Our installation script provides two deployment modes. Please choose according to your needs.

## 🚀 Method 1: Standard Deployment (Recommended)

This mode will deploy Nekro Agent core services and Napcat protocol endpoint with one click, which is the complete solution recommended for most users.

::: warning Warning!

1. Be sure to change NapCat default password: Public WebUI must use strong passwords (recommended 12+ characters, including numbers, letters, and symbols)
2. Be sure to use Token authentication: OneBot service must set a valid Token, avoid empty Token or weak passwords
3. For security reasons, please avoid using default ports

:::

### Deployment Command

```bash
# From Github (Recommended)
sudo -E bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/install_i18n.sh)" - --with-napcat
```

If you encounter network issues when downloading the script from Github, you can use [NekroEndpoint](https://ep.nekro.ai) to access the deployment script:

:::tip
[NekroEndpoint](https://ep.nekro.ai) is an edge endpoint orchestration platform built on Cloudflare Workers, supporting three types of endpoints: static content return, proxy forwarding, and dynamic script execution. It provides fine-grained permission controls such as permission groups and access keys, and achieves millisecond-level responses through 300+ global nodes. It can be used for scenarios such as API proxy aggregation and Webhook processing.
:::

```bash
# From NekroEndpoint (Recommended)
sudo -E bash -c "$(curl -fsSL https://ep.nekro.ai/e/KroMiose/nekro-agent/main/docker/install_i18n.sh)" - --with-napcat
```

> **Tips**:
> - The `--with-napcat` parameter in the above command will start fully automatic standard deployment.
> - If this parameter is not added, the script will start in interactive mode. At that time, please select `Y` to install Napcat.

After deployment is complete, please refer to the [Protocol Configuration-Napcat](/en/docs/02_quick_start/config/protocol.html#napcat-integrated-deployment-recommended) document to complete subsequent configuration.

## 🚀 Method 2: Core Deployment

This mode only deploys Nekro Agent core services, suitable for advanced users who need to use other adapter platforms or configure OneBot V11 protocol endpoints themselves.

### Deployment Command

Run the following command and select not to install Napcat service when the script asks.

```bash
# From Github (Recommended)
sudo -E bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/install_i18n.sh)"
```

```bash
# From NekroEndpoint (CloudFlare Acceleration)
sudo -E bash -c "$(curl -fsSL https://ep.nekro.ai/e/KroMiose/nekro-agent/main/docker/install_i18n.sh)"
```

When the script asks, input `n`:

```text
Do you want to use napcat service at the same time? [Y/n] n
```

After deployment is complete, Nekro Agent will listen to the following address. Please connect your OneBot V11 protocol endpoint here:

`ws://<your service ip>:8021/onebot/v11/ws`

## 📝 Notes

- **Installation Directory**:
  - Default installation is in `~/srv/nekro_agent`.
  - If you need to customize, please set the environment variable **before executing the script**: `export NEKRO_DATA_DIR=<your directory>`

- **Port Opening**:
  - If you are using a cloud server, please open the required ports in the security group:
  - `8021/tcp`: Nekro Agent main service (required for all modes).
  - `6099/tcp`: Napcat service (only required for standard deployment).

- **Save Credentials**:
  - After the installation script is executed, it will output important information such as **administrator password** and **OneBot access token**. Please be sure to save them properly.

## ⚙️ Post-Deployment Configuration

- **Standard Deployment**: Go to the [Protocol Configuration](/en/docs/02_quick_start/config/protocol.html#napcat-integrated-deployment-recommended) document and complete the configuration according to the documentation.
- **Core Deployment**: Go to the [Protocol Configuration](/en/docs/02_quick_start/config/protocol) document and continue configuration with reference to the instructions.

