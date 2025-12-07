<!-- .vitepress/theme/components/switch.vue -->
<!-- 暗黑模式切换动画组件 -->

<script setup>
import { useData } from "vitepress"
import { nextTick, provide } from "vue"
import DefaultTheme from 'vitepress/theme'

const { isDark } = useData()
const { Layout } = DefaultTheme

/**
 * 检查是否支持视图过渡动画
 * @returns {boolean} 是否支持视图过渡动画
 */
const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

/**
 * 提供暗黑模式切换功能
 */
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
<<<<<<< HEAD
  <Layout />
=======
  <LayoutComponent />
>>>>>>> 3e74ac1456799c7703053eaf622fc2ea36e1ee20
</template>

<style>
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