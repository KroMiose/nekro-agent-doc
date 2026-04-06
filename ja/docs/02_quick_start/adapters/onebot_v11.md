---
title: OneBot V11 / NapCat 設定ガイド
description: QQ プラットフォームを初めて接続する方向けの OneBot V11 / NapCat 設定ガイドです。
---

# OneBot V11 / NapCat 設定ガイド

この記事では、OneBot V11 / NapCat を設定して Nekro Agent を QQ に接続する方法を説明します。

::: tip ヒント

NekroAgent Windows ランチャーでインストールした場合は、ランチャーの NapCat ページからワンクリックでネットワーク設定を完了できます。

:::

## 事前準備

- Nekro Agent のデプロイが完了しており、WebUI を開ける
- Bot 用に使用する QQ アカウントがある
- Nekro Agent のアクセス先を把握している。例: `http://<server-ip>:8021`

## ステップ1: 先に Nekro Agent で OneBot V11 を有効にする

1. Nekro Agent WebUI を開く
2. `アダプター` -> `OneBot V11` を開く
3. `設定` ページを開く
4. `アダプターを有効化` をオンにする
5. `Bot QQ 番号` を入力する
6. `NapCat WebUI URL` を入力する
7. アダプター設定を保存する
8. Nekro Agent を再起動する
9. `OneBot V11` アダプターに戻り、`NapCat` ページを開く
10. 画面に表示される `OneBot Service Access Key` と `NapCat Login Token` を控える

![Nekro Agent 内の OneBot V11 設定ページ](/assets/adapters/onebot_v11/nekro-agent-onebot-config.png)

### 主な項目の入力方法

- `BOT_QQ`: Bot に使用する QQ 番号
- `RESOLVE_CQ_CODE`: 通常はデフォルトのままで問題ありません。プロトコル側で CQ コードを解析する必要がある場合だけ有効にしてください
- `NAPCAT_ACCESS_URL`: NapCat WebUI のアドレス。一般的には `http://<server-ip>:6099/webui`
- `NAPCAT_CONTAINER_NAME`: 標準的なデプロイでは通常変更不要です

## ステップ2: NapCat にログインする

1. NapCat WebUI を開く。一般的なアドレスは `http://<server-ip>:6099/webui`
2. 先ほど控えた `NapCat Login Token` でログインする
3. 画面の案内に従って QQ にログインする
4. NapCat がオンライン状態になっていることを確認する
5. 初回アクセスの場合は、先に `システム設定` -> `パスワード変更` でデフォルトパスワードを変更する

![NapCat ログインページ](/assets/adapters/onebot_v11/nc-login.png)

## ステップ3: NapCat でリバース WebSocket を設定する

1. NapCat の `ネットワーク設定` を開く
2. `WebSocket クライアント` を追加する
3. アドレスに次を入力する:

```text
ws://nekro_agent:8021/onebot/v11/ws
```

一体化コンテナ構成ではない場合は、次のように変更できます:

```text
ws://<your-server-ip>:8021/onebot/v11/ws
```

4. 認証キーには、先ほど Nekro Agent 側で表示された `OneBot Service Access Key` を入力する
5. 保存して、この接続を有効化する

![NapCat ネットワーク設定ページ](/assets/adapters/onebot_v11/nc-internet.png)

## ステップ4: 接続できたか確認する

設定が完了したら、次の順で確認してください:

1. NapCat の `Cat Logs` を開く
2. WebSocket 関連のエラーがないか確認する
3. Bot にプライベートメッセージを送る
4. Nekro Agent に戻り、`システムログ` に送信したメッセージが表示されるか確認する
5. 表示されていれば設定完了です

## NapCat を使わない場合

ほかの `OneBot V11` 互換プロトコル実装を使う場合も、リバース WebSocket の接続先を次に向ければ利用できます:

```text
ws://<your-server-ip>:8021/onebot/v11/ws
```

画像やファイル送信も使う場合は、Nekro Agent とプロトコル実装が同じマウントパスを参照していることも確認してください。

## 設定後に表示されるチャット名

- グループチャット: `onebot_v11-group_<group-id>`
- プライベートチャット: `onebot_v11-private_<qq-number>`

どちらも正常な表示なので、手動で変更する必要はありません。

## よくある問題

### NapCat はログイン済みなのに、Nekro Agent がメッセージを受け取らない

まず次を確認してください:

1. リバース WebSocket の URL が正しいか
2. `OneBot Service Access Key` が正しいか
3. NapCat 側で接続スイッチが本当に有効になっているか
4. Nekro Agent 側の `OneBot V11` アダプターが有効になっているか

### メッセージは受信できるが送信できない

主な原因は次のとおりです:

1. Bot アカウントがプラットフォーム側で制限されている
2. Bot アカウントがミュートされている
3. プロトコル実装と Nekro Agent の接続が切れている

### 画像やファイルの送信に失敗する

標準の一体化デプロイではない場合、まず次を確認してください:

1. プロトコル実装が画像やファイル送信に対応しているか
2. Nekro Agent とプロトコル実装の両方から同じファイルパスが参照できるか
3. ファイルサイズがプラットフォームの制限を超えていないか
