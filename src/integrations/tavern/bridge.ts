/**
 * STBridge - SillyTavern API 桥接层
 *
 * 这是唯一与 SillyTavern 直接交互的模块
 * 所有 window.SillyTavern、jQuery、eventSource 的调用都在这里
 */

import { EventBus, EngramEvent } from '@/core/events/types';
// 使用统一的 STContext 模块
import { getSTContext, getCurrentChat, getCurrentCharacter } from "@/integrations/tavern/context";
export { getSTContext, getCurrentChat, getCurrentCharacter } from "@/integrations/tavern/context";
export type { STContext, STMessage, STCharacter } from "@/integrations/tavern/context";

/**
 * 初始化 Engram 插件
 */
export async function initializeEngram(): Promise<void> {
    // 初始化日志系统
    const { Logger } = await import('@/core/logger');
    await Logger.init();

    Logger.info('STBridge', 'Engram 插件正在初始化...');

    // 初始化设置管理器
    const { SettingsManager } = await import('@/config/settings');
    SettingsManager.initSettings();
    Logger.info('STBridge', 'SettingsManager initialized');

    // 加载保存的正则规则到全局处理器
    const savedRegexRules = SettingsManager.getRegexRules();
    if (savedRegexRules && savedRegexRules.length > 0) {
        const { regexProcessor } = await import('@/modules/workflow/steps');
        regexProcessor.setRules(savedRegexRules);
        Logger.info('STBridge', `Loaded ${savedRegexRules.length} regex rules`);
    }

    // 检查酒馆接口对接状态
    try {
        const { checkTavernIntegration } = await import('@/integrations/tavern/api');
        const tavernStatus = await checkTavernIntegration();
        Logger.info('TavernAPI', '酒馆接口对接状态', tavernStatus);
    } catch (e) {
        Logger.warn('TavernAPI', '酒馆接口检查失败', { error: String(e) });
    }

    // 启动 Summarizer 服务
    try {
        const { summarizerService } = await import('@/modules/memory/Summarizer');
        summarizerService.start();
        const status = summarizerService.getStatus();
        Logger.info('Summarizer', '服务已启动', status);
    } catch (e) {
        Logger.warn('Summarizer', '服务启动失败', { error: String(e) });
    }

    // 优先使用顶栏按钮，找不到则使用悬浮球
    createTopBarButton();

    // 监听 ST 事件
    setupEventListeners();

    // 初始化主题系统 (注入 CSS 并应用变量)
    const { ThemeManager } = await import('@/ui/services/ThemeManager');
    ThemeManager.init();

    // 运行诊断
    // import('../diagnose').then(({ runDiagnostics }) => runDiagnostics());

    // Initialize Injector Service (V0.4 - Dynamic Context)
    try {
        const { injector } = await import('@/modules/rag/injection/Injector');
        injector.init();
        Logger.info('Injector', 'Service initialized');
    } catch (e) {
        Logger.warn('Injector', 'Failed to initialize Injector', { error: String(e) });
    }

    // Initialize MacroService (Global ST Macros)
    try {
        const { MacroService } = await import('@/integrations/tavern/macros');
        await MacroService.init();
    } catch (e) {
        Logger.warn('MacroService', 'Failed to initialize MacroService', { error: String(e) });
    }

    // V0.8: Initialize QR 栏快捷按钮
    try {
        const { initQuickPanelButton } = await import('@/integrations/tavern/ui');
        initQuickPanelButton();
        Logger.info('QuickPanelButton', 'QR 栏按钮初始化完成');
    } catch (e) {
        Logger.warn('QuickPanelButton', 'Failed to initialize QuickPanelButton', { error: String(e) });
    }

    // 挂载全局悬浮层 (用于修订弹窗等)
    mountGlobalOverlay();

    // 初始化角色删除联动服务
    try {
        const { CharacterDeleteService } = await import('@/data/cleanup/CharacterCleanup');
        CharacterDeleteService.init();
        Logger.info('STBridge', 'CharacterDeleteService initialized');
    } catch (e) {
        Logger.warn('STBridge', 'Failed to initialize CharacterDeleteService', { error: String(e) });
    }

    // V0.9.5: 初始化键盘快捷键
    try {
        const { setupKeyboardShortcuts } = await import('@/core/KeyboardManager');
        const { toggleQuickPanel, openCommandPalette } = await import('@/index');
        setupKeyboardShortcuts({
            toggleMainPanel: toggleMainPanel,
            toggleQuickPanel: toggleQuickPanel,
            openCommandPalette: openCommandPalette,
        });
        Logger.info('STBridge', 'Keyboard shortcuts initialized');
    } catch (e) {
        Logger.warn('STBridge', 'Failed to initialize keyboard shortcuts', { error: String(e) });
    }

    Logger.success('STBridge', 'Engram 初始化完成 - Where memories leave their trace.');
}

/**
 * 创建顶栏按钮入口（模仿 ST 的 drawer 结构）
 */
function createTopBarButton(): void {
    const holder = document.querySelector('#top-settings-holder');
    const wiButton = document.querySelector('#WI-SP-button');

    if (!holder) {
        console.warn('[Engram] #top-settings-holder not found');
        return;
    }

    // 创建 drawer 容器（模仿 ST 结构）
    const drawer = document.createElement('div');
    drawer.id = 'engram-drawer';
    drawer.className = 'drawer';

    // drawer-toggle 包装器
    const toggle = document.createElement('div');
    toggle.className = 'drawer-toggle drawer-header';

    // drawer-icon 图标 - 使用 Font Awesome "E" 图标
    const icon = document.createElement('div');
    icon.id = 'engram-drawer-icon';
    icon.className = 'drawer-icon fa-solid fa-e fa-fw closedIcon';
    icon.title = 'Engram - 记忆操作系统';
    icon.setAttribute('data-i18n', '[title]Engram - Memory OS');
    icon.addEventListener('click', toggleMainPanel);

    // 组装结构
    toggle.appendChild(icon);
    drawer.appendChild(toggle);

    // 插入到 WI-SP-button 之前，如果找不到则添加到末尾
    if (wiButton) {
        holder.insertBefore(drawer, wiButton);
        console.log('[Engram] Top bar button injected before WI-SP-button');
    } else {
        holder.appendChild(drawer);
        console.log('[Engram] Top bar button injected at end (WI-SP-button not found)');
    }
}


// React 渲染器类型
type ReactRenderer = (container: HTMLElement, onClose: () => void) => any;
let reactRenderer: ReactRenderer | null = null;

/**
 * 设置 React 渲染器（从 index.tsx 注入）
 */
export function setReactRenderer(renderer: ReactRenderer): void {
    reactRenderer = renderer;
    reactRenderer = renderer;
}

let globalRenderer: ReactRenderer | null = null;
let globalRoot: any = null;

/**
 * 设置全局渲染器（用于悬浮窗等）
 */
export function setGlobalRenderer(renderer: ReactRenderer): void {
    globalRenderer = renderer;
}

/**
 * 挂载全局悬浮层
 */
function mountGlobalOverlay(): void {
    if (!globalRenderer) {
        console.warn('[Engram] Global renderer not ready');
        return;
    }

    const overlayId = 'engram-global-overlay';
    let overlay = document.getElementById(overlayId);

    // 如果已存在但未挂载，则复用
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = overlayId;
        overlay.className = 'pointer-events-none fixed inset-0 z-[11000]'; // 极高层级，不妨碍交互
        document.body.appendChild(overlay);
    }

    // 挂载
    if (!globalRoot) {
        globalRoot = globalRenderer(overlay, () => { }); // global overlay usually doesn't need onClose
        console.log('[Engram] Global overlay mounted');
    }
}

/**
 * 切换主面板显示
 */
let panelVisible = false;
let panelElement: HTMLElement | null = null;
let reactRoot: any = null;

function toggleMainPanel(): void {
    if (panelVisible && panelElement) {
        // 卸载 React 组件
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
    // 使用 Tailwind 类 - 全屏模式
    // z-[10000] 确保在最顶层，bg-background 确保有背景色
    panel.className = 'fixed inset-0 w-full h-full z-[10000] flex flex-col bg-background text-foreground overflow-hidden';
    // 强制内联样式，确保颜色生效 (解决 Tailwind 类在某些环境下失效的问题)
    panel.style.backgroundColor = 'var(--background)';
    panel.style.color = 'var(--foreground)';
    // 强制视口高度，解决移动端 Flex 布局塌陷
    panel.style.height = '100dvh';
    panel.style.width = '100vw';
    panel.style.top = '0';
    panel.style.left = '0';

    panel.id = 'engram-panel-root';

    // 使用注入的渲染器
    if (reactRenderer) {
        reactRoot = reactRenderer(panel, toggleMainPanel);
    } else {
        // 降级到简单 HTML（渲染器未注入时）
        panel.innerHTML = `
            <div class="flex items-center justify-between p-4 border-b border-slate-400/20">
                <h2 class="m-0 text-lg text-slate-200 flex items-center gap-2">Engram</h2>
                <button class="bg-transparent border-none text-slate-400 text-2xl cursor-pointer p-1 hover:text-slate-200">&times;</button>
            </div>
            <div class="flex-1 overflow-auto p-5">
                <p style="color: #94a3b8;">React 渲染器未加载，请检查配置。</p>
            </div>
        `;
        // 注意：这里需要根据新的 class 选择器绑定事件
        panel.querySelector('button')?.addEventListener('click', toggleMainPanel);
    }

    return panel;
}

/**
 * 设置事件监听
 */
function setupEventListeners(): void {
    // 监听聊天变化事件（根据 ST 的实际事件名调整）
    // eventSource?.addEventListener('chatChanged', () => {
    //     EventBus.emit({ type: 'CHAT_CHANGED', payload: {} });
    // });
}

/**
 * 隐藏指定范围的消息
 * @param start 起始楼层
 * @param end 结束楼层
 */
export async function hideMessageRange(start: number, end: number): Promise<void> {
    try {
        const importPath = '/scripts/chats.js';
        const chatsModule = await (new Function('path', 'return import(path)'))(importPath);

        if (chatsModule && typeof chatsModule.hideChatMessageRange === 'function') {
            // start - 1 / end - 1 ?
            // 注意：酒馆的 messageId 通常是 0-indexed (array index)，但楼层显示通常是 1-indexed
            // 我们需要确认一下 Engram 使用的 'floor' 是什么。
            // 假设 Engram 这里的 floor 是 0-indexed 的 message index (matches context.chat length)
            // 根据之前的 SummarizerService, sourceFloors 似乎就是 message index。
            await chatsModule.hideChatMessageRange(start, end, false); // unhide=false -> hide
            console.log(`[Engram] Hidden messages range: ${start}-${end}`);
        } else {
            console.warn('[Engram] hideChatMessageRange not found in chats.js');
        }
    } catch (e) {
        console.error('[Engram] Failed to hide messages:', e);
    }
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
