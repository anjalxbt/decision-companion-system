"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useDecideStore } from "@/lib/store/decide-store";
import { calculateScores, generateExplanation } from "@/lib/calculate";
import { saveResult } from "@/lib/history";
import { MEDALS, CHART_COLORS } from "@/lib/constants";



export function StepResult() {
    const router = useRouter();
    const {
        question,
        scores,
        weights,
        filledCriteria,
        filledOptions,
        reset,
        resultSaved,
        setResultSaved,
    } = useDecideStore();

    const criteria = filledCriteria();
    const options = filledOptions();

    const ranked = useMemo(
        () => calculateScores(options, criteria, weights, scores),
        [options, criteria, weights, scores]
    );

    const explanation = useMemo(
        () => generateExplanation(ranked, criteria, weights, scores, options),
        [ranked, criteria, weights, scores, options]
    );

    // Build chart data — one entry per criterion, with a key per option
    const chartData = useMemo(() =>
        criteria.map((criterion, ci) => {
            const entry: Record<string, string | number> = { criterion };
            options.forEach((opt, oi) => {
                entry[opt] = scores[ci]?.[oi] ?? 0;
            });
            return entry;
        }),
        [criteria, options, scores]
    );

    // Build chart config — one color per option
    const chartConfig = useMemo(() => {
        const config: Record<string, { label: string; color: string }> = {};
        options.forEach((opt, i) => {
            config[opt] = {
                label: opt,
                color: CHART_COLORS[i % CHART_COLORS.length],
            };
        });
        return config;
    }, [options]);

    const [saveFailed, setSaveFailed] = useState(false);

    const handleSave = () => {
        const saved = saveResult({
            question,
            ranked,
            explanation,
            criteria,
            weights,
            scores,
            options,
        });
        if (saved) {
            setResultSaved(true);
            setSaveFailed(false);
        } else {
            setSaveFailed(true);
        }
    };

    const handleStartOver = () => {
        reset();
        router.push("/decide");
    };

    return (
        <>
            <CardHeader className="pb-2">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
                    Result
                </p>
                <CardTitle className="text-xl font-bold tracking-tight sm:text-2xl">
                    {question}
                </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-6 pt-2">

                {/* ── Leaderboard ── */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-muted-foreground">
                        Leaderboard
                    </label>
                    {ranked.map((r, i) => {
                        const isWinner = r.rank === 1;
                        return (
                            <div
                                key={i}
                                className={`flex items-center gap-3 border px-4 py-3 transition-colors ${isWinner
                                    ? "border-primary/30 bg-primary/5"
                                    : "border-border/50 bg-muted/30"
                                    }`}
                            >
                                <span className="text-lg">
                                    {r.rank <= 3 ? MEDALS[r.rank - 1] : `#${r.rank}`}
                                </span>
                                <span className={`flex-1 truncate text-sm font-medium ${isWinner ? "text-foreground" : "text-muted-foreground"
                                    }`}>
                                    {r.name}
                                </span>
                                <span className={`tabular-nums text-sm font-bold ${isWinner ? "text-primary" : "text-muted-foreground"
                                    }`}>
                                    {r.score}/100
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="h-px w-full bg-border/50" />


                {/* ── Explanation ── */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-muted-foreground">
                        {explanation.isTie ? "It's a tie!" : `Why ${ranked[0]?.name}?`}
                    </label>
                    <div className="space-y-2 text-sm leading-relaxed text-black">
                        <p>{explanation.summary}</p>
                        <p>{explanation.keyStrength}</p>
                        <p>{explanation.decisiveFactor}</p>
                        {explanation.tradeOff && (
                            <p className="text-amber-500">{explanation.tradeOff}</p>
                        )}
                    </div>
                </div>

                <div className="h-px w-full bg-border/50" />


                {/* ── Grouped Bar Chart — scores per criteria ── */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-muted-foreground">
                        Scores by Criteria
                    </label>
                    <ChartContainer config={chartConfig} className="h-[220px] w-full">
                        <BarChart
                            data={chartData}
                            margin={{ top: 8, right: 8, bottom: 16, left: -16 }}
                        >
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis
                                dataKey="criterion"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 10 }}
                                interval={0}
                                angle={-35}
                                textAnchor="end"
                                height={50}
                                padding={{ left: 10, right: 10 }}
                            />
                            <YAxis
                                type="number"
                                domain={[0, 10]}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 11 }}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            {options.map((opt, i) => (
                                <Bar
                                    key={opt}
                                    dataKey={opt}
                                    radius={0}
                                    fill={CHART_COLORS[i % CHART_COLORS.length]}
                                />
                            ))}
                        </BarChart>
                    </ChartContainer>
                </div>

                <div className="h-px w-full bg-border/50" />
                {/* ── Actions ── */}
                <div className="flex items-center justify-center gap-3">
                    <Button
                        variant="outline"
                        className="cursor-pointer gap-2"
                        onClick={handleSave}
                        disabled={resultSaved}
                    >
                        {resultSaved ? (
                            <>
                                <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                Saved!
                            </>
                        ) : saveFailed ? (
                            <>
                                <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Storage full
                            </>
                        ) : (
                            <>
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0z" />
                                </svg>
                                Save result
                            </>
                        )}
                    </Button>
                    <Button
                        className="cursor-pointer gap-2"
                        onClick={handleStartOver}
                    >
                        New decision
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Button>
                </div>
            </CardContent>
        </>
    );
}
