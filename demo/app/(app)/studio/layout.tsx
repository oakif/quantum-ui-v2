import { Suspense } from "react"

import { HistoryProvider } from "@/app/(app)/studio/hooks/use-history"
import { LocksProvider } from "@/app/(app)/studio/hooks/use-locks"
import { PreviewThemeProvider } from "@/app/(app)/studio/hooks/use-preview-theme"

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LocksProvider>
      <Suspense>
        <HistoryProvider>
          <PreviewThemeProvider>{children}</PreviewThemeProvider>
        </HistoryProvider>
      </Suspense>
    </LocksProvider>
  )
}
