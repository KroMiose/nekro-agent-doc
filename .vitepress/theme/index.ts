import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import MyLayout from './components/switch.vue'

import './css/theme-colors.css'
import './css/background.css'
import './css/text.css'
import './css/brand.css'
import './css/Animation.css'
import './css/logo.css'
import './css/transparent.css'
import './css/style.css'
import './css/search-modal.css'
import { inBrowser } from "vitepress"
import busuanzi from "busuanzi.pure.js"
import Confetti from "./components/Confetti.vue"

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
  Layout() {
    return h(MyLayout) 
  },
} as Theme
