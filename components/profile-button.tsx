"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function ProfileButton() {
    const pathname = usePathname();

    // Hide on the profile page itself
    if (pathname === "/profile") return null;

    return (
        <Link
            href="/profile"
            className="fixed top-4 right-4 z-50 flex items-center gap-1.5 bg-primary px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-primary/80"
            aria-label="Profile"
        >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Profile
        </Link>
    );
}
