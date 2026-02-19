---
title: macOS Development Guide
description: Complete development guide for Nekro Agent on macOS
---

# macOS Development Environment Setup

::: warning Warning
This document is for development environment only, not recommended for deployment or production use.
:::

::: tip Note
The development process for macOS and Linux is essentially the same. This document only covers macOS-specific installation steps. For other steps, please refer to the [Linux Development Guide](./dev_linux.md).
:::

## macOS-Specific Preparation

### 1. Install Homebrew

If Homebrew is not installed yet:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Install Python 3.11

```bash
brew install python@3.11
```

### 3. Install UV

```bash
# Using Homebrew (recommended)
brew install uv

# Or using official install script
curl -LsSf https://astral.sh/uv/install.sh | sh

# Verify installation
uv --version
```

### 4. Install OrbStack

OrbStack is the recommended solution for macOS, offering better performance and lighter resource usage than Docker Desktop, with full Docker compatibility.

```bash
brew install --cask orbstack
```

After installation, launch the OrbStack app. It automatically provides Docker-compatible CLI tools.

::: tip Why OrbStack?
- ⚡ **Faster**: Significantly better startup speed and runtime performance than Docker Desktop
- 💾 **Lighter**: Uses less system resources
- 🔧 **Ready to Use**: No sudo required, automatically configured
- 🐧 **Linux VM Support**: Can create Linux VMs for fully compatible development environments
- 🆓 **Free**: Completely free for personal use
:::

## Source Deployment

### Quick Start

The development process for macOS is identical to Linux. Follow these steps:

1. **Clone repository and install dependencies** - See [Linux Guide: Source Deployment Steps 1-2](./dev_linux.md#source-deployment)
2. **Start development services** - See [Linux Guide: Step 3](./dev_linux.md#_3-start-development-services)
3. **Configure environment variables** - See [Linux Guide: Step 4](./dev_linux.md#_4-configure-environment-variables)
4. **Pull sandbox image** - See [Linux Guide: Step 5](./dev_linux.md#_5-pull-sandbox-image)
5. **Run Bot** - See [Linux Guide: Step 6](./dev_linux.md#_6-run-bot)
6. **OneBot configuration** - See [Linux Guide: Step 7](./dev_linux.md#_7-onebot-configuration)

### One-Command Setup

```bash
# Clone and enter project
git clone https://github.com/KroMiose/nekro-agent.git
cd nekro-agent

# Install dependencies
uv sync --all-extras

# Start development services
docker-compose -f docker/docker-compose.dev.yml up -d

# Configure environment variables
cp .env.example .env.dev

# Pull sandbox image
docker pull kromiose/nekro-agent-sandbox:latest

# Start application
uv run nb run --reload --reload-excludes ext_workdir
```

## Using OrbStack VM for Development (Alternative)

If you encounter compatibility issues in the native macOS environment, you can use an OrbStack VM:

```bash
# Create Ubuntu VM
orb create ubuntu nekro-dev

# Enter VM
orb -m nekro-dev

# Follow Linux development guide in the VM
```

Then follow the [Linux Development Guide](./dev_linux.md) completely within the VM.

## Frontend Development (Optional)

### Install Node.js

```bash
brew install node@20
```

### Next Steps

Other frontend development steps are the same as Linux. See [Linux Guide: Frontend Development](./dev_linux.md#frontend-development-optional).

Or use one-command setup:

```bash
cd frontend
npm install -g pnpm
pnpm config set registry https://registry.npmmirror.com
pnpm install --frozen-lockfile
pnpm dev
```

## Debug Mode

The project includes `.vscode/launch.json` for direct VSCode debugging:

1. Open project root directory
2. Press `F5` to start debugging
3. Observe terminal output

## Docker Image Information

Please refer to [Linux Guide: Docker Image Information](./dev_linux.md#docker-image-information).
