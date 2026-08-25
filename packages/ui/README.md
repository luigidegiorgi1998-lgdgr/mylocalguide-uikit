# @mylocalguide/ui

The MyLocalGuide design system — components and design tokens, generated from the [Figma UI Kit](https://www.figma.com/design/yvnr7C4zQHzl3Jcs3pmv2q/MyLocalGuide---UI-KIT). This is the single source of truth for the app's visual language in code; **`web/` (the demo/consuming app) should never redefine tokens or components — it imports them from here.**

## Structure

- `src/styles/tokens.css` — all design tokens (colors, typography, radius, spacing/opacity/icon references), as a Tailwind v4 `@theme` + `:root` block. Light mode only (dark mode was deliberately deferred in Figma).
- `src/components/` — Button, Badge, Input, Label, InputField. Each restyled from shadcn/ui to match the Figma components exactly (not the generic shadcn defaults).
- `src/foundations/` — Storybook-only documentation stories for the color and typography scales (no exported components, just docs).
- `src/index.ts` — the package's public API. Only what's exported here is meant to be consumed from outside.

## Scripts

```bash
npm run build        # tsup (JS/types) + Tailwind CLI (styles.css)
npm run dev           # Storybook dev server, localhost:6006
npm run storybook:build   # static Storybook build → storybook-static/
npm run lint
```

## Consuming this package

```ts
import { Button, Badge, InputField } from "@mylocalguide/ui";
```

```css
/* In the consuming app's global stylesheet, BEFORE any Tailwind utilities
   that reference these tokens are used. Import the SOURCE (tokens.css),
   not the pre-compiled styles.css, if the consumer runs its own Tailwind
   build — it needs the raw @theme directives to generate its own
   utilities from. styles.css (pre-compiled) is for non-Tailwind
   consumers only. */
@import "@mylocalguide/ui/tokens.css";

/* Tailwind v4 skips node_modules during content auto-detection by
   default — add this so it also scans this package's component source
   for class names (bg-primary, text-h1, etc.), even though it's only
   reached via the workspace symlink. */
@source "<path-to-this-package>/src/**/*.{ts,tsx}";
```

## Keeping this in sync with Figma

When tokens or components change in Figma:
1. Pull the current values directly from Figma via the Figma MCP (`use_figma`) — don't trust old notes, some tokens (e.g. state colors, the Input focus color) have been re-aliased more than once.
2. Update `src/styles/tokens.css` and the relevant `src/components/*.tsx` file.
3. Run `npm run build` here, then verify in Storybook (`npm run dev`) and in `web/`.
