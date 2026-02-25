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
    isTie: boolean;
    summary: string;
    keyStrength: string;
    decisiveFactor: string;
    tradeOff: string | null; // null if winner scored 10/10 on everything
}

/**
 * Find the criterion where an option has the highest weighted contribution.
 */
function findBestCriterion(
    optIdx: number,
    criteria: string[],
    weights: number[],
    scores: number[][],
): { name: string; score: number; weight: number } {
    let bestCi = 0;
    let bestContribution = 0;

    for (let ci = 0; ci < criteria.length; ci++) {
        const contribution = ((scores[ci]?.[optIdx] ?? 0) * (weights[ci] ?? 0)) / 10;
        if (contribution > bestContribution) {
            bestContribution = contribution;
            bestCi = ci;
        }
    }

    return {
        name: criteria[bestCi],
        score: scores[bestCi]?.[optIdx] ?? 0,
        weight: weights[bestCi],
    };
}

/**
 * Generate a dynamic, data-driven explanation for the result.
 * Handles both clear winners and ties.
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
    const isTie = runnerUp !== null && runnerUp.score === winner.score;

    const winnerIdx = options.indexOf(winner.name);
    const runnerUpIdx = runnerUp ? options.indexOf(runnerUp.name) : -1;

    // ── TIE PATH ──
    if (isTie && runnerUp) {
        // Collect all tied options
        const tiedOptions = ranked.filter((r) => r.score === winner.score);
        const tiedNames = tiedOptions.map((r) => r.name);

        const summary =
            tiedNames.length === 2
                ? `${tiedNames[0]} and ${tiedNames[1]} are tied at ${winner.score}/100 — both are equally strong choices.`
                : `${tiedNames.slice(0, -1).join(", ")} and ${tiedNames[tiedNames.length - 1]} are tied at ${winner.score}/100.`;

        // Check if all tied options have identical scores on every criterion
        const tiedIndices = tiedOptions.map((r) => options.indexOf(r.name));
        const allIdentical = criteria.every((_, ci) => {
            const first = scores[ci]?.[tiedIndices[0]] ?? 0;
            return tiedIndices.every((oi) => (scores[ci]?.[oi] ?? 0) === first);
        });

        let keyStrength: string;

        if (allIdentical) {
            keyStrength = "All options performed identically across every criterion — there is no meaningful difference between them.";
        } else {
            // Highlight what each tied option excels at
            const strengths = tiedOptions.map((r) => {
                const idx = options.indexOf(r.name);
                const best = findBestCriterion(idx, criteria, weights, scores);
                return `${r.name} excels in ${best.name} (${best.score}/10, ${best.weight}% weight)`;
            });
            keyStrength = strengths.join(", while ") + ".";
        }

        const decisiveFactor = allIdentical
            ? "Consider adding more criteria or adjusting weights to differentiate between them."
            : "The scores are identical — use your gut or add more criteria to break the tie.";

        return { isTie: true, summary, keyStrength, decisiveFactor, tradeOff: null };
    }

    // ── CLEAR WINNER PATH ──
    const summary = `${winner.name} scored ${winner.score}/100, making it your strongest choice.`;

    const best = findBestCriterion(winnerIdx, criteria, weights, scores);
    const keyStrength = `It excels in ${best.name} (${best.score}/10), which carries ${best.weight}% of your weight.`;

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

    // Trade-off — winner's lowest raw score
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

    return { isTie: false, summary, keyStrength, decisiveFactor, tradeOff };
}

