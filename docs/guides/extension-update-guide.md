# SillyTavern 扩展更新开发指南

本文档介绍如何在 SillyTavern 扩展中实现版本检测、更新日志获取和一键更新功能。

## 目录

- [扩展类型识别](#扩展类型识别)
- [版本比较](#版本比较)
- [获取更新日志](#获取更新日志)
- [调用更新 API](#调用更新-api)
- [完整示例](#完整示例)

---

## 扩展类型识别

SillyTavern 扩展有三种安装位置，对应三种类型：

| 类型 | 安装位置 | `global` 参数 |
|------|----------|---------------|
| `system` | `public/scripts/extensions/` | `false` |
| `global` | `public/scripts/extensions/third-party/` | `true` |
| `local` | `data/<user>/extensions/` | `false` |

### 动态获取扩展类型

用户可以自由移动扩展位置，因此**必须动态检测**扩展类型，不能硬编码。

```typescript
// 扩展 ID（目录名，不是 manifest.json 中的 display_name）
const EXTENSION_ID = 'Your_Extension_Name';

/**
 * 通过调用酒馆 discover API 获取扩展类型
 */
async function getExtensionType(extensionId: string): Promise<'global' | 'local' | 'system' | null> {
    try {
        const response = await fetch('/api/extensions/discover');
        if (!response.ok) return null;
        
        const extensions: { name: string; type: string }[] = await response.json();
        
        // name 可能包含路径前缀，如 "third-party/Your_Extension"
        const found = extensions.find(ext => 
            ext.name === extensionId || ext.name.endsWith(extensionId)
        );
        
        return found ? (found.type as 'global' | 'local' | 'system') : null;
    } catch (e) {
        console.error('获取扩展类型失败', e);
        return null;
    }
}
```

---

## 版本比较

### 从 GitHub/GitLab 获取最新版本

```typescript
const REPO_OWNER = 'your-username';
const REPO_NAME = 'your-extension';

async function getLatestVersion(): Promise<string> {
    // GitHub API
    const response = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/manifest.json?ref=main`
    );
    const data = await response.json();
    const manifest = JSON.parse(atob(data.content));
    return manifest.version;
    
    // 或者 GitLab API
    // const response = await fetch(
    //     `https://gitlab.com/api/v4/projects/${encodeURIComponent(`${REPO_OWNER}/${REPO_NAME}`)}/repository/files/manifest.json/raw?ref=main`
    // );
    // return (await response.json()).version;
}
```

### 比较版本号

推荐使用 `compare-versions` 库：

```typescript
import { compare } from 'compare-versions';

const currentVersion = '1.0.0'; // 从本地 manifest.json 获取
const latestVersion = await getLatestVersion();

const hasUpdate = compare(latestVersion, currentVersion, '>');
console.log(hasUpdate ? '有新版本可用' : '已是最新版本');
```

---

## 获取更新日志

```typescript
async function getChangelog(): Promise<string> {
    // GitHub raw 文件
    const response = await fetch(
        `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/CHANGELOG.md`
    );
    return await response.text();
    
    // 或者 GitLab
    // const response = await fetch(
    //     `https://gitlab.com/api/v4/projects/${encodeURIComponent(`${REPO_OWNER}/${REPO_NAME}`)}/repository/files/CHANGELOG.md/raw?ref=main`
    // );
    // return await response.text();
}
```

### 解析版本区间的日志

```typescript
async function getChangelogBetween(fromVersion: string, toVersion: string): Promise<string> {
    const changelog = await getChangelog();
    
    // 匹配版本号标题（如 ## 1.2.3 或 ### [1.2.3]）
    const matches = [...changelog.matchAll(/(?:^|\n)(?:#{1,3}\s*|\[)([0-9]+\.[0-9]+\.[0-9]+)(?:\]|\s|$)/g)];
    
    const fromMatch = matches.find(m => m[1] === fromVersion);
    const toMatch = matches.find(m => m[1] === toVersion);
    
    if (!fromMatch || !toMatch) return changelog;
    
    return changelog.substring(toMatch.index, fromMatch.index).trim();
}
```

---

## 调用更新 API

### 获取请求头

酒馆 API 需要认证头：

```typescript
function getRequestHeaders(): Record<string, string> {
    // 方式1：全局函数
    if (typeof window.getRequestHeaders === 'function') {
        return window.getRequestHeaders();
    }
    // 方式2：SillyTavern context
    const context = window.SillyTavern?.getContext?.();
    if (context?.getRequestHeaders) {
        return context.getRequestHeaders();
    }
    // 备用
    return { 'Content-Type': 'application/json' };
}
```

### 执行更新

```typescript
async function updateExtension(): Promise<{ success: boolean; message: string }> {
    const headers = getRequestHeaders();
    
    // 1. 获取扩展类型
    const extensionType = await getExtensionType(EXTENSION_ID);
    const isGlobal = extensionType === 'global';
    
    // 2. 调用更新 API
    const response = await fetch('/api/extensions/update', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            extensionName: EXTENSION_ID,
            global: isGlobal,
        }),
    });
    
    if (!response.ok) {
        return { success: false, message: await response.text() };
    }
    
    const data = await response.json();
    
    if (data.isUpToDate) {
        return { success: true, message: '已是最新版本' };
    }
    
    return { success: true, message: `更新成功: ${data.shortCommitHash}` };
}
```

### 更新后刷新页面

```typescript
async function handleUpdate() {
    const result = await updateExtension();
    
    if (result.success && !result.message.includes('已是最新')) {
        toastr.success('更新成功，页面即将刷新');
        setTimeout(() => window.location.reload(), 2000);
    } else {
        toastr.info(result.message);
    }
}
```

---

## 完整示例

### UpdateService.ts

```typescript
const EXTENSION_ID = 'My_Extension';
const GITHUB_REPO = 'username/my-extension';

export class UpdateService {
    private static latestVersionCache: string | null = null;
    
    static getCurrentVersion(): string {
        // 从你的 manifest 或常量获取
        return '1.0.0';
    }
    
    static async getLatestVersion(): Promise<string> {
        if (this.latestVersionCache) return this.latestVersionCache;
        
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/contents/manifest.json?ref=main`
        );
        const data = await response.json();
        const manifest = JSON.parse(atob(data.content));
        this.latestVersionCache = manifest.version;
        return manifest.version;
    }
    
    static async hasUpdate(): Promise<boolean> {
        const latest = await this.getLatestVersion();
        const current = this.getCurrentVersion();
        // 简单比较，或使用 compare-versions 库
        return latest !== current;
    }
    
    static async update(): Promise<{ success: boolean; message: string }> {
        const extensionType = await getExtensionType(EXTENSION_ID);
        const isGlobal = extensionType === 'global';
        
        const response = await fetch('/api/extensions/update', {
            method: 'POST',
            headers: getRequestHeaders(),
            body: JSON.stringify({
                extensionName: EXTENSION_ID,
                global: isGlobal,
            }),
        });
        
        if (!response.ok) {
            return { success: false, message: await response.text() };
        }
        
        const data = await response.json();
        return {
            success: true,
            message: data.isUpToDate ? '已是最新版本' : '更新成功',
        };
    }
}
```

---

## API 参考

| 端点 | 方法 | 用途 |
|------|------|------|
| `/api/extensions/discover` | GET | 获取所有扩展及其类型 |
| `/api/extensions/update` | POST | 更新指定扩展 |
| `/api/extensions/version` | POST | 获取扩展版本信息 |
| `/api/extensions/install` | POST | 安装新扩展 |
| `/api/extensions/delete` | POST | 删除扩展 |

### `/api/extensions/update` 请求体

```json
{
    "extensionName": "Extension_Directory_Name",
    "global": true  // global 类型为 true，其他为 false
}
```

### 响应示例

```json
{
    "isUpToDate": false,
    "shortCommitHash": "abc1234"
}
```

---

## 常见问题

### Q: 为什么更新报错 "Directory does not exist"？

**A**: `global` 参数设置错误。确保根据扩展实际安装位置动态获取类型，不要硬编码。

### Q: 如何判断扩展是否需要管理员权限？

**A**: `global` 类型扩展的更新需要管理员权限。可以通过酒馆的 `isAdmin()` 函数检查。

### Q: 版本比较推荐用什么库？

**A**: 推荐 `compare-versions`，支持语义化版本比较。

---

## 参考实现

- [Engram UpdateNotice.tsx](../src/ui/components/feedback/UpdateNotice.tsx)
- [JS-Slash-Runner extension.ts](https://github.com/N0VI028/JS-Slash-Runner)
