---
title: アダプター設定
description: Nekro Agent のアダプター設定入口ページ。アダプター種別ごとに詳細設定へ進めます。
aside: false
---

# アダプター設定

現在使用しているアダプターを選び、対応する詳細設定ページへ進んでください。

<div class="adapter-hub">
  <div class="adapter-hub-shell">
    <div class="VPFeatures width-100">
      <div class="container">
        <div class="items">
          <div class="item grid-6">
            <a class="VPFeature adapter-card" href="/ja/docs/02_quick_start/adapters/onebot_v11">
              <div class="icon"><img src="/common/adapters/qq.svg" alt="QQ" /></div>
              <div class="title">OneBot V11 / NapCat</div>
              <div class="details">OneBot V11 / NapCat アダプターの設定ガイドを確認します。</div>
            </a>
          </div>
          <div class="item grid-6">
            <a class="VPFeature adapter-card" href="/ja/docs/02_quick_start/adapters/wechatpad">
              <div class="icon"><img src="/common/adapters/wechat.svg" alt="WeChat" /></div>
              <div class="title">WeChat（WeChatPad Pro）</div>
              <div class="details">WeChatPad Pro アダプターの文書状況とリスク説明を確認します。</div>
            </a>
          </div>
          <div class="item grid-6">
            <a class="VPFeature adapter-card" href="/ja/docs/02_quick_start/adapters/wecom_bot">
              <div class="icon"><img src="/common/adapters/wecom.svg" alt="WeCom" /></div>
              <div class="title">WeCom AI Bot</div>
              <div class="details">WeCom AI Bot アダプターの設定ガイドを確認します。</div>
            </a>
          </div>
          <div class="item grid-6">
            <a class="VPFeature adapter-card" href="/ja/docs/02_quick_start/adapters/wecom_app">
              <div class="icon"><img src="/common/adapters/wecom.svg" alt="WeCom" /></div>
              <div class="title">WeCom カスタムアプリ</div>
              <div class="details">WeCom カスタムアプリの設定ガイドを確認します。</div>
            </a>
          </div>
          <div class="item grid-6">
            <a class="VPFeature adapter-card" href="/ja/docs/02_quick_start/adapters/feishu">
              <div class="icon"><img src="/common/adapters/feishu.svg" alt="Feishu" /></div>
              <div class="title">Feishu</div>
              <div class="details">Feishu アダプターの設定ガイドを確認します。</div>
            </a>
          </div>
          <div class="item grid-6">
            <a class="VPFeature adapter-card" href="/ja/docs/02_quick_start/adapters/telegram">
              <div class="icon"><img src="/common/adapters/telegram.svg" alt="Telegram" /></div>
              <div class="title">Telegram</div>
              <div class="details">Telegram アダプターの設定ガイドを確認します。</div>
            </a>
          </div>
          <div class="item grid-6">
            <a class="VPFeature adapter-card" href="/ja/docs/02_quick_start/adapters/discord">
              <div class="icon"><img src="/common/adapters/discord.svg" alt="Discord" /></div>
              <div class="title">Discord</div>
              <div class="details">Discord アダプターの設定ガイドを確認します。</div>
            </a>
          </div>
          <div class="item grid-6">
            <a class="VPFeature adapter-card" href="/ja/docs/02_quick_start/adapters/email">
              <div class="icon"><img src="/common/adapters/email.svg" alt="Email" /></div>
              <div class="title">Email</div>
              <div class="details">Email アダプターの設定ガイドを確認します。</div>
            </a>
          </div>
          <div class="item grid-6">
            <a class="VPFeature adapter-card" href="/ja/docs/02_quick_start/adapters/bilibili">
              <div class="icon"><img src="/common/adapters/bilibili.svg" alt="Bilibili" /></div>
              <div class="title">Bilibili Live</div>
              <div class="details">Bilibili Live アダプターの文書はまだ未作成です。</div>
            </a>
          </div>
          <div class="item grid-6">
            <a class="VPFeature adapter-card" href="/ja/docs/02_quick_start/adapters/minecraft">
              <div class="icon"><img src="/common/adapters/minecraft.svg" alt="Minecraft" /></div>
              <div class="title">Minecraft</div>
              <div class="details">Minecraft アダプターの文書はまだ未作成です。</div>
            </a>
          </div>
          <div class="item grid-6">
            <a class="VPFeature adapter-card" href="/ja/docs/02_quick_start/adapters/sse">
              <div class="icon"><img src="/common/adapters/sse.svg" alt="SSE" /></div>
              <div class="title">SSE</div>
              <div class="details">SSE アダプターの設定ガイドを確認します。</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.adapter-hub {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 16px;
}

.adapter-hub-shell {
  width: 100%;
}

.adapter-hub .VPFeatures .container {
  max-width: 100%;
  padding: 0;
}

.adapter-hub .VPFeatures .items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 18px;
}

.adapter-hub .item.grid-6 {
  width: auto;
}

.adapter-hub .adapter-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  min-height: 220px;
  padding: 26px 24px 24px;
  box-sizing: border-box;
  border-radius: 24px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  background: var(--vp-c-bg-soft) !important;
  border: 1px solid var(--vp-c-divider) !important;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
  align-items: center;
  text-align: center;
  transform: none !important;
  transform-style: flat !important;
  perspective: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  will-change: auto;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.adapter-hub .adapter-card:hover {
  transform: none !important;
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.1);
}

.adapter-hub .adapter-card::after {
  display: none !important;
}

.adapter-hub .adapter-card > * {
  transform: none !important;
}

.adapter-hub .adapter-card .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin: 0 auto;
  border-radius: 16px;
  background: var(--vp-c-default-soft);
}

.adapter-hub .adapter-card .icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.adapter-hub .adapter-card .title {
  margin-top: 18px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.35;
  color: var(--vp-c-text-1);
}

.adapter-hub .adapter-card .details {
  flex: 1;
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
</style>
