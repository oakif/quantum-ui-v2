"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"

export type BlockGroup = {
  name: string
  blocks: { name: string; id: string }[]
}

export function BlockSelector({
  groups,
  onSelect,
}: {
  groups: BlockGroup[]
  onSelect: (blockId: string) => void
}) {
  const [selectedGroupIndex, setSelectedGroupIndex] = React.useState(0)
  const [selectedBlockId, setSelectedBlockId] = React.useState(
    groups[0]?.blocks[0]?.id ?? ""
  )

  const selectedGroup = groups[selectedGroupIndex]

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <select
          value={selectedGroupIndex}
          onChange={(e) => {
            const index = Number(e.target.value)
            setSelectedGroupIndex(index)
            const firstBlock = groups[index]?.blocks[0]
            if (firstBlock) {
              setSelectedBlockId(firstBlock.id)
              onSelect(firstBlock.id)
            }
          }}
          className={cn(
            "h-8 appearance-none rounded-lg border border-foreground/10 bg-transparent py-1 pr-8 pl-3 text-sm font-medium",
            "hover:bg-muted focus:outline-none focus:ring-1 focus:ring-foreground/20"
          )}
        >
          {groups.map((group, index) => (
            <option key={group.name} value={index}>
              {group.name}
            </option>
          ))}
        </select>
        <ChevronsUpDown className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-muted-foreground" />
      </div>
      <div className="relative">
        <select
          value={selectedBlockId}
          onChange={(e) => {
            setSelectedBlockId(e.target.value)
            onSelect(e.target.value)
          }}
          className={cn(
            "h-8 appearance-none rounded-lg border border-foreground/10 bg-transparent py-1 pr-8 pl-3 text-sm font-medium",
            "hover:bg-muted focus:outline-none focus:ring-1 focus:ring-foreground/20"
          )}
        >
          {selectedGroup?.blocks.map((block) => (
            <option key={block.id} value={block.id}>
              {block.name}
            </option>
          ))}
        </select>
        <ChevronsUpDown className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  )
}
