import { useEffect } from 'react';

/**
 * 优化的字体加载 - 使用 preload 替代阻塞的 @import
 */
const injectFontLinks = () => {
  // 检查是否已注入
  if (document.getElementById('engram-font-preload')) return;

  const fonts = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap',
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap',
  ];

  fonts.forEach((href, index) => {
    // 创建 preload link
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'style';
    preload.href = href;
    if (index === 0) preload.id = 'engram-font-preload';
    document.head.appendChild(preload);

    // 创建实际的 stylesheet link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  });
};

export const GlobalStyles = () => {
  useEffect(() => {
    // 注入字体
    injectFontLinks();

    // Phase 3 Fix: 清理函数，防止重复挂载或热重载时无限累积
    return () => {
      const preload = document.getElementById('engram-font-preload');
      if (preload) preload.remove();
      // 这里不对 href 为 https://fonts.googleapis.com 的 link 做直接移除，
      // 因为它们一般只加载一次全局复用，频繁增删反倒影响宿主的字体解析，
      // 此处主要为了防止同 ID 重复冗余。
    };
  }, []);

  return (
    <style>{`
    :root {
      --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    body {
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .font-mono {
      font-family: var(--font-mono);
    }

    /* Custom Scrollbar for dark theme - Minimalist */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(63, 63, 70, 0.4); /* zinc-700 with opacity */
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(82, 82, 91, 0.6); /* zinc-600 with opacity */
    }

    /* Animation Utilities */
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
    .fade-in {
      opacity: 0;
      animation: fadeIn 0.3s ease-out forwards;
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Utility to hide scrollbar but keep functionality */
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `}</style>
  );
};

