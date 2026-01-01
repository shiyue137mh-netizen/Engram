#!/bin/bash
# Engram 文件架构重构迁移脚本
# 阶段 2-4：UI 组件、业务逻辑、Tavern 层迁移

cd /Users/macbookair/SillyTavern/public/scripts/extensions/Engram_project

echo "开始迁移..."

# === 阶段 2：UI 组件原子化 ===
echo "阶段 2：UI 组件原子化"
mkdir -p src/components/{ui,layout,visual,common}
mkdir -p src/assets/{icons,styles}

# 原子组件 -> components/ui/
git mv src/views/components/ModernButton.tsx src/components/ui/Button.tsx 2>/dev/null || echo "  跳过 ModernButton"
git mv src/views/components/Switch.tsx src/components/ui/Switch.tsx 2>/dev/null || echo "  跳过 Switch"
git mv src/views/components/TabPills.tsx src/components/ui/TabPills.tsx 2>/dev/null || echo "  跳过 TabPills"
git mv src/views/components/RevisionModal.tsx src/components/ui/Modal.tsx 2>/dev/null || echo "  跳过 RevisionModal"
git mv src/views/Layout/CommandPalette.tsx src/components/ui/CommandPalette.tsx 2>/dev/null || echo "  跳过 CommandPalette"

# 通用组件 -> components/common/
git mv src/views/components/ItemCard.tsx src/components/common/ItemCard.tsx 2>/dev/null || echo "  跳过 ItemCard"
git mv src/views/components/ItemList.tsx src/components/common/ItemList.tsx 2>/dev/null || echo "  跳过 ItemList"
git mv src/views/components/PageTitle.tsx src/components/common/PageTitle.tsx 2>/dev/null || echo "  跳过 PageTitle"
git mv src/views/components/QuickLinks.tsx src/components/common/QuickLinks.tsx 2>/dev/null || echo "  跳过 QuickLinks"
git mv src/views/components/UpdateNotice.tsx src/components/common/UpdateNotice.tsx 2>/dev/null || echo "  跳过 UpdateNotice"

# 视觉组件 -> components/visual/
git mv src/views/components/WelcomeAnimation.tsx src/components/visual/WelcomeAnimation.tsx 2>/dev/null || echo "  跳过 WelcomeAnimation"
git mv src/views/Dashboard/components/NeuralOrb.tsx src/components/visual/NeuralOrb.tsx 2>/dev/null || echo "  跳过 NeuralOrb"

# 布局组件 -> components/layout/
git mv src/views/Layout/MainLayout.tsx src/components/layout/MainLayout.tsx 2>/dev/null || echo "  跳过 MainLayout"
git mv src/views/Layout/Header.tsx src/components/layout/Header.tsx 2>/dev/null || echo "  跳过 Header"
git mv src/views/Layout/Divider.tsx src/components/layout/Divider.tsx 2>/dev/null || echo "  跳过 Divider"
git mv src/views/Layout/Sidebar src/components/layout/Sidebar 2>/dev/null || echo "  跳过 Sidebar"

# 静态资源 -> assets/
git mv src/views/Layout/EngramIcon.tsx src/assets/icons/EngramIcon.tsx 2>/dev/null || echo "  跳过 EngramIcon"
git mv src/views/Layout/EngramTextLogo.tsx src/assets/icons/EngramTextLogo.tsx 2>/dev/null || echo "  跳过 EngramTextLogo"
git mv src/views/Layout/GlobalStyles.tsx src/assets/styles/GlobalStyles.tsx 2>/dev/null || echo "  跳过 GlobalStyles"

echo "阶段 2 完成"

# === 阶段 3：业务逻辑归位 ===
echo "阶段 3：业务逻辑归位"
mkdir -p src/services/{api,database,summarizer,settings,updater,pipeline,rag,memory}

# core -> services
git mv src/core/summarizer/* src/services/summarizer/ 2>/dev/null || echo "  跳过 summarizer"
git mv src/core/api/* src/services/api/ 2>/dev/null || echo "  跳过 api"
git mv src/core/pipeline/* src/services/pipeline/ 2>/dev/null || echo "  跳过 pipeline"
git mv src/core/rag/* src/services/rag/ 2>/dev/null || echo "  跳过 rag"
git mv src/core/memory/* src/services/memory/ 2>/dev/null || echo "  跳过 memory"
git mv src/core/types src/services/types 2>/dev/null || echo "  跳过 types"
git mv src/core/services/* src/services/ 2>/dev/null || echo "  跳过 core/services"

# infrastructure -> services
git mv src/infrastructure/DexieDB.ts src/services/database/db.ts 2>/dev/null || echo "  跳过 DexieDB"
git mv src/infrastructure/UpdateService.ts src/services/updater/index.ts 2>/dev/null || echo "  跳过 UpdateService"
git mv src/infrastructure/SettingsManager.ts src/services/settings/Persistence.ts 2>/dev/null || echo "  跳过 SettingsManager"
git mv src/infrastructure/ModelService.ts src/services/api/ModelDiscovery.ts 2>/dev/null || echo "  跳过 ModelService"
git mv src/infrastructure/NotificationService.ts src/services/NotificationService.ts 2>/dev/null || echo "  跳过 NotificationService"
git mv src/infrastructure/ThemeManager.ts src/services/ThemeManager.ts 2>/dev/null || echo "  跳过 ThemeManager"
git mv src/infrastructure/WorldBookStateService.ts src/services/WorldBookStateService.ts 2>/dev/null || echo "  跳过 WorldBookStateService"

echo "阶段 3 完成"

# === 阶段 4：Tavern 适配层 ===
echo "阶段 4：Tavern 适配层"
mkdir -p src/tavern/api

git mv src/infrastructure/STBridge.ts src/tavern/bridge.ts 2>/dev/null || echo "  跳过 STBridge"
git mv src/infrastructure/STContext.ts src/tavern/context.ts 2>/dev/null || echo "  跳过 STContext"
git mv src/infrastructure/tavern/MessageService.ts src/tavern/api/Message.ts 2>/dev/null || echo "  跳过 MessageService"
git mv src/infrastructure/tavern/WorldInfoService.ts src/tavern/api/WorldInfo.ts 2>/dev/null || echo "  跳过 WorldInfoService"
git mv src/infrastructure/tavern/index.ts src/tavern/api/index.ts 2>/dev/null || echo "  跳过 tavern/index"

echo "阶段 4 完成"
echo ""
echo "=== 所有迁移完成 ==="
echo "下一步：统一替换引用为 @/ 别名"
