import { h, onMounted } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import mediumZoom from 'medium-zoom'
import type { Zoom } from 'medium-zoom'
import './css/base/fonts.css'
import './css/base/colors.css'

import './css/layout/hero.css'
import './css/components/animation.css'
import './css/components/button.css'
import './css/components/feature.css'
import './css/components/search.css'
import './css/components/zoom.css'
import './css/components/theme-image.css'
import './css/layout/blur.css'
import './css/base/overrides.css'
import { inBrowser } from "vitepress"
import Confetti from "./components/vue/Confetti.vue"
import MyLayout from './components/vue/switch.vue'
import LayoutComponent from './components/vue/layout.vue'
import PageCopyActions from './components/vue/PageCopyActions.vue'
import DocIcon from './components/vue/DocIcon.vue'
import { init3DTiltEffect } from './components/js/feature.js'
import { showCookieNotice } from './components/js/notice.js'

// 复用单一 medium-zoom 实例，路由切换时重新绑定
let zoomInstance: Zoom | null = null

// 选出"正文区里且不在 <a> 链接内"的图片：
// 被链接包裹的图通常是卡片/导航图标，点击应跳转而非放大。
function collectZoomTargets(): HTMLImageElement[] {
  return Array.from(
    document.querySelectorAll<HTMLImageElement>('.vp-doc img:not([data-zoom-disabled])')
  ).filter(img => !img.closest('a'))
}

function refreshImageZoom() {
  if (!inBrowser) return
  const targets = collectZoomTargets()
  if (!zoomInstance) {
    zoomInstance = mediumZoom(targets, {
      background: 'var(--vp-c-bg)',
      margin: 32,
      scrollOffset: 0,
    })
  } else {
    zoomInstance.detach()
    zoomInstance.attach(targets)
  }
}

export default {
  extends: DefaultTheme,

  Layout: () => {
    return h(MyLayout)
  },

  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component("Confetti", Confetti)
    app.component("MyLayout", MyLayout)
    app.component("PageCopyActions", PageCopyActions)
    app.component("DocIcon", DocIcon)

    // 仅在浏览器环境下执行
    if (inBrowser) {
      // 初始化函数
      const initEffects = () => {
        // 初始化3D倾斜效果（延迟执行以确保DOM已渲染）
        setTimeout(() => {
          init3DTiltEffect();
          refreshImageZoom();
        }, 100);
      };

      // 首次加载时初始化
      router.onAfterRouteChanged = () => {
        initEffects();
        showCookieNotice(); // 路由切换时更新 Cookie 提示语言
      };
    }
  },

  setup() {
    onMounted(() => {
      if (inBrowser) {
        // 在页面挂载后调用Cookie提醒函数
        showCookieNotice();

        // 初始化3D倾斜效果
        setTimeout(() => {
          init3DTiltEffect();
          refreshImageZoom();
        }, 100);
      }
    });
  }
} as Theme
