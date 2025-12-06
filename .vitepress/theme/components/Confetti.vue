<!-- .vitepress/theme/components/Confetti.vue -->
<!-- 页面加载时播放纸屑动画效果 -->

<script setup lang="ts">
import confetti from "canvas-confetti";
import { onMounted } from 'vue';

/**
 * 在组件挂载时触发纸屑动画效果
 * 使用 canvas-confetti 库创建庆祝动画
 */
onMounted(() => {
  confetti({
    particleCount: 100,  // 粒子数量
    spread: 170,         // 扩散角度
    origin: { y: 0.6 },  // 垂直起始位置
  });
});
</script>