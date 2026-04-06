---
title: Nekro-Agent-Toolkit
description: Use Nekro-Agent-Toolkit to quickly deploy NekroAgent.
---

# Nekro-Agent-Toolkit

> Nekro-Agent-Toolkit is a tool for installing, updating, and backing up Nekro Agent.

##  [Nekro-Agent-Toolkit](https://github.com/greenhandzdl/nekro-agent-toolkit)

> [!NOTE]
> Windows\Linux\MacOS environments have all been tested, BSD environment may be compatible.
> Windows users need to carefully read the [User Documentation](https://github.com/greenhandzdl/nekro-agent-toolkit/wiki), otherwise they will encounter known errors when starting NekroAgent.

* Environment Requirements:

  - `sudo`: Used for privilege escalation. Do not select privilege escalation in Windows environment (no operation requires privilege escalation, just retry). In Linux environment, if docker user permissions are properly configured, privilege escalation is not needed. In MacOS environment, privilege escalation is needed.
  - Windows environment: `docker desktop`
  - Linux environment: `docker` and `docker-compose` `docker compose`
  - MacOS environment: `orbstack`
  - `python3`, `pipx`
  - Optional dependencies: `zstd`, `ufw`

* Advantages:
  - Complete toolbox support for one-stop **installation, update, backup** workflow.
  - Theoretically **cross-platform** brings a unified user experience.

* [User Documentation (Click to Read)](https://github.com/greenhandzdl/nekro-agent-toolkit/wiki): If you don't understand, you may need translation plugins like immersive translator.
  
* Feature Introduction:

```zsh
~
❯ nekro-agent-toolkit -v
nekro-agent-toolkit 1.4.19

~
❯ nekro-agent-toolkit -h
usage: nekro-agent-toolkit [-h] [-i [PATH] | -u [PATH] | -ua [PATH] |
                           -b [ARG ...] | -r [ARG ...] | -ri ARG [ARG ...] |
                           -v] [-sd [PATH]] [--with-napcat] [--dry-run] [-y]

Nekro Agent unified management tool for installation, update, and backup.

options:
  -h, --help            show this help message and exit
  -i, --install [PATH]  Install Nekro Agent to the specified path.
  -u, --update [PATH]   Perform partial update on the installation at the specified path.
  -ua, --upgrade [PATH]
                        Perform full update (upgrade) on the installation at the specified path.
  -b, --backup [ARG ...]
                        Backup data directory to the specified folder.
  -r, --recovery [ARG ...]
                        Restore from backup file to the specified data directory.
  -ri, --recover-install ARG [ARG ...]
                        Restore and install. This will extract the backup file to the target directory, then run the installation process on top of it.
  -v, --version         Display version information.
  -sd, --set-data [PATH]
                        Set or clear the default data directory.
  --with-napcat         Used with --install or --recover-install to deploy NapCat service.
  --dry-run             Used with --install or --recover-install to perform a dry run.
  -y, --yes             Automatically confirm all prompts, run in non-interactive mode.

Usage Examples:
  nekro-agent-toolkit --install ./na_data
    # Install Nekro Agent in the ./na_data directory

  nekro-agent-toolkit --update ./na_data
    # Perform partial update on the installation in the specified directory

  nekro-agent-toolkit --upgrade ./na_data
    # Perform full update (upgrade) on the installation in the specified directory

  nekro-agent-toolkit --backup ./na_data ./backups
    # Backup na_data directory to the backups folder

  nekro-agent-toolkit --recovery ./backups/na_backup_123.tar.zstd ./na_data_new
    # Restore from backup file to na_data_new directory

  nekro-agent-toolkit --recover-install ./backup.tar.zst ./restored_install
    # Restore data from backup and perform installation based on it
```

> [!WARNING]
> ### Recommended reading after NekroAgent installation: 
> 
>   [Quick Start#Basic Configuration](/en/docs/02_quick_start/quickstart.html#basic-configuration)
> 
>   [NapCat Login and Change Default Password](/en/docs/02_quick_start/adapters/onebot_v11)
>
>   [NekroAgent Related Configuration](/en/docs/02_quick_start/config/system.html)
