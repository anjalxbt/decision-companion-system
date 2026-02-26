import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Saved Decisions",
    description:
        "Review and manage your saved decision results with full breakdowns and charts.",
};

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
