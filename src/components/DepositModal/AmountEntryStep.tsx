import { FormEventHandler } from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import Input from '../shared/Input'
import Button from '../shared/Button'
import AmountCard from '../shared/AmountCard'

interface AmountEntryStepProps {
  register: UseFormRegister<{ amount: number; email?: string }>
  errors: FieldErrors<{ amount: number; email?: string }>
  amount: number | undefined
  isSubmitting: boolean
  showEmailInput: boolean
  customerEmail?: string | (() => Promise<string>)
  errorMessage?: string
  fixedAmounts?: number[]
  minimumAmount?: number | null
  minimumAmountUSD?: string | null
  selectedFixedAmount?: number | null
  onFixedAmountSelect?: (amount: number) => void
  onBack: () => void
  onSubmit: FormEventHandler<HTMLFormElement>
}

export function AmountEntryStep({
  register,
  errors,
  amount,
  isSubmitting,
  showEmailInput,
  customerEmail,
  errorMessage,
  fixedAmounts,
  minimumAmount,
  minimumAmountUSD,
  selectedFixedAmount,
  onFixedAmountSelect,
  onBack,
  onSubmit,
}: AmountEntryStepProps) {
  const shouldShowEmailInput = showEmailInput && !customerEmail
  return (
    <div>
      <h3 style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}>Enter deposit amount</h3>
      {errorMessage && (
        <div
          className="nowpayments-error"
          style={{ marginBottom: 'var(--nowpayments-spacing-md)' }}
        >
          {errorMessage}
        </div>
      )}
      {/* Fixed amounts section */}
      {fixedAmounts && fixedAmounts.length > 0 && (
        <div style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}>
          <label
            style={{
              display: 'block',
              marginBottom: 'var(--nowpayments-spacing-sm)',
              fontSize: 'var(--nowpayments-font-size-sm)',
              color: 'var(--nowpayments-on-surface-variant)',
            }}
          >
            Select an amount:
          </label>
          <div className="nowpayments-amount-cards">
            {fixedAmounts.map(amount => (
              <AmountCard
                key={amount}
                amount={amount}
                isSelected={selectedFixedAmount === amount}
                onClick={onFixedAmountSelect!}
              />
            ))}
          </div>
        </div>
      )}
      <form onSubmit={onSubmit}>
        <Input
          label="Amount"
          type="number"
          step="0.01"
          min={minimumAmount || 0}
          placeholder="0.00"
          error={errors.amount?.message}
          {...register('amount', {
            required: 'Amount is required',
            min: minimumAmount
              ? {
                  value: minimumAmount,
                  message: `El monto mínimo aceptado es de ${minimumAmountUSD} USD`,
                }
              : { value: 0.01, message: 'Amount must be greater than 0' },
            valueAsNumber: true,
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
                  message: 'Please enter a valid email address',
                },
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
          <Button variant="secondary" onClick={onBack} disabled={isSubmitting} type="button">
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
