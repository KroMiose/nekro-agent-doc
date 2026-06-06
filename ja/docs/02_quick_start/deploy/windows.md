---
title: Nekro AgentのWindowsデプロイメント
description: WindowsシステムでのNekro Agentデプロイメントの詳細手順。WSL2環境準備と2つのデプロイメント方法の完全ガイドを含みます。
---

# Windowsデプロイメントチュートリアル

このドキュメントでは、WindowsシステムにNekro Agentをデプロイする方法を案内します。

## デプロイメント方法を選択してください

<div class="deploy-container">
  <!-- Hyper-V -->
  <a class="deploy-option" href="/ja/docs/02_quick_start/deploy/windows/hyperv">
    <div class="option-header hyperv"> <!-- ここでのクラス名は子要素のアイコンカラーを特定するために使用されます -->
      <span class="option-icon"><DocIcon name="rocket" /></span>
      <span class="option-title">Hyper-Vデプロイメント</span>
    </div>
    <div class="option-desc">高性能、システムと同時に起動、Windowsネイティブ仮想化ソリューション。</div>
  </a>

  <!-- WSL2 -->
  <a class="deploy-option" href="/ja/docs/02_quick_start/deploy/windows/wsl">
    <div class="option-header wsl">
      <span class="option-icon"><DocIcon name="laptop" /></span>
      <span class="option-title">WSL2デプロイメント</span>
    </div>
    <div class="option-desc">軽量で便利、Windowsファイルシステムと深く統合、開発に適しています。</div>
  </a>

  <!-- ISO -->
  <a class="deploy-option" href="/ja/docs/02_quick_start/deploy/windows/iso">
    <div class="option-header iso">
      <span class="option-icon"><DocIcon name="disc" /></span>
      <span class="option-title">完全イメージデプロイメント</span>
    </div>
    <div class="option-desc">独立環境、ワンクリックインストール、最も分離性の高いデプロイメント方法。</div>
  </a>

  <!-- VMware -->
  <a class="deploy-option disabled">
    <div class="option-header vmware">
      <span class="option-icon"><DocIcon name="package" /></span> <!-- ソフトウェアに適したアイコンに変更 -->
      <span class="option-title">VMwareデプロイメント</span>
    </div>
    <div class="option-desc">近日公開：VMware Workstation専用ソリューション。</div>
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

/* 3. 鼠标悬停 - 放大状态 */
.deploy-option:hover {
  /* 放大 1.05 倍，并稍微抬起 */
  transform: translateZ(0) scale(1.05) translateY(-5px);

  /* 阴影变得很大、很虚，模拟离桌面很高 */
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.25);
  border-color: var(--vp-c-brand); /* 边框变色 */
  z-index: 2;
}

/* 4. 内部元素的 3D 视差效果 (可选，增加了精致感) */
.option-header, .option-desc {
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;
}

/* 悬停时，文字比背景多移动一点点（视差） */
.deploy-option:hover .option-header {
  transform: translateZ(20px); /* 标题突起 */
}
.deploy-option:hover .option-desc {
  transform: translateZ(10px); /* 描述突起 */
}

/* --- 以下是内部布局样式，保持不变 --- */
.option-header {
  display: flex;
  align-items: center;
  padding: 24px 24px 12px 24px;
  background: transparent;
  color: var(--vp-c-text-1);
}

.option-title {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  /* 为标题添加硬件加速 */
  will-change: transform;
  transform: translateZ(0);
}

.option-desc {
  padding: 0 24px 24px 24px;
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.5;
  border: none;
  /* 为描述添加硬件加速 */
  will-change: transform;
  transform: translateZ(0);
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