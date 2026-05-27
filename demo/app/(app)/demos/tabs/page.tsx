"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent, type TabsTheme } from "@/registry/new-york-v4/ui/tabs"

export default function TabsDemoPage() {
  const [theme, setTheme] = useState<TabsTheme>("coss")

  return (
    <div className="container max-w-4xl py-12 space-y-12">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tabs</h1>
          <p className="text-muted-foreground mt-1">Switch between content panels. Also works as a segmented control.</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as TabsTheme)}
            className="rounded-md border border-input bg-background px-2 py-1 text-sm"
          >
            <option value="coss">Coss</option>
            <option value="shadcn">shadcn</option>
          </select>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Default (pill)</h2>
        <Tabs defaultValue="tab1">
          <TabsList theme={theme}>
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Analytics</TabsTrigger>
            <TabsTrigger value="tab3">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="rounded-lg border p-4 mt-2">Overview content goes here.</div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="rounded-lg border p-4 mt-2">Analytics content goes here.</div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="rounded-lg border p-4 mt-2">Reports content goes here.</div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Underline variant</h2>
        <Tabs defaultValue="tab1">
          <TabsList variant="underline" theme={theme}>
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Analytics</TabsTrigger>
            <TabsTrigger value="tab3">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="rounded-lg border p-4 mt-2">Overview content goes here.</div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="rounded-lg border p-4 mt-2">Analytics content goes here.</div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="rounded-lg border p-4 mt-2">Reports content goes here.</div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">As segmented control</h2>
        <p className="text-sm text-muted-foreground">Replaces the custom SegmentedControl component.</p>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Filename Mode</label>
            <Tabs defaultValue="keep">
              <TabsList theme={theme}>
                <TabsTrigger value="keep">Keep Original</TabsTrigger>
                <TabsTrigger value="normalize">Normalize</TabsTrigger>
                <TabsTrigger value="serialize">Serialize</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Timestamp Source</label>
            <Tabs defaultValue="filename">
              <TabsList theme={theme}>
                <TabsTrigger value="filename">Filename</TabsTrigger>
                <TabsTrigger value="exif">EXIF</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Disabled tab</h2>
        <Tabs defaultValue="tab1">
          <TabsList theme={theme}>
            <TabsTrigger value="tab1">Active</TabsTrigger>
            <TabsTrigger value="tab2" disabled>Disabled</TabsTrigger>
            <TabsTrigger value="tab3">Also Active</TabsTrigger>
          </TabsList>
        </Tabs>
      </section>
    </div>
  )
}
