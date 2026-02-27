"use client";

import { Button } from "@/components/ui/button";
import { playClick } from "@/lib/sound";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-background px-6">
      <Link
        onClick={playClick}
        href="/how-it-works"
        className="fixed top-4 right-[7.5rem] z-50 flex items-center gap-1.5 bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
      >
        How it works
      </Link>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-10"
        style={{ backgroundImage: "url('/bg_image.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
      />

      <div
        aria-hidden="true"
        className="animate-float absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden="true"
        className="animate-float-delayed absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-destructive/8 blur-3xl sm:h-80 sm:w-80"
      />
      <div
        aria-hidden="true"
        className="animate-float-slow absolute top-1/3 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/5 blur-2xl sm:h-64 sm:w-64"
      />


      <main className="relative z-10 flex max-w-xl flex-col items-center gap-6 text-center sm:gap-8">

        <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
          DECIDE WITH
          <span className="text-primary"> CLARITY</span>
        </h1>


        <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
          Weigh your options. Trust the outcome. Stop&nbsp;overthinking.
        </p>


        <Link href="/decide" onClick={playClick}>
          <Button
            size="lg"
            className="mt-2 min-h-12 cursor-pointer px-8 text-base font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-[0.98] sm:min-h-14 sm:px-10 sm:text-lg"
          >
            Make Decision
          </Button>
        </Link>
      </main>


      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/60 sm:text-sm">
        Powered by weighted decision model
      </p>
    </div>
  );
}
