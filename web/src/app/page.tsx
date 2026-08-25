import { Button, Badge, InputField } from "@mylocalguide/ui";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-8">
      <h2 className="text-h1 font-bold text-foreground">{title}</h2>
      <p className="mt-2 max-w-2xl text-body text-muted-foreground">
        {description}
      </p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function SwatchRow({
  label,
  steps,
}: {
  label: string;
  steps: { name: string; varName: string }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-caption font-semibold text-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">
        {steps.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-1">
            {/* Inline style, not a Tailwind class: the color is picked at
                runtime from a dynamically-built CSS var name, which
                Tailwind's static JIT scanner can't see ahead of time. */}
            <div
              className="size-14 rounded-lg border border-border"
              style={{ backgroundColor: `var(--${s.varName})` }}
            />
            <span className="text-[10px] text-muted-foreground">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const primitiveFamilies = ["primary", "secondary", "accent", "neutral"];
const primitiveSteps = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const statusFamilies = ["success", "warning", "error", "info"];
const statusSteps = [100, 500, 700];

const typeScale = [
  { name: "Display", cls: "text-display font-bold" },
  { name: "H1", cls: "text-h1 font-bold" },
  { name: "H2", cls: "text-h2 font-semibold" },
  { name: "H3", cls: "text-h3 font-semibold" },
  { name: "Subtitle", cls: "text-subtitle font-medium" },
  { name: "Body", cls: "text-body font-normal" },
  { name: "Caption", cls: "text-caption font-normal" },
  { name: "Label", cls: "text-label font-semibold uppercase" },
  { name: "Button", cls: "text-button font-semibold" },
];

const buttonVariants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "link",
  "destructive",
] as const;
const buttonSizes = ["sm", "default", "lg"] as const;

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16">
      <header>
        <h1 className="text-display font-bold text-foreground">
          MyLocalGuide Design System
        </h1>
        <p className="mt-3 max-w-2xl text-subtitle text-muted-foreground">
          Code implementation of the Figma UI Kit — colors, type, and
          components wired to the same tokens. Light mode only.
        </p>
      </header>

      {/* ===== Colors ===== */}
      <Section
        title="Color"
        description="Primitive ramps and the semantic roles built on top of them."
      >
        <div className="flex flex-col gap-6">
          {primitiveFamilies.map((fam) => (
            <SwatchRow
              key={fam}
              label={fam[0].toUpperCase() + fam.slice(1)}
              steps={primitiveSteps.map((s) => ({
                name: String(s),
                varName: `${fam}-${s}`,
              }))}
            />
          ))}
          <div className="flex flex-wrap gap-6">
            {statusFamilies.map((fam) => (
              <SwatchRow
                key={fam}
                label={fam[0].toUpperCase() + fam.slice(1)}
                steps={statusSteps.map((s) => ({
                  name: String(s),
                  varName: `${fam}-${s}`,
                }))}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* ===== Typography ===== */}
      <Section
        title="Typography"
        description="The 9-level Inter type scale — every size below uses the matching Tailwind text-* utility (text-h1, text-body, etc.), not a hardcoded font-size."
      >
        <div className="flex flex-col gap-5">
          {typeScale.map((t) => (
            <div key={t.name} className="flex items-baseline gap-6">
              <span className="w-20 shrink-0 text-caption text-muted-foreground">
                {t.name}
              </span>
              <p className={`${t.cls} text-foreground`}>
                The MyLocalGuide type scale
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== Buttons ===== */}
      <Section
        title="Button"
        description="6 variants x 3 sizes, restyled from shadcn/ui with MLG tokens. Primary is near-black to match the approved wireframes and pass contrast."
      >
        <div className="flex flex-col gap-8">
          <div className="overflow-x-auto">
            <table className="border-separate border-spacing-4">
              <thead>
                <tr>
                  <th />
                  {buttonSizes.map((size) => (
                    <th
                      key={size}
                      className="text-left text-caption font-normal text-muted-foreground"
                    >
                      {size}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {buttonVariants.map((variant) => (
                  <tr key={variant}>
                    <td className="pr-2 text-caption font-semibold text-foreground capitalize">
                      {variant}
                    </td>
                    {buttonSizes.map((size) => (
                      <td key={size}>
                        <Button variant={variant} size={size}>
                          Button
                        </Button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-caption font-semibold text-foreground">
              Leading / trailing icons + states
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Book Now</Button>
              <Button
                trailingIcon={
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 1l7 5-7 5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                Start Your Journey
              </Button>
              <Button
                leadingIcon={<span className="size-2.5 rounded-full bg-current" />}
              >
                Pay with card
              </Button>
              <Button className="opacity-40 pointer-events-none">
                Disabled
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ===== Inputs ===== */}
      <Section
        title="Input"
        description="5 states from Figma — Focus and Filled are native browser states here, Error and Disabled are explicit props."
      >
        <div className="grid max-w-md grid-cols-1 gap-6">
          <InputField label="Default" placeholder="Placeholder text" />
          <InputField label="Filled" defaultValue="Jane Doe" />
          <InputField label="Disabled" placeholder="Placeholder text" disabled />
          <InputField
            label="Error"
            defaultValue="jane@invalid"
            error
            errorMessage="Enter a valid email address."
          />
        </div>
      </Section>

      {/* ===== Badges ===== */}
      <Section
        title="Badge"
        description="7 variants — status colors reuse the accessible bg/text pairs from Color foundations."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success" showDot>
            Verified Local
          </Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="error">Booking failed</Badge>
          <Badge variant="info">New host</Badge>
        </div>
      </Section>
    </main>
  );
}
