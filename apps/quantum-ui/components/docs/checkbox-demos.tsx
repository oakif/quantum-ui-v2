"use client"

import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"
import { InlinePreview } from "@/components/docs/inline-preview"

export function CheckboxDemoPreview() {
  return (
    <InlinePreview
      code={`<Checkbox label="Accept terms and conditions" />`}
    >
      <Checkbox label="Accept terms and conditions" />
    </InlinePreview>
  )
}

export function CheckboxWithLabelPreview() {
  return (
    <InlinePreview
      code={`<Checkbox label="Accept terms and conditions" />
<Checkbox label="Subscribe to newsletter" />
<Checkbox label="Remember me" defaultChecked />`}
    >
      <div className="flex flex-col gap-4">
        <Checkbox label="Accept terms and conditions" />
        <Checkbox label="Subscribe to newsletter" />
        <Checkbox label="Remember me" defaultChecked />
      </div>
    </InlinePreview>
  )
}

export function CheckboxDescriptionPreview() {
  return (
    <InlinePreview
      code={`<Checkbox
  label="Accept terms and conditions"
  description="By clicking this checkbox, you agree to the terms and conditions."
  defaultChecked
/>
<Checkbox
  label="Enable notifications"
  description="You can enable or disable notifications at any time."
/>`}
    >
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
    </InlinePreview>
  )
}

export function CheckboxCardPreview() {
  return (
    <InlinePreview
      code={`<Checkbox
  label="Enable notifications"
  description="You can enable or disable notifications at any time."
  card
  defaultChecked
/>
<Checkbox
  label="Marketing emails"
  description="Receive emails about new products and features."
  card
/>`}
    >
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
      </div>
    </InlinePreview>
  )
}

export function CheckboxInvalidPreview() {
  return (
    <InlinePreview
      code={`<Checkbox label="You must accept the terms" invalid />
<Checkbox label="Required field" invalid defaultChecked />`}
    >
      <div className="flex flex-col gap-4">
        <Checkbox label="You must accept the terms" invalid />
        <Checkbox label="Required field" invalid defaultChecked />
      </div>
    </InlinePreview>
  )
}

export function CheckboxDisabledPreview() {
  return (
    <InlinePreview
      code={`<Checkbox label="Disabled unchecked" disabled />
<Checkbox label="Disabled checked" disabled defaultChecked />`}
    >
      <div className="flex flex-col gap-4">
        <Checkbox label="Disabled unchecked" disabled />
        <Checkbox label="Disabled checked" disabled defaultChecked />
      </div>
    </InlinePreview>
  )
}

export function CheckboxStandalonePreview() {
  return (
    <InlinePreview
      code={`<Checkbox />
<Checkbox defaultChecked />
<Checkbox disabled />`}
    >
      <div className="flex items-center gap-6">
        <Checkbox />
        <Checkbox defaultChecked />
        <Checkbox disabled />
      </div>
    </InlinePreview>
  )
}
