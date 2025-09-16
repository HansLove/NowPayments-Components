import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../shared/Modal'
import Input from '../shared/Input'
import Button from '../shared/Button'
import { useNowPaymentsStore } from '@/stores/nowPaymentsStore'
import type { WithdrawModalProps, WithdrawFormData } from '@/types'

interface WithdrawForm {
  currency: 'usdttrc20' | 'usdtmatic'
  amount: number
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
      amount: 0,
      destinationAddress: '',
    },
  })

  const watchedAmount = watch('amount')

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      reset({
        currency: 'usdttrc20',
        amount: 0,
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

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const percentage = Number(event.target.value)
    const amount = (availableBalance * percentage) / 100
    setValue('amount', Number(amount.toFixed(2)))
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
        amount: data.amount,
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
            <label className="nowpayments-label">Network</label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--nowpayments-spacing-sm)',
              marginTop: 'var(--nowpayments-spacing-sm)'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--nowpayments-spacing-sm)',
                padding: 'var(--nowpayments-spacing-md)',
                border: '1px solid var(--nowpayments-border)',
                borderRadius: 'var(--nowpayments-radius)',
                cursor: 'pointer'
              }}>
                <input
                  type="radio"
                  value="usdttrc20"
                  {...register('currency')}
                />
                <span>USDT (Tron)</span>
              </label>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--nowpayments-spacing-sm)',
                padding: 'var(--nowpayments-spacing-md)',
                border: '1px solid var(--nowpayments-border)',
                borderRadius: 'var(--nowpayments-radius)',
                cursor: 'pointer'
              }}>
                <input
                  type="radio"
                  value="usdtmatic"
                  {...register('currency')}
                />
                <span>USDT (Polygon)</span>
              </label>
            </div>
          </div>

          {/* Amount Slider */}
          <div style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}>
            <label className="nowpayments-label">
              Withdraw Amount ({getWithdrawPercentage()}% of balance)
            </label>
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
          {watchedAmount > 0 && (
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