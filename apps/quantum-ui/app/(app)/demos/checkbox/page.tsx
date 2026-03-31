import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"

export default function CheckboxDemoPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader>
        <PageHeaderHeading>Checkbox</PageHeaderHeading>
        <PageHeaderDescription>
          A control that allows the user to toggle between checked and unchecked.
        </PageHeaderDescription>
      </PageHeader>
      <div className="container-wrapper flex-1 pb-12">
        <div className="container max-w-4xl space-y-12">
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">With Label</h2>
            <div className="flex flex-col gap-4">
              <Checkbox label="Accept terms and conditions" />
              <Checkbox label="Subscribe to newsletter" />
              <Checkbox label="Remember me" defaultChecked />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">With Description</h2>
            <div className="flex flex-col gap-4">
              <Checkbox
                label="Accept terms and conditions"
                description="By clicking this checkbox, you agree to the terms and conditions."
                defaultChecked
              />
              <Checkbox
                label="Enable notifications"
                description="You can enable or disable notifications at any time."
              />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Card</h2>
            <div className="flex flex-col gap-3">
              <Checkbox
                label="Enable notifications"
                description="You can enable or disable notifications at any time."
                card
                defaultChecked
              />
              <Checkbox
                label="Marketing emails"
                description="Receive emails about new products and features."
                card
              />
              <Checkbox
                label="Security alerts"
                description="Get notified about security updates."
                card
              />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Invalid</h2>
            <div className="flex flex-col gap-4">
              <Checkbox label="You must accept the terms" invalid />
              <Checkbox label="Required field" invalid defaultChecked />
              <Checkbox
                label="Accept terms"
                description="You must accept before continuing."
                invalid
              />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Disabled</h2>
            <div className="flex flex-col gap-4">
              <Checkbox label="Disabled unchecked" disabled />
              <Checkbox label="Disabled checked" disabled defaultChecked />
              <Checkbox
                label="Disabled with description"
                description="This option is currently unavailable."
                disabled
                card
              />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Standalone</h2>
            <div className="flex items-center gap-6">
              <Checkbox />
              <Checkbox defaultChecked />
              <Checkbox disabled />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
