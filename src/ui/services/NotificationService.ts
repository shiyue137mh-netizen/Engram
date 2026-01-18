import { Logger } from '@/core/logger';

/**
 * Toastr 类型定义 (部分)
 */
interface Toastr {
    success(message: string, title?: string, options?: any): JQuery | null;
    info(message: string, title?: string, options?: any): JQuery | null;
    warning(message: string, title?: string, options?: any): JQuery | null;
    error(message: string, title?: string, options?: any): JQuery | null;
    clear($toastElement?: JQuery): void;
    remove($toastElement?: JQuery): void;
    options: any;
}

/**
 * 通用通知选项
 */
export interface NotificationOptions {
    timeOut?: number;
    extendedTimeOut?: number;
    closeButton?: boolean;
    progressBar?: boolean;
    onclick?: () => void;
    parseHtml?: boolean; // 是否允许 HTML 
}

/**
 * 默认选项
 */
const DEFAULT_OPTIONS: NotificationOptions = {
    timeOut: 5000,
    extendedTimeOut: 1000,
    closeButton: true,
    progressBar: true,
};

/**
 * NotificationService
 * 
 * 封装 SillyTavern 原生 toastr 通知系统
 * 提供统一的通知接口，便于未来替换或扩展
 */
export class NotificationService {
    private static instance: NotificationService;

    private constructor() { }

    public static getInstance(): NotificationService {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }

    /**
     * 获取全局 toastr 对象
     */
    private getToastr(): Toastr | null {
        // @ts-ignore
        return window.toastr || null;
    }

    /**
     * 发送成功通知
     */
    public success(message: string, title: string = 'Engram', options: NotificationOptions = {}): void {
        const toastr = this.getToastr();
        if (toastr) {
            toastr.success(message, title, { ...DEFAULT_OPTIONS, ...options });
        } else {
            console.log(`[Engram] SUCCESS: ${title} - ${message}`);
        }
        Logger.info('Notification', `Success: ${message}`);
    }

    /**
     * 发送信息通知
     */
    public info(message: string, title: string = 'Engram', options: NotificationOptions = {}): void {
        const toastr = this.getToastr();
        if (toastr) {
            toastr.info(message, title, { ...DEFAULT_OPTIONS, ...options });
        } else {
            console.log(`[Engram] INFO: ${title} - ${message}`);
        }
        Logger.info('Notification', `Info: ${message}`);
    }

    /**
     * 发送警告通知
     */
    public warning(message: string, title: string = 'Engram', options: NotificationOptions = {}): void {
        const toastr = this.getToastr();
        if (toastr) {
            toastr.warning(message, title, { ...DEFAULT_OPTIONS, ...options });
        } else {
            console.warn(`[Engram] WARNING: ${title} - ${message}`);
        }
        Logger.warn('Notification', `Warning: ${message}`);
    }

    /**
     * 发送错误通知
     */
    public error(message: string, title: string = 'Engram', options: NotificationOptions = {}): void {
        const toastr = this.getToastr();
        if (toastr) {
            // 错误通知默认显示时间更长
            toastr.error(message, title, { ...DEFAULT_OPTIONS, timeOut: 8000, ...options });
        } else {
            console.error(`[Engram] ERROR: ${title} - ${message}`);
        }
        Logger.error('Notification', `Error: ${message}`);
    }

    /**
     * 发送运行中通知（持续显示，不自动消失）
     * @param message 消息内容
     * @param title 标题
     * @param onCancel 可选的取消回调，如果提供则点击时触发取消
     * @returns toastr 对象，可用于后续手动移除
     */
    public running(message: string, title: string = 'Engram', onCancel?: () => void): JQuery | null {
        const toastr = this.getToastr();
        if (toastr) {
            // 如果有取消回调，在消息末尾添加提示
            const displayMessage = onCancel
                ? `${message} <small style="opacity:0.7">(点击取消)</small>`
                : message;

            const toast = toastr.info(displayMessage, title, {
                timeOut: 20000,       // 最大显示 20 秒
                extendedTimeOut: 0,   // 悬停时不延长
                closeButton: false,   // 不显示关闭按钮
                progressBar: true,    // 显示进度条（表示倒计时）
                tapToDismiss: !!onCancel, // 有取消回调时点击可关闭
                onclick: onCancel ? () => {
                    Logger.info('Notification', '用户取消操作');
                    onCancel();
                } : undefined,
                escapeHtml: false,    // 允许 HTML
            });
            return toast;
        } else {
            console.log(`[Engram] RUNNING: ${title} - ${message}`);
            return null;
        }
    }

    /**
     * 移除指定的 toastr 通知
     */
    public remove(toastElement: JQuery | null): void {
        const toastr = this.getToastr();
        if (toastr && toastElement) {
            toastr.remove(toastElement);
        }
    }

    /**
     * 清除所有通知
     */
    public clear(): void {
        const toastr = this.getToastr();
        if (toastr) {
            toastr.clear();
        }
    }
}

/** 默认导出单例 */
export const notificationService = NotificationService.getInstance();
export default NotificationService;
