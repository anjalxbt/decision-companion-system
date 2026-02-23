"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDecideStore } from "@/lib/store/decide-store";

export function StartOver() {
    const currentStep = useDecideStore((s) => s.currentStep);
    const reset = useDecideStore((s) => s.reset);

    if (currentStep === 0) return null;

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    type="button"
                    className="fixed top-4 right-4 z-50 cursor-pointer bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-600/80"
                >
                    Start over
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Start over?</AlertDialogTitle>
                    <AlertDialogDescription className="text-black">
                        This will clear all your progress — question, options, criteria,
                        weights, and scores. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={reset}
                        className="cursor-pointer bg-red-600 text-white hover:bg-red-600/90"
                    >
                        Yes, start over
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
