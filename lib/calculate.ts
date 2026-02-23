/**
 * Weighted Decision Scoring
 *
 * Formula:  Score(option_j) = Σ_i ( (score_ij / 10) × (weight_i / 100) ) × 100
 * Simplified:  Σ_i ( score_ij × weight_i ) / 10
 *
 * - score_ij : raw score (1-10) of option j on criterion i
 * - weight_i : percentage weight of criterion i (all weights sum to 100)
 * - Result   : a value on a 0-100 scale (100 = perfect score on every criterion)
 */

export interface RankedOption {
    name: string;
    score: number; // 0-100, rounded to 1 decimal
    rank: number;  // 1 = best
}

/**
 * Calculate the weighted score for each option and return them ranked best-first.
 *
 * @param options  - array of option names (filled only)
 * @param criteria - array of criterion names (filled only)
 * @param weights  - percentage weight per criterion (must sum to 100)
 * @param scores   - 2D array: scores[criterionIndex][optionIndex], values 1-10
 * @returns          ranked options sorted by score descending
 */
export function calculateScores(
    options: string[],
    criteria: string[],
    weights: number[],
    scores: number[][],
): RankedOption[] {
    const results = options.map((name, oi) => {
        let total = 0;

        for (let ci = 0; ci < criteria.length; ci++) {
            const rawScore = scores[ci]?.[oi] ?? 0;  // 1-10
            const weight = weights[ci] ?? 0;           // 0-100
            total += (rawScore * weight) / 10;
        }

        return {
            name,
            score: Math.round(total * 10) / 10, // round to 1 decimal
            rank: 0, // assigned after sorting
        };
    });

    // Sort descending by score
    results.sort((a, b) => b.score - a.score);

    // Assign ranks (handle ties — same score = same rank)
    let currentRank = 1;
    for (let i = 0; i < results.length; i++) {
        if (i > 0 && results[i].score < results[i - 1].score) {
            currentRank = i + 1;
        }
        results[i].rank = currentRank;
    }

    return results;
}
