import { Logger } from '@/lib/logger';

/**
 * Toastr 类型定义 (部分)
 */
interface Toastr {
    success(message: string, title?: string, options?: any): void;
    info(message: string, title?: string, options?: any): void;
    warning(message: string, title?: string, options?: any): void;
    error(message: string, title?: string, options?: any): void;
    clear(): void;
    remove(): void;
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
