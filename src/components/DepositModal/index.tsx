import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../shared/Modal'
import Stepper from '../shared/Stepper'
import CurrencySelector from '../shared/CurrencySelector'
import Input from '../shared/Input'
import Button from '../shared/Button'
import { useNowPaymentsStore } from '@/stores/nowPaymentsStore'
import type { DepositModalProps, DepositFormData, Currency, StepperStep } from '@/types'

const STEPS: StepperStep[] = [
  { id: 1, title: 'Select Currency', completed: false, active: true },
  { id: 2, title: 'Enter Amount', completed: false, active: false },
  { id: 3, title: 'Confirm Details', completed: false, active: false },
]

export function DepositModal({
  isOpen,
  onClose,
  customerEmail,
  onSubmit,
  onSuccess,
  onError,
}: DepositModalProps) {
  const { error: storeError } = useNowPaymentsStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [steps, setSteps] = useState(STEPS)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<{ amount: number }>()

  const amount = watch('amount')

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      reset()
      setCurrentStep(1)
      setSelectedCurrency(null)
      setIsSubmitting(false)
      setSteps(STEPS)
    }
  }, [isOpen, reset])

  // Update steps based on current step
  useEffect(() => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => ({
        ...step,
        completed: step.id < currentStep,
        active: step.id === currentStep,
      }))
    )
  }, [currentStep])

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency)
    setCurrentStep(2)
  }

  const handleAmountSubmit = () => {
    if (amount && amount > 0) {
      setCurrentStep(3)
    }
  }

  const handleFinalSubmit = async () => {
    if (!selectedCurrency || !amount) return

    setIsSubmitting(true)

    try {
      // Get customer email
      const email = typeof customerEmail === 'function'
        ? await customerEmail()
        : customerEmail

      const formData: DepositFormData = {
        selectedCurrency: selectedCurrency.cg_id,
        amount,
        customerEmail: email,
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}>
              Choose your preferred cryptocurrency
            </h3>
            <CurrencySelector
              selectedCurrency={selectedCurrency?.cg_id}
              onSelect={handleCurrencySelect}
              disabled={isSubmitting}
            />
          </div>
        )

      case 2:
        return (
          <div>
            <h3 style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}>
              Enter deposit amount
            </h3>
            <form onSubmit={handleSubmit(handleAmountSubmit)}>
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
              <div style={{
                display: 'flex',
                gap: 'var(--nowpayments-spacing-md)',
                marginTop: 'var(--nowpayments-spacing-lg)'
              }}>
                <Button
                  variant="secondary"
                  onClick={() => setCurrentStep(1)}
                  disabled={isSubmitting}
                  type="button"
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  disabled={!amount || amount <= 0 || isSubmitting}
                  type="submit"
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>
        )

      case 3:
        return (
          <div>
            <h3 style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}>
              Confirm your deposit
            </h3>

            <div style={{ marginBottom: 'var(--nowpayments-spacing-xl)' }}>
              <div className="nowpayments-summary">
                <div className="nowpayments-summary__row">
                  <span>Currency:</span>
                  <span>
                    {selectedCurrency?.name} ({selectedCurrency?.code.toUpperCase()})
                  </span>
                </div>
                <div className="nowpayments-summary__row">
                  <span>Amount:</span>
                  <span>{amount}</span>
                </div>
                <div className="nowpayments-summary__row">
                  <span>Email:</span>
                  <span>
                    {typeof customerEmail === 'string' ? customerEmail : 'Loading...'}
                  </span>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: 'var(--nowpayments-spacing-md)'
            }}>
              <Button
                variant="secondary"
                onClick={() => setCurrentStep(2)}
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleFinalSubmit}
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Create Deposit
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Deposit">
      <div className="nowpayments-modal">
        <Stepper steps={steps} />

        {storeError && (
          <div className="nowpayments-error" style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}>
            {storeError}
          </div>
        )}

        {renderStepContent()}
      </div>
    </Modal>
  )
}

export default DepositModal