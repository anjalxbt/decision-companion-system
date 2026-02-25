"use client";

import {
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { STEPS, useDecideStore } from "@/lib/store/decide-store";
import { playClick } from "@/lib/sound";

export function StepWeigh() {
    const {
        scores,
        weighSubStep,
        setScore,
        setWeighSubStep,
        prevStep,
        nextStep,
        filledCriteria,
        filledOptions,
        canAdvanceWeighSubStep,
    } = useDecideStore();


    const filled = filledCriteria();
    const options = filledOptions();
    const currentCriterion = filled[weighSubStep] ?? "";
    const isLastCriterion = weighSubStep === filled.length - 1;

    const handleBack = () => {
        playClick();
        if (weighSubStep > 0) {
            setWeighSubStep(weighSubStep - 1);
        } else {
            prevStep();
        }
    };

    const handleNext = () => {
        playClick();
        if (!canAdvanceWeighSubStep()) return;
        if (isLastCriterion) {
            nextStep();
        } else {
            setWeighSubStep(weighSubStep + 1);
        }
    };

    return (
        <>
            {/* Help button */}
            <Dialog>
                <DialogTrigger asChild>
                    <button
                        type="button"
                        className="absolute top-4 right-4 z-20 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-secondary text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label="Help"
                    >
                        ?
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Scoring your options</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 text-sm leading-relaxed">
                        <p>
                            Rate each option on a scale of <strong>1 to 10</strong> based on
                            how well it satisfies <em>your preference</em> for this criterion.
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li><strong>10</strong> = perfectly meets your expectation</li>
                            <li><strong>5</strong> = acceptable, middle ground</li>
                            <li><strong>1</strong> = doesn&apos;t meet it at all</li>
                        </ul>
                        <p className="text-xs text-red-500">
                            Tip: For criteria like &quot;Price&quot;, score based on what you
                            value. For example:
                        </p>
                        <ul className="list-disc space-y-1 pl-5 text-xs text-red-500">
                            <li>If you prefer low price → score a $500 laptop <strong>9/10</strong> and a $2000 laptop <strong>2/10</strong></li>
                            <li>If you prefer premium → reverse those scores</li>
                        </ul>
                    </div>
                </DialogContent>
            </Dialog>

            <CardHeader className="pb-2 pr-10">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
                    Step 4 of {STEPS.length} &middot; {weighSubStep + 1} of {filled.length}
                </p>
                <CardTitle className="text-xl font-bold tracking-tight sm:text-2xl">
                    {currentCriterion}
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                    Score each option from 1 to 10 for this criterion.
                </p>
            </CardHeader>

            <CardContent className="flex flex-col gap-6 pt-2">
                <div className="-m-1 flex max-h-[240px] flex-col gap-3 overflow-y-auto p-1">
                    <label className="text-xs font-medium text-muted-foreground">
                        Your scores
                    </label>

                    {options.map((opt, oi) => (
                        <div key={oi} className="flex items-center gap-3">
                            <span className="min-w-0 flex-1 truncate text-sm font-medium">
                                {opt}
                            </span>
                            <div className="flex items-center gap-1.5">
                                <Input
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={scores[weighSubStep]?.[oi] || ""}
                                    onChange={(e) =>
                                        setScore(weighSubStep, oi, parseInt(e.target.value) || 0)
                                    }
                                    className="h-10 w-20 text-center text-base tabular-nums"
                                    autoFocus={oi === 0}
                                />
                                <span className="text-sm text-muted-foreground">/10</span>
                            </div>
                        </div>
                    ))}
                </div>

                {!canAdvanceWeighSubStep() && scores[weighSubStep]?.some((s) => s > 0) && (
                    <p className="flex items-center gap-1 text-xs text-amber-500">
                        <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
                        </svg>
                        Score every option between 1 and 10 to continue.
                    </p>
                )}

                <div className="h-px w-full bg-border/50" />

                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer gap-1.5 text-muted-foreground hover:text-foreground"
                        onClick={handleBack}
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </Button>
                    <Button
                        className="cursor-pointer gap-2 px-8"
                        onClick={handleNext}
                        disabled={!canAdvanceWeighSubStep()}
                    >
                        {isLastCriterion ? "Finish" : "Next"}
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Button>
                </div>
            </CardContent>
        </>
    );
}
