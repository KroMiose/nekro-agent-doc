// .vitepress/theme/index.ts

import { h, onMounted } from 'vue' // 1. 导入 onMounted
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import MyLayout from './components/switch.vue'

// 导入所有样式文件
import './css/base/colors.css'
import './css/layout/hero.css'
import './css/components/animation.css'
import './css/components/button.css'
import './css/components/feature.css'
import './css/components/search.css'
import './css/layout/blur.css'
import './css/base/overrides.css'

import { inBrowser } from "vitepress"
import busuanzi from "busuanzi.pure.js"
import Confetti from "./components/Confetti.vue"

// 2. 导入我们的通知脚本
import { showAestheticNotice } from './notice.js'

/**
 * 自定义主题
 */
export default {
  extends: DefaultTheme,

  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component("Confetti", Confetti)
    
    // 仅在浏览器环境下执行
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
      }
    }
  },
  
  // 3. 使用 setup() 函数来集成 onMounted 钩子
  setup() {
    onMounted(() => {
      if (inBrowser) {
        // 在页面挂载后调用通知函数
        showAestheticNotice();
      }
    });
  },

  Layout() {
    return h(MyLayout) 
  },
} as Theme