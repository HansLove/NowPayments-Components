// Components
export { default as DepositModal } from './components/DepositModal'
export { default as WithdrawModal } from './components/WithdrawModal'

// Shared Components (optional exports for advanced usage)
export { default as Modal } from './components/shared/Modal'
export { default as Button } from './components/shared/Button'
export { default as Input } from './components/shared/Input'
export { default as Stepper } from './components/shared/Stepper'
export { default as LoadingSpinner } from './components/shared/LoadingSpinner'
export { default as CurrencySelector } from './components/shared/CurrencySelector'

// Types
export type {
  Currency,
  DepositModalProps,
  WithdrawModalProps,
  DepositFormData,
  WithdrawFormData,
  StepperStep,
  ApiResponse,
  NetworkType,
} from './types'

// Hooks
export { useNowPayments } from './hooks/useNowPayments'
export { useCurrencies } from './hooks/useCurrencies'

// Store
export { useNowPaymentsStore } from './stores/nowPaymentsStore'

// Styles - Import this in your app
import './styles/index.css'