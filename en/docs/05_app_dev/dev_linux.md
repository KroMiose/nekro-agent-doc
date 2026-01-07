---
title: Linux Development and Deployment Guide
description: Complete guide for development and deployment of Nekro Agent in Linux environment
---

# Linux Development Environment Setup

::: warning Warning
This document is for development environment only and is not recommended for deployment or use.
:::

## Prerequisites

Development environment requirements:

- A functional PostgreSQL database
- Python environment installed (Python 3.11 recommended)
- Install `uv` (Python package manager)
- Docker & Docker Compose

### Install UV and poe

```bash
# Linux/macOS
curl -LsSf https://astral.sh/uv/install.sh | sh

# Verify installation
uv --version

# Install poe
uv tool install poethepoet

# Verify installation
poe --version
```

::: tip About sudo permissions
Due to the project's need to call Docker, some development scenarios may require sudo permissions. To ensure `uv` and `poe` are available under sudo:

**Install UV and poe to system path**
```bash
# Install UV to system path
sudo cp ~/.local/bin/uv /usr/local/bin/
sudo cp ~/.local/bin/uvx /usr/local/bin/
sudo chmod +x /usr/local/bin/uv /usr/local/bin/uvx

# Install poe to system path (after installing dependencies in the project)
cd nekro-agent
uv sync --all-extras
sudo cp ~/.local/share/uv/tools/poethepoet/bin/poe /usr/local/bin/
sudo chmod +x /usr/local/bin/poe

# Verify in a new terminal
sudo uv --version
sudo poe --help
```

**Run development server with sudo:**
```bash
sudo -E uv run poe dev
# or
sudo -E poe dev
```

The `-E` parameter preserves the current user's environment variables.
:::

## Source Code Deployment

### 1. Clone Repository

```bash
git clone https://github.com/KroMiose/nekro-agent.git
```

### 2. Install Dependencies

```bash
cd nekro-agent

# Install dependencies using UV (including dev dependencies)
uv sync --all-extras
```

### 3. Start Development Services

To ensure the PostgreSQL database in the development environment has appropriate permissions to write configuration, you need to create the data directory and set permissions first:

```bash
mkdir -p data/dev_postgres_data
sudo chown -R 999:999 data/dev_postgres_data
```

Start required services like PostgreSQL, Qdrant, etc.:

```bash
# Start development service orchestration (PostgreSQL + Qdrant + NapCat)
docker compose -f docker/docker-compose.dev.yml up -d
```

::: tip Service Port Information
Development environment service port mappings:
- PostgreSQL: `5433` (to avoid conflicts with local default 5432)
- Qdrant: `6334` (to avoid conflicts with production default 6333)
- NapCat: `6199` (to avoid conflicts with default 6099)
:::

### 4. Configure Environment Variables

Copy the environment variable configuration template and modify as needed:

```bash
# Copy configuration template (pre-configured to connect to dev services)
cp .env.example .env.dev

# Modify configuration as needed (optional)
vim .env.dev
```

::: info Configuration Information
`.env.example` is pre-configured with development environment defaults, including:
- Database connection information (connects to services started in the previous step)
- Qdrant vector database configuration
- Pre-set security keys for development environment

In most cases, you can use it directly without modification. For custom configuration, please refer to [config.py](https://github.com/KroMiose/nekro-agent/blob/main/nekro_agent/core/config.py)
:::

### 5. Pull Sandbox Image

Pull the Docker image for the sandbox environment:

```bash
# Pull stable version
sudo docker pull kromiose/nekro-agent-sandbox:latest

# Or pull preview version (includes latest features)
sudo docker pull kromiose/nekro-agent-sandbox:preview
```

If you need to modify dependency packages in the image, you can modify the `sandbox/dockerfile` and `sandbox/pyproject.toml` files, then use `sudo bash sandbox.sh --build` to rebuild the image

### 6. Run Bot

::: warning Note
Since plugins need to dynamically use Docker to create sandbox execution environments and set container shared directory permissions, it is recommended to add the current user to the `docker` group and restart the shell to take effect:

```bash
sudo usermod -aG docker $USER
```

:::

```bash
# Normal startup
uv run nb run

# Enable reload monitoring in development debug mode and exclude dynamic extension directories
uv run nb run --reload --reload-excludes ext_workdir
```

### 7. OneBot Configuration

Use any OneBot protocol client to log in to the bot and use reverse WebSocket connection method, configure the connection address:

```
ws://127.0.0.1:8021/onebot/v11/ws
```

::: tip
The port here can be configured in `.env.prod`, default is `8021`
:::

### 8. Debug Mode

The project includes a `.vscode/launch.json` file, which allows you to debug directly using VSCode with its built-in debug launch configuration.

## Frontend Development (Optional)

If you need to develop frontend pages, follow these steps:

### 1. Install Node.js

It is recommended to use `nvm` (Node Version Manager) to manage Node.js versions.

1.  Install `nvm`:
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    ```
2.  After installation, add the `nvm` loading command to your shell configuration file (e.g., `~/.bashrc`, `~/.zshrc`) according to the prompts and restart the terminal.
3.  Install Node.js 20:
    ```bash
    nvm install 20
    nvm use 20
    ```
    You can also install through your system's package manager, but ensure the version is 20.x.

### 2. Configure pnpm
```bash
# Install pnpm globally
npm install -g pnpm

# Set up mirror for acceleration
pnpm config set registry https://registry.npmmirror.com
```

### 3. Install Frontend Dependencies
```bash
cd frontend

# Install dependencies
pnpm install --frozen-lockfile
```

### 4. Start Frontend
```bash
cd ./frontend
pnpm dev
```

When you see the following log, you can access it in your browser:
```
VITE vx.x.x  ready in xxx ms

➜  Local:   http://localhost:xxxx/ <- This is the port number
➜  Network: use --host to expose
➜  press h + enter to show help
```

## Docker Image Information

Nekro Agent provides two Docker image tags:

- **latest**: Stable version, suitable for production environments
- **preview**: Preview version, includes latest features, suitable for testing and development

```bash
# Use stable version (recommended)
docker pull kromiose/nekro-agent:latest

# Use preview version (experience latest features)
docker pull kromiose/nekro-agent:preview
```
