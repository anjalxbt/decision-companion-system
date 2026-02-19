"use client";

import { useState } from "react";
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

export default function DecidePage() {
    const [question, setQuestion] = useState("");
    const router = useRouter();

    const handleClear = () => {
        new Audio("/typewriter-soft-click.wav").play();
        setQuestion("");
    };

    const handleNext = () => {
        new Audio("/typewriter-soft-click.wav").play();
        if (!question.trim()) return;

    };

    return (
        <div className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-secondary px-6">

            <div
                aria-hidden="true"
                className="animate-float absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl sm:h-96 sm:w-96"
            />
            <div
                aria-hidden="true"
                className="animate-float-delayed absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-destructive/8 blur-3xl sm:h-80 sm:w-80"
            />

            <Card className="relative z-10 w-full max-w-lg border-border/50 bg-card/80 shadow-xl backdrop-blur-sm">
                <Dialog>
                    <DialogTrigger asChild>
                        <button
                            type="button"
                            className="absolute top-4 right-4 z-20 flex h-7 w-7 cursor-pointer items-center justify-center border border-border/60 bg-secondary text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            aria-label="Help"
                        >
                            i
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>How to frame your decision</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3 text-sm leading-relaxed ">
                            <p>
                                Write a clear, specific question that captures the choice you&apos;re
                                facing. Good decisions start with good questions.
                            </p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>Be specific — <em>&quot;Should I accept the offer from Company&nbsp;X?&quot;</em></li>
                                <li>Focus on one decision at a time</li>
                                <li>Keep it personal — what matters to <strong>you</strong></li>
                            </ul>
                            <p className="text-xs text-muted-foreground/70">
                                You&apos;ll weigh the pros &amp; cons in the next steps.
                            </p>
                        </div>
                    </DialogContent>
                </Dialog>

                <CardHeader className="pr-10">
                    <CardTitle className="text-center text-xl font-bold tracking-tight sm:text-2xl">
                        What do you want to make a decision about?
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                    <Input
                        id="decision-input"
                        type="text"
                        placeholder="e.g. Should I switch jobs?"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="h-12 text-base"
                        autoFocus
                    />

                    <div className="flex items-center justify-between">
                        <Button
                            variant="outline"
                            className="cursor-pointer bg-secondary"
                            onClick={handleClear}
                            disabled={!question}
                        >
                            Clear
                        </Button>
                        <Button
                            className="cursor-pointer px-8"
                            onClick={handleNext}
                            disabled={!question.trim()}
                        >
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
