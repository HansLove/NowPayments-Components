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

export interface DepositModalProps {
  isOpen: boolean
  onClose: () => void
  customerEmail?: string | (() => Promise<string>)
  enableEmail?: boolean
  shouldNotifyByEmail?: boolean
  /**
   * Callback when form is submitted
   * @param formData - Fixed schema from the form
   * @returns Promise with any shape - will be passed to onSuccess
   */
  onSubmit: (formData: DepositFormData) => Promise<any>
  onSuccess?: (backendResponse: any) => void
  onError?: (error: Error) => void
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
  onSubmit: (formData: WithdrawFormData) => Promise<any>
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
