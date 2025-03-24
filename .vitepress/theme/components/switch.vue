<script setup>
import { useRouter, useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { ref, watch, nextTick, provide } from "vue";

const { Layout } = DefaultTheme;
const { route } = useRouter();
const { isDark } = useData();
const transitionName = ref('scale-in');

watch(
  route,
  (newRoute, oldRoute) => {
    const newIndex = newRoute.path.split('/').length
    const oldIndex = oldRoute.path.split('/').length
    transitionName.value = newIndex > oldIndex ? 'scale-in' : 'scale-out'
  }
);

// 暗黑模式切换相关代码
const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})
</script>

<template>
  <div class="router-wrapper">
    <transition 
      :name="transitionName"
      mode="out-in"
      @before-leave="beforeLeave"
      @after-enter="afterEnter"
    >
      <Layout :key="route.path" />
    </transition>
  </div>
</template>

<style>
/* 容器定位 */
.router-wrapper {
  position: relative;
  min-height: 100vh;
}


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

@keyframes fadeOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

/* 暗黑模式切换相关样式 */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 2;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
