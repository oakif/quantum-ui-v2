"use client"

import { Label, Pie, PieChart as RechartsPieChart } from "recharts"

import { cn } from "@/lib/utils"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/new-york-v4/ui/chart"

export interface PieChartProps {
  data: { name: string; value: number; fill?: string }[]
  config: ChartConfig
  innerRadius?: number
  showLabel?: boolean
  showBackground?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  className?: string
}

export function PieChart({
  data,
  config,
  innerRadius = 0,
  showLabel = false,
  showBackground = true,
  showLegend = false,
  showTooltip = true,
  className,
}: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <ChartContainer
      config={config}
      className={cn(
        "h-full w-full",
        showBackground && "rounded-lg border bg-card p-4",
        className
      )}
    >
      <RechartsPieChart accessibilityLayer>
        {showTooltip && (
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
        )}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={innerRadius}
          strokeWidth={2}
        >
          {showLabel && innerRadius > 0 && (
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {total.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 20}
                        className="fill-muted-foreground text-xs"
                      >
                        Total
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          )}
        </Pie>
      </RechartsPieChart>
    </ChartContainer>
  )
}
