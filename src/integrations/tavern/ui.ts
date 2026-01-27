/**
 * QuickPanelButton - V1.0 快捷面板按钮
 *
 * 在酒馆 #leftSendForm 中，#extensionsMenuButton 左边注入 Engram 快捷面板按钮
 */

import { Logger } from '@/core/logger';

const MODULE = 'QuickPanelButton';

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
 * 注入快捷面板按钮
 * 直接 append 到 #leftSendForm（会出现在 extensionsMenuButton 之后）
 */
function injectQuickPanelButton(): boolean {
    if (isInjected) {
        Logger.debug(MODULE, '按钮已存在，跳过注入');
        return true;
    }

    // 找到 leftSendForm 容器
    const leftSendForm = document.querySelector('#leftSendForm') as HTMLElement;
    if (!leftSendForm) {
        Logger.debug(MODULE, '#leftSendForm 未找到，延迟重试');
        return false;
    }

    // 创建 Engram 快捷面板按钮 - 使用 Font Awesome 图标
    const button = document.createElement('div');
    button.id = 'engram-quick-panel-trigger';
    button.className = 'fa-solid fa-layer-group interactable';
    button.tabIndex = 0;
    button.title = 'Engram 快捷面板';
    button.setAttribute('data-i18n', '[title]Engram Quick Panel');

    // 点击打开快捷面板
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        Logger.debug(MODULE, '点击打开快捷面板');
        if (onOpenQuickPanel) {
            onOpenQuickPanel();
        } else {
            Logger.warn(MODULE, '未设置面板回调');
        }
    });

    // 修正样式：
    // 1. 设置 order > 4 (magic wand 是 4)，确保显示在最右侧
    // 2. 显式设置 display: flex 以防 CSS 没正确应用
    button.style.cssText = `
        order: 10;
        display: flex;
        width: var(--bottomFormBlockSize);
        height: var(--bottomFormBlockSize);
        align-items: center;
        justify-content: center;
    `;

    // 直接 append 到 leftSendForm
    leftSendForm.appendChild(button);

    isInjected = true;

    Logger.info(MODULE, '按钮注入成功 (#leftSendForm)');
    return true;
}

/**
 * 移除按钮
 */
function removeQuickPanelButton(): void {
    const button = document.querySelector('#engram-quick-panel-trigger');
    if (button) {
        button.remove();
        isInjected = false;
        Logger.debug(MODULE, '按钮已移除');
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

    // 重试计数
    let retryCount = 0;
    const maxRetries = 20;
    const retryInterval = 500;

    const retryInjection = () => {
        retryCount++;
        if (injectQuickPanelButton()) {
            return;
        }
        if (retryCount < maxRetries) {
            setTimeout(retryInjection, retryInterval);
        } else {
            Logger.warn(MODULE, '注入超时，已达到最大重试次数');
        }
    };

    // 使用 MutationObserver 监听 DOM 变化
    const observer = new MutationObserver((mutations, obs) => {
        if (injectQuickPanelButton()) {
            obs.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    // 同时启动定时重试
    setTimeout(retryInjection, retryInterval);

    // 超时保护
    setTimeout(() => {
        observer.disconnect();
    }, 15000);
}
