// .vitepress/theme/index.ts
// 自定义主题入口文件

import { h, onMounted } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

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
import Confetti from "./components/vue/Confetti.vue"
import MyLayout from './components/vue/switch.vue'
import LayoutComponent from './components/vue/layout.vue'

// 导入3D倾斜效果
import { init3DTiltEffect } from './components/js/feature.js'

// 导入自定义通知脚本
import { showAestheticNotice } from './components/js/notice.js'

export default {
  extends: DefaultTheme,

  Layout: () => {
<<<<<<< HEAD
    return h(MyLayout)
=======
    return h(LayoutComponent)
>>>>>>> 3e74ac1456799c7703053eaf622fc2ea36e1ee20
  },

  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component("Confetti", Confetti)
<<<<<<< HEAD
    app.component("MyLayout", MyLayout)
=======
    app.component("LayoutComponent", LayoutComponent)
>>>>>>> 3e74ac1456799c7703053eaf622fc2ea36e1ee20

    // 仅在浏览器环境下执行
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
      }
    }
  },
  
  setup() {
    onMounted(() => {
      if (inBrowser) {
        // 在页面挂载后调用通知函数
        showAestheticNotice();
        
        // 初始化3D倾斜效果
        init3DTiltEffect();
      }
    });
  }
} as Theme