import { type Metadata } from "next"

import { getAllBlockIds } from "@/lib/blocks"
import { registryCategories } from "@/lib/categories"
import { siteConfig } from "@/lib/config"
import { absoluteUrl } from "@/lib/utils"
import { type BlockGroup } from "@/app/(app)/studio/components/block-selector"
import { Customizer } from "@/app/(app)/studio/components/customizer"
import { PresetHandler } from "@/app/(app)/studio/components/preset-handler"
import { Preview } from "@/app/(app)/studio/components/preview"
import { WelcomeDialog } from "@/app/(app)/studio/components/welcome-dialog"
import { getAllItems } from "@/app/(app)/studio/lib/api"

export const metadata: Metadata = {
  title: "New Project",
  description:
    "Customize everything. Pick your component library, icons, base color, theme, fonts and create your own version of shadcn/ui.",
  openGraph: {
    title: "New Project",
    description:
      "Customize everything. Pick your component library, icons, base color, theme, fonts and create your own version of shadcn/ui.",
    type: "website",
    url: absoluteUrl("/studio"),
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Project",
    description:
      "Customize everything. Pick your component library, icons, base color, theme, fonts and create your own version of shadcn/ui.",
    images: [siteConfig.ogImage],
    creator: "@shadcn",
  },
}

const EXAMPLE_BLOCKS = [
  { name: "Dashboard", id: "dashboard-01" },
  { name: "Tasks", id: "tasks" },
  { name: "Playground", id: "playground" },
  { name: "Authentication", id: "authentication" },
]

async function getBlockGroups(): Promise<BlockGroup[]> {
  const groups: BlockGroup[] = []

  for (const category of registryCategories) {
    const blockIds = await getAllBlockIds(["registry:block"], [category.slug])
    if (blockIds.length > 0) {
      groups.push({
        name: category.name,
        blocks: blockIds.map((id) => ({
          name: id,
          id,
        })),
      })
    }
  }

  groups.push({
    name: "Examples",
    blocks: EXAMPLE_BLOCKS,
  })

  return groups
}

export default async function CreatePage() {
  const [itemsByBase, blockGroups] = await Promise.all([
    getAllItems(),
    getBlockGroups(),
  ])

  return (
    <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden section-soft [--customizer-width:--spacing(48)] [--gap:--spacing(4)] md:[--gap:--spacing(6)] 2xl:[--customizer-width:--spacing(56)]">
      <div
        data-slot="designer"
        className="flex min-h-0 flex-1 flex-col gap-(--gap) p-(--gap) pt-[calc(var(--gap)*0.25)] md:flex-row-reverse"
      >
        <Preview blockGroups={blockGroups} />
        <Customizer itemsByBase={itemsByBase} />
        <PresetHandler />
        <WelcomeDialog />
      </div>
    </div>
  )
}
