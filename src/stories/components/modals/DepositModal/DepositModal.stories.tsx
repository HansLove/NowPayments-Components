import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect } from 'react'
import { DepositModal } from '@/components/DepositModal'
import { useNowPaymentsStore } from '@/stores/nowPaymentsStore'
import {
  mockCurrencies,
  mockEnabledCurrencies,
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
    enableEmail: {
      control: 'boolean',
      description: 'Show email input field in the form',
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
  decorators: [
    Story => {
      // Setup mock store data for all stories
      useEffect(() => {
        const store = useNowPaymentsStore.getState()
        store.setCurrencies(mockCurrencies)
        store.setEnabledCurrencies(mockEnabledCurrencies)
        store.setApiKey('mock-api-key-for-storybook')
        store.setError(null)
        store.setIsLoadingCurrencies(false)
      }, [])

      return <Story />
    },
  ],
} satisfies Meta<typeof DepositModal>

export default meta
type Story = StoryObj<typeof meta>

// Default story with working flow
export const Default: Story = {
  args: {
    isOpen: true,
    customerEmail: mockEmailProviders.static,
    enableEmail: true,
    ...createDepositActions(),
    shouldNotifyByEmail: true,
  },
}

// With email input enabled
export const WithEmailInput: Story = {
  args: {
    isOpen: true,
    enableEmail: true,
    ...createDepositActions(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Enables the email input field in the form. When `enableEmail` is true, users can enter their email address.',
      },
    },
  },
}

// With async email provider
export const WithAsyncEmail: Story = {
  args: {
    isOpen: true,
    customerEmail: mockEmailProviders.async,
    enableEmail: false,
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
  decorators: [
    Story => {
      useEffect(() => {
        const store = useNowPaymentsStore.getState()
        store.setCurrencies([])
        store.setEnabledCurrencies([])
        store.setIsLoadingCurrencies(true)
        store.setError(null)
      }, [])
      return <Story />
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Shows the loading state while currencies are being fetched from the NOWPayments API.',
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
  decorators: [
    Story => {
      useEffect(() => {
        const store = useNowPaymentsStore.getState()
        store.setCurrencies([])
        store.setEnabledCurrencies([])
        store.setIsLoadingCurrencies(false)
        store.setError('Failed to load currencies. Please check your API key and try again.')
      }, [])
      return <Story />
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Displays error state when currency loading fails. Users can retry or contact support.',
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
  decorators: [
    Story => {
      useEffect(() => {
        const store = useNowPaymentsStore.getState()
        // Only show Bitcoin and Ethereum
        const limitedCurrencies = mockCurrencies.slice(0, 2)
        const limitedEnabled = ['bitcoin', 'ethereum']

        store.setCurrencies(limitedCurrencies)
        store.setEnabledCurrencies(limitedEnabled)
        store.setError(null)
        store.setIsLoadingCurrencies(false)
      }, [])
      return <Story />
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Example with limited currency options. Useful for testing scenarios where only specific cryptocurrencies are available.',
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
    enableEmail: true,
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
