import type { Meta, StoryObj } from '@storybook/react'
import { DepositModal } from '../components/DepositModal'
import { useNowPaymentsStore } from '../stores/nowPaymentsStore'
import type { Currency } from '../types'
import React, { useState } from 'react'

// Mock currencies for Storybook
const mockCurrencies: Currency[] = [
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
    cg_id: 'btc',
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
    wallet_regex: '^(0x)[0-9A-Fa-f]{40}$',
    priority: 2,
    extra_id_exists: false,
    extra_id_regex: null,
    logo_url: '/images/coins/eth.svg',
    track: true,
    cg_id: 'eth',
    is_maxlimit: false,
    network: 'eth',
    smart_contract: null,
    network_precision: 18,
  },
  {
    id: 3,
    code: 'USDT',
    name: 'Tether',
    enable: true,
    wallet_regex: '^(0x)[0-9A-Fa-f]{40}$',
    priority: 3,
    extra_id_exists: false,
    extra_id_regex: null,
    logo_url: '/images/coins/usdt.svg',
    track: true,
    cg_id: 'usdt',
    is_maxlimit: false,
    network: 'eth',
    smart_contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    network_precision: 6,
  },
]

const meta: Meta<typeof DepositModal> = {
  title: 'Modals/DepositModal',
  component: DepositModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      // Setup mock store
      const store = useNowPaymentsStore.getState()
      store.setCurrencies(mockCurrencies)
      store.setEnabledCurrencies(['btc', 'eth', 'usdt'])
      store.setApiKey('mock-api-key')

      return <Story />
    },
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOpen: true,
    customerEmail: 'user@example.com',
    onClose: () => console.log('Modal closed'),
    onSubmit: async (formData) => {
      console.log('Form submitted:', formData)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      return { success: true, transactionId: 'tx_123456' }
    },
    onSuccess: (response) => console.log('Success:', response),
    onError: (error) => console.error('Error:', error),
  },
}

export const WithAsyncEmail: Story = {
  args: {
    isOpen: true,
    customerEmail: async () => {
      // Simulate fetching email from API
      await new Promise(resolve => setTimeout(resolve, 1000))
      return 'async-user@example.com'
    },
    onClose: () => console.log('Modal closed'),
    onSubmit: async (formData) => {
      console.log('Form submitted:', formData)
      await new Promise(resolve => setTimeout(resolve, 2000))
      return { success: true, transactionId: 'tx_789012' }
    },
    onSuccess: (response) => console.log('Success:', response),
    onError: (error) => console.error('Error:', error),
  },
}

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Open Deposit Modal
        </button>

        <DepositModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          customerEmail="interactive-user@example.com"
          onSubmit={async (formData) => {
            console.log('📝 Form Data:', formData)

            // Simulate API call to backend
            await new Promise(resolve => setTimeout(resolve, 2000))

            const mockResponse = {
              success: true,
              transactionId: `tx_${Date.now()}`,
              amount: formData.amount,
              currency: formData.selectedCurrency,
              paymentAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
              status: 'pending'
            }

            return mockResponse
          }}
          onSuccess={(response) => {
            console.log('✅ Success Response:', response)
            alert(`Deposit created successfully!\nTransaction ID: ${response.transactionId}`)
          }}
          onError={(error) => {
            console.error('❌ Error:', error)
            alert(`Error: ${error.message}`)
          }}
        />
      </div>
    )
  },
}