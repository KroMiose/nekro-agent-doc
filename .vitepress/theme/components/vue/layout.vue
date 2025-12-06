<!-- .vitepress/theme/components/vue/layout.vue -->
<!-- 自定义布局组件，包含路由过渡动画和浮动按钮 -->

<script setup>
import { useRouter, useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { ref, watch } from "vue";

const { Layout } = DefaultTheme;
const { route } = useRouter();
const transitionName = ref('scale-in');

/**
 * 滚动到页面顶部
 */
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * 监听路由变化，设置过渡动画名称
 */
watch(
  route,
  (newRoute, oldRoute) => {
    const newIndex = newRoute.path.split('/').length
    const oldIndex = oldRoute.path.split('/').length
    transitionName.value = newIndex > oldIndex ? 'scale-in' : 'scale-out'
  }
);
</script>

<template>
  <div class="router-wrapper">
    <!-- 页面过渡动画 -->
    <transition 
      :name="transitionName"
      mode="out-in"
    >
      <div :key="route.path">
        <Layout />
        
        <!-- 文档页脚 -->
        <div class="doc-footer" v-if="route.path.includes('/docs/')">
          <div class="container">
            <div class="doc-footer-content">
              <span>发现文档问题？</span>
              <a href="https://github.com/KroMiose/nekro-agent-doc/issues/new?template=issue_template.yml" target="_blank" class="doc-footer-link">报告问题</a>
            </div>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- 悬浮按钮区域 -->
    <div class="float-buttons" v-if="route.path.includes('/docs/')">
      <button class="float-button" @click="scrollToTop" title="返回顶部">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
      </button>
      <a class="float-button" href="https://github.com/KroMiose/nekro-agent-doc/issues/new?template=issue_template.yml" target="_blank" title="反馈问题">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>
    </div>
  </div>
</template>

<style>
/* 容器定位 */
.router-wrapper {
  position: relative;
  min-height: 100vh;
}

/* 页面进入动画 */
@keyframes scaleIn {
  0% {
    transform: scale(0.98);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 页面离开动画 */
@keyframes fadeOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

/* 文档页脚样式 */
.doc-footer {
  padding: 24px 0;
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 40px;
  text-align: center;
}

.doc-footer-content {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.doc-footer-link {
  margin: 0 8px;
  color: var(--vp-c-brand);
  transition: color 0.25s;
}

.doc-footer-link:hover {
  color: var(--vp-c-brand-dark);
}

/* 悬浮按钮样式 */
.float-buttons {
  position: fixed;
  right: 20px;
  bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 100;
}

.float-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background-color: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
  padding: 0;
}

.float-button:hover {
  background-color: var(--vp-c-brand-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>