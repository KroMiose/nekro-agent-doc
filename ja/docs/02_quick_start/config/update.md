---
title: アプリケーション更新ガイド
description: Nekro Agentアプリケーションの更新方法と手順。オーケストレーション更新コマンドと更新ログの表示方法を含みます。
---

# アプリケーション更新

Nekro Agentは定期的に更新をリリースし、機能改善、バグ修正、セキュリティパッチを含みます。このドキュメントでは、Nekro Agentインスタンスを安全に更新する方法を紹介します。

## 🚀 オーケストレーション更新（推奨）

Nekro Agentは便利なオーケストレーション更新コマンドを提供します。新しいバージョンがリリースされたとき、以下のワンクリックコマンドを使用してアプリケーションを更新できます

::: warning 注意

WslまたはOrbStack仮想マシンデプロイを使用した場合、以下のコマンドは仮想マシン内で実行する必要があります

:::

### データディレクトリに移動

```bash
# データディレクトリを変更した場合は、実際の状況に応じて設定してください
export NEKRO_DATA_DIR=${HOME}/srv/nekro_agent && \
cd ${NEKRO_DATA_DIR}
```

### Nekro Agentとサンドボックスイメージのみを更新（推奨）

```bash
sudo docker pull kromiose/nekro-agent-sandbox:latest && \
sudo docker-compose --env-file .env pull nekro_agent && \
sudo docker-compose --env-file .env up --build -d nekro_agent
```

### すべてのイメージを更新してコンテナを再起動（NapCatまたはその他のデータサポートサービスを同時に更新する場合）

> このコマンドは`nekro-agent`イメージとすべての依存イメージを更新し、Botがオフラインになって再ログインが必要になる場合があります

```bash
sudo docker pull kromiose/nekro-agent-sandbox:latest && \
sudo docker-compose --env-file .env pull && \
sudo docker-compose --env-file .env up --build -d
```

## 🧪 プレビュー版へ切り替える

最新機能を先行して試したい場合や、正式版に入る前の変更のテストに協力したい場合は、デプロイイメージを `latest` から `preview` に切り替えることができます。

::: warning 注意

- `preview` は `main` ブランチに追従して継続的に更新されるため、更新頻度が高い反面、まだ十分に検証されていない変更を含む可能性があります。
- 安定した本番運用を優先する場合は、`latest` の利用を推奨します。
- 以下の手順は、インストールスクリプトが生成した `docker-compose.yml` をデータディレクトリ内で利用している前提です。

:::

### ステップ 1：現在のイメージタグを確認

```bash
grep -n "image: kromiose/nekro-agent" docker-compose.yml
```

すでに `kromiose/nekro-agent:preview` になっている場合は、そのまま下の更新コマンドを実行してください。

### ステップ 2：メインイメージタグを `latest` から `preview` に変更

```bash
sed -i 's|image: kromiose/nekro-agent:latest|image: kromiose/nekro-agent:preview|g' docker-compose.yml
```

macOS 標準の `sed` を使う場合は、次の書式を使用してください。

```bash
sed -i '' 's|image: kromiose/nekro-agent:latest|image: kromiose/nekro-agent:preview|g' docker-compose.yml
```

変更後は再度確認できます。

```bash
grep -n "image: kromiose/nekro-agent" docker-compose.yml
```

### ステップ 3：プレビュー版イメージを取得して更新

```bash
sudo docker pull kromiose/nekro-agent-sandbox:preview && \
sudo docker-compose --env-file .env pull nekro_agent && \
sudo docker-compose --env-file .env up --build -d nekro_agent
```

NapCat やその他の依存サービスも同時に更新したい場合は、こちらを使用してください。

```bash
sudo docker pull kromiose/nekro-agent-sandbox:preview && \
sudo docker-compose --env-file .env pull && \
sudo docker-compose --env-file .env up --build -d
```

### ステップ 4：切り替え結果を確認

```bash
sudo docker-compose --env-file .env ps
```

メインサービスのログを確認する場合：

```bash
sudo docker-compose --env-file .env logs -f nekro_agent
```

### 正式版へ戻す方法

`docker-compose.yml` のイメージタグを `latest` に戻し、正式版の更新コマンドをもう一度実行してください。

```bash
sed -i 's|image: kromiose/nekro-agent:preview|image: kromiose/nekro-agent:latest|g' docker-compose.yml
```

## 📝 更新ログ

各更新後、[GitHub Releases](https://github.com/KroMiose/nekro-agent/releases)をチェックして更新ログを確認し、変更内容を理解することができます
