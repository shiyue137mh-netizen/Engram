/**
 * STBridge - SillyTavern API 桥接层
 * 
 * 这是唯一与 SillyTavern 直接交互的模块
 * 所有 window.SillyTavern、jQuery、eventSource 的调用都在这里
 */

import { EventBus, EngramEvent } from './EventBus';
// 使用统一的 STContext 模块
import { getSTContext, getCurrentChat, getCurrentCharacter } from './STContext';
export { getSTContext, getCurrentChat, getCurrentCharacter } from './STContext';
export type { STContext, STMessage, STCharacter } from './STContext';

/**
 * 初始化 Engram 插件
 */
export async function initializeEngram(): Promise<void> {
    // 初始化日志系统
    const { Logger } = await import('./logger');
    await Logger.init();

    Logger.info('STBridge', 'Engram 插件正在初始化...');

    // 初始化设置管理器
    const { SettingsManager } = await import('./SettingsManager');
    SettingsManager.initSettings();
    Logger.info('STBridge', 'SettingsManager initialized');

    // 检查酒馆接口对接状态
    try {
        const { checkTavernIntegration } = await import('./tavern');
        const tavernStatus = await checkTavernIntegration();
        Logger.info('TavernAPI', '酒馆接口对接状态', tavernStatus);
    } catch (e) {
        Logger.warn('TavernAPI', '酒馆接口检查失败', { error: String(e) });
    }

    // 启动 Summarizer 服务
    try {
        const { summarizerService } = await import('../core/summarizer');
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
    const { ThemeManager } = await import('./ThemeManager');
    ThemeManager.init();

    // 运行诊断
    // import('../diagnose').then(({ runDiagnostics }) => runDiagnostics());

    // 挂载全局悬浮层 (用于修订弹窗等)
    mountGlobalOverlay();

    // 初始化角色删除联动服务
    try {
        const { CharacterDeleteService } = await import('../core/services/CharacterDeleteService');
        CharacterDeleteService.init();
        Logger.info('STBridge', 'CharacterDeleteService initialized');
    } catch (e) {
        Logger.warn('STBridge', 'Failed to initialize CharacterDeleteService', { error: String(e) });
    }

    Logger.success('STBridge', 'Engram 初始化完成 - Where memories leave their trace.');
}

// 内联 SVG logo（避免路径问题）
const ENGRAM_ICON_SVG = `<svg viewBox="0 0 400 592" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M103.875908,522.166260 C75.225380,521.276611 55.289425,503.229828 52.249313,475.852142 C49.879883,454.514191 63.027035,433.000366 83.930901,424.858398 C88.449257,423.098541 89.857674,420.860199 89.801926,416.150269 C89.555420,395.322357 89.621246,374.489380 89.762306,353.659515 C89.787170,349.987000 88.728760,348.057556 85.120293,346.642609 C64.672897,338.625031 52.338894,320.951630 52.085896,299.869415 C51.832878,278.785156 63.730618,260.903198 84.118019,252.449951 C88.288918,250.720566 89.867378,248.680847 89.807304,244.052597 C89.539139,223.391968 89.589142,202.724701 89.796356,182.062561 C89.836380,178.071609 88.518524,176.326385 84.841705,174.787247 C57.730556,163.438416 45.530682,135.966721 55.436111,109.194000 C62.627293,89.757439 81.922821,76.710289 103.282494,76.841476 C124.355003,76.970901 143.082275,89.740875 149.993118,109.121849 C151.315979,112.831749 153.184799,113.869263 156.863403,113.853104 C186.192612,113.724319 215.522736,113.698357 244.851929,113.811600 C248.773117,113.826736 250.677307,112.652130 252.052902,108.765602 C259.013885,89.098465 278.589447,76.365829 300.503601,76.811897 C322.171844,77.252960 341.040283,91.132324 347.255371,111.201912 C356.569763,141.279358 340.344788,170.373184 309.893127,176.623123 C283.359375,182.068970 260.376740,167.450562 251.980011,145.670181 C250.492157,141.810806 248.818085,140.240295 244.552948,140.266785 C215.390915,140.447968 186.227219,140.357330 157.064072,140.375076 C154.628784,140.376556 151.855545,139.805771 151.141357,143.359161 C150.400787,147.043839 146.628937,150.064713 151.136917,154.478546 C184.592346,187.235229 217.778336,220.267349 250.982285,253.280014 C253.021469,255.307434 254.527191,255.254166 257.033264,254.047714 C276.199188,244.820953 294.752930,247.045853 310.978485,259.993408 C328.011017,273.584869 333.936798,292.106659 327.764038,313.282837 C321.779785,333.812378 307.254517,345.637268 286.367889,349.037231 C276.405396,350.658997 266.352570,349.443024 257.275055,344.363342 C254.265045,342.678986 252.301132,343.049744 249.903275,345.441406 C230.205368,365.088531 210.395386,384.623230 190.631638,404.204376 C177.732651,416.984222 164.859726,429.790344 151.962982,442.572388 C148.257980,446.244415 148.113403,452.901764 151.629196,456.671387 C152.707138,457.827148 154.029282,457.681976 155.328629,457.681946 C185.658203,457.681458 215.987854,457.631042 246.317261,457.695557 C249.355972,457.702026 250.687012,456.399414 251.717636,453.698944 C259.314423,433.793579 278.324493,420.868317 299.341309,421.146240 C320.526215,421.426361 339.575745,434.206421 346.686249,452.909271 C354.337341,473.034058 348.794159,495.642761 332.699371,509.956390 C307.061371,532.757202 263.380280,521.715210 251.978027,489.436371 C250.838303,486.209961 249.371201,484.953583 245.964813,484.962799 C216.302094,485.043304 186.639008,484.985840 156.976028,484.969330 C154.436981,484.967896 152.081528,484.923981 150.916916,488.054077 C142.892441,509.621246 126.842339,520.325989 103.875908,522.166260 M141.430466,266.110352 C145.394760,270.906738 148.503693,276.196198 150.388428,282.139069 C151.211502,284.734314 152.692291,285.770782 155.494156,285.760895 C179.139755,285.677429 202.787949,285.547394 226.430206,285.843811 C232.373352,285.918304 231.388184,281.058533 233.335602,278.254700 C235.007233,275.847992 233.916855,274.189880 232.000244,272.304352 C199.956863,240.780380 167.866821,209.301468 136.133682,177.467056 C131.183243,172.500824 127.483856,170.729507 121.013550,174.621368 C117.660522,176.638214 116.183739,178.155136 116.217278,182.042480 C116.398239,203.022598 116.444160,224.006012 116.243645,244.985474 C116.204666,249.064667 117.676285,250.918961 121.328865,252.228989 C128.972488,254.970444 135.505173,259.524170 141.430466,266.110352 M116.349434,377.499908 C116.351860,390.663696 116.870338,403.855377 116.161102,416.980713 C115.742699,424.723846 121.926743,423.801880 125.649162,426.262665 C129.080231,428.530792 130.798965,425.706268 132.741440,423.784821 C165.551407,391.329803 198.234940,358.745361 231.274231,326.525696 C235.764252,322.147095 232.377243,319.155212 231.599960,315.493317 C230.884583,312.123138 228.193359,312.382568 225.670288,312.382812 C202.675171,312.384949 179.679749,312.445435 156.685303,312.323212 C153.331955,312.305389 151.624329,313.386505 150.456299,316.584381 C145.119888,331.194611 135.004120,341.287384 120.496223,346.769958 C117.238434,348.001068 116.190170,349.706024 116.267418,353.006317 C116.450615,360.833862 116.340004,368.668243 116.349434,377.499908z"/></svg>`;

/**
 * 创建顶栏按钮入口（模仿 ST 的 drawer 结构）
 */
/**
 * 创建顶栏按钮入口（模仿 ST 的 drawer 结构）
 */
function createTopBarButton(): void {
    const holder = document.querySelector('#top-settings-holder');
    const wiButton = document.querySelector('#WI-SP-button');

    if (!holder) {
        console.warn('[Engram] #top-settings-holder not found, fallback to floating orb');
        createFloatingOrb();
        return;
    }

    // 创建 drawer 容器（模仿 ST 结构）
    const drawer = document.createElement('div');
    drawer.id = 'engram-drawer';
    drawer.className = 'drawer';

    // drawer-toggle 包装器
    const toggle = document.createElement('div');
    toggle.className = 'drawer-toggle drawer-header';

    // drawer-icon 图标（添加 closedIcon 类匹配 ST 样式）
    const icon = document.createElement('div');
    icon.id = 'engram-drawer-icon';
    icon.className = 'drawer-icon fa-fw closedIcon';
    icon.title = 'Engram - 记忆操作系统';
    icon.setAttribute('data-i18n', '[title]Engram - Memory OS');
    icon.innerHTML = ENGRAM_ICON_SVG;
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

/**
 * 备用：创建悬浮球入口
 */
function createFloatingOrb(): void {
    const orb = document.createElement('div');
    // 使用 Tailwind 类
    orb.className = 'fixed bottom-5 right-5 w-12 h-12 rounded-full cursor-pointer z-[9999] flex items-center justify-center transition-transform duration-200 bg-gradient-to-br from-orange-500 to-pink-500 shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] text-white';
    orb.title = 'Engram - 记忆操作系统';
    orb.innerHTML = ENGRAM_ICON_SVG;
    orb.addEventListener('click', toggleMainPanel);
    document.body.appendChild(orb);
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
                <h2 class="m-0 text-lg text-slate-200 flex items-center gap-2">🧠 Engram</h2>
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
        // @ts-expect-error - 动态导入酒馆模块
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
