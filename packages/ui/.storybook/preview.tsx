import type { Preview } from '@storybook/react-vite'

import '../src/styles/tokens.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    backgrounds: {
      default: 'page',
      values: [
        { name: 'page', value: 'var(--color-bg-page)' },
        { name: 'surface', value: 'var(--color-bg-surface)' },
      ],
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
