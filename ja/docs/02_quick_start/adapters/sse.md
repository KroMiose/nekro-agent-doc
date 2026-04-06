---
title: SSE 設定ガイド
description: SSE アダプターの設定方法と、カスタムクライアントを Nekro Agent に接続する方法を説明します。
---

# SSE 設定ガイド

この記事では、SSE アダプターを設定し、カスタムクライアントを Nekro Agent に接続する方法を説明します。

::: warning 利用範囲
このアダプターは、関連プロトコルの知識があり、かつ Nekro Agent に慣れているユーザー向けです。
:::

## 事前準備

- Nekro Agent のデプロイが完了している
- 接続するカスタムクライアントまたは Web フロントエンドを用意している
- HTTP エンドポイントへリクエストを送り、SSE の長接続を維持する方法を理解している

## ステップ1: 先に Nekro Agent で SSE を有効にする

1. `アダプター設定` -> `SSE` を開く
2. `ENABLED` をオンにする
3. 必要に応じて `ACCESS_KEY` を入力する
4. ファイル送信を使う場合は `ALLOW_FILE_TRANSFER` をオンにする
5. 保存して Nekro Agent を再起動する

## ステップ2: クライアントの接続方法を決める

SSE アダプターでよく使うエンドポイントは次の 2 つです:

- 接続を開始する:

```text
GET /api/adapters/sse/connect
```

- コマンドを送る:

```text
POST /api/adapters/sse/connect
```

`ACCESS_KEY` を設定した場合、クライアント側でも同じアクセスキーを送る必要があります。

## ステップ3: クライアントから SSE 接続を張る

接続時によく使うパラメーターは次のとおりです:

- `client_name`
- `platform`
- `access_key`

例:

```text
GET /api/adapters/sse/connect?client_name=my-web&platform=web&access_key=your_key
```

接続が確立すると、Nekro Agent はこのクライアントへメッセージをプッシュできます。

## ステップ4: コマンド送信時はリクエストヘッダーを付ける

コマンド用エンドポイントにリクエストを送るときは、通常次のヘッダーを付けます:

- `X-Client-ID`
- `X-Access-Key`

`ACCESS_KEY` を設定していない場合、`X-Access-Key` は省略できます。

## ステップ5: 正常に設定できたか確認する

1. 先にクライアントで SSE の長接続を張る
2. Nekro Agent からこの SSE チャットへテストメッセージを送る
3. クライアントが受信できれば設定完了です

## まず理解しておくべき主な項目

- `Access Key`: アクセスチェックを入れるか
- `Allow File Transfer`: ファイルや画像の送受信を許可するか
- `Maximum File Size (Bytes)`: ファイルサイズ上限
- `Allowed File Types`: 許可するファイル種別
- `Response Timeout (Seconds)`: クライアント応答を待つ時間
- `Ignore Client Response`: クライアント応答を無視するか

## 設定後のチャットキー形式

SSE 内部では、チャットキーは一般的に次の形式になります:

```text
sse-{platform}-{channel_id}
```

例:

```text
sse-web-private_user001
```

## よくある問題

### クライアントが接続できない

まず次を確認してください:

1. Nekro Agent 側で SSE アダプターが有効になっているか
2. 接続先アドレスが正しいか
3. `access_key` がサーバー側と一致しているか

### メッセージ送信後に Nekro Agent が失敗扱いにする

多くの場合、クライアントが時間内に応答を返していません。次のいずれかで対応できます:

1. 先にクライアント側の応答処理を修正する
2. 一時的に `IGNORE_RESPONSE` を有効にする

ただし 2 つ目はデバッグ向けです。実際には未達のメッセージまで成功扱いになる可能性があります。
