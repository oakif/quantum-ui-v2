"use client"

import { useState } from "react"

import { Switch } from "@/registry/new-york-v4/ui/switch"
import { InlinePreview } from "@/components/docs/inline-preview"

export function SwitchDemoPreview() {
  const [checked, setChecked] = useState(false)
  return (
    <InlinePreview
      code={`const [checked, setChecked] = useState(false)

<Switch checked={checked} onCheckedChange={setChecked} />`}
    >
      <Switch checked={checked} onCheckedChange={setChecked} />
    </InlinePreview>
  )
}

export function SwitchWithLabelPreview() {
  const [checked, setChecked] = useState(false)
  return (
    <InlinePreview
      code={`<Switch
  label="Enable notifications"
  checked={checked}
  onCheckedChange={setChecked}
/>`}
    >
      <Switch
        label="Enable notifications"
        checked={checked}
        onCheckedChange={setChecked}
      />
    </InlinePreview>
  )
}

export function SwitchWithDescriptionPreview() {
  const [checked, setChecked] = useState(true)
  return (
    <InlinePreview
      code={`<Switch
  label="Email notifications"
  description="Receive email updates about your account activity."
  checked={checked}
  onCheckedChange={setChecked}
/>`}
    >
      <Switch
        label="Email notifications"
        description="Receive email updates about your account activity."
        checked={checked}
        onCheckedChange={setChecked}
      />
    </InlinePreview>
  )
}

export function SwitchReversePreview() {
  const [checked, setChecked] = useState(true)
  return (
    <InlinePreview
      code={`<Switch
  label="Auto-sync photos"
  description="Automatically sync new photos from connected drives"
  reverse
  checked={checked}
  onCheckedChange={setChecked}
/>`}
    >
      <div className="w-full max-w-sm">
        <Switch
          label="Auto-sync photos"
          description="Automatically sync new photos from connected drives"
          reverse
          checked={checked}
          onCheckedChange={setChecked}
        />
      </div>
    </InlinePreview>
  )
}

export function SwitchCardPreview() {
  const [marketing, setMarketing] = useState(true)
  const [security, setSecurity] = useState(false)
  return (
    <InlinePreview
      code={`<Switch
  label="Marketing emails"
  description="Receive emails about new products, features, and promotions."
  card
  checked={marketing}
  onCheckedChange={setMarketing}
/>
<Switch
  label="Security alerts"
  description="Get notified about unusual activity in your account."
  card
  reverse
  checked={security}
  onCheckedChange={setSecurity}
/>`}
    >
      <div className="flex w-full max-w-sm flex-col gap-3">
        <Switch
          label="Marketing emails"
          description="Receive emails about new products, features, and promotions."
          card
          checked={marketing}
          onCheckedChange={setMarketing}
        />
        <Switch
          label="Security alerts"
          description="Get notified about unusual activity in your account."
          card
          reverse
          checked={security}
          onCheckedChange={setSecurity}
        />
      </div>
    </InlinePreview>
  )
}

export function SwitchSizesPreview() {
  const [sm, setSm] = useState(true)
  const [def, setDef] = useState(true)
  const [lg, setLg] = useState(true)
  return (
    <InlinePreview
      code={`<Switch size="sm" label="Small" />
<Switch size="default" label="Default" />
<Switch size="lg" label="Large" />`}
    >
      <div className="flex flex-col gap-4">
        <Switch size="sm" label="Small" checked={sm} onCheckedChange={setSm} />
        <Switch size="default" label="Default" checked={def} onCheckedChange={setDef} />
        <Switch size="lg" label="Large" checked={lg} onCheckedChange={setLg} />
      </div>
    </InlinePreview>
  )
}

export function SwitchDisabledPreview() {
  return (
    <InlinePreview
      code={`<Switch label="Disabled off" disabled />
<Switch label="Disabled on" disabled defaultChecked />`}
    >
      <div className="flex flex-col gap-4">
        <Switch label="Disabled off" disabled />
        <Switch label="Disabled on" disabled defaultChecked />
      </div>
    </InlinePreview>
  )
}
