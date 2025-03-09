<script setup lang="ts">
import confetti from "canvas-confetti";
import { onMounted } from 'vue';

/* 纸屑 */
onMounted(() => {
  confetti({
    particleCount: 100,
    spread: 170,
    origin: { y: 0.6 },
  });
});
</script>