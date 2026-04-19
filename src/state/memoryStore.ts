import { create } from 'zustand';
import type { CoreState} from './memory/slices/coreSlice';
import { createCoreSlice } from './memory/slices/coreSlice';
import type { EntityState} from './memory/slices/entitySlice';
import { createEntitySlice } from './memory/slices/entitySlice';
import type { EventState} from './memory/slices/eventSlice';
import { createEventSlice } from './memory/slices/eventSlice';

// 导出所有可能用到的类型
export * from './memory/slices/coreSlice';
export * from './memory/slices/entitySlice';
export * from './memory/slices/eventSlice';

// 合并后的整体 State
export type MemoryState = CoreState & EntityState & EventState;

/**
 * Memory Store
 * 经 V0.9.15 重构：拆分为多个独立切片 (Slice Pattern) 以降低耦合和文件体积
 */
export const useMemoryStore = create<MemoryState>()((...a) => ({
    ...createCoreSlice(...a),
    ...createEntitySlice(...a),
    ...createEventSlice(...a),
}));
