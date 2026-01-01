#!/bin/bash
# Engram 引用路径统一替换脚本
# 将所有相对路径引用替换为 @/ 别名

cd /Users/macbookair/SillyTavern/public/scripts/extensions/Engram_project

echo "开始替换引用路径..."

# === 替换 infrastructure 引用 ===
echo "替换 infrastructure 引用..."

# infrastructure/logger -> @/lib/logger
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/infrastructure\/logger['\''"]|from "@/lib/logger"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/\.\.\/infrastructure\/logger['\''"]|from "@/lib/logger"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/\.\.\/\.\.\/infrastructure\/logger['\''"]|from "@/lib/logger"|g' {} \;

# infrastructure/logger/ModelLogger
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/\.\.\/infrastructure\/logger\/ModelLogger['\''"]|from "@/lib/logger/ModelLogger"|g' {} \;

# infrastructure/logger/types  
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/\.\.\/infrastructure\/logger\/types['\''"]|from "@/lib/logger/types"|g' {} \;

# infrastructure/DexieDB -> @/services/database/db
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/\.\.\/infrastructure\/DexieDB['\''"]|from "@/services/database/db"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/infrastructure\/DexieDB['\''"]|from "@/services/database/db"|g' {} \;

# infrastructure/SettingsManager -> @/services/settings/Persistence
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/\.\.\/infrastructure\/SettingsManager['\''"]|from "@/services/settings/Persistence"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/infrastructure\/SettingsManager['\''"]|from "@/services/settings/Persistence"|g' {} \;

# infrastructure/tavern -> @/tavern/api
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/\.\.\/infrastructure\/tavern['\''"]|from "@/tavern/api"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/infrastructure\/tavern['\''"]|from "@/tavern/api"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\/tavern['\''"]|from "@/tavern/api"|g' {} \;

# infrastructure/EventBus -> @/lib/events
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/\.\.\/infrastructure\/EventBus['\''"]|from "@/lib/events"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/infrastructure\/EventBus['\''"]|from "@/lib/events"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\/EventBus['\''"]|from "@/lib/events"|g' {} \;

# infrastructure/STBridge -> @/tavern/bridge
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/infrastructure\/STBridge['\''"]|from "@/tavern/bridge"|g' {} \;

# infrastructure/STContext -> @/tavern/context
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/infrastructure\/STContext['\''"]|from "@/tavern/context"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\/STContext['\''"]|from "@/tavern/context"|g' {} \;

# infrastructure/ThemeManager -> @/services/ThemeManager
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/infrastructure\/ThemeManager['\''"]|from "@/services/ThemeManager"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\/ThemeManager['\''"]|from "@/services/ThemeManager"|g' {} \;

# infrastructure/UpdateService -> @/services/updater
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/infrastructure\/UpdateService['\''"]|from "@/services/updater"|g' {} \;

# infrastructure/WorldBookStateService -> @/services/WorldBookStateService
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/infrastructure\/WorldBookStateService['\''"]|from "@/services/WorldBookStateService"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\/WorldBookStateService['\''"]|from "@/services/WorldBookStateService"|g' {} \;

# infrastructure/ModelService -> @/services/api/ModelDiscovery
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/infrastructure\/ModelService['\''"]|from "@/services/api/ModelDiscovery"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\/ModelService['\''"]|from "@/services/api/ModelDiscovery"|g' {} \;

# infrastructure/NotificationService -> @/services/NotificationService
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/infrastructure\/NotificationService['\''"]|from "@/services/NotificationService"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\/NotificationService['\''"]|from "@/services/NotificationService"|g' {} \;

echo "替换 core 引用..."

# core/summarizer -> @/services/summarizer
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/core\/summarizer['\''"]|from "@/services/summarizer"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/\.\.\/core\/summarizer['\''"]|from "@/services/summarizer"|g' {} \;

# core/api -> @/services/api
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/core\/api['\''"]|from "@/services/api"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/\.\.\/core\/api['\''"]|from "@/services/api"|g' {} \;

# core/services/CharacterDeleteService -> @/services/CharacterDeleteService
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/core\/services\/CharacterDeleteService['\''"]|from "@/services/CharacterDeleteService"|g' {} \;

echo "替换 views/components 引用..."

# views/components/XXX -> @/components/
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/components\/ModernButton['\''"]|from "@/components/ui/Button"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/components\/Switch['\''"]|from "@/components/ui/Switch"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/components\/TabPills['\''"]|from "@/components/ui/TabPills"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/components\/ItemCard['\''"]|from "@/components/common/ItemCard"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/components\/ItemList['\''"]|from "@/components/common/ItemList"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/components\/PageTitle['\''"]|from "@/components/common/PageTitle"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/components\/RevisionModal['\''"]|from "@/components/ui/Modal"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/components\/UpdateNotice['\''"]|from "@/components/common/UpdateNotice"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/components\/WelcomeAnimation['\''"]|from "@/components/visual/WelcomeAnimation"|g' {} \;

echo "替换 views/Layout 引用..."

# views/Layout/XXX -> @/components/layout/
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\/Layout\/MainLayout['\''"]|from "@/components/layout/MainLayout"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/Layout\/MainLayout['\''"]|from "@/components/layout/MainLayout"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/Layout\/Header['\''"]|from "@/components/layout/Header"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/Layout\/Divider['\''"]|from "@/components/layout/Divider"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/Layout\/Sidebar['\''"]|from "@/components/layout/Sidebar"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/Layout\/EngramIcon['\''"]|from "@/assets/icons/EngramIcon"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/Layout\/EngramTextLogo['\''"]|from "@/assets/icons/EngramTextLogo"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/Layout\/GlobalStyles['\''"]|from "@/assets/styles/GlobalStyles"|g' {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's|from ['\''"]\.\.\/Layout\/CommandPalette['\''"]|from "@/components/ui/CommandPalette"|g' {} \;

# 动态 import 替换
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' "s|await import('./logger')|await import('@/lib/logger')|g" {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' "s|await import('../lib/logger')|await import('@/lib/logger')|g" {} \;

echo ""
echo "=== 引用替换完成 ==="
echo "运行 npm run build 验证..."
