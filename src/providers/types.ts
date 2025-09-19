import type { Currency } from '@/types'

export interface NowPaymentsState {
  // API Configuration
  apiKey: string | null

  // Currencies
  currencies: Currency[]
  enabledCurrencies: string[]

  // Loading states
  isLoadingCurrencies: boolean

  // Error handling
  error: string | null
}

export type NowPaymentsAction =
  | { type: 'SET_API_KEY'; payload: string }
  | { type: 'SET_CURRENCIES'; payload: Currency[] }
  | { type: 'SET_ENABLED_CURRENCIES'; payload: string[] }
  | { type: 'SET_IS_LOADING_CURRENCIES'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }