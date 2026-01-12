/**
 * QuickPanelButton - V0.8 快捷面板按钮
 *
 * 在酒馆 #send_form 右上角注入 Engram 快捷面板开启按钮
 */

import { Logger } from '@/lib/logger';

/** 按钮注入状态 */
let isInjected = false;

/** 全局回调：打开快捷面板 */
let onOpenQuickPanel: (() => void) | null = null;

/**
 * 设置打开面板的回调
 */
export function setQuickPanelCallback(callback: () => void) {
    onOpenQuickPanel = callback;
}

/**
 * 注入 QR 栏按钮
 * 固定在 #send_form 右上角
 */
export function injectQuickPanelButton(): boolean {
    if (isInjected) {
        Logger.debug('QuickPanelButton', '按钮已存在，跳过注入');
        return true;
    }

    const sendForm = document.querySelector('#send_form') as HTMLElement;
    if (!sendForm) {
        Logger.warn('QuickPanelButton', '#send_form 未找到，延迟重试');
        return false;
    }

    // 确保 send_form 有定位上下文
    const computedStyle = window.getComputedStyle(sendForm);
    if (computedStyle.position === 'static') {
        sendForm.style.position = 'relative';
    }

    // 创建 Engram 快捷按钮 - 固定在左上角
    const button = document.createElement('div');
    button.id = 'engram-quick-panel-trigger';
    button.className = 'fa-solid fa-brain';
    button.title = 'Engram 快捷面板';
    button.style.cssText = `
        position: absolute;
        top: 0.5em;
        left: 0.5em;
        width: 1.5em;
        height: 1.5em;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9em;
        cursor: pointer;
        color: var(--SmartThemeBodyColor, #ccc);
        opacity: 0.6;
        transition: all 0.2s ease;
        z-index: 1000;
    `;

    // 增加左侧内边距，防止按钮遮挡输入框内容
    const currentPaddingLeft = window.getComputedStyle(sendForm).paddingLeft;
    const newPaddingLeft = parseFloat(currentPaddingLeft) < 30 ? '30px' : currentPaddingLeft;
    sendForm.style.paddingLeft = newPaddingLeft;

    // 悬停效果
    button.addEventListener('mouseenter', () => {
        button.style.opacity = '1';
        button.style.color = 'var(--SmartThemeEmColor, #fff)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.opacity = '0.7';
        button.style.color = 'var(--SmartThemeBodyColor, #ccc)';
    });

    // 点击打开快捷面板
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        Logger.debug('QuickPanelButton', '点击打开快捷面板');
        if (onOpenQuickPanel) {
            onOpenQuickPanel();
        } else {
            Logger.warn('QuickPanelButton', '未设置面板回调');
        }
    });

    // 插入到 send_form
    sendForm.appendChild(button);

    isInjected = true;
    Logger.info('QuickPanelButton', '按钮注入成功 (右上角固定)');
    return true;
}

/**
 * 移除按钮
 */
export function removeQuickPanelButton(): void {
    const button = document.querySelector('#engram-quick-panel-trigger');
    if (button) {
        button.remove();
        isInjected = false;
        Logger.debug('QuickPanelButton', '按钮已移除');
    }
}

/**
 * 初始化：等待 DOM 就绪后注入
 */
export function initQuickPanelButton(): void {
    // 尝试立即注入
    if (injectQuickPanelButton()) {
        return;
    }

    // 如果失败，使用 MutationObserver 监听 DOM 变化
    const observer = new MutationObserver((mutations, obs) => {
        if (injectQuickPanelButton()) {
            obs.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    // 超时保护
    setTimeout(() => {
        observer.disconnect();
        if (!isInjected) {
            Logger.warn('QuickPanelButton', '注入超时，可能 #send_form 不存在');
        }
    }, 10000);
}
