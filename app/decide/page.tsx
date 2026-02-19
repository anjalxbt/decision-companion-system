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

export default function DecidePage() {
    const [question, setQuestion] = useState("");
    const router = useRouter();

    const handleClear = () => {
        setQuestion("");
    };

    const handleNext = () => {
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
                <CardHeader>
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
