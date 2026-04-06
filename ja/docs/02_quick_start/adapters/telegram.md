---
title: Telegram 設定ガイド
description: Telegram を初めて接続する方向けの Nekro Agent 設定ガイドです。
---

# Telegram 設定ガイド

この記事では、Telegram アダプターを設定して Nekro Agent を Telegram Bot に接続する方法を説明します。

## 事前準備

- Nekro Agent のデプロイが完了しており、WebUI を開ける
- 利用中のネットワークから Telegram にアクセスできる
- 直接接続できない場合は、事前にプロキシ URL を用意しておく

## ステップ1: BotFather で Bot を作成する

1. Telegram で [@BotFather](https://t.me/BotFather) を開く
2. `/newbot` を送信する
3. 案内に従って Bot 名とユーザー名を設定する
4. 返ってきた `Bot Token` を控える

![BotFather が Bot を作成して Token を返す画面](/assets/adapters/telegram/create.png)

## ステップ2: Bot のプライバシー設定を無効にする

::: tip ヒント

プライバシーモードを無効にしないと、グループ内で `/` から始まらない通常メッセージを Bot が受け取れません。

:::

1. Telegram で [@BotFather](https://t.me/BotFather) を開く
2. `/setprivacy` を送信する
3. 先ほど作成した Bot を選ぶ
4. `Disable` を選ぶ

![プライバシーモードを無効にする](/assets/adapters/telegram/change_privacy.png)

## ステップ3: Nekro Agent に設定を入力する

1. `アダプター` -> `Telegram` を開く
2. `アダプターを有効化` をオンにする
3. 先ほど取得した `Bot Token` を入力する
4. ネットワークの都合で必要なら `Proxy URL` も入力する
5. 保存して Nekro Agent を再起動する

![Nekro Agent 内の Telegram 設定ページ](/assets/adapters/telegram/na_config.png)

## ステップ4: 正常に設定できたか確認する

1. Bot にプライベートメッセージを送る
2. グループで試す場合は、Bot を `@メンション` してからメッセージを送る
3. Nekro Agent が正常に返信すれば設定完了です

## 初回設定で覚えておけばよい 2 項目

- `Bot Token`: 必須。`@BotFather` で取得
- `Proxy URL`: Telegram に直接接続できない場合だけ必要

## よくある問題

### 起動しても何も起きない

次の順で確認してください:

1. `Bot Token` を正しくコピーしたか
2. Bot の作成が本当に完了しているか
3. サーバーから Telegram にアクセスできるか
4. プロキシが必要なのに未設定ではないか

### プライベートチャットでは動くが、グループで返信しない

グループでは、主に次のどちらかが原因です:

1. Bot を `@メンション` していない
2. プライバシーモードが無効になっておらず、かつメッセージが `/` で始まっていない
