// 网站美学更新提示脚本

export function showAestheticNotice() {
  // 配置项
  const NOTICE_KEY = 'hasSeenAestheticNotice_2024_v1'
  const EXPIRY_DATE_STRING = '2025-12-20'
  const ISSUE_URL = 'https://github.com/KroMiose/nekro-agent-doc/issues/new?template=issue_template.yml'

  try {
    // 检查用户是否已经看过提示
    if (localStorage.getItem(NOTICE_KEY) === 'true') {
      return
    }

    // 检查是否过期
    const currentDate = new Date()
    const expiryDate = new Date(EXPIRY_DATE_STRING)
    if (currentDate >= expiryDate) {
      return
    }

    createNoticeElement()

  } catch (error) {
    console.error("无法显示美学更新提示:", error)
  }

  function createNoticeElement() {
    const noticeWrapper = document.createElement('div')
    noticeWrapper.id = 'aesthetic-notice'
    noticeWrapper.innerHTML = `
      <div class="notice-content">
        <h4>✨ 焕然一新！</h4>
        <p>文档站的美学设计已全面更新，希望能为您带来更好的阅读体验。</p>
        <p>如果在浏览时遇到任何显示问题或任何无障碍问题，请<a href="${ISSUE_URL}" target="_blank" rel="noopener noreferrer">提交 Issue</a> 帮助我们改进，非常感谢！</p>
        <button class="close-button" aria-label="关闭提示">&times;</button>
      </div>
    `
    
    const closeButton = noticeWrapper.querySelector('.close-button')
    closeButton.onclick = () => {
      noticeWrapper.classList.add('hiding')
      
      setTimeout(() => {
        document.body.removeChild(noticeWrapper)
        localStorage.setItem(NOTICE_KEY, 'true')
      }, 300)
    }

    // 创建并注入样式
    const styles = `
      #aesthetic-notice {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        animation: notice-fade-in 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      #aesthetic-notice.hiding {
        opacity: 0;
        transform: scale(0.95);
      }
      .notice-content {
        background: rgba(28, 28, 30, 0.8);
        color: #fff;
        padding: 20px 24px;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px) saturate(180%);
        -webkit-backdrop-filter: blur(10px) saturate(180%);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        max-width: 360px;
        position: relative;
      }
      /* 浅色模式下的样式 */
      html:not(.dark) .notice-content {
        background: rgba(255, 255, 255, 0.8);
        color: #111827;
        border: 1px solid rgba(0, 0, 0, 0.05);
      }
      .notice-content h4 {
        margin: 0 0 10px 0;
        font-size: 1.1rem;
        font-weight: 600;
      }
      .notice-content p {
        margin: 0 0 8px 0;
        font-size: 0.9rem;
        line-height: 1.6;
        opacity: 0.9;
      }
      .notice-content a {
        color: #E56464;
        text-decoration: none;
        font-weight: 500;
        border-bottom: 1px solid transparent;
        transition: border-bottom 0.2s;
      }
      .notice-content a:hover {
        border-bottom-color: #E56464;
      }
      .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        border: none;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        line-height: 30px;
        text-align: center;
        transition: background-color 0.2s;
      }
      html:not(.dark) .close-button {
        background: rgba(0, 0, 0, 0.05);
        color: #333;
      }
      .close-button:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      html:not(.dark) .close-button:hover {
        background: rgba(0, 0, 0, 0.1);
      }

      /* 动画 */
      @keyframes notice-fade-in {
        from {
          opacity: 0;
          transform: translateY(20px) scale(0.98);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      /* 响应式：小屏幕上占满宽度 */
      @media (max-width: 768px) {
        #aesthetic-notice {
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
        }
        .notice-content {
            border-radius: 16px 16px 0 0;
            max-width: 100%;
        }
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 将提示框添加到页面
    document.body.appendChild(noticeWrapper);
  }
}