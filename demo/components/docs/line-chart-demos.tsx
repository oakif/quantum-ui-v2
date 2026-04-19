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

export const chartColorSets = {
  limes: {
    label: "Limes",
    colors: ["var(--color-lime-500)", "var(--color-lime-700)"],
  },
  blues: {
    label: "Blues",
    colors: ["var(--color-blue-400)", "var(--color-blue-600)"],
  },
  oranges: {
    label: "Oranges",
    colors: ["var(--color-orange-400)", "var(--color-orange-600)"],
  },
} as const

const defaultConfig = {
  desktop: { label: "Desktop", color: "var(--color-lime-500)" },
} satisfies ChartConfig

const colorConfigs: Record<string, ChartConfig> = {
  limes: {
    desktop: { label: "Desktop", color: "var(--color-lime-500)" },
    mobile: { label: "Mobile", color: "var(--color-lime-700)" },
  },
  blues: {
    desktop: { label: "Desktop", color: "var(--color-blue-400)" },
    mobile: { label: "Mobile", color: "var(--color-blue-600)" },
  },
  oranges: {
    desktop: { label: "Desktop", color: "var(--color-orange-400)" },
    mobile: { label: "Mobile", color: "var(--color-orange-600)" },
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
      <div className="h-[300px] w-full p-4">
        <LineChart
          data={sampleData}
          categories={["desktop"]}
          index="month"
          config={defaultConfig}
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
          name: "Fill Style",
          options: [
            { label: "Gradient", value: "gradient" },
            { label: "Solid", value: "solid" },
            { label: "None", value: "none" },
          ],
        },
        {
          name: "Colors",
          type: "dropdown",
          options: [
            {
              label: "Limes",
              value: "limes",
              preview: ["#84cc16", "#4d7c0f"],
            },
            {
              label: "Blues",
              value: "blues",
              preview: ["#60a5fa", "#2563eb"],
            },
            {
              label: "Oranges",
              value: "oranges",
              preview: ["#fb923c", "#ea580c"],
            },
          ],
        },
      ]}
      renderPreview={(values) => (
        <div className="h-[300px] w-full p-4">
          <LineChart
            data={sampleData}
            categories={["desktop", "mobile"]}
            index="month"
            config={colorConfigs[values.Colors]}
            fill={values["Fill Style"] as "none" | "solid" | "gradient"}
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
  fill="${values["Fill Style"]}"
/>`
      }
    />
  )
}

export function LineChartInterpolationDemo() {
  return (
    <InteractivePreview
      flush
      settings={[
        {
          name: "Interpolation",
          options: [
            { label: "Natural", value: "curved" },
            { label: "Linear", value: "linear" },
            { label: "Step", value: "step" },
            { label: "Monotone", value: "monotone" },
          ],
        },
      ]}
      renderPreview={(values) => (
        <div className="h-[300px] w-full p-4">
          <LineChart
            data={sampleData}
            categories={["desktop"]}
            index="month"
            config={defaultConfig}
            interpolation={
              values.Interpolation as
                | "curved"
                | "linear"
                | "step"
                | "monotone"
            }
            showBackground={false}
          />
        </div>
      )}
      renderCode={(values) =>
        `<LineChart
  data={data}
  categories={["desktop"]}
  index="month"
  config={config}
  interpolation="${values.Interpolation}"
/>`
      }
    />
  )
}

export function LineChartStackedDemo() {
  return (
    <InteractivePreview
      flush
      settings={[
        {
          name: "Stacked",
          type: "toggle",
          options: [
            { label: "On", value: "on" },
            { label: "Off", value: "off" },
          ],
        },
      ]}
      renderPreview={(values) => (
        <div className="h-[300px] w-full p-4">
          <LineChart
            data={sampleData}
            categories={["desktop", "mobile"]}
            index="month"
            config={colorConfigs.limes}
            fill="solid"
            stacked={values.Stacked === "on"}
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
  fill="solid"${values.Stacked === "on" ? "\n  stacked" : ""}
/>`
      }
    />
  )
}

export function LineChartLegendDemo() {
  return (
    <InteractivePreview
      flush
      settings={[
        {
          name: "Legend",
          type: "toggle",
          options: [
            { label: "On", value: "on" },
            { label: "Off", value: "off" },
          ],
        },
      ]}
      renderPreview={(values) => (
        <div className="h-[300px] w-full p-4">
          <LineChart
            data={sampleData}
            categories={["desktop", "mobile"]}
            index="month"
            config={colorConfigs.limes}
            showLegend={values.Legend === "on"}
            showBackground={false}
          />
        </div>
      )}
      renderCode={(values) =>
        `<LineChart
  data={data}
  categories={["desktop", "mobile"]}
  index="month"
  config={config}${values.Legend === "on" ? "\n  showLegend" : ""}
/>`
      }
    />
  )
}

export function LineChartAxesDemo() {
  return (
    <InteractivePreview
      flush
      settings={[
        {
          name: "X Axis",
          type: "toggle",
          options: [
            { label: "On", value: "on" },
            { label: "Off", value: "off" },
          ],
        },
        {
          name: "Y Axis",
          type: "toggle",
          options: [
            { label: "Off", value: "off" },
            { label: "On", value: "on" },
          ],
        },
        {
          name: "Grid",
          type: "toggle",
          options: [
            { label: "On", value: "on" },
            { label: "Off", value: "off" },
          ],
        },
      ]}
      renderPreview={(values) => (
        <div className="h-[300px] w-full p-4">
          <LineChart
            data={sampleData}
            categories={["desktop"]}
            index="month"
            config={defaultConfig}
            showXAxis={values["X Axis"] === "on"}
            showYAxis={values["Y Axis"] === "on"}
            showGrid={values.Grid === "on"}
            showBackground={false}
          />
        </div>
      )}
      renderCode={(values) =>
        `<LineChart
  data={data}
  categories={["desktop"]}
  index="month"
  config={config}${values["X Axis"] === "off" ? "\n  showXAxis={false}" : ""}${values["Y Axis"] === "on" ? "\n  showYAxis" : ""}${values.Grid === "off" ? "\n  showGrid={false}" : ""}
/>`
      }
    />
  )
}

export function LineChartBackgroundDemo() {
  return (
    <InteractivePreview
      flush
      settings={[
        {
          name: "Background",
          type: "toggle",
          options: [
            { label: "Off", value: "off" },
            { label: "On", value: "on" },
          ],
        },
      ]}
      renderPreview={(values) => (
        <div className="h-[300px] w-full p-4">
          <LineChart
            data={sampleData}
            categories={["desktop", "mobile"]}
            index="month"
            config={colorConfigs.limes}
            showBackground={values.Background === "on"}
          />
        </div>
      )}
      renderCode={(values) =>
        `<LineChart
  data={data}
  categories={["desktop", "mobile"]}
  index="month"
  config={config}${values.Background === "on" ? "\n  showBackground" : ""}
/>`
      }
    />
  )
}
