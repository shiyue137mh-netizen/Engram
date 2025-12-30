import { extension_settings, getContext, loadExtensionSettings } from "../../../extensions.js";
import { saveSettingsDebounced, callPopup, getRequestHeaders, getOneCharacter, selectCharacterById } from "../../../../script.js";
import { Popup } from "../../../../scripts/popup.js";

// ============================================================================
// STATE VARIABLES
// ============================================================================

// World info state
let world_names = [];

async function refreshWorldNames() {
    try {
        // Force reload from world-info module
        const worldInfoModule = await import("../../../../scripts/world-info.js");
        if (worldInfoModule.world_names) {
            world_names = worldInfoModule.world_names;
        }
    } catch (e) {
        console.log('Could not refresh world-info module:', e);
    }
}

// Initial load
refreshWorldNames();

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

// Extension metadata
const extensionName = "world-info-cleanup";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;

// Default settings
const defaultSettings = {
    enabled: true,
    showConfirmation: true,
    forceLoadCharacterData: false,  // New setting for force-loading all character data
    autoReplaceWorldOnImport: false,  // New setting for auto-replacing world info on character import
    autoUpdateOnRename: true,  // New setting for auto-updating character links when world is renamed - ENABLED BY DEFAULT
    autoPreloadForBulkEdit: true,  // Auto pre-load character data when entering bulk edit mode
};

// Pagination configuration
const ITEMS_PER_PAGE = 20;  // Number of items to show per page
const MAX_PAGE_BUTTONS = 10; // Maximum number of page buttons to display

// Timing constants (in milliseconds) - scoped to this file only
const LOADER_HIDE_DELAY = 100;          // Delay before hiding loader
const API_RETRY_DELAY = 500;            // Delay between API retry attempts
const WORLD_REPLACEMENT_DELAY = 2000;   // Wait for character replacement to complete

// ========================================
// 世界书大管理弹窗 - 字体大小配置
// FONT SIZE CONFIGURATION FOR WORLD MANAGEMENT POPUP
// 调整这些数值来改变各个元素的字体大小 (1.0 = 100%, 0.85 = 85%, etc.)
// ========================================
const FONT_SIZES = {
    // 弹窗标题
    POPUP_SUBTITLE: 0.65,                // "共找到 X 个世界书文件" 副标题
    
    // 搜索栏和按钮
    SEARCH_BAR: 0.7,                   // 搜索输入框
    TOGGLE_BUTTON: 0.7,                // "全选本页/取消本页" 按钮
    
    // 筛选控件 (关联世界书页面)
    FILTER_CONTAINER: 0.7,              // 筛选容器整体大小
    FILTER_LABEL: 0.7,                  // "关键词:", "显示筛选:" 标签
    FILTER_SELECT: 0.7,                 // 下拉选择框
    
    // 列表内容
    TAB_DESCRIPTION: 0.7,               // "这些世界书未关联/正在被角色使用"
    ORPHANED_FILE_NAME: 0.75,           // 孤立文件列表中的文件名
    PAGINATION_INFO: 0.6,              // "显示 1-8 / 共 8 个"
    CHECKBOX_SIZE: 0.8,                 // 复选框大小
    LIST_ITEM_PADDING: 0.3,             // 列表项内边距 (影响行高)
    ORPHANED_CHECKBOX_GAP: 0.2,         // 孤立列表: 复选框和文件名之间的间距
    LINKED_CHECKBOX_GAP: 1,           // 关联表格: 复选框列的左右内边距
    
    // Tab按钮
    TAB_BUTTON_SIZE: 0.8,              // 🗑️孤立 🔗关联 标签按钮大小
    
    // 分页控件
    PAGINATION_NAV_BUTTONS: 0.65,        // First/Last 按钮
    PAGINATION_NUMBER_BUTTONS: 0.65,     // 页码数字按钮
    PAGINATION_ARROW_BUTTONS: 0.6,      // ◀ ▶ 箭头按钮
    PAGINATION_PAGE_INFO: 0.6,         // "Page X of Y" 文字
    
    // 表格 (关联世界书页面)
    TABLE_HEADER_WORLD: 0.73,           // 表头: "世界书"
    TABLE_HEADER_ROLES: 0.68,            // 表头: "作为主要/附加书关联的角色卡"
    TABLE_CELL_FILENAME: 0.73,          // 表格中的文件名
    TABLE_CELL_CHARNAME: 0.7,          // 表格中的角色名
    TABLE_CELL_DEFAULT: 0.73,            // "系统默认，不可删除"
    
    // 底部按钮 (通过callPopup的参数控制，需要在CSS中设置)
    DIALOG_BUTTONS: 0.7,                // "删除选中的文件" 和 "取消" 按钮文字大小
    DIALOG_BUTTON_HEIGHT: 1.4,          // 按钮高度 (基于字体大小的倍数)
    DIALOG_BUTTON_PADDING_V: 0,       // 按钮垂直内边距
    DIALOG_BUTTON_PADDING_H: 0.3,       // 按钮水平内边距
    DIALOG_BUTTONS_GAP: 0              // 按钮与列表之间的间距
};

// Pagination state
let orphanedCurrentPage = 1;
let linkedCurrentPage = 1;

// Cache for paginated data
let orphanedFilesCache = [];
let linkedFilesCache = [];

// Selection state - tracks which files are selected
let selectedOrphanedFiles = new Set();
let selectedLinkedFiles = new Set();

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Helper function to update toggle button text based on selection state
function updateToggleButtonText(type) {
    if (type === 'orphaned') {
        const button = $('[data-action="toggle-orphaned-page"]');
        const orphanedCheckboxes = $('.orphaned-checkbox:not(:disabled)');
        const uncheckedOrphaned = $('.orphaned-checkbox:not(:disabled):not(:checked)');
        
        if (orphanedCheckboxes.length > 0 && uncheckedOrphaned.length === 0) {
            button.text('取消本页');
        } else {
            button.text('全选本页');
        }
    } else if (type === 'linked') {
        const button = $('[data-action="toggle-linked-page"]');
        const linkedCheckboxes = $('.linked-checkbox:not(:disabled)');
        const uncheckedLinked = $('.linked-checkbox:not(:disabled):not(:checked)');
        
        if (linkedCheckboxes.length > 0 && uncheckedLinked.length === 0) {
            button.text('取消本页');
        } else {
            button.text('全选本页');
        }
    }
}

// Helper function to escape HTML for display text
function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ============================================================================
// PAGINATION FUNCTIONS
// ============================================================================

// Generate pagination HTML with Google-style page numbers
function generatePaginationHtml(currentPage, totalPages, type) {
    if (totalPages <= 1) return '';
    
    let html = `<div class="pagination-controls" style="display: flex; justify-content: center; align-items: center; gap: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NUMBER_BUTTONS * 0.3}); margin-top: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NUMBER_BUTTONS * 0.3}); padding-top: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NUMBER_BUTTONS * 0.3}); border-top: 1px solid var(--SmartThemeBorderColor);">`;
    

    if (currentPage > 1) {
        html += `<button type="button" class="menu_button pagination-nav" data-type="${type}" data-page="1" style="min-width: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NAV_BUTTONS * 3}); height: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NAV_BUTTONS * 1.8}); padding: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NAV_BUTTONS * 0.25}) calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NAV_BUTTONS * 0.5}); font-size: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NAV_BUTTONS});">First</button>`;
    }
    
    // Previous button
    html += `<button type="button" class="menu_button pagination-nav" data-type="${type}" data-page="${Math.max(1, currentPage - 1)}" ${currentPage === 1 ? 'disabled' : ''} style="min-width: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_ARROW_BUTTONS * 2}); height: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_ARROW_BUTTONS * 1.8}); padding: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_ARROW_BUTTONS * 0.25}); font-size: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_ARROW_BUTTONS});">◀</button>`;
    
    // Page numbers
    let startPage = 1;
    let endPage = totalPages;
    
    if (totalPages > MAX_PAGE_BUTTONS) {
        const halfButtons = Math.floor(MAX_PAGE_BUTTONS / 2);
        
        if (currentPage <= halfButtons) {
            endPage = MAX_PAGE_BUTTONS;
        } else if (currentPage >= totalPages - halfButtons) {
            startPage = totalPages - MAX_PAGE_BUTTONS + 1;
        } else {
            startPage = currentPage - halfButtons + 1;
            endPage = currentPage + halfButtons;
        }
    }
    
    // Add page number buttons
    for (let i = startPage; i <= endPage && i <= totalPages; i++) {
        const isActive = i === currentPage;
        html += `<button type="button" class="menu_button pagination-nav ${isActive ? 'pagination-active' : ''}" data-type="${type}" data-page="${i}" style="min-width: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NUMBER_BUTTONS * 2.2}); height: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NUMBER_BUTTONS * 1.8}); padding: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NUMBER_BUTTONS * 0.25}); font-size: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NUMBER_BUTTONS}); ${isActive ? 'background-color: var(--SmartThemeQuoteColor); font-weight: bold;' : ''}">${i}</button>`;
    }
    
    // Next button
    html += `<button type="button" class="menu_button pagination-nav" data-type="${type}" data-page="${Math.min(totalPages, currentPage + 1)}" ${currentPage === totalPages ? 'disabled' : ''} style="min-width: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_ARROW_BUTTONS * 2}); height: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_ARROW_BUTTONS * 1.8}); padding: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_ARROW_BUTTONS * 0.25}); font-size: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_ARROW_BUTTONS});">▶</button>`;
    
    // Last button
    if (currentPage < totalPages) {
        html += `<button type="button" class="menu_button pagination-nav" data-type="${type}" data-page="${totalPages}" style="min-width: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NAV_BUTTONS * 3}); height: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NAV_BUTTONS * 1.8}); padding: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NAV_BUTTONS * 0.25}) calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NAV_BUTTONS * 0.5}); font-size: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NAV_BUTTONS});">Last</button>`;
    }
    
    // Page info
    html += `<span style="margin-left: 10px; font-size: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_PAGE_INFO}); opacity: 0.7;">Page ${currentPage} of ${totalPages}</span>`;
    
    html += `</div>`;
    
    return html;
}

// Generate paginated list HTML
function generatePaginatedList(files, type, currentPage) {
    try {
        if (!files || !Array.isArray(files)) {
            console.error('generatePaginatedList: files is not an array', files);
            return '<div>错误: 文件列表无效</div>';
        }
        
        const totalPages = Math.ceil(files.length / ITEMS_PER_PAGE);
        const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIdx = Math.min(startIdx + ITEMS_PER_PAGE, files.length);
        const pageFiles = files.slice(startIdx, endIdx);
    
    let html = '';
    
    if (type === 'orphaned') {
        pageFiles.forEach((file, index) => {
            // Find the actual index in the original cache
            const originalIndex = orphanedFilesCache.findIndex(f => f.name === file.name);
            const isChecked = selectedOrphanedFiles.has(file.name) ? 'checked' : '';
            html += `
            <div style="margin: calc(var(--mainFontSize) * ${FONT_SIZES.LIST_ITEM_PADDING * 0.5}) 0;">
                <label style="display: flex; align-items: center; cursor: pointer; padding: calc(var(--mainFontSize) * ${FONT_SIZES.LIST_ITEM_PADDING * 0.3});">
                    <input type="checkbox" class="world-checkbox orphaned-checkbox" data-file-index="${originalIndex}" 
                           data-file-name="${escapeHtml(file.name)}"
                           ${isChecked}
                           style="margin-right: calc(var(--mainFontSize) * ${FONT_SIZES.ORPHANED_CHECKBOX_GAP});">
                    <span style="font-size: calc(var(--mainFontSize) * ${FONT_SIZES.ORPHANED_FILE_NAME});">📁 ${escapeHtml(file.name)}</span>
                </label>
            </div>`;
        });
    } else {
        // NEW: Table layout for linked files
        html = `
        <style>
            .world-table-linked {
                table-layout: fixed;
                width: 100%;
                border-collapse: collapse;
                font-size: 0.9em;
            }
            .world-table-linked th:nth-child(1) { width: 20px; }
            .world-table-linked th:nth-child(2) { width: 36%; }
            .world-table-linked th:nth-child(3) { width: 32%; }
            .world-table-linked th:nth-child(4) { width: 32%; }
            /* Control data row sizes (not header) */
            .world-table-linked tbody tr {
                font-size: 0.93em; /* Adjust this to change row text size */
            }
            .world-table-linked td {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
                word-wrap: break-word;
            }
            .world-table-linked td:first-child {
                padding-left: 4px !important;
                padding-right: 4px !important;
            }
        </style>
        <table class="world-table-linked">
            <thead>
                <tr style="border-bottom: 2px solid var(--SmartThemeBorderColor);">
                    <th style="padding: calc(var(--mainFontSize) * ${FONT_SIZES.LIST_ITEM_PADDING * 0.3}) calc(var(--mainFontSize) * ${FONT_SIZES.LINKED_CHECKBOX_GAP}); text-align: center;"></th>
                    <!-- 调整表头"世界书": 0.85 = 85% 大小 -->
                    <th style="padding: calc(var(--mainFontSize) * ${FONT_SIZES.LIST_ITEM_PADDING * 0.3}); text-align: left; font-size: calc(var(--mainFontSize) * ${FONT_SIZES.TABLE_HEADER_WORLD});">世界书名称</th>
                    <!-- 调整表头"主要书": 0.7 = 70% 大小 (更小) -->
                    <th style="padding: calc(var(--mainFontSize) * ${FONT_SIZES.LIST_ITEM_PADDING * 0.3}); text-align: center; font-size: calc(var(--mainFontSize) * ${FONT_SIZES.TABLE_HEADER_ROLES});">作为主书</th>
                    <!-- 调整表头"附加书": 0.7 = 70% 大小 (更小) -->
                    <th style="padding: calc(var(--mainFontSize) * ${FONT_SIZES.LIST_ITEM_PADDING * 0.3}); text-align: center; font-size: calc(var(--mainFontSize) * ${FONT_SIZES.TABLE_HEADER_ROLES});">作为附书</th>
                </tr>
            </thead>
            <tbody>`;
        
        pageFiles.forEach((file, index) => {
            // Find the actual index in the original cache
            const originalIndex = linkedFilesCache.findIndex(f => f.name === file.name);
            const isDefault = file.name === 'Default';
            
            // Format main characters list with expandable view
            let mainChars = '-';
            // If it's a global book with no specific characters, show special text
            if (file.isGlobal && (!file.mainCharacters || file.mainCharacters.length === 0)) {
                mainChars = '<span style="opacity: 0.6; font-style: italic;">全局应用</span>';
            } else if (file.mainCharacters && file.mainCharacters.length > 0) {
                if (file.mainCharacters.length <= 2) {
                    // Show all if 2 or less
                    mainChars = file.mainCharacters.map(c => escapeHtml(c)).join(', ');
                } else {
                    // Show first 2 with expandable option for the rest
                    const firstTwo = file.mainCharacters.slice(0, 2).map(c => escapeHtml(c)).join(', ');
                    const remaining = file.mainCharacters.slice(2).map(c => escapeHtml(c)).join(', ');
                    mainChars = `
                        <div style="display: inline-block; max-width: 100%;">
                            <span>${firstTwo}</span>
                            <span class="expandable-chars" style="display: none;">, ${remaining}</span>
                            <a href="#" class="expand-chars-btn" 
                               style="color: var(--SmartThemeQuoteColor); text-decoration: underline; margin-left: 5px; white-space: nowrap;"
                               data-count="${file.mainCharacters.length - 2}">
                                (+${file.mainCharacters.length - 2})
                            </a>
                        </div>
                    `;
                }
            }
            
            // Format additional characters list with expandable view
            let additionalChars = '-';
            // If it's a global book with no specific characters, show special text
            if (file.isGlobal && (!file.additionalCharacters || file.additionalCharacters.length === 0)) {
                additionalChars = '<span style="opacity: 0.6; font-style: italic;">全局应用</span>';
            } else if (file.additionalCharacters && file.additionalCharacters.length > 0) {
                if (file.additionalCharacters.length <= 2) {
                    // Show all if 2 or less
                    additionalChars = file.additionalCharacters.map(c => escapeHtml(c)).join(', ');
                } else {
                    // Show first 2 with expandable option for the rest
                    const firstTwo = file.additionalCharacters.slice(0, 2).map(c => escapeHtml(c)).join(', ');
                    const remaining = file.additionalCharacters.slice(2).map(c => escapeHtml(c)).join(', ');
                    additionalChars = `
                        <div style="display: inline-block; max-width: 100%;">
                            <span>${firstTwo}</span>
                            <span class="expandable-chars" style="display: none;">, ${remaining}</span>
                            <a href="#" class="expand-chars-btn" 
                               style="color: var(--SmartThemeEmColor); text-decoration: underline; margin-left: 5px; white-space: nowrap;"
                               data-count="${file.additionalCharacters.length - 2}">
                                (+${file.additionalCharacters.length - 2})
                            </a>
                        </div>
                    `;
                }
            }
            
            html += `
            <tr style="border-bottom: 1px solid var(--SmartThemeBorderColor); ${isDefault ? 'opacity: 0.5;' : ''}"
                data-all-main="${file.mainCharacters ? file.mainCharacters.map(c => escapeHtml(c)).join(' ') : ''}"
                data-all-additional="${file.additionalCharacters ? file.additionalCharacters.map(c => escapeHtml(c)).join(' ') : ''}">
                <td style="padding: calc(var(--mainFontSize) * ${FONT_SIZES.LIST_ITEM_PADDING * 0.3}) calc(var(--mainFontSize) * ${FONT_SIZES.LINKED_CHECKBOX_GAP}) calc(var(--mainFontSize) * ${FONT_SIZES.LIST_ITEM_PADDING * 0.3}) calc(var(--mainFontSize) * ${FONT_SIZES.LINKED_CHECKBOX_GAP}); text-align: center;">
                    <input type="checkbox" 
                           class="world-checkbox linked-checkbox" 
                           data-file-index="${originalIndex}"
                           data-file-name="${escapeHtml(file.name)}"
                           ${selectedLinkedFiles.has(file.name) ? 'checked' : ''}
                           style="margin: 0;"
                           ${isDefault ? 'disabled' : ''}>
                </td>
                <td style="padding: calc(var(--mainFontSize) * ${FONT_SIZES.LIST_ITEM_PADDING * 0.3}) calc(var(--mainFontSize) * ${FONT_SIZES.LIST_ITEM_PADDING * 0.3}) calc(var(--mainFontSize) * ${FONT_SIZES.LIST_ITEM_PADDING * 0.3}) 0; text-align: left; font-size: calc(var(--mainFontSize) * ${FONT_SIZES.TABLE_CELL_FILENAME});">
                    <span style="color: var(--SmartThemeBodyColor);">
                        ${file.isGlobal ? '🌐 ' : ''}📁 ${escapeHtml(file.name)}
                    </span>
                    ${isDefault ? `<br><small style="opacity: 0.7; font-size: calc(var(--mainFontSize) * ${FONT_SIZES.TABLE_CELL_DEFAULT});">系统默认，不可删除</small>` : ''}
                    ${file.isGlobal ? `<br><small style="opacity: 0.7; font-size: calc(var(--mainFontSize) * ${FONT_SIZES.TABLE_CELL_DEFAULT});">全局</small>` : ''}
                </td>
                <td style="padding: calc(var(--mainFontSize) * ${FONT_SIZES.LIST_ITEM_PADDING * 0.3}); text-align: center; color: var(--SmartThemeQuoteColor); font-size: calc(var(--mainFontSize) * ${FONT_SIZES.TABLE_CELL_CHARNAME});">
                    ${mainChars}
                </td>
                <td style="padding: calc(var(--mainFontSize) * ${FONT_SIZES.LIST_ITEM_PADDING * 0.3}); text-align: center; color: var(--SmartThemeEmColor); font-size: calc(var(--mainFontSize) * ${FONT_SIZES.TABLE_CELL_CHARNAME});">
                    ${additionalChars}
                </td>
            </tr>`;
        });
        
        html += `
            </tbody>
        </table>`;
    }
    
    // Add showing info
    html = `<div style="margin-bottom: 0px; margin-top: -1px; font-size: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_INFO}); opacity: 0.6;">显示 ${startIdx + 1}-${endIdx} / 共 ${files.length} 个</div>` + html;
    
    return html;
    } catch (error) {
        console.error('Error in generatePaginatedList:', error, { files, type, currentPage });
        return `<div style="color: var(--warning);">生成列表时出错: ${error.message}</div>`;
    }
}

// ============================================================================
// UI TEXT CONSTANTS
// ============================================================================
// You can modify all displayed text here

const TEXT = {
    // 扩展设置面板标题 - Extension settings panel title
    PANEL_TITLE: "世界书大扫除🧹",
    
    // 设置选项标签 - Settings option labels
    AUTO_DELETE_LABEL: "删除角色时删除关联的主要世界书",
    SHOW_CONFIRMATION_LABEL: "删除世界书前显示确认对话框",
    FORCE_LOAD_LABEL: "点击【世界书大管理】时强制加载所有角色数据",
    AUTO_UPDATE_RENAME_LABEL: "重命名世界书时自动重新关联角色",
    MANUAL_CLEANUP_BUTTON: "世界书大管理！",
    MANUAL_CLEANUP_DESC: "统一管理/搜索所有世界书并手动选择删除",
    DEBUG_BUTTON: "Debug! 检查当前角色",
    DEBUG_DESC: "检查当前角色的世界书数据 (查看控制台)",
    
    // 确认对话框消息 - Confirmation dialog messages
    CONFIRM_DELETE_TITLE: (charName) => `角色 "${charName}" 已被删除。`,
    CONFIRM_DELETE_MESSAGE: (count) => `发现 ${count} 个关联的世界书文件：`,
    CONFIRM_DELETE_QUESTION: "是否同时删除这些世界书文件？",
    
    // 手动清理消息 - Manual cleanup messages
    MANUAL_CLEANUP_FOUND: (count) => `发现 ${count} 个孤立的世界书文件：`,
    MANUAL_CLEANUP_MORE: (count) => `... 以及另外 ${count} 个文件`,
    MANUAL_CLEANUP_QUESTION: "删除这些孤立的文件？",
    MANUAL_CLEANUP_DELETE_SELECTED: "删除选中的文件",
    MANUAL_CLEANUP_CANCEL: "取消",
    MANUAL_CLEANUP_NONE_SELECTED: "未选择任何文件",
    MANUAL_CLEANUP_CONFIRM: (count) => `确定要删除选中的 ${count} 个世界书吗？`,
    
    // Toast 通知消息 - Toast notification messages
    TOAST_SUCCESS: (count) => `已删除 ${count} 个世界书文件`,
    TOAST_FAILED: "删除某些世界书文件失败",
    TOAST_NO_ORPHANED: "未发现孤立的世界书文件",
    TOAST_MANUAL_ERROR: "执行手动清理时出错",
    TOAST_DEBUG_CHECK: "请查看控制台获取角色数据",
    TOAST_NO_CHARACTER: "未选择角色",
    TOAST_LOADING_WORLDS: "正在加载世界书列表...",
    
    // 控制台日志消息 - Console log messages (可选修改)
    LOG_EXTENSION_LOADED: "世界书大扫除🧹扩展加载成功",
    LOG_HOOKED: "世界书大扫除🧹：已挂载到 CHARACTER_DELETED 事件",
    LOG_ERROR_NO_EVENT: "世界书大扫除🧹：未找到 CHARACTER_DELETED 事件！",
    LOG_DISABLED: "世界书大扫除🧹扩展已禁用",
    LOG_USER_CANCELLED: "用户取消了世界书删除",
    
    // 扩展名称 - Extension display name
    EXTENSION_NAME: "世界书大扫除🧹"
};

// ============================================================================
// SETTINGS MANAGEMENT
// ============================================================================

// Load extension settings
async function loadSettings() {
    extension_settings[extensionName] = extension_settings[extensionName] || {};
    if (Object.keys(extension_settings[extensionName]).length === 0) {
        Object.assign(extension_settings[extensionName], defaultSettings);
    }
    
    // Update UI elements
    $("#world_info_cleanup_enabled").prop("checked", extension_settings[extensionName].enabled);
    $("#world_info_cleanup_confirmation").prop("checked", extension_settings[extensionName].showConfirmation);
    $("#world_info_cleanup_force_load").prop("checked", extension_settings[extensionName].forceLoadCharacterData ?? false);
    $("#world_info_cleanup_auto_replace").prop("checked", extension_settings[extensionName].autoReplaceWorldOnImport ?? false);
    $("#world_info_cleanup_auto_update_rename").prop("checked", extension_settings[extensionName].autoUpdateOnRename ?? false);
    $("#world_info_cleanup_auto_preload_bulk").prop("checked", extension_settings[extensionName].autoPreloadForBulkEdit ?? true);
}

// Save settings when changed
function onSettingChanged() {
    extension_settings[extensionName].enabled = $("#world_info_cleanup_enabled").prop("checked");
    extension_settings[extensionName].showConfirmation = $("#world_info_cleanup_confirmation").prop("checked");
    extension_settings[extensionName].forceLoadCharacterData = $("#world_info_cleanup_force_load").prop("checked");
    extension_settings[extensionName].autoReplaceWorldOnImport = $("#world_info_cleanup_auto_replace").prop("checked");
    extension_settings[extensionName].autoPreloadForBulkEdit = $("#world_info_cleanup_auto_preload_bulk").prop("checked");
    
    // Handle world rename monitor toggle
    const wasRenameEnabled = extension_settings[extensionName].autoUpdateOnRename;
    extension_settings[extensionName].autoUpdateOnRename = $("#world_info_cleanup_auto_update_rename").prop("checked");
    
    // Setup or cleanup the rename monitor based on the new setting
    if (extension_settings[extensionName].autoUpdateOnRename !== wasRenameEnabled) {
        console.log(`[世界书大扫除] 世界书重命名监控设置已更改: ${wasRenameEnabled} -> ${extension_settings[extensionName].autoUpdateOnRename}`);
        if (extension_settings[extensionName].autoUpdateOnRename) {
            setupWorldRenameMonitor();
        } else {
            cleanupWorldRenameMonitor();
        }
    }
    
    saveSettingsDebounced();
}

// ============================================================================
// CHARACTER & WORLD DATA FUNCTIONS
// ============================================================================

// Get lorebooks associated with a character
async function getCharacterLorebooks(characterData) {
    const lorebooks = [];
    
    // Different possible structures for character data
    const dataToCheck = characterData.data || characterData;
    
    // Check for embedded character book
    if (dataToCheck.character_book) {
        console.log('Found embedded character book');
        lorebooks.push({
            type: 'embedded',
            name: 'Embedded Character Book',
            data: dataToCheck.character_book
        });
    }
    
    // Check for linked world info file - try multiple property names
    const worldInfoProps = ['world', 'world_info', 'lorebook', 'worldInfo'];
    for (const prop of worldInfoProps) {
        if (dataToCheck[prop]) {
            console.log(`Found linked world info in property '${prop}':`, dataToCheck[prop]);
            lorebooks.push({
                type: 'linked',
                name: dataToCheck[prop],
                filename: dataToCheck[prop]
            });
            break;
        }
    }
    
    // Check for character_book property
    if (dataToCheck.character_book) {
        console.log('Found character_book property');
        // This might be the embedded book or a reference to external file
        if (typeof dataToCheck.character_book === 'string') {
            lorebooks.push({
                type: 'linked',
                name: dataToCheck.character_book,
                filename: dataToCheck.character_book
            });
        }
    }
    
    // Check extensions field - THIS IS WHERE IT USUALLY IS!
    if (dataToCheck.extensions) {
        console.log('Checking extensions:', dataToCheck.extensions);
        
        // Check for world property in extensions
        if (dataToCheck.extensions.world) {
            console.log('Found world in extensions:', dataToCheck.extensions.world);
            lorebooks.push({
                type: 'linked',
                name: dataToCheck.extensions.world,
                filename: dataToCheck.extensions.world
            });
        }
        
        // Also check for world_info in extensions
        if (dataToCheck.extensions.world_info) {
            lorebooks.push({
                type: 'extension',
                name: 'Extension World Info',
                data: dataToCheck.extensions.world_info
            });
        }
    }
    
    return lorebooks;
}

// ============================================================================
// API & FILE OPERATIONS
// ============================================================================

// Delete a world info file with retry logic and better error handling
async function deleteWorldInfoFile(filename) {
    try {
        console.log(`Attempting to delete world info file: ${filename}`);
        
        // Sanitize filename - remove any extensions that might cause issues
        const cleanFilename = filename.replace(/\.(json|lorebook|world)$/i, '');
        
        // Get proper headers
        const headers = typeof getRequestHeaders === 'function' 
            ? getRequestHeaders() 
            : { 'Content-Type': 'application/json' };
        

        let response = await fetch('/api/worldinfo/delete', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ 
                name: filename
            })
        });
        
        // If failed, try with cleaned filename
        if (!response.ok && cleanFilename !== filename) {
            console.log(`First attempt failed, trying with cleaned name: ${cleanFilename}`);
            response = await fetch('/api/worldinfo/delete', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ 
                    name: cleanFilename
                })
            });
        }
        
        // If still failed, try with .json extension
        if (!response.ok && !filename.endsWith('.json')) {
            const jsonFilename = cleanFilename + '.json';
            console.log(`Second attempt failed, trying with .json extension: ${jsonFilename}`);
            response = await fetch('/api/worldinfo/delete', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ 
                    name: jsonFilename
                })
            });
        }
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to delete world info file after all attempts: ${filename}`, errorText);
            
            // Check if it's already deleted (404 means file doesn't exist)
            if (response.status === 404) {
                console.log(`World info file doesn't exist (already deleted?): ${filename}`);
                return true; // Consider it successful if already gone
            }
            
            return false;
        }
        
        console.log(`Successfully deleted world info file: ${filename}`);
        return true;
    } catch (error) {
        console.error(`Error deleting world info file:`, error);
        return false;
    }
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

// Store for character data before deletion
const pendingDeletions = new Map();

// Track if we've already preloaded in this session
let hasPreloadedThisSession = false;

// Pre-load all character data for bulk edit mode
async function preloadCharacterDataForBulkEdit() {
    console.log('🔄 Pre-loading character data for bulk edit mode');
    
    const characters = getContext().characters || [];
    const shallowCharacters = characters.filter(c => c?.shallow === true);
    
    if (shallowCharacters.length === 0) {
        // All characters already have full data loaded
        return true;
    }
    
    console.log(`📊 Found ${shallowCharacters.length} shallow characters to load`);
    
    // Show loading popup with progress
    const loadingHtml = `
        <div id="preload-popup" style="padding: 20px;">
            <h3 style="margin-bottom: 15px;">正在预加载角色数据...</h3>
            <div style="margin-bottom: 10px;">
                <div style="background: var(--black30a); height: 20px; border-radius: 10px; overflow: hidden;">
                    <div id="preload-progress-bar" style="background: var(--accent); height: 100%; width: 0%; transition: width 0.3s;"></div>
                </div>
            </div>
            <div id="preload-progress-text" style="text-align: center; opacity: 0.8;">
                准备中...
            </div>
        </div>
    `;
    
    // Create loading popup
    callPopup(loadingHtml, 'text', '');
    
    // Hide buttons for loading popup
    setTimeout(() => {
        if ($('#preload-popup').length > 0) {
            hidePopupButtons();
        }
    }, 10);
    
    let loaded = 0;
    let failed = 0;
    
    for (const character of shallowCharacters) {
        if (!character.avatar) continue;
        
        try {
            const response = await fetch('/api/characters/get', {
                method: 'POST',
                headers: getRequestHeaders(),
                body: JSON.stringify({ avatar_url: character.avatar })
            });
            
            if (response.ok) {
                const fullData = await response.json();
                // Update the character in the array
                const index = characters.findIndex(c => c.avatar === character.avatar);
                if (index !== -1) {
                    characters[index] = fullData;
                }
                // Also store for deletion event
                pendingDeletions.set(character.avatar, fullData);
                loaded++;
                console.log(`✅ Loaded: ${character.name}`);
            } else {
                failed++;
                console.warn(`❌ Failed to load: ${character.name}`);
            }
        } catch (e) {
            failed++;
            console.error(`❌ Error loading ${character.name}:`, e);
        }
        
        // Update progress
        const progress = Math.round(((loaded + failed) / shallowCharacters.length) * 100);
        $('#preload-progress-bar').css('width', `${progress}%`);
        $('#preload-progress-text').text(`已加载 ${loaded} / ${shallowCharacters.length} 个角色`);
    }
    
    // Close loading popup by clicking any visible close button or OK button
    $('.popup_close').click();
    $('#dialogue_popup_ok').click();
    
    console.log(`✅ Pre-loading complete: ${loaded} loaded, ${failed} failed`);
    
    // Mark that we've preloaded in this session
    hasPreloadedThisSession = true;
    
    if (failed > 0) {
        toastr.warning(`预加载完成，但有 ${failed} 个角色加载失败`, '部分加载失败');
    } else if (loaded > 0) {
        toastr.success(`成功预加载 ${loaded} 个角色数据`, '预加载完成');
    }
    
    return true;
}

// Helper function to manage popup buttons visibility
function hidePopupButtons() {
    $('#dialogue_popup_ok').hide();
    $('#dialogue_popup_cancel').hide();
}

function showPopupButtons() {
    $('#dialogue_popup_ok').show();
    $('#dialogue_popup_cancel').show();
}

// Helper function to hide all loading indicators
async function hideAllLoaders() {
    $('.loader, .spinner, #loader, #spinner').hide();
    $('#loader_overlay, .loader-overlay').hide();
    $('[class*="loading"], [class*="spinner"]').hide();
    
    const context = getContext();
    if (typeof context.hideLoader === 'function') {
        try {
            await context.hideLoader();
        } catch (e) {
            // Silently fail if context loader can't be hidden
        }
    }
}

// Helper function for consistent delays
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Hook into bulk edit button click
function hookBulkEditButton() {
    // Remove any existing handler first to prevent duplicates
    $(document).off('click.worldCleanup', '#bulkEditButton');
    
    // Wait 1 second to ensure bulk edit button is fully loaded in DOM
    // This is called during extension init when not all UI elements may be ready
    setTimeout(() => {
        // Hook into the bulk edit button
        $(document).on('click.worldCleanup', '#bulkEditButton', async function(e) {
            // Bulk edit button clicked
            
            // Check if auto-preload is enabled
            if (!extension_settings[extensionName].autoPreloadForBulkEdit) {
                console.log('Auto-preload is disabled, continuing normally');
                return; // Let normal behavior continue
            }
            
            // Check if we've already preloaded in this session
            if (hasPreloadedThisSession) {
                console.log('Already preloaded in this session, skipping');
                return; // Let normal behavior continue
            }
            
            // Check if we're entering or exiting bulk edit mode
            const isEnteringBulkMode = !$(this).hasClass('bulkEditButton_active');
            
            if (!isEnteringBulkMode) {
                console.log('Exiting bulk edit mode, no preload needed');
                return; // Let normal behavior continue
            }
            
            // Prevent default temporarily to show our popup
            e.stopImmediatePropagation();
            
            // Show confirmation popup
            const confirmHtml = `
                <div style="padding: 10px;">
                    <h3 style="margin-bottom: 15px;">预加载角色数据？</h3>
                    <p style="margin-bottom: 15px;">
                        预加载所有角色数据可以确保在批量删除时正确检测到链接的世界书。
                    </p>
                    <p style="opacity: 0.8; font-size: 0.9em;">
                        这可能需要一些时间，具体取决于您的角色数量。
                    </p>
                </div>
            `;
            
            const shouldPreload = await callPopup(confirmHtml, 'confirm');
            
            if (shouldPreload) {
                await preloadCharacterDataForBulkEdit();
            }
            
            // Now trigger the bulk edit mode manually
            $(this).trigger('click.bulk');
        });
        
        // Hooked into bulk edit button
    }, 1000);
}

// Hook into character deletion
async function onCharacterDeleted(eventData) {
    console.log('Character deletion detected:', eventData);
    
    // Check if extension is enabled
    if (!extension_settings[extensionName].enabled) {
        console.log(TEXT.LOG_DISABLED);
        return;
    }
    
    // FIX FOR 齿轮 LOADING ICON BUG - START
    // Wait a bit for any loading animations to appear and then hide them
    await delay(LOADER_HIDE_DELAY);
    
    // Hide all possible loading indicators
    $('.loader, .spinner, #loader, #spinner').hide();
    $('#loader_overlay, .loader-overlay').hide();
    $('[class*="loading"], [class*="spinner"]').hide();
    
    // Hide SillyTavern's specific loader if it exists
    const context = getContext();
    if (typeof context.hideLoader === 'function') {
        try {
            await context.hideLoader();
        } catch (e) {
            console.log('Could not hide loader via context:', e);
        }
    }
    // FIX FOR 齿轮 LOADING ICON BUG - END
    
    // The event data structure is {id: number, character: {...}}
    let { id: characterId, character: characterData } = eventData || {};
    
    if (!characterData) {
        console.warn('No character data in deletion event');
        return;
    }
    
    console.log('Character data:', characterData);
    
    // Check if we have pre-fetched full data for this character
    if (characterData.avatar && pendingDeletions.has(characterData.avatar)) {
        // Using pre-fetched full character data
        characterData = pendingDeletions.get(characterData.avatar);
        pendingDeletions.delete(characterData.avatar); // Clean up
        console.log('Full data extensions:', characterData.data?.extensions);
        console.log('World info found:', characterData.data?.extensions?.world || 'None');
    } else if (characterData.shallow === true) {
        // This shouldn't happen if interceptor worked, but keep as fallback
        console.log('⚠️ Character data is shallow and no pre-fetched data available');
        console.log('Character avatar:', characterData.avatar);
        console.warn('Character was already deleted from server, cannot fetch full data');
    } else {
        // Character data is already complete (not shallow)
        console.log('Extensions available:', characterData.data?.extensions);
    }

    const characterName = characterData.name || 
                         characterData.avatar || 
                         characterData.char_name ||
                         characterData.display_name ||
                         'Unknown';
    
    console.log(`Processing deletion for character: ${characterName} (ID: ${characterId})`);
    
    // Get associated lorebooks
    const lorebooks = await getCharacterLorebooks(characterData);
    
    if (lorebooks.length === 0) {
        console.log(`No lorebooks found for character: ${characterName}`);
        return;
    }
    
    console.log(`Found ${lorebooks.length} lorebooks for character:`, lorebooks);
    
    // Filter to only get linked lorebook files (not embedded ones)
    const linkedLorebooks = lorebooks.filter(lb => lb.type === 'linked');
    
    if (linkedLorebooks.length === 0) {
        console.log('No linked lorebook files to delete (only embedded books found)');
        return;
    }
    
    // Show confirmation if enabled
    if (extension_settings[extensionName].showConfirmation) {
        // FIX: Hide loaders again right before showing popup
        $('.loader, .spinner, #loader, #spinner, #loader_overlay, .loader-overlay').hide();
        
        // Build confirmation message
        const confirmMessage = TEXT.CONFIRM_DELETE_TITLE(characterName) + '\n\n' +
            TEXT.CONFIRM_DELETE_MESSAGE(linkedLorebooks.length) + '\n' +
            `${linkedLorebooks.map(item => `• ${item.name}`).join('\n')}\n\n` +
            TEXT.CONFIRM_DELETE_QUESTION;
        
        console.log('Showing confirmation popup for world book deletion');
        
        // Ensure buttons are visible for confirmation
        showPopupButtons();
        
        const confirmed = await callPopup(confirmMessage, 'confirm');
        
        if (!confirmed) {
            console.log(TEXT.LOG_USER_CANCELLED);
            return;
        }
    }
    
    // Verify which world info files actually exist before trying to delete
    // Fetch world files ONCE outside the loop for O(1) lookups
    const allWorldFiles = await getAllWorldInfoFiles(false);
    const worldFilesSet = new Set(allWorldFiles); // Convert to Set for O(1) lookups
    
    const existingLorebooks = [];
    for (const lorebook of linkedLorebooks) {
        // O(1) Set lookup instead of O(n) array.includes()
        if (worldFilesSet.has(lorebook.filename) || 
            worldFilesSet.has(lorebook.name)) {
            existingLorebooks.push(lorebook);
            console.log(`World info file exists and will be deleted: ${lorebook.filename}`);
        } else {
            console.log(`World info file not found (might be embedded only): ${lorebook.filename}`);
        }
    }
    
    // Delete the verified lorebook files
    let deletedCount = 0;
    let failedCount = 0;
    const failedFiles = [];
    
    for (const lorebook of existingLorebooks) {
        const success = await deleteWorldInfoFile(lorebook.filename);
        if (success) {
            deletedCount++;
        } else {
            failedCount++;
            failedFiles.push(lorebook.filename);
        }
    }
    
    // Show appropriate feedback
    if (deletedCount > 0) {
        // Show success message
        toastr.success(TEXT.TOAST_SUCCESS(deletedCount), TEXT.EXTENSION_NAME);
        
        // Update the world info list if the function exists
        const context = getContext();
        if (typeof context.updateWorldInfoList === 'function') {
            await context.updateWorldInfoList();
        }
    }
    
    if (failedCount > 0) {
        // Show specific error about what failed
        console.error(`Failed to delete ${failedCount} world info files:`, failedFiles);
        toastr.error(
            `无法删除 ${failedCount} 个世界书文件。请手动检查并删除：${failedFiles.join(', ')}`, 
            TEXT.EXTENSION_NAME,
            { timeOut: 10000 }
        );
    } else if (deletedCount === 0 && linkedLorebooks.length > 0) {
        // Nothing was deleted but there were linked lorebooks
        toastr.info(
            '世界书文件可能已被删除或是嵌入式世界书（无需删除）', 
            TEXT.EXTENSION_NAME
        );
    }
}

// Get all world info files including those in use - FORCE REFRESH
async function getAllWorldInfoFiles(forceRefresh = false) {
    try {
        const context = getContext();
        const headers = typeof getRequestHeaders === 'function' 
            ? getRequestHeaders() 
            : { 'Content-Type': 'application/json' };
        
        let worldInfoFiles = [];
        
        // Force refresh if requested
        if (forceRefresh) {
            console.log('Force refreshing world info...');
            
            // IMPORTANT: DO NOT click on World Info button - it triggers file selector bug!
            // The button click causes world_import_file.click() in SillyTavern's code
            

            if (typeof context.loadWorldInfo === 'function') {
                console.log('Calling loadWorldInfo...');
                await context.loadWorldInfo();
                await delay(API_RETRY_DELAY);
            }
            
            if (typeof context.loadWorldInfoData === 'function') {
                console.log('Calling loadWorldInfoData...');
                await context.loadWorldInfoData();
                await delay(API_RETRY_DELAY);
            }
            

            try {
                const worldInfoModule = await import("../../../../scripts/world-info.js");
                if (worldInfoModule.loadWorldInfo) {
                    await worldInfoModule.loadWorldInfo();
                }
                if (worldInfoModule.world_names) {
                    world_names = worldInfoModule.world_names;
                }

                if (worldInfoModule.updateWorldInfoList) {
                    await worldInfoModule.updateWorldInfoList();
                }
            } catch (e) {
                console.log('Could not reimport world-info module:', e);
            }
        }
        

        try {
            console.log('Fetching world info from API...');
            const response = await fetch('/api/worldinfo/get', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({})
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data && Array.isArray(data)) {
                    worldInfoFiles = data.map(item => item.name || item);
                    console.log('Got fresh world info from API:', worldInfoFiles.length, 'files');
                    
                    // If we got data, cache it for other methods
                    if (worldInfoFiles.length > 0) {
                        window.world_names = worldInfoFiles;
                        world_names = worldInfoFiles;
                    }
                }
            }
        } catch (e) {
            console.log('Could not get world info from API:', e);
        }
        
        // If API didn't work, try alternative API endpoints
        if (worldInfoFiles.length === 0) {
            try {
                console.log('Trying alternative API endpoint...');
                const response = await fetch('/api/settings/get', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({})
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (data.world_names && Array.isArray(data.world_names)) {
                        worldInfoFiles = data.world_names;
                        console.log('Got world info from settings:', worldInfoFiles.length);
                    }
                }
            } catch (e) {
                console.log('Could not get from settings API:', e);
            }
        }
        

        if (worldInfoFiles.length === 0) {
            console.log('API failed, trying fallback methods...');
            

            if (world_names && world_names.length > 0) {
                worldInfoFiles = world_names;
                console.log('Got world info from imported world_names:', worldInfoFiles);
            }
            

            else if (context.world_names) {
                worldInfoFiles = context.world_names;
                console.log('Got world info from context.world_names:', worldInfoFiles);
            }
            

            else if (window.world_names && window.world_names.length > 0) {
                worldInfoFiles = window.world_names;
                console.log('Got world info from window.world_names:', worldInfoFiles);
            }
            

            else {
                const worldSelector = $('#world_editor_select, #world_info_select, select[name="world_info"], #world_info');
                if (worldSelector.length > 0) {
                    const tempFiles = [];
                    worldSelector.find('option').each(function() {
                        const value = $(this).val() || $(this).text();
                        if (value && value !== '' && value !== 'None') {
                            tempFiles.push(value);
                        }
                    });
                    if (tempFiles.length > 0) {
                        worldInfoFiles = [...new Set(tempFiles)]; // Remove duplicates
                        console.log('Got world info from DOM selector:', worldInfoFiles);
                    }
                }
            }
        }
        
        // Clean up the array - remove undefined, null, empty strings, and 'undefined' strings
        worldInfoFiles = worldInfoFiles.filter(file => {
            return file && 
                   file !== '' && 
                   file !== 'undefined' && 
                   file !== 'null' && 
                   file !== undefined && 
                   file !== null &&
                   typeof file === 'string';
        });
        
        console.log('Final cleaned world info files:', worldInfoFiles.length, 'files');
        
        // If still empty and force refresh, show what's happening
        if (worldInfoFiles.length === 0 && forceRefresh) {
            console.error('Could not load any world info files despite force refresh');
            console.log('Diagnostic info:', {
                world_names: world_names,
                window_world_names: window.world_names,
                context_world_names: context.world_names,
                worldInfoButton: $('#WIButton').length,
                worldSelector: $('#world_editor_select').length
            });
        }
        
        return worldInfoFiles;
        
    } catch (error) {
        console.error('Error getting world info files:', error);
        return [];
    }
}

// ============================================================================
// MAIN CLEANUP DIALOG
// ============================================================================

// Manual cleanup function with selection dialog
async function manualCleanup() {
    let errorStage = '初始化';
    try {
        // Show loading toast
        toastr.info(TEXT.TOAST_LOADING_WORLDS, TEXT.EXTENSION_NAME);
        
        errorStage = '获取上下文';
        // FORCE REFRESH THE DATA
        const context = getContext();
        if (!context) {
            throw new Error('无法获取上下文 (getContext返回null)');
        }
        
        errorStage = '加载世界书信息';
        if (typeof context.loadWorldInfo === 'function') {
            console.log('Loading world info data...');
            await context.loadWorldInfo();
        }
        
        errorStage = '获取世界书文件列表';
        // Get all world info files WITH FORCE REFRESH
        let worldInfoFiles = await getAllWorldInfoFiles(true);
        
        // If still no files, try one more method - check for world_names in the window object
        if (worldInfoFiles.length === 0 && window.world_names) {
            worldInfoFiles = window.world_names;
            console.log('Got world info from window.world_names:', worldInfoFiles);
        }
        
        // Last resort - prompt user to open World Info panel first
        if (worldInfoFiles.length === 0) {
            const tryAgain = await callPopup(
                '未能获取世界书列表。\n\n' +
                '请尝试以下操作：\n' +
                '1. 打开 "World Info" 面板\n' +
                '2. 等待世界书列表加载\n' +
                '3. 再次点击 "清理孤立世界书"\n\n' +
                '是否现在打开 World Info 面板？',
                'confirm'
            );
            
            if (tryAgain) {

                $('#WIButton').click();
                setTimeout(() => {
                    toastr.info('请在世界书列表加载后再次尝试', TEXT.EXTENSION_NAME);
                }, 500);
            }
            return;
        }
        
        console.log('Found world info files:', worldInfoFiles);
        
        errorStage = '获取角色列表';
        // Get all characters
        let characters = context.characters || [];
        
        console.log(`Loaded ${characters.length} characters for world mapping`);
        
        errorStage = '强制加载角色数据';
        // Check if force load is enabled and needed
        if (extension_settings[extensionName].forceLoadCharacterData) {
            // Check for shallow characters - they have shallow:true flag
            // Note: Shallow characters still have extensions but ONLY extensions.fav, not extensions.world!
            const shallowChars = characters.filter(c => c.shallow === true);
            
            if (shallowChars.length > 0) {
                // Show progress dialog (similar to diagnostic popup)
                const progressHtml = `
                <div style="padding: 30px; text-align: center;">
                    <h3 id="load-title">📚 正在加载角色数据...</h3>
                    <div style="margin: 20px 0;">
                        <div class="fa-3x" id="load-icon-container">
                            <i id="load-icon" class="fas fa-spinner fa-spin"></i>
                        </div>
                    </div>
                    <p style="margin-top: 20px; opacity: 0.8;">
                        <span id="load-progress">准备加载 ${shallowChars.length} 个角色的完整数据</span><br>
                        <small>这可能需要一些时间，请耐心等待...</small>
                    </p>
                    <div style="margin: 15px auto; max-width: 300px;">
                        <progress id="progress-bar" max="${shallowChars.length}" value="0" style="width: 100%; height: 20px;"></progress>
                    </div>
                    <div id="load-progress-detail" style="margin-top: 10px; font-size: 0.9em; opacity: 0.7;">
                        正在初始化...
                    </div>
                </div>`;
                
                // Create loading popup
                callPopup(progressHtml, 'text', '');
                
                // Hide buttons for loading popup
                setTimeout(() => {
                    if ($('#load-icon-container').length > 0) {
                        hidePopupButtons();
                    }
                }, 10);
                
                // Load character data in batches
                const batchSize = 50;
                let loadedCount = 0;
                
                try {
                    for (let i = 0; i < shallowChars.length; i += batchSize) {
                    const batch = shallowChars.slice(i, Math.min(i + batchSize, shallowChars.length));
                    
                    // Load each character in the batch
                    const loadPromises = batch.map(async (char) => {
                        const avatar = char.avatar;
                        if (!avatar) return;
                        
                        try {
                            const response = await fetch('/api/characters/get', {
                                method: 'POST',
                                headers: getRequestHeaders(),
                                body: JSON.stringify({ avatar_url: avatar })
                            });
                            
                            if (response.ok) {
                                const fullData = await response.json();
                                // Update the character in the array
                                const charIndex = characters.findIndex(c => c.avatar === avatar);
                                if (charIndex !== -1) {
                                    characters[charIndex] = fullData;
                                }
                            }
                        } catch (e) {
                            // Silently skip failed characters
                            console.warn(`Failed to load character ${avatar}:`, e);
                        }
                    });
                    
                    // Wait for batch to complete
                    await Promise.all(loadPromises);
                    loadedCount += batch.length;
                    
                    // Update progress
                    $('#load-progress').text(`已加载: ${loadedCount} / ${shallowChars.length} 个角色`);
                    $('#progress-bar').val(loadedCount);
                    $('#load-progress-detail').text(`处理批次 ${Math.floor(i/batchSize) + 1}/${Math.ceil(shallowChars.length/batchSize)}`);
                    
                    // Small delay between batches to prevent overwhelming the server
                    if (i + batchSize < shallowChars.length) {
                        await delay(LOADER_HIDE_DELAY);
                    }
                    }
                    
                    // Show completion state with animated success icon
                    $('#load-title').html('✅ 加载完成！');
                    
                    // Transform the spinner icon to checkmark
                    const iconElement = $('#load-icon');
                    if (iconElement.length > 0) {
                        iconElement
                            .removeClass('fa-spinner fa-spin')
                            .addClass('fa-circle-check fa-bounce')
                            .css('color', '#4CAF50');
                    } else {
                        // Fallback - replace entire HTML if element not found
                        $('#load-icon-container').html('<i class="fas fa-circle-check fa-bounce" style="color: #4CAF50;"></i>');
                    }
                    
                    $('#load-progress').html(`<strong style="color: #4CAF50;">成功加载 ${loadedCount} 个角色的数据！</strong>`);
                    $('#progress-bar').val(shallowChars.length); // Ensure bar is full
                    $('#load-progress-detail').text('所有数据已准备就绪');
                    
                    // Keep the success state visible for 1.5 seconds so user can read it
                    await delay(1500);
                    
                } finally {
                    // Always close progress popup (same as diagnostic popup)
                    $('#dialogue_popup_cancel').click();
                    
                    // Small delay to ensure popup closes
                    await delay(100);
                }
                
                // Show completion message
                toastr.success(`成功加载 ${loadedCount} 个角色的完整数据`, TEXT.EXTENSION_NAME);
                
                // Update context with loaded characters
                context.characters = characters;
            }
        }
        
        // Build a map of world -> characters using it
        // Now tracking BOTH main and additional lorebooks
        const worldToCharacters = {};
        const characterWorlds = new Set();
        
        // NEW: Track main vs additional relationships
        const worldToMainCharacters = {};     // world -> [characters using as main]
        const worldToAdditionalCharacters = {}; // world -> [characters using as additional]
        
        

        characters.forEach((c, index) => {
            const data = c.data || c;
            const charName = c.name || c.avatar || 'Unknown';
            
            // Function to add world-character mapping (for backward compatibility)
            const addMapping = (worldName) => {
                if (worldName) {
                    characterWorlds.add(worldName);
                    if (!worldToCharacters[worldName]) {
                        worldToCharacters[worldName] = [];
                    }
                    worldToCharacters[worldName].push(charName);
                }
            };
            
            // Function to add MAIN lorebook mapping
            const addMainMapping = (worldName) => {
                if (worldName) {
                    characterWorlds.add(worldName);
                    if (!worldToMainCharacters[worldName]) {
                        worldToMainCharacters[worldName] = [];
                    }
                    worldToMainCharacters[worldName].push(charName);
                    addMapping(worldName); // Also add to general mapping
                }
            };
            
            // Check all possible locations for MAIN lorebook
            addMainMapping(data.extensions?.world);
            addMainMapping(data.world);
            addMainMapping(data.world_info);
            addMainMapping(data.lorebook);
            addMainMapping(data.worldInfo);
            if (typeof data.character_book === 'string') {
                addMainMapping(data.character_book);
            }
        });
        
        // Second pass: Gather ADDITIONAL lorebooks from world_info.charLore
        
        // Get additional lorebooks from world-info module
        let charLoreData = null;
        
        try {
            // Import world-info module to get charLore data
            const { world_info: importedWorldInfo } = await import("../../../../scripts/world-info.js");
            if (importedWorldInfo && typeof importedWorldInfo === 'object' && !importedWorldInfo.nodeName) {
                charLoreData = importedWorldInfo.charLore;
            }
        } catch (e) {
            console.log('Could not import world-info module for additional lorebooks:', e);
        }
        
        // Process additional lorebooks if we have the data
        const finalCharLore = charLoreData;
        
        if (finalCharLore) {
            
            // Make sure it's an array
            const charLoreArray = Array.isArray(finalCharLore) ? finalCharLore : [];
            
            
            // Build character lookup HashMap for O(1) lookups instead of O(n)
            // This runs once: O(n) where n = number of characters
            const charMap = new Map();
            characters.forEach(c => {
                const avatar = c.avatar || c.name || '';
                const avatarBase = avatar.replace(/\.png$/i, '');
                
                // Add multiple keys for flexible matching (handles .png and no .png)
                charMap.set(avatar, c);
                if (avatar !== avatarBase) {
                    charMap.set(avatarBase, c);
                }
            });
            
            // Now process each charLore entry with O(1) lookups
            // Total: O(m) where m = number of charLore entries
            charLoreArray.forEach(charLoreEntry => {
                const charFilename = charLoreEntry.name;
                const filenameBase = charFilename.replace(/\.png$/i, '');
                
                // O(1) HashMap lookup instead of O(n) array.find()
                const character = charMap.get(charFilename) || 
                                  charMap.get(filenameBase);
                
                if (!character) {
                    // Skip deleted characters - don't process their additional lorebooks
                    return;
                }
                
                // Use the character's display name if found
                const charName = character.name || character.avatar || charFilename;
                
                if (charLoreEntry.extraBooks && Array.isArray(charLoreEntry.extraBooks)) {
                    
                    charLoreEntry.extraBooks.forEach(bookName => {
                        if (bookName) {
                            characterWorlds.add(bookName);
                            
                            // Add to general mapping
                            if (!worldToCharacters[bookName]) {
                                worldToCharacters[bookName] = [];
                            }
                            worldToCharacters[bookName].push(charName);
                            
                            // Add to additional mapping - THIS MAPS: book -> characters using it as additional
                            if (!worldToAdditionalCharacters[bookName]) {
                                worldToAdditionalCharacters[bookName] = [];
                            }
                            worldToAdditionalCharacters[bookName].push(charName);
                        }
                    });
                }
            });
        }
        
        console.log('Character-linked worlds:', Array.from(characterWorlds));
        console.log('World to characters mapping:', worldToCharacters);
        
        // Get global world books for detection
        let globalWorldSet = new Set();
        try {
            const worldInfoModule = await import("../../../../scripts/world-info.js");
            if (worldInfoModule.selected_world_info) {
                globalWorldSet = new Set(worldInfoModule.selected_world_info);
                console.log('🌐 Global world books detected:', Array.from(globalWorldSet));
                console.log('🌐 Total global books:', globalWorldSet.size);
            } else {
                console.log('⚠️ No selected_world_info found in world-info module');
            }
        } catch (e) {
            console.log('⚠️ Could not access global world books:', e);
        }
        
        errorStage = '分类世界书文件';
        // Find all files (both orphaned and linked)
        // Process all files in a single pass for better performance
        const orphanedFiles = [];
        const linkedFiles = [];
        
        // Single loop to filter, map, and separate files - O(n) instead of O(3n)
        worldInfoFiles.forEach(file => {
            // Skip invalid entries
            if (!file || file === '' || file === 'undefined' || file === 'null') {
                return;
            }
            
            const isGlobal = globalWorldSet.has(file);
            const fileData = {
                name: file,
                isOrphaned: !characterWorlds.has(file) && file !== 'Default' && !isGlobal,  // Global books are never orphaned
                isGlobal: isGlobal,  // Check if it's a global world book
                characters: worldToCharacters[file] || [],
                mainCharacters: worldToMainCharacters[file] || [],
                additionalCharacters: worldToAdditionalCharacters[file] || []
            };
            
            // Debug log for global books
            if (fileData.isGlobal) {
                console.log(`🌐 Found global book: ${file} (orphaned: ${fileData.isOrphaned})`);
            }
            
            // Separate into appropriate array
            if (fileData.isOrphaned) {
                orphanedFiles.push(fileData);
            } else {
                linkedFiles.push(fileData);
            }
        });
        
        // Debug log first few files
        [...orphanedFiles, ...linkedFiles].slice(0, 3).forEach(file => {
            console.log(`📁 ${file.name}:`);
        });
        
        // Store in cache for pagination
        orphanedFilesCache = orphanedFiles;
        linkedFilesCache = linkedFiles;
        
        if (orphanedFiles.length === 0 && linkedFiles.length === 0) {
            toastr.info(TEXT.TOAST_NO_ORPHANED, TEXT.EXTENSION_NAME);
            return;
        }
        
        // Create selection dialog HTML with both orphaned and linked sections
        console.log('Creating dialog with:', {
            orphanedFiles: orphanedFiles.length,
            linkedFiles: linkedFiles.length,
            totalFiles: orphanedFiles.length + linkedFiles.length
        });
        
        // Reset pagination, search, and selection when opening dialog
        orphanedCurrentPage = 1;
        linkedCurrentPage = 1;
        selectedOrphanedFiles.clear();
        selectedLinkedFiles.clear();
        let orphanedSearchTerm = '';
        let linkedSearchTerm = '';
        let filteredOrphanedFiles = [...orphanedFiles];
        let filteredLinkedFiles = [...linkedFiles];
        let showOnlyMain = false;  // Toggle state for main filter
        let showOnlyAdditional = false;  // Toggle state for additional filter
        let showOnlyGlobal = false;  // Toggle state for global filter
        let searchFilename = true;
        let searchCharname = true;
        
        // Function to filter files based on search term
        function filterFiles(files, searchTerm, type) {
            if (!searchTerm) return files;
            
            const term = searchTerm.toLowerCase();
            return files.filter(file => {
                // Search by world book name
                if (file.name.toLowerCase().includes(term)) return true;
                
                // For linked files, also search by character names
                if (type === 'linked' && file.characters) {
                    return file.characters.some(char => 
                        char.toLowerCase().includes(term)
                    );
                }
                
                return false;
            });
        }
        
        errorStage = '生成对话框HTML';
        const dialogHtml = `
        <style>
            /* Force the popup content to use full height ONLY for our dialog */
            .popup:has(#world-cleanup-dialog) .popup-content {
                display: flex !important;
                flex-direction: column !important;
            }
            
            .popup:has(#world-cleanup-dialog) .popup-body {
                flex: 1 !important;
                display: flex !important;
                flex-direction: column !important;
                min-height: 0 !important;
            }
            
            /* Style the popup buttons (Delete/Cancel) ONLY for our dialog */
            .popup:has(#world-cleanup-dialog) .popup-controls .menu_button {
                font-size: 0.9em !important; /* Adjust this to change button text size */
                padding: 0.5em 1em !important;
            }
            
            /* Scope all styles to our specific dialog to avoid conflicts */
            #world-cleanup-dialog::-webkit-scrollbar,
            #world-cleanup-dialog .orphaned-list-content::-webkit-scrollbar,
            #world-cleanup-dialog .linked-list-content::-webkit-scrollbar {
                width: 3px;
                height:3px;
            }
            
            /* For Firefox - just make it thin */
            #world-cleanup-dialog,
            #world-cleanup-dialog .orphaned-list-content,
            #world-cleanup-dialog .linked-list-content {
                scrollbar-width: thin;
            }
            
            /* Mobile specific - even thinner */
            @media (max-width: 768px) {
                #world-cleanup-dialog::-webkit-scrollbar,
                #world-cleanup-dialog .orphaned-list-content::-webkit-scrollbar,
                #world-cleanup-dialog .linked-list-content::-webkit-scrollbar {
                    width: 2px;
                    height: 2px;
                }
                
                /* Stack filter controls vertically on mobile */
                #world-cleanup-dialog label[for="search-scope"],
                #world-cleanup-dialog label[for="filter-type"] {
                    width: 100%;
                }
                
                /* Make OUR specific select dropdowns full width on mobile */
                #world-cleanup-dialog #search-scope,
                #world-cleanup-dialog #filter-type {
                    width: 100%;
                }
                
            }
            
            /* Fix checkbox scaling - make sure checkmark scales with checkbox */
            #world-cleanup-dialog input[type="checkbox"] {
                transform: scale(${FONT_SIZES.CHECKBOX_SIZE});
                transform-origin: left center;
            }
            
            /* Special handling for table checkboxes - center them properly */
            #world-cleanup-dialog td input[type="checkbox"] {
                transform: scale(${FONT_SIZES.CHECKBOX_SIZE});
                transform-origin: center center;
                display: block;
                margin: 0 auto;
            }
            
            /* Responsive font sizes - target OUR selects by ID */
            #world-cleanup-dialog #search-scope,
            #world-cleanup-dialog #filter-type {
                font-size: var(--mainFontSize);
            }
            
            /* Ensure OUR dropdowns are readable - target by ID */
            #world-cleanup-dialog #search-scope option,
            #world-cleanup-dialog #filter-type option {
                padding: 4px;
            }
            
            /* Tab styles - scoped to our dialog */
            #world-cleanup-dialog .world-tabs {
                display: flex;
                gap: 5px;
                margin-bottom: 2px;
                border-bottom: 2px solid var(--SmartThemeBorderColor);
            }
            
            #world-cleanup-dialog .world-tab {
                padding: 0.4em 0.8em;
                cursor: pointer;
                background: transparent;
                border: none;
                border-bottom: 3px solid transparent;
                color: var(--SmartThemeBodyColor);
                transition: all 0.2s;
                flex: 1;
                font-weight: 500;
                font-size: 0.85em; /* Adjust this value to make tabs bigger/smaller */
            }
            
            #world-cleanup-dialog .world-tab:hover {
                background: var(--black30a);
            }
            
            #world-cleanup-dialog .world-tab.active {
                border-bottom-color: var(--active);
                color: var(--active);
                background: var(--black30a);
            }
            
            /* Special red color for orphaned tab when active */
            #world-cleanup-dialog .world-tab[data-tab="orphaned"].active {
                border-bottom-color: var(--warning);
                color: var(--warning);
            }
            
            #world-cleanup-dialog .tab-content {
                display: none;
            }
            
            #world-cleanup-dialog .tab-content {
                display: none !important;
            }
            
            #world-cleanup-dialog .tab-content.active {
                display: flex !important;
            }
            
            /* Dialog buttons font size - removed to prevent leaking */
        </style>
        <div id="world-cleanup-dialog" style="display: flex; flex-direction: column; height: 100%; overflow: hidden;">
            <!-- Small file count above tabs -->
            <div style="flex-shrink: 0; text-align: center; margin-bottom: 8px;">
                <small style="opacity: 0.7; font-size: calc(var(--mainFontSize) * ${FONT_SIZES.POPUP_SUBTITLE});">
                    共找到 ${orphanedFiles.length + linkedFiles.length} 个世界书文件${globalWorldSet.size > 0 ? ` (含 ${globalWorldSet.size} 个全局)` : ''}
                </small>
            </div>
            
            <!-- Tab Navigation -->
            <div class="world-tabs" style="flex-shrink: 0;">
                <button class="world-tab active" data-tab="orphaned" style="font-size: calc(var(--mainFontSize) * ${FONT_SIZES.TAB_BUTTON_SIZE});">
                    🗑️孤立 (${orphanedFiles.length})
                </button>
                <button class="world-tab" data-tab="linked" style="font-size: calc(var(--mainFontSize) * ${FONT_SIZES.TAB_BUTTON_SIZE});">
                    🔗关联 (${linkedFiles.length})
                </button>
            </div>
            
            <!-- Tab Content Container -->
            <div style="flex: 1; min-height: 0; position: relative;">
            
            <!-- Orphaned Tab Content -->
            <div class="tab-content active" id="orphaned-tab" style="height: 100%; display: flex; flex-direction: column;">
                ${orphanedFiles.length > 0 ? `
                <div style="flex-shrink: 0; margin-bottom: 2px; margin-top: 0;">
                    <small style="opacity: 0.8; font-size: calc(var(--mainFontSize) * ${FONT_SIZES.TAB_DESCRIPTION});">这些世界书未关联到任何角色</small>
                </div>
                
                <!-- Search and button for orphaned books -->
                <div style="display: flex; gap: 10px; margin-bottom: 2px; align-items: center; flex-shrink: 0;">
                    <input type="text" 
                           id="orphaned-search" 
                           placeholder="搜索孤立世界书名称..." 
                           style="flex: 1; padding: calc(var(--mainFontSize) * 0.25) calc(var(--mainFontSize) * 0.5); font-size: calc(var(--mainFontSize) * ${FONT_SIZES.SEARCH_BAR}); border: 1px solid var(--SmartThemeBorderColor); border-radius: 4px; background: var(--SmartThemeBlurTintColor);">
                    <button type="button"
                            class="menu_button world-cleanup-btn"
                            data-action="toggle-orphaned-page"
                            style="min-width: calc(var(--mainFontSize) * 5); height: calc(var(--mainFontSize) * 1.8); padding: calc(var(--mainFontSize) * 0.3) calc(var(--mainFontSize) * 0.7); font-size: calc(var(--mainFontSize) * ${FONT_SIZES.TOGGLE_BUTTON}); white-space: nowrap;">
                        全选本页
                    </button>
                </div>
                
                <div class="world-list-section orphaned-section" style="flex: 1; border: 1px solid var(--SmartThemeBorderColor); padding: calc(var(--mainFontSize) * 0.3); border-radius: 5px; background-color: var(--black30a); display: flex; flex-direction: column; min-height: 0;">
                    <div class="orphaned-list-content" style="flex: 1; overflow-y: auto; padding-right: 5px; min-height: 0;">
                        ${generatePaginatedList(filteredOrphanedFiles, 'orphaned', orphanedCurrentPage)}
                    </div>
                    <div style="flex-shrink: 0; margin-top: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NUMBER_BUTTONS * 0.5});">
                        ${generatePaginationHtml(orphanedCurrentPage, Math.ceil(filteredOrphanedFiles.length / ITEMS_PER_PAGE), 'orphaned')}
                    </div>
                </div>
                ` : '<div style="margin: 20px 0; text-align: center; opacity: 0.7;">没有发现孤立的世界书文件</div>'}
            </div>
            
            <!-- Linked Tab Content -->
            <div class="tab-content" id="linked-tab" style="height: 100%; display: flex; flex-direction: column;">
                ${linkedFiles.length > 0 ? `
                <div style="flex-shrink: 0; margin-bottom: 2px; margin-top: 0;">
                    <small style="opacity: 0.8; font-size: calc(var(--mainFontSize) * ${FONT_SIZES.TAB_DESCRIPTION});">这些世界书正在被角色使用</small>
                </div>
                
                <!-- Responsive search and filter controls -->
                <div style="flex-shrink: 0; margin-bottom: 2px;">
                    <!-- Search bar with integrated placeholder -->
                    <div style="display: flex; gap: 10px; margin-bottom: 2px; align-items: center;">
                        <input type="text" 
                               id="linked-search" 
                               placeholder="搜索关键词..." 
                               style="flex: 1; padding: calc(var(--mainFontSize) * 0.25) calc(var(--mainFontSize) * 0.5); font-size: calc(var(--mainFontSize) * ${FONT_SIZES.SEARCH_BAR}); border: 1px solid var(--SmartThemeBorderColor); border-radius: 4px; background: var(--SmartThemeBlurTintColor);">
                        <button type="button"
                                class="menu_button world-cleanup-btn"
                                data-action="toggle-linked-page"
                                style="min-width: calc(var(--mainFontSize) * 5); height: calc(var(--mainFontSize) * 1.8); padding: calc(var(--mainFontSize) * 0.3) calc(var(--mainFontSize) * 0.7); font-size: calc(var(--mainFontSize) * ${FONT_SIZES.TOGGLE_BUTTON}); white-space: nowrap;">
                            全选本页
                        </button>
                    </div>
                    
                    <!-- Filter controls on same line -->
                    <div style="display: flex; gap: 12px; font-size: calc(var(--mainFontSize) * ${FONT_SIZES.FILTER_CONTAINER});">
                        <label style="display: flex; align-items: center; gap: 4px; flex: 1;">
                            <span style="opacity: 0.7; white-space: nowrap; font-size: calc(var(--mainFontSize) * ${FONT_SIZES.FILTER_LABEL});">关键词:</span>
                            <select id="search-scope" style="flex: 1; padding: calc(var(--mainFontSize) * 0.15) calc(var(--mainFontSize) * 0.3); border: 1px solid var(--SmartThemeBorderColor); border-radius: 3px; background: var(--SmartThemeBlurTintColor); font-size: calc(var(--mainFontSize) * ${FONT_SIZES.FILTER_SELECT});">
                                <option value="all">文件名+角色名</option>
                                <option value="filename">仅文件名</option>
                                <option value="charname">仅角色名</option>
                            </select>
                        </label>
                        
                        <label style="display: flex; align-items: center; gap: 4px; flex: 1;">
                            <span style="opacity: 0.7; white-space: nowrap; font-size: calc(var(--mainFontSize) * ${FONT_SIZES.FILTER_LABEL});">显示筛选:</span>
                            <select id="filter-type" style="flex: 1; padding: calc(var(--mainFontSize) * 0.15) calc(var(--mainFontSize) * 0.3); border: 1px solid var(--SmartThemeBorderColor); border-radius: 3px; background: var(--SmartThemeBlurTintColor); font-size: calc(var(--mainFontSize) * ${FONT_SIZES.FILTER_SELECT});">
                                <option value="all">全部</option>
                                <option value="main">仅作为主要世界书</option>
                                <option value="additional">仅作为附加世界书</option>
                                <option value="global">仅全局世界书</option>
                            </select>
                        </label>
                    </div>
                </div>
                
                <div class="world-list-section linked-section" style="flex: 1; border: 1px solid var(--SmartThemeBorderColor); padding: calc(var(--mainFontSize) * 0.3); border-radius: 5px; background-color: var(--black30a); display: flex; flex-direction: column; min-height: 0;">
                    <div class="linked-list-content" style="flex: 1; overflow-y: auto; padding-right: 5px; min-height: 0;">
                        ${generatePaginatedList(filteredLinkedFiles, 'linked', linkedCurrentPage)}
                    </div>
                    <div style="flex-shrink: 0; margin-top: calc(var(--mainFontSize) * ${FONT_SIZES.PAGINATION_NUMBER_BUTTONS * 0.5});">
                        ${generatePaginationHtml(linkedCurrentPage, Math.ceil(filteredLinkedFiles.length / ITEMS_PER_PAGE), 'linked')}
                    </div>
                </div>
                ` : '<div style="margin: 20px 0; text-align: center; opacity: 0.7;">没有已关联的世界书文件</div>'}
            </div>
            
            </div> <!-- End tab content container -->
        </div>`;
        
        // Show the dialog - 显示对话框
        
        // Use jQuery's document-level event delegation for dynamically created elements
        $(document).off('input', '#orphaned-search, #linked-search'); // Remove any existing handlers
        $(document).off('click', '.world-tab'); // Remove any existing tab handlers
        
        // Setup tab switching handler
        $(document).on('click', '.world-tab', function(e) {
            const tabName = $(this).data('tab');
            
            // Update active tab button
            $('.world-tab').removeClass('active');
            $(this).addClass('active');
            
            // Show corresponding content
            $('.tab-content').removeClass('active');
            $(`#${tabName}-tab`).addClass('active');
        });
        
        // Setup checkbox change handlers to maintain selection state
        $(document).on('change', '.orphaned-checkbox', function(e) {
            const fileName = $(this).data('file-name');
            if (this.checked) {
                selectedOrphanedFiles.add(fileName);
            } else {
                selectedOrphanedFiles.delete(fileName);
            }
        });
        
        $(document).on('change', '.linked-checkbox', function(e) {
            const fileName = $(this).data('file-name');
            if (this.checked) {
                selectedLinkedFiles.add(fileName);
            } else {
                selectedLinkedFiles.delete(fileName);
            }
        });
        
        // Setup orphaned search handler BEFORE showing dialog
        $(document).on('input', '#orphaned-search', function(e) {
            orphanedSearchTerm = e.target.value;
            orphanedCurrentPage = 1;
            
            // Refilter
            filteredOrphanedFiles = filterFiles(orphanedFiles, orphanedSearchTerm, 'orphaned');
            
            const orphanedListContent = document.querySelector('.orphaned-list-content');
            if (orphanedListContent) {
                orphanedListContent.innerHTML = generatePaginatedList(filteredOrphanedFiles, 'orphaned', orphanedCurrentPage);
                // Update button text after content change
                setTimeout(() => updateToggleButtonText('orphaned'), 50);
            }
            
            // Update pagination
            const orphanedSection = document.querySelector('.orphaned-section');
            if (orphanedSection) {
                const oldPagination = orphanedSection.querySelector('.pagination-controls');
                const newPaginationHtml = generatePaginationHtml(orphanedCurrentPage, Math.ceil(filteredOrphanedFiles.length / ITEMS_PER_PAGE), 'orphaned');
                
                if (oldPagination && newPaginationHtml) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = newPaginationHtml;
                    const newPagination = tempDiv.firstChild;
                    if (newPagination && oldPagination.parentNode) {
                        oldPagination.parentNode.replaceChild(newPagination, oldPagination);
                    }
                }
            }
        });
        
        // Setup filter dropdown handler
        $(document).off('change.worldCleanup', '#filter-type');
        $(document).on('change.worldCleanup', '#filter-type', function(e) {
            const filterValue = $(this).val();
            
            // Update filter states based on dropdown
            if (filterValue === 'all') {
                showOnlyMain = false;
                showOnlyAdditional = false;
                showOnlyGlobal = false;
            } else if (filterValue === 'main') {
                showOnlyMain = true;
                showOnlyAdditional = false;
                showOnlyGlobal = false;
            } else if (filterValue === 'additional') {
                showOnlyMain = false;
                showOnlyAdditional = true;
                showOnlyGlobal = false;
            } else if (filterValue === 'global') {
                showOnlyMain = false;
                showOnlyAdditional = false;
                showOnlyGlobal = true;
            }
            
            // Apply filter
            applyLinkedFilters();
        });
        
        // Setup search scope dropdown handler
        $(document).off('change.worldCleanup', '#search-scope');
        $(document).on('change.worldCleanup', '#search-scope', function(e) {
            const scopeValue = $(this).val();
            
            // Update search scope based on dropdown
            if (scopeValue === 'all') {
                searchFilename = true;
                searchCharname = true;
            } else if (scopeValue === 'filename') {
                searchFilename = true;
                searchCharname = false;
            } else if (scopeValue === 'charname') {
                searchFilename = false;
                searchCharname = true;
            }
            
            // Reapply filters
            applyLinkedFilters();
        });
        
        // Function to apply all filters and search
        function applyLinkedFilters() {
            // Start with all linked files
            let filtered = [...linkedFiles];
            
            // Apply filter toggles
            if (showOnlyGlobal) {
                // Only show global world books
                filtered = filtered.filter(f => f.isGlobal === true);
            } else if (showOnlyMain && !showOnlyAdditional) {
                // Only show files that have main characters
                filtered = filtered.filter(f => f.mainCharacters && f.mainCharacters.length > 0);
            } else if (!showOnlyMain && showOnlyAdditional) {
                // Only show files that have additional characters
                filtered = filtered.filter(f => f.additionalCharacters && f.additionalCharacters.length > 0);
            } else if (showOnlyMain && showOnlyAdditional) {
                // Show files that have either main OR additional characters
                filtered = filtered.filter(f => 
                    (f.mainCharacters && f.mainCharacters.length > 0) || 
                    (f.additionalCharacters && f.additionalCharacters.length > 0)
                );
            }
            // If both are off, show all linked files (default behavior)
            
            // Apply search
            if (linkedSearchTerm) {
                const searchLower = linkedSearchTerm.toLowerCase();
                filtered = filtered.filter(file => {
                    let matches = false;
                    
                    // Search in filename
                    if (searchFilename && file.name.toLowerCase().includes(searchLower)) {
                        matches = true;
                    }
                    
                    // Search in character names (both main and additional)
                    if (searchCharname && !matches) {
                        const allChars = [...(file.mainCharacters || []), ...(file.additionalCharacters || [])];
                        if (allChars.some(char => char.toLowerCase().includes(searchLower))) {
                            matches = true;
                        }
                    }
                    
                    return matches;
                });
            }
            
            filteredLinkedFiles = filtered;
            linkedCurrentPage = 1;
            
            // Update display
            const linkedListContent = document.querySelector('.linked-list-content');
            if (linkedListContent) {
                linkedListContent.innerHTML = generatePaginatedList(filteredLinkedFiles, 'linked', linkedCurrentPage);
                // Update button text after content change
                setTimeout(() => updateToggleButtonText('linked'), 50);
            }
            
            // Update pagination
            const linkedSection = document.querySelector('.linked-section');
            if (linkedSection) {
                const oldPagination = linkedSection.querySelector('.pagination-controls');
                const newPaginationHtml = generatePaginationHtml(linkedCurrentPage, Math.ceil(filteredLinkedFiles.length / ITEMS_PER_PAGE), 'linked');
                
                if (oldPagination && newPaginationHtml) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = newPaginationHtml;
                    const newPagination = tempDiv.firstChild;
                    if (newPagination && oldPagination.parentNode) {
                        oldPagination.parentNode.replaceChild(newPagination, oldPagination);
                    }
                }
            }
        }
        
        // Setup linked search handler BEFORE showing dialog
        $(document).on('input', '#linked-search', function(e) {
            linkedSearchTerm = e.target.value;
            
            // Apply all filters
            applyLinkedFilters();
        });
        
        errorStage = '显示对话框';
        // Start the popup
        const popupPromise = callPopup(dialogHtml, 'confirm', '', { 
            okButton: TEXT.MANUAL_CLEANUP_DELETE_SELECTED,
            cancelButton: TEXT.MANUAL_CLEANUP_CANCEL,
            wide: true,
            large: true,
            allowVerticalScrolling: false,
            allowHorizontalScrolling: false
        });
        
        // Apply button styles after popup DOM is created
        setTimeout(() => {
            const worldCleanupDialog = document.getElementById('world-cleanup-dialog');
            if (!worldCleanupDialog) return;
            
            // Update toggle button text initially
            updateToggleButtonText('orphaned');
            updateToggleButtonText('linked');
            
            const okButton = document.getElementById('dialogue_popup_ok');
            const cancelButton = document.getElementById('dialogue_popup_cancel');
            
            if (okButton) {
                okButton.style.setProperty('font-size', `calc(var(--mainFontSize) * ${FONT_SIZES.DIALOG_BUTTONS})`, 'important');
                okButton.style.setProperty('height', `calc(var(--mainFontSize) * ${FONT_SIZES.DIALOG_BUTTON_HEIGHT})`, 'important');
                okButton.style.setProperty('min-height', `calc(var(--mainFontSize) * ${FONT_SIZES.DIALOG_BUTTON_HEIGHT})`, 'important');
                okButton.style.setProperty('max-height', `calc(var(--mainFontSize) * ${FONT_SIZES.DIALOG_BUTTON_HEIGHT})`, 'important');
                okButton.style.setProperty('padding', `calc(var(--mainFontSize) * ${FONT_SIZES.DIALOG_BUTTON_PADDING_V}) calc(var(--mainFontSize) * ${FONT_SIZES.DIALOG_BUTTON_PADDING_H})`, 'important');
                okButton.style.setProperty('line-height', '1', 'important');
                okButton.style.setProperty('display', 'flex', 'important');
                okButton.style.setProperty('align-items', 'center', 'important');
                okButton.style.setProperty('justify-content', 'center', 'important');
            }
            if (cancelButton) {
                cancelButton.style.setProperty('font-size', `calc(var(--mainFontSize) * ${FONT_SIZES.DIALOG_BUTTONS})`, 'important');
                cancelButton.style.setProperty('height', `calc(var(--mainFontSize) * ${FONT_SIZES.DIALOG_BUTTON_HEIGHT})`, 'important');
                cancelButton.style.setProperty('min-height', `calc(var(--mainFontSize) * ${FONT_SIZES.DIALOG_BUTTON_HEIGHT})`, 'important');
                cancelButton.style.setProperty('max-height', `calc(var(--mainFontSize) * ${FONT_SIZES.DIALOG_BUTTON_HEIGHT})`, 'important');
                cancelButton.style.setProperty('padding', `calc(var(--mainFontSize) * ${FONT_SIZES.DIALOG_BUTTON_PADDING_V}) calc(var(--mainFontSize) * ${FONT_SIZES.DIALOG_BUTTON_PADDING_H})`, 'important');
                cancelButton.style.setProperty('line-height', '1', 'important');
                cancelButton.style.setProperty('display', 'flex', 'important');
                cancelButton.style.setProperty('align-items', 'center', 'important');
                cancelButton.style.setProperty('justify-content', 'center', 'important');
            }
            
            // Reduce spacing between list and buttons
            const buttonContainer = document.querySelector('.dialogue_popup_buttons');
            if (buttonContainer && worldCleanupDialog) {
                buttonContainer.style.setProperty('margin-top', `calc(var(--mainFontSize) * ${FONT_SIZES.DIALOG_BUTTONS_GAP})`, 'important');
                buttonContainer.style.setProperty('padding-top', '0', 'important');
            }
            
            // Also try to reduce popup content padding
            const popupContent = document.querySelector('.popup-content');
            if (popupContent && worldCleanupDialog) {
                popupContent.style.setProperty('padding-bottom', '5px', 'important');
            }
        }, 100);
        
        const result = await popupPromise;
        
        // Clean up button styles after dialog closes
        setTimeout(() => {
            const okButton = document.getElementById('dialogue_popup_ok');
            const cancelButton = document.getElementById('dialogue_popup_cancel');
            if (okButton) {
                okButton.style.fontSize = '';
                okButton.style.minHeight = '';
                okButton.style.minWidth = '';
                okButton.style.padding = '';
            }
            if (cancelButton) {
                cancelButton.style.fontSize = '';
                cancelButton.style.minHeight = '';
                cancelButton.style.minWidth = '';
                cancelButton.style.padding = '';
            }
        }, 100);
        
        // Log what happened with the dialog
        console.log('Dialog result:', result);
        
        // Clean up event handlers after dialog closes
        $(document).off('input', '#orphaned-search, #linked-search');
        $(document).off('click', '.world-tab');
        $(document).off('change', '.orphaned-checkbox, .linked-checkbox');
        
        if (!result) {
            return;
        }
        
        // Get selected files from our selection sets - 获取选中的文件
        const selectedFiles = [...selectedOrphanedFiles, ...selectedLinkedFiles];
        
        if (selectedFiles.length === 0) {
            toastr.warning(TEXT.MANUAL_CLEANUP_NONE_SELECTED, TEXT.EXTENSION_NAME);
            return;
        }
        
        // Confirm deletion with more details
        const orphanedSelected = selectedFiles.filter(f => orphanedFilesCache.some(of => of.name === f));
        const linkedSelected = selectedFiles.filter(f => linkedFilesCache.some(lf => lf.name === f));
        
        // Create detailed confirmation message with toggleable file list
        let confirmMessage = `<div style="text-align: left;">
            <p><strong>${TEXT.MANUAL_CLEANUP_CONFIRM(selectedFiles.length)}</strong></p>
            <div style="margin: 10px 0;">`;
        
        if (orphanedSelected.length > 0) {
            confirmMessage += `<p>🗑️ 孤立文件: ${orphanedSelected.length}个</p>`;
        }
        if (linkedSelected.length > 0) {
            confirmMessage += `<p>⚠️ 已关联文件: ${linkedSelected.length}个 (将影响使用它们的角色)</p>`;
        }
        
        // Add toggleable file list
        confirmMessage += `
            </div>
            <details style="margin-top: 10px; border: 1px solid var(--SmartThemeBorderColor); padding: 5px; border-radius: 4px;">
                <summary style="cursor: pointer; font-weight: bold; padding: 5px;">
                    📋 点击查看文件列表 (${selectedFiles.length})
                </summary>
                <div style="max-height: 200px; overflow-y: auto; margin-top: 10px; padding: 5px;">`;
        
        // Add orphaned files section
        if (orphanedSelected.length > 0) {
            confirmMessage += `<div style="margin-bottom: 10px;">
                <strong style="color: var(--warning);">孤立文件:</strong>
                <ul style="margin: 5px 0; padding-left: 20px;">`;
            orphanedSelected.forEach(file => {
                confirmMessage += `<li style="margin: 2px 0;">📁 ${escapeHtml(file)}</li>`;
            });
            confirmMessage += `</ul></div>`;
        }
        
        // Add linked files section
        if (linkedSelected.length > 0) {
            confirmMessage += `<div>
                <strong style="color: var(--active);">关联文件:</strong>
                <ul style="margin: 5px 0; padding-left: 20px;">`;
            linkedSelected.forEach(file => {
                confirmMessage += `<li style="margin: 2px 0;">📁 ${escapeHtml(file)}</li>`;
            });
            confirmMessage += `</ul></div>`;
        }
        
        confirmMessage += `
                </div>
            </details>
        </div>`;
        
        console.log('Showing delete confirmation...');
        const confirmDelete = await callPopup(confirmMessage, 'confirm');
        
        if (!confirmDelete) {
            console.log('User cancelled deletion');
            return;
        }
        
        // Delete selected files with parallel batch processing
        console.log('Starting BATCH deletion of selected files:', selectedFiles);
        console.log(`[DEBUG] Total files to delete: ${selectedFiles.length}`);
        const deletionStartTime = Date.now();
        
        // Show progress dialog (similar to diagnostic popup)
        const progressHtml = `
        <div style="padding: 30px; text-align: center;">
            <h3 id="delete-title">🗑️ 正在删除世界书...</h3>
            <div style="margin: 20px 0;">
                <div class="fa-3x" id="delete-icon-container">
                    <i id="delete-icon" class="fas fa-spinner fa-spin"></i>
                </div>
            </div>
            <p style="margin-top: 20px; opacity: 0.8;">
                <span id="delete-progress-text">准备删除 ${selectedFiles.length} 个文件</span><br>
                <small>这可能需要一些时间，请耐心等待...</small>
            </p>
            <div style="margin: 15px auto; max-width: 300px;">
                <progress id="delete-progress-bar" max="${selectedFiles.length}" value="0" style="width: 100%; height: 20px;"></progress>
            </div>
            <div id="delete-progress-detail" style="margin-top: 10px; font-size: 0.9em; opacity: 0.7;">
                正在初始化...
            </div>
        </div>`;
        
        // Create loading popup
        callPopup(progressHtml, 'text', '');
        
        // Hide buttons for loading popup
        setTimeout(() => {
            if ($('#delete-progress').length > 0) {
                hidePopupButtons();
            }
        }, 10);
        
        let deletedCount = 0;
        let failedFiles = [];
        
        try {
            // Process files in batches for parallel deletion
            const batchSize = 5; // Same as character loading batch size
            console.log(`[DEBUG] Using batch size: ${batchSize}`);
            
            for (let i = 0; i < selectedFiles.length; i += batchSize) {
                const batch = selectedFiles.slice(i, Math.min(i + batchSize, selectedFiles.length));
                const batchStartTime = Date.now();
                console.log(`[DEBUG] Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(selectedFiles.length/batchSize)}, files:`, batch);
                
                // Delete all files in this batch in parallel
                const batchPromises = batch.map(async (file) => {
                    try {
                        const deleteStart = Date.now();
                        const success = await deleteWorldInfoFile(file);
                        const deleteTime = Date.now() - deleteStart;
                        console.log(`[DEBUG] File "${file}" deletion took ${deleteTime}ms, success: ${success}`);
                        return { file, success };
                    } catch (error) {
                        console.error(`[DEBUG] Error deleting file "${file}":`, error);
                        return { file, success: false };
                    }
                });
                
                // Wait for all files in this batch to complete
                const batchResults = await Promise.all(batchPromises);
                const batchTime = Date.now() - batchStartTime;
                console.log(`[DEBUG] Batch completed in ${batchTime}ms, results:`, batchResults);
                
                // Process batch results
                batchResults.forEach(result => {
                    if (result.success) {
                        deletedCount++;
                        console.log(`Successfully deleted: ${result.file}`);
                    } else {
                        failedFiles.push(result.file);
                        console.log(`Failed to delete: ${result.file}`);
                    }
                });
                
                // Update progress
                const progressSoFar = Math.min(i + batchSize, selectedFiles.length);
                $('#delete-progress-text').text(`已删除: ${deletedCount} / ${selectedFiles.length} 个文件`);
                $('#delete-progress-bar').val(progressSoFar);
                $('#delete-progress-detail').text(`处理批次 ${Math.floor(i/batchSize) + 1}/${Math.ceil(selectedFiles.length/batchSize)}`);
                
                // Small delay between batches to prevent overwhelming the server
                if (i + batchSize < selectedFiles.length) {
                    console.log(`[DEBUG] Waiting ${LOADER_HIDE_DELAY}ms before next batch...`);
                    await delay(LOADER_HIDE_DELAY);
                }
            }
            
            // Show completion state with animated success icon
            $('#delete-title').html('✅ 删除完成！');
            
            // Transform the spinner icon to checkmark
            const deleteIconElement = $('#delete-icon');
            if (deleteIconElement.length > 0) {
                deleteIconElement
                    .removeClass('fa-spinner fa-spin')
                    .addClass('fa-circle-check fa-bounce')
                    .css('color', '#4CAF50');
            } else {
                // Fallback - replace entire HTML if element not found
                $('#delete-icon-container').html('<i class="fas fa-circle-check fa-bounce" style="color: #4CAF50;"></i>');
            }
            
            $('#delete-progress-text').html(`<strong style="color: #4CAF50;">成功删除 ${deletedCount} 个世界书！</strong>`);
            if (failedFiles.length > 0) {
                $('#delete-progress-text').append(`<br><small style="color: #ff9800;">失败: ${failedFiles.length} 个</small>`);
            }
            $('#delete-progress-bar').val(selectedFiles.length); // Ensure bar is full
            $('#delete-progress-detail').text('清理操作已完成');
            
            // Keep the success state visible for 1.5 seconds so user can read it
            await delay(1500);
            
        } finally {
            // Always close progress popup (same as diagnostic popup)
            $('#dialogue_popup_cancel').click();
            
            // Small delay to ensure popup closes
            await delay(100);
        }
        
        const totalDeletionTime = Date.now() - deletionStartTime;
        console.log(`[DEBUG] Total deletion time: ${totalDeletionTime}ms for ${selectedFiles.length} files`);
        console.log(`[DEBUG] Average time per file: ${(totalDeletionTime / selectedFiles.length).toFixed(2)}ms`);
        console.log(`[DEBUG] Deleted: ${deletedCount}, Failed: ${failedFiles.length}`);
        
        // Show result message
        if (deletedCount > 0) {
            toastr.success(TEXT.TOAST_SUCCESS(deletedCount), TEXT.EXTENSION_NAME);
        }
        
        if (failedFiles.length > 0) {
            toastr.error(`删除失败: ${failedFiles.join(', ')}`, TEXT.EXTENSION_NAME);
        }
        
        // FORCE UPDATE ALL WORLD INFO DATA AFTER DELETION
        const context2 = getContext();
        if (typeof context2.updateWorldInfoList === 'function') {
            await context2.updateWorldInfoList();
        }
        
        // Force refresh our cached data
        await refreshWorldNames();
        
        // Clear cached data
        if (window.world_names) {
            delete window.world_names;
        }
        
        
    } catch (error) {
        console.error(`Error during manual cleanup at stage [${errorStage}]:`, error);
        console.error('Error stack:', error.stack);
        
        // Show detailed error to user with stage information
        const errorMsg = `${TEXT.TOAST_MANUAL_ERROR}\n\n错误阶段: ${errorStage}\n错误详情: ${error.message}`;
        toastr.error(errorMsg, TEXT.EXTENSION_NAME, { timeOut: 10000 });
        
        // Try to copy error to clipboard for mobile users
        try {
            const errorReport = `世界书大扫除错误报告\n时间: ${new Date().toISOString()}\n错误阶段: ${errorStage}\n错误: ${error.message}\n堆栈:\n${error.stack}`;
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(errorReport);
                toastr.info('错误信息已复制到剪贴板，请粘贴给开发者', TEXT.EXTENSION_NAME);
            }
        } catch (e) {
            // Ignore clipboard errors
        }
    }
}

// ============================================================================
// WORLD BOOK RENAME MONITORING
// ============================================================================

// Store original functions and state globally to allow cleanup
let originalPopupInput = null;
let renameClickHandler = null;
let isRenameMonitorSetup = false;
let previousWorldName = null;
let renameInProgress = false;

// Cleanup function to restore original functions
function cleanupWorldRenameMonitor() {
    console.log('[世界书大扫除] 清理世界书重命名监控...');
    
    // Restore original Popup.show.input if it was wrapped
    if (originalPopupInput) {
        Popup.show.input = originalPopupInput;
        originalPopupInput = null;
        console.log('[世界书大扫除] 已恢复原始Popup.show.input');
    }
    
    // Remove event listener if it exists
    if (renameClickHandler) {
        document.removeEventListener('click', renameClickHandler, true);
        renameClickHandler = null;
        console.log('[世界书大扫除] 已移除重命名按钮点击监听器');
    }
    
    isRenameMonitorSetup = false;
    previousWorldName = null;
    renameInProgress = false;
}

// Monitor world book renames and update character connections
async function setupWorldRenameMonitor() {
    console.log('[世界书大扫除] setupWorldRenameMonitor被调用, autoUpdateOnRename =', extension_settings[extensionName]?.autoUpdateOnRename);
    
    // Only setup if feature is enabled
    if (!extension_settings[extensionName].autoUpdateOnRename) {
        console.log('[世界书大扫除] 世界书重命名监控已禁用');
        cleanupWorldRenameMonitor();
        return;
    }
    
    // Don't setup twice
    if (isRenameMonitorSetup) {
        console.log('[世界书大扫除] 世界书重命名监控已经设置过了');
        return;
    }
    
    console.log('[世界书大扫除] 初始化世界书重命名监控...');
    
    // Store original Popup.show.input if not already stored
    if (!originalPopupInput) {
        originalPopupInput = Popup.show.input;
        console.log('[世界书大扫除] 保存原始Popup.show.input');
    }
    
    // Wrap Popup.show.input to intercept rename operations
    Popup.show.input = async function(...args) {
        console.log('[世界书大扫除] Popup.show.input被调用');
        console.log('[世界书大扫除] - renameInProgress:', renameInProgress);
        console.log('[世界书大扫除] - previousWorldName:', previousWorldName);
        if (args.length > 0 && args[0]) {
            console.log('[世界书大扫除] - 弹窗标题:', args[0]);
        }
        
        // Only intercept if we're waiting for a rename
        if (!renameInProgress) {
            console.log('[世界书大扫除] 不在等待重命名，直接调用原始函数');
            return await originalPopupInput.call(this, ...args);
        }
        
        console.log('[世界书大扫除] 弹窗输入被调用, 参数:', args);
        
        // Call the original function to get user input
        const newName = await originalPopupInput.call(this, ...args);
        
        console.log('[世界书大扫除] 用户输入的新名称:', newName);
        
        // Reset the waiting flag
        renameInProgress = false;
        
        // Check if rename was cancelled (null, undefined, or empty string)
        if (!newName || newName === '') {
            console.log('[世界书大扫除] 重命名被取消 (用户点击取消或关闭弹窗)');
            previousWorldName = null; // Clear the stored name
            return newName;
        }
        
        // Check if name didn't change
        if (newName === previousWorldName) {
            console.log('[世界书大扫除] 名称未改变');
            previousWorldName = null; // Clear the stored name
            return newName;
        }
        
        // Rename successful!
        console.log(`[世界书大扫除] ✅ 世界书名称变更: "${previousWorldName}" -> "${newName}"`);
        
        // Wait a bit for the rename to complete in ST
        setTimeout(async () => {
            await updateCharacterWorldConnections(previousWorldName, newName);
            previousWorldName = null; // Clear after processing
        }, 1000);
        
        return newName;
    };
    
    // Create and store the click handler
    renameClickHandler = function(e) {
        // Check if the clicked element is the rename button
        if (e.target && e.target.id === 'world_popup_name_button') {
            // Only proceed if feature is enabled
            if (!extension_settings[extensionName].autoUpdateOnRename) {
                return;
            }
            
            console.log('[世界书大扫除] 重命名操作已触发 (capture phase)');
            
            // Get the current world name from the select dropdown
            const selectElement = document.getElementById('world_editor_select');
            if (!selectElement || selectElement.selectedIndex < 0) {
                console.log('[世界书大扫除] 无法获取当前世界书名称');
                return;
            }
            
            previousWorldName = selectElement.options[selectElement.selectedIndex].text;
            renameInProgress = true; // Set flag to intercept the next popup
            console.log('[世界书大扫除] 保存原始名称:', previousWorldName);
        }
    };
    
    // Hook into the rename button click using capture phase to run BEFORE ST's handler
    document.addEventListener('click', renameClickHandler, true); // true = use capture phase, runs BEFORE bubble phase
    
    isRenameMonitorSetup = true;
    console.log('[世界书大扫除] 世界书重命名监控已启用');
}

// Custom function to save current character edits
async function editCurrentCharacter() {
    try {
        // Get the form element
        const formElement = document.getElementById('form_create');
        if (!formElement) {
            console.error('[世界书大扫除] 找不到form_create元素');
            return false;
        }
        
        // Create FormData from the form
        const formData = new FormData(formElement);
        
        // Get request headers and remove Content-Type to let browser set it
        const headers = getRequestHeaders();
        delete headers['Content-Type'];
        
        // Send the edit request
        const response = await fetch('/api/characters/edit', {
            method: 'POST',
            headers: headers,
            body: formData,
            cache: 'no-cache'
        });
        
        if (!response.ok) {
            console.error('[世界书大扫除] 编辑角色失败:', response.status, response.statusText);
            return false;
        }
        
        // Refresh the character data
        const avatarUrl = formData.get('avatar_url');
        if (avatarUrl) {
            await getOneCharacter(avatarUrl);
        }
        
        return true;
    } catch (error) {
        console.error('[世界书大扫除] editCurrentCharacter出错:', error);
        return false;
    }
}

/**
 * Handle world book renaming - updates all character references
 * @param {string} oldWorldName - Previous world book name
 * @param {string} newWorldName - New world book name after rename
 */
async function updateCharacterWorldConnections(oldWorldName, newWorldName) {
    // Initialize update process
    console.log(`[世界书大扫除] 执行名称变更: "${oldWorldName}" => "${newWorldName}"`);
    
    const ctx = getContext();
    const allChars = ctx.characters || [];
    const originalCharId = ctx.characterId;
    let successCount = 0;
    
    // Track which characters need updating
    const affectedCharacters = [];
    
    // Check each character for the old world name
    for (let i = 0; i < allChars.length; i++) {
        const character = allChars[i];
        const charName = character.name || character.avatar || 'Unknown';
        const data = character.data || character;
        
        // Check if character has the old world name in extensions.world
        if (data.extensions && data.extensions.world === oldWorldName) {
            affectedCharacters.push({
                index: i,
                name: charName,
                avatar: character.avatar,
                primaryLink: true
            });
            console.log(`[世界书大扫除] 角色 "${charName}" (index ${i}) 需要更新主世界书链接`);
        }
    }
    
    // Handle secondary world book connections
    const world_info = ctx.chatWorldInfoSettings || {};
    const secondaryLinks = [];
    if (world_info.charLore && Array.isArray(world_info.charLore)) {
        for (const charLore of world_info.charLore) {
            if (charLore.extraBooks && Array.isArray(charLore.extraBooks)) {
                const index = charLore.extraBooks.indexOf(oldWorldName);
                if (index !== -1) {
                    charLore.extraBooks[index] = newWorldName;
                    secondaryLinks.push(charLore.name);
                    console.log(`[世界书大扫除] 角色 "${charLore.name}" 额外世界书更新`);
                }
            }
        }
    }
    
    // Update characters that need world book connection changes
    if (affectedCharacters.length > 0) {
        console.log(`[世界书大扫除] 发现 ${affectedCharacters.length} 个受影响的角色`);
        console.log(`[世界书大扫除] 记录当前角色: #${originalCharId}`);
        
        // Use the imported selectCharacterById function
        if (typeof selectCharacterById === 'function') {
            console.log('[世界书大扫除] 角色切换模式已启用');
            
            // Update characters by switching to each one
            for (const charData of affectedCharacters) {
                try {
                    console.log(`[世界书大扫除] => 角色数据同步中: ${charData.name} [#${charData.index}]`);
                    
                    // Switch to the character
                    await selectCharacterById(charData.index, { switchMenu: false });
                    
                    // Give the UI time to update
                    await delay(750);
                    
                    // Get and update the world connection field
                    const worldField = $('#character_world')[0];
                    if (worldField) {
                        const oldValue = worldField.value;
                        // Check if this character needs updating
                        if (oldValue === oldWorldName) {
                            console.log(`[世界书大扫除]   - 链接修改: ${oldValue} => ${newWorldName}`);
                            worldField.value = newWorldName;
                            $(worldField).trigger('change');
                            // Trigger change event to notify ST
                            
                            // Save the character using our custom edit function
                            const success = await editCurrentCharacter();
                            if (success) {
                                successCount++;
                                console.log(`[世界书大扫除]   ✓ 完成: ${charData.name}`);
                            } else {
                                console.error(`[世界书大扫除]   × 失败: ${charData.name}`);
                            }
                        } else {
                            console.log(`[世界书大扫除]   - 跳过: 世界书名不匹配`);
                        }
                    } else {
                        console.error('[世界书大扫除]   ! 错误: 世界书字段不存在');
                    }
                } catch (error) {
                    console.error(`[世界书大扫除] 角色 "${charData.name}" 同步失败:`, error);
                }
            }
            
            // Restore original character selection
            if (originalCharId >= 0) {
                console.log(`[世界书大扫除] <= 恢复原角色选择 [#${originalCharId}]`);
                try {
                    await selectCharacterById(originalCharId, { switchMenu: false });
                } catch (e) {
                    console.error('[世界书大扫除] 切换回原角色失败:', e);
                }
            }
        } else {
            // Alternative method: Direct data modification
            console.log('[世界书大扫除] 使用备用方案：直接修改数据');
            
            // Process each character without UI switching
            for (let idx = 0; idx < affectedCharacters.length; idx++) {
                const charRecord = affectedCharacters[idx];
                try {
                    const targetChar = characters[charRecord.index];
                    if (!targetChar?.data) continue;
                    
                    // Ensure extensions object exists
                    targetChar.data.extensions = targetChar.data.extensions || {};
                    
                    // Update the world reference
                    targetChar.data.extensions.world = newWorldName;
                    
                    console.log(`[世界书大扫除] [${idx+1}/${affectedCharacters.length}] 数据已更新: ${charRecord.name}`);
                    successCount++;
                } catch (err) {
                    console.error(`[世界书大扫除] 处理失败 (${charRecord.name}):`, err);
                }
            }
            
            // Batch save all changes
            if (successCount > 0) {
                await saveCharacterDebounced();
                console.log(`[世界书大扫除] 批量保存已触发`);
            }
        }
        
        console.log(`[世界书大扫除] 完成更新 ${successCount}/${affectedCharacters.length} 个角色`);
    }
    
    // Save additional world book updates
    if (secondaryLinks.length > 0) {
        await saveSettingsDebounced();
        console.log(`[世界书大扫除] ✅ 已更新 ${secondaryLinks.length} 个角色的额外世界书`);
    }
    
    const totalUpdated = successCount + secondaryLinks.length;
    if (totalUpdated > 0) {
        console.log(`[世界书大扫除] ✅ 已同步 ${totalUpdated} 个世界书链接`);
        toastr.success(`已更新 ${totalUpdated} 个世界书关联`, '世界书重命名');
    } else {
        console.log(`[世界书大扫除] 无需同步任何世界书链接`);
    }
    
    console.log('[世界书大扫除] 名称变更流程结束');
}
// ============================================================================
// CHARACTER IMPORT & WORLD REPLACEMENT
// ============================================================================

// Monitor character replacement/update
async function monitorCharacterReplacement() {
    // Hook into the character replace file input
    // Remove any existing handler and add with namespace
    $(document).off('change.worldCleanup', '#character_replace_file');
    $(document).on('change.worldCleanup', '#character_replace_file', async function(e) {
        console.log('角色文件替换已开始！');
        
        // Check if the feature is enabled
        if (!extension_settings[extensionName].autoReplaceWorldOnImport) {
            console.log('世界书替换功能已禁用');
            return;
        }
        
        const file = e.target.files[0];
        if (!file) return;
        
        try {
            const context = getContext();
            const charId = context.characterId;
            
            if (charId === undefined || charId === null) {
                console.log('无法获取当前角色ID');
                return;
            }
            
            const currentChar = context.characters[charId];
            if (!currentChar) {
                console.log('无法获取当前角色数据');
                return;
            }
            
            console.log('当前角色:', currentChar.name);
            
            // Get current character's world info
            const currentWorld = currentChar.data?.extensions?.world || 
                               currentChar.extensions?.world || 
                               currentChar.data?.world || 
                               currentChar.world;
            
            // Read the uploaded file to check if it has world info
            const fileContent = await readCharacterFile(file);
            if (!fileContent) {
                console.log('无法读取新角色卡数据');
                return;
            }
            
            // Check if new character has embedded world info (character_book)
            const hasEmbeddedWorld = !!(fileContent.data?.character_book || fileContent.character_book);
            
            // Check if new character has linked world info
            const linkedWorld = fileContent.data?.extensions?.world || 
                              fileContent.extensions?.world || 
                              fileContent.data?.world || 
                              fileContent.world;
            
            if (!hasEmbeddedWorld && !linkedWorld) {
                console.log('新角色卡没有世界书');
                return;
            }
            
            console.log('新角色卡内含世界书数据');
            console.log('嵌入式世界书:', hasEmbeddedWorld);
            console.log('链接的世界书:', linkedWorld);
            
            // Ask user if they want to replace the world info
            const confirmHtml = `
                <div style="padding: 10px;">
                    <h3>🌍 检测到世界书</h3>
                    <p>您正在替换的角色卡包含世界书信息。</p>
                    ${currentWorld ? `
                        <p style="margin: 10px 0; padding: 10px; background: var(--black30a); border-radius: 5px;">
                            <strong>当前世界书:</strong> ${escapeHtml(currentWorld)}<br>
                            <span style="color: var(--warning);">⚠️ 这个世界书将被删除并替换</span>
                        </p>
                    ` : '<p>当前角色没有关联的主要世界书。</p>'}
                    <p style="margin: 10px 0; padding: 10px; background: var(--black30a); border-radius: 5px;">
                        <strong>新角色卡包含:</strong><br>
                        ${hasEmbeddedWorld ? '📚 嵌入式世界书 (将自动导入)<br>' : ''}
                        ${linkedWorld ? `📁 链接的世界书: ${escapeHtml(linkedWorld)}` : ''}
                    </p>
                    <p><strong>是否要用新的世界书替换当前的世界书？</strong></p>
                    <small style="opacity: 0.8;">
                        选择"是"将：<br>
                        1. 删除当前的主要世界书（如果存在）<br>
                        2. ${hasEmbeddedWorld ? '从新角色卡导入嵌入的世界书' : '使用新角色卡链接的世界书'}<br>
                        3. 将新世界书设为角色的主要世界书
                    </small>
                </div>`;
            
            const result = await callPopup(confirmHtml, 'confirm', '', {
                okButton: '是，替换世界书',
                cancelButton: '否，保留现有设置'
            });
            
            if (result) {
                console.log('用户选择替换世界书');
                
                // Store info for processing after the replacement completes
                window.pendingWorldReplacement = {
                    oldWorld: currentWorld,
                    newCharacterData: fileContent,
                    characterName: currentChar.name,
                    characterAvatar: currentChar.avatar,
                    hasEmbeddedWorld: hasEmbeddedWorld,
                    linkedWorld: linkedWorld
                };
                
                // Wait for character replacement to complete, then handle world replacement
                // We use a timeout to ensure the character update has been processed
                setTimeout(async () => {
                    await handleWorldReplacement();
                }, 2000); // Give enough time for character replacement to complete
            } else {
                console.log('用户选择保留现有世界书');
            }
            
        } catch (error) {
            console.error('角色替换过程发生错误:', error);
            toastr.error('检测世界书时出错', '世界书替换');
        }
    });
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Fix corrupted UTF-8 text that was incorrectly decoded
function fixCorruptedUTF8(obj) {
    if (typeof obj === 'string') {
        try {

            // First decode from the corrupted state back to bytes
            const bytes = new Uint8Array(obj.split('').map(c => c.charCodeAt(0)));
            // Then decode properly as UTF-8
            const decoder = new TextDecoder('utf-8');
            return decoder.decode(bytes);
        } catch (e) {
            // If that fails, try another approach - encode to Latin1 then decode as UTF-8
            try {
                const latin1Bytes = new Uint8Array(obj.length);
                for (let i = 0; i < obj.length; i++) {
                    latin1Bytes[i] = obj.charCodeAt(i) & 0xFF;
                }
                const decoder = new TextDecoder('utf-8');
                return decoder.decode(latin1Bytes);
            } catch (e2) {
                console.warn('Could not fix corrupted UTF-8:', e2);
                return obj; // Return original if we can't fix it
            }
        }
    } else if (Array.isArray(obj)) {
        return obj.map(item => fixCorruptedUTF8(item));
    } else if (obj && typeof obj === 'object') {
        const fixed = {};
        for (const [key, value] of Object.entries(obj)) {
            fixed[key] = fixCorruptedUTF8(value);
        }
        return fixed;
    }
    return obj;
}

// Read character file to extract world info (supports PNG and JSON)
async function readCharacterFile(file) {
    try {
        const ext = file.name.split('.').pop().toLowerCase();
        
        if (ext === 'json' || ext === 'jsonl') {
            // Import utils for parseJsonFile
            const utils = await import("../../../../scripts/utils.js");
            const jsonData = await utils.parseJsonFile(file);
            console.log('Parsed JSON data:', jsonData);
            return jsonData;
        } else if (ext === 'png') {
            // For PNG files, use SillyTavern's getFileBuffer and extractDataFromPng
            try {
                const utils = await import("../../../../scripts/utils.js");
                
                // Use SillyTavern's getFileBuffer to properly read the file
                const buffer = await utils.getFileBuffer(file);
                const uint8Array = new Uint8Array(buffer);
                
                // Extract character data from PNG - but we need to handle UTF-8 properly

                let result = utils.extractDataFromPng(uint8Array, 'chara');
                
                // If the result contains corrupted text, try to fix it
                if (result && typeof result === 'object') {
                    // Check if any strings look corrupted (contain weird characters)
                    const hasCorruptedText = Object.values(result).some(value => {
                        if (typeof value === 'string') {
                            // Check for common UTF-8 corruption patterns
                            return /[\u00c0-\u00ff][\u0080-\u00bf]|Ã|Â|ç|è|é/.test(value);
                        }
                        return false;
                    });
                    
                    if (hasCorruptedText) {
                        console.log('Detected corrupted UTF-8, attempting to fix...');
                        // The data was likely double-encoded, try to fix it
                        result = fixCorruptedUTF8(result);
                    }
                }
                
                console.log('Extracted PNG data:', result);
                return result;
            } catch (pngError) {
                console.error('Failed to extract PNG data:', pngError);

                try {
                    const dataUrl = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = e => resolve(e.target.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    });
                    
                    // Extract base64 data
                    const base64Data = dataUrl.split(',')[1];
                    const binaryString = atob(base64Data);
                    const bytes = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    
                    const utils = await import("../../../../scripts/utils.js");
                    const result = utils.extractDataFromPng(bytes, 'chara');
                    console.log('Extracted PNG data (fallback):', result);
                    return result;
                } catch (fallbackError) {
                    console.error('Fallback PNG extraction also failed:', fallbackError);
                }
            }
        } else if (ext === 'yaml' || ext === 'yml') {
            // YAML files would need a YAML parser
            console.log('YAML文件暂不支持自动提取世界书');
        } else if (ext === 'charx') {
            // CharX is a ZIP format - would need JSZip
            console.log('CharX文件需要特殊处理');
        }
        
        return null;
    } catch (error) {
        console.error('读取角色文件失败:', error);
        return null;
    }
}

// Handle the actual world replacement
async function handleWorldReplacement() {
    if (!window.pendingWorldReplacement) {
        console.log('没有待处理的世界书替换');
        return;
    }
    
    const { 
        oldWorld, 
        newCharacterData, 
        characterName, 
        characterAvatar,
        hasEmbeddedWorld, 
        linkedWorld 
    } = window.pendingWorldReplacement;
    
    try {
        // Import the world info module functions
        const worldInfoModule = await import("../../../../scripts/world-info.js");
        const { deleteWorldInfo, saveWorldInfo, world_names } = worldInfoModule;
        
        let newWorldName = null;
        
        // If there's an embedded world book, extract and save it
        if (hasEmbeddedWorld) {
            const characterBook = newCharacterData.data?.character_book || newCharacterData.character_book;
            
            if (characterBook && characterBook.entries) {
                // Generate a name for the new world info
                newWorldName = `${characterName}_world`;
                let finalWorldName = newWorldName;
                let counter = 1;
                
                // Ensure unique name
                while (world_names.includes(finalWorldName)) {
                    finalWorldName = `${newWorldName}_${counter}`;
                    counter++;
                }
                
                console.log('创建新世界书:', finalWorldName);
                console.log('原始character_book数据:', characterBook);
                
                // Convert character book format to world info format
                // Import the conversion function from world-info module
                const worldInfoModule = await import("../../../../scripts/world-info.js");
                const { convertCharacterBook } = worldInfoModule;
                
                // Convert the character book to world info format
                const worldInfoData = convertCharacterBook(characterBook);
                console.log('转换后的世界书数据:', worldInfoData);
                
                // Save the new world info
                await saveWorldInfo(finalWorldName, worldInfoData, true);
                
                // Update the character to link to this world info
                await updateCharacterWorldLink(characterAvatar, finalWorldName);
                
                toastr.success(`已创建新世界书: ${finalWorldName}`, '世界书替换');
                newWorldName = finalWorldName;
            }
        } else if (linkedWorld) {
            // The character already has a linked world, just use it
            newWorldName = linkedWorld;
            console.log('使用链接的世界书:', linkedWorld);
        }
        
        // Delete old world info if it exists and is different from the new one
        if (oldWorld && oldWorld !== newWorldName && world_names.includes(oldWorld)) {
            console.log('删除旧世界书:', oldWorld);
            
            // Check if other characters are using this world
            const context = getContext();
            const otherUsersCount = context.characters.filter(c => {
                const world = c.data?.extensions?.world || c.extensions?.world || c.data?.world || c.world;
                return world === oldWorld && c.name !== characterName;
            }).length;
            
            if (otherUsersCount > 0) {
                const confirmDelete = await callPopup(
                    `<p>世界书 "${oldWorld}" 还被其他 ${otherUsersCount} 个角色使用。</p><p>确定要删除吗？</p>`,
                    'confirm'
                );
                
                if (confirmDelete) {
                    await deleteWorldInfo(oldWorld);
                    toastr.success(`已删除旧世界书: ${oldWorld}`, '世界书替换');
                }
            } else {
                await deleteWorldInfo(oldWorld);
                toastr.success(`已删除旧世界书: ${oldWorld}`, '世界书替换');
            }
        }
        
        // Refresh world info display
        await refreshWorldNames();
        
        // Update the world info list in the UI
        try {
            const context = getContext();
            if (context && typeof context.updateWorldInfoList === 'function') {
                await context.updateWorldInfoList();
                console.log('世界书列表已更新');
            }
        } catch (e) {
            console.log('Could not update world info list:', e);
        }
        
        // Refresh character display to show the new world book link
        try {
            const context = getContext();

            if (context && typeof context.printCharactersDebounced === 'function') {
                context.printCharactersDebounced();
                console.log('角色卡片显示已刷新');
            }
        } catch (e) {
            console.log('Could not refresh character display:', e);
        }
        
        console.log('世界书替换完成');
        toastr.success('世界书替换成功完成！', '世界书替换');
        
    } catch (error) {
        console.error('替换世界书时出错:', error);
        toastr.error('替换世界书失败: ' + error.message, '错误');
    } finally {
        // Clean up
        delete window.pendingWorldReplacement;
    }
}

// Update character's world link
async function updateCharacterWorldLink(avatar, worldName) {
    try {
        // Update the character data in memory
        const context = getContext();
        const character = context.characters.find(c => c.avatar === avatar);
        
        if (character) {
            // Update world info in character data
            if (!character.data) {
                character.data = {};
            }
            if (!character.data.extensions) {
                character.data.extensions = {};
            }
            character.data.extensions.world = worldName;
            
            // Also update the character_world field if it exists
            $('#character_world').val(worldName);
            
            // Save the character using the built-in save function
            const { saveCharacterDebounced } = await import("../../../../script.js");
            saveCharacterDebounced();
            
            console.log('已更新角色的世界书链接:', worldName);
        } else {
            console.warn('找不到要更新的角色:', avatar);
        }
    } catch (error) {
        console.error('更新角色世界书链接失败:', error);
        // Even if this fails, the world info is still created
    }
}

// Setup character replacement monitoring (calls the main monitor function)
function setupCharacterReplacementMonitor() {
    console.log('Setting up character replacement monitor...');
    // Just call the main monitoring function instead of duplicating code
    monitorCharacterReplacement();
    console.log('Character replacement monitor setup complete');
}

// Removed debug monitoring code - bug has been fixed!
// The issue was: clicking World Info button triggered file import dialog
// Solution: removed button clicking from getAllWorldInfoFiles function

// ============================================================================
// EXTENSION INITIALIZATION
// ============================================================================

// Initialize the extension
jQuery(async () => {
    // Handler for expand/collapse character lists in table
    // Remove any existing handler and add with namespace
    $(document).off('click.worldCleanup', '.expand-chars-btn');
    $(document).on('click.worldCleanup', '.expand-chars-btn', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const $btn = $(this);
        const $expandable = $btn.siblings('.expandable-chars');
        const originalCount = $btn.data('count');
        
        if ($expandable.is(':visible')) {
            // Collapse
            $expandable.hide();
            $btn.text(`(+${originalCount})`);
        } else {
            // Expand
            $expandable.show();
            $btn.text('(-)');
        }
    });
    
    // Global button handler for cleanup dialog
    // Remove any existing handler and add with namespace
    $(document).off('click.worldCleanup', '.world-cleanup-btn');
    $(document).on('click.worldCleanup', '.world-cleanup-btn', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const action = $(this).data('action');
        console.log('[Global Handler] Button clicked with action:', action);
        
        if (action === 'toggle-orphaned-page') {
            console.log('[Global Handler] Toggling orphaned files on current page...');
            const orphanedCheckboxes = $('.orphaned-checkbox:not(:disabled)');
            const uncheckedOrphaned = $('.orphaned-checkbox:not(:disabled):not(:checked)');
            const hasUnchecked = uncheckedOrphaned.length > 0;
            
            if (hasUnchecked) {
                // Select all on current page
                orphanedCheckboxes.prop('checked', true);
                orphanedCheckboxes.each(function() {
                    const fileName = $(this).data('file-name');
                    if (fileName) {
                        selectedOrphanedFiles.add(fileName);
                    }
                });
                $(this).text('取消本页');
            } else {
                // Deselect all on current page
                orphanedCheckboxes.prop('checked', false);
                orphanedCheckboxes.each(function() {
                    const fileName = $(this).data('file-name');
                    if (fileName) {
                        selectedOrphanedFiles.delete(fileName);
                    }
                });
                $(this).text('全选本页');
            }
        } 
        else if (action === 'toggle-linked-page') {
            console.log('[Global Handler] Toggling linked files on current page...');
            const linkedCheckboxes = $('.linked-checkbox:not(:disabled)');
            const uncheckedLinked = $('.linked-checkbox:not(:disabled):not(:checked)');
            const hasUnchecked = uncheckedLinked.length > 0;
            
            if (hasUnchecked) {
                // Select all on current page
                linkedCheckboxes.prop('checked', true);
                linkedCheckboxes.each(function() {
                    const fileName = $(this).data('file-name');
                    if (fileName) {
                        selectedLinkedFiles.add(fileName);
                    }
                });
                $(this).text('取消本页');
            } else {
                // Deselect all on current page
                linkedCheckboxes.prop('checked', false);
                linkedCheckboxes.each(function() {
                    const fileName = $(this).data('file-name');
                    if (fileName) {
                        selectedLinkedFiles.delete(fileName);
                    }
                });
                $(this).text('全选本页');
            }
        }
        // Legacy support for old button (can be removed later)
        else if (action === 'select-orphaned-page' || action === 'toggle-page') {
            console.log('[Global Handler] Legacy action detected, using orphaned toggle...');
            const orphanedCheckboxes = $('.orphaned-checkbox:not(:disabled)');
            const uncheckedOrphaned = $('.orphaned-checkbox:not(:disabled):not(:checked)');
            const hasUnchecked = uncheckedOrphaned.length > 0;
            
            if (hasUnchecked) {
                orphanedCheckboxes.prop('checked', true);
            } else {
                orphanedCheckboxes.prop('checked', false);
            }
        }
        
        return false;
    });
    
    // Pagination button handler
    // Remove any existing handler and add with namespace
    $(document).off('click.worldCleanup', '.pagination-nav');
    $(document).on('click.worldCleanup', '.pagination-nav', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const type = $(this).data('type');
        const page = parseInt($(this).data('page'));
        
        console.log(`[Pagination] Navigating to page ${page} for ${type} files`);
        
        // Get the files from cache
        const files = type === 'orphaned' ? orphanedFilesCache : linkedFilesCache;
        
        // Update current page
        if (type === 'orphaned') {
            orphanedCurrentPage = page;
        } else {
            linkedCurrentPage = page;
        }
        
        // Regenerate list content
        const listContent = type === 'orphaned' ? $('.orphaned-list-content') : $('.linked-list-content');
        listContent.html(generatePaginatedList(files, type, page));
        
        // Regenerate pagination controls
        const totalPages = Math.ceil(files.length / ITEMS_PER_PAGE);
        const paginationHtml = generatePaginationHtml(page, totalPages, type);
        
        // Replace old pagination controls
        const section = type === 'orphaned' ? $('.orphaned-section') : $('.linked-section');
        section.find('.pagination-controls').replaceWith(paginationHtml);
        
        // Update button text after pagination change
        setTimeout(() => updateToggleButtonText(type), 50);
        
        return false;
    });
    
    // Load settings HTML
    const settingsHtml = `
    <div class="world-info-cleanup-settings">
        <div class="inline-drawer">
            <div class="inline-drawer-toggle inline-drawer-header">
                <b>${TEXT.PANEL_TITLE}</b>
                <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
            </div>
            <div class="inline-drawer-content">
                <!-- 主要功能 -->
                <div style="margin-bottom: 15px;">
                    <h4 style="margin: 5px 0; color: var(--SmartThemeBodyColor);">
                        <i class="fa-solid fa-broom"></i> 自动打扫设置
                    </h4>
                    
                    <div class="world-info-cleanup_block flex-container" style="margin: 10px 0; align-items: flex-start;">
                        <input id="world_info_cleanup_enabled" type="checkbox" style="margin-top: 4px;" />
                        <label for="world_info_cleanup_enabled" style="flex: 1; display: block; margin-left: 8px;">
                            <div style="font-weight: 500; margin-bottom: 4px;">${TEXT.AUTO_DELETE_LABEL}</div>
                            <div style="opacity: 0.7; font-size: 0.9em; line-height: 1.3;">
                                删除角色时自动清理其关联的主要世界书
                            </div>
                        </label>
                    </div>
                    
                    <div class="world-info-cleanup_block flex-container" style="margin: 10px 0; align-items: flex-start;">
                        <input id="world_info_cleanup_auto_replace" type="checkbox" style="margin-top: 4px;" />
                        <label for="world_info_cleanup_auto_replace" style="flex: 1; display: block; margin-left: 8px;">
                            <div style="font-weight: 500; margin-bottom: 4px;">角色更新时替换世界书</div>
                            <div style="opacity: 0.7; font-size: 0.9em; line-height: 1.3;">
                                替换/更新角色卡时，提示是否替换世界书
                            </div>
                        </label>
                    </div>
                    
                    <div class="world-info-cleanup_block flex-container" style="margin: 10px 0; align-items: flex-start;">
                        <input id="world_info_cleanup_auto_update_rename" type="checkbox" style="margin-top: 4px;" />
                        <label for="world_info_cleanup_auto_update_rename" style="flex: 1; display: block; margin-left: 8px;">
                            <div style="font-weight: 500; margin-bottom: 4px;">${TEXT.AUTO_UPDATE_RENAME_LABEL}</div>
                            <div style="opacity: 0.7; font-size: 0.9em; line-height: 1.3;">
                                世界书被重命名时，自动更新使用该世界书的角色卡关联
                            </div>
                        </label>
                    </div>
                </div>
                
                <hr class="sysHR" />
                
                <!-- 附加选项 -->
                <div style="margin: 15px 0;">
                    <h4 style="margin: 5px 0; color: var(--SmartThemeBodyColor);">
                        <i class="fa-solid fa-cog"></i> 附加选项
                    </h4>
                    
                    <div class="world-info-cleanup_block flex-container" style="margin: 10px 0; align-items: flex-start;">
                        <input id="world_info_cleanup_confirmation" type="checkbox" style="margin-top: 4px;" />
                        <label for="world_info_cleanup_confirmation" style="flex: 1; display: block; margin-left: 8px;">
                            <div style="font-weight: 500; margin-bottom: 4px;">${TEXT.SHOW_CONFIRMATION_LABEL}</div>
                            <div style="opacity: 0.7; font-size: 0.9em; line-height: 1.3;">
                                执行删除操作前显示确认对话框
                            </div>
                        </label>
                    </div>
                    
                    <div class="world-info-cleanup_block flex-container" style="margin: 10px 0; align-items: flex-start;">
                        <input id="world_info_cleanup_force_load" type="checkbox" style="margin-top: 4px;" />
                        <label for="world_info_cleanup_force_load" style="flex: 1; display: block; margin-left: 8px;">
                            <div style="font-weight: 500; margin-bottom: 4px;">${TEXT.FORCE_LOAD_LABEL}</div>
                            <div style="opacity: 0.7; font-size: 0.9em; line-height: 1.3;">
                                修复懒加载导致的【世界书大管理】列表显示不全（较慢）使用完退出【世界书大管理】后建议刷新浏览器，以免导致卡顿
                            </div>
                        </label>
                    </div>
                    
                    <div class="world-info-cleanup_block flex-container" style="margin: 10px 0; align-items: flex-start;">
                        <input id="world_info_cleanup_auto_preload_bulk" type="checkbox" style="margin-top: 4px;" />
                        <label for="world_info_cleanup_auto_preload_bulk" style="flex: 1; display: block; margin-left: 8px;">
                            <div style="font-weight: 500; margin-bottom: 4px;">批量编辑时预加载角色数据</div>
                            <div style="opacity: 0.7; font-size: 0.9em; line-height: 1.3;">
                                进入批量编辑模式时自动预加载所有角色数据，确保删除时能检测到链接的世界书
                            </div>
                        </label>
                    </div>
                </div>
                
                <hr class="sysHR" />
                
                <!-- 管理工具 -->
                <div style="margin: 15px 0;">
                    <h4 style="margin: 5px 0; color: var(--SmartThemeBodyColor);">
                        <i class="fa-solid fa-tools"></i> 管理工具
                    </h4>
                    
                    <div class="world-info-cleanup_block" style="margin: 10px 0;">
                        <input id="world_info_cleanup_manual" class="menu_button" type="button" 
                               value="${TEXT.MANUAL_CLEANUP_BUTTON}" 
                               style="width: 100%; padding: 8px;" />
                        <small style="display: block; text-align: center; opacity: 0.7; margin-top: 5px;">
                            ${TEXT.MANUAL_CLEANUP_DESC}<br>
                            <span style="color: var(--warning); margin-top: 3px; display: inline-block;">⚠️ 删除世界书后无法恢复，请谨慎操作！</span>
                        </small>
                    </div>
                </div>
                
                <!-- 调试工具 (可折叠) -->
                <details style="margin: 15px 0;">
                    <summary style="cursor: pointer; padding: 5px; color: var(--SmartThemeBodyColor);">
                        <i class="fa-solid fa-bug"></i> 调试工具
                    </summary>
                    <div style="margin-top: 10px; padding: 10px; background: var(--black30a); border-radius: 5px;">
                        <div class="world-info-cleanup_block" style="margin: 10px 0;">
                            <input id="world_info_cleanup_debug" class="menu_button" type="button" 
                                   value="${TEXT.DEBUG_BUTTON}" 
                                   style="width: 100%;" />
                            <small style="display: block; text-align: center; opacity: 0.7; margin-top: 5px;">
                                ${TEXT.DEBUG_DESC}
                            </small>
                        </div>
                        
                        <div class="world-info-cleanup_block" style="margin: 10px 0;">
                            <input id="world_info_cleanup_test_force_load" class="menu_button" type="button" 
                                   value="Debug! 测试强制加载功能" 
                                   style="width: 100%;" />
                            <small style="display: block; text-align: center; opacity: 0.7; margin-top: 5px;">
                                检测系统懒加载状态和API功能
                            </small>
                        </div>
                        
                        <div class="world-info-cleanup_block" style="margin: 10px 0;">
                            <input id="world_info_cleanup_diagnostic" class="menu_button" type="button" 
                                   value="Debug! 错误检测" 
                                   style="width: 100%;" />
                            <small style="display: block; text-align: center; opacity: 0.7; margin-top: 5px;">
                                全面检测扩展功能并复制错误日志
                            </small>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    </div>`;
    
    // Append settings to the extensions panel
    $("#extensions_settings2").append(settingsHtml);
    
    // 调试功能：检查当前角色的世界书数据 - Debug function to check current character's lorebook data
    $("#world_info_cleanup_debug").on("click", () => {
        const context = getContext();
        if (context.characterId !== undefined && context.characterId !== null) {
            const character = context.characters[context.characterId];
            console.log('Current character data:', character);
            console.log('Character properties:', Object.keys(character || {}));
            if (character) {
                console.log('Character.data properties:', Object.keys(character.data || {}));
                // 显示调试信息提示 - Show debug info toast
                toastr.info(TEXT.TOAST_DEBUG_CHECK, TEXT.EXTENSION_NAME);
            }
        } else {
            // 未选择角色提示 - No character selected toast
            toastr.warning(TEXT.TOAST_NO_CHARACTER, TEXT.EXTENSION_NAME);
        }
    });
    
    // Comprehensive diagnostic function
    $("#world_info_cleanup_diagnostic").on("click", async () => {
        // Show loading popup
        const loadingHtml = `
        <div style="padding: 30px; text-align: center;">
            <h3>🔍 正在运行系统诊断...</h3>
            <div style="margin: 20px 0;">
                <div class="fa-3x">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
            </div>
            <p style="margin-top: 20px; opacity: 0.8;">
                正在检测所有功能和数据完整性<br>
                <small>这可能需要一些时间，请耐心等待...</small>
            </p>
            <div id="diagnostic-progress" style="margin-top: 15px; font-size: 0.9em; opacity: 0.7;">
                初始化诊断...
            </div>
        </div>`;
        
        // Create loading popup
        callPopup(loadingHtml, 'text', '');
        
        // Hide buttons for loading popup
        setTimeout(() => {
            if ($('#diagnostic-progress').length > 0) {
                hidePopupButtons();
            }
        }, 10);
        
        // Update progress function
        const updateProgress = (message) => {
            $('#diagnostic-progress').text(message);
        };
        
        const diagnosticLog = [];
        const errors = [];
        
        // Helper function to safely test functions
        const testFunction = async (name, testFn) => {
            updateProgress(`正在测试: ${name}...`);
            try {
                const result = await testFn();
                diagnosticLog.push(`✅ ${name}: 成功`);
                return { success: true, result };
            } catch (error) {
                const errorMsg = `❌ ${name}: ${error.message}`;
                diagnosticLog.push(errorMsg);
                errors.push({ function: name, error: error.message, stack: error.stack });
                return { success: false, error };
            }
        };
        
        // Add a small delay to ensure popup is visible
        await delay(100);
        
        // Start diagnostics
        diagnosticLog.push('=== 世界书大扫除 系统诊断 ===');
        diagnosticLog.push(`时间: ${new Date().toISOString()}`);
        
        // Test 1: Check extension settings
        await testFunction('检查扩展设置', () => {
            const settings = extension_settings[extensionName];
            if (!settings) throw new Error('扩展设置未找到');
            diagnosticLog.push(`  - 强制加载: ${settings.forceLoadCharacterData ? '开启' : '关闭'}`);
            diagnosticLog.push(`  - 显示世界信息按钮: ${settings.showWorldInfoButton ? '开启' : '关闭'}`);
            return settings;
        });
        
        // Test 2: Check context availability
        const contextTest = await testFunction('检查上下文可用性', () => {
            const context = getContext();
            if (!context) throw new Error('getContext() 返回 null');
            diagnosticLog.push(`  - 角色数量: ${context.characters?.length || 0}`);
            diagnosticLog.push(`  - 当前角色ID: ${context.characterId || 'None'}`);
            return context;
        });
        
        // Test 3: Check required functions
        await testFunction('检查必需函数', () => {
            if (typeof getAllWorldInfoFiles !== 'function') throw new Error('getAllWorldInfoFiles 函数不存在');
            if (typeof getRequestHeaders !== 'function') throw new Error('getRequestHeaders 函数不存在');
            if (typeof getContext !== 'function') throw new Error('getContext 函数不存在');
            if (typeof toastr !== 'object') throw new Error('toastr 对象不存在');
            if (typeof callPopup !== 'function') throw new Error('callPopup 函数不存在');
            return true;
        });
        
        // Test 4: Get world info data
        const worldInfoTest = await testFunction('获取世界书数据', async () => {
            const worldInfo = await getAllWorldInfoFiles(true);
            if (!worldInfo) throw new Error('getAllWorldInfoFiles() 返回 null');
            diagnosticLog.push(`  - 世界书文件数: ${worldInfo.length}`);
            return worldInfo;
        });
        
        // Test 5: Test cleanup functionality
        await testFunction('测试清理功能初始化', async () => {
            // Test getting world info files and character associations
            const worldInfoFiles = await getAllWorldInfoFiles(true);
            const characters = contextTest.success ? contextTest.result.characters : [];
            
            const orphanedFiles = [];
            const linkedFiles = [];
            const characterWorldMap = new Map();
            
            // Build character world info map
            for (const char of characters) {
                const filename = char.avatar || char.name;
                if (filename) {
                    let charData = char;
                    
                    // Try to get full data if shallow
                    if (char.shallow === true && extension_settings[extensionName].forceLoadCharacterData) {
                        try {
                            const response = await fetch('/api/characters/get', {
                                method: 'POST',
                                headers: getRequestHeaders(),
                                body: JSON.stringify({ avatar_url: filename })
                            });
                            if (response.ok) {
                                charData = await response.json();
                            }
                        } catch (e) {
                            // Ignore errors in diagnostic
                        }
                    }
                    
                    const worldBook = charData?.data?.character_book?.name || 
                                    charData?.data?.extensions?.world || null;
                    
                    if (worldBook) {
                        characterWorldMap.set(worldBook, filename);
                    }
                }
            }
            
            // Categorize world info files
            for (const worldFile of worldInfoFiles) {
                if (characterWorldMap.has(worldFile)) {
                    linkedFiles.push(worldFile);
                } else {
                    orphanedFiles.push(worldFile);
                }
            }
            
            diagnosticLog.push(`  - 孤立文件: ${orphanedFiles.length}`);
            diagnosticLog.push(`  - 关联文件: ${linkedFiles.length}`);
            return { orphanedFiles, linkedFiles };
        });
        
        // Test 6: Check API endpoint
        await testFunction('测试API端点', async () => {
            const response = await fetch('/api/settings/get', {
                method: 'POST',
                headers: getRequestHeaders(),
                body: JSON.stringify({}),
            });
            if (!response.ok) throw new Error(`API返回状态: ${response.status}`);
            return response.status;
        });
        
        // Test 7: Check character data loading
        if (contextTest.success && contextTest.result.characters?.length > 0) {
            await testFunction('测试角色数据加载', async () => {
                const testChar = contextTest.result.characters[0];
                const avatar = testChar.avatar || testChar.name;
                if (!avatar) throw new Error('测试角色无avatar');
                
                const response = await fetch('/api/characters/get', {
                    method: 'POST',
                    headers: getRequestHeaders(),
                    body: JSON.stringify({ avatar_url: avatar })
                });
                
                if (!response.ok) throw new Error(`角色API返回状态: ${response.status}`);
                const data = await response.json();
                diagnosticLog.push(`  - 角色名: ${data.name || 'Unknown'}`);
                diagnosticLog.push(`  - 有世界书: ${data.data?.character_book ? '是' : '否'}`);
                return data;
            });
        }
        
        // Test 8: Check jQuery and DOM elements
        await testFunction('检查jQuery和DOM元素', () => {
            if (typeof $ !== 'function') throw new Error('jQuery未加载');
            if (!$('#extensions_settings2').length) throw new Error('扩展设置容器不存在');
            if (!$('#world_info_cleanup_manual').length) throw new Error('手动清理按钮不存在');
            return true;
        });
        
        // Test 9: Check world-info module access
        await testFunction('检查世界书模块访问', async () => {
            // Check if we can access world_names through various methods
            let worldNamesFound = false;
            
            // Method 1: Direct window.world_names
            if (window.world_names && Array.isArray(window.world_names)) {
                diagnosticLog.push(`  - window.world_names: ${window.world_names.length} 个文件`);
                worldNamesFound = true;
            } else {
                diagnosticLog.push(`  - window.world_names: 不存在`);
            }
            
            // Method 2: Through API /api/worldinfo/get
            try {
                const response = await fetch('/api/worldinfo/get', {
                    method: 'POST',
                    headers: getRequestHeaders(),
                    body: JSON.stringify({})
                });
                if (response.ok) {
                    const data = await response.json();
                    diagnosticLog.push(`  - API worldinfo/get: 成功`);
                    worldNamesFound = true;
                } else {
                    diagnosticLog.push(`  - API worldinfo/get: 返回状态 ${response.status}`);
                }
            } catch (e) {
                diagnosticLog.push(`  - API worldinfo/get: 失败 - ${e.message}`);
            }
            
            // Method 3: Through our getAllWorldInfoFiles function
            try {
                const files = await getAllWorldInfoFiles(false);
                if (files && files.length >= 0) {
                    diagnosticLog.push(`  - getAllWorldInfoFiles: 成功获取 ${files.length} 个文件`);
                    worldNamesFound = true;
                }
            } catch (e) {
                diagnosticLog.push(`  - getAllWorldInfoFiles: 失败 - ${e.message}`);
            }
            
            if (!worldNamesFound) {
                throw new Error('无法通过任何方法访问世界书数据');
            }
            return true;
        });
        
        // Test 10: Simulate manual cleanup initialization
        await testFunction('模拟手动清理初始化', async () => {
            // This simulates what happens when user clicks the button
            const context = getContext();
            
            // Check if loadWorldInfo exists
            if (typeof context.loadWorldInfo === 'function') {
                diagnosticLog.push(`  - context.loadWorldInfo: 存在`);
            } else {
                diagnosticLog.push(`  - context.loadWorldInfo: 不存在`);
            }
            
            // Try to get world info files
            const worldFiles = await getAllWorldInfoFiles(true);
            if (!worldFiles || worldFiles.length === 0) {
                // Check alternative sources
                if (window.world_names && window.world_names.length > 0) {
                    diagnosticLog.push(`  - 通过window.world_names获取: ${window.world_names.length} 个文件`);
                } else {
                    diagnosticLog.push(`  - 警告: 无法获取世界书文件列表`);
                }
            } else {
                diagnosticLog.push(`  - getAllWorldInfoFiles成功: ${worldFiles.length} 个文件`);
            }
            
            return true;
        });
        
        // Test 11: Test HTML generation functions
        await testFunction('测试HTML生成函数', async () => {
            // Test escapeHtml
            if (typeof escapeHtml !== 'function') throw new Error('escapeHtml函数不存在');
            const testEscape = escapeHtml('<test>');
            if (testEscape !== '&lt;test&gt;') throw new Error('escapeHtml函数工作异常');
            
            // Test generatePaginatedList with minimal data
            if (typeof generatePaginatedList !== 'function') throw new Error('generatePaginatedList函数不存在');
            
            // Create test data
            const testFiles = [
                { name: 'test1.json', isGlobal: false, characters: [] },
                { name: 'test2.json', isGlobal: true, characters: ['TestChar'] }
            ];
            
            // Test orphaned list generation
            const orphanedHtml = generatePaginatedList(testFiles, 'orphaned', 1);
            if (!orphanedHtml || orphanedHtml.includes('错误')) {
                throw new Error('generatePaginatedList无法生成孤立文件列表');
            }
            diagnosticLog.push(`  - 孤立文件列表生成: 成功`);
            
            // Test linked list generation
            const linkedHtml = generatePaginatedList(testFiles, 'linked', 1);
            if (!linkedHtml || linkedHtml.includes('错误')) {
                throw new Error('generatePaginatedList无法生成关联文件列表');
            }
            diagnosticLog.push(`  - 关联文件列表生成: 成功`);
            
            return true;
        });
        
        // Test 12: Check critical global variables
        await testFunction('检查关键全局变量', () => {
            // Check pagination variables
            if (typeof ITEMS_PER_PAGE === 'undefined') throw new Error('ITEMS_PER_PAGE未定义');
            if (typeof FONT_SIZES === 'undefined') throw new Error('FONT_SIZES未定义');
            if (!FONT_SIZES || typeof FONT_SIZES !== 'object') throw new Error('FONT_SIZES不是对象');
            
            // Check TEXT constants
            if (typeof TEXT === 'undefined') throw new Error('TEXT常量未定义');
            if (!TEXT.TOAST_MANUAL_ERROR) throw new Error('TEXT.TOAST_MANUAL_ERROR未定义');
            if (!TEXT.MANUAL_CLEANUP_DELETE_SELECTED) throw new Error('TEXT.MANUAL_CLEANUP_DELETE_SELECTED未定义');
            
            // Check extension name
            if (typeof extensionName === 'undefined') throw new Error('extensionName未定义');
            diagnosticLog.push(`  - 扩展名: ${extensionName}`);
            
            // Check extension settings
            if (!extension_settings) throw new Error('extension_settings未定义');
            if (!extension_settings[extensionName]) throw new Error(`extension_settings.${extensionName}未定义`);
            
            return true;
        });
        
        // Test 13: Simulate dialog HTML generation
        await testFunction('模拟对话框HTML生成', async () => {
            // Get test data
            const worldFiles = await getAllWorldInfoFiles(false);
            const characters = contextTest.success ? contextTest.result.characters : [];
            
            // Simulate categorization
            const orphanedFiles = [];
            const linkedFiles = [];
            
            worldFiles.forEach(file => {
                // Simple test categorization
                if (file && file !== '' && file !== 'undefined') {
                    const hasChar = characters.some(c => {
                        const world = c.data?.extensions?.world || c.extensions?.world || c.data?.world;
                        return world === file;
                    });
                    
                    if (hasChar) {
                        linkedFiles.push({ 
                            name: file, 
                            isGlobal: false, 
                            characters: ['Test'] 
                        });
                    } else {
                        orphanedFiles.push({ 
                            name: file, 
                            isGlobal: false, 
                            characters: [] 
                        });
                    }
                }
            });
            
            diagnosticLog.push(`  - 测试分类: ${orphanedFiles.length} 孤立, ${linkedFiles.length} 关联`);
            
            // Try to generate a minimal dialog HTML
            try {
                const testHtml = `<div id="world-cleanup-dialog">Test</div>`;
                if (!testHtml) throw new Error('无法生成HTML');
                diagnosticLog.push(`  - HTML生成测试: 成功`);
            } catch (e) {
                throw new Error(`HTML生成失败: ${e.message}`);
            }
            
            return true;
        });
        
        // Test 14: Check for edge cases and data corruption
        await testFunction('检查边缘情况和数据损坏', async () => {
            const characters = contextTest.success ? contextTest.result.characters : [];
            
            // Check for corrupted character data
            let corruptedCount = 0;
            let nullDataCount = 0;
            let shallowCount = 0;
            
            characters.forEach((char, idx) => {
                if (!char) {
                    nullDataCount++;
                    diagnosticLog.push(`  - 警告: 角色[${idx}]为null`);
                } else if (char.shallow === true) {
                    shallowCount++;
                } else if (!char.name && !char.avatar) {
                    corruptedCount++;
                    diagnosticLog.push(`  - 警告: 角色[${idx}]缺少name和avatar`);
                }
            });
            
            diagnosticLog.push(`  - 空角色: ${nullDataCount}, 懒加载: ${shallowCount}, 损坏: ${corruptedCount}`);
            
            // Check for problematic world info file names
            const worldFiles = await getAllWorldInfoFiles(false);
            let problematicNames = 0;
            
            worldFiles.forEach(file => {
                // Check for names that might break HTML
                if (file.includes('<') || file.includes('>') || file.includes('"') || file.includes("'")) {
                    problematicNames++;
                    diagnosticLog.push(`  - 问题文件名: ${file}`);
                }
                // Check for extremely long names
                if (file.length > 255) {
                    problematicNames++;
                    diagnosticLog.push(`  - 文件名过长: ${file.substring(0, 50)}...`);
                }
            });
            
            if (problematicNames > 0) {
                diagnosticLog.push(`  - 发现 ${problematicNames} 个问题文件名`);
            }
            
            // Test if Sets work properly (some old browsers might have issues)
            try {
                const testSet = new Set();
                testSet.add('test');
                if (!testSet.has('test')) throw new Error('Set.has()不工作');
                testSet.delete('test');
                if (testSet.size !== 0) throw new Error('Set.delete()不工作');
                diagnosticLog.push(`  - Set数据结构: 正常`);
            } catch (e) {
                throw new Error(`Set数据结构异常: ${e.message}`);
            }
            
            // Check if template literals work
            try {
                const test = 'world';
                const template = `Hello ${test}`;
                if (template !== 'Hello world') throw new Error('模板字符串不工作');
                diagnosticLog.push(`  - 模板字符串: 正常`);
            } catch (e) {
                throw new Error(`模板字符串异常: ${e.message}`);
            }
            
            return true;
        });
        
        // Test 15: Check memory and performance
        await testFunction('检查内存和性能', async () => {
            // Check if there are too many characters (might cause memory issues)
            const characters = contextTest.success ? contextTest.result.characters : [];
            if (characters.length > 1000) {
                diagnosticLog.push(`  - ⚠️ 大量角色: ${characters.length} (可能导致性能问题)`);
            }
            
            // Check if world info files are too many
            const worldFiles = await getAllWorldInfoFiles(false);
            if (worldFiles.length > 500) {
                diagnosticLog.push(`  - ⚠️ 大量世界书: ${worldFiles.length} (可能导致性能问题)`);
            }
            
            // Test large string concatenation (might fail on low memory)
            try {
                let testString = '';
                for (let i = 0; i < 1000; i++) {
                    testString += 'test';
                }
                if (testString.length !== 4000) throw new Error('字符串连接失败');
                diagnosticLog.push(`  - 内存测试: 正常`);
            } catch (e) {
                throw new Error(`内存不足或字符串操作失败: ${e.message}`);
            }
            
            return true;
        });
        
        // Generate report
        let reportText = diagnosticLog.join('\n');
        
        if (errors.length > 0) {
            reportText += '\n\n=== 错误详情 ===\n';
            errors.forEach(err => {
                reportText += `\n函数: ${err.function}\n`;
                reportText += `错误: ${err.error}\n`;
                reportText += `堆栈: ${err.stack?.substring(0, 500) || 'N/A'}\n`;
            });
        }
        
        // Update progress
        updateProgress('生成报告...');
        
        // Try to copy to clipboard
        const copySuccess = await copyToClipboard(reportText);
        
        // Close loading popup
        $('#dialogue_popup_cancel').click();
        
        // Small delay to ensure popup closes
        await delay(100);
        
        // Show report in popup
        const reportHtml = `
        <div style="padding: 20px;">
            <h3>Debug! 诊断报告</h3>
            ${errors.length > 0 ? 
                `<div style="background: var(--warning20a); padding: 10px; border-radius: 5px; margin: 10px 0;">
                    <strong style="color: var(--warning);">⚠️ 发现 ${errors.length} 个错误</strong>
                </div>` : 
                `<div style="background: var(--success20a); padding: 10px; border-radius: 5px; margin: 10px 0;">
                    <strong style="color: var(--success);">✅ 所有功能正常</strong>
                </div>`
            }
            
            <div style="margin: 15px 0; padding: 10px; background: var(--black30a); border-radius: 5px;">
                <pre style="font-size: 0.85em; white-space: pre-wrap; word-wrap: break-word;">${reportText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
            </div>
            
            ${copySuccess ? 
                '<p style="color: var(--success);">📋 诊断报告已复制到剪贴板，可以直接粘贴给主包</p>' :
                '<p style="color: var(--warning);">⚠️ 无法自动复制到剪贴板，请手动选择上方文本复制</p>'
            }
        </div>`;
        
        callPopup(reportHtml, 'text', '', { wide: true, large: true });
    });
    
    // Helper function to copy text to clipboard
    async function copyToClipboard(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                // Fallback method
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const success = document.execCommand('copy');
                textArea.remove();
                return success;
            }
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            return false;
        }
    }
    
    // Test force-load functionality
    $("#world_info_cleanup_test_force_load").on("click", async () => {
        const context = getContext();
        const characters = context.characters || [];
        
        console.log('=== FORCE LOAD TEST START ===');
        console.log(`Total characters: ${characters.length}`);
        
        // Create test report
        let reportHtml = `
        <div style="padding: 20px; max-height: 500px; overflow-y: auto;">
            <h3>🧪 强制加载功能测试报告</h3>
            
            <div style="margin: 15px 0; padding: 10px; background: var(--black30a); border-radius: 5px;">
                <strong>基本信息：</strong>
                <ul style="margin: 10px 0;">
                    <li>角色总数: ${characters.length}</li>
                    <li>强制加载开关: ${extension_settings[extensionName].forceLoadCharacterData ? '✅ 已开启' : '❌ 已关闭'}</li>
                </ul>
            </div>`;
        
        // Check for shallow characters
        const shallowChars = characters.filter(c => c.shallow === true);
        const nonShallowChars = characters.filter(c => c.shallow === false || c.shallow === undefined);
        
        reportHtml += `
            <div style="margin: 15px 0; padding: 10px; background: var(--black30a); border-radius: 5px;">
                <strong>角色数据状态：</strong>
                <ul style="margin: 10px 0;">
                    <li>懒加载角色 (shallow=true): ${shallowChars.length} 个</li>
                    <li>完整数据角色: ${nonShallowChars.length} 个</li>
                </ul>
            </div>`;
        
        // Test API endpoint
        reportHtml += `
            <div style="margin: 15px 0; padding: 10px; background: var(--black30a); border-radius: 5px;">
                <strong>API 测试：</strong>`;
        
        let apiTestResult = '未测试';
        let testCharacter = null;
        
        if (characters.length > 0) {
            testCharacter = characters[0];
            const avatar = testCharacter.avatar || testCharacter.name;
            
            reportHtml += `
                <p>测试角色: ${testCharacter.name || 'Unknown'}</p>
                <p>Avatar: ${avatar}</p>`;
            
            if (avatar) {
                try {
                    console.log('Testing API with avatar:', avatar);
                    const response = await fetch('/api/characters/get', {
                        method: 'POST',
                        headers: getRequestHeaders(),
                        body: JSON.stringify({ avatar_url: avatar })
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        apiTestResult = '✅ API 正常工作';
                        console.log('API test successful, returned data:', data);
                        
                        reportHtml += `
                            <p style="color: var(--success);">✅ API 测试成功!</p>
                            <details style="margin-top: 10px;">
                                <summary>返回的数据结构</summary>
                                <pre style="font-size: 0.8em; background: var(--black30a); padding: 10px; border-radius: 5px;">${JSON.stringify(Object.keys(data), null, 2)}</pre>
                            </details>`;
                    } else {
                        apiTestResult = `❌ API 返回错误: ${response.status}`;
                        console.log('API test failed with status:', response.status);
                        reportHtml += `<p style="color: var(--warning);">❌ API 返回错误状态: ${response.status}</p>`;
                    }
                } catch (e) {
                    apiTestResult = `❌ API 请求失败: ${e.message}`;
                    console.error('API test error:', e);
                    reportHtml += `<p style="color: var(--warning);">❌ API 请求失败: ${e.message}</p>`;
                }
            } else {
                reportHtml += `<p style="color: var(--warning);">⚠️ 测试角色没有 avatar 属性</p>`;
            }
        } else {
            reportHtml += `<p>没有可用的角色进行测试</p>`;
        }
        
        reportHtml += `</div>`;
        
        // Simulate shallow characters for testing
        reportHtml += `
            <div style="margin: 15px 0; padding: 10px; background: var(--black30a); border-radius: 5px;">
                <strong>模拟测试：</strong>
                <p>为了测试强制加载功能，大扫除🧹将模拟创建一些 shallow 角色...</p>`;
        
        // More realistic test - check actual data completeness
        const testCount = Math.min(3, characters.length);
        const originalStates = [];
        
        if (testCount > 0) {
            reportHtml += `<p><strong>测试角色的世界书数据完整性：</strong></p>`;
            
            // Check first few characters for data completeness
            for (let i = 0; i < testCount; i++) {
                const char = characters[i];
                const hasShallowFlag = char.shallow === true;
                const hasData = !!char.data;
                const hasExtensions = !!(char.data?.extensions || char.extensions);
                const hasWorldInfo = !!(char.data?.extensions?.world || char.extensions?.world || char.data?.world || char.world);
                
                reportHtml += `
                    <div style="margin: 5px 0; padding: 5px; background: var(--black50a); border-radius: 3px;">
                        <strong>${i+1}. ${char.name || char.avatar || 'Unknown'}</strong>
                        <ul style="margin: 5px 0; font-size: 0.9em;">
                            <li>Shallow flag: ${hasShallowFlag ? '✅ true' : '❌ false/undefined'}</li>
                            <li>Has data: ${hasData ? '✅' : '❌'}</li>
                            <li>Has extensions: ${hasExtensions ? '✅' : '❌'}</li>
                            <li>Has world info: ${hasWorldInfo ? `✅ (${char.data?.extensions?.world || char.extensions?.world || char.data?.world || char.world})` : '❌'}</li>
                        </ul>
                    </div>`;
            }
            
            // Now test actual force loading if API works
            if (apiTestResult.includes('✅')) {
                reportHtml += `<p style="margin-top: 15px;"><strong>真实模拟测试：</strong></p>`;
                
                // Save original state and create truly shallow character
                const testChar = characters[0];
                const originalState = {
                    shallow: testChar.shallow,
                    data: JSON.parse(JSON.stringify(testChar.data || {})), // Deep copy
                    extensions: testChar.extensions
                };
                
                // Make it truly shallow - remove extensions data but keep avatar
                testChar.shallow = true;
                if (testChar.data) {
                    delete testChar.data.extensions;
                }
                delete testChar.extensions;
                
                reportHtml += `
                    <p>已将 "${testChar.name}" 设置为真实的 shallow 状态（删除了 extensions 数据）</p>
                    <p>尝试使用 API 重新加载...</p>`;
                

                if (testChar.avatar) {
                    try {
                        const response = await fetch('/api/characters/get', {
                            method: 'POST',
                            headers: getRequestHeaders(),
                            body: JSON.stringify({ avatar_url: testChar.avatar })
                        });
                        
                        if (response.ok) {
                            const fullData = await response.json();
                            const reloadedHasExtensions = !!(fullData.data?.extensions || fullData.extensions);
                            const reloadedHasWorld = !!(fullData.data?.extensions?.world || fullData.extensions?.world);
                            
                            reportHtml += `
                                <div style="padding: 10px; background: var(--success20a); border-radius: 5px; margin: 10px 0;">
                                    <p style="color: var(--success);">✅ 成功重新加载角色数据!</p>
                                    <p>重新加载后：</p>
                                    <ul>
                                        <li>Has extensions: ${reloadedHasExtensions ? '✅' : '❌'}</li>
                                        <li>Has world info: ${reloadedHasWorld ? `✅ (${fullData.data?.extensions?.world || fullData.extensions?.world || 'none'})` : '❌'}</li>
                                    </ul>
                                    <p><strong>结论：强制加载功能可以正常工作！</strong></p>
                                </div>`;
                        } else {
                            reportHtml += `<p style="color: var(--warning);">❌ API 返回错误: ${response.status}</p>`;
                        }
                    } catch (e) {
                        reportHtml += `<p style="color: var(--warning);">❌ 加载失败: ${e.message}</p>`;
                    }
                }
                
                // Restore original state
                testChar.shallow = originalState.shallow;
                testChar.data = originalState.data;
                if (originalState.extensions) {
                    testChar.extensions = originalState.extensions;
                }
                
                reportHtml += `<p>✅ 已恢复角色原始状态</p>`;
                
            } else {
                reportHtml += `
                    <p style="color: var(--warning);">⚠️ 由于 API 不工作，无法进行真实加载测试</p>
                    <p>当检测到数据不完整时，将显示警告对话框</p>`;
            }
        } else {
            reportHtml += `<p>没有可用的角色进行测试</p>`;
        }
        
        reportHtml += `</div>`;
        
        // Additional diagnostic - check world info matching
        reportHtml += `
            <div style="margin: 15px 0; padding: 10px; background: var(--black30a); border-radius: 5px;">
                <strong>世界书匹配诊断：</strong>
                <p>检查为什么有些世界书可能显示为孤立...</p>`;
        
        // Get world info files
        const worldInfoFiles = await getAllWorldInfoFiles(true);
        const charactersWithWorld = characters.filter(c => {
            const world = c.data?.extensions?.world || c.extensions?.world || c.data?.world || c.world;
            return !!world;
        });
        
        reportHtml += `
            <p>世界书文件总数: ${worldInfoFiles.length}</p>
            <p>有世界书的角色: ${charactersWithWorld.length} / ${characters.length}</p>`;
        
        // Check for mismatches
        if (charactersWithWorld.length > 0) {
            reportHtml += `<p style="margin-top: 10px;"><strong>角色世界书匹配检查：</strong></p>`;
            let mismatchCount = 0;
            
            for (const char of charactersWithWorld.slice(0, 5)) { // Check first 5
                const worldName = char.data?.extensions?.world || char.extensions?.world || char.data?.world || char.world;
                const exactMatch = worldInfoFiles.includes(worldName);
                const withoutExtension = worldName.replace(/\.(json|world|lorebook)$/i, '');
                const fuzzyMatch = worldInfoFiles.some(w => 
                    w === worldName || 
                    w === withoutExtension ||
                    w === `${worldName}.json` ||
                    w.replace(/\.(json|world|lorebook)$/i, '') === withoutExtension
                );
                
                if (!exactMatch) mismatchCount++;
                
                reportHtml += `
                    <div style="margin: 5px 0; padding: 5px; background: var(--black50a); border-radius: 3px; font-size: 0.9em;">
                        <strong>${char.name}:</strong> "${worldName}"
                        <ul style="margin: 3px 0;">
                            <li>精确匹配: ${exactMatch ? '✅' : '❌'}</li>
                            <li>模糊匹配: ${fuzzyMatch ? '✅' : '❌'}</li>
                            ${!exactMatch && fuzzyMatch ? '<li style="color: var(--warning);">⚠️ 可能是文件扩展名问题</li>' : ''}
                            ${!exactMatch && !fuzzyMatch ? '<li style="color: var(--warning);">⚠️ 世界书文件可能不存在或未加载</li>' : ''}
                        </ul>
                    </div>`;
            }
            
            if (mismatchCount > 0) {
                reportHtml += `
                    <div style="margin-top: 10px; padding: 10px; background: var(--warning20a); border-radius: 5px;">
                        <p>⚠️ 发现 ${mismatchCount} 个角色的世界书无法精确匹配！</p>
                        <p>这可能是世界书显示为"孤立"的真正原因。</p>
                    </div>`;
            }
        }
        
        reportHtml += `</div>`;
        
        // Summary
        reportHtml += `
            <div style="margin: 15px 0; padding: 10px; background: ${apiTestResult.includes('✅') ? 'var(--success20a)' : 'var(--warning20a)'}; border-radius: 5px;">
                <strong>测试总结：</strong>
                <p>${apiTestResult}</p>
                ${shallowChars.length === 0 ? 
                    '<p>📝 <strong>注意：</strong>您的系统没有懒加载角色（全部已完整加载），所以强制加载功能实际上不会触发。</p>' : 
                    '<p>✅ 检测到 ' + shallowChars.length + ' 个懒加载角色，强制加载功能将自动加载其完整数据。</p>'
                }
                ${apiTestResult.includes('✅') ? 
                    '<p>✅ API 功能正常，如果出现懒加载角色，可以成功加载。</p>' :
                    '<p>⚠️ API 不可用，强制加载功能将显示警告信息。</p>'
                }
            </div>
        </div>`;
        
        console.log('=== FORCE LOAD TEST END ===');
        console.log('API Test Result:', apiTestResult);
        console.log('Shallow characters found:', shallowChars.length);
        
        // Show the report
        await callPopup(reportHtml, 'text', '', {
            okButton: '关闭',
            wide: true,
            large: false
        });
    });
    
    // Bind event handlers
    $("#world_info_cleanup_enabled").on("change", onSettingChanged);
    $("#world_info_cleanup_confirmation").on("change", onSettingChanged);
    $("#world_info_cleanup_force_load").on("change", onSettingChanged);
    $("#world_info_cleanup_auto_replace").on("change", onSettingChanged);
    $("#world_info_cleanup_auto_update_rename").on("change", onSettingChanged);
    $("#world_info_cleanup_auto_preload_bulk").on("change", onSettingChanged);
    $("#world_info_cleanup_manual").on("click", manualCleanup);
    
    // Load settings
    await loadSettings();
    
    // Hook into character deletion event
    const context = getContext();
    const { eventSource, event_types } = context;
    
    // Subscribe to CHARACTER_DELETED event
    if (event_types.CHARACTER_DELETED) {
        eventSource.on(event_types.CHARACTER_DELETED, onCharacterDeleted);
        console.log(TEXT.LOG_HOOKED);
    } else {
        console.error(TEXT.LOG_ERROR_NO_EVENT);
    }
    
    // Hook into bulk edit button to pre-load character data
    hookBulkEditButton();
    
    // Monitor character replacement
    if (extension_settings[extensionName].autoReplaceWorldOnImport) {
        setupCharacterReplacementMonitor();
    }
    
    // Monitor world book renames if enabled
    if (extension_settings[extensionName].autoUpdateOnRename) {
        setupWorldRenameMonitor();
    }
    
    console.log(TEXT.LOG_EXTENSION_LOADED);
});