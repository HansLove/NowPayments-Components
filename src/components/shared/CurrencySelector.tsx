import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useCurrencies } from '@/hooks/useCurrencies'
import LoadingSpinner from './LoadingSpinner'
import Input from './Input'
import type { Currency } from '@/types'

interface CurrencySelectorProps {
  selectedCurrency?: string
  onSelect: (currency: Currency) => void
  disabled?: boolean
}

export function CurrencySelector({
  selectedCurrency,
  onSelect,
  disabled = false,
}: CurrencySelectorProps) {
  const { currencies, isLoading, getCurrencyLogo } = useCurrencies()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (currencies.length === 0) {
    return (
      <div className="nowpayments-error">
        No currencies available. Make sure your NOWPayments API key is configured.
      </div>
    )
  }

  return (
    <div className="nowpayments-currency-selector">
      <Input
        placeholder="Search currencies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={disabled}
        style={{ marginBottom: 'var(--nowpayments-spacing-md)' }}
      />

      <div className="nowpayments-currency-list">
        {filteredCurrencies.map((currency) => (
          <button
            key={currency.cg_id}
            className={`nowpayments-currency-item ${
              selectedCurrency === currency.cg_id
                ? 'nowpayments-currency-item--selected'
                : ''
            }`}
            onClick={() => onSelect(currency)}
            disabled={disabled}
            type="button"
          >
            <img
              src={getCurrencyLogo(currency.cg_id)}
              alt={`${currency.name} logo`}
              className="nowpayments-currency-item__logo"
              onError={(e) => {
                // Fallback to a placeholder or hide image
                e.currentTarget.style.display = 'none'
              }}
            />
            <div className="nowpayments-currency-item__info">
              <div className="nowpayments-currency-item__name">
                {currency.name}
              </div>
              <div className="nowpayments-currency-item__code">
                {currency.code.toUpperCase()}
              </div>
            </div>
          </button>
        ))}
      </div>

      {filteredCurrencies.length === 0 && (
        <div className="nowpayments-error">
          No currencies match your search.
        </div>
      )}
    </div>
  )
}

export default CurrencySelector