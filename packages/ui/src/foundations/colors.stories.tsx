import type { Meta, StoryObj } from "@storybook/react-vite";

const primitiveFamilies = ["primary", "secondary", "accent", "neutral"];
const primitiveSteps = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const statusFamilies = ["success", "warning", "error", "info"];
const statusSteps = [100, 500, 700];

function SwatchRow({
  label,
  steps,
}: {
  label: string;
  steps: { name: string; varName: string }[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <p style={{ fontWeight: 600, fontSize: 12 }}>{label}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {steps.map((s) => (
          <div
            key={s.name}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 8,
                border: "1px solid var(--color-border-default)",
                backgroundColor: `var(--${s.varName})`,
              }}
            />
            <span style={{ fontSize: 10, color: "var(--color-text-muted)" }}>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ColorFoundations() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: 24 }}>
      {primitiveFamilies.map((fam) => (
        <SwatchRow
          key={fam}
          label={fam[0].toUpperCase() + fam.slice(1)}
          steps={primitiveSteps.map((s) => ({ name: String(s), varName: `${fam}-${s}` }))}
        />
      ))}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        {statusFamilies.map((fam) => (
          <SwatchRow
            key={fam}
            label={fam[0].toUpperCase() + fam.slice(1)}
            steps={statusSteps.map((s) => ({ name: String(s), varName: `${fam}-${s}` }))}
          />
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Foundations/Color",
  component: ColorFoundations,
  tags: ["autodocs"],
} satisfies Meta<typeof ColorFoundations>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllColors: Story = {};
