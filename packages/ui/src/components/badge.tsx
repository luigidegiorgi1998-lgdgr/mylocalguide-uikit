import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "../lib/utils"

// Matches the MyLocalGuide Badge component in Figma — 7 variants
// (Default/Secondary/Outline + the 4 status colors), pill shape
// (radius/full), Type/Label text style, optional leading dot indicator.
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-full px-2.5 py-1 text-label font-semibold whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-border bg-background text-foreground",
        success: "bg-status-success-bg text-status-success-text",
        warning: "bg-status-warning-bg text-status-warning-text",
        error: "bg-status-error-bg text-status-error-text",
        info: "bg-status-info-bg text-status-info-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Dot color per variant — the -500 primitive, not the -text token, so it
// pops slightly against the lighter badge background (matches Figma).
const dotColorByVariant: Record<string, string> = {
  default: "bg-primary-foreground",
  secondary: "bg-primary-700",
  outline: "bg-foreground",
  success: "bg-status-success",
  warning: "bg-status-warning",
  error: "bg-status-error",
  info: "bg-status-info",
}

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
  /** Optional 6px leading dot indicator, off by default. */
  showDot?: boolean
}

function Badge({
  className,
  variant = "default",
  showDot = false,
  asChild = false,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {showDot && (
        <span
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            dotColorByVariant[variant ?? "default"]
          )}
        />
      )}
      {children}
    </Comp>
  )
}

export { Badge, badgeVariants }
