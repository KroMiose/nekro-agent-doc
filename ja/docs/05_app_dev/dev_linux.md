---
title: Linux開発・デプロイメントガイド
description: Linux環境でのNekro Agentの開発とデプロイメントに関する完全ガイド
---

# Linux開発環境セットアップ

::: warning 警告
このドキュメントは開発環境専用であり、デプロイメントや使用には推奨されません。
:::

## 前提条件

開発環境要件：

- 機能するPostgreSQLデータベース
- Python環境がインストール済み（Python 3.11推奨）
- `uv`をインストール（Pythonパッケージマネージャー）
- Docker & Docker Compose

### UVとpoeのインストール

```bash
# Linux/macOS
curl -LsSf https://astral.sh/uv/install.sh | sh

# インストールを確認
uv --version

# poeのインストール
uv tool install poethepoet

# インストールを確認
poe --version
```

::: tip sudo権限について
プロジェクトがDockerを呼び出す必要があるため、一部の開発シナリオではsudo権限が必要になる場合があります。`uv`と`poe`をsudoで使用できるようにするには：

**UVとpoeをシステムパスにインストール**
```bash
# UVをシステムパスにインストール
sudo cp ~/.local/bin/uv /usr/local/bin/
sudo cp ~/.local/bin/uvx /usr/local/bin/
sudo chmod +x /usr/local/bin/uv /usr/local/bin/uvx

# poeをシステムパスにインストール（プロジェクトで依存関係をインストール後）
cd nekro-agent
uv sync --all-extras
sudo cp ~/.local/share/uv/tools/poethepoet/bin/poe /usr/local/bin/
sudo chmod +x /usr/local/bin/poe

# 新しいターミナルで確認
sudo uv --version
sudo poe --help
```

**sudoで開発サーバーを実行：**
```bash
sudo -E uv run poe dev
# または
sudo -E poe dev
```

`-E`パラメータは現在のユーザーの環境変数を保持します。
:::

## ソースコードデプロイメント

### 1. リポジトリをクローン

```bash
git clone https://github.com/KroMiose/nekro-agent.git
```

### 2. 依存関係をインストール

```bash
cd nekro-agent

# UVを使用して依存関係をインストール（開発依存関係を含む）
uv sync --all-extras
```

### 3. 開発サービスを起動

開発環境のPostgreSQLデータベースが適切な権限で設定を書き込めるようにするため、まずデータディレクトリを作成し、権限を設定する必要があります：

```bash
mkdir -p data/dev_postgres_data
sudo chown -R 999:999 data/dev_postgres_data
```

PostgreSQLやQdrantなどの必要なサービスを起動します：

```bash
# 開発サービスオーケストレーションを起動（PostgreSQL + Qdrant + NapCat）
docker compose -f docker/docker-compose.dev.yml up -d
```

::: tip サービスポート情報
開発環境のサービスポートマッピング：
- PostgreSQL: `5433`（ローカルのデフォルト5432との競合を避けるため）
- Qdrant: `6334`（本番環境のデフォルト6333との競合を避けるため）
- NapCat: `6199`（デフォルト6099との競合を避けるため）
:::

### 4. 環境変数を設定

環境変数設定テンプレートをコピーし、必要に応じて変更します：

```bash
# 設定テンプレートをコピー（開発サービスに接続するように事前設定済み）
cp .env.example .env.dev

# 必要に応じて設定を変更（オプション）
vim .env.dev
```

::: info 設定情報
`.env.example`は開発環境のデフォルト値で事前設定されており、以下が含まれます：
- データベース接続情報（前のステップで起動したサービスに接続）
- Qdrantベクトルデータベース設定
- 開発環境用の事前設定されたセキュリティキー

ほとんどの場合、変更せずにそのまま使用できます。カスタム設定については、[config.py](https://github.com/KroMiose/nekro-agent/blob/main/nekro_agent/core/config.py)を参照してください
:::

### 5. サンドボックスイメージをプル

サンドボックス環境用のDockerイメージをプルします：

```bash
# 安定版をプル
sudo docker pull kromiose/nekro-agent-sandbox:latest

# またはプレビュー版をプル（最新機能を含む）
sudo docker pull kromiose/nekro-agent-sandbox:preview
```

イメージ内の依存関係パッケージを変更する必要がある場合は、`sandbox/dockerfile`と`sandbox/pyproject.toml`ファイルを変更し、`sudo bash sandbox.sh --build`を使用してイメージを再構築できます

### 6. Botを実行

::: warning 注意
プラグインが動作する際にDockerを動的に使用してサンドボックス実行環境を作成し、コンテナ共有ディレクトリの権限を設定する必要があるため、現在のユーザーを`docker`グループに追加し、シェルを再起動して有効にすることをお勧めします：

```bash
sudo usermod -aG docker $USER
```

:::

```bash
# 通常起動
uv run nb run

# 開発デバッグモードでリロード監視を有効にし、動的拡張ディレクトリを除外
uv run nb run --reload --reload-excludes ext_workdir
```

### 7. OneBot設定

任意のOneBotプロトコルクライアントを使用してBotにログインし、リバースWebSocket接続方法を使用して、接続アドレスを設定します：

```
ws://127.0.0.1:8021/onebot/v11/ws
```

::: tip
ここでのポートは`.env.prod`で設定できます。デフォルトは`8021`です
:::

### 8. デバッグモード

プロジェクトには`.vscode/launch.json`ファイルが含まれており、VSCodeの組み込みデバッグ起動設定を使用して直接デバッグできます。

## フロントエンド開発（オプション）

フロントエンドページを開発する必要がある場合は、以下の手順に従ってください：

### 1. Node.jsをインストール

`nvm`（Node Version Manager）を使用してNode.jsバージョンを管理することをお勧めします。

1.  `nvm`をインストール：
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    ```
2.  インストール後、プロンプトに従ってシェル設定ファイル（例：`~/.bashrc`、`~/.zshrc`）に`nvm`読み込みコマンドを追加し、ターミナルを再起動します。
3.  Node.js 20をインストール：
    ```bash
    nvm install 20
    nvm use 20
    ```
    システムのパッケージマネージャーからインストールすることもできますが、バージョンが20.xであることを確認してください。

### 2. pnpmを設定
```bash
# pnpmをグローバルにインストール
npm install -g pnpm

# ミラーを設定して加速
pnpm config set registry https://registry.npmmirror.com
```

### 3. フロントエンド依存関係をインストール
```bash
cd frontend

# 依存関係をインストール
pnpm install --frozen-lockfile
```

### 4. フロントエンドを開始
```bash
cd ./frontend
pnpm dev
```

以下のログが表示されたら、ブラウザでアクセスできます：
```
VITE vx.x.x  ready in xxx ms

➜  Local:   http://localhost:xxxx/ <- これがポート番号です
➜  Network: use --host to expose
➜  press h + enter to show help
```

## Dockerイメージ説明

Nekro Agentは2種類のDockerイメージタグを提供しています：

- **latest**: 安定版、本番環境に適しています
- **preview**: プレビュー版、最新機能を含み、テストと開発に適しています

```bash
# 安定版を使用（推奨）
docker pull kromiose/nekro-agent:latest

# プレビュー版を使用（最新機能を体験）
docker pull kromiose/nekro-agent:preview
```