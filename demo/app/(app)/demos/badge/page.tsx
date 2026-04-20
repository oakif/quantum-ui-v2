import { Check, X, Upload, Pencil, Folder, Image } from "lucide-react"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Badge } from "@/registry/new-york-v4/ui/badge"

export default function BadgeDemoPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader>
        <PageHeaderHeading>Badge</PageHeaderHeading>
        <PageHeaderDescription>
          Inline status indicators with semantic tone variants.
        </PageHeaderDescription>
      </PageHeader>
      <div className="container-wrapper flex-1 pb-12">
        <div className="container max-w-4xl space-y-12">
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Standard variants</h2>
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="ghost">Ghost</Badge>
              <Badge variant="link">Link</Badge>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Tone variants (solid)</h2>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Tone variants (light)</h2>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="success-light">Success</Badge>
              <Badge variant="warning-light">Warning</Badge>
              <Badge variant="info-light">Info</Badge>
              <Badge variant="destructive-light">Destructive</Badge>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Tone variants (outline)</h2>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="success-outline">Success</Badge>
              <Badge variant="warning-outline">Warning</Badge>
              <Badge variant="info-outline">Info</Badge>
              <Badge variant="destructive-outline">Destructive</Badge>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">With icons</h2>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="default"><Upload className="size-3" /> 42 uploads</Badge>
              <Badge variant="success-light"><Check className="size-3" /> 3 events</Badge>
              <Badge variant="destructive-light"><X className="size-3" /> 14 skipped</Badge>
              <Badge variant="secondary"><Pencil className="size-3" /> 8 renamed</Badge>
              <Badge variant="info-light"><Image className="size-3" /> 128 photos</Badge>
              <Badge variant="warning-light"><Folder className="size-3" /> 2 conflicts</Badge>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">SummaryStrip replacement</h2>
            <p className="text-sm text-muted-foreground">
              Horizontal row of stat badges, replacing the old inline-styled SummaryStrip component.
            </p>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="default"><Upload className="size-3" /> 42 uploads</Badge>
              <Badge variant="success-light"><Check className="size-3" /> 3 events</Badge>
              <Badge variant="destructive-light"><X className="size-3" /> 14 skipped</Badge>
              <Badge variant="secondary"><Pencil className="size-3" /> 8 renamed</Badge>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
