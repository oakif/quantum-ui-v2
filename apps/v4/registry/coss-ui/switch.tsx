"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
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
}

export { Switch }
