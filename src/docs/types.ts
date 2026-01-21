/**
 * 文档系统类型定义
 * V0.9.11
 */

import type { LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';

/** 文档分类 */
export interface DocCategory {
    /** 唯一标识 */
    id: string;
    /** 显示标签 */
    label: string;
    /** 图标 */
    icon: LucideIcon;
    /** MDX 组件 */
    component: ComponentType;
    /** 搜索关键词 */
    keywords?: string[];
    /** 文档描述 (用于搜索展示) */
    description?: string;
}
