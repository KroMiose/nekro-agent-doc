---
title: Email 設定ガイド
description: Email を初めて接続する方向けの Nekro Agent 設定ガイドです。
---

# Email 設定ガイド

この記事では QQ メールを例に、Email アダプターを設定して Nekro Agent をメール送受信フローへ接続する方法を説明します。

::: tip ヒント

現在のアダプターは、Gmail や Outlook など OAuth 認証が必須のメールサービスには対応していません。

:::

::: tip ヒント

メールサービスごとに設定は異なります。実際のプロバイダー要件を優先してください。

:::

## 事前準備

- Nekro Agent のデプロイが完了している
- テスト用に使うメールアカウントを用意している
- そのメールアカウントで `IMAP` と `SMTP` が有効になっている
- 認証コードまたはアプリ専用パスワードを取得している

## ステップ1: メール管理画面で認証コードを取得する

1. QQ メールにログインする
2. 右上のアカウントメニューから `アカウントとセキュリティ` を開く
3. 開いた画面で `セキュリティ設定` を選び、`POP3/IMAP/SMTP/Exchange/CardDAV` のサービスを有効にする
4. 画面の案内に従って関連機能を有効化する
5. 認証コードを控える

![設定 1](/assets/adapters/email/config.png)

![設定 2](/assets/adapters/email/config2.png)

![認証コード](/assets/adapters/email/config3.png)

## ステップ2: Nekro Agent にメールアカウントを追加する

1. `アダプター` -> `Email` を開く
2. `アダプターを有効化` をオンにする
3. `Email Account List` に新しいアカウントを追加する
4. `Provider` を入力する
5. `Email Address` と `Authorization Code` を入力する
6. そのアカウントでも送信したい場合は `Enable Sending` をオンにする
7. 常にこのアカウントを使って送信したい場合は `Default Sender` もオンにする
8. 保存して Nekro Agent を再起動する

![Nekro Agent 内の Email 設定ページ](/assets/adapters/email/na_config.png)

### 主な項目の入力方法

- `Provider`: 一般的には `QQ Mail`、`163 Mail`、`Custom`
- `Username`: 完全なメールアドレス。例: `user@example.com`
- `Password / Authorization Code`: 認証コードまたはアプリ専用パスワード
- `Enable Sending`: このアカウントで送信を許可するか
- `Default Sender`: このアカウントをデフォルト送信元にするか

`Custom` を選ぶ場合は、さらに次も入力します:

- `Custom IMAP Host`
- `Custom IMAP Port`
- `Custom SMTP Host`
- `Custom SMTP Port`
- `Custom SMTP SSL Port`

## ステップ3: ポーリングと通知を設定する

まず確認すべき全体設定は次のとおりです:

- `Polling Interval (Seconds)`: 新着メール確認の間隔。初期値は 30 秒
- `Unread Only`: 未読メールだけ取得するか
- `Maximum Fetch Count`: 1 回で取得する最大件数
- `Mark as Read After Fetch`: 取得後に既読へするか
- `Enable New Mail Notification`: 新着通知を有効にするか
- `Notification Chat`: 通知を送るチャット先

初回利用では、必要になるまで基本的にデフォルト値のままで問題ありません。

## ステップ4: 正常に設定できたか確認する

1. このメールアドレス宛にテストメールを送る
2. 1 回分のポーリング周期を待つ
3. Nekro Agent に新しい Email チャットが作成されるか確認する
4. 送信機能も有効にした場合は、AI にテストメール送信を試させる

## 設定後に表示されるチャット名

各メールアカウントは個別のチャットとして表示されます:

```text
email-<your-email-address>
```

例:

```text
email-123456@qq.com
```

## 添付ファイルの保存先

メール添付ファイルは次の場所へ自動保存されます:

```text
data/uploads/email_attachment/{mailbox-account}/{message-uid}/{attachment-file-name}
```

AI に添付ファイルを扱わせる場合は、データディレクトリが書き込み可能であることを確認してください。

## よくある問題

### ユーザー名とパスワードは合っているのに接続できない

多くの場合、ログインパスワードを入力しており、認証コードを入力していないことが原因です。

### 受信はできるが送信できない

まず次を確認してください:

1. 対象アカウントで `Enable Sending` が有効か
2. メールサービス側で SMTP が有効か
3. そのアカウントがデフォルト送信元になっているか、あるいは送信時に明示指定しているか

### 2 つのメールアカウントを両方ともデフォルト送信元にした

それはできません。デフォルト送信元は 1 つだけです。
