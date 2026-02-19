/**
 * IE浏览器检测和跳转功能
 * 当检测到用户使用IE浏览器时，自动跳转到不兼容提醒页面
 */

// 检测是否为IE浏览器
function isIEBrowser() {
  const ua = window.navigator.userAgent;
  
  // 检测IE 10及以下版本
  const isIE10orLower = ua.indexOf('MSIE ') > -1;
  
  // 检测IE 11
  const isIE11 = ua.indexOf('Trident/') > -1 && ua.indexOf('rv:') > -1;
  
  return isIE10orLower || isIE11;
}

// 检测是否为Edge旧版本（基于EdgeHTML，不是基于Chromium的新Edge）
function isOldEdge() {
  const ua = window.navigator.userAgent;
  return ua.indexOf('Edge/') > -1;
}

// 获取当前页面语言
function getCurrentLanguage() {
  const path = window.location.pathname;
  
  if (path.startsWith('/en/')) {
    return 'en';
  } else if (path.startsWith('/ja/')) {
    return 'ja';
  }
  return 'zh';
}

// 跳转到IE不兼容页面
function redirectToIEIncompatiblePage() {
  // 检查是否已经在IE不兼容页面，避免无限重定向
  if (window.location.pathname.includes('ie-incompatible.html')) {
    return;
  }
  
  // 保存原始URL，以便用户可以选择继续访问
  sessionStorage.setItem('originalUrl', window.location.href);
  
  // 跳转到IE不兼容页面
  window.location.href = '/ie-incompatible.html';
}

// 初始化IE检测
function initIEDetection() {
  // 只在浏览器环境下执行
  if (typeof window === 'undefined') {
    return;
  }
  
  // 检测IE浏览器
  if (isIEBrowser()) {
    redirectToIEIncompatiblePage();
  }
}

// 页面加载完成后执行检测
// 使用VitePress的inBrowser变量确保只在浏览器环境中执行
function setupIEDetection() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initIEDetection);
    } else {
      initIEDetection();
    }
  }
}

// 导出函数供其他模块使用
export { isIEBrowser, isOldEdge, redirectToIEIncompatiblePage, setupIEDetection };