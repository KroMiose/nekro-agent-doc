---
layout: doc
---

# NekroAI 项目组成员招募 🤝

> 欢迎加入 NekroAI 开源社区，与我们共同打造下一代智能中枢框架！✨

---

<div class="recruit-wrapper">
  
  <div class="rules-container">
    <h2>📋 成员准则</h2>
    
<div class="VPHome" style="background: transparent;">
<div class="VPFeatures width-100">
<div class="container">
<div class="items">

<div class="item grid-3">
<div class="VPFeature">
<div class="icon">🛡️</div>
<div class="title">集体利益优先</div>
<div class="details">把项目组的集体利益放在首位</div>
</div>
</div>

<div class="item grid-3">
<div class="VPFeature">
<div class="icon">🔒</div>
<div class="title">严格保密</div>
<div class="details">遵守对项目资源、代码、机密数据的管理和保密要求</div>
</div>
</div>

<div class="item grid-3">
<div class="VPFeature">
<div class="icon">⚖️</div>
<div class="title">合规使用</div>
<div class="details">不滥用内部权限、资源、信息渠道进行不当牟利</div>
</div>
</div>

<div class="item grid-3">
<div class="VPFeature">
<div class="icon">🚫</div>
<div class="title">资产保护</div>
<div class="details">不得损害项目组成员的工作成果和项目组资产</div>
</div>
</div>

<div class="item grid-3">
<div class="VPFeature">
<div class="icon">🌟</div>
<div class="title">维护声誉</div>
<div class="details">积极维护项目组的声誉和利益</div>
</div>
</div>

<div class="item grid-3">
<div class="VPFeature">
<div class="icon">🤝</div>
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
    <h2>📝 扫码填写招募问卷</h2>
    <img src="/nekro_recruitment_qr.jpg" alt="Recruitment QR Code" />
  </div>

</div>

<style>
/* Layout Container */
.recruit-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Reduced from 40px */
  margin-top: 10px; /* Reduced from 40px */
  align-items: center;
}

/* Sticker QR Card */
.qr-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 20px;
  transition: transform 0.3s;
  max-width: 400px; /* increased to match desktop width */
  width: 100%;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-bg-soft);
}

.qr-card h2 {
  border: none;
  margin: 0 0 20px 0;
  font-size: 1.5em;
  text-align: center;
  line-height: 1.4;
}

.qr-card img {
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  width: 100%;
  max-width: 280px; /* Limit image size within larger card */
  height: auto;
}

/* Feature Grid Overrides & Fixes */
.rules-container {
  width: 100%;
}

.rules-container h2 {
  text-align: center;
  margin-bottom: 20px; /* Reduced from 30px */
  border-top: none;
  margin-top: 0; /* Ensure no top margin */
  padding-top: 0;
}

/* Force grid layout for features */
.VPFeatures {
  padding: 0 !important;
}
.VPFeatures .container {
  max-width: 100% !important;
}
.VPFeatures .items {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.VPFeatures .item.grid-3 {
  width: 100%;
}

/* Fix Icon Clipping: Ensure padding is sufficient */
.VPFeature {
  padding: 24px !important; /* Force padding to prevent overlapping */
  height: 100%;
}

/* Ensure icons are decent size */
.VPFeature .icon {
  font-size: 24px;
  margin-bottom: 12px;
}

@media (min-width: 960px) {
  /* Keep vertical stack but ensure grid has full width */
  .recruit-wrapper {
    flex-direction: column;
    align-items: center; 
  }
  
  /* QR Card styles for Stacked Layout */
  .qr-card {
    position: static; 
    width: 100%;
    max-width: 480px; /* Slightly wider for desktop title friendliness */
    flex-direction: column; /* ALWAYS vertical stack, even on desktop */
    margin-bottom: 20px;
  }
  
  .rules-container {
    width: 100%; /* Full width for grid */
    padding-top: 0; /* Reduced from 20px */
  }

  .rules-container h2 {
    text-align: center; /* Center title */
  }
  
  /* 3 Column Grid for PC (33.3% minus gap) - Now has full space */
  .VPFeatures .item.grid-3 {
    width: calc(33.333% - 14px);
  }
}
</style>
