---
title: WeCom AI Bot 設定ガイド
description: WeCom AI Bot を初めて接続する方向けの設定ガイドです。
---

# WeCom AI Bot 設定ガイド

この記事では、WeCom AI Bot アダプターを設定し、WeCom 公式の長接続モードで Nekro Agent を接続する方法を説明します。

## 事前準備

- Nekro Agent のデプロイが完了している
- WeCom 管理画面にアクセスできる
- WeCom AI Bot を作成または管理できる

## ステップ1: WeCom 管理画面で AI Bot を作成する

1. WeCom AI Bot の管理画面を開く
   - Web 版の入口: `セキュリティ管理` -> `管理ツール` -> `スマートロボット`
   - デスクトップ版の入口: `ワークベンチ` -> `スマートロボット`
2. `ボットを作成` をクリックし、`手動作成` を選んだあと、右側の設定欄を一番下までスクロールして `API モードで作成` を選ぶ
3. `長接続を使用` を選ぶ
4. 次の値を控える:
   - `BOT_ID`
   - `BOT_SECRET`

![手動作成](/assets/adapters/wecom_ai/create1.png)

![API モード](/assets/adapters/wecom_ai/create2.png)

![WeCom AI Bot 管理画面内の BOT_ID と BOT_SECRET](/assets/adapters/wecom_ai/botid&secret.png)

## ステップ2: Nekro Agent に設定を入力する

1. `アダプター` -> `WeCom AI Bot` を開く
2. `アダプターを有効化` をオンにする
3. `Bot ID` を入力する
4. `Secret` を入力する
5. 保存して Nekro Agent を再起動する

![Nekro Agent 内の WeCom AI Bot 設定ページ](/assets/adapters/wecom_ai/na_config.png)

## ステップ3: 長接続が確立したか確認する

設定が終わったら、次の順で確認してください:

1. Nekro Agent のログを開く
2. 認証情報エラーが出ていないことを確認する
3. Bot にテストメッセージを送る
4. Nekro Agent が正常に受信して返信できれば設定完了です

## 初回設定で主に見る項目

- `BOT_ID`: WeCom AI Bot 管理画面で取得
- `BOT_SECRET`: WeCom AI Bot 管理画面で取得

次のオプション項目は、初回設定では通常デフォルトのままで構いません:

- `Heartbeat Interval`
- `Request Timeout`
- `Base Reconnect Interval`
- `Maximum Reconnect Count`
- `All received messages trigger AI`
- `Accept text messages`
- `Log event callbacks`
- `Log raw frames`
- `Maximum log length`

## このモードが向いているケース

- WeCom 公式の機能を使いたい
- 公開コールバック URL を用意したくない
- 長接続で直接メッセージを送受信したい

## 現在わかっている制限

- 現状の能動送信は主に Markdown、画像、ファイルをサポートします
- 音声、動画、テンプレートカードなどはまだ未完成です
- 一部のユーザー名やグループ名では、生の ID が表示されることがあります

## よくある問題

### ログに接続失敗が出続ける

まず次を確認してください:

1. `BOT_ID` と `BOT_SECRET` を正しくコピーしたか
2. WeCom 管理画面で Bot の作成が本当に完了しているか
3. Nekro Agent を動かしている環境から WeCom 公式サービスへアクセスできるか

### 接続はできているが、メッセージの表現が不完全

これは現在のアダプターの能力範囲によるもので、特に音声、動画、テンプレートカード系で起きやすいです。
