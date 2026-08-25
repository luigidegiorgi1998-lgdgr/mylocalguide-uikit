import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputField } from "./input-field";

const meta = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Full Name", placeholder: "Jane Doe" },
};

export const Filled: Story = {
  args: { label: "Full Name", defaultValue: "Jane Doe" },
};

export const Disabled: Story = {
  args: { label: "Full Name", placeholder: "Jane Doe", disabled: true },
};

export const ErrorState: Story = {
  name: "Error",
  args: {
    label: "Email Address",
    defaultValue: "jane@invalid",
    error: true,
    errorMessage: "Enter a valid email address.",
  },
};

export const AllStates: Story = {
  args: { label: "Label" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 360 }}>
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
  ),
};
