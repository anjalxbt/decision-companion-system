"use client";

import {
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { STEPS, useDecideStore } from "@/lib/store/decide-store";
import { playClick } from "@/lib/sound";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

export function StepDecide() {
    const {
        scores,
        weights,
        prevStep,
        setWeighSubStep,
        setCurrentStep,
        setShowResult,
        filledCriteria,
        filledOptions,
    } = useDecideStore();


    const criteria = filledCriteria();
    const options = filledOptions();

    const handleBack = () => {
        playClick();
        // Go back to the last weigh sub-step
        setWeighSubStep(criteria.length - 1);
        prevStep();
    };

    const handleDecide = () => {
        playClick();
        setShowResult(true);
    };

    return (
        <>
            <CardHeader className="pb-2">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
                    Step {STEPS.length} of {STEPS.length}
                </p>
                <CardTitle className="text-xl font-bold tracking-tight sm:text-2xl">
                    Review your inputs
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                    Make sure everything looks right before we calculate.
                </p>
            </CardHeader>

            <CardContent className="flex flex-col gap-6 pt-2">
                <div className="-m-1 max-h-[280px] overflow-y-auto overflow-x-auto pr-1 pl-1 pb-1 [&_[data-slot=table-container]]:overflow-visible">
                    <Table>
                        {/* <TableCaption>Decision Score Matrix</TableCaption> */}
                        <TableHeader className="sticky top-0 z-10 bg-muted-foreground">
                            <TableRow>
                                <TableHead className="font-semibold">Criteria</TableHead>
                                <TableHead className="text-center font-semibold">Weight</TableHead>
                                {options.map((opt, i) => (
                                    <TableHead key={i} className="text-center font-semibold">
                                        {opt}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {criteria.map((criterion, ci) => (
                                <TableRow key={ci}>
                                    <TableCell className="font-medium">{criterion}</TableCell>
                                    <TableCell className="text-center font-semibold text-primary">
                                        {weights[ci]}%
                                    </TableCell>
                                    {options.map((_, oi) => (
                                        <TableCell key={oi} className="text-center tabular-nums">
                                            {scores[ci]?.[oi] ?? 0}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="h-px w-full bg-border/50" />

                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer gap-1.5 text-muted-foreground hover:text-foreground"
                        onClick={handleBack}
                    >
                        <ChevronLeftIcon />
                        Back
                    </Button>
                    <Button
                        className="cursor-pointer gap-2 px-8"
                        onClick={handleDecide}
                    >
                        Decide
                        <ChevronRightIcon />
                    </Button>
                </div>
            </CardContent>
        </>
    );
}
