// 3D倾斜效果函数
export function init3DTiltEffect() {
  const cards = document.querySelectorAll('.VPHome .VPFeature');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // 鼠标在卡片内的 X 坐标
      const y = e.clientY - rect.top;  // 鼠标在卡片内的 Y 坐标

      // 计算中心点
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // 计算旋转角度 (除以 10 或 20 控制灵敏度，数值越大旋转越小)
      // rotateY 对应 X 轴的移动 (鼠标左右移，卡片左右翻)
      // rotateX 对应 Y 轴的移动 (鼠标上下移，卡片上下翻，通常取反)
      const rotateX = ((y - centerY) / centerY) * -10; // 最大倾斜 -10deg 到 10deg
      const rotateY = ((x - centerX) / centerX) * 10;

      // 设置 CSS 变量
      card.style.setProperty('--rotate-x', `${rotateX}deg`);
      card.style.setProperty('--rotate-y', `${rotateY}deg`);
      
      // 设置光泽位置变量
      card.style.setProperty('--bg-x', `${x}px`);
      card.style.setProperty('--bg-y', `${y}px`);
    });

    // 鼠标离开时复位
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
      card.style.setProperty('--bg-x', '50%');
      card.style.setProperty('--bg-y', '50%');
    });
  });
}

// 确保 DOM 加载后运行（为了兼容性保留）
if (typeof window !== 'undefined' && typeof init3DTiltEffect !== 'undefined') {
    // 简单的防抖或等待 DOM 渲染
    setTimeout(init3DTiltEffect, 500);
}