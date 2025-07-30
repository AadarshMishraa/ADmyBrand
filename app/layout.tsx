import "../src/index.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premier Loom | AI-Powered SAAS",
  description: "Modern AI SaaS landing page built with Next.js 15 and Tailwind CSS",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen bg-background antialiased font-sans [font-feature-settings:'ss01'] ${inter.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
