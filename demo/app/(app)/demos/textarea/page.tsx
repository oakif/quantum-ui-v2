"use client"

import { Textarea } from "@/registry/new-york-v4/ui/textarea"

export default function TextareaDemoPage() {
  return (
    <div className="container max-w-4xl py-12 space-y-12">
      <div>
        <h1 className="text-2xl font-bold">Textarea</h1>
        <p className="text-muted-foreground mt-1">A multi-line text input.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Default</h2>
        <Textarea placeholder="Type your message here..." className="max-w-md" />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">With Label</h2>
        <div className="max-w-md space-y-2">
          <label className="text-sm font-medium">Source folders</label>
          <Textarea placeholder="One path per line" rows={3} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Disabled</h2>
        <Textarea placeholder="Disabled" disabled className="max-w-md" />
      </section>
    </div>
  )
}
