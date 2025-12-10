// 3D倾斜效果函数
export function init3DTiltEffect() {
  // 清除之前的事件监听器（如果存在）
  const existingCards = document.querySelectorAll('.VPHome .VPFeature[data-tilt-initialized]');
  existingCards.forEach(card => {
    // 移除标记，以便重新初始化
    card.removeAttribute('data-tilt-initialized');
  });

  const cards = document.querySelectorAll('.VPHome .VPFeature');

  cards.forEach(card => {
    // 如果已经初始化过，跳过
    if (card.hasAttribute('data-tilt-initialized')) {
      return;
    }

    // 标记为已初始化
    card.setAttribute('data-tilt-initialized', 'true');

    const handleMouseMove = (e) => {
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
    };

    const handleMouseLeave = () => {
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
      card.style.setProperty('--bg-x', '50%');
      card.style.setProperty('--bg-y', '50%');
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
  });
}