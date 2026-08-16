---
title: Email 配置教程
description: 面向首次接入邮箱用户的 Nekro Agent 配置教程。
---

# Email 配置教程

本文会按邮箱类型提供配置方法，您可以选择自己的邮箱查看对应步骤，再将 Nekro Agent 接入邮箱收发流程。

::: tip 支持邮箱列表

QQ邮箱、163邮箱、Outlook、Gmail、自定义邮箱

:::

## 第一步：初始化email适配器

1. 打开「适配器」->「Email」
2. 打开「启用适配器」开关
3. 根据您的网络环境，设置邮箱连接代理（可选）
4. 重启 NekroAgent

![na侧配置](/assets/adapters/email/naconf_1.png)

## 第二步：添加邮箱账户

在查看具体教程前，请先进入「适配器」->「Email」->「账户」页

![na侧配置2](/assets/adapters/email/naconf_2.png)

::: tip 提示
请根据自己的网络环境判断是否需要开启代理
:::

<div class="email-provider-grid">
  <details class="email-provider-card">
    <summary>QQ邮箱</summary>
    <ol>
      <li>登录 QQ邮箱</li>
      <li>点击右上角账户名下的 <code>账号与安全</code></li>
      <p><img src="/assets/adapters/email/qqconf_1.png" alt="设置1" /></p>
      <li>在弹出的页面内点击 <code>安全设置</code> 后点击 <code>POP3/IMAP/SMTP/Exchange/CardDAV 服务</code> 下的 <code>开启服务</code></li>
      <p><img src="/assets/adapters/email/qqconf_2.png" alt="设置2" /></p>
      <li>根据指引开启相关服务</li>
      <li>记录授权码</li>
      <p><img src="/assets/adapters/email/qqconf_3.png" alt="授权码" /></p>
      <li>回到 NA ，点击添加账户，邮箱提供商选择 QQ邮箱 </li>
      <li>邮箱账户栏填您的邮箱账号，密码/授权码栏填您刚才记录的授权码</li>
      <li>根据您的网络情况与详细功能需要，开启或关闭下方四个开关</li>
      <p><img src="/assets/adapters/email/naconf_3.png" alt="na侧配置3" /></p>
      <li>点击保存，后点击操作最左侧的测试连接，即可在连接状态处看到是否连接成功</li>
      <li>设置显示名称(可选)</li>
    </ol>
  </details>

  <details class="email-provider-card">
    <summary>163邮箱</summary>
    <ol>
        <li>登录 163邮箱</li>
        <li>点击账户右侧设置下的 <code>POP3/SMTP/IMAP</code></li>
        <p><img src="/assets/adapters/email/163conf_1.png" alt="设置1" /></p>
        <li>点击 <code>IMAP/SMTP服务</code>后的开机按钮</li>
        <p><img src="/assets/adapters/email/163conf_2.png" alt="设置2" /></p>
        <li>根据指引开启相关服务</li>
        <li>记录授权码</li>
        <p><img src="/assets/adapters/email/163conf_3.png" alt="授权码" /></p>
        <li>回到 NA ，点击添加账户，邮箱提供商选择 163邮箱 </li>
        <li>邮箱账户栏填您的邮箱账号，密码/授权码栏填您刚才记录的授权码</li>
        <li>根据您的网络情况与详细功能需要，开启或关闭下方四个开关</li>
        <p><img src="/assets/adapters/email/naconf_4.png" alt="na侧配置4" /></p>
        <li>点击保存，后点击操作最左侧的测试连接，即可在连接状态处看到是否连接成功</li>
        <li>设置显示名称(可选)</li>
        </ol>
  </details>

  <details class="email-provider-card">
    <summary>Outlook</summary>
    <ol>
      <li>点击添加账户，邮箱提供商选择 Outlook</li>
      <p><img src="/assets/adapters/email/naconf_5.png" alt="na侧配置5" /></p>
      <li>点击 <code>打开 Microsoft 应用注册页</code>，使用您想登录的微软账户登录</li>
      <li>点击新注册，创建一个新的应用，名称任意填写，其余项按照下方如片所示填写</li>
      <p><img src="/assets/adapters/email/outlookconf_1.png" alt="设置1" /></p>
      <li>点击注册，记下 <code>应用程序(客户端) ID</code>，后点击右侧的 <code>添加证书或机密</code>，如下图所示</li>
      <p><img src="/assets/adapters/email/outlookconf_2.png" alt="设置2" /></p>
      <li>点击 <code>新客户端密码</code>，添加描述并设置有效期后点击添加</li>
      <p><img src="/assets/adapters/email/outlookconf_3.png" alt="设置3" /></p>
      <li>记下密码的 <code>值</code></li>
      <p><img src="/assets/adapters/email/outlookconf_4.png" alt="设置4" /></p>
      <li>回到 NA ，将记下的 <code>应用程序(客户端) ID</code> 填入 <code>应用 Client ID</code>，<code>密码值</code> 填入 <code>应用 Client Secret</code>，保持 Microsoft Tenant ID 不变，填写完成后，点击连接 Microsoft</li>
      <li>在新弹出的窗口内完成登录并授权，随后会跳转到一个无法打开的页面，将网址<strong>完整</strong>复制下来</li>
      <li>返回 NA ，将网址粘贴进回调链接输入框，并点击完成绑定</li>
      <li>点击保存</li>
      <li>点击操作最左侧的测试连接，即可在连接状态处看到是否连接成功</li>
      <li>设置显示名称(可选)</li>
    </ol>
  </details>

  <details class="email-provider-card">
    <summary>Gmail</summary>
    <ol>
      <li>点击添加账户，邮箱提供商选择 Gmail</li>
      <p><img src="/assets/adapters/email/naconf_6.png" alt="na侧配置6" /></p>
      <li>点击 <code>打开 Google Cloud 凭据页</code>，使用您想登录的 Google 账户登录</li>
      <li>点击创建凭证下的 <code>Oauth 客户端 ID</code></li>
      <p><img src="/assets/adapters/email/gmailconf_1.png" alt="设置1" /></p>
      <li>应用名称任意填写，其余配置参考下图填写</li>
      <p><img src="/assets/adapters/email/gmailconf_2.png" alt="设置2" /></p>
      <li>填写完成后，点击创建，记录下 <code>客户端 ID</code> 与 <code>客户端密钥</code></li>
      <p><img src="/assets/adapters/email/gmailconf_3.png" alt="设置3" /></p>
      <li>回到 NA ，将记下的 <code>客户端 ID</code> 填入 <code>应用 Client ID</code>，<code>客户端密码</code> 填入 <code>应用 Client Secret</code>，填写完成后，点击连接 Google</li>
      <li>使用您创建凭证的 Google 账号登录，过程中会提示 <code>此应用未经 Google 验证</code> 点击继续即可，完成授权后会跳转到一个无法打开的页面，将网址<strong>完整</strong>复制下来</li>
      <li>返回 NA ，将网址粘贴进回调链接输入框，并点击完成绑定</li>
      <li>点击保存</li>
      <li>点击操作最左侧的测试连接，即可在连接状态处看到是否连接成功</li>
      <li>设置显示名称(可选)</li>
    </ol>
  </details>

  <details class="email-provider-card">
    <summary>自定义邮箱</summary>
    <ol>
      <li>点击添加账户，邮箱提供商选择 自定义</li>
      <li>根据您的邮箱提供商的信息，填写对应账号与授权码</li>
      <li>填写邮箱提供商的 SMTP 与 IMAP 的地址</li>
      <li>根据情况选择是否使用代理连接</li>
      <li>保存并测试连接</li>
    </ol>
  </details>
</div>

## 第三步：设置轮询和通知

您至少要看这几个全局配置：

- `轮询间隔(秒)`：多久检查一次新邮件，默认 30 秒
- `仅拉取未读`：是否只抓未读邮件
- `每次最大抓取数`：每次最多抓多少封
- `读取后标记已读`：读取后是否标记已读
- `启用新邮件通知`：是否启用新邮件通知
- `新邮件通知聊天频道`：通知要发到哪个聊天

第一次使用时，建议先保持默认值，只在确实需要时再调。

## 您配置完成后会看到什么

每个邮箱账户都会变成一个单独聊天：

```text
email-您的邮箱地址
```

例如：

```text
email-123456@qq.com
```

## 附件会存到哪里

邮件附件会自动保存到：

```text
data/uploads/email_attachment/{邮箱账户}/{邮件UID}/{附件文件名}
```

如果您计划让 AI 处理附件，记得保证数据目录可写。

## 常见问题

### 明明账号密码没错，但连不上

大多数时候不是密码错，而是您填了登录密码而不是授权码。

### 能收邮件，但不能发邮件

优先检查：

1. 当前账户是否打开了 `启用发信`
2. SMTP 是否已经在邮箱后台启用
3. 这个邮箱是否被设成默认发件人，或者您发送时有没有明确指定账户

### 两个邮箱都被设成了默认发件人

不行。默认发件人只能有一个。

<style>
.email-provider-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin: 16px 0 28px;
}

.email-provider-card {
  padding: 16px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
}

.email-provider-card[open] {
  grid-column: 1 / -1;
}

.email-provider-card summary {
  cursor: pointer;
  font-weight: 600;
}

.email-provider-card ol {
  margin-top: 16px;
}

.email-provider-card img {
  border-radius: 12px;
}
</style>
