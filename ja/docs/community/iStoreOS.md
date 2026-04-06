---
title: iStoreOSへのNekro Agentデプロイメント
description: iStoreOSソフトルーターシステムへのNekro Agentのデプロイメント。iStoreOSはOpenWRTベースでashシェル環境を使用しています。特別に適応したインストールスクリプトを提供します。
---


# iStoreOSへのNekro Agentデプロイメント

iStoreOSソフトルーターシステムへのNekro Agentのデプロイメント。iStoreOSはOpenWRTベースでashシェル環境を使用しています。特別に適応したインストールスクリプトを提供します。


## 📋 前提条件

デプロイメントを開始する前に、iStoreOSシステムが以下の条件を満たしていることを確認してください：

- **Docker環境**: iStoreOS Dockerがルートディレクトリを移行済み
- **ストレージ容量**: Dockerルートディレクトリに少なくとも10GBの空き容量
- **ネットワーク接続**: GitHubとDocker.ioに正常にアクセスできること

## 🚀 デプロイメント方法

### ワンクリックデプロイメント

Nekro AgentコアサービスとNapcatプロトコルエンドポイントをワンクリックでデプロイし、完全なボットソリューションを提供します。

::: warning セキュリティ警告
1. **NapCatデフォルトパスワードを必ず変更**: 公開WebUIは強力なパスワードを使用する必要があります（12文字以上、数字、文字、記号を含むことを推奨）
2. **必ずトークン認証を使用**: OneBotサービスには有効なトークンが設定されている必要があり、空のトークンや弱いパスワードを避けてください
3. **セキュリティ上の理由により、デフォルトポートの使用は避けてください**
:::

#### デプロイメントコマンド

```bash
# bin/ash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/refs/heads/main/docker/wrtinstall.sh)" - --with-napcat
```

デプロイメント完了後、[OneBot V11 / NapCat 設定](/ja/docs/02_quick_start/adapters/onebot_v11)ドキュメントを参照して、後続の設定を完了してください。


## ⚙️ 詳細インストールプロセス

### 1. 環境検出

インストールスクリプトは自動的に以下のチェックを実行します：

- **Docker環境**: Dockerがインストールされ実行中か確認
- **Docker Compose**: 自動的にインストールまたは既存のバージョンを使用
- **ストレージ容量**: Dockerルートディレクトリに十分な空き容量があるか確認

### 2. ディレクトリ設定

- **デフォルトディレクトリ**: `~/srv/nekro_agent`
- **カスタムディレクトリ**: 手動で`.env`ファイルを編集

### 3. 自動設定

スクリプトは自動的に以下の設定を完了します：

- **セキュリティ資格情報の生成**: ランダムなアクセストークンと管理者パスワードを自動作成
- **設定ファイルのダウンロード**: リポジトリから最新のdocker-compose設定を取得
- **サービスイメージのプル**: 必要なDockerイメージをダウンロード

### 4. ファイアウォール設定

インストールスクリプトは自動的にOpenWRTファイアウォールを設定して、以下のポートを開きます：

- **Nekro Agentメインサービス**: `8021/tcp`（.envでカスタマイズ可能）
- **Napcatサービス**: `6099/tcp`（.envでカスタマイズ可能）

## ⚙️ デプロイメント後の設定

- **標準デプロイメント**: [OneBot V11 / NapCat 設定](/ja/docs/02_quick_start/adapters/onebot_v11)ドキュメントに移動し、ドキュメントに従って設定を完了してください。
- **コアデプロイメント**: [OneBot V11 / NapCat 設定](/ja/docs/02_quick_start/adapters/onebot_v11)ドキュメントに移動し、指示を参照して設定を続行してください。

## 🚀 アプリケーション更新

iStoreOS環境では、以下のコマンドを使用してアプリケーションを更新してください

### データディレクトリに入る

```bash
# データディレクトリを変更した場合は、実際の状況に応じて設定
export NEKRO_DATA_DIR=${HOME}/srv/nekro_agent && \
cd ${NEKRO_DATA_DIR}
```

### Nekro Agentとサンドボックスイメージのみを更新（推奨）

```bash
 docker pull kromiose/nekro-agent-sandbox && \
 docker-compose --env-file .env pull nekro_agent && \
 docker-compose --env-file .env up --build -d nekro_agent
```

### すべてのイメージを更新してコンテナを再起動（NapCatや他のデータサポートサービスを同時に更新する必要がある場合）

> このコマンドは`nekro-agent`イメージとすべての依存イメージを更新し、ボットがオフラインになる可能性があり、再ログインが必要です

```bash
 docker-compose --env-file .env pull && \
 docker-compose --env-file .env up --build -d
```

## 📝 変更履歴

各更新後、[GitHub Releases](https://github.com/KroMiose/nekro-agent/releases)を確認して変更履歴を表示し、変更点を理解できます
