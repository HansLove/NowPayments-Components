// Main Components - Public API
export { default as DepositModal } from './components/DepositModal'
export { default as WithdrawModal } from './components/WithdrawModal'
export { default as ContinueWithNowPayments } from './components/shared/ContinueWithNowPayments'

// Provider for API Configuration
export { NowPaymentsProvider } from './providers/NowPaymentsProvider'

// Hooks
export { useNowPaymentsStore } from './stores/nowPaymentsStore'
export { useNowPayments } from './hooks/useNowPayments'
export { useCurrencies } from './hooks/useCurrencies'

// Essential Types for Component Usage
export type {
  Currency,
  DepositModalProps,
  WithdrawModalProps,
  DepositFormData,
  WithdrawFormData,
  ContinueWithNowPaymentsProps,
  NowPaymentsProviderProps,
} from './types'

// Styles are exported separately - import manually:
// import '@taloon/nowpayments-components/styles'