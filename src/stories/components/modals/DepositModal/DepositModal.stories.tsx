import type { Meta, StoryObj } from '@storybook/react-vite'
import { DepositModal } from '@/components/DepositModal'
import {
  createDepositActions,
  mockEmailProviders,
} from './mocks'

const meta = {
  title: 'NOWPayments/Components/Modals/DepositModal',
  component: DepositModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
DepositModal is a 3-step cryptocurrency deposit flow component that guides users through:

1. **Currency Selection** - Choose from available cryptocurrencies
2. **Amount Entry** - Input the deposit amount with validation
3. **Payment Details** - Display QR code, address, and payment instructions

## Key Features

- **Frontend-only currency fetching** from NOWPayments API
- **Fixed form schema** for consistent backend integration
- **Responsive stepper UI** with progress indication
- **QR code generation** for easy mobile payments
- **Flexible email handling** (static string or async function)
- **Comprehensive error handling** and loading states

## Architecture

The component fetches available currencies for display only. All payment processing is handled by your backend through the \`onSubmit\` callback, which receives a fixed \`DepositFormData\` schema.
        `,
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls modal visibility',
    },
    customerEmail: {
      control: 'text',
      description: 'Customer email (string) or async function that returns email',
    },
    showEmailInput: {
      control: 'boolean',
      description: 'Show email input field in the form when customerEmail is not provided',
    },
    shouldNotifyByEmail: {
      control: 'boolean',
      description: 'Show email notification message under QR code when email is provided',
    },
    onSubmit: {
      action: 'submitted',
      description: 'Callback when form is submitted with DepositFormData',
    },
    onSuccess: {
      action: 'success',
      description: 'Callback when submission succeeds',
    },
    onError: {
      action: 'error',
      description: 'Callback when submission fails',
    },
    onClose: {
      action: 'closed',
      description: 'Callback when modal is closed',
    },
  },
} satisfies Meta<typeof DepositModal>

export default meta
type Story = StoryObj<typeof meta>

// Default story with working flow
export const Default: Story = {
  args: {
    isOpen: true,
    customerEmail: mockEmailProviders.static,
    showEmailInput: true,
    ...createDepositActions(),
    shouldNotifyByEmail: true,
  },
}

// With email input enabled
export const WithEmailInput: Story = {
  args: {
    isOpen: true,
    showEmailInput: true,
    ...createDepositActions(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Enables the email input field in the form. When `showEmailInput` is true and `customerEmail` is not provided, users can enter their email address.',
      },
    },
  },
}

// With async email provider
export const WithAsyncEmail: Story = {
  args: {
    isOpen: true,
    customerEmail: mockEmailProviders.async,
    showEmailInput: false,
    ...createDepositActions(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates async email loading. The email is fetched asynchronously when needed, useful for getting user data from APIs or authentication systems.',
      },
    },
  },
}

// Loading state story
export const LoadingCurrencies: Story = {
  args: {
    isOpen: true,
    customerEmail: mockEmailProviders.static,
    ...createDepositActions(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the component behavior when currencies are being loaded from the NOWPayments API. The loading state is managed by the Provider.',
      },
    },
  },
}

// Error state story
export const ErrorState: Story = {
  args: {
    isOpen: true,
    customerEmail: mockEmailProviders.static,
    ...createDepositActions(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Component behavior when there are API errors. Error handling is managed by the Provider and real API responses.',
      },
    },
  },
}

// Limited currencies
export const LimitedCurrencies: Story = {
  args: {
    isOpen: true,
    customerEmail: mockEmailProviders.static,
    ...createDepositActions(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Uses real currency data from NOWPayments API. Available currencies depend on your API configuration and enabled currencies.',
      },
    },
  },
}


// Mobile viewport
export const Mobile: Story = {
  args: {
    isOpen: true,
    customerEmail: mockEmailProviders.static,
    ...createDepositActions(),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'Modal displayed on mobile viewport to test responsive behavior and touch interactions.',
      },
    },
  },
}

// With Email Notification
export const WithEmailNotification: Story = {
  args: {
    isOpen: true,
    customerEmail: 'user@example.com',
    showEmailInput: true,
    shouldNotifyByEmail: true,
    ...createDepositActions(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the email notification feature. When shouldNotifyByEmail is true and an email is provided, a notification message appears under the QR code.',
      },
    },
  },
}
