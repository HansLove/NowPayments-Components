import { useEffect, ReactNode } from 'react'
import { NowPaymentsContextProvider } from './NowPaymentsContext'
import { useNowPaymentsContext } from '@/hooks/useNowPaymentsContext'

interface NowPaymentsProviderProps {
  children: ReactNode
  apiKey: string
}

/**
 * Internal component to handle API key updates
 */
function ApiKeyUpdater({ apiKey }: { apiKey: string }) {
  const { dispatch } = useNowPaymentsContext()

  useEffect(() => {
    if (apiKey) {
      dispatch({ type: 'SET_API_KEY', payload: apiKey })
    }
  }, [apiKey, dispatch])

  return null
}

/**
 * Provider component for NOWPayments API key configuration
 * Uses React Context instead of Zustand for better HMR compatibility
 */
export function NowPaymentsProvider({ children, apiKey }: NowPaymentsProviderProps) {
  return (
    <NowPaymentsContextProvider initialApiKey={apiKey}>
      <ApiKeyUpdater apiKey={apiKey} />
      {children}
    </NowPaymentsContextProvider>
  )
}

export type { NowPaymentsProviderProps }
