import { Check, X, Upload, Pencil, Folder, Image } from "lucide-react"

import { Badge } from "@/registry/new-york-v4/ui/badge"
import { InlinePreview } from "@/components/docs/inline-preview"

export function BadgeDemoPreview() {
  return (
    <InlinePreview
      code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
      </div>
    </InlinePreview>
  )
}

export function BadgeToneSolidPreview() {
  return (
    <InlinePreview
      code={`<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
      </div>
    </InlinePreview>
  )
}

export function BadgeToneLightPreview() {
  return (
    <InlinePreview
      code={`<Badge variant="success-light">Success</Badge>
<Badge variant="warning-light">Warning</Badge>
<Badge variant="info-light">Info</Badge>
<Badge variant="destructive-light">Destructive</Badge>`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="success-light">Success</Badge>
        <Badge variant="warning-light">Warning</Badge>
        <Badge variant="info-light">Info</Badge>
        <Badge variant="destructive-light">Destructive</Badge>
      </div>
    </InlinePreview>
  )
}

export function BadgeToneOutlinePreview() {
  return (
    <InlinePreview
      code={`<Badge variant="success-outline">Success</Badge>
<Badge variant="warning-outline">Warning</Badge>
<Badge variant="info-outline">Info</Badge>
<Badge variant="destructive-outline">Destructive</Badge>`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="success-outline">Success</Badge>
        <Badge variant="warning-outline">Warning</Badge>
        <Badge variant="info-outline">Info</Badge>
        <Badge variant="destructive-outline">Destructive</Badge>
      </div>
    </InlinePreview>
  )
}

export function BadgeWithIconsPreview() {
  return (
    <InlinePreview
      code={`<Badge variant="default"><Upload /> 42 uploads</Badge>
<Badge variant="success-light"><Check /> 3 events</Badge>
<Badge variant="destructive-light"><X /> 14 skipped</Badge>
<Badge variant="secondary"><Pencil /> 8 renamed</Badge>`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="default"><Upload className="size-3" /> 42 uploads</Badge>
        <Badge variant="success-light"><Check className="size-3" /> 3 events</Badge>
        <Badge variant="destructive-light"><X className="size-3" /> 14 skipped</Badge>
        <Badge variant="secondary"><Pencil className="size-3" /> 8 renamed</Badge>
        <Badge variant="info-light"><Image className="size-3" /> 128 photos</Badge>
        <Badge variant="warning-light"><Folder className="size-3" /> 2 conflicts</Badge>
      </div>
    </InlinePreview>
  )
}
