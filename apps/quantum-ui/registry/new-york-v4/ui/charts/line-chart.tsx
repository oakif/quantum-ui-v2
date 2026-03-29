"use client"

import {
  Area,
  CartesianGrid,
  Line,
  ComposedChart,
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

export interface LineChartProps {
  data: Record<string, unknown>[]
  categories: string[]
  index: string
  config: ChartConfig
  fill?: "none" | "solid" | "gradient"
  interpolation?: "curved" | "linear"
  stacked?: boolean
  showBackground?: boolean
  showGrid?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  className?: string
}

export function LineChart({
  data,
  categories,
  index,
  config,
  fill = "gradient",
  interpolation = "curved",
  stacked = false,
  showBackground = true,
  showGrid = true,
  showXAxis = true,
  showYAxis = false,
  showLegend = false,
  showTooltip = true,
  className,
}: LineChartProps) {
  const curveType = interpolation === "curved" ? "natural" : "linear"

  return (
    <ChartContainer
      config={config}
      className={cn(
        "h-full w-full",
        showBackground && "rounded-lg border bg-card p-4",
        className
      )}
    >
      <ComposedChart data={data} accessibilityLayer margin={{ left: 12, right: 12 }}>
        {showGrid && <CartesianGrid vertical={false} />}
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
        {showTooltip && (
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
        )}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {fill === "gradient" && (
          <defs>
            {categories.map((category) => (
              <linearGradient
                key={`gradient-${category}`}
                id={`fill-${category}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={`var(--color-${category})`}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={`var(--color-${category})`}
                  stopOpacity={0.1}
                />
              </linearGradient>
            ))}
          </defs>
        )}
        {categories.map((category) =>
          fill === "none" ? (
            <Line
              key={category}
              dataKey={category}
              type={curveType}
              stroke={`var(--color-${category})`}
              strokeWidth={2}
              dot={false}
            />
          ) : (
            <Area
              key={category}
              dataKey={category}
              type={curveType}
              fill={
                fill === "gradient"
                  ? `url(#fill-${category})`
                  : `var(--color-${category})`
              }
              fillOpacity={fill === "solid" ? 0.4 : 1}
              stroke={`var(--color-${category})`}
              strokeWidth={2}
              stackId={stacked ? "a" : undefined}
            />
          )
        )}
      </ComposedChart>
    </ChartContainer>
  )
}
