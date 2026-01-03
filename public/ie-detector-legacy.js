/**
 * IE浏览器检测和跳转功能 - IE兼容版本
 * 当检测到用户使用IE浏览器时，自动跳转到不兼容提醒页面
 */

// 检测是否为IE浏览器
function isIEBrowser() {
  var ua = window.navigator.userAgent;
  
  // 检测IE 10及以下版本
  var isIE10orLower = ua.indexOf('MSIE ') > -1;
  
  // 检测IE 11
  var isIE11 = ua.indexOf('Trident/') > -1 && ua.indexOf('rv:') > -1;
  
  return isIE10orLower || isIE11;
}

// 检测是否为Edge旧版本（基于EdgeHTML，不是基于Chromium的新Edge）
function isOldEdge() {
  var ua = window.navigator.userAgent;
  return ua.indexOf('Edge/') > -1;
}

// 跳转到IE不兼容页面
function redirectToIEIncompatiblePage() {
  // 检查是否已经在IE不兼容页面，避免无限重定向
  if (window.location.pathname.indexOf('ie-incompatible.html') > -1) {
    return;
  }
  
  // 保存原始URL，以便用户可以选择继续访问
  try {
    sessionStorage.setItem('originalUrl', window.location.href);
  } catch (e) {
    // 如果sessionStorage不可用，跳过保存
  }
  
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
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initIEDetection);
} else {
  initIEDetection();
}