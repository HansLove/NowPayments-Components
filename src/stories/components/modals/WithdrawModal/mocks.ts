import type { WithdrawFormData } from '@/types'

// Mock withdraw API response
export const mockWithdrawResponse = {
  success: true,
  data: {
    transactionId: 'WITHDRAW_987654321',
    amount: 100,
    currency: 'usdttrc20',
    destinationAddress: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
    estimatedArrival: '5-15 minutes',
    fee: 1.5,
    exchangeRate: 0.95,
    status: 'processing',
    explorerUrl: 'https://tronscan.org/#/transaction/987654321'
  }
}

// Balance converter for withdraw modal
export const mockBalanceToUsdtConverter = async (amount: number): Promise<number> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Mock conversion rate (1 unit = 0.95 USDT)
  return amount * 0.95
}

// Withdraw-specific action creators
export const createWithdrawActions = () => ({
  onSubmit: async (formData: WithdrawFormData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log('Withdraw form submitted:', formData)

    // Simulate random success/error for demo
    if (Math.random() > 0.2) {
      return mockWithdrawResponse
    } else {
      throw new Error('Simulated withdraw API error for demo purposes')
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Mock can receive any response structure
  onSuccess: (response: any) => {
    console.log('Withdraw success callback:', response)
    alert(`Withdrawal successful! Transaction ID: ${response.data.transactionId}`)

    // Return WithdrawalDetails for the component to display
    return {
      transactionId: response.data.transactionId
    }
  },

  onError: (error: Error) => {
    console.error('Withdraw error callback:', error)
    alert(`Withdrawal error: ${error.message}`)
  },

  onClose: () => {
    console.log('Withdraw modal closed')
  }
})

// Network-specific mock data
export const mockNetworkData = {
  tron: {
    name: 'Tron (TRC20)',
    currency: 'usdttrc20' as const,
    validAddress: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
    invalidAddress: 'invalid-tron-address',
    addressRegex: /^T[A-Za-z1-9]{33}$/,
    minWithdraw: 10,
    maxWithdraw: 10000,
    fee: 1.0
  },
  polygon: {
    name: 'Polygon (Matic)',
    currency: 'usdtmatic' as const,
    validAddress: '0x742d35Cc6634C0532925a3b8D3aAC226fb32d27c',
    invalidAddress: 'invalid-polygon-address',
    addressRegex: /^0x[a-fA-F0-9]{40}$/,
    minWithdraw: 5,
    maxWithdraw: 50000,
    fee: 0.5
  }
}

// Helper functions for testing different scenarios
export const createSlowConverter = (delay: number = 3000) =>
  async (amount: number): Promise<number> => {
    await new Promise(resolve => setTimeout(resolve, delay))
    return amount * 0.95
  }

export const createErrorConverter = (errorMessage: string = 'Exchange rate service temporarily unavailable') =>
  async (): Promise<number> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    throw new Error(errorMessage)
  }

export const createCustomConverter = (rate: number) =>
  async (amount: number): Promise<number> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return amount * rate
  }