import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import Input from '../shared/Input'
import Button from '../shared/Button'

interface AmountEntryStepProps {
  register: UseFormRegister<{ amount: number; email?: string }>
  errors: FieldErrors<{ amount: number; email?: string }>
  amount: number | undefined
  isSubmitting: boolean
  showEmailInput: boolean
  customerEmail?: string | (() => Promise<string>)
  onBack: () => void
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

export function AmountEntryStep({
  register,
  errors,
  amount,
  isSubmitting,
  showEmailInput,
  customerEmail,
  onBack,
  onSubmit,
}: AmountEntryStepProps) {
  const shouldShowEmailInput = showEmailInput && !customerEmail
  return (
    <div>
      <h3 style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}>Enter deposit amount</h3>
      <form onSubmit={onSubmit}>
        <Input
          label="Amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          error={errors.amount?.message}
          {...register('amount', {
            required: 'Amount is required',
            min: { value: 0.01, message: 'Amount must be greater than 0' },
          })}
        />
        {shouldShowEmailInput && (
          <div style={{ marginTop: 'var(--nowpayments-spacing-md)' }}>
            <Input
              label="Email (optional)"
              type="email"
              placeholder="your@email.com"
              error={errors.email?.message}
              {...register('email', {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address'
                }
              })}
            />
          </div>
        )}
        <div
          style={{
            display: 'flex',
            gap: 'var(--nowpayments-spacing-md)',
            marginTop: 'var(--nowpayments-spacing-lg)',
          }}
        >
          <Button
            variant="secondary"
            onClick={onBack}
            disabled={isSubmitting}
            type="button"
          >
            Back
          </Button>
          <Button
            variant="primary"
            disabled={!amount || amount <= 0 || isSubmitting}
            loading={isSubmitting}
            type="submit"
          >
            Create Deposit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AmountEntryStep