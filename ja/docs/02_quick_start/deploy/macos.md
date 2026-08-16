---
title: Nekro AgentのmacOSデプロイメント
description: macOSシステムでのNekro Agentデプロイメントの完全ガイド。OrbStackをコンテナ管理ツールとして使用し、環境準備と2つのデプロイメント方法の詳細手順を含みます。
---

# MacOSデプロイメントチュートリアル

このドキュメントでは、MacOSシステムにNekro Agentをデプロイする方法を案内します。

## <DocIcon name="rainbow" /> 環境準備

Nekro AgentはDockerベースで動作するため、MacOSではOrbStackをコンテナ管理ツールとして使用し、その仮想マシン機能を通じてデプロイすることをお勧めします。

### OrbStackのインストール

#### 方法1：Homebrewを使用してインストール（推奨）

```bash
brew install --cask orbstack
```

#### 方法2：直接ダウンロードしてインストール

1. [OrbStack公式ウェブサイト](https://orbstack.dev/)にアクセスして最新版をダウンロードします
2. インストール完了後、OrbStackアプリケーションを起動します
3. OrbStackが正常に動作していることを確認します（ステータスバーにOrbStackアイコンが表示されているはずです）

### OrbStack仮想マシンの作成と使用

1. OrbStackアプリケーションを開きます
2. 「Create Machine」をクリックして新しいLinux仮想マシンを作成します（Ubuntuを推奨）
3. またはコマンドラインで作成します：

```bash
orb create ubuntu my-machine
```

### OrbStackでの仮想マシンの使用

OrbStackは仮想マシンに入ってコマンドを実行する簡単な方法を提供します：

- 直接`orb`コマンドを入力してデフォルト仮想マシンのターミナルに入ります
- `orb -m <仮想マシン名>`を使用して指定された仮想マシンに入ります
- `orb <command>`を使用してデフォルト仮想マシンでコマンドを実行します
- `orb -m <仮想マシン名> <command>`を使用して指定された仮想マシンでコマンドを実行します

例：

```bash
# デフォルト仮想マシンに入る
orb

# ubuntuという名前の仮想マシンに入る
orb -m ubuntu

# デフォルト仮想マシンでlsコマンドを実行する
orb ls

# ubuntu仮想マシンでlsコマンドを実行する
orb -m ubuntu ls
```

## <DocIcon name="rocket" /> デプロイメント方法（OrbStack仮想マシン内）

OrbStack仮想マシンに入った後、デプロイメントプロセスは標準のLinux環境と完全に同じです。

[Linuxデプロイメントチュートリアル](./linux.md)を参照して、後続のデプロイメントと設定を完了してください。