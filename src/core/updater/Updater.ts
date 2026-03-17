/**
 * UpdateService - 更新检测服务
 * 
 * 功能：
 * 1. 从 GitHub 获取最新版本号和更新日志
 * 2. 版本比较判断是否有更新
 * 3. 持久化已读状态
 */

import { SettingsManager } from '@/config/settings';
import { getRequestHeaders } from '@/integrations/tavern';
import { notificationService } from "@/ui/services/NotificationService";
import manifest from '../../../manifest.json';
declare const __COMMIT_HASH__: string;

/** GitHub 仓库配置 */
const REPO_CONFIG = {
    owner: 'shiyue137mh-netizen',
    repo: 'Engram',
    branch: 'master', 
};

/** 当前开发版本 */
const CURRENT_VERSION = manifest.version;
const CURRENT_HASH_FALLBACK = 'unknown'; 

/** 缓存 */
let cachedLatestVersion: string | null = null;
let cachedLatestHash: string | null = null;
let cachedRealLocalHash: string | null = null;
let cachedRealExtensionName: string | null = null;
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
     * 获取当前哈希 (优先使用后端获取的真实哈希)
     */
    static getCurrentHash(): string {
        return cachedRealLocalHash || CURRENT_HASH_FALLBACK;
    }

    /**
     * 获取真实的本地哈希 (从酒馆后端获取)
     */
    static async getRealLocalHash(): Promise<string> {
        if (cachedRealLocalHash) return cachedRealLocalHash;

        const tavernStatus = await this.getTavernGitStatus();
        if (tavernStatus?.currentCommitHash) {
            cachedRealLocalHash = tavernStatus.currentCommitHash.substring(0, 7);
            return cachedRealLocalHash;
        }

        return CURRENT_HASH_FALLBACK;
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
            // 1. 获取真实的扩展名 (如果是第一次)
            const extensionName = await this.getRealExtensionName();
            if (!extensionName) return null;

            const response = await fetch('/api/extensions/version', {
                method: 'POST',
                headers: getRequestHeaders(),
                body: JSON.stringify({ 
                    extensionName: extensionName, 
                    global: false 
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
     * 通过酒馆 discover API 找到匹配的真实目录名
     * 解决开发环境 (Engram_project) 与生产环境 (Engram) 名称不一的问题
     */
    static async getRealExtensionName(): Promise<string | null> {
        if (cachedRealExtensionName) return cachedRealExtensionName;

        try {
            const response = await fetch('/api/extensions/discover', {
                headers: getRequestHeaders()
            });
            if (!response.ok) return null;

            const extensions: { name: string; type: string }[] = await response.json();
            
            // 查找逻辑：
            // 1. 先找精确匹配 'Engram_project' 的 (开发环境)
            // 2. 再找精确匹配 'Engram' 的 (标准安装)
            // 3. 找以 '/Engram' 结尾的 (三方路径安装)
            const targetNames = ['Engram_project', 'Engram'];
            
            const found = extensions.find(ext => {
                const name = ext.name.toLowerCase();
                return targetNames.some(t => name === t.toLowerCase() || name.endsWith('/' + t.toLowerCase()) || name.endsWith('\\' + t.toLowerCase()));
            });

            if (found) {
                // 处理可能包含 'third-party/' 前缀的情况
                const parts = found.name.split(/[/\\]/);
                cachedRealExtensionName = parts[parts.length - 1];
                console.debug('[Engram] 自动识别扩展标识:', cachedRealExtensionName);
                return cachedRealExtensionName;
            }
        } catch (e) {
            console.warn('[Engram] 自动识别目录名失败', e);
        }

        // 默认兜底
        return 'Engram';
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
     * 检查是否有更新 (版本优先)
     * V1.4.8: 改进哈希对齐逻辑
     */
    static async hasUpdate(): Promise<boolean> {
        // 1. 获取最新信息
        const [latestVersion, localRealHash, latestHash] = await Promise.all([
            this.getLatestVersion(),
            this.getRealLocalHash(),
            this.getLatestHash()
        ]);

        // 2. 优先检查版本号
        if (latestVersion && compareVersions(latestVersion, CURRENT_VERSION) > 0) {
            return true;
        }

        // 3. 检查哈希 (如果版本号一致)
        // 只有当本地真实哈希可用，且与远程哈希不一致时才视为有更新
        if (latestHash && localRealHash !== 'unknown' && latestHash !== localRealHash) {
            // 如果版本号是一样的，说明可能是小修小补或者是还没升 version 的 commit
            return true;
        }

        // 4. 作为备份，检查酒馆后端的 isUpToDate 状态
        const tavernStatus = await this.getTavernGitStatus();
        if (tavernStatus && !tavernStatus.isUpToDate) {
            // 如果后端明确说不是最新的，那肯定有更新
            return true;
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
     * @param mark 可选，手动指定标记内容 (version@hash)
     */
    static async markAsRead(mark?: string): Promise<void> {
        const targetMark = mark || `${await this.getLatestVersion() || CURRENT_VERSION}@${await this.getLatestHash() || await this.getRealLocalHash()}`;
        
        try {
            SettingsManager.set('lastReadVersion', targetMark);
            console.debug('[Engram] UpdateService: 已标记已读', targetMark);
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
        const latestHash = await this.getLatestHash() || await this.getRealLocalHash();
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
        cachedRealLocalHash = null;
        cachedChangelog = null;
    }
}

