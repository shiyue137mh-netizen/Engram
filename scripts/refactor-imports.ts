/**
 * ts-morph 代码重构工具
 * 
 * 用法：
 *   npx ts-node scripts/refactor-imports.ts --dry-run
 *   npx ts-node scripts/refactor-imports.ts --apply
 * 
 * 功能：
 *   - 批量替换 import 路径
 *   - 安全的 AST 级别修改
 *   - 支持预览模式 (dry-run)
 */

import { Project, SourceFile, ImportDeclaration } from 'ts-morph';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM 兼容
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 路径映射规则
const importMappings: Record<string, string> = {
    // infrastructure -> 新路径
    '../infrastructure/logger': '@/lib/logger',
    '../../infrastructure/logger': '@/lib/logger',
    '../infrastructure/EventBus': '@/lib/events',
    '../../infrastructure/EventBus': '@/lib/events',
    '../infrastructure/SettingsManager': '@/services/settings/Persistence',
    '../../infrastructure/SettingsManager': '@/services/settings/Persistence',
    '../../../infrastructure/SettingsManager': '@/services/settings/Persistence',
    '../infrastructure/STBridge': '@/tavern/bridge',
    '../../infrastructure/STBridge': '@/tavern/bridge',
    '../infrastructure/STContext': '@/tavern/context',
    '../../infrastructure/STContext': '@/tavern/context',
    '../infrastructure/ThemeManager': '@/services/ThemeManager',
    '../../infrastructure/ThemeManager': '@/services/ThemeManager',
    '../../../infrastructure/ThemeManager': '@/services/ThemeManager',
    '../infrastructure/DexieDB': '@/services/database/db',
    '../../infrastructure/DexieDB': '@/services/database/db',
    '../infrastructure/tavern': '@/tavern/api',
    '../../infrastructure/tavern': '@/tavern/api',
    '../infrastructure/tavern/WorldInfoService': '@/tavern/api/WorldInfo',
    '../../infrastructure/tavern/WorldInfoService': '@/tavern/api/WorldInfo',

    // core -> services
    '../core/summarizer': '@/services/summarizer',
    '../../core/summarizer': '@/services/summarizer',
    '../core/api': '@/services/api',
    '../../core/api': '@/services/api',
    '../core/api/types': '@/services/api/types',
    '../../core/api/types': '@/services/api/types',
    '../../../core/api/types': '@/services/api/types',

    // views/components -> components/
    '../components/ModernButton': '@/components/ui/Button',
    '../../components/ModernButton': '@/components/ui/Button',
    '../components/Switch': '@/components/ui/Switch',
    '../../components/Switch': '@/components/ui/Switch',
    '../components/ItemCard': '@/components/common/ItemCard',
    '../../components/ItemCard': '@/components/common/ItemCard',
    '../components/ItemList': '@/components/common/ItemList',
    '../../components/ItemList': '@/components/common/ItemList',

    // views/Layout -> components/layout/
    '../Layout/MainLayout': '@/components/layout/MainLayout',
    './Layout/MainLayout': '@/components/layout/MainLayout',
    '../Layout/Header': '@/components/layout/Header',
    '../Layout/Sidebar': '@/components/layout/Sidebar',
    '../Layout/EngramIcon': '@/assets/icons/EngramIcon',
    '../Layout/EngramTextLogo': '@/assets/icons/EngramTextLogo',
    '../Layout/GlobalStyles': '@/assets/styles/GlobalStyles',
};

function refactorImports(dryRun: boolean = true) {
    const projectPath = path.resolve(__dirname, '..');

    // 初始化 ts-morph 项目
    const project = new Project({
        tsConfigFilePath: path.join(projectPath, 'tsconfig.json'),
    });

    console.log(`📁 项目路径: ${projectPath}`);
    console.log(`🔍 模式: ${dryRun ? 'DRY-RUN (预览)' : 'APPLY (应用变更)'}`);
    console.log('');

    const sourceFiles = project.getSourceFiles();
    let totalChanges = 0;
    const changedFiles: string[] = [];

    for (const sourceFile of sourceFiles) {
        const filePath = sourceFile.getFilePath();
        const relativePath = path.relative(projectPath, filePath);

        // 跳过 node_modules 和 dist
        if (relativePath.includes('node_modules') || relativePath.includes('dist')) {
            continue;
        }

        let fileChanged = false;
        const imports = sourceFile.getImportDeclarations();

        for (const importDecl of imports) {
            const moduleSpecifier = importDecl.getModuleSpecifierValue();

            // 检查是否匹配映射规则
            const newPath = importMappings[moduleSpecifier];
            if (newPath) {
                console.log(`  ${relativePath}:`);
                console.log(`    - "${moduleSpecifier}"`);
                console.log(`    + "${newPath}"`);

                if (!dryRun) {
                    importDecl.setModuleSpecifier(newPath);
                }

                totalChanges++;
                fileChanged = true;
            }
        }

        if (fileChanged) {
            changedFiles.push(relativePath);
        }
    }

    console.log('');
    console.log('='.repeat(50));
    console.log(`📊 总计: ${totalChanges} 处变更, ${changedFiles.length} 个文件`);

    if (!dryRun && totalChanges > 0) {
        console.log('💾 正在保存变更...');
        project.saveSync();
        console.log('✅ 变更已应用！');
    } else if (dryRun && totalChanges > 0) {
        console.log('');
        console.log('💡 这是预览模式。使用 --apply 参数应用变更：');
        console.log('   npx ts-node scripts/refactor-imports.ts --apply');
    } else {
        console.log('✅ 没有发现需要修改的导入路径！');
    }
}

// 解析命令行参数
const args = process.argv.slice(2);
const dryRun = !args.includes('--apply');

refactorImports(dryRun);
