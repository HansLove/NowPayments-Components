import React, { useState, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../shared/Modal'
import Stepper from '../shared/Stepper'
import WithdrawFormStep from './WithdrawFormStep'
import WithdrawDetailsStep from './WithdrawDetailsStep'
import { useNowPaymentsContext } from '@/hooks/useNowPaymentsContext'
import type { WithdrawModalProps, WithdrawFormData, StepperStep, WithdrawalDetails } from '@/types'

interface WithdrawForm {
  currency: 'usdttrc20' | 'usdtmatic'
  amount: number
  destinationAddress: string
}

const STEPS: StepperStep[] = [
  { id: 1, title: 'Withdrawal Form', completed: false, active: true },
  { id: 2, title: 'Withdrawal Details', completed: false, active: false },
]

export function WithdrawModal({
  isOpen,
  onClose,
  availableBalance,
  balanceToUsdtConverter,
  onSubmit,
  onSuccess,
  onError,
  showPoweredByNowpayments = true,
}: WithdrawModalProps) {
  const { error } = useNowPaymentsContext()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [steps, setSteps] = useState(STEPS)
  const [withdrawalDetails, setWithdrawalDetails] = useState<WithdrawalDetails | null>(null)
  const [usdtAmount, setUsdtAmount] = useState<number | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [shouldFocusAmount, setShouldFocusAmount] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

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
  const watchedCurrency = watch('currency')
  const watchedAddress = watch('destinationAddress')

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      reset({
        currency: 'usdttrc20',
        amount: 0,
        destinationAddress: '',
      })
      setCurrentStep(1)
      setIsSubmitting(false)
      setSteps(STEPS)
      setWithdrawalDetails(null)
      setUsdtAmount(null)
      setErrorMessage('')
    }
  }, [isOpen, reset])

  // Update steps based on current step
  useEffect(() => {
    setSteps(prevSteps =>
      prevSteps.map(step => ({
        ...step,
        completed: step.id < currentStep,
        active: step.id === currentStep,
      }))
    )
  }, [currentStep])

  // Convert balance to USDT when amount changes
  useEffect(() => {
    if (watchedAmount > 0) {
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

    if (!isNaN(amount) && isFinite(amount)) {
      setValue('amount', Number(amount.toFixed(2)))
      setShouldFocusAmount(true)
    }
  }

  const withdrawPercentage = useMemo(() => {
    if (watchedAmount === 0 || availableBalance === 0) return 0
    return Math.round((watchedAmount / availableBalance) * 100)
  }, [watchedAmount, availableBalance])

  const onFormSubmit = async (data: WithdrawForm) => {
    if (data.amount <= 0) return

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const formData: WithdrawFormData = {
        currency: data.currency,
        amount: data.amount,
        destinationAddress: data.destinationAddress,
      }

      const result = await onSubmit(formData)

      // Get withdrawal details from onSuccess callback
      if (onSuccess) {
        const details = await onSuccess(result)
        setWithdrawalDetails(details)
      }

      setCurrentStep(2) // Go to withdrawal details step
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error occurred')
      const customMessage = onError?.(errorObj)
      setErrorMessage(customMessage || errorObj.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Withdraw Funds">
      <div className="nowpayments-modal">
        <Stepper steps={steps} />

        {error && (
          <div className="nowpayments-error" style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}>
            {error}
          </div>
        )}

        {currentStep === 1 && (
          <WithdrawFormStep
            register={register}
            errors={errors}
            watchedAmount={watchedAmount}
            availableBalance={availableBalance}
            isSubmitting={isSubmitting}
            usdtAmount={usdtAmount}
            isConverting={isConverting}
            errorMessage={errorMessage}
            onSubmit={handleSubmit(onFormSubmit)}
            handleSliderChange={handleSliderChange}
            withdrawPercentage={withdrawPercentage}
          />
        )}

        {currentStep === 2 && (
          <WithdrawDetailsStep
            withdrawalDetails={withdrawalDetails}
            amount={watchedAmount}
            currency={watchedCurrency}
            destinationAddress={watchedAddress}
            showPoweredByNowpayments={showPoweredByNowpayments}
          />
        )}
      </div>
    </Modal>
  )
}

export default WithdrawModal
