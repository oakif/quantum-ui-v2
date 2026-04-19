"use client"

import * as React from "react"
import { Menu09Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"
import { type Button } from "@/styles/base-nova/ui/button"
import {
  Picker,
  PickerContent,
  PickerGroup,
  PickerItem,
  PickerSeparator,
  PickerShortcut,
  PickerTrigger,
} from "@/app/(app)/studio/components/picker"
import { useActionMenuTrigger } from "@/app/(app)/studio/hooks/use-action-menu"
import { useHistory } from "@/app/(app)/studio/hooks/use-history"
import { useReset } from "@/app/(app)/studio/hooks/use-reset"
import { usePreviewTheme } from "@/app/(app)/studio/hooks/use-preview-theme"

const APPLE_PLATFORM_REGEX = /Mac|iPhone|iPad|iPod/

export function MainMenu({ className }: React.ComponentProps<typeof Button>) {
  const [isMac, setIsMac] = React.useState(false)
  const { canGoBack, canGoForward, goBack, goForward } = useHistory()
  const { openActionMenu } = useActionMenuTrigger()
  const { setShowResetDialog } = useReset()
  const { previewTheme, setPreviewTheme } = usePreviewTheme()

  React.useEffect(() => {
    const platform = navigator.platform
    const userAgent = navigator.userAgent
    setIsMac(APPLE_PLATFORM_REGEX.test(platform || userAgent))
  }, [])

  return (
    <React.Fragment>
      <Picker>
        <PickerTrigger
          className={cn(
            "flex items-center justify-between gap-2 rounded-lg px-1.75 ring-1 ring-foreground/10 focus-visible:ring-1",
            className
          )}
        >
          <span className="font-medium">Menu</span>
          <HugeiconsIcon icon={Menu09Icon} strokeWidth={2} className="size-5" />
        </PickerTrigger>
        <PickerContent side="right" align="start" alignOffset={-8}>
          <PickerGroup>
            <PickerItem onClick={openActionMenu}>
              Navigate...
              <PickerShortcut>{isMac ? "⌘P" : "Ctrl+P"}</PickerShortcut>
            </PickerItem>
          </PickerGroup>
          <PickerSeparator />
          <PickerGroup>
            <PickerItem
              onClick={() => setPreviewTheme("inherit")}
              data-checked={previewTheme === "inherit"}
            >
              Inherit Theme
            </PickerItem>
            <PickerItem
              onClick={() => setPreviewTheme("light")}
              data-checked={previewTheme === "light"}
            >
              Light Preview
            </PickerItem>
            <PickerItem
              onClick={() => setPreviewTheme("dark")}
              data-checked={previewTheme === "dark"}
            >
              Dark Preview
            </PickerItem>
          </PickerGroup>
          <PickerSeparator />
          <PickerGroup>
            <PickerItem onClick={goBack} disabled={!canGoBack}>
              Undo <PickerShortcut>{isMac ? "⌘Z" : "Ctrl+Z"}</PickerShortcut>
            </PickerItem>
            <PickerItem onClick={goForward} disabled={!canGoForward}>
              Redo{" "}
              <PickerShortcut>{isMac ? "⇧⌘Z" : "Ctrl+Shift+Z"}</PickerShortcut>
            </PickerItem>
            <PickerSeparator />
            <PickerItem onClick={() => setShowResetDialog(true)}>
              Reset <PickerShortcut>⇧R</PickerShortcut>
            </PickerItem>
          </PickerGroup>
        </PickerContent>
      </Picker>
    </React.Fragment>
  )
}
