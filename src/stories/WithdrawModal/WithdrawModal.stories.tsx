import type { Meta, StoryObj } from '@storybook/react'
import { WithdrawModal } from '../../components/WithdrawModal'
import {
  createWithdrawActions,
  mockBalanceToUsdtConverter,
  createSlowConverter,
  createErrorConverter
} from './mocks'

const meta = {
  title: 'NOWPayments/WithdrawModal',
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

// Low balance scenario
export const LowBalance: Story = {
  args: {
    isOpen: true,
    availableBalance: 25.50,
    balanceToUsdtConverter: mockBalanceToUsdtConverter,
    ...createWithdrawActions()
  },
  parameters: {
    docs: {
      description: {
        story: 'Testing withdrawal with low available balance. The slider and input should respect the maximum available amount.'
      }
    }
  }
}

// Very high balance
export const HighBalance: Story = {
  args: {
    isOpen: true,
    availableBalance: 50000,
    balanceToUsdtConverter: mockBalanceToUsdtConverter,
    ...createWithdrawActions()
  },
  parameters: {
    docs: {
      description: {
        story: 'Testing withdrawal with high balance. Users can withdraw substantial amounts with proper validation.'
      }
    }
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

// Minimal balance (just above minimum)
export const MinimalBalance: Story = {
  args: {
    isOpen: true,
    availableBalance: 10.01,
    balanceToUsdtConverter: mockBalanceToUsdtConverter,
    ...createWithdrawActions()
  },
  parameters: {
    docs: {
      description: {
        story: 'Testing with minimal balance just above withdrawal minimum. Tests edge cases for validation.'
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

// Closed modal
export const Closed: Story = {
  args: {
    isOpen: false,
    availableBalance: 1000,
    balanceToUsdtConverter: mockBalanceToUsdtConverter,
    ...createWithdrawActions()
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal in closed state. Use the controls to open it and test the opening behavior.'
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

// Testing large amounts (close to maximum)
export const LargeAmount: Story = {
  args: {
    isOpen: true,
    availableBalance: 9999.99,
    balanceToUsdtConverter: mockBalanceToUsdtConverter,
    ...createWithdrawActions()
  },
  parameters: {
    docs: {
      description: {
        story: 'Testing withdrawal of large amounts close to maximum balance. Validates handling of edge cases and number formatting.'
      }
    }
  }
}