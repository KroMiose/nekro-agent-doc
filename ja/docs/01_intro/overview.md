---
title: Nekro Agent 概要
description: Nekro Agentは、強力なAIエージェントフレームワークであり、安全で効率的かつエレガントなインテリジェントインタラクション体験を提供し、サンドボックス環境でのコード実行、マルチモーダル視覚インタラクション、および高度に拡張可能なプラグインシステムをサポートしています。
---

<div align="center">
  <img src="/assets/NA_logo.webp" width="1024" alt="Second style of NekroAgent icon">
  <p><img src="/assets/NoneBotPlugin.svg" width="240" alt="NoneBotPlugin text"></p>
</div>

<div align="center">
  <DocIcon name="sparkles" /> 安全、効率的、かつエレガントなインテリジェントインタラクション体験を備えた次世代AIエージェントフレームワーク <DocIcon name="sparkles" /><br/>
  <DocIcon name="train" /> 第一世代の大規模モデルアプリケーション <a href="https://github.com/KroMiose/nonebot_plugin_naturel_gpt"> Naturel GPT</a> のアップグレードおよび再構築された後継 <DocIcon name="rainbow" /><br/>
  <DocIcon name="message-text" /> 技術交流/学習/Q&A/ディスカッション: <a href="https://discord.com/invite/eMsgwFnxUB">Discordサーバーに参加する</a> <DocIcon name="message" />
</div>

## <DocIcon name="rocket" /> コア機能

NekroAgentは、強力で柔軟なプロンプト構築システムを通じてAIに正確なコード生成とサンドボックス内での実行を指示し、RPC通信を介して現実環境と相互作用します。主な特徴は以下の通りです：

- 完全なPythonランタイム環境を備えた安全なコンテナ化された **サンドボックス実行環境**
- 強力なコード **誘導、生成、エラー修正、および実行** 機能により、チャート生成や一般的なコンテンツ処理などの複雑なタスクをサポート
- ネイティブなマルチモーダル **視覚理解とインタラクション** サポートにより、画像、ファイル、その他のリソースを処理可能
- 高度に拡張可能な **プラグインシステム** により、さまざまなキーノードコールバック、プロンプトインジェクション、カスタムサンドボックスメソッドを提供
- ネイティブな **多人数インタラクション** サポートにより、グループチャットシナリオの要件を効率的に理解
- プラグイン、ペルソナ、その他の強力でフレンドリーな **コミュニティ主導** の機能を共有するクラウドベースのリアルタイムリソース共有サービス
- 機能豊富な **ビジュアルインターフェース** アプリケーション管理パネル
- 無効なプロンプトや反復エージェントの乱用を拒否し、複雑なタスクの究極の **コスト削減と効率向上** を実現
- 非同期ファーストの効率的な応答メカニズムに従う **イベント駆動型** インタラクションアーキテクチャ
- 動的インストールと **PYPI依存関係のリアルタイム導入** をサポートし、Pythonユニバースの無限の宝物を解き放つ

<DocIcon name="send" /> Nekro Agentで何ができるか知りたいですか？ [アプリケーションシナリオ紹介](/ja/docs/01_intro/application_scenarios) をチェックして、豊富な実用例を学びましょう！

## <DocIcon name="star" /> Nekro AI

**Nekro AI** はNekro Agentのクラウドサービスプラットフォームであり、エコシステム全体のサービスハブとして機能し、プラグインとペルソナの統一管理および配布機能を提供します。ユーザーと開発者がインテリジェントなAIエージェントシステムをより効率的に構築し、共有できるよう支援することに取り組んでいます。

- **プラグインストア**: さまざまな機能拡張プラグインを一元管理し、ワンクリックインストール、アップグレード、およびグラフィカルな設定をサポートし、開発者が機能モジュールを公開および共有するのを容易にします
- **ペルソナストア**: 多様なキャラクターペルソナ共有プラットフォームを提供し、アップロード、ダウンロード、およびパーソナライズされたカスタマイズをサポートし、さまざまなシナリオでのエージェントの性格構築ニーズを満たします

Nekro AIは、オープンで協力的かつ可用性の高いサービスエコシステムを構築し、Nekro Agentアプリケーションエコシステムの大きな発展を促進することに取り組んでいます！

## <DocIcon name="lightbulb" /> 機能リスト

### その他の機能

- <DocIcon name="circle-check" label="是" /> ステッカー管理、AI描画、Web検索、ノートシステム、タイマー、ダイスロールなど、強力で特徴的な組み込みプラグインラインナップ
- <DocIcon name="circle-check" label="是" /> カスタムプラグイン機能を低障壁で迅速に実装するためのAI拡張プラグインエディタ
- <DocIcon name="circle-check" label="是" /> システム設定およびプラグイン設定の即時ホットアップデート
- <DocIcon name="circle-check" label="是" /> 外部思考の連鎖（CoT）による高品質な推論能力
- <DocIcon name="circle-check" label="是" /> ペルソナ分離、セッションごとの独立したペルソナ設定をサポート
- <DocIcon name="circle-check" label="是" /> Webhookベースのカスタムイベントプッシュ機能、プラグイン例：GitHubリポジトリ変更イベント通知
- <DocIcon name="circle-check" label="是" /> 柔軟な動的モデルスケジューリングシステムにより、パフォーマンスとコストのバランスを取り、各反復ステップに最適なモデルを選択
- <DocIcon name="circle-check" label="是" /> トリガールール/ブロックルール/コンテンツフィルタリングなど、柔軟な応答ルール設定
- <DocIcon name="circle-check" label="是" /> 祝日の挨拶プッシュ通知

### 開発計画

- [ ] 動的で複雑なペルソナ拡張機能
- [ ] より多くのアダプターとチャットプラットフォームのサポート
- [ ] LLMベースの自動コンテキスト接続トリガー

## <DocIcon name="handshake" /> 貢献者

このプロジェクトへの貢献に感謝します

<a href="https://github.com/KroMiose/nekro-agent/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=KroMiose/nekro-agent&max=1000" />
</a>

