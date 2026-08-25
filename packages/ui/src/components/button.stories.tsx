import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "link", "destructive"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg", "icon", "icon-sm", "icon-lg"],
    },
  },
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "default", children: "Book Now" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Save for later" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Cancel" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Back" },
};

export const Link: Story = {
  args: { variant: "link", children: "Expand map" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Cancel Booking" },
};

export const WithTrailingIcon: Story = {
  args: {
    children: "Start Your Journey",
    trailingIcon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 1l7 5-7 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { children: "Book Now", disabled: true },
};
