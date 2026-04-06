---
title: Discord 設定ガイド
description: Discord を初めて接続する方向けの Nekro Agent 設定ガイドです。
---

# Discord 設定ガイド

この記事では、Discord アダプターを設定して Nekro Agent を Discord Bot に接続する方法を説明します。

## 事前準備

- Nekro Agent のデプロイが完了している
- [Discord Developer Portal](https://discord.com/developers/applications) を開ける
- Bot を招待できる Discord サーバーを持っている

## ステップ1: Discord アプリと Bot を作成する

1. [Discord Developer Portal](https://discord.com/developers/applications) を開く
2. `New Application` をクリックする
3. アプリ名を入力して作成する
4. 左側の `Bot` を開く

![アプリを作成する](/assets/adapters/discord/create.png)

## ステップ2: Bot Token をコピーする

`Bot` ページで:

1. `Token` を見つける
2. コピーするか、リセットして新しい Token をコピーする
3. 後で Nekro Agent に入力するため控えておく

![Token](/assets/adapters/discord/token.png)

## ステップ3: 必要な Intent を有効にする

Bot がメッセージを読めるように、少なくとも次を有効にしてください:

- `PRESENCE INTENT`
- `MESSAGE CONTENT INTENT`

`MESSAGE CONTENT INTENT` を有効にしないと、通常はメッセージ本文を受信できません。

![Discord Bot ページ内の Intent スイッチ](/assets/adapters/discord/config.png)

## ステップ4: Bot をサーバーへ招待する

1. `OAuth2` -> `URL Generator` を開く
2. `SCOPES` で次にチェックを入れる:
   - `bot`
   - `applications.commands`
3. `BOT PERMISSIONS` では少なくとも次を有効にする:
   - `Read Messages/View Channels`
   - `Send Messages`
   - `Embed Links`
   - `Attach Files`
   - `Read Message History`
4. 生成された招待リンクを開き、Bot をサーバーに追加する

![権限設定 1](/assets/adapters/discord/config2.png)

![権限設定 2](/assets/adapters/discord/config3.png)

![招待リンク](/assets/adapters/discord/config4.png)

## ステップ5: Nekro Agent に設定を入力する

1. `アダプター` -> `Discord` を開く
2. `アダプターを有効化` をオンにする
3. `Discord Bot Token` を入力する
4. ネットワークの都合で必要なら `Proxy URL` も入力する
5. 保存して Nekro Agent を再起動する

![Nekro Agent 内の Discord 設定ページ](/assets/adapters/discord/na_config.png)

## ステップ6: 正常に設定できたか確認する

1. Bot に権限がある Discord チャンネルを開く
2. テストメッセージを送る
3. Nekro Agent が正常に返信すれば設定完了です

## 実際に入力する主な項目

- `Discord Bot Token`: 必須。Discord Developer Portal で取得

## よくある問題

### Bot はオンラインだが返信しない

まず次を確認してください:

1. `MESSAGE CONTENT INTENT` が有効か
2. 現在のチャンネルで Bot に閲覧・送信権限があるか
3. Nekro Agent に入力した Token がまだ有効か

### Bot がサーバーに入ってこない

招待リンクの権限不足か、招待時にサーバーを間違えた可能性が高いです。招待リンクを作り直すと解決することが多いです。
