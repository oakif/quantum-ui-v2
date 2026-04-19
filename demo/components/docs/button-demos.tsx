import { ArrowUpIcon, CircleFadingArrowUpIcon, Loader2 } from "lucide-react"
import { IconGitBranch } from "@tabler/icons-react"

import { Button } from "@/registry/new-york-v4/ui/button"
import { InlinePreview } from "@/components/docs/inline-preview"

export function ButtonDemoPreview() {
  return (
    <InlinePreview
      code={`<Button variant="outline">Button</Button>
<Button variant="outline" size="icon">
  <ArrowUpIcon />
</Button>`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline">Button</Button>
        <Button variant="outline" size="icon" aria-label="Submit">
          <ArrowUpIcon />
        </Button>
      </div>
    </InlinePreview>
  )
}

export function ButtonVariantsPreview() {
  return (
    <InlinePreview
      code={`<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
    </InlinePreview>
  )
}

export function ButtonSizesPreview() {
  return (
    <InlinePreview
      code={`<Button variant="outline" size="xs">Extra Small</Button>
<Button variant="outline" size="sm">Small</Button>
<Button variant="outline">Default</Button>
<Button variant="outline" size="lg">Large</Button>`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" size="xs">Extra Small</Button>
        <Button variant="outline" size="sm">Small</Button>
        <Button variant="outline">Default</Button>
        <Button variant="outline" size="lg">Large</Button>
      </div>
    </InlinePreview>
  )
}

export function ButtonIconsPreview() {
  return (
    <InlinePreview
      code={`<Button variant="outline" size="icon-xs"><CircleFadingArrowUpIcon /></Button>
<Button variant="outline" size="icon-sm"><CircleFadingArrowUpIcon /></Button>
<Button variant="outline" size="icon"><CircleFadingArrowUpIcon /></Button>
<Button variant="outline" size="icon-lg"><CircleFadingArrowUpIcon /></Button>`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" size="icon-xs" aria-label="Upload"><CircleFadingArrowUpIcon /></Button>
        <Button variant="outline" size="icon-sm" aria-label="Upload"><CircleFadingArrowUpIcon /></Button>
        <Button variant="outline" size="icon" aria-label="Upload"><CircleFadingArrowUpIcon /></Button>
        <Button variant="outline" size="icon-lg" aria-label="Upload"><CircleFadingArrowUpIcon /></Button>
      </div>
    </InlinePreview>
  )
}

export function ButtonWithIconsPreview() {
  return (
    <InlinePreview
      code={`<Button variant="outline" size="sm">
  <IconGitBranch /> New Branch
</Button>`}
    >
      <Button variant="outline" size="sm">
        <IconGitBranch /> New Branch
      </Button>
    </InlinePreview>
  )
}

export function ButtonLoadingPreview() {
  return (
    <InlinePreview
      code={`<Button disabled>
  <Loader2 className="animate-spin" />
  Please wait
</Button>
<Button variant="secondary" disabled>
  <Loader2 className="animate-spin" />
  Saving
</Button>`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Button disabled><Loader2 className="animate-spin" /> Please wait</Button>
        <Button variant="secondary" disabled><Loader2 className="animate-spin" /> Saving</Button>
      </div>
    </InlinePreview>
  )
}

export function ButtonAsChildPreview() {
  return (
    <InlinePreview
      code={`<Button asChild>
  <a>Go to Dashboard</a>
</Button>
<Button variant="outline" asChild>
  <a>View Docs</a>
</Button>`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild><a>Go to Dashboard</a></Button>
        <Button variant="outline" asChild><a>View Docs</a></Button>
      </div>
    </InlinePreview>
  )
}
