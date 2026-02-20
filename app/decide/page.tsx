"use client";

import { useRouter } from "next/navigation";
import {
    Card,
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

export default function DecidePage() {
    const router = useRouter();
    const {
        currentStep,
        question,
        options,
        setQuestion,
        clearQuestion,
        updateOption,
        addOption,
        removeOption,
        nextStep,
        prevStep,
        filledOptions,
        canAdvanceStep2,
    } = useDecideStore();

    // ── Helpers ──
    const playClick = () => new Audio("/typewriter-soft-click.wav").play();

    // ── Step 1 handlers ──
    const handleClearQuestion = () => {
        playClick();
        clearQuestion();
    };

    const handleNextFromStep1 = () => {
        playClick();
        if (!question.trim()) return;
        nextStep();
    };

    // ── Step 2 handlers ──
    const handleBackFromStep2 = () => {
        playClick();
        prevStep();
    };

    const handleAddOption = () => {
        playClick();
        addOption();
    };

    const handleRemoveOption = (index: number) => {
        playClick();
        removeOption(index);
    };

    const handleNextFromStep2 = () => {
        playClick();
        if (!canAdvanceStep2()) return;

    };

    return (
        <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-secondary px-6 py-12">

            {/* Ambient blobs */}
            <div
                aria-hidden="true"
                className="animate-float pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl sm:h-96 sm:w-96"
            />
            <div
                aria-hidden="true"
                className="animate-float-delayed pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-destructive/8 blur-3xl sm:h-80 sm:w-80"
            />

            {/* ── Step tracker ── */}
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

            {/* ── Main card ── */}
            <Card className="relative z-10 w-full max-w-lg border-border/50 bg-card/80 shadow-xl backdrop-blur-sm">

                {/* ═══════════════ STEP 1 ═══════════════ */}
                {currentStep === 0 && (
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
                                    <p className="text-xs text-muted-foreground/70">
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
                                        onChange={(e) => setQuestion(e.target.value.slice(0, 120))}
                                        className="h-12 pr-14 text-base"
                                        autoFocus
                                        onKeyDown={(e) => e.key === "Enter" && handleNextFromStep1()}
                                    />
                                    <span
                                        className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums ${question.length >= 100 ? "text-destructive" : "text-muted-foreground/50"}`}
                                    >
                                        {question.length}/120
                                    </span>
                                </div>

                                {question.trim().length > 0 && !question.trim().endsWith("?") && (
                                    <p className="flex items-center gap-1 text-xs text-amber-500">
                                        <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
                                        </svg>
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
                                    onClick={handleClearQuestion}
                                    disabled={!question}
                                >
                                    Clear
                                </Button>
                                <Button
                                    className="cursor-pointer gap-2 px-8"
                                    onClick={handleNextFromStep1}
                                    disabled={!question.trim()}
                                >
                                    Next
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </Button>
                            </div>
                        </CardContent>
                    </>
                )}

                {/* ═══════════════ STEP 2 ═══════════════ */}
                {currentStep === 1 && (
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
                                    <DialogTitle>Listing your options</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-3 text-sm leading-relaxed">
                                    <p>
                                        Add all the realistic options you&apos;re considering.
                                        Don&apos;t worry about ranking them yet — that comes later.
                                    </p>
                                    <ul className="list-disc space-y-1 pl-5">
                                        <li>Include at least <strong>2 options</strong> to compare</li>
                                        <li>Keep names short &amp; recognisable</li>
                                        <li>You can add more options anytime with the <strong>Add option</strong> button</li>
                                    </ul>
                                    <p className="text-xs text-muted-foreground/70">
                                        Next you&apos;ll define the criteria that matter most.
                                    </p>
                                </div>
                            </DialogContent>
                        </Dialog>

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
                                        {/* Remove button — only show when there are more than 2 */}
                                        {options.length > 2 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveOption(i)}
                                                className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                                                aria-label={`Remove option ${i + 1}`}
                                            >
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                ))}

                                {/* Add option button */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-1 w-fit cursor-pointer gap-1.5 self-start bg-secondary text-muted-foreground hover:text-foreground"
                                    onClick={handleAddOption}
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add option
                                </Button>
                            </div>

                            {/* Hint when fewer than 2 filled */}
                            {filledOptions().length < 2 && options.some((o) => o.trim().length > 0) && (
                                <p className="flex items-center gap-1 text-xs text-amber-500">
                                    <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
                                    </svg>
                                    Add at least 2 options to continue.
                                </p>
                            )}

                            <div className="h-px w-full bg-border/50" />

                            {/* Actions */}
                            <div className="flex items-center justify-between">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="cursor-pointer gap-1.5 text-muted-foreground hover:text-foreground"
                                    onClick={handleBackFromStep2}
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back
                                </Button>
                                <Button
                                    className="cursor-pointer gap-2 px-8"
                                    onClick={handleNextFromStep2}
                                    disabled={!canAdvanceStep2}
                                >
                                    Next
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </Button>
                            </div>
                        </CardContent>
                    </>
                )}

            </Card>

            {/* Footer note */}
            <p className="relative z-10 mt-6 text-center text-xs text-muted-foreground/60">
                Your answers stay on your device. Nothing is stored externally.
            </p>
        </div>
    );
}