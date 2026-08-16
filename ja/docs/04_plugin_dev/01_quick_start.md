---
title: クイックスタート
description: Nekro Agentプラグイン開発クイックスタートガイド。環境準備から最初の「Hello World」プラグインの作成まで。
---

# クイックスタート

この章では、プラグイン開発環境を迅速にセットアップし、最初のNekro Agentプラグインを作成する方法を案内します。

## 開発環境の準備

開始する前に、Nekro Agentをインストールし、正常に実行していることを確認してください。プラグイン開発は通常、Nekro Agentプロジェクトの `plugins/workdir/` ディレクトリで行われます。

必要なもの：

1.  **Python環境**: Nekro Agentメインプログラムと互換性のあるPythonバージョン（通常はPython 3.10+）。
2.  **Nekro Agentソースコードまたはインストール済みインスタンス**: コアコードとAPI定義を確認するのに便利です。
3.  **コードエディタ**: VSCode、PyCharmなど、プラグインコードを記述するためのもの。

## 最初のプラグインを作成する：「Hello Plugin」

呼び出されると「Hello from Plugin!」を返すサンドボックスメソッドを提供する簡単なプラグインを作成しましょう。

### 1. プラグインディレクトリとファイルを作成する

Nekro Agentのプラグイン作業ディレクトリ（通常は `plugins/workdir/`）に、新しいプラグインディレクトリを作成します。例えば `hello_plugin` です。

```
plugins/
└── workdir/
    └── hello_plugin/
        ├── __init__.py
        └── plugin.py
```

*   `__init__.py`: このファイルは**極めて重要**です。これにより、`hello_plugin` ディレクトリがPythonパッケージとして認識されます。さらに重要なことに、Nekro Agentのプラグイン読み込みメカニズムは通常、この `__init__.py` ファイルから `NekroPlugin` インスタンスを見つけてインポートします。`NekroPlugin` インスタンス（通常は `plugin` という名前）が同じディレクトリの `plugin.py` ファイルで定義されている場合、`__init__.py` **は** `plugin.py` からこのインスタンスをインポートしてエクスポートする**必要があります**。その内容は以下のようになります：
    ```python
    # hello_plugin/__init__.py
    from .plugin import plugin

    # 明示的にエクスポートするインターフェース（推奨）
    __all__ = ["plugin"]
    ```
*   `plugin.py`: これはプラグインのコアコードファイルで、`NekroPlugin` インスタンスと関連するサンドボックスメソッド、設定などを定義します。

### 2. プラグインコアコードを記述する (`plugin.py`)

`hello_plugin/plugin.py` ファイルを開き、以下の内容を入力します：

```python
from nekro_agent.api.plugin import NekroPlugin, SandboxMethodType
from nekro_agent.api.schemas import AgentCtx

# 1. プラグインインスタンスを作成
plugin = NekroPlugin(
    name="Hello Plugin",  # UIに表示される名前
    module_name="hello_plugin",  # プラグインモジュール名、ディレクトリ名と一致し、一意である必要があります
    description="シンプルなHello Worldプラグインの例。",
    author="あなたの名前",
    version="0.1.0",
    url="https://your.plugin.repo.url" # オプション、プラグインのリポジトリまたはホームページURL
)

# 2. サンドボックスメソッドを登録
@plugin.mount_sandbox_method(
    method_type=SandboxMethodType.TOOL, # メソッドタイプはTOOL、結果は直接AIに返されます
    name="say_hello",
    description="挨拶を返します。"
)
async def say_hello_from_plugin(_ctx: AgentCtx) -> str:
    """プラグインの挨拶メソッド

    パラメータを必要とせず、固定された挨拶文字列を直接返します。

    Returns:
        str: "Hello from Plugin!"
    """
    return "Hello from Plugin!"

# ここに設定、初期化メソッドなど、さらにプラグインロジックを追加できます。

```

**コード説明**：

*   **`from nekro_agent.api.plugin import NekroPlugin, SandboxMethodType`**: プラグインインスタンスの作成とサンドボックスメソッドタイプの定義に必要なコアクラスをインポートします。
*   **`from nekro_agent.api.schemas import AgentCtx`**: `AgentCtx` をインポートします。これはサンドボックスメソッドや多くの他のプラグインコールバック関数の標準コンテキストパラメータで、セッション情報などを含みます。
*   **`plugin = NekroPlugin(...)`**: `NekroPlugin` クラスのインスタンスを作成します。プラグインの名前、モジュール名、説明などの基本情報を提供する必要があります。
    *   `name`: ユーザーがインターフェースで見るプラグイン名。
    *   `module_name`: プラグインの一意の識別子で、通常はプラグインディレクトリ名と一致します。
    *   `author`: プラグイン作成者名。
*   **`@plugin.mount_sandbox_method(...)`**: これは、関数をプラグインのサンドボックスメソッドとして登録するために使用されるデコレータです。AIはこれらのメソッドをサンドボックス環境を通じて呼び出すことができます。
    *   `method_type=SandboxMethodType.TOOL`: このメソッドが「ツール」タイプのメソッドであることを指定します。このようなメソッドの戻り値は、AIが使用するために直接提供されます。
*   **`async def say_hello_from_plugin(_ctx: AgentCtx) -> str:`**: サンドボックスメソッドの実際の実行ロジックを定義します。
    *   非同期関数（`async def`）です。
    *   最初のパラメータは `_ctx: AgentCtx` である必要があります。
    *   型アノテーション `-> str` は文字列を返すことを示します。
    *   ドキュメント文字列は、メソッドの機能、パラメータ、戻り値を詳細に説明し、AIがこのメソッドを正しく使用するために極めて重要です。

### 3. プラグインをロードしてテストする

1.  **Nekro Agentを起動/再起動する**:
    `plugins/workdir/` ディレクトリにプラグインを作成した場合、Nekro Agentは通常、起動時にこのディレクトリ内のすべてのプラグインを自動的にスキャンしてロードします。
    Agentがすでに実行中の場合、Agentを再起動するか、管理インターフェースを通じてプラグインを再ロードする必要があるかもしれません。

2.  **Agentでテストする**:
    ロードが成功したら、Nekro Agentとの会話でこのプラグインメソッドを呼び出してみてください。例えば、Agentに次のように言うことができます：
    `"say_hello_from_pluginメソッドを呼び出して"`
    またはより自然に：
    `"hello_pluginに挨拶させて"`

    AgentのAIモデルは、あなたの指示と関数内のドキュメント文字列を組み合わせて、`say_hello_from_plugin` メソッドを呼び出すかどうか、どのように呼び出すかを決定します。呼び出しが成功した場合、AIはプラグインが「Hello from Plugin!」を返したことを伝えるはずです。

    指示を通じてコードを呼び出すこともできます：
    ```python
    /exec say_hello_from_plugin()
    ```
    指示を送信する前に、ボットも同じセッションにいることを確認してください

おめでとうございます！最初のNekro Agentプラグインを正常に作成し、テストしました。

次の章では、プラグインのコア概念と高度な機能について詳しく説明します。