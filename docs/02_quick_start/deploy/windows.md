---
title: Windows 部署 Nekro Agent
description: 在 Windows 系统上部署 Nekro Agent 的详细步骤，包括WSL2环境准备和两种部署方式的完整指南
---

# Windows 部署教程

将指导您在 Windows 系统上部署 Nekro Agent。

## 请选择部署方式

<div class="deploy-container">
  <!-- NA-for-Win -->
  <a class="deploy-option" href="/docs/02_quick_start/deploy/windows/na-for-win">
    <div class="option-header naforwin">
      <span class="option-icon"><DocIcon name="monitor" /></span>
      <span class="option-title">NA Windows 启动器（推荐）</span>
    </div>
    <div class="option-desc">一键部署，图形化管理，基于 WSL2 的轻量级方案，开箱即用。</div>
  </a>

  <!-- Hyper-V -->
  <a class="deploy-option" href="/docs/02_quick_start/deploy/windows/hyperv">
    <div class="option-header hyperv"> <!-- 这里的类名用于定位子元素图标颜色 -->
      <span class="option-icon"><DocIcon name="rocket" /></span>
      <span class="option-title">Hyper-V 部署</span>
    </div>
    <div class="option-desc">性能强劲，跟随系统启动，Windows 原生虚拟化方案。</div>
  </a>

  <!-- WSL2 -->
  <a class="deploy-option" href="/docs/02_quick_start/deploy/windows/wsl">
    <div class="option-header wsl">
      <span class="option-icon"><DocIcon name="laptop" /></span>
      <span class="option-title">WSL2 部署</span>
    </div>
    <div class="option-desc">轻量便捷，与 Windows 文件系统深度集成，适合开发。</div>
  </a>

  <!-- ISO -->
  <a class="deploy-option" href="/docs/02_quick_start/deploy/windows/iso">
    <div class="option-header iso">
      <span class="option-icon"><DocIcon name="disc" /></span>
      <span class="option-title">完整镜像部署</span>
    </div>
    <div class="option-desc">独立环境，一键安装，隔离性最好的部署方式。</div>
  </a>

  <!-- VMware -->
  <a class="deploy-option disabled">
    <div class="option-header vmware">
      <span class="option-icon"><DocIcon name="package" /></span> <!-- 换了个更符合软件的图标 -->
      <span class="option-title">VMware 部署</span>
    </div>
    <div class="option-desc">即将推出：适用于 VMware Workstation 的专属方案。</div>
  </a>
</div>

<style>
/* 1. 3D 舞台容器 */
.deploy-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin: 40px 0;
  perspective: 1200px; /* 增加景深值减少变形感 */
  padding: 10px; /* 防止放大时边缘被切 */
  transform-style: preserve-3d; /* 为容器也添加3D样式 */
}

/* 2. 卡片基础样式 - 确保 Transition 定义在这里 */
.deploy-option {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  text-decoration: none !important;
  overflow: hidden;

  /* --- 关键：强制硬件加速与过渡动画 --- */
  transform-style: preserve-3d;
  transform: translateZ(0) scale(1); /* 定义初始状态 */
  backface-visibility: hidden; /* 防止渲染闪烁 */

  /* 添加更多硬件加速属性 */
  will-change: transform, box-shadow, border-color;
  isolation: isolate;

  /*
     all: 所有属性都参与动画
     0.4s: 动画时长
     cubic-bezier: 苹果风格的平滑减速曲线
  */
  transition:
    transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    border-color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* 3. 鼠标悬停 - 抬起 + 高亮（不缩放，避免文字虚化） */
.deploy-option:hover {
  /* 只做上抬效果，不缩放 —— scale 会触发子像素重渲染导致文字虚化 */
  transform: translateY(-6px);

  /* 阴影加深，模拟"浮起"感 */
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.2);
  border-color: var(--vp-c-brand); /* 边框高亮成品牌色 */
  z-index: 2;
}

/* 4. hover 时不再对子元素做 transform —— 子元素的 translateZ 是字体糊化的元凶 */
.option-header, .option-desc {
  /* 留空：不需要 transition / will-change，因为不再做悬停动画 */
}

/* --- 以下是内部布局样式 --- */
.option-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 24px 12px 24px;
  background: transparent;
  color: var(--vp-c-text-1);
}

.option-icon {
  flex: 0 0 auto;
  font-size: 1.6rem;
  line-height: 1;
}

.option-title {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.option-desc {
  padding: 0 24px 24px 24px;
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.5;
  border: none;
}

/* 禁用状态 */
.deploy-option.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  filter: grayscale(0.9);
}
.deploy-option.disabled:hover {
  transform: none;
  box-shadow: none;
}
</style>
