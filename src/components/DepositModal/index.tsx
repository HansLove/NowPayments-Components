import { useState, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../shared/Modal'
import Stepper from '../shared/Stepper'
import CurrencySelectionStep from './CurrencySelectionStep'
import AmountEntryStep from './AmountEntryStep'
import PaymentDetailsStep from './PaymentDetailsStep'
import { useNowPaymentsContext } from '@/hooks/useNowPaymentsContext'
import { NowPaymentsAPI } from '@/utils/api'
import type {
  DepositModalProps,
  DepositFormData,
  Currency,
  StepperStep,
  PaymentDetails,
} from '@/types'

const STEPS: StepperStep[] = [
  { id: 1, title: 'Select Currency', completed: false, active: true },
  { id: 2, title: 'Enter Amount', completed: false, active: false },
  { id: 3, title: 'Payment Details', completed: false, active: false },
]

export function DepositModal({
  isOpen,
  onClose,
  customerEmail,
  onSubmit,
  onSuccess,
  onError,
  showEmailInput = false,
  shouldNotifyByEmail = false,
  showPoweredByNowpayments = true,
  fixedAmounts,
}: DepositModalProps) {
  const { error, apiKey } = useNowPaymentsContext()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [steps, setSteps] = useState(STEPS)
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
  const [userEmail, setUserEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [minimumAmount, setMinimumAmount] = useState<number | null>(null)
  const [minimumAmountUSD, setMinimumAmountUSD] = useState<string | null>(null)
  const [selectedFixedAmount, setSelectedFixedAmount] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
    setFocus,
  } = useForm<{ amount: number; email?: string }>()

  const amount = watch('amount')
  const email = watch('email')

  // Process fixedAmounts: convert strings to numbers, filter by minimum, and sort
  const processedFixedAmounts = useMemo(() => {
    if (!fixedAmounts || fixedAmounts.length === 0) return []

    const amounts = fixedAmounts
      .map(amount => typeof amount === 'string' ? parseFloat(amount) : amount)
      .filter(amount => !isNaN(amount) && amount > 0)

    const filtered = minimumAmount !== null
      ? amounts.filter(amount => amount >= minimumAmount)
      : amounts

    return filtered.sort((a, b) => a - b)
  }, [fixedAmounts, minimumAmount])

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      reset()
      setCurrentStep(1)
      setSelectedCurrency(null)
      setIsSubmitting(false)
      setSteps(STEPS)
      setErrorMessage('')
      setMinimumAmount(null)
      setMinimumAmountUSD(null)
      setSelectedFixedAmount(null)
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

  const handleCurrencySelect = async (currency: Currency) => {
    setSelectedCurrency(currency)
    setSelectedFixedAmount(null)

    // Fetch minimum amount for this currency
    if (apiKey) {
      const api = new NowPaymentsAPI(apiKey)
      const result = await api.getMinimumAmount(currency.code)

      if (result.success && result.data) {
        setMinimumAmount(result.data.min_amount)
        setMinimumAmountUSD(result.data.fiat_equivalent)
      } else {
        setMinimumAmount(null)
        setMinimumAmountUSD(null)
        console.warn('Failed to fetch minimum amount:', result.error)
      }
    }

    setCurrentStep(2)
  }

  const handleFixedAmountSelect = (amount: number) => {
    setFocus('amount')
    setValue('amount', amount)
    setSelectedFixedAmount(amount)
  }

  // Deselect fixed amount when user types
  useEffect(() => {
    if (amount !== selectedFixedAmount && selectedFixedAmount !== null) {
      setSelectedFixedAmount(null)
    }
  }, [amount, selectedFixedAmount])

  const handleAmountSubmit = async () => {
    if (!amount || amount <= 0 || !selectedCurrency) return

    setIsSubmitting(true)

    try {
      // Determine which email to use
      let finalEmail: string | undefined

      if (customerEmail) {
        // Use provided customerEmail (takes precedence)
        finalEmail = typeof customerEmail === 'function' ? await customerEmail() : customerEmail
        setUserEmail(finalEmail || '')
      } else if (email) {
        // Use email from form input
        finalEmail = email
        setUserEmail(email)
      }

      const formData: DepositFormData = {
        selectedCurrency: selectedCurrency.code,
        amount,
        customerEmail: finalEmail,
      }

      const result = await onSubmit(formData)

      // Get payment details from onSuccess callback
      if (onSuccess) {
        const paymentDetailsFromCallback = await onSuccess(result)
        setPaymentDetails(paymentDetailsFromCallback)
      }

      setCurrentStep(3) // Go to payment details step
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error occurred')
      const customMessage = onError?.(errorObj)
      setErrorMessage(customMessage || errorObj.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CurrencySelectionStep
            selectedCurrency={selectedCurrency}
            onCurrencySelect={handleCurrencySelect}
            isSubmitting={isSubmitting}
          />
        )

      case 2:
        return (
          <AmountEntryStep
            register={register}
            errors={errors}
            amount={amount}
            isSubmitting={isSubmitting}
            showEmailInput={showEmailInput}
            customerEmail={customerEmail}
            errorMessage={errorMessage}
            fixedAmounts={processedFixedAmounts}
            minimumAmount={minimumAmount}
            minimumAmountUSD={minimumAmountUSD}
            selectedFixedAmount={selectedFixedAmount}
            onFixedAmountSelect={handleFixedAmountSelect}
            onBack={() => setCurrentStep(1)}
            onSubmit={handleSubmit(handleAmountSubmit)}
          />
        )

      case 3:
        return (
          <PaymentDetailsStep
            paymentDetails={paymentDetails}
            amount={amount}
            selectedCurrency={selectedCurrency}
            shouldNotifyByEmail={shouldNotifyByEmail}
            userEmail={userEmail}
            showPoweredByNowpayments={showPoweredByNowpayments}
          />
        )

      default:
        return null
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Deposit">
      <div className="nowpayments-modal">
        <Stepper steps={steps} />

        {error && (
          <div
            className="nowpayments-error"
            style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}
          >
            {error}
          </div>
        )}

        {renderStepContent()}
      </div>
    </Modal>
  )
}

export default DepositModal
