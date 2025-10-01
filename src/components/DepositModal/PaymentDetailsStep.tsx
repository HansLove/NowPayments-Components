import QRCode from '../shared/QRCode'
import { Copy } from 'lucide-react'
import type { Currency, PaymentDetails } from '@/types'

// @ts-expect-error File exists
import NowPaymentsLogo from '@/assets/nowpayments-logo.png'

interface PaymentDetailsStepProps {
  paymentDetails: PaymentDetails | null
  amount: number | undefined
  selectedCurrency: Currency | null
  shouldNotifyByEmail: boolean
  userEmail: string
  showPoweredByNowpayments: boolean
}

export function PaymentDetailsStep({
  paymentDetails,
  amount,
  selectedCurrency,
  shouldNotifyByEmail,
  userEmail,
  showPoweredByNowpayments,
}: PaymentDetailsStepProps) {
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

          {showPoweredByNowpayments && (
            <div className="nowpayments-powered-by">
              <p className="nowpayments-powered-by__text">This transaction is processed by</p>
              <img
                src={NowPaymentsLogo}
                alt="NOWPayments"
                className="nowpayments-powered-by__logo nowpayments-powered-by__logo--with-background"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PaymentDetailsStep