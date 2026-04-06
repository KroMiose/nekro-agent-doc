---
title: WeCom カスタムアプリ設定ガイド
description: WeCom カスタムアプリを初めて接続する方向けの設定ガイドです。
---

# WeCom カスタムアプリ設定ガイド

この記事では、WeCom カスタムアプリのアダプターを設定し、WeCom のアプリコールバック方式で Nekro Agent を接続する方法を説明します。

## 事前準備

- Nekro Agent のデプロイが完了している
- WeCom 管理画面にアクセスできる
- インターネットから到達できる公開 HTTP/HTTPS アドレスを用意している

## ステップ1: WeCom 管理画面でカスタムアプリを作成する

1. WeCom カスタムアプリの管理画面を開く
   - Web 版の入口: `アプリ管理` -> `アプリ管理` -> `アプリを作成`
   - デスクトップ版: 非対応
2. アプリ名と説明を入力し、表示範囲を選択し、アプリアイコン用の画像をアップロードする
3. アプリのホーム画面で `AgentId` と `Secret` を控える。`Secret` は表示ボタンを押し、必要に応じてデスクトップ版またはモバイル版の企業アカウントで確認する
4. `メッセージ受信` の中で `API 受信を設定` をクリックする
5. `URL` を入力し、`Token` と `EncodingAESKey` を生成して控える。`URL` には事前に用意した公開 HTTP/HTTPS アドレスを指定し、Nekro Agent の WeCom カスタムアプリ受信先 `http://ip:port/api/adapters/wxwork_corp_app/callback` を向ける。公開ドメインがない場合、このアダプターは適していません。[WeCom AI Bot](/ja/docs/02_quick_start/adapters/wecom_bot) を使用してください
6. 2 つのトークンを取得しても、この時点ではまだ保存しないでください。先にステップ2を終えてアダプターを有効化し、Nekro Agent を再起動してから保存してください。そうしないと URL 検証に失敗します
7. アプリ保存後はアプリ管理ページに戻って信頼済み IP を設定します。サービスをデプロイしたマシンで `curl ifconfig.me` を実行し、その出力を `企業信頼 IP` に入力して保存してください

![AgentId](/assets/adapters/wecom_crop/config1.png)

![Secret](/assets/adapters/wecom_crop/secret.png)

![Callback URL](/assets/adapters/wecom_crop/config2.png)

## ステップ2: Nekro Agent に設定を入力する

1. `アダプター` -> `WeCom Corp App` を開く
2. `アダプターを有効化` をオンにする
3. 次を入力する:
   - `Corp ID`
   - `Secret`
   - `Agent ID`
   - `Callback Token`
   - `Callback EncodingAESKey`
4. 保存して Nekro Agent を再起動する

`Corp ID` は企業管理画面から取得します:

- Web 版: `マイ企業` -> `企業 ID`
- デスクトップ版: 非対応

![Nekro Agent 内の WeCom カスタムアプリ設定ページ](/assets/adapters/wecom_crop/na_config.png)

## ステップ3: 正常に設定できたか確認する

1. アプリへテストメッセージを送る
2. Nekro Agent が受信して返信できれば設定完了です

## ステップ4（任意）: WeChat Customer Service からカスタムアプリ経由で Nekro Agent を使う

1. `WeChat Customer Service` の管理画面を開く
   - Web 版: `アプリ管理` -> `アプリ管理` -> `WeChat Customer Service`
   - デスクトップ版: `ワークベンチ` -> `WeChat Customer Service`
2. カスタマーサービス用アカウントを作成する
3. WeChat Customer Service の下にある小さな `API` ボタンをクリックし、ポップアップの `API を呼び出せるアプリ` で、先ほど作成したカスタムアプリにチェックを入れて確定する
4. `API を呼び出せるアプリ` の下にある `設定へ移動` をクリックし、新しい画面で `操作` の `...` を開き、`カスタマーサービスアカウントを設定` を選んで、先ほど作成したアカウントを紐づける

![API](/assets/adapters/wecom_crop/config3.png)

![API 権限](/assets/adapters/wecom_crop/config4.png)

![設定](/assets/adapters/wecom_crop/config5.png)

![その他操作](/assets/adapters/wecom_crop/config6.png)

![カスタマーサービス設定](/assets/adapters/wecom_crop/config7.png)

## このモードで注意すること

- 現状は主にプライベートメッセージの送受信をサポートします

## よくある問題

### WeCom 管理画面でコールバック検証に失敗する

まず次を確認してください:

1. コールバック URL がインターネットから到達できるか
2. `CALLBACK_TOKEN` が両側で一致しているか
3. `CALLBACK_ENCODING_AES_KEY` が両側で一致しているか

### アプリの検証は通るが、Bot が返信しない

この場合は、Nekro Agent に入力した `CORP_ID`、`Secret`、`AgentId` が正しいか確認してください。
