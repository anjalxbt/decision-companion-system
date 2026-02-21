"use client";

import { Card } from "@/components/ui/card";
import { useDecideStore } from "@/lib/store/decide-store";
import { StepTracker } from "@/components/step-tracker";
import { StepQuestion } from "@/components/steps/step-question";
import { StepOptions } from "@/components/steps/step-options";

export default function DecidePage() {
    const currentStep = useDecideStore((s) => s.currentStep);

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
            <StepTracker />

            {/* ── Main card ── */}
            <Card className="relative z-10 w-full max-w-lg border-border/50 bg-card/80 shadow-xl backdrop-blur-sm">
                {currentStep === 0 && <StepQuestion />}
                {currentStep === 1 && <StepOptions />}
            </Card>

            {/* Footer note */}
            <p className="relative z-10 mt-6 text-center text-xs text-muted-foreground/60">
                Your answers stay on your device. Nothing is stored externally.
            </p>
        </div>
    );
}