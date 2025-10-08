import React, { useState, useRef, useEffect } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { ChevronDown, Search, Check } from 'lucide-react'
import type { NetworkConfig } from '@/types'

interface NetworkSelectorProps {
  networks: NetworkConfig[]
  selectedNetwork: string
  onSelect: (networkCode: string) => void
  register: UseFormRegister<{ currency: string; amount: number; destinationAddress: string }>
  disabled?: boolean
}

export function NetworkSelector({
  networks,
  selectedNetwork,
  onSelect,
  register,
  disabled = false,
}: NetworkSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const selectedNetworkData = networks.find(n => n.code === selectedNetwork)

  const filteredNetworks = networks.filter(
    network =>
      network.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      network.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      network.code.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleSelect = (networkCode: string) => {
    onSelect(networkCode)
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
        setHighlightedIndex(prev => (prev < filteredNetworks.length - 1 ? prev + 1 : prev))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && filteredNetworks[highlightedIndex]) {
          handleSelect(filteredNetworks[highlightedIndex].code)
        }
        break
    }
  }

  // Single network: Static display (readonly card style)
  if (networks.length === 1) {
    const network = networks[0]
    return (
      <div style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}>
        <input type="hidden" {...register('currency')} value={network.code} />
        <div className="nowpayments-network-option nowpayments-network-option--readonly">
          <div className="nowpayments-network-option__content">
            <div className="nowpayments-network-option__icon">
              <img src={network.logoPath} alt={network.name} width="24" height="24" />
            </div>
            <div className="nowpayments-network-option__info">
              <span className="nowpayments-network-option__name">USDT</span>
              <span className="nowpayments-network-option__network">{network.displayName}</span>
              <span className="nowpayments-network-option__hint">
                Enter a valid {network.displayName} address
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Two networks: Radio button grid
  if (networks.length === 2) {
    return (
      <div style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--nowpayments-spacing-sm)',
          }}
        >
          {networks.map(network => (
            <label key={network.code} className="nowpayments-network-option">
              <input
                type="radio"
                value={network.code}
                {...register('currency')}
                className="nowpayments-network-option__input"
                disabled={disabled}
              />
              <div className="nowpayments-network-option__content">
                <div className="nowpayments-network-option__icon">
                  <img src={network.logoPath} alt={network.name} width="24" height="24" />
                </div>
                <div className="nowpayments-network-option__info">
                  <span className="nowpayments-network-option__name">USDT</span>
                  <span className="nowpayments-network-option__network">{network.displayName}</span>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    )
  }

  // Three or more networks: Searchable dropdown
  return (
    <div
      className="nowpayments-network-selector"
      ref={dropdownRef}
      style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}
    >
      <input type="hidden" {...register('currency')} value={selectedNetwork} />
      <label className="nowpayments-network-selector__label">Network</label>

      <button
        type="button"
        className={`nowpayments-network-selector__trigger ${
          isOpen ? 'nowpayments-network-selector__trigger--open' : ''
        } ${disabled ? 'nowpayments-network-selector__trigger--disabled' : ''}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="nowpayments-network-selector__selected">
          {selectedNetworkData ? (
            <>
              <img
                src={selectedNetworkData.logoPath}
                alt={selectedNetworkData.name}
                className="nowpayments-network-selector__logo"
              />
              <div className="nowpayments-network-selector__info">
                <span className="nowpayments-network-selector__name">
                  {selectedNetworkData.name}
                </span>
                <span className="nowpayments-network-selector__code">USDT</span>
              </div>
            </>
          ) : (
            <span className="nowpayments-network-selector__placeholder">Select network...</span>
          )}
        </div>
        <ChevronDown
          className={`nowpayments-network-selector__chevron ${
            isOpen ? 'nowpayments-network-selector__chevron--open' : ''
          }`}
          size={20}
        />
      </button>

      {isOpen && (
        <div className="nowpayments-network-selector__dropdown">
          <div className="nowpayments-network-selector__search">
            <Search size={16} className="nowpayments-network-selector__search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search networks..."
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value)
                setHighlightedIndex(-1)
              }}
              className="nowpayments-network-selector__search-input"
            />
          </div>

          <div className="nowpayments-network-selector__list" role="listbox">
            {filteredNetworks.length === 0 ? (
              <div className="nowpayments-network-selector__no-results">
                No networks match your search.
              </div>
            ) : (
              filteredNetworks.map((network, index) => (
                <button
                  key={network.code}
                  type="button"
                  className={`nowpayments-network-selector__option ${
                    selectedNetwork === network.code
                      ? 'nowpayments-network-selector__option--selected'
                      : ''
                  } ${
                    index === highlightedIndex
                      ? 'nowpayments-network-selector__option--highlighted'
                      : ''
                  }`}
                  onClick={() => handleSelect(network.code)}
                  role="option"
                  aria-selected={selectedNetwork === network.code}
                >
                  <img
                    src={network.logoPath}
                    alt={network.name}
                    className="nowpayments-network-selector__option-logo"
                  />
                  <div className="nowpayments-network-selector__option-info">
                    <span className="nowpayments-network-selector__option-name">
                      {network.name}
                    </span>
                    <span className="nowpayments-network-selector__option-code">USDT</span>
                  </div>
                  {selectedNetwork === network.code && (
                    <Check size={16} className="nowpayments-network-selector__check" />
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

export default NetworkSelector
