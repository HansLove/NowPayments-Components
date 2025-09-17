import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect } from 'react'

// Simple mock function for actions
const mockFn = () => {}
import { CurrencySelector } from '@/components/shared/CurrencySelector'
import { useNowPaymentsStore } from '@/stores/nowPaymentsStore'
import type { Currency } from '@/types'

// Mock currencies for stories
const mockCurrencies: Currency[] = [
  {
    id: 1,
    cg_id: 'bitcoin',
    code: 'btc',
    name: 'Bitcoin',
    enable: true,
    wallet_regex: '^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$',
    priority: 1,
    extra_id_exists: false,
    extra_id_regex: null,
    logo_url: '/images/coins/bitcoin.svg',
    track: true,
    is_maxlimit: false,
    network: 'btc',
    smart_contract: null,
    network_precision: 8,
  },
  {
    id: 2,
    cg_id: 'ethereum',
    code: 'eth',
    name: 'Ethereum',
    enable: true,
    wallet_regex: '^0x[a-fA-F0-9]{40}$',
    priority: 2,
    extra_id_exists: false,
    extra_id_regex: null,
    logo_url: '/images/coins/ethereum.svg',
    track: true,
    is_maxlimit: false,
    network: 'eth',
    smart_contract: null,
    network_precision: 18,
  },
  {
    id: 3,
    cg_id: 'litecoin',
    code: 'ltc',
    name: 'Litecoin',
    enable: true,
    wallet_regex: '^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$',
    priority: 3,
    extra_id_exists: false,
    extra_id_regex: null,
    logo_url: '/images/coins/litecoin.svg',
    track: true,
    is_maxlimit: false,
    network: 'ltc',
    smart_contract: null,
    network_precision: 8,
  },
  {
    id: 4,
    cg_id: 'cardano',
    code: 'ada',
    name: 'Cardano',
    enable: true,
    wallet_regex: '^addr1[a-z0-9]+$',
    priority: 4,
    extra_id_exists: false,
    extra_id_regex: null,
    logo_url: '/images/coins/cardano.svg',
    track: true,
    is_maxlimit: false,
    network: 'ada',
    smart_contract: null,
    network_precision: 6,
  },
]

const meta: Meta<typeof CurrencySelector> = {
  title: 'NOWPayments/Shared Components/CurrencySelector',
  component: CurrencySelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A sophisticated dropdown component for selecting cryptocurrencies. Features search functionality, keyboard navigation, and accessibility support.

## Features

- **Search Functionality**: Real-time filtering by currency name or code
- **Keyboard Navigation**: Full arrow key navigation and Enter/Escape support
- **Visual Indicators**: Currency logos and check marks for selected items
- **Loading States**: Shows spinner while currencies are being fetched
- **Error Handling**: Graceful fallbacks for missing data or logos
- **Accessibility**: ARIA attributes and screen reader support
- **Responsive Design**: Works on desktop and mobile devices

## Usage

The CurrencySelector component is used in deposit and withdrawal flows to let users choose their preferred cryptocurrency.
        `,
      },
    },
  },
  argTypes: {
    selectedCurrency: {
      control: 'select',
      options: ['', 'bitcoin', 'ethereum', 'litecoin'],
      description: 'Currently selected currency ID',
      table: {
        type: { summary: 'string' },
      },
    },
    onSelect: {
      action: 'currency-selected',
      description: 'Callback when a currency is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the selector',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text for the selector',
      table: {
        defaultValue: { summary: 'Currency' },
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no currency is selected',
      table: {
        defaultValue: { summary: 'Select currency...' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    onSelect: mockFn,
  },
  decorators: [
    Story => {
      // Setup mock store data for all stories
      useEffect(() => {
        const store = useNowPaymentsStore.getState()
        store.setCurrencies(mockCurrencies)
        store.setEnabledCurrencies(mockCurrencies.map(c => c.cg_id))
        store.setApiKey('mock-api-key-for-storybook')
        store.setError(null)
        store.setIsLoadingCurrencies(false)
      }, [])

      return <Story />
    },
  ],
}

export default meta
type Story = StoryObj<typeof CurrencySelector>

// Basic states
export const Default: Story = {
  args: {
    label: 'Select Currency',
    placeholder: 'Choose a cryptocurrency...',
  },
}

export const WithSelection: Story = {
  args: {
    selectedCurrency: 'bitcoin',
    label: 'Selected Currency',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Currency selector with Bitcoin pre-selected. The selected currency is displayed with its logo and name.',
      },
    },
  },
}

export const NoLabel: Story = {
  args: {
    placeholder: 'Select currency...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Currency selector without a label, showing only the dropdown trigger.',
      },
    },
  },
}

export const CustomPlaceholder: Story = {
  args: {
    label: 'Payment Currency',
    placeholder: 'Pick your preferred crypto...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Currency selector with custom label and placeholder text.',
      },
    },
  },
}

// States
export const Disabled: Story = {
  args: {
    label: 'Currency',
    disabled: true,
    placeholder: 'Selection disabled',
  },
  parameters: {
    docs: {
      description: {
        story: 'Currency selector in disabled state. Cannot be opened or interacted with.',
      },
    },
  },
}

export const DisabledWithSelection: Story = {
  args: {
    selectedCurrency: 'ethereum',
    label: 'Currency',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Disabled currency selector with a pre-selected currency. Shows the selection but prevents changes.',
      },
    },
  },
}

// Loading state
export const LoadingState: Story = {
  args: {
    label: 'Currency',
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
          'Currency selector in loading state while currencies are being fetched from the API.',
      },
    },
  },
}

// Error state (no currencies)
export const ErrorState: Story = {
  args: {
    label: 'Currency',
  },
  decorators: [
    Story => {
      useEffect(() => {
        const store = useNowPaymentsStore.getState()
        store.setCurrencies([])
        store.setEnabledCurrencies([])
        store.setIsLoadingCurrencies(false)
        store.setError('Failed to load currencies')
      }, [])
      return <Story />
    },
  ],
  parameters: {
    docs: {
      description: {
        story: 'Currency selector when no currencies are available, showing an error message.',
      },
    },
  },
}

// Limited currencies
export const LimitedCurrencies: Story = {
  args: {
    label: 'Available Currencies',
    placeholder: 'Select from limited options...',
  },
  decorators: [
    Story => {
      useEffect(() => {
        const store = useNowPaymentsStore.getState()
        // Only show Bitcoin and Ethereum
        const limitedCurrencies = mockCurrencies.slice(0, 2)
        store.setCurrencies(limitedCurrencies)
        store.setEnabledCurrencies(limitedCurrencies.map(c => c.cg_id))
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
          'Currency selector with limited currency options. Useful for testing scenarios with fewer choices.',
      },
    },
  },
}

// Interactive example
export const InteractiveExample: Story = {
  args: {
    label: 'Choose Cryptocurrency',
    placeholder: 'Click to select...',
    onSelect: (currency: Currency) => {
      alert(`Selected: ${currency.name} (${currency.code.toUpperCase()})`)
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive currency selector. Click to open, search, and select a currency to see the selection event.',
      },
    },
  },
}

// Search functionality demo
export const SearchDemo: Story = {
  args: {
    label: 'Currency Search Demo',
    placeholder: 'Open and try searching...',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demo showing search functionality. Open the dropdown and try searching for "bitcoin", "eth", or "link" to see filtering in action.',
      },
    },
  },
}

// Keyboard navigation demo
export const KeyboardNavigationDemo: Story = {
  args: {
    label: 'Keyboard Navigation Demo',
    placeholder: 'Focus and press Enter/Space...',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demo for keyboard navigation. Click to focus, then use Enter/Space to open, Arrow keys to navigate, Enter to select, Escape to close.',
      },
    },
  },
}

// Different selection showcase
export const SelectionShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '300px' }}>
      <CurrencySelector label="Bitcoin Selected" selectedCurrency="bitcoin" onSelect={mockFn} />
      <CurrencySelector label="Ethereum Selected" selectedCurrency="ethereum" onSelect={mockFn} />
      <CurrencySelector label="No Selection" placeholder="Choose currency..." onSelect={mockFn} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of different selection states with various currencies selected.',
      },
    },
  },
}
