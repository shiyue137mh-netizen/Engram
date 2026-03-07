import { Logger } from '@/core/logger';
import { EntityNode, EventNode } from '@/data/types/graph';

const MODULE = 'EntityScanner';

/**
 * 封装酒馆原生的正则解析方法
 */
function parseRegexFromString(input: string): RegExp | null {
    try {
        // @ts-ignore - 尝试从全局获取，SillyTavern 导出了这个方法
        if (typeof window.parseRegexFromString === 'function') {
            // @ts-ignore
            return window.parseRegexFromString(input);
        }
    } catch (e) {
        Logger.warn(MODULE, '无法获取酒馆原生 parseRegexFromString，降级为普通正则', e);
    }

    // 降级方案：简单的斜杠包裹正则解析
    const match = input.match(/^\/(.*)\/([gimsuy]*)$/);
    if (match) {
        try {
            return new RegExp(match[1], match[2] || 'i');
        } catch (e) {
            return null;
        }
    }
    return null;
}

/**
 * 匹配函数，尽可能复刻酒馆的 matchKeys 逻辑
 */
export function matchKey(text: string, keyword: string): boolean {
    if (!keyword || !text) return false;

    // 1. 尝试正则匹配
    const regex = parseRegexFromString(keyword);
    if (regex) {
        return regex.test(text);
    }

    // 2. 降级为普通字符串包含匹配（忽略大小写）
    return text.toLowerCase().includes(keyword.toLowerCase());
}

/**
 * 扫描上下文中提及的实体
 */
export function scanEntities(text: string, entities: EntityNode[]): EntityNode[] {
    const hitEntities: EntityNode[] = [];

    for (const entity of entities) {
        let hit = false;

        // 检查主名
        if (matchKey(text, entity.name)) {
            hit = true;
        }

        // 检查别名/触发词
        if (!hit && Array.isArray(entity.aliases)) {
            for (const alias of entity.aliases) {
                // V1.4.1: 增强匹配 - 如果别名中有逗号或中文逗号，拆分匹配
                const potentialAliases = alias.includes(',') || alias.includes('，')
                    ? alias.split(/[,，]/).map((s: string) => s.trim()).filter(Boolean)
                    : [alias];

                for (const subAlias of potentialAliases) {
                    if (matchKey(text, subAlias)) {
                        hit = true;
                        break;
                    }
                }
                if (hit) break;
            }
        }

        if (hit) {
            hitEntities.push(entity);
        }
    }

    return hitEntities;
}

/**
 * 扫描上下文中提及的事件（基于角色和地点）
 */
export function scanEvents(text: string, events: EventNode[]): EventNode[] {
    const hitEvents: EventNode[] = [];

    for (const event of events) {
        let hit = false;

        // 扫描角色
        if (Array.isArray(event.structured_kv.role)) {
            for (const role of event.structured_kv.role) {
                if (matchKey(text, role)) {
                    hit = true;
                    break;
                }
            }
        }

        // 扫描地点
        if (!hit && Array.isArray(event.structured_kv.location)) {
            for (const loc of event.structured_kv.location) {
                if (matchKey(text, loc)) {
                    hit = true;
                    break;
                }
            }
        }

        if (hit) {
            hitEvents.push(event);
        }
    }

    return hitEvents;
}
