import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputWrapperVariants = cva(
  "flex rounded-lg border border-input bg-background shadow-xs/5 ring-ring/24 text-base transition-[color,box-shadow] has-focus-visible:border-ring has-focus-visible:ring-[3px] has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 dark:bg-input/32 dark:has-aria-invalid:ring-destructive/40 sm:text-sm",
  {
    variants: {
      size: {
        default: "",
        sm: "text-sm sm:text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const inputVariants = cva(
  "w-full min-w-0 rounded-[inherit] bg-transparent outline-none placeholder:text-muted-foreground/72 file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground selection:bg-primary selection:text-primary-foreground",
  {
    variants: {
      size: {
        default:
          "h-8.5 px-[calc(--spacing(3)-1px)] leading-8.5 sm:h-7.5 sm:leading-7.5",
        sm: "h-7.5 px-[calc(--spacing(2.5)-1px)] leading-7.5 sm:h-6.5 sm:leading-6.5",
        lg: "h-9.5 px-[calc(--spacing(3.5)-1px)] leading-9.5 sm:h-8.5 sm:leading-8.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Input({
  className,
  type,
  size = "default",
  ...props
}: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputWrapperVariants>) {
  return (
    <span
      data-slot="input-wrapper"
      className={cn(inputWrapperVariants({ size }), className)}
    >
      <input
        type={type}
        data-slot="input"
        className={cn(inputVariants({ size }))}
        {...props}
      />
    </span>
  )
}

export { Input }
