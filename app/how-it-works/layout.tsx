import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "How It Works",
    description:
        "Learn how Decision Companion uses a 5-step weighted scoring model to turn subjective choices into objective comparisons.",
};

export default function HowItWorksLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
