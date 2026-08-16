---
title: NA-Tools Deployment (Official CLI)
description: Use the official one-click CLI tool na-tools to deploy and manage Nekro Agent on macOS or Linux.
---

# NA-Tools Deployment Guide

`na-tools` is the official cross-platform automated deployment CLI tool, supporting **macOS** and **Linux** systems. It provides full lifecycle management capabilities from installation and configuration to backup and recovery.

## Why Choose na-tools?

- **Cross-platform Support**: Supports both Linux (Ubuntu/Debian, etc.) and macOS.
- **Fully Automated Environment Detection**: Automatically detects and guides you through installing the Docker environment.
- **Convenient Mirror Source Management**: One-click configuration of Docker mirror sources for faster downloads in China.
- **Comprehensive Backup and Recovery**: One-click backup of data and configuration with interactive restore.
- **Multi-instance Management**: Supports deploying multiple Nekro Agent instances on a single machine.

---

## Step 1: Install na-tools

na-tools requires a **Python 3.11+** environment (consistent with the Nekro Agent main program version requirements). We recommend using [uv](https://docs.astral.sh/uv/) for installation, as it can automatically manage the Python environment without polluting the system.

### 1. Install uv (if not already installed)

Run the following command in your terminal:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

After installation, **reopen your terminal** or run `source ~/.bashrc` (zsh users run `source ~/.zshrc`) to make the `uv` command available.

### 2. Install na-tools using uv

```bash
uv tool install na-tools
```

### 3. Verify Installation

```bash
na-tools --version
```

If you see a version number output (e.g., `na-tools, version x.x.x`), the installation was successful.

:::tip Upgrading na-tools
To upgrade na-tools itself later, run:
```bash
uv tool upgrade na-tools
```
:::

---

## Step 2: One-Click Deploy Nekro Agent

Run the following command to start the installation process:

```bash
na-tools install
```

The installation process will **interactively guide** you through the following steps:

### Installation Process Details

**1. Docker Environment Detection**

na-tools will automatically detect whether Docker is installed on your system:

- **Linux users**: If Docker is not installed, the tool will attempt to install it automatically.
- **macOS users**: If Docker is not installed, the tool will guide you to manually install [Docker Desktop](https://www.docker.com/products/docker-desktop/). Please install and start Docker Desktop, then re-run `na-tools install`.

**2. Select Data Directory**

The tool will prompt you to choose a data storage directory for Nekro Agent. The default path is usually `~/nekro_agent_data`. Press **Enter** to use the default path, or enter a custom path.

**3. Whether to Include NapCat**

The tool will ask whether to install NapCat (QQ protocol bridge). If you need to connect to QQ, select **Yes**.

**4. Configure Basic Parameters**

The tool will automatically generate a `.env` configuration file containing port, token, and other information. You can confirm or modify the configuration at this step.

**5. Download and Start Services**

The tool will automatically:
- Download the `docker-compose.yml` orchestration file
- Pull the required Docker images
- Start all service containers

**6. Sandbox Images**

Nekro Agent involves two types of sandbox images:

- **General Sandbox** `kromiose/nekro-agent-sandbox`: Used for executing AI-generated code snippets. This is a core function and will be **automatically pulled** during installation; no selection needed.
- **CC Sandbox** `kromiose/nekro-cc-sandbox`: An isolated environment prepared for Claude Code workspaces. It has a larger size and is **optional**. During installation, you will be asked whether to pull it. If you are not using the workspace/Claude Code features for now, you can select **No** and install it later via `na-tools update --update-cc-sandbox`.

**7. Deployment Complete**

After installation completes, the terminal will display an information panel containing:

- **Web Access URL** (default `http://your-IP:8021`)
- **Admin Password**
- **Access Token**
- **NapCat Port** (if NapCat was installed)

:::warning Please Save This Information
The password and token displayed after deployment are very important. Be sure to record them. They are needed for subsequent logins to the web management interface and API calls.
:::

### Installation Options Quick Reference

If you want to skip interactive prompts, you can specify options directly via command-line arguments:

```bash
# Specify data directory and port
na-tools install --data-dir ~/my_nekro_data --port 9000

# Explicitly include/exclude NapCat
na-tools install --with-napcat
na-tools install --without-napcat

# Explicitly include/exclude CC Sandbox
na-tools install --with-cc-sandbox
na-tools install --without-cc-sandbox

# Non-interactive mode (all defaults, suitable for automation scripts)
na-tools install --non-interactive

# Install Preview version (may be unstable, not recommended for beginners)
na-tools install --preview
```

---

## Step 3 (Optional): Configure NapCat (Connect to QQ)

If you chose to include NapCat during installation, you need to complete the following configuration to allow the bot to connect to QQ.

### Auto-Configure OneBot Connection

```bash
na-tools napcat --qq 123456789
```

After configuration, the tool will ask whether to restart NapCat to apply the settings.

---

## Daily Management Commands

### View Service Status

```bash
na-tools status
```

### View Logs

```bash
# View Nekro Agent main service logs (default last 100 lines)
na-tools logs

# View NapCat logs
na-tools logs napcat

# Continuously follow logs (similar to tail -f, press Ctrl+C to stop)
na-tools logs -f

# View last 500 lines of logs
na-tools logs -n 500
```

Available service names: `nekro_agent` (default), `nekro_postgres`, `nekro_qdrant`, `nekro_napcat`

### Update Services

```bash
# Update to the latest stable version (will ask whether to back up first)
na-tools update

# Automatically back up before updating
na-tools update --backup

# Update without backup
na-tools update --no-backup

# Also update the CC Sandbox image
na-tools update --update-cc-sandbox

# Do not update sandbox images
na-tools update --no-update-sandbox
```

---

## Backup and Recovery

### Create a Backup

```bash
# One-click backup (automatically stops services -> backs up data -> restarts services)
na-tools backup
```

Backup contents include:
- All files in the data directory (`.env`, `docker-compose.yml`, application configuration, etc.)
- Docker storage volumes (PostgreSQL, Qdrant database data)
- Automatically excludes cache and temporary files to reduce backup size

#### Backup Options

```bash
# Specify backup file output path
na-tools backup -o /path/to/my_backup.tar.gz

# Add a name label to the backup for easy identification later
na-tools backup --name before-migration
# Example filename: nekro_agent_backup_before-migration_20260318_120000.tar.gz

# Do not automatically restart services after backup
na-tools backup --no-restart
```

### View Backup List

```bash
na-tools backup list
```

Output example:
```
Found the following historical backups:
  [1] nekro_agent_backup_pre-preview_20260318_120000.tar.gz (Backup time: 2026-03-18 12:00:00, Name: pre-preview, Size: 45.2 MB)
  [2] nekro_agent_backup_20260317_100000.tar.gz (Backup time: 2026-03-17 10:00:00, Size: 43.8 MB)
```

### Restore from Backup

```bash
# Interactively select a backup file to restore
na-tools restore

# Restore from a specified backup file
na-tools restore /path/to/backup.tar.gz

# Restore to a specified data directory
na-tools restore --data-dir /path/to/target_dir
```

Restore process: Stop services -> Extract backup -> Restore database volumes -> Ask whether to start services.

---

## Preview Channel

The Preview channel provides preview images that allow you to try new features in advance, but they **may be unstable**.

### Fresh Install of Preview Version

```bash
na-tools install --preview
```

### Switch from Stable to Preview

```bash
na-tools update --preview
```

Before switching, a **backup will be automatically created** (named `pre-preview`) for later rollback.

### Roll Back from Preview to Stable

```bash
na-tools update --rollback
```

Rollback process:
1. Switch images back to the stable `latest` tag
2. Automatically find the most recent `pre-preview` backup
3. Ask whether to restore data from that backup
4. Pull stable images and restart services

---

## Multi-Instance Management

na-tools supports managing multiple Nekro Agent instances on the **same machine**, each with its own independent data directory and configuration.

### Install Multiple Instances

```bash
# Install the first instance (using default directory)
na-tools install

# Install a second instance to a different directory
na-tools install --data-dir ~/nekro_agent_dev
```

### View All Instances

```bash
na-tools list
```

Output example:
```
 * [1] /home/user/nekro_agent_data (Last used: 2026-03-18 12:00:00)    <- Currently active
   [2] /home/user/nekro_agent_dev  (Last used: 2026-03-17 10:00:00)
```

The `*` marker indicates the currently active instance.

### Switch Instances

```bash
# Switch by number
na-tools use 2

# Switch by path
na-tools use ~/nekro_agent_dev
```

After switching, all commands (`status`, `logs`, `backup`, etc.) will operate on the switched instance.

### Bind an Existing Installation

If you previously installed Nekro Agent through other means (such as manual Docker Compose), you can bind it to na-tools management:

```bash
na-tools bind --data-dir /path/to/existing/nekro_data
```

You can name the instance during binding for easy identification:

```bash
na-tools bind --data-dir /opt/nekro_data --name production
```

### Remove an Instance

```bash
# Remove instance (also deletes data)
na-tools remove

# Remove instance but keep the data directory
na-tools remove --keep-data

# Remove instance at a specified directory
na-tools remove --data-dir ~/nekro_agent_dev

# Skip confirmation and execute directly (use with caution)
na-tools remove --force
```

:::danger Warning
By default, `na-tools remove` will **delete the data directory and Docker volumes**. This action is irreversible. If you only want to remove management while preserving data, use the `--keep-data` option.
:::

---

## Configure Docker Mirror Source

If Docker image pulls are slow in your region, you can set a mirror source through na-tools:

```bash
# Set mirror source
na-tools config mirror https://mirror.example.com

# View current mirror source
na-tools config mirror

# Clear mirror source (restore default)
na-tools config mirror ""
```

Once set, subsequent `install` and `update` operations will use this mirror source.

---

## Command Quick Reference

### Deployment Management

| Command | Description |
|------|------|
| `na-tools install` | Install Nekro Agent (Docker detection -> configuration -> deployment) |
| `na-tools update` | Update services to the latest version |
| `na-tools remove` | Uninstall and remove NA instance |

### Instance Management

| Command | Description |
|------|------|
| `na-tools bind` | Bind an installed NA instance to the management list |
| `na-tools use <number/path>` | Switch the currently active instance |
| `na-tools list` | List all installed instances |
| `na-tools status` | View service running status |

### Data Management

| Command | Description |
|------|------|
| `na-tools backup` | Back up data and configuration |
| `na-tools backup list` | List all historical backups |
| `na-tools restore` | Restore from backup (interactive selection or specify file) |
| `na-tools config mirror` | View or set Docker mirror source |

### Logs and Tools

| Command | Description |
|------|------|
| `na-tools logs [service-name]` | View service logs |
| `na-tools napcat` | Guide NapCat login and auto-configure OneBot connection |

---

## Frequently Asked Questions

### Docker Related

**Q: Getting "Docker not installed"?**

- **Linux**: na-tools will attempt to install Docker automatically. If it fails, refer to the [official Docker installation documentation](https://docs.docker.com/engine/install/).
- **macOS**: Please manually install [Docker Desktop](https://www.docker.com/products/docker-desktop/). After installation, **start Docker Desktop** and re-run `na-tools install`.

**Q: Getting permission errors?**

On Linux, Docker operations may require `sudo` privileges. na-tools will automatically attempt to re-execute commands via `sudo` when permissions are insufficient.

You can also add the current user to the `docker` group to avoid entering the password each time:

```bash
sudo usermod -aG docker $USER
# Takes effect after re-logging into the terminal
```

### Port Related

**Q: Getting port already in use?**

Default ports:
- `8021`: Nekro Agent main service
- `6099`: NapCat WebUI

If these ports are already occupied by other programs, you can specify different ports during installation:

```bash
na-tools install --port 9000
```

### Image Download Related

**Q: Docker image download is very slow or fails?**

You can configure a mirror source for faster downloads:

```bash
na-tools config mirror https://your-mirror.example.com
```
