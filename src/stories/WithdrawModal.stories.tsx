import type { Meta, StoryObj } from '@storybook/react'
import { WithdrawModal } from '../components/WithdrawModal'
import { useNowPaymentsStore } from '../stores/nowPaymentsStore'
import React, { useState } from 'react'

const meta: Meta<typeof WithdrawModal> = {
  title: 'Modals/WithdrawModal',
  component: WithdrawModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      // Setup mock store
      const store = useNowPaymentsStore.getState()
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
    availableBalance: 1000,
    balanceToUsdtConverter: async (amount: number) => {
      // Simulate conversion rate
      await new Promise(resolve => setTimeout(resolve, 500))
      return amount * 0.95 // 5% conversion fee
    },
    onClose: () => console.log('Modal closed'),
    onSubmit: async (formData) => {
      console.log('Form submitted:', formData)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      return { success: true, withdrawalId: 'wd_123456' }
    },
    onSuccess: (response) => console.log('Success:', response),
    onError: (error) => console.error('Error:', error),
  },
}

export const HighBalance: Story = {
  args: {
    isOpen: true,
    availableBalance: 50000,
    balanceToUsdtConverter: async (amount: number) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return amount * 0.98 // Better rate for high amounts
    },
    onClose: () => console.log('Modal closed'),
    onSubmit: async (formData) => {
      console.log('High balance withdrawal:', formData)
      await new Promise(resolve => setTimeout(resolve, 2000))
      return { success: true, withdrawalId: 'wd_789012', estimatedTime: '2-4 hours' }
    },
    onSuccess: (response) => console.log('Success:', response),
    onError: (error) => console.error('Error:', error),
  },
}

export const SlowConversion: Story = {
  args: {
    isOpen: true,
    availableBalance: 1000,
    balanceToUsdtConverter: async (amount: number) => {
      // Simulate slow API
      await new Promise(resolve => setTimeout(resolve, 3000))
      return amount * 0.92
    },
    onClose: () => console.log('Modal closed'),
    onSubmit: async (formData) => {
      console.log('Form submitted:', formData)
      await new Promise(resolve => setTimeout(resolve, 2000))
      return { success: true, withdrawalId: 'wd_345678' }
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
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Open Withdraw Modal
        </button>

        <WithdrawModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          availableBalance={2500}
          balanceToUsdtConverter={async (amount: number) => {
            console.log(`💱 Converting ${amount} to USDT...`)

            // Simulate realistic conversion delay
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Simulate different rates based on amount
            let rate = 0.95
            if (amount > 1000) rate = 0.97
            if (amount > 5000) rate = 0.98

            const usdtAmount = amount * rate
            console.log(`💰 Converted: ${amount} → ${usdtAmount} USDT (rate: ${rate})`)

            return usdtAmount
          }}
          onSubmit={async (formData) => {
            console.log('📤 Withdraw Form Data:', formData)

            // Simulate backend processing
            await new Promise(resolve => setTimeout(resolve, 2500))

            const mockResponse = {
              success: true,
              withdrawalId: `wd_${Date.now()}`,
              amount: formData.amount,
              currency: formData.currency,
              destinationAddress: formData.destinationAddress,
              estimatedArrival: '2-4 hours',
              fee: formData.amount * 0.02, // 2% fee
              status: 'processing'
            }

            return mockResponse
          }}
          onSuccess={(response) => {
            console.log('✅ Withdrawal Success:', response)
            alert(`Withdrawal initiated successfully!\nWithdrawal ID: ${response.withdrawalId}\nEstimated arrival: ${response.estimatedArrival}`)
          }}
          onError={(error) => {
            console.error('❌ Withdrawal Error:', error)
            alert(`Withdrawal failed: ${error.message}`)
          }}
        />
      </div>
    )
  },
}