"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  label,
  description,
  card,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  label?: string
  description?: string
  card?: boolean
}) {
  const switchElement = (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex shrink-0 items-center [--thumb-size:--spacing(5)] sm:[--thumb-size:--spacing(4)] h-[calc(var(--thumb-size)+2px)] w-[calc(var(--thumb-size)*2-2px)] rounded-full p-px transition-[background-color,box-shadow] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-64 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block aspect-square h-full rounded-(--thumb-size) bg-background shadow-sm/5 data-[state=checked]:translate-x-[calc(var(--thumb-size)-4px)] data-[state=unchecked]:translate-x-0 [transition:translate_.15s,border-radius_.15s,scale_.1s_.1s,transform-origin_.15s]"
      />
    </SwitchPrimitive.Root>
  )

  if (!label) return switchElement

  const hasDescription = !!description

  return (
    <label
      data-slot="switch-field"
      className={cn(
        "group/switch-field flex gap-3 select-none",
        hasDescription ? "items-start" : "items-center",
        card && "rounded-lg border-[1.5px] p-3 transition-[background-color,border-color] duration-500 ease hover:bg-accent/30 has-[[data-state=checked]]:border-primary/30 has-[[data-state=checked]]:bg-primary/3 dark:has-[[data-state=checked]]:bg-primary/5",
        props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
      )}
    >
      <div className={cn(hasDescription && "pt-0.5")}>
        {switchElement}
      </div>
      <div className="grid gap-1">
        <span className="text-sm font-medium leading-none">{label}</span>
        {description && (
          <span className="text-sm text-muted-foreground">{description}</span>
        )}
      </div>
    </label>
  )
}

export { Switch }
