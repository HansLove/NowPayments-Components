import type { Meta, StoryObj } from '@storybook/react-vite'
import { WithdrawModal } from '@/components/WithdrawModal'
import { USDTNetwork } from '@/index'
import {
  createWithdrawActions,
  mockBalanceToUsdtConverter,
  createSlowConverter,
  createErrorConverter
} from './mocks'

const meta = {
  title: 'NOWPayments/Components/Modals/WithdrawModal',
  component: WithdrawModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
WithdrawModal is a single-form cryptocurrency withdrawal component that allows users to:

1. **Select Network** - Choose between USDT on Tron (TRC20) or Polygon (Matic) networks
2. **Set Amount** - Use slider or direct input with real-time USDT conversion
3. **Enter Address** - Input destination wallet address with validation
4. **Confirm & Submit** - Review details and process withdrawal

## Key Features

- **Network Selection** with visual icons for Tron and Polygon
- **Dual Amount Input** - Slider for quick selection + precise input field
- **Real-time Conversion** - Live USDT equivalent display
- **Address Validation** - Network-specific wallet address validation
- **Balance Integration** - Shows available balance and prevents over-withdrawal
- **Responsive Design** - Mobile-optimized interface

## Architecture

The component receives available balance and conversion function as props. It outputs a fixed \`WithdrawFormData\` schema to your backend, which handles the actual withdrawal processing via NOWPayments or your preferred service.
        `
      }
    }
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls modal visibility'
    },
    availableBalance: {
      control: { type: 'number', min: 0, max: 10000, step: 0.01 },
      description: 'User\'s available balance for withdrawal'
    },
    balanceToUsdtConverter: {
      description: 'Async function to convert balance amount to USDT equivalent'
    },
    onSubmit: {
      action: 'submitted',
      description: 'Callback when form is submitted with WithdrawFormData'
    },
    onSuccess: {
      action: 'success',
      description: 'Callback when submission succeeds'
    },
    onError: {
      action: 'error',
      description: 'Callback when submission fails'
    },
    onClose: {
      action: 'closed',
      description: 'Callback when modal is closed'
    }
  }
} satisfies Meta<typeof WithdrawModal>

export default meta
type Story = StoryObj<typeof meta>

// Default story with substantial balance
export const Default: Story = {
  args: {
    isOpen: true,
    availableBalance: 1000,
    balanceToUsdtConverter: mockBalanceToUsdtConverter,
    ...createWithdrawActions()
  }
}


// Zero balance state
export const ZeroBalance: Story = {
  args: {
    isOpen: true,
    availableBalance: 0,
    balanceToUsdtConverter: mockBalanceToUsdtConverter,
    ...createWithdrawActions()
  },
  parameters: {
    docs: {
      description: {
        story: 'No available balance for withdrawal. The form should be disabled or show appropriate messaging.'
      }
    }
  }
}


// Slow conversion function
export const SlowConversion: Story = {
  args: {
    isOpen: true,
    availableBalance: 500,
    balanceToUsdtConverter: createSlowConverter(3000),
    ...createWithdrawActions()
  },
  parameters: {
    docs: {
      description: {
        story: 'Testing with slow conversion API. Shows loading states while USDT equivalent is being calculated.'
      }
    }
  }
}

// Conversion error scenario
export const ConversionError: Story = {
  args: {
    isOpen: true,
    availableBalance: 750,
    balanceToUsdtConverter: createErrorConverter('Exchange rate service temporarily unavailable'),
    ...createWithdrawActions()
  },
  parameters: {
    docs: {
      description: {
        story: 'Testing conversion error handling. Shows how the component behaves when USDT conversion fails.'
      }
    }
  }
}


// Mobile viewport
export const Mobile: Story = {
  args: {
    isOpen: true,
    availableBalance: 1000,
    balanceToUsdtConverter: mockBalanceToUsdtConverter,
    ...createWithdrawActions()
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Modal displayed on mobile viewport to test responsive behavior, slider interactions, and touch UI.'
      }
    }
  }
}

// Pre-filled with Tron network
export const PrefilledTron: Story = {
  args: {
    isOpen: true,
    availableBalance: 1000,
    balanceToUsdtConverter: mockBalanceToUsdtConverter,
    ...createWithdrawActions()
  },
  parameters: {
    docs: {
      description: {
        story: 'Testing with Tron (TRC20) network pre-selected. Shows Tron-specific address validation and UI elements.'
      }
    }
  }
}

// Pre-filled with Polygon network
export const PrefilledPolygon: Story = {
  args: {
    isOpen: true,
    availableBalance: 1000,
    balanceToUsdtConverter: mockBalanceToUsdtConverter,
    ...createWithdrawActions()
  },
  parameters: {
    docs: {
      description: {
        story: 'Testing with Polygon (Matic) network pre-selected. Shows Polygon-specific address validation and UI elements.'
      }
    }
  }
}

// Edge cases story (consolidating multiple scenarios)
export const EdgeCases: Story = {
  args: {
    isOpen: true,
    availableBalance: 10.01,
    balanceToUsdtConverter: mockBalanceToUsdtConverter,
    ...createWithdrawActions()
  },
  parameters: {
    docs: {
      description: {
        story: 'Testing edge cases with minimal balance above withdrawal minimum. Use controls to test different balance amounts and edge scenarios.'
      }
    }
  }
}

// Network Configuration Stories

// Single network - Static display
export const SingleNetwork: Story = {
  args: {
    isOpen: true,
    availableBalance: 1000,
    balanceToUsdtConverter: mockBalanceToUsdtConverter,
    supportedNetworks: [USDTNetwork.USDTTRC20],
    ...createWithdrawActions()
  },
  parameters: {
    docs: {
      description: {
        story: 'Only one network available (Tron). Shows static network info instead of selection UI. The user sees a notice indicating their address must be on the Tron Network.'
      }
    }
  }
}

// Two networks - Binary selection (default behavior)
export const TwoNetworks: Story = {
  args: {
    isOpen: true,
    availableBalance: 1000,
    balanceToUsdtConverter: mockBalanceToUsdtConverter,
    supportedNetworks: [USDTNetwork.USDTTRC20, USDTNetwork.USDTMATIC],
    ...createWithdrawActions()
  },
  parameters: {
    docs: {
      description: {
        story: 'Two networks available (Tron and Polygon). Shows a grid with radio buttons for binary selection - the default UI pattern.'
      }
    }
  }
}

// Multiple networks - Searchable dropdown
export const MultipleNetworks: Story = {
  args: {
    isOpen: true,
    availableBalance: 1000,
    balanceToUsdtConverter: mockBalanceToUsdtConverter,
    supportedNetworks: [
      USDTNetwork.USDTTRC20,
      USDTNetwork.USDTMATIC,
      USDTNetwork.USDTBSC,
      USDTNetwork.USDTARB,
      USDTNetwork.USDTSOL
    ],
    ...createWithdrawActions()
  },
  parameters: {
    docs: {
      description: {
        story: 'Five networks available (Tron, Polygon, BSC, Arbitrum, Solana). Shows a searchable dropdown selector for easier navigation when multiple options exist.'
      }
    }
  }
}