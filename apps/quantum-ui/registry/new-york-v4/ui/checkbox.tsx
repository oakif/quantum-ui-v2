"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  label,
  description,
  invalid,
  card,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  label?: string
  description?: string
  invalid?: boolean
  card?: boolean
}) {
  const checkbox = (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      aria-invalid={invalid || undefined}
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[5px] border-[1.5px] border-input shadow-xs outline-none transition-[background-color,border-color,box-shadow] duration-500 ease hover:border-foreground/40 data-[state=checked]:hover:border-primary aria-invalid:hover:border-destructive focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/30 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="absolute inset-0 flex items-center justify-center text-current animate-in fade-in-0 duration-500"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="size-3">
          <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )

  if (!label) return checkbox

  const hasDescription = !!description

  return (
    <label
      data-slot="checkbox-field"
      className={cn(
        "group/checkbox flex gap-3 select-none",
        hasDescription ? "items-start" : "items-center",
        card && "rounded-lg border-[1.5px] p-3 transition-[background-color,border-color] duration-500 ease hover:bg-accent/30 has-[[data-state=checked]]:border-primary/30 has-[[data-state=checked]]:bg-primary/3 dark:has-[[data-state=checked]]:bg-primary/5",
        props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
      )}
    >
      <div className={cn(hasDescription && "pt-0.5")}>
        {checkbox}
      </div>
      <div className="grid gap-1">
        <span className={cn("text-sm font-medium leading-none transition-colors duration-500", invalid && "text-destructive group-has-[[data-state=checked]]/checkbox:text-foreground")}>{label}</span>
        {description && (
          <span className={cn("text-sm text-muted-foreground transition-colors duration-500", invalid && "text-destructive/80 group-has-[[data-state=checked]]/checkbox:text-muted-foreground")}>{description}</span>
        )}
      </div>
    </label>
  )
}

export { Checkbox }
