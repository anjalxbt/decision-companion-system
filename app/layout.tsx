import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import { ProfileButton } from "@/components/profile-button";
import "./globals.css";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Decision Companion",
  description:
    "Make confident decisions using the weighted decision model.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoMono.variable} ${robotoMono.className} antialiased h-dvh overflow-hidden`}
      >
        <ProfileButton />
        {children}
      </body>
    </html>
  );
}

