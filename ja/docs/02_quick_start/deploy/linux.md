---
title: Nekro AgentのLinuxデプロイメント
description: Linux環境でのNekro Agentデプロイメントの完全ガイド。標準デプロイメントとコアデプロイメントの両方の詳細手順を含みます。
---

# Linuxデプロイメントチュートリアル

このドキュメントでは、LinuxシステムにNekro Agentをデプロイする方法を案内します。当社のインストールスクリプトは2つのデプロイメントモードを提供しています。ニーズに応じて選択してください。

## 🚀 方法1：標準デプロイメント（推奨）

このモードでは、Nekro AgentコアサービスとNapcatプロトコルエンドポイントをワンクリックでデプロイし、ほとんどのユーザーにおすすめの完全なソリューションです。

::: warning 警告！

1. NapCatのデフォルトパスワードを必ず変更してください：パブリックWebUIでは強力なパスワードを使用する必要があります（12文字以上の数字、文字、記号を含むことを推奨）
2. Token認証を必ず使用してください：OneBotサービスは有効なTokenを設定する必要があり、空のTokenや弱いパスワードは避けてください
3. セキュリティ上の理由から、デフォルトポートの使用は避けてください

:::

### デプロイメントコマンド

```bash
# Githubから（推奨）
sudo -E bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/install_i18n.sh)" - --with-napcat
```

Githubからスクリプトをダウンロードする際にネットワークの問題が発生した場合は、[NekroEndpoint](https://ep.nekro.ai)を使用してデプロイメントスクリプトにアクセスできます：

:::tip
[NekroEndpoint](https://ep.nekro.ai)は、Cloudflare Workers上に構築されたエッジエンドポイントオーケストレーションプラットフォームで、静的コンテンツ返信、プロキシ転送、動的スクリプト実行の3種類のエンドポイントをサポートしています。権限グループやアクセスキーなどのきめ細やかな権限制御を提供し、300以上のグローバルノードを通じてミリ秒単位の応答を実現します。APIプロキシ集約やWebhook処理などのシナリオで使用できます。
:::

```bash
# NekroEndpointから（推奨）
sudo -E bash -c "$(curl -fsSL https://ep.nekro.ai/e/KroMiose/nekro-agent/main/docker/install_i18n.sh)" - --with-napcat
```

> **ヒント**:
> - 上記のコマンドの`--with-napcat`パラメータは、完全自動の標準デプロイメントを開始します。
> - このパラメータを追加しない場合、スクリプトは対話モードで開始されます。その時、Napcatをインストールするために`Y`を選択してください。

デプロイメント完了後、[プロトコル設定-Napcat](/ja/docs/02_quick_start/config/protocol.html#napcat統合デプロイメント推奨)ドキュメントを参照して、後続の設定を完了してください。

## 🚀 方法2：コアデプロイメント

このモードではNekro Agentコアサービスのみをデプロイし、他のアダプタープラットフォームを使用する必要がある場合や、OneBot V11プロトコルエンドポイントを自分で設定する必要がある上級ユーザーに適しています。

### デプロイメントコマンド

以下のコマンドを実行し、スクリプトが尋ねたときにNapcatサービスをインストールしないことを選択します。

```bash
# Githubから（推奨）
sudo -E bash -c "$(curl -fsSL https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/install_i18n.sh)"
```

```bash
# NekroEndpointから（CloudFlareアクセラレーション）
sudo -E bash -c "$(curl -fsSL https://ep.nekro.ai/e/KroMiose/nekro-agent/main/docker/install_i18n.sh)"
```

スクリプトが尋ねたとき、`n`と入力します：

```text
Do you want to use napcat service at the same time? [Y/n] n
```

デプロイメント完了後、Nekro Agentは以下のアドレスをリッスンします。ここにOneBot V11プロトコルエンドポイントを接続してください：

`ws://<あなたのサービスIP>:8021/onebot/v11/ws`

## 📝 注意事項

- **インストールディレクトリ**：
  - デフォルトのインストールは`~/srv/nekro_agent`にあります。
  - カスタマイズする必要がある場合は、スクリプトを実行する前に環境変数を設定してください：`export NEKRO_DATA_DIR=<あなたのディレクトリ>`

- **ポート開放**：
  - クラウドサーバーを使用している場合、セキュリティグループで必要なポートを開けてください：
  - `8021/tcp`：Nekro Agentメインサービス（すべてのモードで必須）。
  - `6099/tcp`：Napcatサービス（標準デプロイメントの場合のみ必須）。

- **認証情報の保存**：
  - インストールスクリプト実行後、**管理者パスワード**や**OneBotアクセストークン**などの重要な情報が出力されます。必ず適切に保存してください。

## ⚙️ デプロイメント後の設定

- **標準デプロイメント**：[プロトコル設定](/ja/docs/02_quick_start/config/protocol.html#napcat統合デプロイメント推奨)ドキュメントに移動し、ドキュメントに従って設定を完了してください。
- **コアデプロイメント**：[プロトコル設定](/ja/docs/02_quick_start/config/protocol)ドキュメントに移動し、指示を参考に設定を続けてください。