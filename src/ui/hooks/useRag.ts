/**
 * useRag - RAG (检索增强生成) 交互 Hook
 *
 * 提供搜索、索引状态查询等功能
 */

import { useState, useCallback } from 'react';
import { retriever, RetrievalResult } from '@/modules/rag';
import { embeddingService } from '@/modules/rag';
import { Logger } from '@/core/logger';

export interface UseRagReturn {
    isSearching: boolean;
    lastResult: RetrievalResult | null;
    error: string | null;

    search: (query: string) => Promise<RetrievalResult | null>;
    checkIndexStatus: () => Promise<boolean>;
}

export function useRag(): UseRagReturn {
    const [isSearching, setIsSearching] = useState(false);
    const [lastResult, setLastResult] = useState<RetrievalResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const search = useCallback(async (query: string) => {
        setIsSearching(true);
        setError(null);
        try {
            Logger.debug('useRag', `Searching for: ${query}`);
            const result = await retriever.search(query);
            setLastResult(result);
            return result;
        } catch (err: any) {
            const msg = err?.message || 'Search failed';
            Logger.error('useRag', msg, err);
            setError(msg);
            return null;
        } finally {
            setIsSearching(false);
        }
    }, []);

    const checkIndexStatus = useCallback(async () => {
        try {
            return await retriever.hasVectorizedNodes();
        } catch (e) {
            console.error(e);
            return false;
        }
    }, []);

    return {
        isSearching,
        lastResult,
        error,
        search,
        checkIndexStatus,
    };
}
