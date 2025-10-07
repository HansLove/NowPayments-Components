import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import Input from '../shared/Input'
import Button from '../shared/Button'
// @ts-expect-error File exists
import TronLogo from '@/assets/tron-trx-logo.png'
// @ts-expect-error File exists
import PolygonLogo from '@/assets/polygon-matic-logo.png'

interface WithdrawForm {
  currency: 'usdttrc20' | 'usdtmatic'
  amount: number
  destinationAddress: string
}

interface WithdrawFormStepProps {
  register: UseFormRegister<WithdrawForm>
  errors: FieldErrors<WithdrawForm>
  watchedAmount: number
  availableBalance: number
  isSubmitting: boolean
  usdtAmount: number | null
  isConverting: boolean
  errorMessage: string
  onSubmit: React.FormEventHandler<HTMLFormElement>
  handleSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  withdrawPercentage: number
}

export function WithdrawFormStep({
  register,
  errors,
  watchedAmount,
  availableBalance,
  isSubmitting,
  usdtAmount,
  isConverting,
  errorMessage,
  onSubmit,
  handleSliderChange,
  withdrawPercentage,
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
        <div style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--nowpayments-spacing-sm)',
            }}
          >
            <label className="nowpayments-network-option">
              <input
                type="radio"
                value="usdttrc20"
                {...register('currency')}
                className="nowpayments-network-option__input"
              />
              <div className="nowpayments-network-option__content">
                <div className="nowpayments-network-option__icon">
                  <img src={TronLogo} alt="Tron" width="24" height="24" />
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
                  <img src={PolygonLogo} alt="Polygon" width="24" height="24" />
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
