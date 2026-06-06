---
title: モデル選択ガイド
description: Nekro Agentのモデル選択ガイド。ユーザーが異なるシナリオで最適なLLMモデルを選択するのを支援し、パフォーマンス、価格、適用シナリオの詳細分析を含みます
---

# モデル選択ガイド

このドキュメントは、NekroAgentで異なるシナリオで使用する最適なモデルを理解するのに役立ち、詳細なパフォーマンス、価格、適用性の分析を提供します。現在、主に[NekroAgent公式リレー](https://api.nekro.ai)が提供するモデル選択情報を提供し、他のソースからのモデルを徐々に追加していきます。

#### 評価説明

推奨モデルでは、以下の評価基準を使用しています：

| 評価 | 対応レベル | 説明 |
| ---- | ------------------ | ---- |
| <DocIcon name="crown" label="极佳" />   | <DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" /> | 優秀 |
| <DocIcon name="medal" label="优秀" />   | <DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" />   | 優秀 |
| <DocIcon name="award" label="良好" />   | <DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" />     | 良好 |
| <DocIcon name="badge-check" label="一般" />   | <DocIcon name="star" label="星级" /><DocIcon name="star" label="星级" />       | 平均 |
| <DocIcon name="circle-off" label="较差" />   | <DocIcon name="star" label="星级" />         | 劣る |

::: warning 注意
以下の推奨は参考用です。異なるソースからの同じモデルは、チャネル変換戦略、異なる設定、同時実行状況、現在の状態などにより、最終的なパフォーマンスに差異がある場合があります。実際の使用に基づいて、以下の表に含まれていないモデルを含む複数のモデルを試し、最適なモデルを選択することをお勧めします！

以下の表のモデルは[NekroAgent公式リレー - 利用可能モデルリスト](https://api.nekro.ai/panel/model_price)からのものです。以下の表と実際の経験に大きな違いがあると思われる場合は、お気軽にご連絡ください。実際の経験とより一致するように、表を継続的に維持・更新します
:::

## NekroAgentの主要アプリケーション

### チャット会話プロセス

NekroAgentのチャットセッションプロセス（プラグイン機能を除く）は、主に`メインモデルグループ（USE_MODEL_GROUP）`、`デバッグ/エージェント移行モデルグループ（DEBUG_MIGRATION_MODEL_GROUP）`、および`フォールバックモデルグループ（FALLBACK_MODEL_GROUP）`の3つの設定項目に影響されます。具体的なスケジューリング戦略は以下の通りです：

1. 会話プロセスが開始されると、まず`メインモデルグループ`のモデルが生成に使用されます
2. `メインモデルグループ`によって生成されたコードがエージェントタイプのメソッドをトリガーするか、プログラムエラーを生成した場合、このプロセスの後続の呼び出しはすべて`デバッグ/エージェント移行モデルグループ`のモデルを使用して反復されます
3. `メインモデルグループ`または`デバッグ/エージェント移行モデルグループ`のモデル呼び出しが失敗した場合、`フォールバックモデルグループ`のモデルが生成に使用されます
4. `フォールバックモデルグループ`も呼び出しに失敗した場合、応答プロセスは失敗で終了します

以下は**チャット会話プロセス**の推奨モデルリストです：

> このリストは2026年4月18日に更新されました

| モデル名                          | 品質 | 速度 | 安定性 | コストパフォーマンス | ビジョン | 内蔵思考 | 備考 |
| --------------------------------- | ------- | ----- | --------- | ------------------ | ------ | ----------------- | ----- |
| claude-4-5-sonnet-latest          | <DocIcon name="crown" label="极佳" />     | <DocIcon name="award" label="良好" />    | <DocIcon name="award" label="良好" />        | <DocIcon name="award" label="良好" />                 | <DocIcon name="eye" label="视觉" />    | <DocIcon name="circle-x" label="否" />                | Anthropicの最新フラッグシップモデル、最強の総合能力だが供給が限られており、メインモデルとして適している |
| gemini-3.1-pro-preview            | <DocIcon name="crown" label="极佳" />     | <DocIcon name="award" label="良好" />    | <DocIcon name="medal" label="优秀" />        | <DocIcon name="badge-check" label="一般" />                 | <DocIcon name="eye" label="视觉" />    | <DocIcon name="brain" />                | Google 3.1世代の高品質フラッグシップモデル、現在最高峰の性能、思考署名と思考レベルをサポート <DocIcon name="warning" label="注意" /> プレビューモデル |
| gemini-3-flash-preview            | <DocIcon name="medal" label="优秀" />     | <DocIcon name="medal" label="优秀" />    | <DocIcon name="medal" label="优秀" />        | <DocIcon name="crown" label="极佳" />                 | <DocIcon name="eye" label="视觉" />    | <DocIcon name="circle-x" label="否" />                | 総合的な体験が極めて優れたバランス型モデル、高速で論理能力が高く、メインモデルとしての使用を推奨 |
| gemini-2.5-pro                    | <DocIcon name="medal" label="优秀" />     | <DocIcon name="medal" label="优秀" />    | <DocIcon name="medal" label="优秀" />        | <DocIcon name="award" label="良好" />                 | <DocIcon name="eye" label="视觉" />    | <DocIcon name="brain" />                | 論理能力が安定しており、適応的思考能力を備える <DocIcon name="warning" label="注意" /> 2026年6月17日に廃止される見込み |
| gpt-4.1                           | <DocIcon name="medal" label="优秀" />     | <DocIcon name="award" label="良好" />    | <DocIcon name="medal" label="优秀" />        | <DocIcon name="award" label="良好" />                 | <DocIcon name="eye" label="视觉" />    | <DocIcon name="circle-x" label="否" />                | より新しいフラッグシップGPTモデル、AI特性が顕著だが論理能力は良好 |
| gemini-3.1-flash-lite-preview     | <DocIcon name="award" label="良好" />     | <DocIcon name="crown" label="极佳" />    | <DocIcon name="medal" label="优秀" />        | <DocIcon name="crown" label="极佳" />                 | <DocIcon name="eye" label="视觉" />    | <DocIcon name="circle-x" label="否" />                | 極速小モデル、推論コストが極めて低く、簡単なタスクや迅速な反復に適している <DocIcon name="warning" label="注意" /> プレビューモデル |
| claude-4-5-haiku                  | <DocIcon name="award" label="良好" />     | <DocIcon name="medal" label="优秀" />    | <DocIcon name="medal" label="优秀" />        | <DocIcon name="badge-check" label="一般" />                 | <DocIcon name="eye" label="视觉" />    | <DocIcon name="circle-x" label="否" />                | Anthropicの高速モデル、生成スタイルに特定の要件があるシナリオに適している |
| gemini-2.5-flash                  | <DocIcon name="medal" label="优秀" />     | <DocIcon name="medal" label="优秀" />    | <DocIcon name="medal" label="优秀" />        | <DocIcon name="crown" label="极佳" />                 | <DocIcon name="eye" label="视觉" />    | <DocIcon name="circle-x" label="否" />                | コストパフォーマンスが高く、間もなくgemini-3-flashに置き換えられる <DocIcon name="warning" label="注意" /> 2026年6月17日に廃止される見込み |
| deepseek-chat (v3)                | <DocIcon name="medal" label="优秀" />     | <DocIcon name="badge-check" label="一般" />    | <DocIcon name="medal" label="优秀" />        | <DocIcon name="award" label="良好" />                 | <DocIcon name="circle-x" label="否" />    | <DocIcon name="circle-x" label="否" />                | 定番の国内モデル、優れた中国語能力、特徴的な言語スタイル |
| doubao-1.5-vision-pro-32k-250115  | <DocIcon name="award" label="良好" />     | <DocIcon name="award" label="良好" />    | <DocIcon name="crown" label="极佳" />        | <DocIcon name="award" label="良好" />                 | <DocIcon name="eye" label="视觉" />    | <DocIcon name="circle-x" label="否" />                | 字节が提供する国内モデル、安定性が極めて高く、マルチモーダル能力に優れ、バックアップモデルに適している |
| gemini-2.0-flash                  | <DocIcon name="award" label="良好" />     | <DocIcon name="crown" label="极佳" />    | <DocIcon name="medal" label="优秀" />        | <DocIcon name="medal" label="优秀" />                 | <DocIcon name="eye" label="视觉" />    | <DocIcon name="circle-x" label="否" />                | 極めて低コストな小モデル <DocIcon name="warning" label="注意" /> 2026年6月1日に廃止される見込み |
| gpt-4o                            | <DocIcon name="medal" label="优秀" />     | <DocIcon name="award" label="良好" />    | <DocIcon name="medal" label="优秀" />        | <DocIcon name="award" label="良好" />                 | <DocIcon name="eye" label="视觉" />    | <DocIcon name="circle-x" label="否" />                | 生産性シナリオで常用されるモデル、APIの安定性が高い |
| gpt-4o-mini                       | <DocIcon name="award" label="良好" />     | <DocIcon name="award" label="良好" />    | <DocIcon name="medal" label="优秀" />        | <DocIcon name="medal" label="优秀" />                 | <DocIcon name="eye" label="视觉" />    | <DocIcon name="circle-x" label="否" />                | 定番のGPTシリーズ小モデル |
| grok-3                            | <DocIcon name="award" label="良好" />     | <DocIcon name="award" label="良好" />    | <DocIcon name="medal" label="优秀" />        | <DocIcon name="badge-check" label="一般" />                 | <DocIcon name="eye" label="视觉" />    | <DocIcon name="circle-x" label="否" />                | xAIが提供する言語モデル、個性が際立ち、AIフレーバーが低い |

注意：

- NekroAgentでは、会話プロセスで最初に使用されるモデル（通常はメインモデル）の`外部思考連鎖`スイッチが、この会話プロセスの後続の呼び出しでの思考連鎖の使用に影響します。例えば、メインモデルが`外部思考連鎖`を有効にしている場合、反復/デバッグモデルも`外部思考連鎖を有効にする`効果があります
- 一般的に、`内蔵思考`をサポートするモデルでは`外部思考連鎖`を有効にすることは推奨されません。そうしないと、モデル生成速度が低下する可能性があります
- プロンプト反復メカニズムの実装により、`ビジョンをサポートする`モデルと`ビジョンをサポートしない`モデルを混在させることは推奨されません。そうしないと、リクエスト形式エラーを引き起こす可能性があります

### プラグイン開発

NekroAgentの**プラグインエディタ**での生成変更提案モデルは、`プラグインコード生成モデルグループ（PLUGIN_GENERATE_MODEL_GROUP）`を使用して、ユーザーニーズに対するコードソリューションを生成します。強力なコーディング能力と高品質を持つモデルを使用することを推奨します。以下は推奨モデルリストです：

| モデル名                        | 品質 | 速度 | 安定性 | コストパフォーマンス | ビジョン | 思考 | 備考 |
| --------------------------------- | ------- | ----- | --------- | ------------------ | ------ | -------- | ----- |
| claude-4-5                        | <DocIcon name="crown" label="极佳" />     | <DocIcon name="award" label="良好" />    | <DocIcon name="award" label="良好" />        | <DocIcon name="award" label="良好" />                 | <DocIcon name="eye" label="视觉" />    | <DocIcon name="brain" />       | Anthropicの最新高品質フラッグシップコーディングモデル |
| gemini-3.1-pro-preview            | <DocIcon name="crown" label="极佳" />     | <DocIcon name="award" label="良好" />    | <DocIcon name="medal" label="优秀" />        | <DocIcon name="badge-check" label="一般" />                 | <DocIcon name="eye" label="视觉" />    | <DocIcon name="brain" />       | Googleの最新世代フラッグシップモデル、プログラミング分野で極めて優れたパフォーマンス、論理が非常に厳密 <DocIcon name="warning" label="注意" /> プレビューモデル |
| gemini-2.5-pro                    | <DocIcon name="medal" label="优秀" />     | <DocIcon name="medal" label="优秀" />    | <DocIcon name="medal" label="优秀" />        | <DocIcon name="award" label="良好" />                 | <DocIcon name="eye" label="视觉" />    | <DocIcon name="brain" />       | 定番のフラッグシップモデル、コーディング能力が安定しており、適応的思考をサポート <DocIcon name="warning" label="注意" /> 2026年6月17日に廃止される見込み |

生成モデルが変更提案を生成した後、現在のプラグインエディタで変更提案を適用するために、`プラグインコード適用モデルグループ（PLUGIN_APPLY_MODEL_GROUP）`を使用する必要もあります。強力なプロンプト準拠性と高速な生成速度を持つモデルを使用することを推奨します。以下は推奨モデルリストです：

| モデル名         | 品質 | 速度 | 安定性 | コストパフォーマンス | ビジョン | 思考 | 備考 |
| ------------------ | ------- | ----- | --------- | ------------------ | ------ | -------- | ----- |
| gemini-3-flash-preview | <DocIcon name="medal" label="优秀" />     | <DocIcon name="crown" label="极佳" />    | <DocIcon name="medal" label="优秀" />        | <DocIcon name="crown" label="极佳" />                 | <DocIcon name="eye" label="视觉" />    | <DocIcon name="circle-x" label="否" />       | 推奨される高速な論理適用モデル |
| gemini-2.5-flash   | <DocIcon name="award" label="良好" />     | <DocIcon name="crown" label="极佳" />    | <DocIcon name="medal" label="优秀" />        | <DocIcon name="award" label="良好" />                 | <DocIcon name="eye" label="视觉" />    | <DocIcon name="circle-x" label="否" />       | <DocIcon name="warning" label="注意" /> 2026年6月17日に廃止される見込み |

## 内蔵プラグイン

### 絵文字パックプラグイン

絵文字パックプラグインは、絵文字検索機能を提供するために`ベクトル埋め込みモデル`を使用する必要があります。`text-embedding-v3`モデルの使用を強く推奨します：

| モデル名                | 品質 | 速度 | 安定性 | コストパフォーマンス | ビジョン | 次元 | 備考 |
| ----------------------- | ------- | ----- | --------- | ------------------ | ------ | ---------- | ----- |
| text-embedding-v3       | <DocIcon name="crown" label="极佳" />     | <DocIcon name="crown" label="极佳" />    | <DocIcon name="crown" label="极佳" />        | <DocIcon name="crown" label="极佳" />                 | <DocIcon name="circle-x" label="否" />    | 1024       | Alibaba Cloudが提供する非常に安価で効率的なテキスト埋め込みモデル |
| multimodal-embedding-v1 | <DocIcon name="crown" label="极佳" />     | <DocIcon name="medal" label="优秀" />    | <DocIcon name="crown" label="极佳" />        | <DocIcon name="crown" label="极佳" />                 | <DocIcon name="circle-check" label="是" />    | 1024       | Alibaba Cloudが提供するマルチモーダル埋め込みモデル、入力制限が多く、特殊な使用のみ推奨 |

### 描画（絵を学ぶ）

描画プラグインは、OpenAI標準描画API（DALL-E 3など）と、会話生成画像をサポートする任意のOpenAIチャット補完APIをサポートします。以下は推奨モデルリストです：

| モデル名                       | 品質 | 速度 | 安定性 | コストパフォーマンス | 画像から画像 | フォーマット         | 備考 |
| -------------------------------- | ------- | ----- | --------- | ------------------ | -------------- | -------------- | ----- |
| gemini-3.1-flash-image-preview | <DocIcon name="crown" label="极佳" />     | <DocIcon name="medal" label="优秀" />    | <DocIcon name="medal" label="优秀" />        | <DocIcon name="medal" label="优秀" />                 | <DocIcon name="circle-check" label="是" />             | チャットモード      | Gemini 3.1描画モデル、極めて高い理解能力と視覚的品質を備える |
| gemini-3-pro-image-preview     | <DocIcon name="crown" label="极佳" />     | <DocIcon name="medal" label="优秀" />    | <DocIcon name="award" label="良好" />        | <DocIcon name="badge-check" label="一般" />                 | <DocIcon name="circle-check" label="是" />             | チャットモード      | Gemini 3フラッグシップ描画モデル、詳細な表現が豊富 |
| sora_image                     | <DocIcon name="medal" label="优秀" />     | <DocIcon name="circle-off" label="较差" />    | <DocIcon name="medal" label="优秀" />        | <DocIcon name="award" label="良好" />                 | <DocIcon name="circle-check" label="是" />             | チャットモード      | ChatGPT公式サイト4o描画と一致、論理遵守は良好だが速度が遅い |
| Kolors                         | <DocIcon name="award" label="良好" />     | <DocIcon name="crown" label="极佳" />    | <DocIcon name="crown" label="极佳" />        | <DocIcon name="medal" label="优秀" />                 | <DocIcon name="circle-check" label="是" />             | 画像生成モード | 国内の定番描画モデル、CGスタイルのタスクに適している |

## 注意事項

1. モデルのパフォーマンスは、更新により時間とともに変化する可能性があります
2. 価格情報は参考用であり、実際の価格は公式の見積もりに従います
3. 実際の使用に基づいてモデル選択を定期的に評価することを推奨します
4. **実験的モデル（exp/preview）**：これらのモデルは実験的で、いつでも更新または閉鎖される可能性があります。以下を推奨します：
   - [Google Gemini APIバージョン注意事項](https://ai.google.dev/gemini-api/docs/changelog)を定期的にフォローして最新の更新を確認する
   - 本番環境で使用する際はバックアップソリューションを準備する
   - 安定版（GA）モデルを優先的に使用する
   - 一部のプレビューモデルは安定版に自動的にリダイレクトされます。リダイレクトによる遅延を避けるため、安定版モデル名を直接使用することを推奨します
5. **モデルリダイレクト**：一部の廃止されたプレビューモデルは、対応する安定版に自動的にリダイレクトされます。例：
   - `gemini-3-pro-preview` → `gemini-3.1-pro-preview`
   - `gemini-2.5-flash-image-preview` → `gemini-3.1-flash-image-preview`
   - `gemini-2.5-pro-preview-06-05` → `gemini-2.5-pro`

::: warning 重要な注意事項
生成型人工知能サービスを使用する際は、必ず関連する利用規約と法律規制を遵守してください
:::