"use client";

import {
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpDialog } from "@/components/help-dialog";
import { STEPS, useDecideStore } from "@/lib/store/decide-store";
import { playClick } from "@/lib/sound";
import { ChevronLeftIcon, ChevronRightIcon, XIcon, PlusIcon, WarningIcon } from "@/components/icons";

export function StepCriteria() {
    const {
        criteria,
        weights,
        criteriaSubStep,
        updateCriterion,
        addCriterion,
        removeCriterion,
        setWeight,
        setCriteriaSubStep,
        prevStep,
        nextStep,
        initScores,
        filledCriteria,
        totalWeight,
        canAdvanceCriteriaNames,
        canAdvanceCriteriaWeights,
    } = useDecideStore();


    const handleBack = () => {
        playClick();
        if (criteriaSubStep === 1) {
            setCriteriaSubStep(0);
        } else {
            prevStep();
        }
    };

    const handleNext = () => {
        playClick();
        if (criteriaSubStep === 0) {
            if (!canAdvanceCriteriaNames()) return;
            setCriteriaSubStep(1);
        } else {
            if (!canAdvanceCriteriaWeights()) return;
            initScores();
            nextStep();
        }
    };

    const handleAdd = () => {
        playClick();
        addCriterion();
    };

    const handleRemove = (index: number) => {
        playClick();
        removeCriterion(index);
    };

    const total = totalWeight();
    const filled = filledCriteria();

    // ── Sub-step 0: Enter criteria names ──
    if (criteriaSubStep === 0) {
        return (
            <>
                <HelpDialog title="Choosing your criteria">
                    <p>
                        Criteria are the factors that matter most when making this
                        decision. Think about what would make one option better than another.
                    </p>
                    <ul className="list-disc space-y-1 pl-5">
                        <li>Add at least <strong>2 criteria</strong></li>
                        <li>Examples: <em>Price, Performance, Battery life, Portability</em></li>
                        <li>Keep them distinct — avoid overlapping factors</li>
                        <li>Less is more — 3 to 6 criteria usually works best</li>
                    </ul>
                    <p className="text-xs text-muted-foreground">
                        Next you&apos;ll assign priority weights to each criterion.
                    </p>
                </HelpDialog>

                <CardHeader className="pb-2 pr-10">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
                        Step 3 of {STEPS.length} &middot; Part 1
                    </p>
                    <CardTitle className="text-xl font-bold tracking-tight sm:text-2xl">
                        What criteria matter to you?
                    </CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                        List the factors that will influence your decision.
                    </p>
                </CardHeader>

                <CardContent className="flex flex-col gap-6 pt-2">
                    <div className="-m-1 flex max-h-[200px] flex-col gap-3 overflow-y-auto p-1">
                        <label className="text-xs font-medium text-muted-foreground">
                            Your criteria
                        </label>

                        {criteria.map((c, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-xs font-semibold text-muted-foreground">
                                    {i + 1}
                                </span>
                                <Input
                                    type="text"
                                    placeholder={`Criterion ${i + 1}`}
                                    value={c}
                                    onChange={(e) => updateCriterion(i, e.target.value)}
                                    className="h-11 flex-1 text-base"
                                    autoFocus={i === 0}
                                />
                                {criteria.length > 2 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(i)}
                                        className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                                        aria-label={`Remove criterion ${i + 1}`}
                                    >
                                        <XIcon />
                                    </button>
                                )}
                            </div>
                        ))}

                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-1 w-fit cursor-pointer gap-1.5 self-start bg-secondary text-muted-foreground hover:text-foreground"
                            onClick={handleAdd}
                        >
                            <PlusIcon />
                            Add criterion
                        </Button>
                    </div>

                    {!canAdvanceCriteriaNames() && criteria.some((c) => c.trim().length > 0) && (
                        <p className="flex items-center gap-1 text-xs text-amber-500">
                            <WarningIcon />
                            {filled.length < 2
                                ? "Add at least 2 criteria to continue."
                                : "Fill in all criteria or remove empty ones."}
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
                            <ChevronLeftIcon />
                            Back
                        </Button>
                        <Button
                            className="cursor-pointer gap-2 px-8"
                            onClick={handleNext}
                            disabled={!canAdvanceCriteriaNames()}
                        >
                            Next
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </CardContent>
            </>
        );
    }

    // ── Sub-step 1: Assign weights ──
    return (
        <>
            <HelpDialog title="Assigning priority weights">
                <p>
                    Distribute <strong>100%</strong> across your criteria based on how
                    important each one is to your decision.
                </p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>Higher % = more important to you</li>
                    <li>All weights must add up to exactly <strong>100%</strong></li>
                    <li>Example: <em>Performance 50%, Portability 25%, Battery 15%, Price 10%</em></li>
                </ul>
                <p className="text-xs text-muted-foreground">
                    These weights determine how much each factor influences the final result.
                </p>
            </HelpDialog>

            <CardHeader className="pb-2 pr-10">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
                    Step 3 of {STEPS.length} &middot; Part 2
                </p>
                <CardTitle className="text-xl font-bold tracking-tight sm:text-2xl">
                    How important is each criterion?
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                    Distribute 100% across your criteria by priority.
                </p>
            </CardHeader>

            <CardContent className="flex flex-col gap-6 pt-2">
                <div className="-m-1 flex max-h-[240px] flex-col gap-3 overflow-y-auto p-1">
                    <label className="text-xs font-medium text-muted-foreground">
                        Priority weights
                    </label>

                    {criteria.map((c, i) => {
                        if (!c.trim()) return null;
                        return (
                            <div key={i} className="flex items-center gap-3">
                                <span className="min-w-0 flex-1 truncate text-sm font-medium">
                                    {c}
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <Input
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={weights[i] || ""}
                                        onChange={(e) => setWeight(i, parseInt(e.target.value) || 0)}
                                        className="h-10 w-20 text-center text-base tabular-nums"
                                        autoFocus={i === 0}
                                    />
                                    <span className="text-sm text-muted-foreground">%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Total indicator */}
                <div className="flex items-center justify-between border border-border/50 bg-secondary/50 px-4 py-2.5">
                    <span className="text-sm font-medium">Total</span>
                    <span
                        className={`text-lg font-bold tabular-nums ${total === 100
                            ? "text-primary"
                            : total > 100
                                ? "text-destructive"
                                : "text-muted-foreground"
                            }`}
                    >
                        {total}%
                    </span>
                </div>

                {total !== 100 && total > 0 && (
                    <p className="flex items-center gap-1 text-xs text-amber-500">
                        <WarningIcon />
                        {total > 100
                            ? `Over by ${total - 100}% reduce some weights.`
                            : `${100 - total}% remaining to distribute.`}
                    </p>
                )}

                {total === 100 && criteria.some((c, i) => c.trim() && weights[i] === 0) && (
                    <p className="flex items-center gap-1 text-xs text-amber-500">
                        <WarningIcon />
                        Every criterion needs a weight above 0%. Remove it if it doesn&apos;t matter.
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
                        <ChevronLeftIcon />
                        Back
                    </Button>
                    <Button
                        className="cursor-pointer gap-2 px-8"
                        onClick={handleNext}
                        disabled={!canAdvanceCriteriaWeights()}
                    >
                        Next
                        <ChevronRightIcon />
                    </Button>
                </div>
            </CardContent>
        </>
    );
}
