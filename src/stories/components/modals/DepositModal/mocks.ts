import type { Currency, DepositFormData } from '@/types'

// Mock currencies for deposit stories
export const mockCurrencies: Currency[] = [
  {
    id: 1,
    code: 'BTC',
    name: 'Bitcoin',
    enable: true,
    wallet_regex: '^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$',
    priority: 1,
    extra_id_exists: false,
    extra_id_regex: null,
    logo_url: '/images/coins/btc.svg',
    track: true,
    cg_id: 'bitcoin',
    is_maxlimit: false,
    network: 'btc',
    smart_contract: null,
    network_precision: 8,
  },
  {
    id: 2,
    code: 'ETH',
    name: 'Ethereum',
    enable: true,
    wallet_regex: '^0x[a-fA-F0-9]{40}$',
    priority: 2,
    extra_id_exists: false,
    extra_id_regex: null,
    logo_url: '/images/coins/eth.svg',
    track: true,
    cg_id: 'ethereum',
    is_maxlimit: false,
    network: 'eth',
    smart_contract: null,
    network_precision: 18,
  },
  {
    id: 3,
    code: 'USDT',
    name: 'Tether (TRC20)',
    enable: true,
    wallet_regex: '^T[A-Za-z1-9]{33}$',
    priority: 3,
    extra_id_exists: false,
    extra_id_regex: null,
    logo_url: '/images/coins/usdt.svg',
    track: true,
    cg_id: 'tether',
    is_maxlimit: false,
    network: 'tron',
    smart_contract: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    network_precision: 6,
  },
  {
    id: 4,
    code: 'USDTERC20',
    name: 'Tether (ERC20)',
    enable: true,
    wallet_regex: '^0x[a-fA-F0-9]{40}$',
    priority: 4,
    extra_id_exists: false,
    extra_id_regex: null,
    logo_url: '/images/coins/usdt.svg',
    track: true,
    cg_id: 'tether',
    is_maxlimit: false,
    network: 'eth',
    smart_contract: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    network_precision: 6,
  },
  {
    id: 5,
    code: 'LTC',
    name: 'Litecoin',
    enable: true,
    wallet_regex: '^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$',
    priority: 5,
    extra_id_exists: false,
    extra_id_regex: null,
    logo_url: '/images/coins/ltc.svg',
    track: true,
    cg_id: 'litecoin',
    is_maxlimit: false,
    network: 'ltc',
    smart_contract: null,
    network_precision: 8,
  },
  {
    id: 6,
    code: 'ADA',
    name: 'Cardano',
    enable: true,
    wallet_regex: '^addr1[a-z0-9]{98}$',
    priority: 6,
    extra_id_exists: false,
    extra_id_regex: null,
    logo_url: '/images/coins/ada.svg',
    track: true,
    cg_id: 'cardano',
    is_maxlimit: false,
    network: 'ada',
    smart_contract: null,
    network_precision: 6,
  },
  {
    id: 7,
    code: 'DOT',
    name: 'Polkadot',
    enable: true,
    wallet_regex: '^1[a-zA-Z0-9]{47}$',
    priority: 7,
    extra_id_exists: false,
    extra_id_regex: null,
    logo_url: '/images/coins/dot.svg',
    track: true,
    cg_id: 'polkadot',
    is_maxlimit: false,
    network: 'dot',
    smart_contract: null,
    network_precision: 10,
  },
  {
    id: 8,
    code: 'XRP',
    name: 'Ripple',
    enable: true,
    wallet_regex: '^r[a-zA-Z0-9]{24,34}$',
    priority: 8,
    extra_id_exists: true,
    extra_id_regex: '^[0-9]+$',
    logo_url: '/images/coins/xrp.svg',
    track: true,
    cg_id: 'ripple',
    is_maxlimit: false,
    network: 'xrp',
    smart_contract: null,
    network_precision: 6,
  }
]

export const mockEnabledCurrencies = ['bitcoin', 'ethereum', 'tether', 'litecoin', 'cardano', 'polkadot', 'ripple']

// Mock deposit API response
export const mockDepositResponse = {
  success: true,
  data: {
    paymentId: 'PAYMENT_123456789',
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    amount: 0.001,
    currency: 'bitcoin',
    explorerUrl: 'https://blockchair.com/bitcoin/transaction/123456789',
    qrCode: 'bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa?amount=0.001',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    notes: [
      'Send only Bitcoin (BTC) to this address',
      'Payment will be processed automatically',
      'Keep this payment ID for your records',
      'Transaction may take 10-60 minutes to confirm'
    ]
  }
}

// Email providers for testing
export const mockEmailProviders = {
  static: 'user@example.com',
  async: async (): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return 'async@example.com'
  }
}

// Deposit-specific action creators
export const createDepositActions = () => ({
  onSubmit: async (formData: DepositFormData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log('Deposit form submitted:', formData)

    // Simulate random success/error for demo
    if (Math.random() > 0.2) {
      return mockDepositResponse
    } else {
      throw new Error('Simulated deposit API error for demo purposes')
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Mock can receive any response structure
  onSuccess: (response: any) => {
    console.log('Deposit success callback:', response)
    alert(`Deposit successful! Payment ID: ${response.data.paymentId}`)

    // Return PaymentDetails for the component to display
    return {
      address: response.data.address,
      paymentId: response.data.paymentId,
    }
  },

  onError: (error: Error) => {
    console.error('Deposit error callback:', error)
    alert(`Deposit error: ${error.message}`)
  },

  onClose: () => {
    console.log('Deposit modal closed')
  }
})