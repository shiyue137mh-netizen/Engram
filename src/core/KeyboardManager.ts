/**
 * KeyboardManager - 键盘快捷键管理器
 *
 * 基于双重监听策略实现跨 iframe 快捷键支持
 */

import { Logger } from '@/core/logger';

export interface ShortcutConfig {
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
        Logger.debug(MODULE, '初始化键盘管理器');
    }

    /**
     * 启动键盘监听（双重监听策略）
     */
    start(): void {
        if (this.isEnabled) {
            Logger.debug(MODULE, '键盘监听已经启动');
            return;
        }

        // 策略 1: 监听父窗口（主要策略 - 用户焦点在酒馆主界面时）
        try {
            const parentDoc = window.parent?.document;
            if (parentDoc && parentDoc !== document) {
                parentDoc.addEventListener('keydown', this.boundKeydownHandler, true);
                Logger.debug(MODULE, '已在父窗口添加监听器');
            }
        } catch (error) {
            Logger.warn(MODULE, '无法访问父窗口', error);
        }

        // 策略 2: 监听当前窗口（备用策略 - 用户焦点在 Engram 面板时）
        try {
            document.addEventListener('keydown', this.boundKeydownHandler, true);
            Logger.debug(MODULE, '已在当前窗口添加监听器');
        } catch (error) {
            Logger.warn(MODULE, '无法在当前窗口添加监听器', error);
        }

        this.isEnabled = true;
        Logger.info(MODULE, '键盘监听已启动');
    }

    /**
     * 停止键盘监听
     */
    stop(): void {
        if (!this.isEnabled) return;

        try {
            const parentDoc = window.parent?.document;
            if (parentDoc && parentDoc !== document) {
                parentDoc.removeEventListener('keydown', this.boundKeydownHandler, true);
            }
        } catch (error) {
            // 忽略
        }

        try {
            document.removeEventListener('keydown', this.boundKeydownHandler, true);
        } catch (error) {
            // 忽略
        }

        this.isEnabled = false;
        Logger.debug(MODULE, '键盘监听已停止');
    }

    /**
     * 注册快捷键
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

        Logger.debug(MODULE, `注册快捷键: ${shortcutKey} - ${config.description}`);
    }

    /**
     * 注销快捷键
     */
    unregister(key: string, options: { ctrl?: boolean; shift?: boolean; alt?: boolean } = {}): void {
        const shortcutKey = this.generateShortcutKey(key, options);
        if (this.shortcuts.has(shortcutKey)) {
            this.shortcuts.delete(shortcutKey);
            Logger.debug(MODULE, `注销快捷键: ${shortcutKey}`);
        }
    }

    /**
     * 获取所有已注册的快捷键
     */
    getRegisteredShortcuts(): { key: string; description: string }[] {
        return Array.from(this.shortcuts.entries()).map(([key, config]) => ({
            key,
            description: config.description,
        }));
    }

    /**
     * 生成快捷键标识
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
     * 处理键盘事件
     */
    private handleKeydown(event: KeyboardEvent): void {
        // 检查是否在输入状态
        if (this.isTyping(event.target as Element)) {
            return;
        }

        // 生成当前按键的标识
        const currentKey = this.generateShortcutKey(event.key, {
            ctrl: event.ctrlKey || event.metaKey, // macOS 使用 Cmd 键
            shift: event.shiftKey,
            alt: event.altKey,
        });

        // 查找匹配的快捷键
        const shortcut = this.shortcuts.get(currentKey);

        if (shortcut) {
            Logger.debug(MODULE, `触发快捷键: ${currentKey}`);

            // 阻止默认行为
            event.preventDefault();
            event.stopPropagation();

            // 执行回调
            try {
                shortcut.callback();
            } catch (error) {
                Logger.error(MODULE, `快捷键回调执行失败: ${currentKey}`, error);
            }
        }
    }

    /**
     * 检查用户是否正在输入
     */
    private isTyping(element: Element | null): boolean {
        if (!element) return false;

        const tagName = element.tagName;

        // 检查输入元素
        if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
            return true;
        }

        // 检查可编辑元素
        if ((element as HTMLElement).isContentEditable) {
            return true;
        }

        // 检查 SillyTavern 的特定输入框
        const id = element.id;
        if (id === 'send_textarea' || id === 'prompt-input') {
            return true;
        }

        return false;
    }

    /**
     * 销毁管理器
     */
    destroy(): void {
        this.stop();
        this.shortcuts.clear();
        Logger.debug(MODULE, '键盘管理器已销毁');
    }
}

// 单例实例
export const keyboardManager = new KeyboardManager();

// 便捷的初始化函数
export interface KeyboardShortcutCallbacks {
    toggleMainPanel: () => void;
    toggleQuickPanel: () => void;
    openCommandPalette: () => void;
}

export function setupKeyboardShortcuts(callbacks: KeyboardShortcutCallbacks): void {
    // Ctrl+Shift+E: 主面板
    keyboardManager.register({
        key: 'e',
        ctrl: true,
        shift: true,
        callback: callbacks.toggleMainPanel,
        description: 'Ctrl+Shift+E - 切换主面板',
    });

    // Ctrl+Q: 快捷面板
    keyboardManager.register({
        key: 'q',
        ctrl: true,
        callback: callbacks.toggleQuickPanel,
        description: 'Ctrl+Q - 切换快捷面板',
    });

    // Ctrl+K: 命令面板
    keyboardManager.register({
        key: 'k',
        ctrl: true,
        callback: callbacks.openCommandPalette,
        description: 'Ctrl+K - 打开命令面板',
    });

    // Escape: 关闭当前面板（这个比较特殊，需要判断当前哪个面板是开着的）
    // 由于 Escape 的行为依赖于全局状态，我们不在这里注册
    // 而是让各个面板自己处理 Escape

    // 启动监听
    keyboardManager.start();

    Logger.info(MODULE, '快捷键设置完成', keyboardManager.getRegisteredShortcuts());
}
