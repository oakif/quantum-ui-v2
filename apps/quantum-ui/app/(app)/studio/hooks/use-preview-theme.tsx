"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export type PreviewThemeMode = "inherit" | "light" | "dark"

const PreviewThemeContext = React.createContext<{
  previewTheme: PreviewThemeMode
  setPreviewTheme: (mode: PreviewThemeMode) => void
  resolvedPreviewTheme: "light" | "dark"
}>({
  previewTheme: "inherit",
  setPreviewTheme: () => {},
  resolvedPreviewTheme: "dark",
})

export function PreviewThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [previewTheme, setPreviewTheme] =
    React.useState<PreviewThemeMode>("inherit")
  const { resolvedTheme } = useTheme()

  const resolvedPreviewTheme = React.useMemo(() => {
    if (previewTheme === "inherit") {
      return (resolvedTheme as "light" | "dark") ?? "dark"
    }
    return previewTheme
  }, [previewTheme, resolvedTheme])

  // D key toggles between light and dark (not inherit)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (
        (e.key === "d" || e.key === "D") &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setPreviewTheme((current) => {
          if (current === "inherit") {
            // Toggle away from inherited value
            return resolvedPreviewTheme === "dark" ? "light" : "dark"
          }
          return current === "dark" ? "light" : "dark"
        })
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [resolvedPreviewTheme])

  return (
    <PreviewThemeContext.Provider
      value={{ previewTheme, setPreviewTheme, resolvedPreviewTheme }}
    >
      {children}
    </PreviewThemeContext.Provider>
  )
}

export function usePreviewTheme() {
  return React.useContext(PreviewThemeContext)
}
