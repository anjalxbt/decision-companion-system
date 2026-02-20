import { create } from "zustand";

export const STEPS = ["Question", "Options", "Criteria", "Weigh", "Decide"] as const;

interface DecideState {
    // ── State ──
    currentStep: number;
    question: string;
    options: string[];

    // ── Derived ──
    filledOptions: () => string[];
    canAdvanceStep2: () => boolean;

    // ── Actions ──
    setCurrentStep: (step: number) => void;
    setQuestion: (value: string) => void;
    clearQuestion: () => void;
    updateOption: (index: number, value: string) => void;
    addOption: () => void;
    removeOption: (index: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
}

const initialState = {
    currentStep: 0,
    question: "",
    options: ["", ""],
};

export const useDecideStore = create<DecideState>((set, get) => ({
    // ── State ──
    ...initialState,

    // ── Derived ──
    filledOptions: () => get().options.filter((o) => o.trim().length > 0),
    canAdvanceStep2: () => get().filledOptions().length >= 2,

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
