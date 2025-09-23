// Styles - Include in bundle
import './styles/index.css'

// Main Components - Public API
export { default as DepositModal } from './components/DepositModal'
export { default as WithdrawModal } from './components/WithdrawModal'
export { default as ContinueWithNowPayments } from './components/shared/ContinueWithNowPayments'

// Provider for API Configuration
export { NowPaymentsProvider } from './providers/NowPaymentsProvider'

// Note: All hooks are now internal to the library
// Use the Provider + Component pattern instead

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
} from './types'

