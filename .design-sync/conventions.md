## Setup

No provider or root wrapper is required — components read colors and type
directly from CSS custom properties declared on `:root`, not from React
context. Just load the two files once (React must already be on the page):

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

Mount into a dedicated child node, not the host page's own React root:

```jsx
const { Button, Badge, InputField } = window.MylocalguideUi;
ReactDOM.createRoot(document.getElementById('ds-root')).render(<Button>Book Now</Button>);
```

Light mode only — there is no dark-mode variant to switch to.

## Styling idiom

Components are pre-styled Tailwind v4, and only ship the utility classes
their own JSX actually uses — don't assume the full Tailwind utility set is
available. Two vocabularies, depending on what you're touching:

**Building your own layout around the components** — use these CSS custom
properties directly (`style={{ background: 'var(--color-bg-page)' }}` or a
plain `<style>` block); they're always declared on `:root` regardless of
which components shipped:
- Backgrounds/text: `--color-bg-page`, `--color-bg-surface`, `--color-text-primary`, `--color-text-body`, `--color-text-secondary`, `--color-text-muted`
- Brand accents: `--brand-primary`, `--brand-secondary`, `--brand-accent`
- Status: `--status-{success,warning,error,info}`, `--status-*-bg`, `--status-*-text`
- Icon sizing: `--icon-sm` (16px) / `-md` (20px) / `-lg` (24px) / `-xl` (32px)
- Interaction opacity: `--opacity-hover` (0.08), `--opacity-pressed` (0.12), `--opacity-disabled` (0.4)

**Composing new elements in the same visual language as the shipped
components** — reuse these exact utility classes verbatim (verified present
in `_ds_bundle.css`); do not invent sibling classes like `rounded-xl` or
`text-h4` — they were never generated and will render as nothing:
- Type scale: `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-subtitle`, `text-body`, `text-caption`, `text-label`, `text-button` (each already carries the correct line-height)
- Weight: `font-normal`, `font-semibold`
- Radius: `rounded-full`, `rounded-lg`, `rounded-md`
- Surface/status color: `bg-background`, `bg-card`, `bg-primary`, `bg-secondary`, `bg-destructive`, `bg-status-{success,warning,error,info}`, `bg-status-*-bg`, `text-status-*-text`, `text-brand-accent`, `border-border`

Font is Inter (self-hosted, all weights) — never redeclare `font-family`.

## Where the truth lives

- `styles.css` → `@import`s tokens, the Inter `@font-face`, and `_ds_bundle.css` (component styles) — read `_ds_bundle.css` directly for the full generated utility set before styling anything not listed above.
- `components/components/<Name>/<Name>.prompt.md` — real props + real story examples per component; read this before composing a component you haven't used yet.

## Example

```jsx
const { Badge, Button } = window.MylocalguideUi;

function BookingCard() {
  return (
    <div style={{ background: 'var(--color-bg-surface)', borderRadius: 'var(--radius)' }} className="p-6">
      <Badge variant="success">Verified Local</Badge>
      <p className="text-h3 font-semibold" style={{ color: 'var(--color-text-primary)' }}>
        Sunset Kayak Tour
      </p>
      <Button variant="default">Book Now</Button>
    </div>
  );
}
```
