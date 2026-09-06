import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Darkstars Lab — Digital backbone for South African business",
  description:
    "Websites, brand identity, marketing, and AI-powered automation — built under one roof, and built to move fast.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable} h-full`}>
      <body className="min-h-full bg-void text-ink antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
