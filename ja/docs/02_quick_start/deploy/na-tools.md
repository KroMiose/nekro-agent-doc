---
title: NA-Tools デプロイ（公式 CLI）
description: 公式提供のワンストップ CLI ツール na-tools を使用して、macOS または Linux に Nekro Agent をデプロイ・管理する
---

# NA-Tools デプロイチュートリアル

`na-tools` は公式が提供するクロスプラットフォーム対応の自動デプロイ CLI ツールで、**macOS** と **Linux** をサポートしています。インストール、設定からバックアップ、復元までのライフサイクル管理機能を提供します。

## なぜ na-tools を選ぶのか？

- **クロスプラットフォーム対応**：Linux（Ubuntu/Debian など）と macOS を同時にサポート
- **完全自動環境検出**：Docker 環境を自動検出し、インストールをガイド
- **便利なミラーソース管理**：ワンクリックで国内 Docker ミラーソースを設定し、ダウンロードを高速化
- **充実したバックアップ・復元**：ワンクリックでデータと設定をバックアップし、インタラクティブな復元をサポート
- **マルチインスタンス管理**：1台のマシンに複数の Nekro Agent インスタンスをデプロイ可能

---

## ステップ1：na-tools をインストール

na-tools には **Python 3.11+** 環境が必要です（Nekro Agent メインプログラムのバージョン要件と同一）。[uv](https://docs.astral.sh/uv/) を使用してインストールすることをお勧めします。uv は Python 環境を自動管理し、システムを汚染しません。

### 1. uv をインストール（まだインストールしていない場合）

ターミナルで以下のコマンドを実行してください：

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

インストール完了後、**ターミナルを再起動**するか、`source ~/.bashrc`（zsh ユーザーは `source ~/.zshrc`）を実行して `uv` コマンドを有効にしてください。

### 2. uv を使用して na-tools をインストール

```bash
uv tool install na-tools
```

### 3. インストールの検証

```bash
na-tools --version
```

バージョン番号（例：`na-tools, version x.x.x`）が表示されれば、インストール成功です。

:::tip na-tools のアップグレード
後で na-tools 自体をアップグレードする場合は、以下を実行してください：
```bash
uv tool upgrade na-tools
```
:::

---

## ステップ2：Nekro Agent をワンクリックデプロイ

以下のコマンドを実行してインストールプロセスを開始してください：

```bash
na-tools install
```

インストールプロセスでは、以下のステップを**インタラクティブにガイド**します：

### インストールフローの詳細

**1. Docker 環境の検出**

na-tools はシステムに Docker がインストールされているかを自動的に検出します：

- **Linux ユーザー**：Docker が未インストールの場合、ツールが自動インストールを試みます。
- **macOS ユーザー**：Docker が未インストールの場合、ツールが [Docker Desktop](https://www.docker.com/products/docker-desktop/) の手動インストールを案内します。Docker Desktop をインストールして起動した後、再度 `na-tools install` を実行してください。

**2. データディレクトリの選択**

ツールが Nekro Agent のデータ保存ディレクトリの選択を促します。デフォルトのパスは通常 `~/nekro_agent_data` です。**Enter** を押せばデフォルトパスを使用でき、カスタムパスを入力することもできます。

**3. NapCat の含める/含めない**

ツールが NapCat（QQ プロトコルエンド）をインストールするかどうかを尋ねます。QQ に接続する必要がある場合は、**はい** を選択してください。

**4. 基本パラメータの設定**

ツールが `.env` 設定ファイルを自動生成し、ポート、トークンなどの情報が含まれます。このステップで設定を確認または変更できます。

**5. サービスのダウンロードと起動**

ツールが自動的に以下を実行します：
- `docker-compose.yml` オーケストレーションファイルのダウンロード
- 必要な Docker イメージのプル
- すべてのサービスコンテナの起動

**6. サンドボックスイメージ**

Nekro Agent には2種類のサンドボックスイメージがあります：

- **汎用サンドボックス** `kromiose/nekro-agent-sandbox`：AI が生成したコードスニペットの実行に使用されるコア機能。インストール時に**自動的にプル**され、選択は不要です。
- **CC サンドボックス** `kromiose/nekro-cc-sandbox`：Claude Code ワークスペース用の隔離環境。サイズが大きく、**オプション**でインストールします。インストール中にプルするかどうかを尋ねられます。ワークスペース/Claude Code 機能をすぐに使用しない場合は、まず**いいえ**を選択し、後から `na-tools update --update-cc-sandbox` で追加インストールできます。

**7. デプロイ完了**

インストール完了後、ターミナルに情報パネルが表示されます。以下が含まれます：

- **Web アクセスアドレス**（デフォルト `http://あなたのIP:8021`）
- **管理者パスワード**
- **アクセストークン**
- **NapCat ポート**（NapCat をインストールした場合）

:::warning この情報を保存してください
デプロイ完了後に表示されるパスワードとトークンは非常に重要です。必ず記録してください。後で Web 管理画面へのログインや API 呼び出しに必要です。
:::

### インストールオプション早見表

インタラクティブな質問をスキップしたい場合は、コマンドライン引数で直接指定できます：

```bash
# データディレクトリとポートを指定
na-tools install --data-dir ~/my_nekro_data --port 9000

# NapCat を明示的に含める/含めない
na-tools install --with-napcat
na-tools install --without-napcat

# CC サンドボックスを明示的に含める/含めない
na-tools install --with-cc-sandbox
na-tools install --without-cc-sandbox

# 非対話モード（すべてデフォルト値を使用。自動化スクリプトに適している）
na-tools install --non-interactive

# Preview プレビューバージョンをインストール（不安定な場合がある。初心者には非推奨）
na-tools install --preview
```

---

## ステップ3（オプション）：NapCat の設定（QQ 接続）

インストール時に NapCat を含めることを選択した場合、Bot を QQ に接続するために以下の設定を完了する必要があります。

### OneBot 接続の自動設定

```bash
na-tools napcat --qq 123456789
```

設定完了後、ツールが NapCat を再起動して設定を適用するかどうかを尋ねます。

---

## 日常管理コマンド

### サービス状態の確認

```bash
na-tools status
```

### ログの確認

```bash
# Nekro Agent メインサービスのログを表示（デフォルトで最後の100行）
na-tools logs

# NapCat のログを表示
na-tools logs napcat

# ログを継続的に追跡（tail -f 相当。Ctrl+C で停止）
na-tools logs -f

# 最後の500行のログを表示
na-tools logs -n 500
```

利用可能なサービス名：`nekro_agent`（デフォルト）、`nekro_postgres`、`nekro_qdrant`、`nekro_napcat`

### サービスの更新

```bash
# 最新の安定版に更新（バックアップを取るか確認）
na-tools update

# 更新前に自動バックアップ
na-tools update --backup

# バックアップなしで更新
na-tools update --no-backup

# CC サンドボックスイメージも同時に更新
na-tools update --update-cc-sandbox

# サンドボックスイメージを更新しない
na-tools update --no-update-sandbox
```

---

## バックアップと復元

### バックアップの作成

```bash
# ワンクリックバックアップ（サービス停止 → データバックアップ → サービス再起動）
na-tools backup
```

バックアップ対象には以下が含まれます：
- データディレクトリのすべてのファイル（`.env`、`docker-compose.yml`、アプリケーション設定など）
- Docker ストレージボリューム（PostgreSQL、Qdrant データベースデータ）
- バックアップサイズを削減するため、キャッシュと一時ファイルは自動的に除外

#### バックアップオプション

```bash
# バックアップファイルの出力先パスを指定
na-tools backup -o /path/to/my_backup.tar.gz

# バックアップに名前タグを付けて、後で識別しやすくする
na-tools backup --name before-migration
# ファイル名例：nekro_agent_backup_before-migration_20260318_120000.tar.gz

# バックアップ後にサービスを自動再起動しない
na-tools backup --no-restart
```

### バックアップリストの表示

```bash
na-tools backup list
```

出力例：
```
ℹ 以下の履歴バックアップが見つかりました：
  [1] nekro_agent_backup_pre-preview_20260318_120000.tar.gz (バックアップ日時: 2026-03-18 12:00:00, 名前: pre-preview, サイズ: 45.2 MB)
  [2] nekro_agent_backup_20260317_100000.tar.gz (バックアップ日時: 2026-03-17 10:00:00, サイズ: 43.8 MB)
```

### バックアップからの復元

```bash
# インタラクティブにバックアップファイルを選択して復元
na-tools restore

# バックアップファイルを指定して復元
na-tools restore /path/to/backup.tar.gz

# 指定したデータディレクトリに復元
na-tools restore --data-dir /path/to/target_dir
```

復元フロー：サービス停止 → バックアップ解凍 → データベースボリューム復元 → サービス起動の確認。

---

## Preview プレビューバージョン

Preview チャンネルではプレビューバージョンのイメージを提供し、新機能を先に体験できますが、**不安定な場合があります**。

### Preview バージョンの新規インストール

```bash
na-tools install --preview
```

### 安定版から Preview への切り替え

```bash
na-tools update --preview
```

切り替え前に**自動的にバックアップが作成**されます（名前は `pre-preview`）。後でロールバックするために使用できます。

### Preview から安定版へのロールバック

```bash
na-tools update --rollback
```

ロールバックフロー：
1. イメージを安定版 `latest` に戻す
2. 最新の `pre-preview` バックアップを自動検索
3. そのバックアップからデータを復元するか確認
4. 安定版イメージをプルしてサービスを再起動

---

## マルチインスタンス管理

na-tools は**同じマシン上**で複数の Nekro Agent インスタンスを管理でき、各インスタンスは独立したデータディレクトリと設定を持ちます。

### 複数インスタンスのインストール

```bash
# 最初のインスタンスをインストール（デフォルトディレクトリを使用）
na-tools install

# 2番目のインスタンスを別のディレクトリにインストール
na-tools install --data-dir ~/nekro_agent_dev
```

### すべてのインスタンスを表示

```bash
na-tools list
```

出力例：
```
 * [1] /home/user/nekro_agent_data (最終使用: 2026-03-18 12:00:00)    ← 現在アクティブ
   [2] /home/user/nekro_agent_dev  (最終使用: 2026-03-17 10:00:00)
```

`*` マークは現在アクティブなインスタンスを示します。

### インスタンスの切り替え

```bash
# 番号で切り替え
na-tools use 2

# パスで切り替え
na-tools use ~/nekro_agent_dev
```

切り替え後、すべてのコマンド（`status`、`logs`、`backup` など）が切り替え先のインスタンスを操作します。

### 既存のインストールをバインド

以前の方法（手動 Docker Compose など）で Nekro Agent をインストールした場合、na-tools の管理にバインドできます：

```bash
na-tools bind --data-dir /path/to/existing/nekro_data
```

バインド時にインスタンスに名前を付けて識別しやすくできます：

```bash
na-tools bind --data-dir /opt/nekro_data --name production
```

### インスタンスの削除

```bash
# インスタンスを削除（データも同時に削除）
na-tools remove

# インスタンスを削除するがデータディレクトリは保持
na-tools remove --keep-data

# 指定したディレクトリのインスタンスを削除
na-tools remove --data-dir ~/nekro_agent_dev

# 確認をスキップして直接実行（注意して使用）
na-tools remove --force
```

:::danger 注意
`na-tools remove` はデフォルトで**データディレクトリと Docker ボリュームを削除**します。この操作は元に戻せません。管理から解除したいだけでデータを保持したい場合は、`--keep-data` オプションを使用してください。
:::

---

## Docker ミラーソースの設定

国内で Docker イメージのプル速度が遅い場合は、na-tools でミラーソースを設定できます：

```bash
# ミラーソースを設定
na-tools config mirror https://mirror.example.com

# 現在のミラーソースを確認
na-tools config mirror

# ミラーソースをクリア（デフォルトに戻す）
na-tools config mirror ""
```

設定後、以降の `install` と `update` の操作ではそのミラーソースが使用されます。

---

## コマンド早見表

### デプロイ管理

| コマンド | 説明 |
|------|------|
| `na-tools install` | Nekro Agent をインストール（Docker 検出 → 設定 → デプロイ） |
| `na-tools update` | サービスを最新バージョンに更新 |
| `na-tools remove` | NA インスタンスをアンインストールして削除 |

### インスタンス管理

| コマンド | 説明 |
|------|------|
| `na-tools bind` | インストール済みの NA インスタンスを管理リストにバインド |
| `na-tools use <番号/パス>` | 現在アクティブなインスタンスを切り替え |
| `na-tools list` | インストール済みのすべてのインスタンスを一覧表示 |
| `na-tools status` | サービスの稼働状態を確認 |

### データ管理

| コマンド | 説明 |
|------|------|
| `na-tools backup` | データと設定をバックアップ |
| `na-tools backup list` | すべての履歴バックアップを一覧表示 |
| `na-tools restore` | バックアップから復元（インタラクティブ選択またはファイル指定） |
| `na-tools config mirror` | Docker ミラーソースの確認または設定 |

### ログとツール

| コマンド | 説明 |
|------|------|
| `na-tools logs [サービス名]` | サービスのログを表示 |
| `na-tools napcat` | NapCat のログインを案内し、OneBot 接続を自動設定 |

---

## よくある質問

### Docker 関連

**Q: 「Docker がインストールされていません」と表示される場合**

- **Linux**：na-tools が Docker の自動インストールを試みます。失敗した場合は [Docker 公式インストールドキュメント](https://docs.docker.com/engine/install/) を参照してください。
- **macOS**：[Docker Desktop](https://www.docker.com/products/docker-desktop/) を手動でインストールしてください。インストール後、**Docker Desktop を起動**してから再度 `na-tools install` を実行してください。

**Q: 権限不足と表示される場合**

Linux で Docker 操作を実行するには `sudo` 権限が必要な場合があります。na-tools は権限不足時に `sudo` を使用してコマンドを再実行しようとします。

毎回のパスワード入力を避けるには、現在のユーザーを `docker` グループに追加できます：

```bash
sudo usermod -aG docker $USER
# ターミナルを再ログイン後に有効
```

### ポート関連

**Q: ポートが使用中と表示される場合**

デフォルトポート：
- `8021`：Nekro Agent メインサービス
- `6099`：NapCat WebUI

これらのポートが他のプログラムに使用されている場合は、インストール時に異なるポートを指定できます：

```bash
na-tools install --port 9000
```

### イメージダウンロード関連

**Q: Docker イメージのダウンロードが遅い、または失敗する場合**

国内ミラーソースを設定して高速化できます：

```bash
na-tools config mirror https://your-mirror.example.com
```
