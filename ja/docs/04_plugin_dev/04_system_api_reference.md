---
title: システムAPIリファレンス
description: Nekro Agentプラグイン開発で利用可能なコアシステムサービスAPIリファレンス。メッセージ、コンテキスト、タイマー、コアツール、プラグイン、データベースモデルAPIを含みます。
---

# システムAPIリファレンス

Nekro Agentは、プラグイン開発者のために一連のコアシステムサービスAPIを提供しており、プラグインとAgentのコア機能との深い統合を可能にします。これらのAPIは通常、`nekro_agent.api`パッケージ内のモジュールを通じてアクセスされます。

このリファレンスでは、主要なAPIモジュールとその一般的な機能を概説します。より詳細なパラメータ、戻り値、具体的な使用方法については、Nekro Agentのソースコードを直接参照するか、IDEのインテリジェントプロンプト機能を使用してください。

## 1. コアサービス (`nekro_agent.api.core`)

`core`モジュールは、基本的でコアなツールとサービスを提供します。

*   **ロギング**
    *   **推奨**：プラグインインスタンスの **`plugin.logger`** を使用してください。`plugin_key` 等で自動タグ付けされ、WebUI の「ログ」ページでプラグイン別にフィルタして確認できます。通常の logger と同様に使用します（例：`plugin.logger.info("プラグインが開始されました")`、`plugin.logger.error("操作失敗", exc_info=True)`）。
    *   **代替**：`core.logger` はグローバルなログを提供し、`debug`、`info`、`warning`、`error`、`success`、`critical` をサポートします。プラグインインスタンスが無い場合や非プラグインコードでは `core.logger` を使用してください。
    *   プラグイン内では実行状態や重要イベントの記録に `plugin.logger` を統一すると、プラグイン単位でのフィルタとトラブルシュートがしやすくなります。

*   **Qdrantベクトルデータベースクライアント**
    *   `core.get_qdrant_client() -> Optional[QdrantClient]` (非同期): グローバルQdrantクライアントインスタンスを取得します。
    *   `core.get_qdrant_config() -> Optional[dict]` (非同期): Qdrant接続設定を取得します。
    *   詳細については、[ベクトルデータベースの使用](/ja/docs/04_plugin_dev/03_advanced_features/3.3_vector_database.md)の章を参照してください。

*   **グローバル設定アクセス (`core.config`)**
    *   Nekro Agentのグローバル設定項目（Agentメイン設定ファイルで定義）に直接アクセスできます。
    *   例: `api_base = core.config.NEKRO_API_BASE`（設定項目が存在すると仮定）
    *   プラグインはまず自身の設定システム（`plugin.config`）を使用し、本当にAgentのグローバル設定にアクセスする必要がある場合にのみ`core.config`を使用する必要があります。

## 2. メッセージサービス (`nekro_agent.api.message`)

`message`モジュールはメッセージ送信の処理を担当します。

*   **テキストメッセージ送信 (`message.send_text`)**
    *   `message.send_text(chat_key: str, text: str, ctx: AgentCtx)` (非同期)
    *   指定された`chat_key`（セッション識別子）にプレーンテキストメッセージを送信します。
    *   `ctx`は必須で、送信コンテキストを提供します。

*   **画像メッセージ送信 (`message.send_image`)**
    *   `message.send_image(chat_key: str, image_path: str, ctx: AgentCtx)` (非同期)
    *   `image_path`は画像URL（文字列）またはローカルファイルパス（文字列）です。
    *   `ctx`は必須で、送信コンテキストを提供します。

*   **ファイルメッセージ送信 (`message.send_file`)**
    *   `message.send_file(chat_key: str, file_path: str, ctx: AgentCtx)` (非同期)
    *   ファイルを送信します。`file_path`パラメータは上記と同じです。
    *   `ctx`は必須で、送信コンテキストを提供します。

## 3. タイマーサービス (`nekro_agent.api.timer`)

`timer`モジュールは1回限りおよび一時的なタイマーを提供します。周期タスク（Cron）と稼働日モードは組み込みプラグイン「タイマーツール集」で提供されます。

*   **1回限りタイマー (`timer.set_timer`)**
    *   `timer.set_timer(chat_key: str, trigger_time: int, event_desc: str) -> bool` (非同期)
    *   指定したタイムスタンプでリマインドを発火。1回限り/一時タイマーはデータディレクトリに永続化され、再起動後に復元されます。
*   **一時タイマー (`timer.set_temp_timer`)**
    *   `timer.set_temp_timer(chat_key: str, trigger_time: int, event_desc: str) -> bool` (非同期)
    *   各チャットで最後の1件のみ保持。短期の自己ウェイクアップに適しています。
*   **タイマー解除 (`timer.clear_timers`)**
    *   `timer.clear_timers(chat_key: str, temporary: Optional[bool] = None) -> bool` (非同期)
    *   `temporary`が`None`のときは全て解除、`True`/`False`のときは一時/非一時のみ解除。

**周期タスクと稼働日モード**：組み込みプラグイン「タイマーツール集」は永続化されたcronジョブ（`create_recurring_timer`、`list_recurring_timers`など）と`workday_mode`（`none`（cronのみ）、`mon_fri`（月〜金）、`weekend`（週末のみ）、`cn_workday`（中国法定稼働日・振替含む）、`cn_restday`（中国休日））を提供します。中国の稼働日/休日は**デフォルトで有効**で、追加設定は不要です。

このAPIリファレンスは概要を提供します。プラグイン開発者は、実際の開発でこれらのAPIを深く理解して使用するために、ソースコード、IDEツール、具体的なサンプルプラグインを組み合わせることを強くお勧めします。