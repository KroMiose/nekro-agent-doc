---
title: Windows Development Guide
description: Complete development guide for Nekro Agent on Windows
---

# Windows Development Environment Setup

::: warning Warning
This document is for development environment only, not recommended for deployment or production use.
:::

::: tip Note
The development process for Windows and Linux is essentially the same. This document only covers Windows-specific installation steps. For other steps, please refer to the [Linux Development Guide](./dev_linux.md).
:::

## Windows-Specific Preparation

### 1. Install Python 3.11

Visit [Python Official Website](https://www.python.org/downloads/windows/) to download and install Python 3.11:

1. Download Windows installer (64-bit)
2. **Make sure to check** "Add Python to PATH"
3. Select "Install Now"

### 2. Install UV

Execute in PowerShell:

```powershell
# Windows
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# Verify installation
uv --version
```

### 3. Install Docker Desktop

1. Visit [Docker Desktop Official Website](https://www.docker.com/products/docker-desktop/)
2. Download Windows version
3. Install and launch Docker Desktop
4. Verify Docker service is running: `docker info`

::: tip About Permissions
Windows users typically don't need administrator privileges to run the development server. Docker Desktop automatically configures permissions.

**If you encounter permission issues:**

1. **Run PowerShell as Administrator**
   - Right-click PowerShell icon
   - Select "Run as administrator"

2. **Ensure Docker Desktop is running**
   - Docker Desktop needs to run in the background
   - First launch may require administrator privileges

3. **Use WSL2 (Recommended)**
   ```powershell
   # Install WSL2
   wsl --install
   
   # Develop in WSL2, refer to Linux development guide
   ```
:::

## Source Deployment

### Quick Start

The development process for Windows is basically the same as Linux, with the main difference being the command-line tool (using PowerShell). Follow these steps:

1. **Clone repository and install dependencies** - See [Linux Guide: Source Deployment Steps 1-2](./dev_linux.md#source-deployment)
2. **Start development services** - See [Linux Guide: Step 3](./dev_linux.md#_3-start-development-services)
3. **Configure environment variables** - See Windows-specific commands below
4. **Pull sandbox image** - See [Linux Guide: Step 5](./dev_linux.md#_5-pull-sandbox-image)
5. **Run Bot** - See [Linux Guide: Step 6](./dev_linux.md#_6-run-bot)
6. **OneBot configuration** - See [Linux Guide: Step 7](./dev_linux.md#_7-onebot-configuration)

### Windows-Specific Commands

#### Configure Environment Variables (Step 3)

```powershell
# Copy configuration template (pre-configured to connect to dev services)
copy .env.example .env.dev

# Modify configuration as needed (optional)
notepad .env.dev
```

### One-Command Setup (PowerShell)

```powershell
# Clone and enter project
git clone https://github.com/KroMiose/nekro-agent.git
cd nekro-agent

# Install dependencies
uv sync --all-extras

# Start development services
docker-compose -f docker/docker-compose.dev.yml up -d

# Configure environment variables
copy .env.example .env.dev

# Pull sandbox image
docker pull kromiose/nekro-agent-sandbox:latest

# Start application
uv run nb run --reload --reload-excludes ext_workdir
```

## Using WSL2 for Development (Recommended)

WSL2 provides better compatibility and performance. Highly recommended for Windows users:

### 1. Install WSL2

```powershell
# Execute in PowerShell (Administrator)
wsl --install

# After restarting, set Ubuntu username and password
```

### 2. Develop in WSL2

```bash
# Enter WSL2
wsl

# Follow Linux development guide completely
```

Then follow the [Linux Development Guide](./dev_linux.md) completely within WSL2.

::: tip WSL2 Advantages
- Full Linux compatibility
- Better performance
- Simpler dependency management
- Avoid Windows path and permission issues
:::

## Frontend Development (Optional)

### Install Node.js

1. Visit [Node.js Official Website](https://nodejs.org/)
2. Download and install LTS version (recommended 20.x)

### Next Steps

Other frontend development steps are the same as Linux. See [Linux Guide: Frontend Development](./dev_linux.md#frontend-development-optional).

Or use one-command setup (PowerShell):

```powershell
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

## Common Issues

### Docker Desktop Won't Start

1. Ensure Hyper-V or WSL2 is enabled
2. Check if virtualization is enabled in BIOS
3. Run Docker Desktop as administrator

### Path Issues

Windows uses backslashes `\`, but Git Bash or WSL2 use forward slashes `/`. Using WSL2 for development is recommended to avoid path issues.

### Permission Issues

If you encounter permission errors, try:
1. Run PowerShell as administrator
2. Or use WSL2 (recommended)

## Docker Image Information

Please refer to [Linux Guide: Docker Image Information](./dev_linux.md#docker-image-information).
