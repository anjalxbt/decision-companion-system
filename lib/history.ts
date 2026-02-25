import { type RankedOption, type Explanation } from "@/lib/calculate";

const STORAGE_KEY = "decide-history";

export interface SavedResult {
    id: string;
    savedAt: string; // ISO date string
    question: string;
    ranked: RankedOption[];
    explanation: Explanation;
    criteria: string[];
    weights: number[];
    scores: number[][];
    options: string[];
}

/**
 * Save a decision result to localStorage history.
 */
export function saveResult(result: Omit<SavedResult, "id" | "savedAt">): SavedResult | null {
    const entry: SavedResult = {
        ...result,
        id: typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
        savedAt: new Date().toISOString(),
    };

    const history = getHistory();
    history.unshift(entry); // newest first
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        return entry;
    } catch {
        return null; // storage full
    }
}

/**
 * Get all saved results from localStorage, newest first.
 */
export function getHistory(): SavedResult[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

/**
 * Delete a saved result by id.
 */
export function deleteResult(id: string): void {
    const history = getHistory().filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

/**
 * Clear all saved results.
 */
export function clearHistory(): void {
    localStorage.removeItem(STORAGE_KEY);
}
