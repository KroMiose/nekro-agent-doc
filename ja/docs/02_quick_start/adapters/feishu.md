---
title: Feishu 設定ガイド
description: Feishu を初めて接続する方向けの Nekro Agent 設定ガイドです。
---

# Feishu 設定ガイド

この記事では、Feishu アダプターを設定して Nekro Agent を Feishu に接続する方法を説明します。

## 事前準備

- Nekro Agent のデプロイが完了している
- Feishu の企業自作アプリを作成できる権限がある
- [Feishu Open Platform](https://open.feishu.cn/app) を開ける

## ステップ1: Feishu アプリを作成し、Bot 機能を追加する

1. [Feishu Open Platform](https://open.feishu.cn/app) を開く
2. `Enterprise Self-built App` を作成する
3. アプリ名と説明を入力する
4. アプリ能力で `Bot` を追加する

![アプリを作成する](/assets/adapters/feishu/create.png)

![機能を追加する](/assets/adapters/feishu/add.png)

## ステップ2: `App ID` と `App Secret` を取得する

`Credentials & Basic Information` を開き、次の 2 つを控えます:

- `App ID`
- `App Secret`

どちらも後で Nekro Agent に入力します。

![認証情報](/assets/adapters/feishu/id.png)

## ステップ3: イベント購読を長接続モードへ切り替える

1. `Events & Callbacks` -> `Event Configuration` を開く
2. `Long Connection` モードを選ぶ
3. イベント `im.message.receive_v1` を追加する

Feishu 側ではここを必ず長接続にしてください。HTTP コールバックにはしないでください。

![Feishu のイベント購読を長接続に設定する](/assets/adapters/feishu/config.png)

## ステップ4: アプリ権限を設定する

`Permission Management` を開き、`Bulk Import/Export Permissions` をクリックして、既存内容を次で置き換えてから次へ進みます:

```json
{
  "scopes": {
    "tenant": [
      "contact:contact.base:readonly",
      "contact:user.base:readonly",
      "im:chat",
      "im:message",
      "im:message.group_at_msg:readonly",
      "im:message.group_msg",
      "im:message.p2p_msg:readonly",
      "im:message.reactions:write_only",
      "im:message:send_as_bot",
      "im:resource"
    ],
    "user": []
  }
}
```

権限が足りない場合、接続はできても送信できない、またはグループメッセージを受信できない、という症状がよく出ます。

![一括インポート](/assets/adapters/feishu/config2.png)

![権限入力欄](/assets/adapters/feishu/config3.png)

## ステップ5: Nekro Agent に設定を入力する

1. `アダプター設定` -> `Feishu` を開く
2. `アダプターを有効化` をオンにする
3. `App ID` を入力する
4. `App Secret` を入力する
5. 保存して Nekro Agent を再起動する

![Nekro Agent 内の Feishu 設定ページ](/assets/adapters/feishu/na_config.png)

## ステップ6: アプリを公開してインストールする

1. Feishu 管理画面でバージョンを作成する
2. プラットフォーム要件に従って公開申請する
3. 対象テナントにアプリがインストール済みであることを確認する
4. Bot をテスト用グループへ追加するか、プライベートチャットを送る

![公開](/assets/adapters/feishu/publish.png)

## ステップ7: 正常に設定できたか確認する

1. Bot にプライベートメッセージを送る
2. あるいはグループで Bot を `@メンション` してメッセージを送る
3. Nekro Agent が正常に返信すれば設定完了です

## 実際に入力する主な項目

- `APP_ID`: Feishu Open Platform で取得
- `APP_SECRET`: Feishu Open Platform で取得

## よくある問題

### Feishu 側の設定は終わっているのに Bot が返信しない

まず次を確認してください:

1. イベント購読が本当に `Long Connection` になっているか
2. `APP_ID` と `APP_SECRET` を正しくコピーしたか
3. アプリの公開とインストールが完了しているか
4. 必要な権限がすべて有効になっているか

### プライベートチャットでは動くが、グループで返信しない

多くの場合、グループメッセージ関連の権限不足か、Bot が正しくグループへ追加されていないことが原因です。
