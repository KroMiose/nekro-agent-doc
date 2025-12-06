// 3D倾斜效果函数
export function init3DTiltEffect() {
  const cards = document.querySelectorAll('.VPHome .VPFeature');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 计算中心点
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // 计算旋转角度
      const rotateX = ((y - centerY) / centerY) * -10;
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

// 确保 DOM 加载后运行
if (typeof window !== 'undefined' && typeof init3DTiltEffect !== 'undefined') {
    setTimeout(init3DTiltEffect, 500);
}