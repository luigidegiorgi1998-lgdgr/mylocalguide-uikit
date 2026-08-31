# MyLocalGuide — Design System & UI Kit

The complete design system powering **MyLocalGuide**, a travel app that helps people find authentic local experiences based on the city they're visiting.

This monorepo contains the full component library (`packages/ui`) alongside the Next.js web app (`web`) that consumes it — so the design system isn't just a set of isolated components, it's tested against a real, working product.

## Stack

- **Next.js 16** + **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui** + **Radix UI** as the component foundation
- **Vitest** for testing

## Structure

```
├── web/            # Next.js app — MyLocalGuide, consuming the design system
└── packages/
    └── ui/          # @mylocalguide/ui — the design system package
```

## Why this exists

Building the design system and the app side by side made it possible to validate every component against real screens and real content, instead of designing components in isolation and hoping they'd hold up in production.

---

Part of my [product design portfolio](#) — case study coming soon.
