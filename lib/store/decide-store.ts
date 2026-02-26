import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MAX_OPTIONS, MAX_CRITERIA } from "@/lib/constants";

export const STEPS = ["Question", "Options", "Criteria", "Weigh", "Decide"] as const;

interface DecideState {
    // ── State ──
    currentStep: number;
    question: string;
    options: string[];
    criteria: string[];
    weights: number[];
    criteriaSubStep: 0 | 1; // 0 = entering names, 1 = assigning weights
    scores: number[][]; // scores[criterionIndex][optionIndex] — value 0-10
    weighSubStep: number; // which criterion is being scored
    showResult: boolean;
    resultSaved: boolean;

    // ── Derived ──
    filledOptions: () => string[];
    canAdvanceStep2: () => boolean;
    hasDuplicateOptions: () => boolean;
    filledCriteria: () => string[];
    totalWeight: () => number;
    canAdvanceCriteriaNames: () => boolean;
    hasDuplicateCriteria: () => boolean;
    canAdvanceCriteriaWeights: () => boolean;
    canAdvanceWeighSubStep: () => boolean;

    // ── Actions ──
    setCurrentStep: (step: number) => void;
    setQuestion: (value: string) => void;
    clearQuestion: () => void;
    updateOption: (index: number, value: string) => void;
    addOption: () => void;
    removeOption: (index: number) => void;
    addCriterion: () => void;
    updateCriterion: (index: number, value: string) => void;
    removeCriterion: (index: number) => void;
    setWeight: (index: number, value: number) => void;
    distributeWeightsEqually: () => void;
    setCriteriaSubStep: (sub: 0 | 1) => void;
    initScores: () => void;
    setScore: (criterionIdx: number, optionIdx: number, value: number) => void;
    setWeighSubStep: (sub: number) => void;
    setShowResult: (show: boolean) => void;
    setResultSaved: (saved: boolean) => void;
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
}

const initialState = {
    currentStep: 0,
    question: "",
    options: ["", ""],
    criteria: ["", ""],
    weights: [0, 0],
    criteriaSubStep: 0 as 0 | 1,
    scores: [] as number[][],
    weighSubStep: 0,
    showResult: false,
    resultSaved: false,
};

export const useDecideStore = create<DecideState>()(
    persist(
        (set, get) => ({
            // ── State ──
            ...initialState,

            // ── Derived ──
            filledOptions: () => get().options.filter((o) => o.trim().length > 0),
            hasDuplicateOptions: () => {
                const filled = get().options.filter((o) => o.trim().length > 0).map((o) => o.trim().toLowerCase());
                return new Set(filled).size !== filled.length;
            },
            canAdvanceStep2: () => {
                const { options } = get();
                if (options.length < 2 || !options.every((o) => o.trim().length > 0)) return false;
                return !get().hasDuplicateOptions();
            },
            filledCriteria: () => get().criteria.filter((c) => c.trim().length > 0),
            totalWeight: () => get().weights.reduce((sum, w) => sum + w, 0),
            hasDuplicateCriteria: () => {
                const filled = get().criteria.filter((c) => c.trim().length > 0).map((c) => c.trim().toLowerCase());
                return new Set(filled).size !== filled.length;
            },
            canAdvanceCriteriaNames: () => {
                const { criteria } = get();
                if (criteria.length < 2 || !criteria.every((c) => c.trim().length > 0)) return false;
                return !get().hasDuplicateCriteria();
            },
            canAdvanceCriteriaWeights: () => {
                const { criteria, weights } = get();
                const total = get().totalWeight();
                const allFilled = criteria.every((c, i) => !c.trim() || weights[i] > 0);
                return total === 100 && get().filledCriteria().length >= 2 && allFilled;
            },
            canAdvanceWeighSubStep: () => {
                const { scores, weighSubStep } = get();
                const filledOpts = get().filledOptions();
                if (!scores[weighSubStep]) return false;
                return scores[weighSubStep].length === filledOpts.length &&
                    scores[weighSubStep].every((s) => s >= 1 && s <= 10);
            },

            // ── Actions ──
            setCurrentStep: (step) => set({ currentStep: step }),

            setQuestion: (value) => set({ question: value.slice(0, 120) }),

            clearQuestion: () => set({ question: "" }),

            updateOption: (index, value) =>
                set((state) => ({
                    options: state.options.map((o, i) => (i === index ? value.slice(0, 80) : o)),
                })),

            addOption: () =>
                set((state) => {
                    if (state.options.length >= MAX_OPTIONS) return state;
                    return { options: [...state.options, ""] };
                }),

            removeOption: (index) =>
                set((state) => ({ options: state.options.filter((_, i) => i !== index) })),

            addCriterion: () =>
                set((state) => {
                    if (state.criteria.length >= MAX_CRITERIA) return state;
                    return {
                        criteria: [...state.criteria, ""],
                        weights: [...state.weights, 0],
                    };
                }),

            updateCriterion: (index, value) =>
                set((state) => ({
                    criteria: state.criteria.map((c, i) => (i === index ? value.slice(0, 60) : c)),
                })),

            removeCriterion: (index) =>
                set((state) => ({
                    criteria: state.criteria.filter((_, i) => i !== index),
                    weights: state.weights.filter((_, i) => i !== index),
                })),

            setWeight: (index, value) =>
                set((state) => ({
                    weights: state.weights.map((w, i) => (i === index ? Math.max(0, Math.min(100, value)) : w)),
                })),

            distributeWeightsEqually: () =>
                set((state) => {
                    const filled = state.criteria.filter((c) => c.trim().length > 0);
                    const count = filled.length;
                    if (count === 0) return state;
                    const base = Math.floor(100 / count);
                    const remainder = 100 % count;
                    return {
                        weights: state.criteria.map((c, i) => {
                            if (!c.trim()) return 0;
                            const filledIdx = filled.indexOf(c);
                            return base + (filledIdx < remainder ? 1 : 0);
                        }),
                    };
                }),

            setCriteriaSubStep: (sub) => set({ criteriaSubStep: sub }),

            initScores: () => {
                const filled = get().filledCriteria();
                const filledOpts = get().filledOptions();
                set({
                    scores: filled.map(() => filledOpts.map(() => 0)),
                    weighSubStep: 0,
                });
            },

            setScore: (criterionIdx, optionIdx, value) =>
                set((state) => ({
                    scores: state.scores.map((row, ci) =>
                        ci === criterionIdx
                            ? row.map((s, oi) => (oi === optionIdx ? Math.max(0, Math.min(10, value)) : s))
                            : row
                    ),
                })),

            setWeighSubStep: (sub) => set({ weighSubStep: sub }),

            setShowResult: (show) => set({ showResult: show }),

            setResultSaved: (saved) => set({ resultSaved: saved }),

            nextStep: () =>
                set((state) => ({
                    currentStep: Math.min(state.currentStep + 1, STEPS.length - 1),
                })),

            prevStep: () =>
                set((state) => ({
                    currentStep: Math.max(state.currentStep - 1, 0),
                })),

            reset: () => set(initialState),
        }),
        {
            name: "decide-store",
            partialize: (state) => ({
                currentStep: state.currentStep,
                question: state.question,
                options: state.options,
                criteria: state.criteria,
                weights: state.weights,
                criteriaSubStep: state.criteriaSubStep,
                scores: state.scores,
                weighSubStep: state.weighSubStep,
                showResult: state.showResult,
                resultSaved: state.resultSaved,
            }),
        }
    )
);


