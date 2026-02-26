import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Make a Decision",
    description:
        "Frame your question, list options, define criteria, and get a clear, data-driven result.",
};

export default function DecideLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
