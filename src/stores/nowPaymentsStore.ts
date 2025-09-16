import { create } from 'zustand'
import type { Currency } from '../types'

interface NowPaymentsState {
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

export const useNowPaymentsStore = create<NowPaymentsState>((set) => ({
  // API Configuration
  apiKey: null,
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