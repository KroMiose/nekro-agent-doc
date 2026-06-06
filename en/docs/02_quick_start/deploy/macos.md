---
title: macOS Deployment of Nekro Agent
description: Complete guide for deploying Nekro Agent on macOS systems, using OrbStack as container management tool, including environment preparation and detailed steps for two deployment methods
---

# MacOS Deployment Tutorial

This document will guide you through deploying Nekro Agent on MacOS systems.

## <DocIcon name="rainbow" /> Environment Preparation

Since Nekro Agent runs based on Docker, we recommend using OrbStack as the container management tool on MacOS, and deploy through its virtual machine functionality.

### Install OrbStack

#### Method 1: Install using Homebrew (Recommended)

```bash
brew install --cask orbstack
```

#### Method 2: Direct Download and Installation

1. Visit [OrbStack Official Website](https://orbstack.dev/) to download the latest version
2. Start OrbStack application after installation is complete
3. Confirm OrbStack is running properly (OrbStack icon should be displayed in the status bar)

### Create and Use OrbStack Virtual Machine

1. Open OrbStack application
2. Click "Create Machine" to create a new Linux virtual machine (Ubuntu is recommended)
3. Or use command line to create:

```bash
orb create ubuntu my-machine
```

### Using Virtual Machine in OrbStack

OrbStack provides a simple way to enter virtual machines and execute commands:

- Directly type `orb` command to enter the terminal of the default virtual machine
- Use `orb -m <virtual machine name>` to enter a specified virtual machine
- Use `orb <command>` to execute commands in the default virtual machine
- Use `orb -m <virtual machine name> <command>` to execute commands in a specified virtual machine

For example:

```bash
# Enter the default virtual machine
orb

# Enter the virtual machine named ubuntu
orb -m ubuntu

# Execute ls command in the default virtual machine
orb ls

# Execute ls command in the ubuntu virtual machine
orb -m ubuntu ls
```

## <DocIcon name="rocket" /> Deployment Methods (in OrbStack Virtual Machine)

After entering the OrbStack virtual machine, the deployment process is completely identical to that in a standard Linux environment.

Please refer to the [Linux Deployment Tutorial](./linux.md) to complete subsequent deployment and configuration.