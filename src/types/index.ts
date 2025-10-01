import { ReactNode } from 'react'

export interface Currency {
  id: number
  code: string
  name: string
  enable: boolean
  wallet_regex: string
  priority: number
  extra_id_exists: boolean
  extra_id_regex: string | null
  logo_url: string
  track: boolean
  cg_id: string
  is_maxlimit: boolean
  network: string
  smart_contract: string | null
  network_precision: number | null
}

/**
 * Payment details returned from onSuccess callback
 */
export interface PaymentDetails {
  address: string
  paymentId: string
}

export interface DepositModalProps {
  isOpen: boolean
  onClose: () => void
  customerEmail?: string | (() => Promise<string>)
  showEmailInput?: boolean
  shouldNotifyByEmail?: boolean
  showPoweredByNowpayments?: boolean
  /**
   * Callback when form is submitted
   * @param formData - Fixed schema from the form
   * @returns Promise with any shape - will be passed to onSuccess
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Backend response can have any shape
  onSubmit: (formData: DepositFormData) => Promise<any>
  /**
   * Callback when form is successfully submitted
   * @param backendResponse - Response from your backend
   * @returns PaymentDetails to display in the payment step
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Backend response can have any shape
  onSuccess?: (backendResponse: any) => PaymentDetails | Promise<PaymentDetails>
  /**
   * Callback when form submission fails
   * @param error - Error that occurred during submission
   * @returns Optional error message to display to the user
   */
  onError?: (error: Error) => string | undefined | void
}

export interface WithdrawModalProps {
  isOpen: boolean
  onClose: () => void
  availableBalance: number
  balanceToUsdtConverter: (amount: number) => Promise<number>
  /**
   * Callback when form is submitted
   * @param formData - Fixed schema from the form
   * @returns Promise with any shape - will be passed to onSuccess
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Backend response can have any shape
  onSubmit: (formData: WithdrawFormData) => Promise<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Backend response can have any shape
  onSuccess?: (backendResponse: any) => void
  onError?: (error: Error) => void
}

/**
 * FIXED SCHEMA - Form data from DepositModal
 * This structure is defined by the component and won't change
 */
export interface DepositFormData {
  selectedCurrency: string // e.g., 'btc', 'eth'
  amount: number
  customerEmail?: string
}

/**
 * FIXED SCHEMA - Form data from WithdrawModal
 * This structure is defined by the component and won't change
 */
export interface WithdrawFormData {
  currency: 'usdttrc20' | 'usdtmatic'
  amount: number
  destinationAddress: string
}

export interface StepperStep {
  id: number
  title: string
  description?: string
  completed: boolean
  active: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export type NetworkType = 'polygon' | 'tron'

export interface ContinueWithNowPaymentsProps {
  onClick?: () => void
  disabled?: boolean
  fullWidth?: boolean
  size?: 'small' | 'medium' | 'large'
  className?: string
  variant?: 'default' | 'dark' | 'light'
}

export interface NowPaymentsProviderProps {
  children: ReactNode
  apiKey: string
}
