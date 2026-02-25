"use client";

import {
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { STEPS, useDecideStore } from "@/lib/store/decide-store";
import { playClick } from "@/lib/sound";
import { ChevronLeftIcon, ChevronRightIcon, XIcon, PlusIcon, WarningIcon } from "@/components/icons";
import { HelpDialog } from "@/components/help-dialog";
import { MAX_OPTIONS } from "@/lib/constants";

export function StepOptions() {
    const {
        options,
        updateOption,
        addOption,
        removeOption,
        prevStep,
        nextStep,
        filledOptions,
        canAdvanceStep2,
        hasDuplicateOptions,
    } = useDecideStore();


    const handleBack = () => {
        playClick();
        prevStep();
    };

    const handleAdd = () => {
        playClick();
        addOption();
    };

    const handleRemove = (index: number) => {
        playClick();
        removeOption(index);
    };

    const handleNext = () => {
        playClick();
        if (!canAdvanceStep2()) return;
        nextStep();
    };

    return (
        <>
            <HelpDialog title="Listing your options">
                <p>
                    Add all the realistic options you&apos;re considering.
                    Don&apos;t worry about ranking them yet — that comes later.
                </p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>Include at least <strong>2 options</strong> to compare</li>
                    <li>Keep names short &amp; recognisable</li>
                    <li>You can add more options anytime with the <strong>Add option</strong> button</li>
                </ul>
                <p className="text-xs text-muted-foreground">
                    Next you&apos;ll define the criteria that matter most.
                </p>
            </HelpDialog>

            <CardHeader className="pb-2 pr-10">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
                    Step 2 of {STEPS.length}
                </p>
                <CardTitle className="text-xl font-bold tracking-tight sm:text-2xl">
                    What options are you choosing between?
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                    List the choices you&apos;re considering.
                </p>
            </CardHeader>

            <CardContent className="flex flex-col gap-6 pt-2">

                {/* Option inputs */}
                <div className="-m-1 flex max-h-[200px] flex-col gap-3 overflow-y-auto p-1">
                    <label className="text-xs font-medium text-muted-foreground">
                        Your options
                    </label>

                    {options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-xs font-semibold text-muted-foreground">
                                {i + 1}
                            </span>
                            <Input
                                type="text"
                                placeholder={`Option ${i + 1}`}
                                value={opt}
                                onChange={(e) => updateOption(i, e.target.value)}
                                className="h-11 flex-1 text-base"
                                autoFocus={i === 0}
                            />
                            {options.length > 2 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemove(i)}
                                    className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                                    aria-label={`Remove option ${i + 1}`}
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
                        disabled={options.length >= MAX_OPTIONS}
                    >
                        <PlusIcon />
                        Add option
                    </Button>
                </div>

                {!canAdvanceStep2() && options.some((o) => o.trim().length > 0) && (
                    <p className="flex items-center gap-1 text-xs text-amber-500">
                        <WarningIcon />
                        {hasDuplicateOptions()
                            ? "Each option must have a unique name."
                            : filledOptions().length < 2
                                ? "Add at least 2 options to continue."
                                : "Fill in all options or remove empty ones."}
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
                        disabled={!canAdvanceStep2()}
                    >
                        Next
                        <ChevronRightIcon />
                    </Button>
                </div>
            </CardContent>
        </>
    );
}
