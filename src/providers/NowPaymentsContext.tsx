import { createContext, useState, ReactNode } from 'react'
import type { Currency } from '@/types'

// Context types
export interface NowPaymentsContextType {
  // State
  apiKey: string | null
  currencies: Currency[]
  enabledCurrencies: string[]
  isLoadingCurrencies: boolean
  error: string | null

  // Setters
  setApiKey: (key: string | null) => void
  setCurrencies: (currencies: Currency[]) => void
  setEnabledCurrencies: (enabled: string[]) => void
  setIsLoadingCurrencies: (loading: boolean) => void
  setError: (error: string | null) => void
}

// Create context
const NowPaymentsContext = createContext<NowPaymentsContextType | null>(null)

// Context provider component
interface NowPaymentsContextProviderProps {
  children: ReactNode
  initialApiKey?: string
}

export function NowPaymentsContextProvider({
  children,
  initialApiKey,
}: NowPaymentsContextProviderProps) {
  const [apiKey, setApiKey] = useState<string | null>(initialApiKey || null)
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [enabledCurrencies, setEnabledCurrencies] = useState<string[]>([])
  const [isLoadingCurrencies, setIsLoadingCurrencies] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const contextValue: NowPaymentsContextType = {
    // State
    apiKey,
    currencies,
    enabledCurrencies,
    isLoadingCurrencies,
    error,

    // Setters
    setApiKey,
    setCurrencies,
    setEnabledCurrencies,
    setIsLoadingCurrencies,
    setError,
  }

  return (
    <NowPaymentsContext.Provider value={contextValue}>
      {children}
    </NowPaymentsContext.Provider>
  )
}

// Export the context for use in hooks
export { NowPaymentsContext }
