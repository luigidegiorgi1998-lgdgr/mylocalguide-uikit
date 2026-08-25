import * as React from "react"

import { cn } from "../lib/utils"

// Matches the MyLocalGuide Input component in Figma — 44pt height,
// radius/md, bg-card (surface) not transparent. Border is always 2px
// (rather than Figma's 1px→2px on focus) to avoid a layout shift when the
// color changes; only the color moves: border/default at rest, --ring
// (status/info — a neutral blue-teal, deliberately not brand/primary since
// that warm terracotta read too close to --destructive's warm red) on
// focus, destructive on aria-invalid, bg-background (page tint) + 40%
// opacity when disabled.
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full min-w-0 rounded-md border-2 border-border bg-card px-[14px] text-body text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-[var(--ring)] disabled:pointer-events-none disabled:bg-background disabled:opacity-40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
