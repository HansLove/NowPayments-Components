import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search, Check } from 'lucide-react'
import { useCurrencies } from '@/hooks/useCurrencies'
import LoadingSpinner from './LoadingSpinner'
import type { Currency } from '@/types'

interface CurrencySelectorProps {
  selectedCurrency?: string
  onSelect: (currency: Currency) => void
  disabled?: boolean
  label?: string
  placeholder?: string
}

export function CurrencySelector({
  selectedCurrency,
  onSelect,
  disabled = false,
  label = 'Currency',
  placeholder = 'Select currency...',
}: CurrencySelectorProps) {
  const { currencies, isLoading, getCurrencyLogo } = useCurrencies()
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const selectedCurrencyData = currencies.find(c => c.cg_id === selectedCurrency)

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm('')
        setHighlightedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  const handleToggle = () => {
    if (disabled) return
    setIsOpen(!isOpen)
    setSearchTerm('')
    setHighlightedIndex(-1)
  }

  const handleSelect = (currency: Currency) => {
    onSelect(currency)
    setIsOpen(false)
    setSearchTerm('')
    setHighlightedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setIsOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'Escape':
        setIsOpen(false)
        setSearchTerm('')
        setHighlightedIndex(-1)
        break
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev =>
          prev < filteredCurrencies.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && filteredCurrencies[highlightedIndex]) {
          handleSelect(filteredCurrencies[highlightedIndex])
        }
        break
    }
  }

  if (isLoading) {
    return (
      <div className="nowpayments-currency-selector">
        <div className="nowpayments-currency-selector__trigger nowpayments-currency-selector__trigger--loading">
          <LoadingSpinner size="sm" />
          <span>Loading currencies...</span>
        </div>
      </div>
    )
  }

  if (currencies.length === 0) {
    return (
      <div className="nowpayments-currency-selector">
        <div className="nowpayments-error">
          No currencies available. Make sure your NOWPayments API key is configured.
        </div>
      </div>
    )
  }

  return (
    <div className="nowpayments-currency-selector" ref={dropdownRef}>
      {label && (
        <label className="nowpayments-currency-selector__label">
          {label}
        </label>
      )}

      <button
        type="button"
        className={`nowpayments-currency-selector__trigger ${
          isOpen ? 'nowpayments-currency-selector__trigger--open' : ''
        } ${disabled ? 'nowpayments-currency-selector__trigger--disabled' : ''}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="nowpayments-currency-selector__selected">
          {selectedCurrencyData ? (
            <>
              <img
                src={getCurrencyLogo(selectedCurrencyData.cg_id)}
                alt={`${selectedCurrencyData.name} logo`}
                className="nowpayments-currency-selector__logo"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <div className="nowpayments-currency-selector__info">
                <span className="nowpayments-currency-selector__name">
                  {selectedCurrencyData.name}
                </span>
                <span className="nowpayments-currency-selector__code">
                  {selectedCurrencyData.code.toUpperCase()}
                </span>
              </div>
            </>
          ) : (
            <span className="nowpayments-currency-selector__placeholder">
              {placeholder}
            </span>
          )}
        </div>
        <ChevronDown
          className={`nowpayments-currency-selector__chevron ${
            isOpen ? 'nowpayments-currency-selector__chevron--open' : ''
          }`}
          size={20}
        />
      </button>

      {isOpen && (
        <div className="nowpayments-currency-selector__dropdown">
          <div className="nowpayments-currency-selector__search">
            <Search size={16} className="nowpayments-currency-selector__search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search currencies..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setHighlightedIndex(-1)
              }}
              className="nowpayments-currency-selector__search-input"
            />
          </div>

          <div className="nowpayments-currency-selector__list" role="listbox">
            {filteredCurrencies.length === 0 ? (
              <div className="nowpayments-currency-selector__no-results">
                No currencies match your search.
              </div>
            ) : (
              filteredCurrencies.map((currency, index) => (
                <button
                  key={currency.cg_id}
                  type="button"
                  className={`nowpayments-currency-selector__option ${
                    selectedCurrency === currency.cg_id
                      ? 'nowpayments-currency-selector__option--selected'
                      : ''
                  } ${
                    index === highlightedIndex
                      ? 'nowpayments-currency-selector__option--highlighted'
                      : ''
                  }`}
                  onClick={() => handleSelect(currency)}
                  role="option"
                  aria-selected={selectedCurrency === currency.cg_id}
                >
                  <img
                    src={getCurrencyLogo(currency.cg_id)}
                    alt={`${currency.name} logo`}
                    className="nowpayments-currency-selector__option-logo"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className="nowpayments-currency-selector__option-info">
                    <span className="nowpayments-currency-selector__option-name">
                      {currency.name}
                    </span>
                    <span className="nowpayments-currency-selector__option-code">
                      {currency.code.toUpperCase()}
                    </span>
                  </div>
                  {selectedCurrency === currency.cg_id && (
                    <Check size={16} className="nowpayments-currency-selector__check" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CurrencySelector