import Link from "next/link";
import { Button } from "@/components/ui/button";

const STEPS = [
    {
        number: "01",
        title: "Frame Your Question",
        description:
            "Start by writing a clear, specific question. Good decisions begin with well-defined problems.",
        example: '"Which laptop should I buy under $1,000?"',
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "List Your Options",
        description:
            "Add all the realistic options you're considering. You need at least 2 to compare, up to 8.",
        example: "MacBook Air, ThinkPad X1, Dell XPS 13",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
        ),
    },
    {
        number: "03",
        title: "Define Criteria & Weights",
        description:
            "Choose the factors that matter (e.g. Price, Performance) and distribute 100% across them based on priority.",
        example: "Performance 50%, Price 30%, Portability 20%",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
            </svg>
        ),
    },
    {
        number: "04",
        title: "Score Each Option",
        description:
            "Rate every option on each criterion from 1 to 10 based on how well it meets your expectation.",
        example: "MacBook Air: Performance 7, Price 9, Portability 8",
        tip: true,
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
        ),
    },
    {
        number: "05",
        title: "Get Your Result",
        description:
            "The system calculates a weighted score for each option and presents a clear winner with a full explanation.",
        example: "🥇 MacBook Air — 78.5/100",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-5.54 0" />
            </svg>
        ),
    },
];

export default function HowItWorksPage() {
    return (
        <div className="h-dvh overflow-y-auto bg-secondary [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
            {/* ── Header ── */}
            <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/50 bg-secondary/80 px-6 py-4 backdrop-blur-sm">
                <Link
                    href="/"
                    className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </Link>
                <h1 className="text-sm font-semibold tracking-tight">How It Works</h1>
                <div className="w-12" />
            </header>

            {/* ── Content ── */}
            <main className="mx-auto max-w-2xl space-y-12 px-6 py-10">

                {/* Intro */}
                <section className="space-y-3 text-center">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Make decisions you can <span className="text-primary">trust</span>
                    </h2>
                    <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                        Decision Companion uses a weighted scoring model to turn subjective
                        choices into objective comparisons. Here&apos;s how it works in 5 steps.
                    </p>
                </section>

                {/* Steps */}
                <section className="space-y-6">
                    {STEPS.map((step) => (
                        <div
                            key={step.number}
                            className="group relative flex gap-4 border border-border/50 bg-background p-5 transition-colors hover:border-primary/30 hover:bg-primary/2 sm:gap-5 sm:p-6"
                        >
                            {/* Icon + Number */}
                            <div className="flex flex-col items-center gap-1.5">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary transition-colors group-hover:bg-primary/10">
                                    {step.icon}
                                </div>
                                <span className="text-[10px] font-bold tracking-widest text-muted-foreground/60">
                                    {step.number}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                                <h3 className="text-sm font-bold tracking-tight sm:text-base">
                                    {step.title}
                                </h3>
                                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                    {step.description}
                                </p>
                                <p className="mt-1 text-xs italic text-muted-foreground/70">
                                    e.g. {step.example}
                                </p>
                                {step.tip && (
                                    <div className="mt-2 space-y-1">
                                        <p className="text-xs text-red-500">
                                            Tip: For criteria like &quot;Price&quot;, score based on what you
                                            value. For example:
                                        </p>
                                        <ul className="list-disc space-y-1 pl-5 text-xs text-red-500">
                                            <li>If you prefer low price → score a $500 laptop <strong>9/10</strong> and a $2000 laptop <strong>2/10</strong></li>
                                            <li>If you prefer premium → reverse those scores</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </section>

                {/* ── The Math ── */}
                <section className="space-y-4 border border-border/50 bg-background p-5 sm:p-6">
                    <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                        </svg>
                        <h3 className="text-sm font-bold tracking-tight sm:text-base">The Math Behind It</h3>
                    </div>

                    <div className="space-y-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        <p>
                            Each option gets a <strong className="text-foreground">weighted score</strong> on
                            a 0–100 scale using this formula:
                        </p>

                        <div className="rounded-sm border border-border/50 bg-secondary px-4 py-3 text-center font-semibold text-foreground">
                            Score = Σ (raw_score ÷ 10 × weight ÷ 100) × 100
                        </div>

                        <ul className="list-disc space-y-1.5 pl-5">
                            <li>
                                <strong className="text-foreground">raw_score</strong> — your 1–10 rating
                                for an option on a criterion
                            </li>
                            <li>
                                <strong className="text-foreground">weight</strong> — the priority % you
                                assigned (all weights sum to 100%)
                            </li>
                            <li>
                                A perfect score of <strong className="text-foreground">100</strong> means 10/10
                                on every criterion
                            </li>
                        </ul>

                        <p>
                            <strong className="text-foreground">Ties</strong> are handled automatically — if two
                            options score equally, the system highlights what each one excels at so you can
                            make the final call.
                        </p>
                    </div>
                </section>

                {/* ── Features ── */}
                <section className="grid gap-4 sm:grid-cols-3">
                    {[
                        {
                            label: "Save & Review",
                            desc: "Save results to your profile and revisit them anytime.",
                        },
                        {
                            label: "Tie Detection",
                            desc: "Smart tie handling highlights each option's strengths.",
                        },
                        {
                            label: "Visual Charts",
                            desc: "Grouped bar charts break down scores by criteria.",
                        },
                    ].map((f) => (
                        <div key={f.label} className="border border-border/50 bg-background p-4">
                            <p className="text-xs font-bold text-primary">{f.label}</p>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
                        </div>
                    ))}
                </section>

                {/* CTA */}
                <section className="flex flex-col items-center gap-4 pb-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        Ready to make a decision?
                    </p>
                    <Link href="/decide">
                        <Button
                            size="lg"
                            className="min-h-12 cursor-pointer px-8 text-base font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-[0.98]"
                        >
                            Make Decision
                        </Button>
                    </Link>
                </section>
            </main>
        </div>
    );
}
