"use client"

import { Input } from "@/registry/new-york-v4/ui/input"
import { InlinePreview } from "@/components/docs/inline-preview"

export function InputDemoPreview() {
  return (
    <InlinePreview
      code={`<Input placeholder="Email address" />`}
    >
      <div className="w-full max-w-sm">
        <Input placeholder="Email address" />
      </div>
    </InlinePreview>
  )
}

export function InputDisabledPreview() {
  return (
    <InlinePreview
      code={`<Input placeholder="Disabled input" disabled />`}
    >
      <div className="w-full max-w-sm">
        <Input placeholder="Disabled input" disabled />
      </div>
    </InlinePreview>
  )
}
