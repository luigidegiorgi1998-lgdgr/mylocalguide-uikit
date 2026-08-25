import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "../lib/utils"

// Matches the MyLocalGuide Button component in Figma exactly — 6 variants
// (Primary/Secondary/Outline/Ghost/Link/Destructive) x 3 sizes (Small 36pt
// / Default 44pt / Large 52pt), radius/lg throughout, hover = 90% paint
// opacity on filled variants (matches Figma's paint-opacity technique),
// leading/trailing icon slots.
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-button font-semibold whitespace-nowrap transition-colors outline-none select-none disabled:pointer-events-none disabled:opacity-40 focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-border bg-background text-foreground hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
        link: "text-brand-accent underline-offset-4 hover:underline",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-9 px-4 text-[0.875rem] has-[>svg]:px-3",
        default: "h-11 px-6",
        lg: "h-13 px-8",
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-lg": "size-13",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /** Optional icon rendered before the label. No icon library is wired
   * in yet — pass any SVG/ReactNode (e.g. from lucide-react once adopted). */
  leadingIcon?: React.ReactNode
  /** Optional icon rendered after the label (e.g. a "forward" chevron
   * for actions that leave the current context). */
  trailingIcon?: React.ReactNode
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  leadingIcon,
  trailingIcon,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </Comp>
  )
}

export { Button, buttonVariants }
