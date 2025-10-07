import Input from '../shared/Input'
import type { WithdrawalDetails } from '@/types'

// @ts-expect-error File exists
import NowPaymentsLogo from '@/assets/nowpayments-logo.png'
// @ts-expect-error File exists
import TronLogo from '@/assets/tron-trx-logo.png'
// @ts-expect-error File exists
import PolygonLogo from '@/assets/polygon-matic-logo.png'

interface WithdrawDetailsStepProps {
  withdrawalDetails: WithdrawalDetails | null
  amount: number
  currency: 'usdttrc20' | 'usdtmatic'
  destinationAddress: string
  showPoweredByNowpayments: boolean
}

export function WithdrawDetailsStep({
  withdrawalDetails,
  amount,
  currency,
  destinationAddress,
  showPoweredByNowpayments,
}: WithdrawDetailsStepProps) {
  const networkName = currency === 'usdttrc20' ? 'Tron Network' : 'Polygon Network'
  const NetworkLogo = currency === 'usdttrc20' ? TronLogo : PolygonLogo
  const networkAlt = currency === 'usdttrc20' ? 'Tron' : 'Polygon'

  return (
    <div>
      <div className="nowpayments-payment-status">
        <div className="nowpayments-payment-status__indicator">
          <div className="nowpayments-payment-status__dot"></div>
          <span className="nowpayments-payment-status__text">Withdrawal processing</span>
        </div>
      </div>

      {withdrawalDetails && (
        <div className="nowpayments-payment-details--compact">
          <div className="nowpayments-payment-info--compact">
            <div className="nowpayments-payment-info__grid--compact">
              <div className="nowpayments-payment-info__item">
                <span className="nowpayments-payment-info__label">Amount:</span>
                <span className="nowpayments-payment-info__value">
                  {amount} USDT
                </span>
              </div>
              <div className="nowpayments-payment-info__item">
                <span className="nowpayments-payment-info__label">Network:</span>
                <span className="nowpayments-payment-info__value" style={{ display: 'flex', alignItems: 'center', gap: 'var(--nowpayments-spacing-xs)' }}>
                  <img src={NetworkLogo} alt={networkAlt} width="16" height="16" />
                  {networkName}
                </span>
              </div>
            </div>

            <div style={{ marginTop: 'var(--nowpayments-spacing-md)' }}>
              <Input
                label="Destination Address"
                value={destinationAddress}
                readOnly
                disabled
              />
            </div>

            <div className="nowpayments-payment-info__item" style={{ marginTop: 'var(--nowpayments-spacing-md)' }}>
              <span className="nowpayments-payment-info__label">Transaction ID:</span>
              <span className="nowpayments-payment-info__value">
                {withdrawalDetails.transactionId.length > 20 && `${withdrawalDetails.transactionId.slice(0, 20)}...`}
                {withdrawalDetails.transactionId.length <= 20 && withdrawalDetails.transactionId}
              </span>
            </div>
          </div>

          <div className="nowpayments-payment-warning--compact">
            <div className="nowpayments-payment-warning__icon">⚠</div>
            <div className="nowpayments-payment-warning__content">
              <span className="nowpayments-payment-warning__title">Important:</span>
              <span className="nowpayments-payment-warning__text">
                Your withdrawal is being processed. Funds will be sent to your destination address via the {networkName}.
                Processing time may vary depending on network conditions.
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

export default WithdrawDetailsStep
