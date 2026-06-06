---
title: Nekro AgentのWindowsデプロイメント（WSL2経由）
description: WSL2を通じてWindowsシステムにNekro Agentをデプロイする詳細手順。ワンクリックインストールスクリプトの使用を推奨。
---

# Windows (WSL2) デプロイメントチュートリアル

このドキュメントでは、Windows Subsystem for Linux (WSL2) を通じてWindowsシステムにNekro Agentをデプロイする方法を案内します。すべての環境設定とインストール手順を自動的に処理するワンクリックインストールスクリプトの使用を強くお勧めします。

## <DocIcon name="rocket" /> ワンクリックインストール（推奨）

このスクリプトは自動的に以下のタスクを完了します：
- WSL2と仮想化関連機能をチェックして有効にします（コンピュータの再起動が必要な場合があります）。
- Nekro Agent専用のDebianシステム環境をダウンロードしてインストールします。
- この環境でLinuxバージョンのインストールスクリプトを自動的に実行して、Agentデプロイメントを完了します。

### 環境要件
- Windows 10バージョン2004以降、またはWindows 11。
- コンピュータのBIOS/UEFIでハードウェア仮想化が有効になっていること。不明な場合は、まずスクリプトを実行してみて、失敗した場合はこの項目を確認してください。

### インストール手順

1.  **管理者としてPowerShellを開きます**。
    - スタートメニューで「PowerShell」を検索し、「Windows PowerShell」を右クリックして「管理者として実行」を選択します。

2.  **実行ポリシーを設定します**（スクリプトを初めて実行する場合）。
    PowerShellで以下のコマンドを入力してEnterキーを押し、このインストールスクリプトの実行を許可します：
    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force
    ```

3.  **インストールスクリプトを実行します**。
    以下のコマンドをPowerShellにコピー＆ペーストして実行します：
    ```powershell
    irm https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/install.ps1 | iex
    ```

4.  **スクリプトのプロンプトに従ってインストールを完了します**。
    - スクリプトはまず環境を準備し、**コンピュータを再起動する**ように促す場合があります。必要な場合は、再起動して**同じ方法でスクリプトを再度実行**してください。
    - 環境の準備が完了すると、スクリプトは自動的に`nekro-agent`という名前のWSL環境を作成し、Linuxバージョンのインストールスクリプトを実行するために新しいターミナルウィンドウを開きます。
    - この新しいターミナルウィンドウで、[Linuxデプロイメントチュートリアル](../linux.md)に従ってインタラクティブな選択を行う必要があります（Napcatをインストールするかどうかなど）。

### カスタムインストールパス

デフォルトでは、WSL仮想ディスクファイルは`C:\Users\<あなたのユーザー名>\AppData\Local\NekroAgent`にインストールされます。別の場所（Dドライブなど）を指定したい場合は、スクリプトを実行する際に`-InstallPath`パラメータで指定できます：

```powershell
# <あなたのパス>を希望するフォルダパスに置き換えます
$scriptContent = irm https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/install.ps1
iex "& { $scriptContent } -InstallPath '<あなたのパス>'"
```

### ネットワーク問題の処理

上記の`irm`コマンドをネットワーク問題のために実行できない場合は、以下の手順で対応できます：
1.  スクリプトファイル`wslinstall.ps1`を手動でダウンロードします：[クリックしてダウンロード](https://raw.githubusercontent.com/KroMiose/nekro-agent/main/docker/wslinstall.ps1)
2.  ダウンロードした`wslinstall.ps1`ファイルをコンピュータに保存します（例：`D:\`）。
3.  管理者PowerShellでローカルスクリプトファイルを実行し、`-InstallPath`パラメータを追加することもできます：
    ```powershell
    # 例：スクリプトをD:\wslinstall.ps1に保存し、D:\WSL\NekroAgentにインストール
    D:\wslinstall.ps1 -InstallPath 'D:\WSL\NekroAgent'
    ```

## <DocIcon name="settings" /> デプロイメント後の操作

インストールが完了したら、いつでも以下の方法でNekro Agent環境を管理できます：

- **WSL環境に入る**：
  PowerShellまたはCMDを開き、以下のコマンドを入力してNekro Agentが配置されているLinux環境に入ります：
  ```powershell
  wsl -d nekro-agent
  ```
  - デフォルトのユーザー名：`nekro`
  - デフォルトのパスワード：`123456`

- **その後の操作**：
  WSL環境に入った後、すべての操作はLinux環境と一致します。[Linuxデプロイメントチュートリアル](../linux.md)を参照して、ログの表示、サービスの管理などの操作を行うことができます。

## <DocIcon name="hand" /> 手動インストール

自動化スクリプトを使用したくない場合や、既存のWSLディストリビューションにインストールしたい場合は、以下の手順に従ってください：

1.  **WSL2をインストールします**：
    [Microsoft公式ドキュメント](https://learn.microsoft.com/en-us/windows/wsl/install)に従って、WSL2ディストリビューション（Ubuntuなど）をインストールして設定します。

2.  **WSL環境に入ります**：
    インストールしたWSLディストリビューションを起動します。

3.  **Linuxデプロイメントチュートリアルに従います**：
    WSLターミナルで、[Linuxデプロイメントチュートリアル](../linux.md)の手順に完全に従ってデプロイメントを行います。

## 付録：一般的なWSLコマンド

WSLに慣れていないユーザーのために、ここにいくつかの一般的に使用される管理コマンドを示します。これらはWindows PowerShellまたはCMDで実行できます。

- **インストール済みのLinuxディストリビューションを一覧表示**
  ```powershell
  wsl --list --verbose
  # 省略形：wsl -l -v
  ```
  このコマンドは、インストールされているすべてのディストリビューション、それらの実行状態（Running/Stopped）、および使用しているWSLバージョン（1または2）を表示します。

- **WSLの起動、停止、再起動**
  ```powershell
  # 指定されたディストリビューションを起動（私たちのはnekro-agent）
  wsl -d nekro-agent

  # 指定されたディストリビューションを終了（再起動と同等）
  wsl --terminate nekro-agent

  # 実行中のすべてのディストリビューションとWSLサービスを閉じる
  wsl --shutdown
  ```
  ネットワークの問題やその他の奇妙な故障に遭遇した場合は、`wsl --shutdown`を実行してからディストリビューションを再起動してみてください。通常、これで問題が解決します。

- **ファイルシステムにアクセス**
  - **WindowsからWSLファイルにアクセス**：
    ファイルエクスプローラのアドレスバーに`\\wsl$`と入力してEnterキーを押すと、インストールされているすべてのディストリビューションのファイルシステムが表示されます。`nekro-agent`のファイルは通常、`\\wsl$\nekro-agent\`ディレクトリにあります。
  - **WSLからWindowsファイルにアクセス**：
    WSLターミナルでは、Windowsのドライブ文字は`/mnt/`ディレクトリにマウントされています。例えば、Cドライブへのパスは`/mnt/c`、Dドライブは`/mnt/d`です。

- **ディストリビューションのアンインストール（危険な操作！）**
  `nekro-agent` WSL環境を完全に削除する必要がある場合は、以下のコマンドを使用できます。
  **警告：この操作はこのディストリビューションのすべてのデータを削除し、復元できません！**
  ```powershell
  wsl --unregister nekro-agent
  ```