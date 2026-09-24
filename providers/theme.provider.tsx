"use client"

import type { Site } from "@/core/domain/site"
import { createContext, type ReactNode } from "react"

export type ThemeContextValue = {
    site: Site
    theme: Site["theme"]
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

type ThemeProviderProps = Readonly<{
    site: Site
    children: ReactNode
}>

export function ThemeProvider({ site, children }: ThemeProviderProps) {
    return (
        <ThemeContext.Provider value={{ site, theme: site.theme }}>
            {children}
        </ThemeContext.Provider>
    )
}
