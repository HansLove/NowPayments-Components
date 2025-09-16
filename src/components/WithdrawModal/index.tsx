import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../shared/Modal'
import Input from '../shared/Input'
import Button from '../shared/Button'
import { useNowPaymentsStore } from '@/stores/nowPaymentsStore'
import type { WithdrawModalProps, WithdrawFormData } from '@/types'

// Network Icons
const TronIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0L24 6L20.25 18L12 24L3.75 18L0 6L12 0Z" fill="#FF0013"/>
    <path d="M12 4.5L19.5 8.25L16.875 16.5L12 19.5L7.125 16.5L4.5 8.25L12 4.5Z" fill="white"/>
    <path d="M12 7.5L16.5 9.75L14.625 14.25L12 15.75L9.375 14.25L7.5 9.75L12 7.5Z" fill="#FF0013"/>
  </svg>
)

const PolygonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0L24 12L12 24L0 12L12 0Z" fill="#8247E5"/>
    <path d="M12 3L21 12L12 21L3 12L12 3Z" fill="white"/>
    <path d="M8.5 9.5L12 6L15.5 9.5L12 13L8.5 9.5Z" fill="#8247E5"/>
    <path d="M8.5 14.5L12 11L15.5 14.5L12 18L8.5 14.5Z" fill="#8247E5"/>
  </svg>
)

interface WithdrawForm {
  currency: 'usdttrc20' | 'usdtmatic'
  amount: number | undefined
  destinationAddress: string
}

export function WithdrawModal({
  isOpen,
  onClose,
  availableBalance,
  balanceToUsdtConverter,
  onSubmit,
  onSuccess,
  onError,
}: WithdrawModalProps) {
  const { error: storeError } = useNowPaymentsStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [usdtAmount, setUsdtAmount] = useState<number | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [shouldFocusAmount, setShouldFocusAmount] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<WithdrawForm>({
    defaultValues: {
      currency: 'usdttrc20',
      amount: undefined,
      destinationAddress: '',
    },
  })

  const watchedAmount = watch('amount')

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      reset({
        currency: 'usdttrc20',
        amount: undefined,
        destinationAddress: '',
      })
      setIsSubmitting(false)
      setUsdtAmount(null)
    }
  }, [isOpen, reset])

  // Convert balance to USDT when amount changes
  useEffect(() => {
    if (watchedAmount && watchedAmount > 0) {
      setIsConverting(true)
      balanceToUsdtConverter(watchedAmount)
        .then(setUsdtAmount)
        .catch(() => setUsdtAmount(null))
        .finally(() => setIsConverting(false))
    } else {
      setUsdtAmount(null)
    }
  }, [watchedAmount, balanceToUsdtConverter])

  // Focus amount input when slider changes value
  useEffect(() => {
    if (shouldFocusAmount) {
      const amountInput = document.querySelector('input[name="amount"]') as HTMLInputElement
      if (amountInput) {
        amountInput.focus()
        setTimeout(() => amountInput.blur(), 100)
      }
      setShouldFocusAmount(false)
    }
  }, [shouldFocusAmount])

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const percentage = Number(event.target.value)
    const amount = (availableBalance * percentage) / 100
    setValue('amount', Number(amount.toFixed(2)))
    setShouldFocusAmount(true)
  }

  const getWithdrawPercentage = () => {
    if (!watchedAmount || availableBalance === 0) return 0
    return Math.round((watchedAmount / availableBalance) * 100)
  }

  const onFormSubmit = async (data: WithdrawForm) => {
    setIsSubmitting(true)

    try {
      const formData: WithdrawFormData = {
        currency: data.currency,
        amount: data.amount || 0,
        destinationAddress: data.destinationAddress,
      }

      const result = await onSubmit(formData)

      onSuccess?.(result)
      onClose()
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error occurred')
      onError?.(errorObj)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Withdraw Funds">
      <div className="nowpayments-modal">
        {storeError && (
          <div className="nowpayments-error" style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}>
            {storeError}
          </div>
        )}

        <form onSubmit={handleSubmit(onFormSubmit)}>
          {/* Network Selection */}
          <div style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--nowpayments-spacing-sm)'
            }}>
              <label className="nowpayments-network-option">
                <input
                  type="radio"
                  value="usdttrc20"
                  {...register('currency')}
                  className="nowpayments-network-option__input"
                />
                <div className="nowpayments-network-option__content">
                  <div className="nowpayments-network-option__icon">
                    <TronIcon />
                  </div>
                  <div className="nowpayments-network-option__info">
                    <span className="nowpayments-network-option__name">USDT</span>
                    <span className="nowpayments-network-option__network">Tron Network</span>
                  </div>
                </div>
              </label>
              <label className="nowpayments-network-option">
                <input
                  type="radio"
                  value="usdtmatic"
                  {...register('currency')}
                  className="nowpayments-network-option__input"
                />
                <div className="nowpayments-network-option__content">
                  <div className="nowpayments-network-option__icon">
                    <PolygonIcon />
                  </div>
                  <div className="nowpayments-network-option__info">
                    <span className="nowpayments-network-option__name">USDT</span>
                    <span className="nowpayments-network-option__network">Polygon Network</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Amount Slider */}
          <div style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              alignItems: 'center',
              marginBottom: 'var(--nowpayments-spacing-xs)'
            }}>
              <span style={{ 
                fontSize: 'var(--nowpayments-font-size-sm)',
                color: 'var(--nowpayments-on-surface-variant)'
              }}>
                {getWithdrawPercentage()}% of balance
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={getWithdrawPercentage()}
              onChange={handleSliderChange}
              disabled={isSubmitting}
              style={{
                width: '100%',
                marginTop: 'var(--nowpayments-spacing-sm)',
                marginBottom: 'var(--nowpayments-spacing-md)'
              }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--nowpayments-font-size-sm)',
              color: 'var(--nowpayments-on-surface-variant)'
            }}>
              <span>0</span>
              <span>Available: {availableBalance}</span>
            </div>
          </div>

          {/* Exact Amount Input */}
          <Input
            label="Exact Amount"
            type="number"
            step="0.01"
            min="0"
            max={availableBalance}
            placeholder="0.00"
            error={errors.amount?.message}
            disabled={isSubmitting}
            {...register('amount', {
              required: 'Amount is required',
              min: { value: 0.01, message: 'Amount must be greater than 0' },
              max: { value: availableBalance, message: 'Amount exceeds available balance' },
            })}
          />

          {/* USDT Conversion Display */}
          {watchedAmount && watchedAmount > 0 && (
            <div style={{
              padding: 'var(--nowpayments-spacing-md)',
              backgroundColor: 'var(--nowpayments-surface-variant)',
              borderRadius: 'var(--nowpayments-radius)',
              marginBottom: 'var(--nowpayments-spacing-lg)'
            }}>
              <div style={{ fontSize: 'var(--nowpayments-font-size-sm)' }}>
                You will receive approximately:
              </div>
              <div style={{
                fontSize: 'var(--nowpayments-font-size-lg)',
                fontWeight: 'var(--nowpayments-font-weight-semibold)',
                marginTop: 'var(--nowpayments-spacing-xs)'
              }}>
                {isConverting ? 'Converting...' : usdtAmount ? `${usdtAmount.toFixed(2)} USDT` : 'N/A'}
              </div>
            </div>
          )}

          {/* Destination Address */}
          <Input
            label="Destination Address"
            placeholder="Enter your wallet address"
            error={errors.destinationAddress?.message}
            disabled={isSubmitting}
            {...register('destinationAddress', {
              required: 'Destination address is required',
              minLength: { value: 20, message: 'Invalid wallet address' },
            })}
          />

          {/* Submit Button */}
          <Button
            variant="primary"
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting || !watchedAmount || watchedAmount <= 0}
            style={{
              width: '100%',
              marginTop: 'var(--nowpayments-spacing-xl)'
            }}
          >
            Create Withdrawal
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export default WithdrawModal