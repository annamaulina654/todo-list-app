"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

const THEME_KEY = "todo.theme.v1"
type ThemeMode = "light" | "dark"

export function ThemeToggle() {
  const [mode, setMode] = React.useState<ThemeMode>("light")

  React.useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY) as ThemeMode | null
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    const initial: ThemeMode = stored ?? (prefersDark ? "dark" : "light")
    setMode(initial)
    applyTheme(initial)
    const mql = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = (e: MediaQueryListEvent) => {
      const currentStored = window.localStorage.getItem(THEME_KEY)
      if (!currentStored) {
        const next: ThemeMode = e.matches ? "dark" : "light"
        setMode(next)
        applyTheme(next)
      }
    }
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  const applyTheme = (m: ThemeMode) => {
    const root = document.documentElement
    if (m === "dark") root.classList.add("dark")
    else root.classList.remove("dark")
  }

  const toggle = () => {
    const next: ThemeMode = mode === "dark" ? "light" : "dark"
    setMode(next)
    applyTheme(next)
    window.localStorage.setItem(THEME_KEY, next)
  }

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={toggle}
      aria-pressed={mode === "dark"}
      title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {mode === "dark" ? "Dark" : "Light"}
    </Button>
  )
}
