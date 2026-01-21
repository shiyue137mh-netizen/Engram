/**
 * 文档内容注册表
 * V0.9.11
 */

import { Play, Settings, BookOpen, Bug, Brain, HelpCircle } from 'lucide-react';
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
        keywords: ['介绍', 'intro', '关于', 'about', '理念'],
        description: '了解 Engram 的核心理念与架构',
    },
    {
        id: 'getting-started',
        label: '配置指南',
        icon: Play,
        component: GettingStarted,
        keywords: ['配置', 'setup', '入门', 'start', 'api'],
        description: 'Engram 首次配置与使用指南',
    },
    {
        id: 'features',
        label: '功能指南',
        icon: Settings,
        component: Features,
        keywords: ['功能', 'feature', 'rag', '总结', 'summary', 'vector', 'edit'],
        description: '深入了解自动总结、RAG 和数据管理',
    },
    {
        id: 'faq',
        label: '常见问题',
        icon: HelpCircle,
        component: FAQ,
        keywords: ['faq', '问题', 'help', '报错', 'error', 'debug'],
        description: '常见问题解答与故障排查',
    },
];

export default DOCS;
