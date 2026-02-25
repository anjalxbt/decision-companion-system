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
import { ChevronRightIcon, WarningIcon } from "@/components/icons";

export function StepQuestion() {
    const { question, setQuestion, clearQuestion, nextStep } = useDecideStore();


    const handleClear = () => {
        playClick();
        clearQuestion();
    };

    const handleNext = () => {
        playClick();
        if (!question.trim()) return;
        nextStep();
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
                        <DialogTitle>How to frame your decision</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 text-sm leading-relaxed">
                        <p>
                            Write a clear, specific question that captures the choice you&apos;re
                            facing. Good decisions start with good questions.
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Be specific — <em>&quot;Which laptop should I buy under $1,000?&quot;</em></li>
                            <li>Focus on one decision at a time</li>
                            <li>Keep it personal — what matters to <strong>you</strong></li>
                        </ul>
                        <p className="text-xs text-muted-foreground">
                            You&apos;ll weigh the pros &amp; cons in the next steps.
                        </p>
                    </div>
                </DialogContent>
            </Dialog>

            <CardHeader className="pb-2 pr-10">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
                    Step 1 of {STEPS.length}
                </p>
                <CardTitle className="text-xl font-bold tracking-tight sm:text-2xl">
                    What do you want to decide?
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                    Write a clear, focused question to get started.
                </p>
            </CardHeader>

            <CardContent className="flex flex-col gap-6 pt-2">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="decision-input" className="text-xs font-medium text-muted-foreground">
                        Your question
                    </label>
                    <div className="relative">
                        <Input
                            id="decision-input"
                            type="text"
                            placeholder="e.g. Which laptop should I buy under $1,000?"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="h-12 pr-14 text-base"
                            autoFocus
                            onKeyDown={(e) => e.key === "Enter" && handleNext()}
                        />
                        <span
                            className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums ${question.length >= 100 ? "text-destructive" : "text-muted-foreground/50"}`}
                        >
                            {question.length}/120
                        </span>
                    </div>

                    {question.trim().length > 0 && !question.trim().endsWith("?") && (
                        <p className="flex items-center gap-1 text-xs text-amber-500">
                            <WarningIcon />
                            Tip: Phrasing as a question helps clarify the decision.
                        </p>
                    )}
                </div>

                <div className="h-px w-full bg-border/50" />

                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer text-muted-foreground hover:text-foreground"
                        onClick={handleClear}
                        disabled={!question}
                    >
                        Clear
                    </Button>
                    <Button
                        className="cursor-pointer gap-2 px-8"
                        onClick={handleNext}
                        disabled={!question.trim()}
                    >
                        Next
                        <ChevronRightIcon />
                    </Button>
                </div>
            </CardContent>
        </>
    );
}
