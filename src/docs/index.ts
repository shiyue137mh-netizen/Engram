/**
 * 文档内容注册表
 * V0.9.12
 */

import { Play, Settings, Brain, HelpCircle } from 'lucide-react';
import type { DocCategory } from './types';

// 懒加载 MDX 文档
import Intro from './intro.mdx';
import GettingStarted from './getting-started.mdx';
import Features from './features.mdx';
import FAQ from './faq.mdx';

export const DOCS: DocCategory[] = [
    {
        id: 'intro',
        label: '项目介绍',
        icon: Brain,
        component: Intro,
        keywords: ['介绍', 'intro', '关于', 'about', '理念', 'workflow', 'indexeddb', '宏注入'],
        description: '了解 Engram 的核心链路：Workflow、本地存储与宏注入',
    },
    {
        id: 'getting-started',
        label: '配置指南',
        icon: Play,
        component: GettingStarted,
        keywords: ['配置', 'setup', '入门', 'start', 'api', 'embedding', 'rerank', 'preprocessing'],
        description: '按步骤完成模型接入、处理策略与运行验证',
    },
    {
        id: 'features',
        label: '功能指南',
        icon: Settings,
        component: Features,
        keywords: ['功能', 'feature', 'rag', '总结', 'summary', 'vector', 'edit', 'trimmer', 'entity'],
        description: '完整了解处理链路、检索机制、记忆流与生命周期管理',
    },
    {
        id: 'faq',
        label: '常见问题',
        icon: HelpCircle,
        component: FAQ,
        keywords: ['faq', '问题', 'help', '报错', 'error', 'debug', '日志', '排查', '召回'],
        description: '覆盖连接、工作流、RAG、预处理与数据生命周期的排障手册',
    },
];

