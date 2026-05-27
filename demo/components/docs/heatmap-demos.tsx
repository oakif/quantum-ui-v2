"use client"

import { useMemo } from "react"
import { Heatmap, type HeatmapData } from "@/registry/new-york-v4/ui/heatmap"

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex min-h-[240px] items-center justify-center overflow-x-auto rounded-lg border bg-card p-6">
        {children}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{title}</p>
    </div>
  )
}

function generateRandomData(
  startDate: Date,
  endDate: Date,
  maxValue: number = 30
): HeatmapData {
  const data: HeatmapData = []
  const current = new Date(startDate)
  while (current <= endDate) {
    data.push({ date: current.toISOString().slice(0, 10), value: Math.floor(Math.random() * (maxValue + 1)) })
    current.setDate(current.getDate() + 1)
  }
  return data
}

const MONTH_DATA: HeatmapData = [
  { date: "2025-12-01", value: 2 }, { date: "2025-12-02", value: 0 },
  { date: "2025-12-03", value: 5 }, { date: "2025-12-04", value: 1 },
  { date: "2025-12-05", value: 3 }, { date: "2025-12-06", value: 4 },
  { date: "2025-12-07", value: 2 }, { date: "2025-12-08", value: 0 },
  { date: "2025-12-09", value: 3 }, { date: "2025-12-10", value: 6 },
  { date: "2025-12-11", value: 2 }, { date: "2025-12-12", value: 1 },
  { date: "2025-12-13", value: 4 }, { date: "2025-12-14", value: 0 },
  { date: "2025-12-15", value: 2 }, { date: "2025-12-16", value: 5 },
  { date: "2025-12-17", value: 3 }, { date: "2025-12-18", value: 4 },
  { date: "2025-12-19", value: 0 }, { date: "2025-12-20", value: 1 },
  { date: "2025-12-21", value: 2 }, { date: "2025-12-22", value: 3 },
  { date: "2025-12-23", value: 0 }, { date: "2025-12-24", value: 2 },
  { date: "2025-12-25", value: 5 }, { date: "2025-12-26", value: 1 },
  { date: "2025-12-27", value: 0 }, { date: "2025-12-28", value: 3 },
  { date: "2025-12-29", value: 4 }, { date: "2025-12-30", value: 2 },
  { date: "2025-12-31", value: 1 },
]

const PURPLE_SCALE = ["var(--color-muted)", "oklch(0.55 0.15 300 / 0.3)", "oklch(0.55 0.15 300 / 0.55)", "oklch(0.55 0.15 300 / 0.8)", "oklch(0.65 0.20 300)"]
const BLUE_SCALE = ["var(--color-muted)", "oklch(0.55 0.12 250 / 0.3)", "oklch(0.55 0.12 250 / 0.55)", "oklch(0.55 0.12 250 / 0.8)", "oklch(0.65 0.18 250)"]

export function HeatmapExamplesGrid() {
  const halfYearData = useMemo(
    () => generateRandomData(new Date("2025-01-01"), new Date("2025-06-30")),
    []
  )
  const fullYearData = useMemo(
    () => generateRandomData(new Date("2025-01-01"), new Date("2025-12-31")),
    []
  )

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <DemoCard title="Default heatmap with interpolated colors.">
        <Heatmap
          data={halfYearData}
          startDate={new Date("2025-01-01")}
          endDate={new Date("2025-06-30")}
          colorMode="interpolate"
          cellSize={14}
        />
      </DemoCard>

      <DemoCard title="Discrete color scale (default green).">
        <Heatmap
          data={MONTH_DATA}
          startDate={new Date("2025-12-01")}
          endDate={new Date("2025-12-31")}
          colorMode="discrete"
        />
      </DemoCard>

      <DemoCard title="Custom purple color scale.">
        <Heatmap
          data={MONTH_DATA}
          startDate={new Date("2025-12-01")}
          endDate={new Date("2025-12-31")}
          colorMode="discrete"
          colorScale={PURPLE_SCALE}
        />
      </DemoCard>

      <DemoCard title="Custom blue color scale.">
        <Heatmap
          data={MONTH_DATA}
          startDate={new Date("2025-12-01")}
          endDate={new Date("2025-12-31")}
          colorMode="discrete"
          colorScale={BLUE_SCALE}
        />
      </DemoCard>

      <DemoCard title="Bubbles display style.">
        <Heatmap
          data={MONTH_DATA}
          startDate={new Date("2025-12-01")}
          endDate={new Date("2025-12-31")}
          colorMode="interpolate"
          displayStyle="bubbles"
        />
      </DemoCard>

      <DemoCard title="Squares display style.">
        <Heatmap
          data={MONTH_DATA}
          startDate={new Date("2025-12-01")}
          endDate={new Date("2025-12-31")}
          colorMode="interpolate"
          displayStyle="squares"
        />
      </DemoCard>

      <DemoCard title="Day labels: all days.">
        <Heatmap
          data={MONTH_DATA}
          startDate={new Date("2025-12-01")}
          endDate={new Date("2025-12-31")}
          colorMode="interpolate"
          daysOfTheWeek="all"
        />
      </DemoCard>

      <DemoCard title="Day labels: single letter.">
        <Heatmap
          data={MONTH_DATA}
          startDate={new Date("2025-12-01")}
          endDate={new Date("2025-12-31")}
          colorMode="interpolate"
          daysOfTheWeek="single letter"
        />
      </DemoCard>

      <div className="md:col-span-2">
        <DemoCard title="Full year heatmap.">
          <Heatmap
            data={fullYearData}
            startDate={new Date("2025-01-01")}
            endDate={new Date("2025-12-31")}
            colorMode="interpolate"
            cellSize={12}
            gap={3}
          />
        </DemoCard>
      </div>
    </div>
  )
}
