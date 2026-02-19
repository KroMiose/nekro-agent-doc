---
title: Nekro Agent Quick Start
description: A guide to help you quickly get started with Nekro Agent, including deployment options, basic configuration, and detailed steps for first use
---

# Quick Start

Welcome to Nekro Agent `(hereinafter referred to as NA)`! This document will help you quickly get started with this powerful AI agent system.

::: warning ⚠ Security Warning ⚠

This project allows AI to execute arbitrary code in an isolated Docker container environment during runtime. Although the application has adopted multiple security measures including but not limited to container isolation and permission restrictions, certain security risks still exist, such as:

1. IP address leakage
2. Container escape
3. Other unknown risks

! Please be aware of the risks and continue only after accepting to bear them yourself. The author is not responsible for any losses caused by using this project!
:::

## Official Deployment Options

Choose the appropriate deployment method based on your operating system:

- [Linux Deployment Tutorial](/en/docs/02_quick_start/deploy/linux) - Applicable to Linux distributions that use apt as the package manager.
- [Windows Deployment Tutorial](/en/docs/02_quick_start/deploy/windows) - Suitable for Windows 10/11 systems
- [MacOS Deployment Tutorial](/en/docs/02_quick_start/deploy/macos) - Suitable for MacOS systems

## Community Deployment Solutions

- [Nekro-Agent-Toolkit](/en/docs/community/nekro-agent-toolkit) Cross-platform deployment CLI tool
  - **Cross-platform** deployment solution and convenient **installation, backup, recovery** solution for NekroAgent.

- [1Panel Application Deployment](https://github.com/lgc2333/nekro-agent-deploy-1panel)

  - Out-of-the-box one-click deployment solution based on **1Panel panel**, supporting pure interface deployment operations and OpenResty reverse proxy configuration, automatically configuring NapCat protocol endpoint.

- [iStoreOS System Deployment](/en/docs/community/iStoreOS)

  - Run Nekro Agent on a soft router system based on **OpenWRT**, providing one-click installation script.

## Basic Configuration

After successful deployment, you need to complete the following basic configurations:

1. **Protocol Configuration**: Connect to your selected chat platform
2. **Model Configuration**: Set up AI models and API keys
3. **System Configuration**: Set basic system parameters and user permissions

::: warning ⚠ Important Security Information ⚠
For security reasons, please be sure to read the following information:

1. Be sure to change the default protocol password: Public WebUI must use strong passwords (recommended 12+ characters, including numbers, letters, and symbols)
2. For security reasons, please avoid using default ports
   :::

For detailed configuration instructions, please refer to the following documents:

- [Protocol Configuration](/en/docs/02_quick_start/config/protocol)
- [System Configuration](/en/docs/02_quick_start/config/system)
- [Application Updates](/en/docs/02_quick_start/config/update)

## First Use

### Accessing the Management Interface

After completing deployment, you can access the management interface through the following addresses:

- `http://<Your Server IP>:8021` (remote access)
- `http://localhost:8021` (local access)

### Logging into the Management Interface

For your first login, please use the administrator account and password generated during the deployment process

### Basic Usage Flow

1. **Connect Protocol**: Complete protocol configuration and confirm connection status
2. **Set Persona**: Configure the basic persona and behavior patterns of the AI
3. **Test Conversation**: Test conversation with the AI through your selected platform
4. **Extend Features**: Enable desired extension features as needed

## Next Steps

After completing basic configuration, you can explore more advanced features:

- [Model Group Configuration](/en/docs/03_advanced/model_config) - Configure multiple model combinations

## Quick Reference

### Common Management Commands

```bash
# View NA container logs
sudo docker logs -f nekro_agent

# View NapCat container logs
sudo docker logs -f nekro_napcat

# Restart services
sudo docker restart nekro_agent
```

### Common Chat Commands

```
/na-info - Display current application information
/na-help - Display help information
/reset - Reset current session
```

::: tip 💡 Feature Exploration
Curious about what Nekro Agent can do? Check out [Application Scenarios Showcase](/en/docs/01_intro/application_scenarios) to learn about rich and diverse practical use cases and creative ways to play!
:::

