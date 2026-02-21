import { STEPS, useDecideStore } from "@/lib/store/decide-store";

export function StepTracker() {
    const currentStep = useDecideStore((s) => s.currentStep);

    return (
        <nav aria-label="Progress" className="relative z-10 mb-8 w-full max-w-lg">
            <ol className="flex items-center gap-0">
                {STEPS.map((label, i) => {
                    const isActive = i === currentStep;
                    const isComplete = i < currentStep;
                    return (
                        <li key={label} className="flex flex-1 flex-col items-center gap-1.5">
                            <div className="flex w-full items-center">
                                <div
                                    className={`h-px flex-1 transition-colors ${i === 0 ? "bg-transparent" : isComplete ? "bg-primary" : "bg-border"}`}
                                />
                                <div
                                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors
                      ${isActive
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : isComplete
                                                ? "border-primary bg-primary text-primary-foreground"
                                                : "border-border bg-background text-muted-foreground"
                                        }`}
                                >
                                    {isComplete ? (
                                        <svg
                                            className="h-3.5 w-3.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={3}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        i + 1
                                    )}
                                </div>
                                <div
                                    className={`h-px flex-1 transition-colors ${i === STEPS.length - 1 ? "bg-transparent" : isComplete ? "bg-primary" : "bg-border"}`}
                                />
                            </div>
                            <span
                                className={`text-[11px] font-medium tracking-wide transition-colors ${isActive ? "text-primary" : isComplete ? "text-foreground" : "text-muted-foreground"}`}
                            >
                                {label}
                            </span>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
