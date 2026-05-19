"use client"

import * as React from "react"
import { Slot } from "radix-ui"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@ui/lib/utils"

const DrawerNestedContext = React.createContext<boolean>(false)

function Drawer({
  nested,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root> & {
  nested?: boolean
}) {
  // `nested` fixes `modal=false` at mount: vaul crashes if `modal` toggles
  // at runtime. Switching `nested` causes a remount via the conditional return.
  if (nested) {
    return (
      <DrawerNestedContext.Provider value={true}>
        <DrawerPrimitive.Root data-slot="drawer" modal={false} {...props} />
      </DrawerNestedContext.Provider>
    )
  }
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
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
  return (
    <DrawerPrimitive.Close asChild>
      <div
        data-slot="drawer-overlay"
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
  // Blurs the clicked element before firing onClick. Used when a Drawer-
  // internal control opens a Dialog: if focus stays in the Drawer subtree,
  // Radix Dialog's aria-hidden on the Drawer ancestor is blocked by the
  // browser, leaving the Dialog half-initialized.
  return React.useCallback(
    (event) => {
      const target = event.currentTarget as unknown as HTMLElement
      if (typeof target.blur === "function") target.blur()
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
