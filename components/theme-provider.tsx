// components/theme-provider.tsx
"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { Attribute } from "next-themes"
import type React from "react"

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: Attribute | Attribute[]
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      {children}
    </NextThemesProvider>
  )
}
