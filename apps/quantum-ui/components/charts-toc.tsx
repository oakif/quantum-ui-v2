"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    for (const id of itemIds ?? []) {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    }

    return () => {
      for (const id of itemIds ?? []) {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      }
    }
  }, [itemIds])

  return activeId
}

export function ChartsTableOfContents({
  charts,
  className,
}: {
  charts: { name: string; id: string }[]
  className?: string
}) {
  const itemIds = React.useMemo(
    () => charts.map((chart) => chart.id),
    [charts]
  )
  const activeItem = useActiveItem(itemIds)

  if (!charts?.length) {
    return null
  }

  return (
    <div className={cn("flex flex-col gap-2 p-4 pt-0 text-sm", className)}>
      <p className="sticky top-0 h-6 bg-background text-xs font-medium text-muted-foreground">
        On This Page
      </p>
      {charts.map((chart) => (
        <a
          key={chart.id}
          href={`#${chart.id}`}
          className="text-[0.8rem] text-muted-foreground no-underline transition-colors hover:text-foreground data-[active=true]:font-medium data-[active=true]:text-foreground"
          data-active={chart.id === activeItem}
        >
          {chart.name}
        </a>
      ))}
    </div>
  )
}
