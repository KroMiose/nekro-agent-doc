---
layout: doc
---

# NekroAI 项目组成员招募

> 欢迎加入 NekroAI 开源社区，与我们共同打造下一代智能中枢框架！

---

<div class="recruit-wrapper">

  <div class="rules-container">
    <h2 class="recruit-heading"><DocIcon name="clipboard" />成员准则</h2>

<div class="VPHome" style="background: transparent;">
<div class="VPFeatures width-100">
<div class="container">
<div class="items">

<div class="item grid-3">
<div class="VPFeature">
<div class="icon"><DocIcon name="shield" /></div>
<div class="title">集体利益优先</div>
<div class="details">把项目组的集体利益放在首位</div>
</div>
</div>

<div class="item grid-3">
<div class="VPFeature">
<div class="icon"><DocIcon name="lock-keyhole" /></div>
<div class="title">严格保密</div>
<div class="details">遵守对项目资源、代码、机密数据的管理和保密要求</div>
</div>
</div>

<div class="item grid-3">
<div class="VPFeature">
<div class="icon"><DocIcon name="scale" /></div>
<div class="title">合规使用</div>
<div class="details">不滥用内部权限、资源、信息渠道进行不当牟利</div>
</div>
</div>

<div class="item grid-3">
<div class="VPFeature">
<div class="icon"><DocIcon name="ban" /></div>
<div class="title">资产保护</div>
<div class="details">不得损害项目组成员的工作成果和项目组资产</div>
</div>
</div>

<div class="item grid-3">
<div class="VPFeature">
<div class="icon"><DocIcon name="badge-check" /></div>
<div class="title">维护声誉</div>
<div class="details">积极维护项目组的声誉和利益</div>
</div>
</div>

<div class="item grid-3">
<div class="VPFeature">
<div class="icon"><DocIcon name="handshake" /></div>
<div class="title">友好交流</div>
<div class="details">与团队成员友好交流，不寻衅滋事、不恶意攻击</div>
</div>
</div>

</div>
</div>
</div>
</div>

  </div>

  <div class="qr-card glass-panel">
    <h2 class="recruit-heading"><DocIcon name="file" />扫码填写招募问卷</h2>
    <img src="/nekro_recruitment_qr.jpg" alt="Recruitment QR Code" />
  </div>

</div>

<style>
/* Layout Container */
.recruit-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 10px;
  align-items: center;
}

/* Sticker QR Card */
.recruit-wrapper .qr-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 20px;
  transition: transform 0.3s;
  max-width: 400px;
  width: 100%;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-bg-soft);
}

.recruit-wrapper .qr-card h2 {
  border: none;
  margin: 0 0 20px 0;
  font-size: 1.5em;
  text-align: center;
  line-height: 1.4;
}

.recruit-wrapper .recruit-heading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.recruit-wrapper .recruit-heading svg {
  width: 1em;
  height: 1em;
  color: var(--vp-c-brand-1);
  flex: none;
}

.recruit-wrapper .qr-card img {
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  width: 100%;
  max-width: 280px;
  height: auto;
}

/* Feature Grid Overrides & Fixes */
.recruit-wrapper .rules-container {
  width: 100%;
}

.recruit-wrapper .rules-container h2 {
  text-align: center;
  margin-bottom: 20px;
  border-top: none;
  margin-top: 0;
  padding-top: 0;
}

.recruit-wrapper .VPHome {
  min-height: 0 !important;
}

/* Force grid layout for features - SCOPED PROTECTED */
.recruit-wrapper .VPFeatures {
  padding: 0 !important;
}
.recruit-wrapper .VPFeatures .container {
  max-width: 100% !important;
}
.recruit-wrapper .VPFeatures .items {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.recruit-wrapper .VPFeatures .item.grid-3 {
  width: 100%;
}

/* Fix Icon Clipping: Ensure padding is sufficient */
.recruit-wrapper .VPFeature {
  padding: 24px !important;
  height: 100%;
}

/* Ensure icons are decent size */
.recruit-wrapper .VPFeature .icon {
  font-size: 24px;
  margin-bottom: 12px;
}

.recruit-wrapper .VPFeature .icon svg {
  width: 24px;
  height: 24px;
  color: var(--vp-c-brand-1);
  stroke-width: 2;
}

@media (min-width: 960px) {
  /* Keep vertical stack but ensure grid has full width */
  .recruit-wrapper {
    flex-direction: column;
    align-items: center;
  }

  /* QR Card styles for Stacked Layout */
  .recruit-wrapper .qr-card {
    position: static;
    width: 100%;
    max-width: 480px;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .recruit-wrapper .rules-container {
    width: 100%;
    padding-top: 0;
  }

  .recruit-wrapper .rules-container h2 {
    text-align: center;
  }

  /* 3 Column Grid for PC */
  .recruit-wrapper .VPFeatures .item.grid-3 {
    width: calc(33.333% - 14px);
  }
}
</style>
