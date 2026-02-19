---
title: macOS開発ガイド
description: macOS環境でのNekro Agent開発完全ガイド
---

# macOS 開発環境セットアップ

::: warning 警告
このドキュメントは開発環境専用です。デプロイや本番環境での使用は推奨されません。
:::

::: tip ヒント
macOSとLinuxの開発プロセスは基本的に同じです。このドキュメントではmacOS固有のインストール手順のみを説明します。その他の手順については、[Linux開発ガイド](./dev_linux.md)を参照してください。
:::

## macOS固有の準備作業

### 1. Homebrewのインストール

Homebrewがまだインストールされていない場合：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Python 3.11のインストール

```bash
brew install python@3.11
```

### 3. UVのインストール

```bash
# Homebrewを使用（推奨）
brew install uv

# または公式インストールスクリプトを使用
curl -LsSf https://astral.sh/uv/install.sh | sh

# インストールの確認
uv --version
```

### 4. OrbStackのインストール

macOSではOrbStackを推奨します。Docker Desktopよりも軽量で高性能、かつDocker完全互換です。

```bash
brew install --cask orbstack
```

インストール後、OrbStackアプリを起動します。自動的にDocker互換のCLIツールが提供されます。

::: tip なぜOrbStack？
- ⚡ **高速**：Docker Desktopより起動速度と実行パフォーマンスが大幅に向上
- 💾 **軽量**：システムリソースの使用量が少ない
- 🔧 **すぐに使える**：sudo不要、自動設定完了
- 🐧 **Linux VM対応**：完全互換の開発環境用にLinux VMを作成可能
- 🆓 **無料**：個人利用は完全無料
:::

## ソースコードデプロイ

### クイックスタート

macOSの開発プロセスはLinuxと完全に同じです。以下の手順に従ってください：

1. **リポジトリのクローンと依存関係のインストール** - [Linuxガイド：ソースコードデプロイ ステップ1-2](./dev_linux.md#ソースコードデプロイ)を参照
2. **開発サービスの起動** - [Linuxガイド：ステップ3](./dev_linux.md#_3-開発サービスを起動)を参照
3. **環境変数の設定** - [Linuxガイド：ステップ4](./dev_linux.md#_4-環境変数を設定)を参照
4. **サンドボックスイメージのプル** - [Linuxガイド：ステップ5](./dev_linux.md#_5-サンドボックスイメージをプル)を参照
5. **Botの実行** - [Linuxガイド：ステップ6](./dev_linux.md#_6-botを実行)を参照
6. **OneBot設定** - [Linuxガイド：ステップ7](./dev_linux.md#_7-onebot-配置)を参照

### ワンコマンドセットアップ

```bash
# プロジェクトのクローンと移動
git clone https://github.com/KroMiose/nekro-agent.git
cd nekro-agent

# 依存関係のインストール
uv sync --all-extras

# 開発サービスの起動
docker compose -f docker/docker-compose.dev.yml up -d

# 環境変数の設定
cp .env.example .env.dev

# サンドボックスイメージのプル
docker pull kromiose/nekro-agent-sandbox:latest

# アプリケーションの起動
uv run nb run --reload --reload-excludes ext_workdir
```

## OrbStack VMでの開発（代替案）

macOSネイティブ環境で互換性の問題が発生した場合、OrbStack VMを使用できます：

```bash
# Ubuntu VMの作成
orb create ubuntu nekro-dev

# VMに入る
orb -m nekro-dev

# VM内でLinux開発ガイドに従う
```

その後、VM内で[Linux開発ガイド](./dev_linux.md)に完全に従って操作してください。

## フロントエンド開発（オプション）

### Node.jsのインストール

```bash
brew install node@20
```

### 次のステップ

その他のフロントエンド開発手順はLinuxと同じです。[Linuxガイド：フロントエンド開発](./dev_linux.md#フロントエンド開発-オプション)を参照してください。

またはワンコマンドセットアップ：

```bash
cd frontend
npm install -g pnpm
pnpm config set registry https://registry.npmmirror.com
pnpm install --frozen-lockfile
pnpm dev
```

## デバッグモード

プロジェクトには`.vscode/launch.json`が含まれており、VSCodeで直接デバッグできます：

1. プロジェクトルートディレクトリを開く
2. `F5`を押してデバッグを開始
3. ターミナル出力を確認

## Dockerイメージ情報

[Linuxガイド：Dockerイメージ情報](./dev_linux.md#dockerイメージ説明)を参照してください。
