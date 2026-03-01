import { PageTitle } from "@/ui/components/display/PageTitle";
import { Divider } from "@/ui/components/layout/Divider";
import { LayoutTabs } from "@/ui/components/layout/LayoutTabs";
import { MasterDetailLayout } from "@/ui/components/layout/MasterDetailLayout";
import { MobileFullscreenForm } from "@/ui/components/layout/MobileFullscreenForm";
import { Trash2 } from 'lucide-react';
import React, { useRef } from 'react';

// Hooks
import { useMemoryStream } from './hooks/useMemoryStream';

// Sections & Modals
import { ImportModal } from './modals/ImportModal';
import { PreviewModal } from './modals/PreviewModal';
import { ActionBar } from './sections/ActionBar';
import { EntityList } from './sections/EntityList';
import { EventList } from './sections/EventList';

// Editor Components
import { EntityEditor } from './components/EntityEditor';
import { EventEditor, type EventEditorHandle } from './components/EventEditor';

const VIEW_TABS = [
    { id: 'list', label: '列表', icon: <span className="i-lucide-list text-[14px]" /> },
    { id: 'entities', label: '实体', icon: <span className="i-lucide-users text-[14px]" /> },
];

const TAB_INFO = {
    list: { title: '列表视图', subtitle: '查看和管理记忆事件' },
    entities: { title: '实体列表', subtitle: '查看和管理提取的实体' },
};

export const MemoryStream: React.FC = () => {
    const ms = useMemoryStream();
    const editorRef = useRef<EventEditorHandle>(null);

    const currentInfo = TAB_INFO[ms.viewTab];

    // =============== 移动端独立渲染 (顶层覆盖) ===============
    if (ms.isMobile && ms.viewMode === 'edit') {
        if (ms.viewTab === 'list' && ms.selectedEvent) {
            return (
                <MobileFullscreenForm
                    title="编辑事件"
                    onClose={ms.handleCloseEditor}
                    actions={
                        <button onClick={() => ms.selectedId && ms.handleDelete(ms.selectedId)} className="p-1.5 hover:bg-destructive/10 rounded text-destructive mr-1 transition-colors">
                            <Trash2 size={16} />
                        </button>
                    }
                >
                    <EventEditor
                        ref={editorRef}
                        event={ms.selectedEvent}
                        isFullScreen={false}
                        onSave={ms.handleEventChange}
                        onDelete={ms.handleDelete}
                        onClose={ms.handleCloseEditor}
                    />
                </MobileFullscreenForm>
            );
        }

        if (ms.viewTab === 'entities' && ms.selectedEntity) {
            return (
                <MobileFullscreenForm
                    title="编辑实体"
                    onClose={ms.handleCloseEditor}
                    actions={
                        <button onClick={() => ms.selectedId && ms.handleDelete(ms.selectedId)} className="p-1.5 hover:bg-destructive/10 rounded text-destructive mr-1 transition-colors">
                            <Trash2 size={16} />
                        </button>
                    }
                >
                    <EntityEditor
                        entity={ms.selectedEntity}
                        isFullScreen={false}
                        onSave={ms.handleEntityChange}
                        onDelete={ms.handleDelete}
                        onClose={ms.handleCloseEditor}
                    />
                </MobileFullscreenForm>
            );
        }
    }

    return (
        <div className="absolute inset-0 flex flex-col animate-in fade-in overflow-hidden p-4 md:p-6">
            <PageTitle
                breadcrumbs={['记忆编辑']}
                title={currentInfo.title}
                subtitle={currentInfo.subtitle}
            />
            <Divider className="mb-6" />

            {/* Tab 导航 */}
            <LayoutTabs
                tabs={VIEW_TABS}
                activeTab={ms.viewTab}
                onChange={ms.handleTabChange}
                actions={
                    <ActionBar
                        viewTab={ms.viewTab}
                        isMobile={ms.isMobile}
                        hasChanges={ms.hasChanges}
                        pendingCount={ms.pendingChanges.size + ms.pendingEntityChanges.size}
                        checkedCount={ms.checkedIds.size}
                        isLoading={ms.isLoading}
                        isReembedding={ms.isReembedding}
                        sortOrder={ms.sortOrder}
                        showActiveOnly={ms.showActiveOnly}
                        showMobileActions={ms.showMobileActions}
                        onSave={ms.handleBatchSave}
                        onRefresh={() => { ms.loadEvents(); ms.loadEntities(); }}
                        onBatchDelete={ms.handleBatchDelete}
                        onImportClick={ms.handleOpenImportModal}
                        onReembed={ms.handleReembedAll}
                        onSortToggle={() => ms.setSortOrder(ms.sortOrder === 'asc' ? 'desc' : 'asc')}
                        onActiveToggle={() => ms.setShowActiveOnly(!ms.showActiveOnly)}
                        onPreviewClick={(content) => { ms.setPreviewContent(content); ms.setShowPreview(true); }}
                        onMobileActionsToggle={() => ms.setShowMobileActions(!ms.showMobileActions)}
                        onMobileActionsClose={() => ms.setShowMobileActions(false)}
                    />
                }
            />

            {/* View Area */}
            <div className="flex-1 min-h-0 overflow-hidden relative">
                <MasterDetailLayout
                    listWidth={ms.viewMode === 'edit' ? '320px' : '100%'}
                    mobileDetailOpen={false} // 我们手动在同级外挂移动端全屏表单
                    list={
                        ms.viewTab === 'list' ? (
                            <EventList
                                viewMode={ms.viewMode}
                                isLoading={ms.isLoading}
                                searchQuery={ms.searchQuery}
                                setSearchQuery={ms.setSearchQuery}
                                filteredEvents={ms.filteredEvents}
                                groupedEvents={ms.groupedEvents}
                                groupStartIndices={ms.groupStartIndices}
                                checkedIds={ms.checkedIds}
                                activeIds={ms.activeIds}
                                selectedId={ms.selectedId}
                                pendingChanges={ms.pendingChanges}
                                onSelect={ms.handleSelect}
                                onCheck={ms.handleCheck}
                                onGroupCheck={(group, checked) => {
                                    ms.setCheckedIds(prev => {
                                        const newSet = new Set(prev);
                                        group.events.forEach(ev => checked ? newSet.add(ev.id) : newSet.delete(ev.id));
                                        return newSet;
                                    });
                                }}
                            />
                        ) : (
                            <EntityList
                                viewMode={ms.viewMode}
                                isLoading={ms.isLoading}
                                searchQuery={ms.searchQuery}
                                setSearchQuery={ms.setSearchQuery}
                                filteredEntities={ms.filteredEntities}
                                checkedIds={ms.checkedIds}
                                selectedId={ms.selectedId}
                                onSelect={ms.handleSelect}
                                onCheck={ms.handleCheck}
                            />
                        )
                    }
                    detail={
                        ms.viewMode === 'edit' && !ms.isMobile ? (
                            <div className="h-full overflow-hidden bg-transparent">
                                {ms.viewTab === 'list' && ms.selectedEvent && (
                                    <EventEditor
                                        ref={editorRef}
                                        event={ms.selectedEvent}
                                        isFullScreen={false} // PC 侧边栏模式
                                        onSave={ms.handleEventChange}
                                        onDelete={ms.handleDelete}
                                        onClose={ms.handleCloseEditor}
                                    />
                                )}
                                {ms.viewTab === 'entities' && ms.selectedEntity && (
                                    <EntityEditor
                                        entity={ms.selectedEntity}
                                        isFullScreen={false}
                                        onSave={ms.handleEntityChange}
                                        onDelete={ms.handleDelete}
                                        onClose={ms.handleCloseEditor}
                                    />
                                )}
                            </div>
                        ) : null
                    }
                />
            </div>

            {/* Modals */}
            <PreviewModal
                isOpen={ms.showPreview}
                onClose={() => ms.setShowPreview(false)}
                content={ms.previewContent}
            />

            <ImportModal
                isOpen={ms.showImportModal}
                onClose={() => ms.setShowImportModal(false)}
                onExecute={ms.handleImportExecute}
                availableDbs={ms.availableDbs}
                selectedDb={ms.selectedDbToImport}
                onSelectDb={ms.setSelectedDbToImport}
            />
        </div>
    );
};
