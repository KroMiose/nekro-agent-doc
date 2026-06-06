---
title: プラグイン定期タスク開発
description: Nekro Agent timer と recurring_timer API を使用してプラグインにワンショットおよび周期的タスクを実装する
---

# プラグイン定期タスク開発

プラグインの定期タスクは主に 2 つの API で実現します：

- `nekro_agent.api.timer` — ワンショットおよび一時的なタイマー
- `nekro_agent.api.recurring_timer` — 周期繰り返しタスク（cron）

## 選択基準

| ニーズ | 推奨 API |
|---|---|
| ワンショットリマインダー、一時的な自己ウェイクアップ | `timer` |
| 周期繰り返し実行、cron 式 | `recurring_timer` |
| 一時停止 / 再開 / 即時実行が必要 | `recurring_timer` |
| 営業日 / 祝日モードが必要 | `recurring_timer` |

## ワンショットタイマー

### 基本的な使い方

```python
import time
from nekro_agent.api import timer

async def remind_later(chat_key: str) -> bool:
    return await timer.set_timer(
        chat_key=chat_key,
        trigger_time=int(time.time()) + 300,
        event_desc="5分後にユーザーに現在のタスクを続けるようリマインダー",
    )
```

同じチャンネルに最新の短期リマインダーだけを保持したい場合は `set_temp_timer` を使用します：

```python
await timer.set_temp_timer(
    chat_key=chat_key,
    trigger_time=int(time.time()) + 60,
    event_desc="1分後に状態を再確認",
)
```

### trigger_time の特殊値

`trigger_time` パラメータは通常の Unix タイムスタンプに加えて、以下の特殊値をサポートします：

| 値 | 動作 |
|---|---|
| `0` | 現在のチャンネルの Agent タスクを即座にトリガー（`schedule_agent_task` と等価） |
| 負数（例：`-1`） | 現在のチャンネルのタイマーをすべてクリア |

### タイマーの管理

```python
from nekro_agent.api import timer

# 現在のチャンネルの未トリガータイマーをすべて取得
timers = await timer.get_timers(chat_key)

# 現在のチャンネルのタイマーをすべてクリア
await timer.clear_timers(chat_key)

# 一時タイマーのみクリア
await timer.clear_timers(chat_key, temporary=True)

# 非一時タイマーのみクリア
await timer.clear_timers(chat_key, temporary=False)
```

### 永続化と misfire 補発

ワンショットタイマー（`set_timer` / `set_temp_timer` で設定されたコールバックなしの通常タイマー）は自動的にディスクに永続化されます。サービス再起動後に自動的に復元されます：

- **期限切れでないタイマー**：復元後も元の予定時間通りにトリガーされます。
- **期限切れだが猶予期間内（デフォルト 300 秒）のタイマー**：即座にシステムメッセージを補発します。
- **期限切れで猶予期間を超過**：破棄されます。

## 周期定期タスク

```python
from nekro_agent.api import recurring_timer

async def create_daily_job(chat_key: str) -> str:
    job = await recurring_timer.create_cron_job(
        chat_key=chat_key,
        cron_expr="0 9 * * *",
        event_desc="毎日午前9時に日報リマインダーを実行",
        timezone="Asia/Tokyo",
        workday_mode="mon_fri",
        title="仕事日報リマインダー",
    )
    return job.job_id
```

### よく使う操作

```python
# 一時停止 / 再開 / 即時実行 / 削除
await recurring_timer.pause_job(job_id)
await recurring_timer.resume_job(job_id)
await recurring_timer.run_now(job_id)
await recurring_timer.delete_job(job_id)

# タスクの更新（複数のフィールドを同時に更新可能）
await recurring_timer.update_job(
    job_id,
    cron_expr="0 10 * * *",
    event_desc="更新後の説明",
    timezone="Asia/Tokyo",
    workday_mode="mon_fri",
    title="新しいタイトル",
)

# クエリ
jobs = await recurring_timer.list_jobs(chat_key)                          # 全て
active_jobs = await recurring_timer.list_jobs(chat_key, status="active")  # アクティブのみ
job = await recurring_timer.get_job(job_id)                               # 単一タスク

# タスク統計サマリー: (アクティブ数, 停止数, トリガー予定リスト, 最近トリガーリスト) を返す
active, paused, upcoming, recent = await recurring_timer.get_job_summary(
    chat_key, upcoming_limit=5, recent_limit=5,
)

# タスクの外部短 ID を取得
short_id = recurring_timer.get_job_id(job)
```

### バリデーションツール

```python
from nekro_agent.api import recurring_timer

# cron 式の妥当性を検証（5 段形式：min hour day month dow）
recurring_timer.validate_cron_expr("0 9 * * 1-5")

# タイムゾーンの妥当性を検証（IANA TZ）
recurring_timer.validate_timezone("Asia/Tokyo")
```

### 営業日モード

`workday_mode` パラメータは、指定された時間範囲内で営業日ルールに基づいてトリガーをフィルタリングします：

| 値 | 説明 |
|---|---|
| `none` | 制限なし。cron のまま通常トリガー |
| `mon_fri` | 月曜〜金曜のみ |
| `weekend` | 週末のみ |
| `cn_workday` | 中国法定営業日のみ（振替出勤日を含む） |
| `cn_restday` | 中国法定休日のみ（振替休日を含む） |

> **フォールバック戦略**：中国祝日データが利用できない場合、`cn_workday` は `mon_fri`（月曜〜金曜）にフォールバックし、`cn_restday` は `weekend`（土日）にフォールバックします。

## push_system との連携

タイマーがトリガーされた後、通常はコンテキストを Agent にプッシュして処理を継続させる必要があります。`message.push_system` の使用を推奨します：

```python
from nekro_agent.api import message

async def on_timer_trigger(chat_key: str):
    await message.push_system(
        chat_key=chat_key,
        message="定期タスクトリガー：毎日のサマリーを実行しレポートを送信してください",
        trigger_agent=True,
    )
```

**完全なシグネチャ**：

```python
async def push_system(
    chat_key: str,
    message: str,
    ctx: Optional[AgentCtx] = None,
    trigger_agent: bool = False,
) -> None
```

| パラメータ | 説明 |
|---|---|
| `chat_key` | チャット識別子。形式は `{adapter_key}-{channel_id}` |
| `message` | システムメッセージの内容 |
| `ctx` | Agent コンテキストオブジェクト（オプション） |
| `trigger_agent` | AI 応答をトリガーするかどうか。デフォルトは `False` |

この組み合わせは、自動ワークフローの推進、定期巡検、バックグラウンドの定期通知に適しています。

## Misfire 戦略（周期タスク）

サービス再起動やスケジューリングのブロックにより cron タスクが予定トリガー時間を逃した場合、以下のフィールドで補発動作を制御します：

| フィールド | 型 | デフォルト値 | 説明 |
|---|---|---|---|
| `misfire_policy` | `str` | `"fire_once"` | トリガー逃し戦略。`fire_once`：猶予期間内に1回補発；`skip`：今回のスキップ |
| `misfire_grace_seconds` | `int` | `300` | 猶予秒数。この時間を超過すると補発しません |

## 連続失敗による自動停止

周期タスクが連続 **3 回** トリガーに失敗すると自動的に停止し、チャンネルに通知メッセージを送信します。ユーザーは `resume_job` で復旧するか、`update_job` でパラメータを修正できます。

成功したトリガーの後、`consecutive_failures` カウンターは自動的にゼロにリセットされます。

## 関連ドキュメント

- [システム API リファレンス](/ja/docs/04_plugin_dev/04_system_api_reference)
- [プラグインコマンド開発](/ja/docs/04_plugin_dev/01_quick_start)
