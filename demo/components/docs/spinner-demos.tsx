import { Spinner } from "@/registry/new-york-v4/ui/spinner"
import { InlinePreview } from "@/components/docs/inline-preview"

export function SpinnerDemoPreview() {
  return (
    <InlinePreview
      code={`<Spinner />`}
    >
      <Spinner />
    </InlinePreview>
  )
}

export function SpinnerSizesPreview() {
  return (
    <InlinePreview
      code={`<Spinner className="size-4" />
<Spinner className="size-6" />
<Spinner className="size-8" />`}
    >
      <div className="flex items-center gap-4">
        <Spinner className="size-4" />
        <Spinner className="size-6" />
        <Spinner className="size-8" />
      </div>
    </InlinePreview>
  )
}
