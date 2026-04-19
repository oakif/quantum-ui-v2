"use client"

import { CartesianGrid, XAxis, YAxis } from "recharts"

import { cn } from "@/lib/utils"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/new-york-v4/ui/chart"

export interface ChartCardProps {
  config: ChartConfig
  showBackground?: boolean
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  index?: string
  className?: string
  children: React.ReactNode
}

export function ChartCard({
  config,
  showBackground = true,
  showGrid = true,
  showXAxis = true,
  showYAxis = false,
  showLegend = false,
  showTooltip = true,
  index,
  className,
  children,
}: ChartCardProps) {
  return (
    <ChartContainer
      config={config}
      className={cn(
        "h-full w-full",
        showBackground && "rounded-lg border bg-card p-4",
        className
      )}
    >
      {children}
    </ChartContainer>
  )
}

export function ChartGridLines() {
  return <CartesianGrid vertical={false} />
}

export function ChartXAxis({ dataKey }: { dataKey: string }) {
  return (
    <XAxis dataKey={dataKey} tickLine={false} axisLine={false} tickMargin={8} />
  )
}

export function ChartYAxis() {
  return <YAxis tickLine={false} axisLine={false} tickMargin={8} />
}

export { ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent }
export type { ChartConfig }
