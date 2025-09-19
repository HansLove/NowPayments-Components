import { create } from 'zustand'
import type { Currency } from '../types'

export interface NowPaymentsState {
  // API Configuration
  apiKey: string | null
  setApiKey: (key: string) => void

  // Currencies
  currencies: Currency[]
  enabledCurrencies: string[]
  setCurrencies: (currencies: Currency[]) => void
  setEnabledCurrencies: (enabled: string[]) => void

  // Loading states
  isLoadingCurrencies: boolean
  setIsLoadingCurrencies: (loading: boolean) => void

  // Error handling
  error: string | null
  setError: (error: string | null) => void
}

// Factory function to create store instance
export function createNowPaymentsStore(initialApiKey?: string) {
  return create<NowPaymentsState>((set) => ({
    // API Configuration
    apiKey: initialApiKey || null,
    setApiKey: (key: string) => set({ apiKey: key }),

    // Currencies
    currencies: [],
    enabledCurrencies: [],
    setCurrencies: (currencies: Currency[]) => set({ currencies }),
    setEnabledCurrencies: (enabled: string[]) => set({ enabledCurrencies: enabled }),

    // Loading states
    isLoadingCurrencies: false,
    setIsLoadingCurrencies: (loading: boolean) => set({ isLoadingCurrencies: loading }),

    // Error handling
    error: null,
    setError: (error: string | null) => set({ error }),
  }))
}

// Type for the store instance
export type NowPaymentsStore = ReturnType<typeof createNowPaymentsStore>