"use client"

import * as React from "react"
import { type RegistryItem } from "shadcn/schema"

import { useIsMobile } from "@/hooks/use-mobile"
import { getThemesForBaseColor } from "@/registry/config"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/styles/base-nova/ui/card"
import { FieldGroup, FieldSeparator } from "@/styles/base-nova/ui/field"
import { ActionMenu } from "@/app/(app)/studio/components/action-menu"
import { BaseColorPicker } from "@/app/(app)/studio/components/base-color-picker"
import { ChartColorPicker } from "@/app/(app)/studio/components/chart-color-picker"
import { CopyPreset } from "@/app/(app)/studio/components/copy-preset"
import { FontPicker } from "@/app/(app)/studio/components/font-picker"
import { MainMenu } from "@/app/(app)/studio/components/main-menu"
import { RadiusPicker } from "@/app/(app)/studio/components/radius-picker"
import { RandomButton } from "@/app/(app)/studio/components/random-button"
import { ResetDialog } from "@/app/(app)/studio/components/reset-button"
import { ThemePicker } from "@/app/(app)/studio/components/theme-picker"
import { FONT_HEADING_OPTIONS, FONTS } from "@/app/(app)/studio/lib/fonts"
import { useDesignSystemSearchParams } from "@/app/(app)/studio/lib/search-params"

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden px-1 pt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60 md:block">
      {children}
    </div>
  )
}

export function Customizer({
  itemsByBase,
  onNavigate,
}: {
  itemsByBase: Record<string, Pick<RegistryItem, "name" | "title" | "type">[]>
  onNavigate?: (registryName: string) => void
}) {
  const [params] = useDesignSystemSearchParams()
  const isMobile = useIsMobile()
  const anchorRef = React.useRef<HTMLDivElement | null>(null)

  const availableThemes = React.useMemo(
    () => getThemesForBaseColor(params.baseColor),
    [params.baseColor]
  )

  return (
    <Card
      className="dark top-24 right-12 isolate z-10 max-h-full min-h-0 w-full self-start rounded-2xl bg-card/90 shadow-xl backdrop-blur-xl md:w-(--customizer-width)"
      ref={anchorRef}
      size="sm"
    >
      <CardHeader className="hidden items-center justify-between gap-2 border-b group-data-reversed/layout:flex-row-reverse md:flex">
        <MainMenu />
      </CardHeader>
      <CardContent className="no-scrollbar min-h-0 flex-1 overflow-x-auto overflow-y-hidden md:overflow-y-auto">
        <FieldGroup className="flex-row gap-2.5 py-px **:data-[slot=field-separator]:-mx-4 **:data-[slot=field-separator]:w-auto md:flex-col md:gap-3.25">
          <SectionLabel>Color</SectionLabel>
          <BaseColorPicker
            isMobile={isMobile}
            anchorRef={anchorRef}
            label="Tint"
          />
          <ThemePicker
            themes={availableThemes}
            isMobile={isMobile}
            anchorRef={anchorRef}
          />
          <ChartColorPicker isMobile={isMobile} anchorRef={anchorRef} />
          <FieldSeparator className="hidden md:block" />
          <SectionLabel>Font</SectionLabel>
          <FontPicker
            label="Heading"
            param="fontHeading"
            fonts={FONT_HEADING_OPTIONS}
            isMobile={isMobile}
            anchorRef={anchorRef}
          />
          <FontPicker
            label="Body"
            param="font"
            fonts={FONTS}
            isMobile={isMobile}
            anchorRef={anchorRef}
          />
          <FieldSeparator className="hidden md:block" />
          <RadiusPicker isMobile={isMobile} anchorRef={anchorRef} />
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex min-w-0 gap-2 md:flex-col md:**:[button,a]:w-full">
        <CopyPreset className="flex-1 md:flex-none" />
        <RandomButton className="flex-1 md:flex-none" />
        <ActionMenu itemsByBase={itemsByBase} onNavigate={onNavigate} />
        <ResetDialog />
      </CardFooter>
    </Card>
  )
}
