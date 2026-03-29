"use client"

import { type ChartConfig } from "@/registry/new-york-v4/ui/chart"
import { LineChart } from "@/registry/new-york-v4/ui/charts/line-chart"
import { InlinePreview } from "@/components/docs/inline-preview"
import { InteractivePreview } from "@/components/docs/interactive-preview"

const sampleData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const greenConfig = {
  desktop: { label: "Desktop", color: "hsl(142.1 76.2% 36.3%)" },
} satisfies ChartConfig

const colorConfigs: Record<string, ChartConfig> = {
  green: {
    desktop: { label: "Desktop", color: "hsl(142.1 76.2% 36.3%)" },
    mobile: { label: "Mobile", color: "hsl(142.1 70.6% 45.3%)" },
  },
  blue: {
    desktop: { label: "Desktop", color: "hsl(221.2 83.2% 53.3%)" },
    mobile: { label: "Mobile", color: "hsl(212 95% 68%)" },
  },
  orange: {
    desktop: { label: "Desktop", color: "hsl(24.6 95% 53.1%)" },
    mobile: { label: "Mobile", color: "hsl(20.5 90.2% 48.2%)" },
  },
}

export function LineChartDefaultDemo() {
  return (
    <InlinePreview
      flush
      code={`<LineChart
  data={data}
  categories={["desktop"]}
  index="month"
  config={config}
/>`}
    >
      <div className="h-[200px] w-full">
        <LineChart
          data={sampleData}
          categories={["desktop"]}
          index="month"
          config={greenConfig}
          showBackground={false}
        />
      </div>
    </InlinePreview>
  )
}

export function LineChartFillDemo() {
  return (
    <InteractivePreview
      flush
      settings={[
        {
          name: "Fill",
          options: [
            { label: "Gradient", value: "gradient" },
            { label: "Solid", value: "solid" },
            { label: "None", value: "none" },
          ],
        },
        {
          name: "Color",
          options: [
            { label: "Green", value: "green" },
            { label: "Blue", value: "blue" },
            { label: "Orange", value: "orange" },
          ],
        },
      ]}
      renderPreview={(values) => (
        <div className="h-[200px] w-full">
          <LineChart
            data={sampleData}
            categories={["desktop", "mobile"]}
            index="month"
            config={colorConfigs[values.Color]}
            fill={values.Fill as "none" | "solid" | "gradient"}
            showBackground={false}
          />
        </div>
      )}
      renderCode={(values) =>
        `<LineChart
  data={data}
  categories={["desktop", "mobile"]}
  index="month"
  config={config}
  fill="${values.Fill}"
/>`
      }
    />
  )
}

export function LineChartLinearDemo() {
  return (
    <InlinePreview
      flush
      code={`<LineChart
  data={data}
  categories={["desktop"]}
  index="month"
  config={config}
  interpolation="linear"
/>`}
    >
      <div className="h-[200px] w-full">
        <LineChart
          data={sampleData}
          categories={["desktop"]}
          index="month"
          config={greenConfig}
          interpolation="linear"
          showBackground={false}
        />
      </div>
    </InlinePreview>
  )
}

export function LineChartStackedDemo() {
  return (
    <InlinePreview
      flush
      code={`<LineChart
  data={data}
  categories={["desktop", "mobile"]}
  index="month"
  config={config}
  fill="solid"
  stacked
/>`}
    >
      <div className="h-[200px] w-full">
        <LineChart
          data={sampleData}
          categories={["desktop", "mobile"]}
          index="month"
          config={colorConfigs.green}
          fill="solid"
          stacked
          showBackground={false}
        />
      </div>
    </InlinePreview>
  )
}

export function LineChartLegendDemo() {
  return (
    <InlinePreview
      flush
      code={`<LineChart
  data={data}
  categories={["desktop", "mobile"]}
  index="month"
  config={config}
  showLegend
/>`}
    >
      <div className="h-[200px] w-full">
        <LineChart
          data={sampleData}
          categories={["desktop", "mobile"]}
          index="month"
          config={colorConfigs.green}
          showLegend
          showBackground={false}
        />
      </div>
    </InlinePreview>
  )
}
