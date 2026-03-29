import { Plus } from "lucide-react"

import { Button } from "@/registry/new-york-v4/ui/button"

export default function ButtonIcons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="icon-xs" aria-label="Add">
        <Plus />
      </Button>
      <Button size="icon-sm" aria-label="Add">
        <Plus />
      </Button>
      <Button size="icon" aria-label="Add">
        <Plus />
      </Button>
      <Button size="icon-lg" aria-label="Add">
        <Plus />
      </Button>
    </div>
  )
}
