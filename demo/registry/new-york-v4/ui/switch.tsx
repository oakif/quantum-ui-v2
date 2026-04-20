"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  label,
  description,
  card,
  reverse,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default" | "lg"
  label?: string
  description?: string
  card?: boolean
  reverse?: boolean
}) {
  const switchElement = (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        size === "sm" && "h-3.5 w-6",
        size === "default" && "h-[1.15rem] w-8",
        size === "lg" && "h-6 w-11",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-background ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground",
          size === "sm" && "size-3",
          size === "default" && "size-4",
          size === "lg" && "size-5",
        )}
      />
    </SwitchPrimitive.Root>
  )

  if (!label) return switchElement

  const hasDescription = !!description

  const textContent = (
    <div className="grid gap-1">
      <span className="text-sm font-medium leading-none">{label}</span>
      {description && (
        <span className="text-sm text-muted-foreground">{description}</span>
      )}
    </div>
  )

  const switchWrapper = (
    <div className={cn(hasDescription && "pt-0.5")}>
      {switchElement}
    </div>
  )

  return (
    <label
      data-slot="switch-field"
      className={cn(
        "group/switch-field flex gap-3 select-none",
        hasDescription ? "items-start" : "items-center",
        reverse && "justify-between",
        card && "rounded-lg border-[1.5px] p-3 transition-[background-color,border-color] duration-500 ease hover:bg-accent/30 has-[[data-state=checked]]:border-primary/30 has-[[data-state=checked]]:bg-primary/3 dark:has-[[data-state=checked]]:bg-primary/5",
        props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
      )}
    >
      {reverse ? (
        <>
          {textContent}
          {switchWrapper}
        </>
      ) : (
        <>
          {switchWrapper}
          {textContent}
        </>
      )}
    </label>
  )
}

export { Switch }
