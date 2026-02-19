---
title: Windows開発ガイド
description: Windows環境でのNekro Agent開発完全ガイド
---

# Windows 開発環境セットアップ

::: warning 警告
このドキュメントは開発環境専用です。デプロイや本番環境での使用は推奨されません。
:::

::: tip ヒント
WindowsとLinuxの開発プロセスは基本的に同じです。このドキュメントではWindows固有のインストール手順のみを説明します。その他の手順については、[Linux開発ガイド](./dev_linux.md)を参照してください。
:::

## Windows固有の準備作業

### 1. Python 3.11のインストール

[Python公式サイト](https://www.python.org/downloads/windows/)にアクセスしてPython 3.11をダウンロード・インストール：

1. Windows installer (64-bit)をダウンロード
2. **必ず** "Add Python to PATH"にチェックを入れる
3. "Install Now"を選択

### 2. UVのインストール

PowerShellで実行：

```powershell
# Windows
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# インストールの確認
uv --version
```

### 3. Docker Desktopのインストール

1. [Docker Desktop公式サイト](https://www.docker.com/products/docker-desktop/)にアクセス
2. Windows版をダウンロード
3. インストールしてDocker Desktopを起動
4. Dockerサービスが正常に動作していることを確認：`docker info`

::: tip 権限について
Windowsユーザーは通常、開発サーバーを実行するために管理者権限を必要としません。Docker Desktopが自動的に権限を設定します。

**権限の問題が発生した場合：**

1. **PowerShellを管理者として実行**
   - PowerShellアイコンを右クリック
   - "管理者として実行"を選択

2. **Docker Desktopが正常に動作していることを確認**
   - Docker Desktopはバックグラウンドで実行される必要があります
   - 初回起動時は管理者権限が必要な場合があります

3. **WSL2を使用（推奨）**
   ```powershell
   # WSL2のインストール
   wsl --install
   
   # WSL2で開発、Linux開発ガイドを参照
   ```
:::

## ソースコードデプロイ

### クイックスタート

Windowsの開発プロセスはLinuxと基本的に同じで、主な違いはコマンドラインツール（PowerShellを使用）です。以下の手順に従ってください：

1. **リポジトリのクローンと依存関係のインストール** - [Linuxガイド：ソースコードデプロイ ステップ1-2](./dev_linux.md#ソースコードデプロイ)を参照
2. **開発サービスの起動** - [Linuxガイド：ステップ3](./dev_linux.md#_3-開発サービスを起動)を参照
3. **環境変数の設定** - 以下のWindows固有のコマンドを参照
4. **サンドボックスイメージのプル** - [Linuxガイド：ステップ5](./dev_linux.md#_5-サンドボックスイメージをプル)を参照
5. **Botの実行** - [Linuxガイド：ステップ6](./dev_linux.md#_6-botを実行)を参照
6. **OneBot設定** - [Linuxガイド：ステップ7](./dev_linux.md#_7-onebot-配置)を参照

### Windows固有のコマンド

#### 環境変数の設定（ステップ3）

```powershell
# 設定テンプレートをコピー（開発サービスに接続するように事前設定済み）
copy .env.example .env.dev

# 必要に応じて設定を変更（オプション）
notepad .env.dev
```

### ワンコマンドセットアップ（PowerShell）

```powershell
# プロジェクトのクローンと移動
git clone https://github.com/KroMiose/nekro-agent.git
cd nekro-agent

# 依存関係のインストール
uv sync --all-extras

# 開発サービスの起動
docker-compose -f docker/docker-compose.dev.yml up -d

# 環境変数の設定
copy .env.example .env.dev

# サンドボックスイメージのプル
docker pull kromiose/nekro-agent-sandbox:latest

# アプリケーションの起動
uv run nb run --reload --reload-excludes ext_workdir
```

## WSL2での開発（推奨）

WSL2はより良い互換性とパフォーマンスを提供します。Windowsユーザーに強く推奨：

### 1. WSL2のインストール

```powershell
# PowerShell（管理者）で実行
wsl --install

# 再起動後、Ubuntuのユーザー名とパスワードを設定
```

### 2. WSL2で開発

```bash
# WSL2に入る
wsl

# Linux開発ガイドに完全に従う
```

その後、WSL2内で[Linux開発ガイド](./dev_linux.md)に完全に従って操作してください。

::: tip WSL2の利点
- 完全なLinux互換性
- より良いパフォーマンス
- より簡単な依存関係管理
- Windowsのパスと権限の問題を回避
:::

## フロントエンド開発（オプション）

### Node.jsのインストール

1. [Node.js公式サイト](https://nodejs.org/)にアクセス
2. LTS版（推奨20.x）をダウンロード・インストール

### 次のステップ

その他のフロントエンド開発手順はLinuxと同じです。[Linuxガイド：フロントエンド開発](./dev_linux.md#フロントエンド開発-オプション)を参照してください。

またはワンコマンドセットアップ（PowerShell）：

```powershell
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

## よくある問題

### Docker Desktopが起動しない

1. Hyper-VまたはWSL2が有効になっていることを確認
2. BIOSで仮想化が有効になっているか確認
3. Docker Desktopを管理者として実行

### パスの問題

Windowsはバックスラッシュ`\`を使用しますが、Git BashやWSL2ではスラッシュ`/`を使用します。パスの問題を避けるため、WSL2での開発を推奨します。

### 権限の問題

権限エラーが発生した場合、以下を試してください：
1. PowerShellを管理者として実行
2. またはWSL2を使用（推奨）

## Dockerイメージ情報

[Linuxガイド：Dockerイメージ情報](./dev_linux.md#dockerイメージ説明)を参照してください。
