---
title: Windows 部署 Nekro Agent
description: 在 Windows 系统上部署 Nekro Agent 的详细步骤，包括WSL2环境准备和两种部署方式的完整指南
---

# Windows 部署教程

将指导您在 Windows 系统上部署 Nekro Agent。

## 请选择部署方式

<div class="deploy-container">
  <a class="deploy-option" href="/docs/02_quick_start/deploy/windows/hyperv">
    <div class="option-header hyperv">
      <span class="option-icon">🚀</span>
      <span class="option-title">Hyper-V 部署教程</span>
    </div>
    <div class="option-desc">性能优异，可跟随计算机一起启动</div>
  </a>
  
  <a class="deploy-option" href="/docs/02_quick_start/deploy/windows/wsl">
    <div class="option-header wsl">
      <span class="option-icon">🐧</span>
      <span class="option-title">WSL2 部署教程</span>
    </div>
    <div class="option-desc">性能优异，与 Windows 深度集成</div>
  </a>
  
  <a class="deploy-option" href="/docs/02_quick_start/deploy/windows/iso">
    <div class="option-header iso">
      <span class="option-icon">💿</span>
      <span class="option-title">完整系统镜像</span>
    </div>
    <div class="option-desc">部署简单，快捷</div>
  </a>
  
  <a class="deploy-option disabled">
    <div class="option-header vmware">
      <span class="option-icon">⏳</span>
      <span class="option-title">VMware 部署教程</span>
    </div>
    <div class="option-desc">敬请期待</div>
  </a>
</div>

<style>
.deploy-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.deploy-option {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  text-decoration: none !important;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.deploy-option:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-light);
}

.option-header {
  display: flex;
  align-items: center;
  padding: 16px;
  color: #fff;
  font-weight: 600;
}

.option-header.hyperv {
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand-dark));
}

.option-header.wsl {
  background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-darker));
}

.option-header.iso {
  background: linear-gradient(135deg, var(--vp-c-brand-lighter), var(--vp-c-brand));
}

.option-header.vmware {
  background: linear-gradient(135deg, #9e9e9e, #616161);
}

.option-icon {
  font-size: 1.5rem;
  margin-right: 12px;
}

.option-title {
  font-size: 1.1rem;
}

.option-desc {
  padding: 16px;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
  border-top: none;
  margin: 0;
}

.deploy-option.disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.deploy-option.disabled:hover {
  transform: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-divider);
}
</style>

