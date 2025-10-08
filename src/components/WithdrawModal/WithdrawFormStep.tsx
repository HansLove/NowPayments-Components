import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import Input from '../shared/Input'
import Button from '../shared/Button'
import NetworkSelector from './NetworkSelector'
import type { NetworkConfig } from '@/types'

interface WithdrawForm {
  currency: string
  amount: number
  destinationAddress: string
}

interface WithdrawFormStepProps {
  register: UseFormRegister<WithdrawForm>
  errors: FieldErrors<WithdrawForm>
  watchedAmount: number
  watchedCurrency: string
  availableBalance: number
  isSubmitting: boolean
  usdtAmount: number | null
  isConverting: boolean
  errorMessage: string
  onSubmit: React.FormEventHandler<HTMLFormElement>
  handleSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  withdrawPercentage: number
  networkConfigs: NetworkConfig[]
  onNetworkSelect: (networkCode: string) => void
}

export function WithdrawFormStep({
  register,
  errors,
  watchedAmount,
  watchedCurrency,
  availableBalance,
  isSubmitting,
  usdtAmount,
  isConverting,
  errorMessage,
  onSubmit,
  handleSliderChange,
  withdrawPercentage,
  networkConfigs,
  onNetworkSelect,
}: WithdrawFormStepProps) {
  return (
    <div>
      {errorMessage && (
        <div
          className="nowpayments-error"
          style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={onSubmit}>
        {/* Network Selection */}
        <NetworkSelector
          networks={networkConfigs}
          selectedNetwork={watchedCurrency}
          onSelect={onNetworkSelect}
          register={register}
          disabled={isSubmitting}
        />

        {/* Amount Slider */}
        <div style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginBottom: 'var(--nowpayments-spacing-xs)',
            }}
          >
            <span
              style={{
                fontSize: 'var(--nowpayments-font-size-sm)',
                color: 'var(--nowpayments-on-surface-variant)',
              }}
            >
              {withdrawPercentage}% of balance
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={withdrawPercentage}
            onChange={handleSliderChange}
            disabled={isSubmitting}
            style={{
              width: '100%',
              marginTop: 'var(--nowpayments-spacing-sm)',
              marginBottom: 'var(--nowpayments-spacing-md)',
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'var(--nowpayments-font-size-sm)',
              color: 'var(--nowpayments-on-surface-variant)',
            }}
          >
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
            valueAsNumber: true,
            min: { value: 0.01, message: 'Amount must be greater than 0' },
            max: { value: availableBalance, message: 'Amount exceeds available balance' },
          })}
        />

        {/* USDT Conversion Display */}
        {watchedAmount > 0 && (
          <div
            style={{
              padding: 'var(--nowpayments-spacing-md)',
              backgroundColor: 'var(--nowpayments-surface-variant)',
              borderRadius: 'var(--nowpayments-radius)',
              marginBottom: 'var(--nowpayments-spacing-lg)',
            }}
          >
            <div style={{ fontSize: 'var(--nowpayments-font-size-sm)' }}>
              You will receive approximately:
            </div>
            <div
              style={{
                fontSize: 'var(--nowpayments-font-size-lg)',
                fontWeight: 'var(--nowpayments-font-weight-semibold)',
                marginTop: 'var(--nowpayments-spacing-xs)',
              }}
            >
              {isConverting && 'Converting...'}
              {!isConverting &&
                usdtAmount !== null &&
                !isNaN(usdtAmount) &&
                isFinite(usdtAmount) &&
                `${usdtAmount.toFixed(2)} USDT`}
              {!isConverting &&
                (usdtAmount === null || isNaN(usdtAmount) || !isFinite(usdtAmount)) &&
                'N/A'}
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
          disabled={isSubmitting || watchedAmount <= 0}
          style={{
            width: '100%',
            marginTop: 'var(--nowpayments-spacing-xl)',
          }}
        >
          Create Withdrawal
        </Button>
      </form>
    </div>
  )
}

export default WithdrawFormStep
