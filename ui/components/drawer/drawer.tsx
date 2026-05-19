"use client"

import * as React from "react"
import { Slot } from "radix-ui"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@ui/lib/utils"

type DrawerNestedContextValue = { open: boolean }

const DrawerNestedContext = React.createContext<DrawerNestedContextValue | null>(
  null,
)

function Drawer({
  nested,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root> & {
  nested?: boolean
}) {
  // `nested` fixes `modal=false` at mount: vaul crashes if `modal` toggles
  // at runtime. Switching `nested` causes a remount via the conditional return.
  if (nested) {
    return <NestedDrawerRoot {...props} />
  }
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function NestedDrawerRoot({
  open: openProp,
  onOpenChange,
  defaultOpen = false,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? !!openProp : internalOpen

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  const ctx = React.useMemo<DrawerNestedContextValue>(
    () => ({ open }),
    [open],
  )

  return (
    <DrawerNestedContext.Provider value={ctx}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        modal={false}
        open={open}
        onOpenChange={setOpen}
        {...props}
      />
    </DrawerNestedContext.Provider>
  )
}

function DrawerTrigger({
  onClick,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  const nestedCtx = React.useContext(DrawerNestedContext)
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event)
      if (!nestedCtx) return
      // In nested mode vaul leaves focus on the trigger (modal=false → no
      // focus trap). Blur after the open click so the trigger doesn't sit
      // inside the soon-to-be aria-hidden subtree when a Dialog opens.
      const target = event.currentTarget as HTMLElement
      requestAnimationFrame(() => {
        if (typeof target.blur === "function") target.blur()
      })
    },
    [onClick, nestedCtx],
  )
  return (
    <DrawerPrimitive.Trigger
      data-slot="drawer-trigger"
      onClick={handleClick}
      {...props}
    />
  )
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn("cn-drawer-overlay", className)}
      {...props}
    />
  )
}

function DrawerNestedOverlay({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // vaul's Overlay returns null when modal=false. Render our own and route
  // clicks through DrawerPrimitive.Close so outside-click still dismisses.
  // data-state mirrors vaul's drawer state so the fade animation runs in
  // sync with the drawer content.
  const ctx = React.useContext(DrawerNestedContext)
  return (
    <DrawerPrimitive.Close asChild>
      <div
        data-slot="drawer-overlay"
        data-state={ctx?.open ? "open" : "closed"}
        aria-hidden="true"
        className={cn("cn-drawer-overlay", className)}
        {...props}
      />
    </DrawerPrimitive.Close>
  )
}

function DrawerContent({
  className,
  children,
  excludeFromDrag,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content> & {
  excludeFromDrag?: string
}) {
  const nested = React.useContext(DrawerNestedContext)
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!excludeFromDrag || !contentRef.current) return

    const container = contentRef.current

    function applyNoDrag() {
      const elements = container.querySelectorAll(excludeFromDrag!)
      elements.forEach((el) => {
        el.setAttribute("data-vaul-no-drag", "")
      })
    }

    applyNoDrag()

    const observer = new MutationObserver(applyNoDrag)
    observer.observe(container, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [excludeFromDrag])

  return (
    <DrawerPortal>
      {nested ? <DrawerNestedOverlay /> : <DrawerOverlay />}
      <DrawerPrimitive.Content
        ref={contentRef}
        data-slot="drawer-content"
        className={cn("cn-drawer-content group/drawer-content", className)}
        {...props}
      >
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHandle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-handle"
      className={cn("cn-drawer-handle", className)}
      {...props}
    />
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("cn-drawer-header", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("cn-drawer-footer", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("cn-drawer-title", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("cn-drawer-description", className)}
      {...props}
    />
  )
}

function useDrawerAction<E extends Element = HTMLButtonElement>(
  onClick?: React.MouseEventHandler<E>,
): React.MouseEventHandler<E> {
  // Blurs whatever currently has focus (most often the Drawer's trigger,
  // since browsers don't move focus to a clicked button on click) before
  // firing onClick. If focus remains anywhere in the soon-to-be-
  // aria-hidden subtree, the browser blocks Radix Dialog's aria-hidden
  // and the Dialog opens half-initialized (focus stuck, inputs unselectable).
  return React.useCallback(
    (event) => {
      const active =
        typeof document !== "undefined"
          ? (document.activeElement as HTMLElement | null)
          : null
      if (active && typeof active.blur === "function") active.blur()
      onClick?.(event)
    },
    [onClick],
  )
}

function DrawerAction({
  asChild,
  onClick,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const handleClick = useDrawerAction(onClick)
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="drawer-action"
      type={asChild ? undefined : "button"}
      {...props}
      onClick={handleClick}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHandle,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerAction,
  useDrawerAction,
}
