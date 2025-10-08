// Import styles to ensure they're bundled
import './styles/index.css'

// Main Components - Public API
export { default as DepositModal } from './components/DepositModal'
export { default as WithdrawModal } from './components/WithdrawModal'
export { default as ContinueWithNowPayments } from './components/shared/ContinueWithNowPayments'

// Provider for API Configuration
export { NowPaymentsProvider } from './providers/NowPaymentsProvider'

// Essential Types for Component Usage
export type {
  Currency,
  DepositModalProps,
  WithdrawModalProps,
  DepositFormData,
  WithdrawFormData,
  ContinueWithNowPaymentsProps,
  NowPaymentsProviderProps,
  PaymentDetails,
  WithdrawalDetails,
} from './types'

// Enums for Configuration
export { USDTNetwork } from './types'
