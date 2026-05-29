"use client"

import * as React from "react"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"

import { cn } from "@ui/lib/utils"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn("cn-dropdown-menu-content", className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

// `useTouchActive` provides the touch tap feedback that CSS `:active` alone
// can't reliably deliver: on touch, `:active` is gone within a frame so brief
// taps show no highlight. This sets a `data-active=""` attribute on
// pointerdown for non-mouse pointers, and clears it 200ms after pointerup so
// the highlight stays visible long enough to be perceived. Mouse pointers
// rely on Radix's own `data-highlighted` (covered in CSS via the same rule).
function useTouchActive() {
  const [active, setActive] = React.useState(false)
  const clearRef = React.useRef<number | null>(null)
  React.useEffect(
    () => () => {
      if (clearRef.current !== null) window.clearTimeout(clearRef.current)
    },
    []
  )
  const onPointerDown = React.useCallback((event: React.PointerEvent) => {
    if (event.pointerType === "mouse") return
    if (clearRef.current !== null) window.clearTimeout(clearRef.current)
    setActive(true)
  }, [])
  const onPointerUp = React.useCallback((event: React.PointerEvent) => {
    if (event.pointerType === "mouse") return
    clearRef.current = window.setTimeout(() => {
      setActive(false)
      clearRef.current = null
    }, 200)
  }, [])
  const onPointerCancel = React.useCallback(() => {
    if (clearRef.current !== null) window.clearTimeout(clearRef.current)
    setActive(false)
  }, [])
  return { active, onPointerDown, onPointerUp, onPointerCancel }
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  const touch = useTouchActive()
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      data-active={touch.active ? "" : undefined}
      onPointerDown={(e) => {
        touch.onPointerDown(e)
        onPointerDown?.(e)
      }}
      onPointerUp={(e) => {
        touch.onPointerUp(e)
        onPointerUp?.(e)
      }}
      onPointerCancel={(e) => {
        touch.onPointerCancel()
        onPointerCancel?.(e)
      }}
      className={cn("cn-dropdown-menu-item", className)}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  const touch = useTouchActive()
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-active={touch.active ? "" : undefined}
      onPointerDown={(e) => {
        touch.onPointerDown(e)
        onPointerDown?.(e)
      }}
      onPointerUp={(e) => {
        touch.onPointerUp(e)
        onPointerUp?.(e)
      }}
      onPointerCancel={(e) => {
        touch.onPointerCancel()
        onPointerCancel?.(e)
      }}
      className={cn("cn-dropdown-menu-checkbox-item", className)}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  const touch = useTouchActive()
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-active={touch.active ? "" : undefined}
      onPointerDown={(e) => {
        touch.onPointerDown(e)
        onPointerDown?.(e)
      }}
      onPointerUp={(e) => {
        touch.onPointerUp(e)
        onPointerUp?.(e)
      }}
      onPointerCancel={(e) => {
        touch.onPointerCancel()
        onPointerCancel?.(e)
      }}
      className={cn("cn-dropdown-menu-radio-item", className)}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn("cn-dropdown-menu-label", className)}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("cn-dropdown-menu-separator", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("cn-dropdown-menu-shortcut", className)}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  const touch = useTouchActive()
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      data-active={touch.active ? "" : undefined}
      onPointerDown={(e) => {
        touch.onPointerDown(e)
        onPointerDown?.(e)
      }}
      onPointerUp={(e) => {
        touch.onPointerUp(e)
        onPointerUp?.(e)
      }}
      onPointerCancel={(e) => {
        touch.onPointerCancel()
        onPointerCancel?.(e)
      }}
      className={cn("cn-dropdown-menu-sub-trigger", className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn("cn-dropdown-menu-sub-content", className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
