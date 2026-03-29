import * as React from "react"
import { type registryItemSchema } from "shadcn/schema"
import { type z } from "zod"

import { highlightCode } from "@/lib/highlight-code"
import { getRegistryItem } from "@/lib/registry"
import { cn } from "@/lib/utils"
import { ChartCodeCollapsible } from "@/components/chart-code-collapsible"
import { ChartIframe } from "@/components/chart-iframe"
import { ChartCopyButton } from "@/components/chart-copy-button"
import { type Style } from "@/registry/_legacy-styles"

export type Chart = z.infer<typeof registryItemSchema> & {
  highlightedCode: string
}

export function ChartDisplay({
  chart,
  style,
  className,
}: {
  chart: Chart
  style: string
} & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border",
        className
      )}
    >
      <div className="relative z-10 overflow-hidden bg-background">
        <ChartIframe
          src={`/view/${style}/${chart.name}?minimal=true`}
          height={220}
          title={chart.name}
        />
      </div>
      <ChartCodeCollapsible
        code={chart.files?.[0]?.content ?? ""}
        highlightedCode={chart.highlightedCode}
        chartName={chart.name}
      />
    </div>
  )
}

// Exported for parallel prefetching in page components.
export const getCachedRegistryItem = React.cache(
  async (name: string, styleName: Style["name"]) => {
    return await getRegistryItem(name, styleName)
  }
)

export const getChartHighlightedCode = React.cache(async (content: string) => {
  return await highlightCode(content)
})
