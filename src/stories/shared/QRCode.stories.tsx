import type { Meta, StoryObj } from '@storybook/react-vite'
import { QRCode } from '@/components/shared/QRCode'

// Simple mock function for actions
const mockFn = () => {}

const meta: Meta<typeof QRCode> = {
  title: 'NOWPayments/Shared Components/QRCode',
  component: QRCode,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A comprehensive QR code component for cryptocurrency addresses and payment data. Features copy functionality, blockchain explorer links, and responsive sizing.

## Features

- **QR Code Generation**: Automatically generates QR codes from any string value
- **Copy Functionality**: Built-in clipboard integration with copy buttons
- **Explorer Integration**: Optional blockchain explorer links for addresses
- **Multiple Sizes**: Customizable QR code dimensions
- **Address Truncation**: Smart truncation for long addresses with full reveal option
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Error Handling**: Graceful fallbacks for clipboard API failures

## Usage

The QRCode component is used in payment flows to display cryptocurrency addresses, payment URIs, and other scannable data for mobile wallet integration.
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'The data to encode in the QR code',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: { type: 'number', min: 100, max: 400, step: 50 },
      description: 'Size of the QR code in pixels',
      table: {
        defaultValue: { summary: '200' },
        type: { summary: 'number' },
      },
    },
    title: {
      control: 'text',
      description: 'Optional title displayed above the QR code',
      table: {
        type: { summary: 'string' },
      },
    },
    showActions: {
      control: 'boolean',
      description: 'Show copy and explorer action buttons',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    showRawValue: {
      control: 'boolean',
      description: 'Show the raw value below the QR code',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    explorerUrl: {
      control: 'text',
      description: 'URL to blockchain explorer for the address',
      table: {
        type: { summary: 'string' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
      },
    },
    onCopy: {
      action: 'copied',
      description: 'Callback when copy action is performed',
    },
  },
  args: {
    onCopy: mockFn,
  },
}

export default meta
type Story = StoryObj<typeof QRCode>

// Basic QR code
export const Default: Story = {
  args: {
    value: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    title: 'Bitcoin Address',
  },
}

// Different cryptocurrency addresses
export const BitcoinAddress: Story = {
  args: {
    value: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    title: 'Bitcoin Address',
    explorerUrl: 'https://blockstream.info/address/bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  },
  parameters: {
    docs: {
      description: {
        story: 'QR code for a Bitcoin address with blockchain explorer link.',
      },
    },
  },
}

export const EthereumAddress: Story = {
  args: {
    value: '0x742d35Cc6635C0532925a3b8D73e265e3d4Dd95C',
    title: 'Ethereum Address',
    explorerUrl: 'https://etherscan.io/address/0x742d35Cc6635C0532925a3b8D73e265e3d4Dd95C',
  },
  parameters: {
    docs: {
      description: {
        story: 'QR code for an Ethereum address with Etherscan explorer link.',
      },
    },
  },
}

export const LitecoinAddress: Story = {
  args: {
    value: 'ltc1qxu2cqp52e9nh8f7v6nz9rvwx74th8e9xd2mn0s',
    title: 'Litecoin Address',
    explorerUrl: 'https://blockchair.com/litecoin/address/ltc1qxu2cqp52e9nh8f7v6nz9rvwx74th8e9xd2mn0s',
  },
  parameters: {
    docs: {
      description: {
        story: 'QR code for a Litecoin address with Blockchair explorer link.',
      },
    },
  },
}

// Payment URI
export const PaymentURI: Story = {
  args: {
    value: 'bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh?amount=0.01&label=Payment',
    title: 'Payment Request',
    showRawValue: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'QR code for a Bitcoin payment URI with amount and label parameters.',
      },
    },
  },
}

// Different sizes
export const SmallSize: Story = {
  args: {
    value: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    size: 150,
    title: 'Small QR Code',
  },
  parameters: {
    docs: {
      description: {
        story: 'Smaller QR code (150px) suitable for compact layouts.',
      },
    },
  },
}

export const LargeSize: Story = {
  args: {
    value: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    size: 300,
    title: 'Large QR Code',
  },
  parameters: {
    docs: {
      description: {
        story: 'Larger QR code (300px) for better scanning visibility.',
      },
    },
  },
}

// Without optional elements
export const NoTitle: Story = {
  args: {
    value: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  },
  parameters: {
    docs: {
      description: {
        story: 'QR code without a title, showing only the code and address.',
      },
    },
  },
}

export const NoActions: Story = {
  args: {
    value: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    title: 'Address (No Actions)',
    showActions: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'QR code without action buttons, useful for read-only displays.',
      },
    },
  },
}

export const NoRawValue: Story = {
  args: {
    value: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    title: 'Clean Display',
    showRawValue: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Clean QR code display without showing the raw address value.',
      },
    },
  },
}

// Minimal display
export const Minimal: Story = {
  args: {
    value: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    showActions: false,
    showRawValue: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal QR code display with only the code itself.',
      },
    },
  },
}

// Different data types
export const SimpleText: Story = {
  args: {
    value: 'Hello, World!',
    title: 'Simple Text',
    showActions: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'QR code containing simple text data.',
      },
    },
  },
}

export const WebsiteURL: Story = {
  args: {
    value: 'https://nowpayments.io',
    title: 'Website URL',
    showRawValue: true,
    showActions: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'QR code containing a website URL.',
      },
    },
  },
}

export const EmailAddress: Story = {
  args: {
    value: 'mailto:support@example.com?subject=Support Request',
    title: 'Email Contact',
    showRawValue: false,
    showActions: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'QR code containing an email mailto link.',
      },
    },
  },
}

// Long address truncation demo
export const LongAddress: Story = {
  args: {
    value: 'tb1pexample1234567890abcdefghijklmnopqrstuvwxyzexample1234567890abcdefghijklmnop',
    title: 'Long Address Demo',
    explorerUrl: 'https://blockstream.info/testnet/address/tb1pexample1234567890',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates address truncation for very long addresses with "Show full" functionality.',
      },
    },
  },
}

// Interactive copy demo
export const InteractiveCopy: Story = {
  args: {
    value: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    title: 'Interactive Copy Demo',
    onCopy: () => alert('Address copied to clipboard!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive QR code with copy functionality. Try clicking the copy buttons!',
      },
    },
  },
}

// Size comparison
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <QRCode
        value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        size={120}
        title="Small (120px)"
        showActions={false}
      />
      <QRCode
        value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        size={200}
        title="Medium (200px)"
        showActions={false}
      />
      <QRCode
        value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        size={280}
        title="Large (280px)"
        showActions={false}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Comparison of different QR code sizes.',
      },
    },
  },
}

// Payment flow example
export const PaymentFlow: Story = {
  render: () => (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          padding: '2rem',
          background: '#f9f9f9',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Complete Your Payment
        </h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '1.5rem' }}>
          Send exactly <strong>0.001 BTC</strong> to the address below
        </p>
        <QRCode
          value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
          title="Payment Address"
          explorerUrl="https://blockstream.info/address/bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
          onCopy={mockFn}
        />
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: '#fff3cd',
            borderRadius: '8px',
            border: '1px solid #ffeaa7',
          }}
        >
          <p style={{ margin: 0, fontSize: '0.9rem', textAlign: 'center' }}>
            ⚠️ Send only Bitcoin to this address. Other cryptocurrencies will be lost.
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Example of QR code used in a complete payment flow interface.',
      },
    },
  },
}

// Multiple QR codes
export const MultipleAddresses: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
      <QRCode
        value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
        title="Bitcoin Address"
        size={180}
        explorerUrl="https://blockstream.info/address/bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
      />
      <QRCode
        value="0x742d35Cc6635C0532925a3b8D73e265e3d4Dd95C"
        title="Ethereum Address"
        size={180}
        explorerUrl="https://etherscan.io/address/0x742d35Cc6635C0532925a3b8D73e265e3d4Dd95C"
      />
      <QRCode
        value="ltc1qxu2cqp52e9nh8f7v6nz9rvwx74th8e9xd2mn0s"
        title="Litecoin Address"
        size={180}
        explorerUrl="https://blockchair.com/litecoin/address/ltc1qxu2cqp52e9nh8f7v6nz9rvwx74th8e9xd2mn0s"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Multiple QR codes for different cryptocurrency addresses.',
      },
    },
  },
}