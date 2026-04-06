---
title: Deploying Nekro Agent on iStoreOS
description: Deploying Nekro Agent on the iStoreOS soft router system. iStoreOS is based on OpenWRT and uses the ash shell environment. We provide a specially adapted installation script.
---


# Deploying Nekro Agent on iStoreOS

Deploying Nekro Agent on the iStoreOS soft router system. iStoreOS is based on OpenWRT and uses the ash shell environment. We provide a specially adapted installation script.


## 📋 Prerequisites

Before starting deployment, please ensure your iStoreOS system meets the following conditions:

- **Docker Environment**: iStoreOS Docker has migrated root directory
- **Storage Space**: Docker root directory has at least 10GB of available space
- **Network Connection**: Ability to access GitHub and Docker.io normally

## 🚀 Deployment Methods

### One-Click Deployment

Deploy Nekro Agent core services and Napcat protocol endpoint with one click, providing a complete bot solution.

::: warning Security Warning
1. **Must Change NapCat Default Password**: Public WebUI must use strong passwords (recommended 12+ characters, including numbers, letters, and symbols)
2. **Must Use Token Authentication**: OneBot service must have a valid Token set, avoid empty tokens or weak passwords
3. **For security reasons, please avoid using default ports**
:::

#### Deployment Command

```bash
# bin/ash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/refs/heads/main/docker/wrtinstall.sh)" - --with-napcat
```

After deployment is complete, please refer to the [OneBot V11 / NapCat Configuration](/en/docs/02_quick_start/adapters/onebot_v11) documentation to complete subsequent configuration.


## ⚙️ Detailed Installation Process

### 1. Environment Detection

The installation script will automatically perform the following checks:

- **Docker Environment**: Verify if Docker is installed and running
- **Docker Compose**: Automatically install or use existing version
- **Storage Space**: Check if Docker root directory has sufficient space

### 2. Directory Configuration

- **Default Directory**: `~/srv/nekro_agent`
- **Custom Directory**: Manually edit the `.env` file

### 3. Automatic Configuration

The script will automatically complete the following configurations:

- **Generate Security Credentials**: Automatically create random access tokens and admin passwords
- **Download Configuration Files**: Get the latest docker-compose configuration from the repository
- **Pull Service Images**: Download required Docker images

### 4. Firewall Configuration

The installation script will automatically configure the OpenWRT firewall to open the following ports:

- **Nekro Agent Main Service**: `8021/tcp` (customizable in .env)
- **Napcat Service**: `6099/tcp` (customizable in .env)

## ⚙️ Post-Deployment Configuration

- **Standard Deployment**: Go to the [OneBot V11 / NapCat Configuration](/en/docs/02_quick_start/adapters/onebot_v11) documentation and complete configuration according to the documentation.
- **Core Deployment**: Go to the [OneBot V11 / NapCat Configuration](/en/docs/02_quick_start/adapters/onebot_v11) documentation and refer to the instructions to continue configuration.

## 🚀 Application Updates

For iStoreOS environment, please use the following commands to update the application

### Enter Data Directory

```bash
# If you modified the data directory, please set according to the actual situation
export NEKRO_DATA_DIR=${HOME}/srv/nekro_agent && \
cd ${NEKRO_DATA_DIR}
```

### Update Only Nekro Agent and Sandbox Images (Recommended)

```bash
 docker pull kromiose/nekro-agent-sandbox && \
 docker-compose --env-file .env pull nekro_agent && \
 docker-compose --env-file .env up --build -d nekro_agent
```

### Update All Images and Restart Containers (If you need to update NapCat or other data support services at the same time)

> This command will update the `nekro-agent` image and all dependent images, which may cause the Bot to go offline and require re-login

```bash
 docker-compose --env-file .env pull && \
 docker-compose --env-file .env up --build -d
```

## 📝 Changelog

After each update, you can check [GitHub Releases](https://github.com/KroMiose/nekro-agent/releases) to view the changelog and understand the changes
