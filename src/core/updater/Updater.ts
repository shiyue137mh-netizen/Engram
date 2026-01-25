/**
 * UpdateService - 更新检测服务
 * 
 * 功能：
 * 1. 从 GitHub 获取最新版本号和更新日志
 * 2. 版本比较判断是否有更新
 * 3. 持久化已读状态
 */

import { SettingsManager } from '@/config/settings';
import { notificationService } from "@/ui/services/NotificationService";
import manifest from '../../../manifest.json';

/** GitHub 仓库配置 */
const REPO_CONFIG = {
    owner: 'shiyue137mh-netizen',
    repo: 'Engram',
    branch: 'master', 
};

/** 当前版本（从 manifest.json 中读取） */
const CURRENT_VERSION = manifest.version;

/** 缓存 */
let cachedLatestVersion: string | null = null;
let cachedChangelog: string | null = null;

/**
 * 比较版本号
 * @returns 1 if a > b, -1 if a < b, 0 if equal
 */
function compareVersions(a: string, b: string): number {
    const partsA = a.split('.').map(Number);
    const partsB = b.split('.').map(Number);

    for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
        const numA = partsA[i] || 0;
        const numB = partsB[i] || 0;
        if (numA > numB) return 1;
        if (numA < numB) return -1;
    }
    return 0;
}

/**
 * 更新服务类
 */
export class UpdateService {
    /**
     * 获取当前版本
     */
    static getCurrentVersion(): string {
        return CURRENT_VERSION;
    }

    /**
     * 从 GitHub 获取最新版本号
     */
    static async getLatestVersion(): Promise<string | null> {
        if (cachedLatestVersion) {
            return cachedLatestVersion;
        }

        try {
            const url = `https://raw.githubusercontent.com/${REPO_CONFIG.owner}/${REPO_CONFIG.repo}/${REPO_CONFIG.branch}/manifest.json`;
            const response = await fetch(url);

            if (!response.ok) {
                // 仓库未上传时静默返回，不打印警告
                return null;
            }

            const manifest = await response.json();
            cachedLatestVersion = manifest.version || null;
            return cachedLatestVersion;
        } catch {
            // 网络错误静默返回
            return null;
        }
    }

    /**
     * 检查是否有更新
     */
    static async hasUpdate(): Promise<boolean> {
        const latest = await this.getLatestVersion();
        if (!latest) return false;

        return compareVersions(latest, CURRENT_VERSION) > 0;
    }

    /**
     * 获取更新日志
     */
    static async getChangelog(): Promise<string | null> {
        if (cachedChangelog) {
            return cachedChangelog;
        }

        try {
            const url = `https://raw.githubusercontent.com/${REPO_CONFIG.owner}/${REPO_CONFIG.repo}/${REPO_CONFIG.branch}/CHANGELOG.md`;
            const response = await fetch(url);

            if (!response.ok) {
                console.warn('[Engram] UpdateService: 获取更新日志失败', response.status);
                notificationService.warning(`获取更新日志失败: ${response.status}`, '更新检测');
                return null;
            }

            cachedChangelog = await response.text();
            return cachedChangelog;
        } catch (e) {
            console.error('[Engram] UpdateService: 获取更新日志异常', e);
            notificationService.error('获取更新日志异常', '更新检测');
            return null;
        }
    }

    /**
     * 获取已读版本（上次用户确认查看的版本）
     */
    static getReadVersion(): string {
        try {
            return SettingsManager.get('lastReadVersion') || '0.0.0';
        } catch {
            return '0.0.0';
        }
    }

    /**
     * 标记版本已读
     */
    static async markAsRead(version?: string): Promise<void> {
        const targetVersion = version || await this.getLatestVersion() || CURRENT_VERSION;
        try {
            SettingsManager.set('lastReadVersion', targetVersion);
            console.debug('[Engram] UpdateService: 已标记版本已读', targetVersion);
        } catch (e) {
            console.error('[Engram] UpdateService: 标记已读失败', e);
        }
    }

    /**
     * 检查是否有未读更新
     */
    static async hasUnreadUpdate(): Promise<boolean> {
        const latest = await this.getLatestVersion();
        if (!latest) return false;

        // 逻辑修复：首先必须有新版本 (Remote > Local)
        if (compareVersions(latest, CURRENT_VERSION) <= 0) {
            return false;
        }

        const readVersion = this.getReadVersion();
        return compareVersions(latest, readVersion) > 0;
    }

    /**
     * 清除缓存（强制刷新）
     */
    static clearCache(): void {
        cachedLatestVersion = null;
        cachedChangelog = null;
    }
}

