---
title: Nekro-Agent-Toolkit
description: Nekro-Agent-Toolkitを使用してNekroAgentを迅速にデプロイします。
---

# Nekro-Agent-Toolkit

> Nekro-Agent-Toolkitは、Nekro Agentのインストール、更新、バックアップを行うためのツールです。

##  [Nekro-Agent-Toolkit](https://github.com/greenhandzdl/nekro-agent-toolkit)

> [!NOTE]
> Windows\Linux\MacOS環境はすべてテスト済みで、BSD環境も互換性がある可能性があります。
> Windowsユーザーは[ユーザードキュメント](https://github.com/greenhandzdl/nekro-agent-toolkit/wiki)を注意深く読む必要があります。そうしないと、NekroAgentの起動時に既知のエラーが発生します。

* 環境要件：

  - `sudo`: 権限昇格に使用されます。Windows環境では権限昇格を選択しないでください（権限昇格を必要とする操作はなく、再試行するだけです）。Linux環境では、dockerユーザー権限が適切に設定されている場合、権限昇格は必要ありません。MacOS環境では、権限昇格が必要です。
  - Windows環境: `docker desktop`
  - Linux環境: `docker`と`docker-compose` `docker compose`
  - MacOS環境: `orbstack`
  - `python3`, `pipx`
  - オプションの依存関係: `zstd`, `ufw`

* 利点:
  - ワンストップの**インストール、更新、バックアップ**ワークフローのための完全なツールボックスサポート。
  - 理論的に**クロスプラットフォーム**で統一されたユーザーエクスペリエンスをもたらします。

* [ユーザードキュメント（クリックして読む）](https://github.com/greenhandzdl/nekro-agent-toolkit/wiki): 理解できない場合は、Immersive Translatorのような翻訳プラグインが必要になる場合があります。
  
* 機能紹介：

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
> ### NekroAgentインストール後の推奨読書： 
> 
>   [クイックスタート#基本設定](/ja/docs/02_quick_start/quickstart.html#basic-configuration)
> 
>   [NapCatログインとデフォルトパスワードの変更](/ja/docs/02_quick_start/adapters/onebot_v11)
>
>   [NekroAgent関連設定](/ja/docs/02_quick_start/config/system.html)
