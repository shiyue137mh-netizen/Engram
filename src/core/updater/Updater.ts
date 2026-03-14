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
declare const __COMMIT_HASH__: string;

/** GitHub 仓库配置 */
const REPO_CONFIG = {
    owner: 'shiyue137mh-netizen',
    repo: 'Engram',
    branch: 'master', 
};

/** 当前开发版本与哈希 */
const CURRENT_VERSION = manifest.version;
const CURRENT_HASH = typeof __COMMIT_HASH__ !== 'undefined' ? __COMMIT_HASH__ : 'unknown';

/** 缓存 */
let cachedLatestVersion: string | null = null;
let cachedLatestHash: string | null = null;
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
     * 获取当前哈希
     */
    static getCurrentHash(): string {
        return CURRENT_HASH;
    }

    /**
     * 从 GitHub 获取最新提交哈希
     */
    static async getLatestHash(): Promise<string | null> {
        if (cachedLatestHash) {
            return cachedLatestHash;
        }

        try {
            // 尝试从 GitHub API 获取最新的 commit hash
            const url = `https://api.github.com/repos/${REPO_CONFIG.owner}/${REPO_CONFIG.repo}/commits/${REPO_CONFIG.branch}`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                cachedLatestHash = data.sha?.substring(0, 7) || null;
                return cachedLatestHash;
            }
        } catch {
            // 静默失败
        }
        return null;
    }

    /**
     * 尝试从酒馆后端获取自身 Git 状态
     */
    static async getTavernGitStatus(): Promise<{ isUpToDate: boolean, currentCommitHash: string } | null> {
        try {
            const response = await fetch('/api/extensions/version', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    extensionName: 'Engram', 
                    global: false // 默认为当前用户扩展
                }),
            });
            if (response.ok) {
                return await response.json();
            }
        } catch {
            // 静默失败
        }
        return null;
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
                return null;
            }

            const manifest = await response.json();
            cachedLatestVersion = manifest.version || null;
            return cachedLatestVersion;
        } catch {
            return null;
        }
    }

    /**
     * 检查是否有更新 (版本优先，哈希次之)
     */
    static async hasUpdate(): Promise<boolean> {
        // 1. 优先检查酒馆后端 (如果通过 Git 安装)
        const tavernStatus = await this.getTavernGitStatus();
        if (tavernStatus && !tavernStatus.isUpToDate) {
            return true;
        }

        // 2. 检查版本号
        const latestVersion = await this.getLatestVersion();
        if (latestVersion && compareVersions(latestVersion, CURRENT_VERSION) > 1) {
            return true;
        }

        // 3. 检查哈希 (如果版本号一致)
        if (latestVersion === CURRENT_VERSION || !latestVersion) {
            const latestHash = await this.getLatestHash();
            if (latestHash && CURRENT_HASH !== 'unknown' && latestHash !== CURRENT_HASH) {
                return true;
            }
        }

        return false;
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
     * 获取已读标识 (优先哈希，次之版本)
     */
    static getReadMark(): string {
        try {
            return SettingsManager.get('lastReadVersion') || '0.0.0';
        } catch {
            return '0.0.0';
        }
    }

    /**
     * 标记标识已读
     */
    static async markAsRead(): Promise<void> {
        const latestVersion = await this.getLatestVersion() || CURRENT_VERSION;
        const latestHash = await this.getLatestHash() || CURRENT_HASH;
        
        // 存储格式: version@hash
        const mark = `${latestVersion}@${latestHash}`;
        try {
            SettingsManager.set('lastReadVersion', mark);
            console.debug('[Engram] UpdateService: 已标记已读', mark);
        } catch (e) {
            console.error('[Engram] UpdateService: 标记失败', e);
        }
    }

    /**
     * 检查是否有未读更新
     */
    static async hasUnreadUpdate(): Promise<boolean> {
        const hasUpdate = await this.hasUpdate();
        if (!hasUpdate) return false;

        const latestVersion = await this.getLatestVersion() || CURRENT_VERSION;
        const latestHash = await this.getLatestHash() || CURRENT_HASH;
        const currentMark = `${latestVersion}@${latestHash}`;
        
        const readMark = this.getReadMark();
        return readMark !== currentMark;
    }

    /**
     * 清除缓存（强制刷新）
     */
    static clearCache(): void {
        cachedLatestVersion = null;
        cachedLatestHash = null;
        cachedChangelog = null;
    }
}

