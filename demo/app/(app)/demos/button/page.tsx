import { ChevronRight, Loader2, Mail, Plus } from "lucide-react"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Button } from "@/registry/new-york-v4/ui/button"

export default function ButtonDemoPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader>
        <PageHeaderHeading>Button</PageHeaderHeading>
        <PageHeaderDescription>
          Pill-shaped buttons with multiple variants and sizes.
        </PageHeaderDescription>
      </PageHeader>
      <div className="container-wrapper flex-1 pb-12">
        <div className="container max-w-4xl space-y-12">
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Variants</h2>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Sizes</h2>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">With Icons</h2>
            <div className="flex flex-wrap items-center gap-3">
              <Button>
                <Mail />
                Login with Email
              </Button>
              <Button variant="secondary">
                <Plus />
                New Item
              </Button>
              <Button variant="outline">
                Next
                <ChevronRight />
              </Button>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Icon Buttons</h2>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="icon-xs">
                <Plus />
              </Button>
              <Button size="icon-sm">
                <Plus />
              </Button>
              <Button size="icon">
                <Plus />
              </Button>
              <Button size="icon-lg">
                <Plus />
              </Button>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold">States</h2>
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Disabled</Button>
              <Button disabled variant="secondary">
                Disabled Secondary
              </Button>
              <Button disabled>
                <Loader2 className="animate-spin" />
                Loading
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
