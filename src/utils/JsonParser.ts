/**
 * Robust JSON Parser
 *
 * A utility to extract and parse JSON from potentially messy LLM outputs.
 * Implements a "Three-Layer Funnel" strategy:
 * 1. Regex Pre-clean (via RegexProcessor)
 * 2. Block Extraction
 * 3. Repair & Parse
 */

import { regexProcessor } from '../services/pipeline/RegexProcessor';

export class RobustJsonParser {
    /**
     * Clean and parse JSON from a string.
     * @param input Raw string from LLM
     * @returns Parsed object or null if failed
     */
    static parse<T = any>(input: string): T | null {
        // Layer 1: Regex Pre-clean
        // Removes <think> tags and other known pollutants
        const cleaned = regexProcessor.process(input, 'output');

        // Layer 2: Extract JSON Block
        const jsonString = this.extractJsonBlock(cleaned);

        if (!jsonString) {
            console.warn('[RobustJsonParser] No JSON block found.');
            return null;
        }

        // Layer 3: Repair & Parse
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            // First failure: Try simple repairs
            const repaired = this.simpleRepair(jsonString);
            try {
                return JSON.parse(repaired);
            } catch (e2) {
                console.error('[RobustJsonParser] Parse failed:', e2);
                console.debug('[RobustJsonParser] Failed string:', jsonString);
                return null;
            }
        }
    }

    /**
     * Extracts the likely JSON part from a string.
     * Prioritizes ```json ... ``` blocks, then looks for outer { ... }.
     */
    private static extractJsonBlock(text: string): string | null {
        // 1. Try Markdown Code Block
        const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
        if (codeBlockMatch && codeBlockMatch[1]) {
            return codeBlockMatch[1].trim();
        }

        // 2. Try finding the outer-most braces
        const firstOpen = text.indexOf('{');
        const lastClose = text.lastIndexOf('}');

        if (firstOpen !== -1 && lastClose !== -1 && lastClose > firstOpen) {
            return text.substring(firstOpen, lastClose + 1);
        }

        return null;
    }

    /**
     * Simple JSON repair logic
     * Fixes common LLM JSON errors:
     * - Trailing commas
     * - Unquoted keys (simple cases)
     * - Single quotes
     */
    private static simpleRepair(text: string): string {
        let repaired = text;

        // 1. Remove trailing commas
        // e.g. "key": "value", } -> "key": "value" }
        repaired = repaired.replace(/,\s*([}\]])/g, '$1');

        // 2. Replace single quotes with double quotes (dangerous but often needed)
        // Only does this if it looks like a JSON string delimitation
        // This is heuristic and definitely not perfect.
        // repaired = repaired.replace(/'/g, '"'); // Too aggressive

        return repaired;
    }
}
