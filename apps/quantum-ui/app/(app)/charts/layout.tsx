import { type Metadata } from "next"

import { ChartsSidebar } from "@/components/charts-sidebar"
import { SidebarProvider } from "@/registry/new-york-v4/ui/sidebar"

export const metadata: Metadata = {
  title: "Charts",
  description: "Chart components built with Recharts.",
}

export default function ChartsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container-wrapper flex flex-1 flex-col px-2">
      <SidebarProvider
        className="min-h-min flex-1 items-start px-0 [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--top-spacing:calc(var(--spacing)*4)] 3xl:fixed:container 3xl:fixed:px-3"
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
          } as React.CSSProperties
        }
      >
        <ChartsSidebar />
        <div className="mx-auto h-full w-full max-w-[40rem] px-4 md:px-0">{children}</div>
      </SidebarProvider>
    </div>
  )
}
