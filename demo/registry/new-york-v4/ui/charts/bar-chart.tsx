"use client"

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

import { cn } from "@/lib/utils"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/new-york-v4/ui/chart"

export interface BarChartProps {
  data: Record<string, unknown>[]
  categories: string[]
  index: string
  config: ChartConfig
  orientation?: "vertical" | "horizontal"
  stacked?: boolean
  showBackground?: boolean
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  className?: string
}

export function BarChart({
  data,
  categories,
  index,
  config,
  orientation = "vertical",
  stacked = false,
  showBackground = true,
  showGrid = true,
  showXAxis = true,
  showYAxis = false,
  showLegend = false,
  showTooltip = true,
  className,
}: BarChartProps) {
  const isHorizontal = orientation === "horizontal"

  return (
    <ChartContainer
      config={config}
      className={cn(
        "h-full w-full",
        showBackground && "rounded-lg border bg-card p-4",
        className
      )}
    >
      <RechartsBarChart
        data={data}
        layout={isHorizontal ? "vertical" : "horizontal"}
        accessibilityLayer
      >
        {showGrid && <CartesianGrid vertical={false} />}
        {isHorizontal ? (
          <>
            <YAxis
              dataKey={index}
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <XAxis type="number" hide />
          </>
        ) : (
          <>
            {showXAxis && (
              <XAxis
                dataKey={index}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
            )}
            {showYAxis && (
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            )}
          </>
        )}
        {showTooltip && (
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
        )}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {categories.map((category) => (
          <Bar
            key={category}
            dataKey={category}
            fill={`var(--color-${category})`}
            radius={4}
            stackId={stacked ? "a" : undefined}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  )
}
