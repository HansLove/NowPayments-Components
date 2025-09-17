import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/shared/Button'

// Simple mock function for actions
const mockFn = () => {}

const meta: Meta<typeof Button> = {
  title: 'NOWPayments/Shared Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible button component with multiple variants, sizes, and states. Supports loading states with automatic spinner display.

## Features

- **Variants**: Primary, secondary, and error styling
- **Sizes**: Small (sm), medium (md), and large (lg)
- **Loading State**: Shows spinner and disables interaction
- **Accessibility**: Full keyboard navigation and screen reader support
- **Extensible**: Accepts all standard button HTML attributes

## Usage

The Button component is used throughout the library for form submissions, modal actions, and interactive elements.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'error'],
      description: 'Visual style variant of the button',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | secondary | error' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner and disables the button',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    children: {
      control: 'text',
      description: 'Button content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
    },
  },
  args: {
    onClick: mockFn,
    children: 'Button',
  },
}

export default meta
type Story = StoryObj<typeof Button>

// Basic variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error Button',
  },
}

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
}

// States
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button in loading state with spinner. The button is automatically disabled while loading.',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button in disabled state. Cannot be clicked or focused.',
      },
    },
  },
}

// With different content
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span style={{ marginRight: '0.5rem' }}>💎</span>
        Deposit Crypto
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with icon content. Icons can be placed before or after text.',
      },
    },
  },
}

// Variant comparison
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button variant="primary" onClick={mockFn}>
        Primary
      </Button>
      <Button variant="secondary" onClick={mockFn}>
        Secondary
      </Button>
      <Button variant="error" onClick={mockFn}>
        Error
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all button variants side by side.',
      },
    },
  },
}

// Size comparison
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm" onClick={mockFn}>
        Small
      </Button>
      <Button size="md" onClick={mockFn}>
        Medium
      </Button>
      <Button size="lg" onClick={mockFn}>
        Large
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all button sizes side by side.',
      },
    },
  },
}

// Full width button
export const FullWidth: Story = {
  args: {
    style: { width: '100%' },
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Button taking full width of its container using CSS styling.',
      },
    },
  },
}

// Interactive example
export const Interactive: Story = {
  args: {
    children: 'Click me!',
    onClick: () => alert('Button clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive button that shows an alert when clicked. Try clicking it!',
      },
    },
  },
}