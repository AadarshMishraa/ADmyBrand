"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  /**
   * Default theme mode. "system" uses OS preference.
   */
  defaultTheme?: "light" | "dark" | "system";
}

export function ThemeProvider({ children, defaultTheme = "system" }: Props) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
