import type { Meta, StoryObj } from '@storybook/react'
import { CurrencySelector } from '../components/shared/CurrencySelector'
import { useNowPaymentsStore } from '../stores/nowPaymentsStore'
import type { Currency } from '../types'

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

const meta: Meta<typeof CurrencySelector> = {
  title: 'Components/CurrencySelector',
  component: CurrencySelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      // Mock the store with currencies
      const store = useNowPaymentsStore.getState()
      store.setCurrencies(mockCurrencies)
      store.setEnabledCurrencies(['btc', 'eth', 'usdt'])
      store.setApiKey('mock-api-key')

      return (
        <div style={{ width: '400px', height: '500px' }}>
          <Story />
        </div>
      )
    },
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSelect: (currency) => console.log('Selected currency:', currency),
  },
}

export const WithSelection: Story = {
  args: {
    selectedCurrency: 'btc',
    onSelect: (currency) => console.log('Selected currency:', currency),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    onSelect: (currency) => console.log('Selected currency:', currency),
  },
}

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string>()

    return (
      <div>
        <CurrencySelector
          selectedCurrency={selected}
          onSelect={(currency) => setSelected(currency.cg_id)}
        />
        {selected && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f0f0', borderRadius: '0.5rem' }}>
            <strong>Selected:</strong> {selected.toUpperCase()}
          </div>
        )}
      </div>
    )
  },
}

// Add React import for the Interactive story
import React from 'react'