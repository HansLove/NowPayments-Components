import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContinueWithNowPayments } from '@/components/shared/ContinueWithNowPayments'

const meta: Meta<typeof ContinueWithNowPayments> = {
  title: 'NOWPayments/ContinueWithNowPayments',
  component: ContinueWithNowPayments,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A professional "Continue with NOWPayments" button inspired by Apple Pay, PayPal, and other premium payment buttons. Features clean design, multiple variants, and responsive sizing.',
      },
    },
  },
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: {
      control: 'boolean',
      description: 'Disables the button and shows a disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes the button take full width of its container',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size variant',
    },
    variant: {
      control: 'select',
      options: ['default', 'dark', 'light'],
      description:
        'Visual style variant - default (dark like Apple Pay), light (like PayPal), or dark',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
}

export default meta
type Story = StoryObj<typeof ContinueWithNowPayments>

export const Default: Story = {
  args: {},
}

export const LightVariant: Story = {
  args: {
    variant: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: 'Light variant similar to PayPal buttons - white background with dark text.',
      },
    },
  },
}

export const DarkVariant: Story = {
  args: {
    variant: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: 'Extra dark variant for dark themes or high contrast needs.',
      },
    },
  },
}

export const Small: Story = {
  args: {
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Interactive: Story = {
  args: {
    onClick: () => {
      alert('Redirecting to NOWPayments checkout...')
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Click the button to see the interaction. In a real implementation, this would redirect to your NOWPayments integration.',
      },
    },
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <ContinueWithNowPayments variant="default" onClick={() => console.log('Default clicked')} />
      <ContinueWithNowPayments variant="light" onClick={() => console.log('Light clicked')} />
      <ContinueWithNowPayments variant="dark" onClick={() => console.log('Dark clicked')} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all available variants: default (dark), light, and dark.',
      },
    },
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <ContinueWithNowPayments size="small" onClick={() => console.log('Small clicked')} />
      <ContinueWithNowPayments size="medium" onClick={() => console.log('Medium clicked')} />
      <ContinueWithNowPayments size="large" onClick={() => console.log('Large clicked')} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all available sizes: small, medium (default), and large.',
      },
    },
  },
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <ContinueWithNowPayments onClick={() => console.log('Active clicked')} />
      <ContinueWithNowPayments disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button in different states: active and disabled.',
      },
    },
  },
}
