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

// ── Explanation Generator ──

export interface Explanation {
    summary: string;
    keyStrength: string;
    decisiveFactor: string;
    tradeOff: string | null; // null if winner scored 10/10 on everything
}

/**
 * Generate a dynamic, data-driven explanation for why the #1 option won.
 *
 * @param ranked   - output of calculateScores (sorted best-first)
 * @param criteria - array of criterion names
 * @param weights  - percentage weight per criterion
 * @param scores   - 2D array: scores[criterionIndex][optionIndex]
 * @param options  - array of option names (same order as used in calculateScores)
 */
export function generateExplanation(
    ranked: RankedOption[],
    criteria: string[],
    weights: number[],
    scores: number[][],
    options: string[],
): Explanation {
    const winner = ranked[0];
    const runnerUp = ranked.length > 1 ? ranked[1] : null;

    // Map option name → original index
    const winnerIdx = options.indexOf(winner.name);
    const runnerUpIdx = runnerUp ? options.indexOf(runnerUp.name) : -1;

    // ── 1. Summary ──
    const summary = `${winner.name} scored ${winner.score}/100, making it your strongest choice.`;

    // ── 2. Key Strength — criterion with highest weighted contribution ──
    let bestCi = 0;
    let bestContribution = 0;

    for (let ci = 0; ci < criteria.length; ci++) {
        const contribution = ((scores[ci]?.[winnerIdx] ?? 0) * (weights[ci] ?? 0)) / 10;
        if (contribution > bestContribution) {
            bestContribution = contribution;
            bestCi = ci;
        }
    }

    const keyStrength = `It excels in ${criteria[bestCi]} (${scores[bestCi]?.[winnerIdx]}/10), which carries ${weights[bestCi]}% of your weight.`;

    // ── 3. Decisive Factor — biggest weighted score gap vs runner-up ──
    let decisiveFactor: string;

    if (runnerUp && runnerUpIdx >= 0) {
        let biggestGapCi = 0;
        let biggestGap = -Infinity;

        for (let ci = 0; ci < criteria.length; ci++) {
            const winScore = scores[ci]?.[winnerIdx] ?? 0;
            const runScore = scores[ci]?.[runnerUpIdx] ?? 0;
            const weightedGap = (winScore - runScore) * (weights[ci] ?? 0);
            if (weightedGap > biggestGap) {
                biggestGap = weightedGap;
                biggestGapCi = ci;
            }
        }

        const winS = scores[biggestGapCi]?.[winnerIdx] ?? 0;
        const runS = scores[biggestGapCi]?.[runnerUpIdx] ?? 0;

        decisiveFactor = `The deciding factor was ${criteria[biggestGapCi]} — it scored ${winS} vs ${runnerUp.name}'s ${runS}, on a criterion weighted at ${weights[biggestGapCi]}%.`;
    } else {
        decisiveFactor = `With only one option evaluated, ${winner.name} is the clear choice.`;
    }

    // ── 4. Trade-off — winner's lowest raw score ──
    let worstCi = 0;
    let worstScore = 11;

    for (let ci = 0; ci < criteria.length; ci++) {
        const s = scores[ci]?.[winnerIdx] ?? 0;
        if (s < worstScore) {
            worstScore = s;
            worstCi = ci;
        }
    }

    const tradeOff = worstScore < 10
        ? `However, it scored lowest in ${criteria[worstCi]} (${worstScore}/10) — something to keep in mind.`
        : null;

    return { summary, keyStrength, decisiveFactor, tradeOff };
}
