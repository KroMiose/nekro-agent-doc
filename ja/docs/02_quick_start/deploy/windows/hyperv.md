---
title: Nekro AgentのWindows Hyper-Vデプロイメント
description: Hyper-Vを使用してWindowsシステムにNekro Agentをデプロイする詳細手順
---

# Windows for Hyper-Vデプロイメントチュートリアル

このドキュメントでは、WindowsシステムにNekro Agentをデプロイする方法を案内します。

:::tip Hyper-Vクイック作成初回利用者へのヒント
- Ubuntu 22.04をクイック作成する際、「自動ログイン」にチェックを入れず、「パスワードログイン」を選択してください。さもないと、不明な理由で拡張セッションを有効にできません。
- クイック作成はAzure Linuxカーネルを使用しており、Hyper-Vメモリ回収をサポートしていません。最大として設定したメモリが完全に占有されます。メモリ回収が必要な場合は、Genericカーネルに切り替えてください。
- ディスク管理ツールを使用して、Hyper-V拡張によって割り当てられたスペースを有効にすることを忘れないでください。
- 任意に更新する前に、より多くのチェックポイントを作成してください。
:::


## 🌈 環境準備

Nekro AgentはDockerベースで動作するため、まずWindowsにHyper-Vをインストールする必要があります。

### Hyper-Vのインストール

Windowsで仮想マシンを作成するためにHyper-Vを有効にします。Hyper-Vは、Windowsコントロールパネル、PowerShell、または展開イメージサービスと管理（DISM）を使用するなど、複数の方法で有効にできます。このドキュメントでは、各オプションを段階的に説明します。

::: info 注意
Hyper-VはWindowsにオプション機能として組み込まれており、Hyper-Vをダウンロードする必要はありません。
:::

#### Windowsシステム要件の確認
Windows 10（ProまたはEnterprise）、またはWindows 11（ProまたはEnterprise）
セカンドレベルアドレス変換（SLAT）を備えた64ビットプロセッサ。
CPUはVMモニタモード拡張（Intel CPUの場合はVT-c）をサポートしています。
最小メモリ4GB。

::: info 注意
Hyper-V役割をWindows 10 HomeまたはWindows 11 Homeに通常の方法でインストールすることはできません。[インストールスクリプト](https://pan.mrly.cc/s/veC9)を使用してください 注：スクリプトは管理者権限で実行する必要があります。
:::

詳細情報とトラブルシューティングについては、Windows Hyper-Vシステム要件を参照してください。

#### PowerShellを使用してHyper-Vを有効にする
Windowsデスクトップで、「スタート」ボタンを選択し、Windows PowerShellの名前の一部を入力します。

Windows PowerShellを右クリックし、「管理者として実行」を選択します。

::: warning 警告
PowerShellは管理者として実行する必要があり、そうでない場合コマンドは失敗します。
:::

1. 以下のコマンドを実行します：
```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```
![PowerShellを通じてHyper-V機能を開く説明画像](/assets/windows/enable-hyper-v-powershell.webp)

2. Yを入力して、コンピュータを再起動し、インストールを完了させます。

#### CMDとDISMを使用してHyper-Vを有効にする
展開イメージサービスと管理（DISM）は、WindowsとWindowsイメージの設定に役立ちます。その多くのアプリケーションの中で、DISMはオペレーティングシステムの実行中にWindows機能を有効にすることができます。

DISMを使用してHyper-V役割を有効にするには、以下の手順に従ってください：

1. Windowsデスクトップで、「スタート」ボタンを選択し、Windows PowerShellの名前の一部を入力します。

2. Windows PowerShellを右クリックし、「管理者として実行」を選択します。

3. 以下のコマンドを入力します：

```powershell
DISM /Online /Enable-Feature /All /FeatureName:Microsoft-Hyper-V
```
![CMDを通じてHyper-V機能を開く説明画像](/assets/windows/enable-hyper-v-dism.webp)

4. 機能が有効になり、「操作は正常に完了しました」と表示されていることがわかります。

#### 「設定」を通じてHyper-V役割を有効にする
1. 「スタート」を選択し、次に「設定」を検索して選択します

2. 「アプリ」と「機能」を選択します。次に「プログラムと機能」を選択します

3. 「Windows機能の有効化または無効化」を選択します。

4. Hyper-Vを選択し、次に「OK」を選択します。

5. コンピュータを再起動して、インストールを完了します。

#### Windows 10とWindows 11でHyper-Vを有効にする
コントロールパネルに移動します。「スタート」を選択し、次にコントロールパネルを検索してアプリケーションを開きます。

1. 「プログラム」を選択し、次に「プログラムと機能」を選択します。

2. 「Windows機能の有効化または無効化」を選択します。

3. Hyper-Vを選択し、次に「OK」を選択します。
![コントロールパネルを通じてHyper-V機能を開く説明画像](/assets/windows/enable-hyper-v.webp)

インストールが完了したら、システムはコンピュータを再起動するように促します。

## Hyper-Vを使用してLinux仮想マシンをインストールする
### Linux仮想マシンをインストールする
1. Hyper-Vマネージャーを開きます。「クイック作成」を選択し、次にUbuntu 22.04 LTSを選択します

2. 「仮想マシンの作成」を選択します。

3. 作成が完了するのを待ち、次に起動してシステムを設定します

@[bilibili](BV1BqJizaEDs)

## Nekro Agentをインストールする
Nekro Agentをインストールする手順はLinuxデプロイメントと一致しています。[Linuxデプロイメント](/ja/docs/02_quick_start/deploy/linux)ドキュメントを確認し、ドキュメントに従ってデプロイメントを完了してください。

### デプロイメント後の設定

[OneBot V11 / NapCat 設定](/ja/docs/02_quick_start/adapters/onebot_v11)ドキュメントに移動し、ドキュメントに従って設定を完了してください。
