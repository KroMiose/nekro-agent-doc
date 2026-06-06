---
title: WeChat OpenILink 設定チュートリアル
description: WeChat への初回接続を想定した Nekro Agent ユーザー向けの WeChat OpenILink アダプター設定チュートリアル。wechatbot-sdk ベースの QR コードログイン。
---

# WeChat OpenILink 設定チュートリアル

本文では、WeChat OpenILink アダプターの設定方法と、Nekro Agent を WeChat に接続する手順を説明します。このアダプターは `wechatbot-sdk` ベースで、**QR コードログイン**による認証を行います。

::: warning 実験的機能およびリスクに関する注意
- WeChat OpenILink は現在 **MVP（最小限の動作可能）段階**にあり、テキスト受信、テキスト/画像/ファイル送信が主な機能です。**グループチャットには対応していません**。
:::

## 開始前の準備

- Nekro Agent のデプロイが完了しており、WebUI を開けること
- Bot とチャットしたい WeChat アカウント

## ステップ1：Nekro Agent でアダプターを有効化

1. Nekro Agent の WebUI を開く
2. 「アダプター」->「WeChat OpenILink」に入る
3. `アダプターを有効化` スイッチをオンにする
4. 設定を保存

![na設定ページ](/assets/adapters/wechat_openilink/wechat_openilink_config.png)

## ステップ2：Nekro Agent を再起動して QR コードログインを完了

1. Nekro Agent コンテナを再起動し、アダプターの初期化を開始させる
2. 「アダプター」->「WeChat OpenILink」->「ログイン」に入る
3. Bot とチャットしたい WeChat アカウントで QR コードをスキャンしてログイン

![ログインページ](/assets/adapters/wechat_openilink/wechat_openilink_login.png)

::: tip ログインタイムアウト
デフォルトのログインタイムアウトは `180 秒`です。この時間内に QR コードのスキャンを完了しない場合、アダプターの初期化が失敗してエラーが発生します。フローを再トリガーするには、Nekro Agent を再起動してください。
:::

## ステップ3：接続成功を確認

1. WeChat が自動的に開いたウィンドウにメッセージを送信
2. Nekro Agent が正常に応答すれば、接続成功です

::: warning グループチャットは現在利用できません
このアダプターは現在**プライベートチャットのみでトリガー**され、グループチャットへの追加はできません。
:::

## よくある質問

### 起動後にログインページの QR コード生成が失敗する

- アダプターが**有効化**され、設定が保存されていることを確認
- Nekro Agent が**完全に再起動**されていることを確認（設定の保存だけではアダプターの再初期化はトリガーされません）
- ログにネットワークエラーがないか確認し、サーバーが `BASE_URL` にアクセスできることを確認

### QR コードスキャン後にメッセージを受信しない

以下の順序で切り分けてください：

1. Nekro Agent メインサービスのログに `wechat_openilink` 関連のエラーがないか確認
2. モデルグループが正しく設定されているか確認（[モデル管理](/ja/docs/03_advanced/model_config) を参照）。設定されていない場合、メッセージを受信しても AI の応答は発生しません

## 次のステップ

- モデルがまだ？[モデル管理](/ja/docs/03_advanced/model_config) で少なくとも1つのチャットモデルグループを設定してください
- ロボットに個性を与えたい？[ペルソナのコツ](/ja/docs/03_advanced/persona_tips) を参考にしてください
- WeChat アカウントを複数設定、または複数プラットフォームのアカウントがある？[チャンネル管理](/ja/docs/03_advanced/channel_management) を参考にしてください
