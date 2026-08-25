import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "./badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "success",
        "warning",
        "error",
        "info",
      ],
    },
  },
  args: {
    children: "Badge",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: "default" },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Success: Story = {
  args: { variant: "success", showDot: true, children: "Verified Local" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Pending" },
};

export const ErrorVariant: Story = {
  name: "Error",
  args: { variant: "error", children: "Booking failed" },
};

export const Info: Story = {
  args: { variant: "info", children: "New host" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success" showDot>
        Verified Local
      </Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="error">Booking failed</Badge>
      <Badge variant="info">New host</Badge>
    </div>
  ),
};
