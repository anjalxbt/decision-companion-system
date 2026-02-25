"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { getHistory, deleteResult, type SavedResult } from "@/lib/history";
import { useDecideStore } from "@/lib/store/decide-store";
import { MEDALS, CHART_COLORS } from "@/lib/constants";
import { LoadingSpinner } from "@/components/loading-spinner";


// ── Expanded card detail component ──
function ResultDetail({ result }: { result: SavedResult }) {
    const chartData = useMemo(
        () =>
            result.criteria.map((criterion, ci) => {
                const entry: Record<string, string | number> = { criterion };
                result.options.forEach((opt, oi) => {
                    entry[opt] = result.scores[ci]?.[oi] ?? 0;
                });
                return entry;
            }),
        [result]
    );

    const chartConfig = useMemo(() => {
        const config: Record<string, { label: string; color: string }> = {};
        result.options.forEach((opt, i) => {
            config[opt] = {
                label: opt,
                color: CHART_COLORS[i % CHART_COLORS.length],
            };
        });
        return config;
    }, [result.options]);

    return (
        <div className="flex flex-col gap-4 pt-3">
            {/* ── Full Leaderboard ── */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                    Leaderboard
                </label>
                {result.ranked.map((r, i) => {
                    const isWinner = r.rank === 1;
                    return (
                        <div
                            key={i}
                            className={`flex items-center gap-3 border px-3 py-2 text-sm transition-colors ${isWinner
                                ? "border-primary/30 bg-primary/5"
                                : "border-border/50 bg-muted/30"
                                }`}
                        >
                            <span className="text-base">
                                {r.rank <= 3 ? MEDALS[r.rank - 1] : `#${r.rank}`}
                            </span>
                            <span
                                className={`flex-1 truncate font-medium ${isWinner
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                    }`}
                            >
                                {r.name}
                            </span>
                            <span
                                className={`tabular-nums font-bold ${isWinner
                                    ? "text-primary"
                                    : "text-muted-foreground"
                                    }`}
                            >
                                {r.score}/100
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="h-px w-full bg-border/50" />

            {/* ── Explanation ── */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                    {result.explanation.isTie
                        ? "It's a tie!"
                        : `Why ${result.ranked[0]?.name}?`}
                </label>
                <div className="space-y-1.5 text-xs leading-relaxed text-black">
                    <p>{result.explanation.summary}</p>
                    <p>{result.explanation.keyStrength}</p>
                    <p>{result.explanation.decisiveFactor}</p>
                    {result.explanation.tradeOff && (
                        <p className="text-amber-500">
                            {result.explanation.tradeOff}
                        </p>
                    )}
                </div>
            </div>

            <div className="h-px w-full bg-border/50" />

            {/* ── Chart ── */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                    Scores by Criteria
                </label>
                <ChartContainer
                    config={chartConfig}
                    className="h-[180px] w-full"
                >
                    <BarChart
                        data={chartData}
                        margin={{ top: 8, right: 8, bottom: 16, left: -16 }}
                    >
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                        />
                        <XAxis
                            dataKey="criterion"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 9 }}
                            interval={0}
                            angle={-35}
                            textAnchor="end"
                            height={45}
                            padding={{ left: 10, right: 10 }}
                        />
                        <YAxis
                            type="number"
                            domain={[0, 10]}
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 10 }}
                        />
                        <ChartTooltip
                            content={<ChartTooltipContent />}
                        />
                        {result.options.map((opt, i) => (
                            <Bar
                                key={opt}
                                dataKey={opt}
                                radius={0}
                                fill={
                                    CHART_COLORS[i % CHART_COLORS.length]
                                }
                            />
                        ))}
                    </BarChart>
                </ChartContainer>
            </div>
        </div>
    );
}

// ── Main Profile Page ──
export default function ProfilePage() {
    const [history, setHistory] = useState<SavedResult[]>([]);
    const [mounted, setMounted] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const router = useRouter();
    const reset = useDecideStore((s) => s.reset);

    useEffect(() => {
        setHistory(getHistory());
        setMounted(true);
    }, []);

    const handleDelete = (id: string) => {
        deleteResult(id);
        setHistory(getHistory());
        if (expandedId === id) setExpandedId(null);
    };

    const toggleExpand = (id: string) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    if (!mounted) {
        return <LoadingSpinner />;
    }

    return (
        <div className="relative flex h-dvh w-full flex-col items-center bg-secondary px-6 pt-12">

            {/* Back button */}
            <Link
                href="/decide"
                className="fixed top-4 left-4 z-50 flex items-center gap-1.5 bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
            >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Back
            </Link>

            {/* New decision button */}
            <button
                type="button"
                onClick={() => { reset(); router.push("/decide"); }}
                className="fixed top-4 right-4 z-50 flex cursor-pointer items-center gap-1.5 bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                New decision
            </button>

            <div className="flex w-full max-w-lg flex-col overflow-hidden" style={{ flex: 1 }}>
                <h1 className="mb-1 text-2xl font-bold tracking-tight">Profile</h1>
                <p className="mb-6 text-sm text-muted-foreground">Your saved decisions</p>

                <div className="flex-1 overflow-y-auto pb-8 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
                    {history.length === 0 ? (
                        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
                                <svg className="h-10 w-10 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0z" />
                                </svg>
                                <p className="text-sm text-muted-foreground">
                                    No saved decisions yet.
                                </p>
                                <Link href="/decide">
                                    <Button size="sm" className="mt-2 cursor-pointer">
                                        Make a decision
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {history.map((result) => {
                                const isExpanded = expandedId === result.id;
                                return (
                                    <Card
                                        key={result.id}
                                        className="border-border/50 bg-card/80 backdrop-blur-sm transition-all"
                                    >
                                        <CardHeader
                                            className="cursor-pointer pb-2"
                                            onClick={() => toggleExpand(result.id)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                                                    {new Date(result.savedAt).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                                <svg
                                                    className={`h-4 w-4 text-black transition-transform ${isExpanded ? "rotate-180" : ""}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </div>
                                            <CardTitle className="text-base font-bold">
                                                {result.question}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex flex-col gap-3 pt-0">
                                            {/* Collapsed: top 3 + summary */}
                                            <div className="flex flex-col gap-1.5">
                                                {result.ranked.slice(0, 2).map((r, i) => (
                                                    <div
                                                        key={i}
                                                        className={`flex items-center gap-2 text-sm ${r.rank === 1 ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                                                    >
                                                        <span>{r.rank <= 3 ? MEDALS[r.rank - 1] : `#${r.rank}`}</span>
                                                        <span className="flex-1 truncate">{r.name}</span>
                                                        <span className="tabular-nums font-medium">{r.score}/100</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <p className="text-xs leading-relaxed text-muted-foreground">
                                                {result.explanation.summary}
                                            </p>

                                            {/* Expanded: full details */}
                                            {isExpanded && (
                                                <ResultDetail result={result} />
                                            )}

                                            {/* Delete */}
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(result.id);
                                                    }}
                                                    className="cursor-pointer text-xs text-red-500 transition-colors hover:text-destructive"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
