"use client"

import { useState } from "react"

import { Switch } from "@/registry/new-york-v4/ui/switch"
import { InlinePreview } from "@/components/docs/inline-preview"

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border bg-card p-8">
        {children}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{title}</p>
    </div>
  )
}

export function SwitchExamplesGrid() {
  const [basic, setBasic] = useState(false)
  const [basicOn, setBasicOn] = useState(true)
  const [airplane, setAirplane] = useState(false)
  const [dark, setDark] = useState(true)
  const [share, setShare] = useState(true)
  const [sm, setSm] = useState(true)
  const [def, setDef] = useState(true)
  const [lg, setLg] = useState(true)
  const [blue, setBlue] = useState(true)
  const [green, setGreen] = useState(true)
  const [orange, setOrange] = useState(true)
  const [push, setPush] = useState(true)
  const [email, setEmail] = useState(false)
  const [sms, setSms] = useState(false)
  const [marketing, setMarketing] = useState(true)
  const [security, setSecurity] = useState(false)
  const [destructive, setDestructive] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [spell, setSpell] = useState(true)
  const [lineNums, setLineNums] = useState(false)

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <DemoCard title="Basic switch.">
        <div className="flex items-center gap-6">
          <Switch checked={basic} onCheckedChange={setBasic} />
          <Switch checked={basicOn} onCheckedChange={setBasicOn} />
        </div>
      </DemoCard>

      <DemoCard title="Switch with label.">
        <div className="flex flex-col gap-4">
          <Switch label="Airplane Mode" checked={airplane} onCheckedChange={setAirplane} />
          <Switch label="Dark Mode" checked={dark} onCheckedChange={setDark} />
        </div>
      </DemoCard>

      <DemoCard title="Switch with description.">
        <div className="w-full max-w-xs px-4">
          <Switch
            label="Share across devices"
            description="Focus is shared across devices, and turns off when you leave the app."
            checked={share}
            onCheckedChange={setShare}
          />
        </div>
      </DemoCard>

      <DemoCard title="Disabled states.">
        <div className="flex flex-col gap-4">
          <Switch label="Disabled (Off)" disabled />
          <Switch label="Disabled (On)" disabled defaultChecked />
        </div>
      </DemoCard>

      <DemoCard title="Switch in different sizes.">
        <div className="flex flex-col gap-4">
          <Switch size="sm" label="Small" checked={sm} onCheckedChange={setSm} />
          <Switch size="default" label="Default" checked={def} onCheckedChange={setDef} />
          <Switch size="lg" label="Large" checked={lg} onCheckedChange={setLg} />
        </div>
      </DemoCard>

      <DemoCard title="Colored switches.">
        <div className="flex flex-col gap-4">
          <Switch color="var(--color-blue-500)" label="Blue" checked={blue} onCheckedChange={setBlue} />
          <Switch color="var(--color-green-500)" label="Green" checked={green} onCheckedChange={setGreen} />
          <Switch color="var(--color-orange-500)" label="Orange" checked={orange} onCheckedChange={setOrange} />
        </div>
      </DemoCard>

      <DemoCard title="Notification settings.">
        <div className="flex w-full max-w-xs flex-col gap-3 px-4">
          <Switch label="Push notifications" reverse checked={push} onCheckedChange={setPush} />
          <Switch label="Email notifications" reverse checked={email} onCheckedChange={setEmail} />
          <Switch label="SMS notifications" reverse checked={sms} onCheckedChange={setSms} />
        </div>
      </DemoCard>

      <DemoCard title="Settings panel with cards.">
        <div className="flex w-full max-w-xs flex-col gap-3 px-4">
          <Switch
            label="Marketing emails"
            description="New products and promotions."
            card
            checked={marketing}
            onCheckedChange={setMarketing}
          />
          <Switch
            label="Security alerts"
            description="Unusual account activity."
            card
            reverse
            checked={security}
            onCheckedChange={setSecurity}
          />
        </div>
      </DemoCard>

      <DemoCard title="Destructive switch with confirmation.">
        <div className="w-full max-w-xs px-4">
          <Switch
            label="Delete all data on sign out"
            description="All local data will be permanently removed. This cannot be undone."
            color="var(--color-destructive)"
            reverse
            checked={destructive}
            onCheckedChange={setDestructive}
          />
        </div>
      </DemoCard>

      <DemoCard title="Compact settings with small switches.">
        <div className="flex w-full max-w-xs flex-col px-4">
          <div className="flex items-center justify-between border-b py-2.5">
            <span className="text-sm">Auto-save</span>
            <Switch size="sm" checked={autoSave} onCheckedChange={setAutoSave} />
          </div>
          <div className="flex items-center justify-between border-b py-2.5">
            <span className="text-sm">Spell check</span>
            <Switch size="sm" checked={spell} onCheckedChange={setSpell} />
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-sm">Line numbers</span>
            <Switch size="sm" checked={lineNums} onCheckedChange={setLineNums} />
          </div>
        </div>
      </DemoCard>
    </div>
  )
}

// Keep individual previews for backward compat with MDX references
export function SwitchDemoPreview() {
  const [checked, setChecked] = useState(false)
  return (
    <InlinePreview
      code={`<Switch checked={checked} onCheckedChange={setChecked} />`}
    >
      <Switch checked={checked} onCheckedChange={setChecked} />
    </InlinePreview>
  )
}

export function SwitchWithLabelPreview() {
  const [checked, setChecked] = useState(false)
  return (
    <InlinePreview
      code={`<Switch label="Enable notifications" />`}
    >
      <Switch label="Enable notifications" checked={checked} onCheckedChange={setChecked} />
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
      code={`<Switch label="Auto-sync photos" description="..." reverse />`}
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
      code={`<Switch label="Marketing emails" description="..." card />
<Switch label="Security alerts" description="..." card reverse />`}
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

export function SwitchColorPreview() {
  const [green, setGreen] = useState(true)
  const [blue, setBlue] = useState(false)
  const [orange, setOrange] = useState(true)
  return (
    <InlinePreview
      code={`<Switch color="var(--color-green-500)" label="Green" />
<Switch color="var(--color-blue-500)" label="Blue" />
<Switch color="var(--color-orange-500)" label="Orange" />`}
    >
      <div className="flex flex-col gap-4">
        <Switch color="var(--color-green-500)" label="Green" checked={green} onCheckedChange={setGreen} />
        <Switch color="var(--color-blue-500)" label="Blue" checked={blue} onCheckedChange={setBlue} />
        <Switch color="var(--color-orange-500)" label="Orange" checked={orange} onCheckedChange={setOrange} />
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
