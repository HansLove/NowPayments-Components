import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../shared/Modal'
import Stepper from '../shared/Stepper'
import CurrencySelector from '../shared/CurrencySelector'
import Input from '../shared/Input'
import Button from '../shared/Button'
import QRCode from '../shared/QRCode'
import { Copy, ExternalLink } from 'lucide-react'
import { useNowPaymentsStore } from '@/stores/nowPaymentsStore'
import type { DepositModalProps, DepositFormData, Currency, StepperStep } from '@/types'

// @ts-expect-error File exists
import NowPaymentsLogo from '@/assets/nowpayments-logo.png'

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
  enableEmail = false,
  shouldNotifyByEmail = false,
}: DepositModalProps) {
  const { error: storeError } = useNowPaymentsStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [steps, setSteps] = useState(STEPS)
  const [paymentDetails, setPaymentDetails] = useState<{
    address: string
    paymentId: string
    explorerUrl?: string
  } | null>(null)
  const [userEmail, setUserEmail] = useState<string>('')

  const {
    register,
    handleSubmit,
    watch,
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
      // Get customer email only if enabled
      let email: string | undefined
      if (enableEmail && customerEmail) {
        email = typeof customerEmail === 'function' ? await customerEmail() : customerEmail
        setUserEmail(email || '')
      }

      const formData: DepositFormData = {
        selectedCurrency: selectedCurrency.cg_id,
        amount,
        customerEmail: email,
      }

      const result = await onSubmit(formData)

      // Extract payment details from result for QR display
      if (result && typeof result === 'object') {
        const details = result as any
        setPaymentDetails({
          address: details.depositAddress || details.address || 'No address provided',
          paymentId: details.paymentId || details.id || 'Unknown',
          explorerUrl: details.explorerUrl,
        })
      }

      onSuccess?.(result)
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
            <h3 style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}>Enter deposit amount</h3>
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
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--nowpayments-spacing-md)',
                  marginTop: 'var(--nowpayments-spacing-lg)',
                }}
              >
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
                  loading={isSubmitting}
                  type="submit"
                >
                  Create Deposit
                </Button>
              </div>
            </form>
          </div>
        )

      case 3:
        return (
          <div>
            <div className="nowpayments-payment-status">
              <div className="nowpayments-payment-status__indicator">
                <div className="nowpayments-payment-status__dot"></div>
                <span className="nowpayments-payment-status__text">Waiting for payment</span>
              </div>
            </div>

            {paymentDetails && (
              <div className="nowpayments-payment-details--compact">
                <div className="nowpayments-payment-layout">
                  <div className="nowpayments-payment-qr">
                    <QRCode
                      value={paymentDetails.address}
                      size={180}
                      title="Payment Address"
                      showActions={false}
                      showRawValue={false}
                    />
                  </div>

                  <div className="nowpayments-payment-info--compact">
                    <div className="nowpayments-payment-info__grid--compact">
                      <div className="nowpayments-payment-info__item">
                        <span className="nowpayments-payment-info__label">Amount:</span>
                        <span className="nowpayments-payment-info__value">
                          {amount} {selectedCurrency?.code.toUpperCase()}
                        </span>
                      </div>
                      <div className="nowpayments-payment-info__item">
                        <span className="nowpayments-payment-info__label">Payment ID:</span>
                        <span className="nowpayments-payment-info__value">
                          {paymentDetails.paymentId.length > 12
                            ? `${paymentDetails.paymentId.slice(0, 12)}...`
                            : paymentDetails.paymentId}
                        </span>
                      </div>
                    </div>

                    <div className="nowpayments-payment-address--compact">
                      <span className="nowpayments-payment-address__label">
                        Send payment to this address:
                      </span>
                      <div className="nowpayments-payment-address__container--compact">
                        <code className="nowpayments-payment-address__value--compact">
                          {paymentDetails.address.length > 30
                            ? `${paymentDetails.address.slice(
                                0,
                                30
                              )}...${paymentDetails.address.slice(-12)}`
                            : paymentDetails.address}
                        </code>
                        <button
                          type="button"
                          className="nowpayments-payment-address__copy-btn"
                          onClick={() => navigator.clipboard.writeText(paymentDetails.address)}
                          title="Copy address"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>

                    {shouldNotifyByEmail && userEmail && (
                      <div className="nowpayments-email-notification">
                        <p className="nowpayments-email-notification__text">
                          A confirmation email will be sent to:
                        </p>
                        <p className="nowpayments-email-notification__email">{userEmail}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="nowpayments-payment-warning--compact">
                  <div className="nowpayments-payment-warning__icon">⚠</div>
                  <div className="nowpayments-payment-warning__content">
                    <span className="nowpayments-payment-warning__title">Important:</span>
                    <span className="nowpayments-payment-warning__text">
                      Only send {selectedCurrency?.code.toUpperCase()} to this address. Payment will
                      be processed automatically.
                    </span>
                  </div>
                </div>

                <div className="nowpayments-payment-actions">
                  {paymentDetails.explorerUrl && (
                    <Button
                      variant="secondary"
                      onClick={() => window.open(paymentDetails.explorerUrl, '_blank')}
                      className="nowpayments-payment-action"
                    >
                      <ExternalLink size={18} />
                      Explorer
                    </Button>
                  )}
                </div>

                <div className="nowpayments-powered-by">
                  <p className="nowpayments-powered-by__text">This transaction is processed by</p>
                  <img
                    src={NowPaymentsLogo}
                    alt="NOWPayments"
                    className="nowpayments-powered-by__logo nowpayments-powered-by__logo--with-background"
                  />
                </div>
              </div>
            )}
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
          <div
            className="nowpayments-error"
            style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}
          >
            {storeError}
          </div>
        )}

        {renderStepContent()}
      </div>
    </Modal>
  )
}

export default DepositModal
