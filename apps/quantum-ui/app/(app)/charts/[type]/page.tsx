import * as React from "react"
import { notFound } from "next/navigation"

import {
  ChartDisplay,
  getCachedRegistryItem,
  getChartHighlightedCode,
} from "@/components/chart-display"
import { getActiveStyle } from "@/registry/_legacy-styles"
import { charts } from "@/app/(app)/charts/charts"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

interface ChartPageProps {
  params: Promise<{
    type: string
  }>
}

const chartTypes = [
  "area",
  "bar",
  "line",
  "pie",
  "radar",
  "radial",
  "tooltip",
] as const
type ChartType = (typeof chartTypes)[number]

export async function generateStaticParams() {
  return chartTypes.map((type) => ({
    type,
  }))
}

export default async function ChartPage({ params }: ChartPageProps) {
  const { type } = await params

  if (!chartTypes.includes(type as ChartType)) {
    return notFound()
  }

  const chartType = type as ChartType
  const chartList = charts[chartType]
  const activeStyle = await getActiveStyle()

  // Prefetch all chart data in parallel for better performance.
  // Charts are rendered via iframes, so we only need the metadata and highlighted code.
  const chartDataPromises = chartList.map(async (chart) => {
    const registryItem = await getCachedRegistryItem(chart.id, activeStyle.name)
    if (!registryItem) return null

    const highlightedCode = await getChartHighlightedCode(
      registryItem.files?.[0]?.content ?? ""
    )
    if (!highlightedCode) return null

    return {
      ...registryItem,
      highlightedCode,
      fullWidth: chart.fullWidth,
    }
  })

  const prefetchedCharts = await Promise.all(chartDataPromises)

  return (
    <div className="flex flex-1 flex-col gap-8 py-6">
      <h2 className="sr-only">
        {type.charAt(0).toUpperCase() + type.slice(1)} Charts
      </h2>
      {prefetchedCharts.map(
        (chart) =>
          chart && (
            <div key={chart.name} id={chart.name}>
              <ChartDisplay chart={chart} style={activeStyle.name} />
            </div>
          )
      )}
    </div>
  )
}
