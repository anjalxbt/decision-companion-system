import { create } from "zustand";

export const STEPS = ["Question", "Options", "Criteria", "Weigh", "Decide"] as const;

interface DecideState {
    // ── State ──
    currentStep: number;
    question: string;
    options: string[];
    criteria: string[];
    weights: number[];
    criteriaSubStep: 0 | 1; // 0 = entering names, 1 = assigning weights

    // ── Derived ──
    filledOptions: () => string[];
    canAdvanceStep2: () => boolean;
    filledCriteria: () => string[];
    totalWeight: () => number;
    canAdvanceCriteriaNames: () => boolean;
    canAdvanceCriteriaWeights: () => boolean;

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
    setCriteriaSubStep: (sub: 0 | 1) => void;
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
};

export const useDecideStore = create<DecideState>((set, get) => ({
    // ── State ──
    ...initialState,

    // ── Derived ──
    filledOptions: () => get().options.filter((o) => o.trim().length > 0),
    canAdvanceStep2: () => get().filledOptions().length >= 2,
    filledCriteria: () => get().criteria.filter((c) => c.trim().length > 0),
    totalWeight: () => get().weights.reduce((sum, w) => sum + w, 0),
    canAdvanceCriteriaNames: () => get().filledCriteria().length >= 2,
    canAdvanceCriteriaWeights: () => {
        const { criteria, weights } = get();
        const total = get().totalWeight();
        const allFilled = criteria.every((c, i) => !c.trim() || weights[i] > 0);
        return total === 100 && get().filledCriteria().length >= 2 && allFilled;
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
        set((state) => ({ options: [...state.options, ""] })),

    removeOption: (index) =>
        set((state) => ({ options: state.options.filter((_, i) => i !== index) })),

    addCriterion: () =>
        set((state) => ({
            criteria: [...state.criteria, ""],
            weights: [...state.weights, 0],
        })),

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

    setCriteriaSubStep: (sub) => set({ criteriaSubStep: sub }),

    nextStep: () =>
        set((state) => ({
            currentStep: Math.min(state.currentStep + 1, STEPS.length - 1),
        })),

    prevStep: () =>
        set((state) => ({
            currentStep: Math.max(state.currentStep - 1, 0),
        })),

    reset: () => set(initialState),
}));

