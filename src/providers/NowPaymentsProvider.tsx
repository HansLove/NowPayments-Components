import { useEffect, ReactNode } from 'react'
import { useNowPaymentsStore } from '@/stores/nowPaymentsStore'

interface NowPaymentsProviderProps {
  children: ReactNode
  apiKey: string
}

/**
 * Provider component for NOWPayments API key configuration
 * Simply configures the API key in the global store
 */
export function NowPaymentsProvider({
  children,
  apiKey,
}: NowPaymentsProviderProps) {
  const { setApiKey } = useNowPaymentsStore()

  // Set API key when provider mounts or apiKey changes
  useEffect(() => {
    if (apiKey) {
      setApiKey(apiKey)
    }
  }, [apiKey, setApiKey])

  return <>{children}</>
}

export type { NowPaymentsProviderProps }