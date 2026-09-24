"use client"

import { ThemeContext } from "@/providers/theme.provider"
import { useContext } from "react"

export function useSite() {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error("useSite must be used within ThemeProvider")
    }

    return context
}
