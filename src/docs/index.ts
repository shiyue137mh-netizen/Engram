/**
 * 文档内容注册表
 * V0.9.12
 */

import { Brain, Globe, HelpCircle, Play, Settings } from 'lucide-react';
import type { DocCategory } from './types';

// 懒加载 MDX 文档
import Intro from './intro.mdx';
import GettingStarted from './getting-started.mdx';
import Features from './features.mdx';
import FAQ from './faq.mdx';
import Deployment from './deployment.mdx';

export const DOCS: DocCategory[] = [
    {
        component: Intro,
        description: '了解 Engram 的核心链路：Workflow、本地存储与宏注入',
        icon: Brain,
        id: 'intro',
        keywords: ['介绍', 'intro', '关于', 'about', '理念', 'workflow', 'indexeddb', '宏注入'],
        label: '项目介绍',
    },
    {
        component: GettingStarted,
        description: '按步骤完成模型接入、处理策略与运行验证',
        icon: Play,
        id: 'getting-started',
        keywords: ['配置', 'setup', '入门', 'start', 'api', 'embedding', 'rerank', 'preprocessing'],
        label: '配置指南',
    },
    {
        component: Deployment,
        description: 'VPS 云端部署排障：解决 Failed to fetch、HTTPS 混合内容与安全组策略',
        icon: Globe,
        id: 'deployment',
        keywords: ['部署', 'cloud', 'vps', 'nginx', 'https', 'fetch', 'error', 'failed', 'ip'],
        label: '云端部署',
    },
    {
        component: Features,
        description: '完整了解处理链路、检索机制、记忆流与生命周期管理',
        icon: Settings,
        id: 'features',
        keywords: ['功能', 'feature', 'rag', '总结', 'summary', 'vector', 'edit', 'trimmer', 'entity'],
        label: '功能指南',
    },
    {
        component: FAQ,
        description: '覆盖连接、工作流、RAG、预处理与数据生命周期的排障手册',
        icon: HelpCircle,
        id: 'faq',
        keywords: ['faq', '问题', 'help', '报错', 'error', 'debug', '日志', '排查', '召回'],
        label: '常见问题',
    },
];

