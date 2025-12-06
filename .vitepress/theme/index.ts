// .vitepress/theme/index.ts
// 自定义主题入口文件

import { h, onMounted } from 'vue'
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

// 导入第三方库和组件
import { inBrowser } from "vitepress"
import busuanzi from "busuanzi.pure.js"
import Confetti from "./components/Confetti.vue"

// 导入3D倾斜效果
import { init3DTiltEffect } from './components/feature.js'

// 导入自定义通知脚本
import { showAestheticNotice } from './notice.js'

/**
 * 自定义主题配置
 */
export default {
  extends: DefaultTheme,

  /**
   * 增强 Vue 应用实例
   * @param app - Vue 应用实例
   * @param router - VitePress 路由器
   * @param siteData - 站点数据
   */
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
  
  /**
   * 设置组件的生命周期钩子
   */
  setup() {
    onMounted(() => {
      if (inBrowser) {
        // 在页面挂载后调用通知函数
        showAestheticNotice();
        
        // 初始化3D倾斜效果
        init3DTiltEffect();
      }
    });
  },

  /**
   * 自定义布局组件
   */
  Layout() {
    return h(MyLayout) 
  },
} as Theme