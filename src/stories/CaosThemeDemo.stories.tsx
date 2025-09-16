import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect } from 'react'
import { DepositModal } from '../components/DepositModal'
import { WithdrawModal } from '../components/WithdrawModal'
import { useNowPaymentsStore } from '../stores/nowPaymentsStore'
import {
  mockCurrencies,
  mockEnabledCurrencies,
  createDepositActions,
  mockEmailProviders,
} from './DepositModal/mocks'
import { createWithdrawActions, mockBalanceToUsdtConverter } from './WithdrawModal/mocks'

// Dynamic theme loading - only loads when these stories are active
const CaosThemeLoader = () => {
  useEffect(() => {
    // Create and add CSS link element
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/src/stories/caos-theme.css'
    link.setAttribute('data-caos-theme', 'true')
    document.head.appendChild(link)

    // Cleanup function to remove styles when component unmounts
    return () => {
      // Remove the dynamically added stylesheet when story changes
      const existingLink = document.querySelector('link[data-caos-theme]')
      if (existingLink) {
        existingLink.remove()
      }
    }
  }, [])

  return null
}

// Component to showcase both modals side by side
const ThemeShowcase = ({
  showDeposit,
  showWithdraw,
}: {
  showDeposit: boolean
  showWithdraw: boolean
}) => {
  useEffect(() => {
    // Setup store
    const store = useNowPaymentsStore.getState()
    store.setCurrencies(mockCurrencies)
    store.setEnabledCurrencies(mockEnabledCurrencies)
    store.setApiKey('caos-engines-demo-key')
    store.setError(null)
    store.setIsLoadingCurrencies(false)
  }, [])

  return (
    <>
      <CaosThemeLoader />
      <div
        className="caos-theme"
        style={{
          background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f2e 100%)',
          minHeight: '100vh',
          padding: '20px',
          color: '#ffffff',
        }}
      >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '40px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <h1
          style={{
            color: '#e53e3e',
            fontSize: '2.5rem',
            textShadow: '0 0 20px rgba(229, 62, 62, 0.5)',
            marginBottom: '10px',
          }}
        >
          Caos Engines Theme Demo
        </h1>
        <p
          style={{
            color: '#00d4ff',
            fontSize: '1.2rem',
            textShadow: '0 0 15px rgba(0, 212, 255, 0.3)',
          }}
        >
          Cyberpunk-inspired theming for NOWPayments Components
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '30px',
          }}
        >
          <div
            style={{
              background: 'rgba(229, 62, 62, 0.1)',
              border: '1px solid #e53e3e',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 0 20px rgba(229, 62, 62, 0.3)',
            }}
          >
            <h3 style={{ color: '#e53e3e', marginTop: 0 }}>Primary Color</h3>
            <code style={{ color: '#ffffff' }}>#e53e3e</code>
          </div>
          <div
            style={{
              background: 'rgba(0, 212, 255, 0.1)',
              border: '1px solid #00d4ff',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
            }}
          >
            <h3 style={{ color: '#00d4ff', marginTop: 0 }}>Accent Color</h3>
            <code style={{ color: '#ffffff' }}>#00d4ff</code>
          </div>
          <div
            style={{
              background: 'rgba(6, 255, 165, 0.1)',
              border: '1px solid #06ffa5',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 0 20px rgba(6, 255, 165, 0.3)',
            }}
          >
            <h3 style={{ color: '#06ffa5', marginTop: 0 }}>Success Color</h3>
            <code style={{ color: '#ffffff' }}>#06ffa5</code>
          </div>
        </div>
      </div>

      <DepositModal
        isOpen={showDeposit}
        customerEmail={mockEmailProviders.static}
        enableEmail={false}
        {...createDepositActions()}
      />

      <WithdrawModal
        isOpen={showWithdraw}
        availableBalance={1000}
        balanceToUsdtConverter={mockBalanceToUsdtConverter}
        {...createWithdrawActions()}
      />
      </div>
    </>
  )
}

const meta = {
  title: 'Theming/Caos Engines Demo',
  component: ThemeShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Caos Engines Inspired Theme

This demonstration showcases the NOWPayments Components styled with a cyberpunk theme inspired by Caos Engines. The theme features:

## Color Palette
- **Primary Red**: \`#e53e3e\` - Bold red for primary actions and branding
- **Electric Blue**: \`#00d4ff\` - Cyan accent for highlights and secondary elements
- **Neon Green**: \`#06ffa5\` - Success states and positive feedback
- **Dark Navy**: \`#0a0e1a\` - Primary background for depth
- **Slate Blue**: \`#1a1f2e\` - Surface colors for cards and modals

## Visual Effects
- **Glow Effects**: Subtle neon glows on interactive elements
- **Gradients**: Linear gradients for depth and visual interest
- **Shadows**: Enhanced shadows for better depth perception
- **Hover States**: Smooth transitions with enhanced glow effects

## Theming Implementation
The theme is implemented through CSS custom properties, demonstrating the flexibility of the component library's theming system. All colors, effects, and styling can be customized without touching the component code.

## Use Cases
This theme would be perfect for:
- Gaming applications
- Fintech platforms with modern aesthetics
- Developer tools and APIs
- Crypto trading platforms
- Any application requiring a modern, high-tech appearance
        `,
      },
    },
  },
  argTypes: {
    showDeposit: {
      control: 'boolean',
      description: 'Show the deposit modal with Caos theme',
    },
    showWithdraw: {
      control: 'boolean',
      description: 'Show the withdraw modal with Caos theme',
    },
  },
} satisfies Meta<typeof ThemeShowcase>

export default meta
type Story = StoryObj<typeof meta>

// Theme overview story
export const Overview: Story = {
  args: {
    showDeposit: false,
    showWithdraw: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Overview of the Caos Engines theme with color palette showcase. Use the controls to open modals and see the theme in action.',
      },
    },
  },
}

// Deposit modal with Caos theme
export const DepositModalThemed: Story = {
  args: {
    showDeposit: true,
    showWithdraw: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'DepositModal component styled with the Caos Engines cyberpunk theme. Features glowing effects, dark surfaces, and red primary colors.',
      },
    },
  },
}

// Withdraw modal with Caos theme
export const WithdrawModalThemed: Story = {
  args: {
    showDeposit: false,
    showWithdraw: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'WithdrawModal component styled with the Caos Engines theme. Shows the balance slider, network selection, and form elements with cyberpunk styling.',
      },
    },
  },
}

// Both modals for comparison
export const BothModalsThemed: Story = {
  args: {
    showDeposit: true,
    showWithdraw: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Both modals displayed simultaneously to demonstrate theme consistency across all components. Perfect for testing overlay behavior and visual hierarchy.',
      },
    },
  },
}
