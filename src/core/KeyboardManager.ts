/**
 * KeyboardManager - 键盘快捷键管理器
 *
 * 实现跨窗口 (iframe) 的全局快捷键支持。
 * 采用双重监听策略，确保在酒馆主界面和插件窗口内均可触发。
 */

import { Logger } from '@/core/logger';

interface ShortcutConfig {
    key: string;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    callback: () => void;
    description: string;
}

interface RegisteredShortcut {
    key: string;
    ctrl: boolean;
    shift: boolean;
    alt: boolean;
    callback: () => void;
    description: string;
}

const MODULE = 'KeyboardManager';

class KeyboardManager {
    private shortcuts: Map<string, RegisteredShortcut> = new Map();
    private isEnabled = false;
    private boundKeydownHandler: (e: KeyboardEvent) => void;

    constructor() {
        this.boundKeydownHandler = this.handleKeydown.bind(this);
        // Logger.debug(MODULE, '初始化键盘管理器');
    }

    /**
     * 启动键盘监听
     * 同时尝试监听父窗口（酒馆）和当前窗口（Engram iframe）
     */
    start(): void {
        if (this.isEnabled) {
            Logger.debug(MODULE, '键盘监听已处于活动状态');
            return;
        }

        // 策略 1: 监听父窗口（主要策略 - 酒馆环境）
        try {
            const parentDoc = window.parent?.document;
            if (parentDoc && parentDoc !== document) {
                parentDoc.addEventListener('keydown', this.boundKeydownHandler, true);
                Logger.debug(MODULE, '已挂载父窗口监听器');
            }
        } catch (error) {
            Logger.warn(MODULE, '无法访问父窗口，这在独立开发环境是正常的', error);
        }

        // 策略 2: 监听当前窗口（备用策略 - 插件内焦点）
        try {
            document.addEventListener('keydown', this.boundKeydownHandler, true);
            Logger.debug(MODULE, '已挂载本地窗口监听器');
        } catch (error) {
            Logger.warn(MODULE, '挂载本地监听器失败', error);
        }

        this.isEnabled = true;
        Logger.info(MODULE, '键盘快捷键系统启动');
    }

    /**
     * 停止键盘监听
     * 移除所有挂载的事件监听器
     */
    stop(): void {
        if (!this.isEnabled) return;

        try {
            const parentDoc = window.parent?.document;
            if (parentDoc && parentDoc !== document) {
                parentDoc.removeEventListener('keydown', this.boundKeydownHandler, true);
            }
        } catch (error) {
            // 忽略访问错误
        }

        try {
            document.removeEventListener('keydown', this.boundKeydownHandler, true);
        } catch (error) {
            // 忽略错误
        }

        this.isEnabled = false;
        Logger.debug(MODULE, '键盘监听已停止');
    }

    /**
     * 注册一个新的快捷键
     */
    register(config: ShortcutConfig): void {
        const shortcutKey = this.generateShortcutKey(config.key, {
            ctrl: config.ctrl,
            shift: config.shift,
            alt: config.alt,
        });

        this.shortcuts.set(shortcutKey, {
            key: config.key.toLowerCase(),
            ctrl: config.ctrl || false,
            shift: config.shift || false,
            alt: config.alt || false,
            callback: config.callback,
            description: config.description,
        });

        Logger.debug(MODULE, `已注册快捷键: ${shortcutKey} (${config.description})`);
    }

    /**
     * 注销快捷键
     */
    unregister(key: string, options: { ctrl?: boolean; shift?: boolean; alt?: boolean } = {}): void {
        const shortcutKey = this.generateShortcutKey(key, options);
        if (this.shortcuts.has(shortcutKey)) {
            this.shortcuts.delete(shortcutKey);
            Logger.debug(MODULE, `已注销快捷键: ${shortcutKey}`);
        }
    }

    /**
     * 获取当前所有活动的快捷键列表
     */
    getRegisteredShortcuts(): { key: string; description: string }[] {
        return Array.from(this.shortcuts.entries()).map(([key, config]) => ({
            key,
            description: config.description,
        }));
    }

    /**
     * 生成标准化的快捷键标识字符串
     * 顺序：ctrl -> shift -> alt -> key
     */
    private generateShortcutKey(key: string, options: { ctrl?: boolean; shift?: boolean; alt?: boolean }): string {
        const parts: string[] = [];
        if (options.ctrl) parts.push('ctrl');
        if (options.shift) parts.push('shift');
        if (options.alt) parts.push('alt');
        parts.push(key.toLowerCase());
        return parts.join('+');
    }

    /**
     * 键盘事件处理核心逻辑
     */
    private lastTriggerTime: Map<string, number> = new Map(); // Phase 3: 记录各按键上次触发时间
    private THROTTLE_DELAY = 500; // 500ms 内禁止连续触发同一快捷键

    private handleKeydown(event: KeyboardEvent): void {
        // 避免在输入框中触发快捷键
        if (this.isTyping(event.target as Element)) {
            return;
        }

        const currentKey = this.generateShortcutKey(event.key, {
            ctrl: event.ctrlKey || event.metaKey, // Mac: Command 视为 Ctrl
            shift: event.shiftKey,
            alt: event.altKey,
        });

        const shortcut = this.shortcuts.get(currentKey);

        if (shortcut) {
            // Phase 3 Fix: 节流检查
            const now = Date.now();
            const lastTime = this.lastTriggerTime.get(currentKey) || 0;
            if (now - lastTime < this.THROTTLE_DELAY) {
                Logger.debug(MODULE, `拦截过快的连续快捷键: ${currentKey}`);
                return;
            }
            this.lastTriggerTime.set(currentKey, now);

            Logger.debug(MODULE, `触发快捷键: ${currentKey}`);

            // 阻止浏览器默认行为
            event.preventDefault();
            event.stopPropagation();

            try {
                shortcut.callback();
            } catch (error) {
                Logger.error(MODULE, `快捷键回调执行异常: ${currentKey}`, error);
            }
        }
    }

    /**
     * 检测焦点是否在输入控件上
     */
    private isTyping(element: Element | null): boolean {
        if (!element) return false;

        const tagName = element.tagName;

        // 标准输入元素
        if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
            return true;
        }

        // 可编辑区域 (contenteditable)
        if ((element as HTMLElement).isContentEditable) {
            return true;
        }

        // SillyTavern 特定的输入区域
        const id = element.id;
        if (id === 'send_textarea' || id === 'prompt-input') {
            return true;
        }

        return false;
    }

    /**
     * 销毁实例，清理资源
     */
    destroy(): void {
        this.stop();
        this.shortcuts.clear();
        Logger.debug(MODULE, '键盘管理器资源已释放');
    }
}

// 单例模式
const keyboardManager = new KeyboardManager();

// 类型定义：回调集合
export interface KeyboardShortcutCallbacks {
    toggleMainPanel: () => void;
    toggleQuickPanel: () => void;
    openCommandPalette: () => void;
}

/**
 * 设置全局快捷键的辅助函数
 */
export function setupKeyboardShortcuts(callbacks: KeyboardShortcutCallbacks): void {
    // Ctrl+Shift+E: 切换主面板
    keyboardManager.register({
        key: 'e',
        ctrl: true,
        shift: true,
        callback: callbacks.toggleMainPanel,
        description: 'Ctrl+Shift+E - 切换主面板',
    });

    // Ctrl+Q: 切换快捷面板 (Quick Panel)
    keyboardManager.register({
        key: 'q',
        ctrl: true,
        callback: callbacks.toggleQuickPanel,
        description: 'Ctrl+Q - 切换快捷面板',
    });

    // Ctrl+K: 打开命令面板 (Command Palette)
    keyboardManager.register({
        key: 'k',
        ctrl: true,
        callback: callbacks.openCommandPalette,
        description: 'Ctrl+K - 打开命令面板',
    });

    // 启动服务
    keyboardManager.start();

    Logger.info(MODULE, '快捷键已注册', keyboardManager.getRegisteredShortcuts());
}
