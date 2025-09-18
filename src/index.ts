// Main Components - Public API
export { default as DepositModal } from './components/DepositModal'
export { default as WithdrawModal } from './components/WithdrawModal'
export { default as ContinueWithNowPayments } from './components/shared/ContinueWithNowPayments'

// Essential Types for Component Usage
export type {
  Currency,
  DepositModalProps,
  WithdrawModalProps,
  DepositFormData,
  WithdrawFormData,
  ContinueWithNowPaymentsProps,
} from './types'

// Styles - Import this in your app
import './styles/index.css'