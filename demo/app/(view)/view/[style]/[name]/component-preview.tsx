"use client"

import { useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"

export function ComponentPreview({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const isMinimal = searchParams.get("minimal") === "true"

  return (
    <div
      className={cn(
        "bg-background *:data-[slot=card]:has-[[data-slot=chart]]:shadow-none",
        isMinimal &&
          "[&_[data-slot=card-header]]:hidden [&_[data-slot=card-footer]]:hidden [&_[data-slot=card]]:border-0 [&_[data-slot=card]]:shadow-none [&_[data-slot=card-content]]:p-4"
      )}
    >
      {children}
    </div>
  )
}
