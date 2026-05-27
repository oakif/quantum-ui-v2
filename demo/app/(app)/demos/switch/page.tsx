import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Switch } from "@/registry/new-york-v4/ui/switch"

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

export default function SwitchDemoPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader>
        <PageHeaderHeading>Switch</PageHeaderHeading>
        <PageHeaderDescription>
          A toggle control for on/off states with label, description, color, and card variants.
        </PageHeaderDescription>
      </PageHeader>
      <div className="container-wrapper flex-1 pb-12">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <DemoCard title="Basic switch.">
              <div className="flex items-center gap-6">
                <Switch />
                <Switch defaultChecked />
              </div>
            </DemoCard>

            <DemoCard title="Switch with label.">
              <div className="flex flex-col gap-4">
                <Switch label="Airplane Mode" />
                <Switch label="Dark Mode" defaultChecked />
              </div>
            </DemoCard>

            <DemoCard title="Switch with description.">
              <div className="w-full max-w-xs px-4">
                <Switch
                  label="Share across devices"
                  description="Focus is shared across devices, and turns off when you leave the app."
                  defaultChecked
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
                <Switch size="sm" label="Small" defaultChecked />
                <Switch size="default" label="Default" defaultChecked />
                <Switch size="lg" label="Large" defaultChecked />
              </div>
            </DemoCard>

            <DemoCard title="Colored switches.">
              <div className="flex flex-col gap-4">
                <Switch color="var(--color-blue-500)" label="Blue" defaultChecked />
                <Switch color="var(--color-green-500)" label="Green" defaultChecked />
                <Switch color="var(--color-orange-500)" label="Orange" defaultChecked />
              </div>
            </DemoCard>

            <DemoCard title="Notification settings.">
              <div className="flex w-full max-w-xs flex-col gap-3 px-4">
                <Switch
                  label="Push notifications"
                  reverse
                  defaultChecked
                />
                <Switch
                  label="Email notifications"
                  reverse
                />
                <Switch
                  label="SMS notifications"
                  reverse
                />
              </div>
            </DemoCard>

            <DemoCard title="Settings panel with cards.">
              <div className="flex w-full max-w-xs flex-col gap-3 px-4">
                <Switch
                  label="Marketing emails"
                  description="New products and promotions."
                  card
                  defaultChecked
                />
                <Switch
                  label="Security alerts"
                  description="Unusual account activity."
                  card
                  reverse
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
                  defaultChecked
                />
              </div>
            </DemoCard>

            <DemoCard title="Compact settings with small switches.">
              <div className="flex w-full max-w-xs flex-col px-4">
                <div className="flex items-center justify-between border-b py-2.5">
                  <span className="text-sm">Auto-save</span>
                  <Switch size="sm" defaultChecked />
                </div>
                <div className="flex items-center justify-between border-b py-2.5">
                  <span className="text-sm">Spell check</span>
                  <Switch size="sm" defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-sm">Line numbers</span>
                  <Switch size="sm" />
                </div>
              </div>
            </DemoCard>

          </div>
        </div>
      </div>
    </div>
  )
}
