---

# https://vitepress.dev/reference/default-theme-home-page
layout: home
hero:
  name: "Nekro Agent"
  text: "新一代智能中枢框架"
  tagline: 安全、高效、优雅的智能交互体验
  actions:
    - theme: brand
      text: 📖快速了解
      link: /docs/01_intro/overview
    - theme: alt
      text: 🚀开始使用
      link: /docs/02_quick_start/quickstart
    - theme: alt
      text: 🧩插件开发
      link: /docs/04_plugin_dev/00_introduction
    - theme: alt
      text: 📦开源仓库
      link: https://github.com/KroMiose/nekro-agent
      icon: github
  image:
    src: "nekro_agent_logo.webp"
    alt: NekroNekro 图标
features:
  - title: 多人交互
    details: 原生的多人群聊交互支持，精确理解复杂群聊场景需求
    icon: 💬
  - title: 插件架构
    details: 插件化架构设计，高灵活自定义插件接入 无论是绘图、搜索、各种外部 API ... 轻松扩展
    icon: 🧩
  - title: 沙盒系统
    details: 基于 Docker 的沙盒代码执行环境，实现强大且安全的环境交互能力
    icon: 📦
  - title: 开箱即用
    details: 提供一键部署脚本、WebUI 面板、智能插件编辑器... 快速搭建和扩展高性能 AI 机器人
    icon: 🚀
---

<script setup>
import { onMounted, onUnmounted } from 'vue'

const lockScroll = () => {
  // 960px 以上 (PC端) 且在首页时
  if (window.innerWidth >= 960) {
    // 暴力锁定：同时设置 html 和 body，限制高度为 100vh，隐藏溢出
    const style = 'overflow: hidden !important; height: 100vh !important;'
    document.documentElement.style.cssText = style
    document.body.style.cssText = style
  } else {
    // 移动端或窗口变小时恢复
    unlockScroll()
  }
}

const unlockScroll = () => {
  // 清除强制锁定的内联样式
  document.documentElement.style.cssText = ''
  document.body.style.cssText = ''
}

onMounted(() => {
  lockScroll()
  window.addEventListener('resize', lockScroll)
})

onUnmounted(() => {
  unlockScroll()
  window.removeEventListener('resize', lockScroll)
})
</script>
<Confetti />
