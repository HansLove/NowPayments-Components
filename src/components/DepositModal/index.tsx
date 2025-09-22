import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../shared/Modal'
import Stepper from '../shared/Stepper'
import CurrencySelectionStep from './CurrencySelectionStep'
import AmountEntryStep from './AmountEntryStep'
import PaymentDetailsStep from './PaymentDetailsStep'
import { useNowPaymentsContext } from '@/hooks/useNowPaymentsContext'
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
}: DepositModalProps) {
  const { error } = useNowPaymentsContext()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [steps, setSteps] = useState(STEPS)
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
  const [userEmail, setUserEmail] = useState<string>('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<{ amount: number; email?: string }>()

  const amount = watch('amount')
  const email = watch('email')

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
    setSteps(prevSteps =>
      prevSteps.map(step => ({
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
        selectedCurrency: selectedCurrency.cg_id,
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
      onError?.(errorObj)
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
