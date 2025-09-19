import type { Meta, StoryObj } from '@storybook/react-vite'

// Simple mock function for actions
const mockFn = () => {}
import { CurrencySelector } from '@/components/shared/CurrencySelector'
import type { Currency } from '@/types'


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
      control: 'text',
      description: 'Currently selected currency ID (use currency cg_id from API)',
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
          'Currency selector with a currency pre-selected. The selected currency is displayed with its logo and name. Use actual currency cg_id values from your API.',
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
          'Disabled currency selector with a pre-selected currency. Shows the selection but prevents changes. Use valid currency cg_id from API.',
      },
    },
  },
}

// Loading state
export const LoadingState: Story = {
  args: {
    label: 'Currency',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Currency selector behavior during loading state. The actual loading is managed by the NOWPayments Provider when fetching from the API.',
      },
    },
  },
}

// Error state (no currencies)
export const ErrorState: Story = {
  args: {
    label: 'Currency',
  },
  parameters: {
    docs: {
      description: {
        story: 'Currency selector behavior when API errors occur. Error handling is managed by the Provider based on real API responses.',
      },
    },
  },
}

// Limited currencies
export const LimitedCurrencies: Story = {
  args: {
    label: 'Available Currencies',
    placeholder: 'Select from available options...',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Currency selector showing available currencies from your NOWPayments API configuration. Currencies depend on your account settings.',
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
        story: 'Showcase of different selection states. Uses real currency data from the NOWPayments API.',
      },
    },
  },
}
