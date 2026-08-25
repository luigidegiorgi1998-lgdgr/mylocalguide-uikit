import type { Meta, StoryObj } from "@storybook/react-vite";

const typeScale = [
  { name: "Display", cls: "text-display", weight: 700 },
  { name: "H1", cls: "text-h1", weight: 700 },
  { name: "H2", cls: "text-h2", weight: 600 },
  { name: "H3", cls: "text-h3", weight: 600 },
  { name: "Subtitle", cls: "text-subtitle", weight: 500 },
  { name: "Body", cls: "text-body", weight: 400 },
  { name: "Caption", cls: "text-caption", weight: 400 },
  { name: "Label", cls: "text-label", weight: 600 },
  { name: "Button", cls: "text-button", weight: 600 },
];

function TypographyFoundations() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: 24 }}>
      {typeScale.map((t) => (
        <div key={t.name} style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
          <span style={{ width: 80, flexShrink: 0, fontSize: 12, color: "var(--color-text-muted)" }}>
            {t.name}
          </span>
          <p className={t.cls} style={{ fontWeight: t.weight, margin: 0 }}>
            The MyLocalGuide type scale
          </p>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: "Foundations/Typography",
  component: TypographyFoundations,
  tags: ["autodocs"],
} satisfies Meta<typeof TypographyFoundations>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllStyles: Story = {};
