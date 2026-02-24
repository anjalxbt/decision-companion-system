"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getHistory, deleteResult, type SavedResult } from "@/lib/history";

const MEDALS = ["🥇", "🥈", "🥉"];

export default function ProfilePage() {
    const [history, setHistory] = useState<SavedResult[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setHistory(getHistory());
        setMounted(true);
    }, []);

    const handleDelete = (id: string) => {
        deleteResult(id);
        setHistory(getHistory());
    };

    if (!mounted) {
        return (
            <div className="flex min-h-dvh items-center justify-center bg-secondary">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="relative flex h-dvh w-full flex-col items-center bg-secondary px-6 pt-12">

            {/* Back button */}
            <Link
                href="/"
                className="fixed top-4 left-4 z-50 flex items-center gap-1.5 bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
            >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                Back
            </Link>

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
                            {history.map((result) => (
                                <Card
                                    key={result.id}
                                    className="border-border/50 bg-card/80 backdrop-blur-sm"
                                >
                                    <CardHeader className="pb-2">
                                        <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
                                            {new Date(result.savedAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                        <CardTitle className="text-base font-bold">
                                            {result.question}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-3 pt-0">
                                        {/* Top 3 rankings */}
                                        <div className="flex flex-col gap-1.5">
                                            {result.ranked.slice(0, 3).map((r, i) => (
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

                                        {/* Summary line */}
                                        <p className="text-xs leading-relaxed text-muted-foreground">
                                            {result.explanation.summary}
                                        </p>

                                        {/* Delete */}
                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(result.id)}
                                                className="cursor-pointer text-xs text-muted-foreground/50 transition-colors hover:text-destructive"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
