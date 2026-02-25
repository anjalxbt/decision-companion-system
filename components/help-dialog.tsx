import { type ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface HelpDialogProps {
    title: string;
    children: ReactNode;
}

export function HelpDialog({ title, children }: HelpDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="absolute top-4 right-4 z-20 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-secondary text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Help"
                >
                    ?
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-sm leading-relaxed">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}
