"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@ui/lib/utils"

function Switch({
  className,
  style,
  size = "default",
  color,
  label,
  description,
  card,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
  color?: string
  label?: string
  description?: string
  card?: boolean
}) {
  const switchElement = (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "cn-switch peer group/switch relative inline-flex items-center transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      style={color ? { "--switch-bg": color, ...style } as React.CSSProperties : style}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="cn-switch-thumb pointer-events-none block ring-0 transition-transform"
      />
    </SwitchPrimitive.Root>
  )

  if (!label) return switchElement

  const hasDescription = !!description

  return (
    <label
      data-slot="switch-field"
      className={cn(
        "cn-switch-field",
        hasDescription ? "items-start" : "items-center",
        card && "cn-switch-field-card",
        props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
      )}
    >
      <div className={cn(hasDescription && "pt-0.5")}>
        {switchElement}
      </div>
      <div className="grid gap-1">
        <span className="cn-switch-label">{label}</span>
        {description && (
          <span className="cn-switch-description">{description}</span>
        )}
      </div>
    </label>
  )
}

export { Switch }
