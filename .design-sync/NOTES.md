# design-sync notes — @mylocalguide/ui

## Repo shape

- Monorepo: npm workspaces at `/Users/x/Desktop/MyLocalGuide` (`workspaces: ["web", "packages/*"]`). The design system is `packages/ui`.
- Git repo root is the monorepo root (`/Users/x/Desktop/MyLocalGuide`), not `web/` or `packages/ui/`. `web/` originally had its own standalone `.git` (one commit, from `create-next-app`) which was folded into the monorepo repo on 2026-08-25 as a prerequisite for this sync — the skill anchors `.design-sync/` and `sb-reference/` at the git root.
- npm workspaces hoist `react`/`react-dom` to the repo root — `packages/ui/node_modules` is sparse. Build/converter commands must pass `--node-modules /Users/x/Desktop/MyLocalGuide/node_modules`, not the package's own `node_modules`.

## Environment

- This machine is on macOS 12 (Darwin 21.6.0, "mac12") — `npx playwright install chromium` fails outright ("Playwright does not support chromium on mac12"). Workaround: point Playwright at the system-installed Google Chrome via `DS_CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`. Confirmed working (launches, navigates, screenshots) — use this for every compare/capture run on this machine.

## [GENERAL] Font — Inter was not shipped by the design system itself

Found during the first sync: `packages/ui` declared no `font-family` anywhere in its own CSS/tokens. The `web` app applies Inter only via its own `next/font/google` setup (`layout.tsx` → `--font-sans` → Tailwind `font-sans`), and Storybook's `preview.tsx` decorator set it via an inline style — neither of which the compiled DS bundle carries. This is invisible to the compare oracle (both sides would fall back to the same default font and look like a "match").

Fixed at the source, with the user's explicit sign-off (not worked around in sync config only):
- Self-hosted the actual Inter variable font (Google Fonts, latin subset, weights 400/500/600/700 — matches what `web/layout.tsx` loads) at `packages/ui/src/fonts/inter-variable-latin.woff2`.
- `tokens.css` now declares `@font-face` for it and sets `--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;` plus `body { font-family: var(--font-sans); }`. The `web` app's own `next/font` setup still wins there (higher-specificity `--font-sans` set on `<html>`) — this only makes the package correct when nothing overrides it, e.g. standalone in Claude Design.
- `@tailwindcss/cli` copies `url()` references in compiled CSS verbatim, and `dist/` sits one directory shallower than `src/styles/` relative to the package root, so the same `../fonts/…` reference that's correct for source consumption breaks once compiled. Added `packages/ui/scripts/fix-css-font-paths.mjs`, run as a `build:css` postbuild step, which copies `src/fonts` → `dist/fonts` and rewrites `url(../fonts/` → `url(./fonts/` in `dist/styles.css`. **Re-sync risk**: if this script is ever removed or the build script reordered, `dist/styles.css`'s font URL silently points at a nonexistent path — nothing errors, the font just silently fails to load (fonts degrade the same way `[FONT_MISSING]` does: invisible to the compare oracle).
- Rebuilt `.design-sync/sb-reference` *after* this fix — Storybook's own Vite pipeline resolves and hashes the font correctly from the raw `tokens.css` import (unlike the Tailwind CLI's dist output), so the reference oracle now genuinely renders Inter too.
- `package.json` `files` array didn't include `src/fonts` (only `dist` and `src/styles`) — a consumer importing the `./tokens.css` subpath export would have gotten a 404 on the font. Added `src/fonts` to `files`.

## Known build warnings — benign, no action taken

- `! preview decorator bundle failed: Could not resolve "tailwindcss"` — `.storybook/preview.tsx` imports `../src/styles/tokens.css`, whose first line is `@import "tailwindcss";`; esbuild's bare CSS loader (used to bundle the decorator for previews) can't resolve that without running the real Tailwind build. The decorator's only effects were an inline `fontFamily` (now redundant — the DS itself declares `--font-sans`/`body` font-family, see above) and the `backgrounds` addon parameter (Storybook-canvas-only, not part of component rendering). Left `cfg.provider` unset — nothing the decorator provided needs replicating for previews to render correctly.
- `[TITLE_UNMAPPED]`: `Color` and `Typography` foundation stories (`src/foundations/*.stories.tsx`) don't correspond to package exports — they're documentation/foundation stories, not components. Mapped to `null` in `cfg.titleMap` to record the exclusion as intentional rather than leaving it as an unexplained drop.

## Re-sync risks

- The font-path build fix (above) is the main one: it's a script step, not a config knob, so it's easy to silently regress if `packages/ui/package.json`'s `build:css` script is edited without noticing what `fix-css-font-paths.mjs` does.
- No `.nvmrc` / pinned Node version found anywhere in the monorepo — build reproducibility on a different machine/Node version is unverified.
