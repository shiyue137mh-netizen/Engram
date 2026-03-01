/**
 * QuickPanelButton - V1.0 快捷面板按钮
 *
 * 在酒馆 #leftSendForm 中，#extensionsMenuButton 左边注入 Engram 快捷面板按钮
 */

import { DOM_IDS, ENGRAM_DRAWER_ID, ENGRAM_GLOBAL_OVERLAY_ID, ENGRAM_PANEL_ID } from '@/constants';
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
    const leftSendForm = document.querySelector(DOM_IDS.LEFT_SEND_FORM) as HTMLElement;
    if (!leftSendForm) {
        Logger.debug(MODULE, `${DOM_IDS.LEFT_SEND_FORM} 未找到，延迟重试`);
        return false;
    }

    // 创建 Engram 快捷面板按钮 - 使用 Font Awesome 图标
    const button = document.createElement('div');
    button.id = DOM_IDS.QUICK_PANEL_TRIGGER;
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
    const button = document.querySelector(`#${DOM_IDS.QUICK_PANEL_TRIGGER}`);
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

// ==================== 以下为从 bridge.ts 拆分过来的 UI 管理部分 ====================

// React 渲染器类型
export type ReactRenderer = (container: HTMLElement, onClose: () => void) => any;
let reactRenderer: ReactRenderer | null = null;
let globalRenderer: ReactRenderer | null = null;
let globalRoot: any = null;
let panelVisible = false;
let panelElement: HTMLElement | null = null;
let reactRoot: any = null;

/**
 * 设置 React 渲染器（从 index.tsx 注入）
 */
export function setReactRenderer(renderer: ReactRenderer): void {
    reactRenderer = renderer;
}

/**
 * 设置全局渲染器（用于悬浮窗等）
 */
export function setGlobalRenderer(renderer: ReactRenderer): void {
    globalRenderer = renderer;
}

/**
 * 挂载全局悬浮层
 */
export function mountGlobalOverlay(): void {
    if (!globalRenderer) {
        return;
    }

    const overlayId = ENGRAM_GLOBAL_OVERLAY_ID;
    let overlay = document.getElementById(overlayId);

    // 如果已存在但未挂载，则复用
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = overlayId;
        overlay.className = 'pointer-events-none fixed inset-0 z-[11000] engram-app-root'; // 极高层级，不妨碍交互
        document.body.appendChild(overlay);
    }

    // 挂载
    if (!globalRoot) {
        globalRoot = globalRenderer(overlay, () => { }); // global overlay usually doesn't need onClose
    }
}

/**
 * 创建顶栏按钮入口（模仿 ST 的 drawer 结构）
 */
export function createTopBarButton(): void {
    const holder = document.querySelector(DOM_IDS.TOP_SETTINGS_HOLDER);
    const wiButton = document.querySelector(DOM_IDS.WI_SP_BUTTON);

    if (!holder) {
        return;
    }

    const drawer = document.createElement('div');
    drawer.id = ENGRAM_DRAWER_ID;
    drawer.className = 'drawer';

    const toggle = document.createElement('div');
    toggle.className = 'drawer-toggle drawer-header';

    const icon = document.createElement('div');
    icon.id = 'engram-drawer-icon';
    icon.className = 'drawer-icon fa-solid fa-e fa-fw closedIcon';
    icon.title = 'Engram - 记忆操作系统';
    icon.setAttribute('data-i18n', '[title]Engram - Memory OS');
    icon.addEventListener('click', toggleMainPanel);

    toggle.appendChild(icon);
    drawer.appendChild(toggle);

    if (wiButton) {
        holder.insertBefore(drawer, wiButton);
    } else {
        holder.appendChild(drawer);
    }
}

/**
 * 切换主面板显示
 */
export function toggleMainPanel(): void {
    if (panelVisible && panelElement) {
        if (reactRoot) {
            reactRoot.unmount();
            reactRoot = null;
        }
        panelElement.remove();
        panelElement = null;
        panelVisible = false;
    } else {
        panelElement = createMainPanel();
        document.body.appendChild(panelElement);
        panelVisible = true;
    }
}

/**
 * 创建主面板（使用注入的 React 渲染器）
 */
function createMainPanel(): HTMLElement {
    const panel = document.createElement('div');
    panel.className = 'fixed inset-0 w-full h-full z-[10000] flex flex-col bg-background text-foreground overflow-hidden engram-app-root';
    panel.style.backgroundColor = 'var(--background)';
    panel.style.color = 'var(--foreground)';
    panel.style.height = '100dvh';
    panel.style.width = '100vw';
    panel.style.top = '0';
    panel.style.left = '0';
    panel.id = ENGRAM_PANEL_ID;

    const header = document.createElement('div');
    header.id = `${ENGRAM_PANEL_ID}-header`;
    header.className = 'engram-panel-header';

    const title = document.createElement('h3');
    title.textContent = 'Engram 记忆管理';

    const closeBtn = document.createElement('button');
    closeBtn.title = '关闭 (Ctrl+Shift+E)';
    const closeIcon = document.createElement('i');
    closeIcon.className = 'fa-solid fa-times';
    closeBtn.appendChild(closeIcon);
    closeBtn.addEventListener('click', toggleMainPanel);

    header.appendChild(title);
    header.appendChild(closeBtn);

    const content = document.createElement('div');
    content.id = `${ENGRAM_PANEL_ID}-content`;
    content.className = 'flex-1 overflow-auto p-5';

    panel.appendChild(header);
    panel.appendChild(content);

    if (reactRenderer) {
        reactRoot = reactRenderer(panel, toggleMainPanel);
    } else {
        panel.innerHTML = `
            <div class="flex items-center justify-between p-4 border-b border-slate-400/20">
                <h2 class="m-0 text-lg text-slate-200 flex items-center gap-2">Engram</h2>
                <button class="bg-transparent border-none text-slate-400 text-2xl cursor-pointer p-1 hover:text-slate-200">&times;</button>
            </div>
            <div class="flex-1 overflow-auto p-5">
                <p style="color: #94a3b8;">React 渲染器未加载，请检查配置。</p>
            </div>
        `;
        panel.querySelector('button')?.addEventListener('click', toggleMainPanel);
    }

    return panel;
}

/**
 * 调用 SillyTavern 原生弹窗
 * @param content 弹窗内容 (HTML)
 * @param type 弹窗类型 ('text', 'confirm', 'input')
 * @param inputValue 输入框默认值
 */
export async function callPopup(content: string, type: 'text' | 'confirm' | 'input' = 'text', inputValue: string = ''): Promise<any> {
    // @ts-ignore
    if (window.callPopup) {
        // @ts-ignore
        return window.callPopup(content, type, inputValue);
    }
    console.warn('[Engram] callPopup not available');
    return Promise.resolve(type === 'confirm' ? true : null);
}
