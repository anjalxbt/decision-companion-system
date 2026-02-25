"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useDecideStore } from "@/lib/store/decide-store";
import { StepTracker } from "@/components/step-tracker";
import { StepQuestion } from "@/components/steps/step-question";
import { StepOptions } from "@/components/steps/step-options";
import { StepCriteria } from "@/components/steps/step-criteria";
import { StepWeigh } from "@/components/steps/step-weigh";
import { StepDecide } from "@/components/steps/step-decide";
import { StepResult } from "@/components/steps/step-result";
import { FooterNote } from "@/components/footer-note";
import { StartOver } from "@/components/start-over";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function DecidePage() {
    const [hydrated, setHydrated] = useState(false);
    const currentStep = useDecideStore((s) => s.currentStep);
    const showResult = useDecideStore((s) => s.showResult);

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return <LoadingSpinner />;
    }

    return (
        <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-secondary px-6 py-12">

            {!showResult && <StartOver />}

            {/* Ambient blobs */}
            <div
                aria-hidden="true"
                className="animate-float pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl sm:h-96 sm:w-96"
            />
            <div
                aria-hidden="true"
                className="animate-float-delayed pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-destructive/8 blur-3xl sm:h-80 sm:w-80"
            />

            {!showResult && <StepTracker />}

            {/* ── Main card ── */}
            <Card className={`relative z-10 w-full max-w-lg border-border/50 bg-card/80 shadow-xl backdrop-blur-sm ${showResult ? "max-h-[80dvh] overflow-y-auto" : ""}`}>
                {showResult ? (
                    <StepResult />
                ) : (
                    <>
                        {currentStep === 0 && <StepQuestion />}
                        {currentStep === 1 && <StepOptions />}
                        {currentStep === 2 && <StepCriteria />}
                        {currentStep === 3 && <StepWeigh />}
                        {currentStep === 4 && <StepDecide />}
                    </>
                )}
            </Card>

            <FooterNote />
        </div>
    );
}