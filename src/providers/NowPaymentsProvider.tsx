import { useEffect, ReactNode, useState } from 'react'
import { createNowPaymentsStore } from '@/stores/nowPaymentsStore'
import { NowPaymentsStoreContext } from '@/hooks/useNowPaymentsStore'

interface NowPaymentsProviderProps {
  children: ReactNode
  apiKey: string
}

/**
 * Provider component for NOWPayments API key configuration
 * Creates and manages the store instance to avoid premature initialization
 */
export function NowPaymentsProvider({ children, apiKey }: NowPaymentsProviderProps) {
  // Create store instance only once when component mounts
  const [store] = useState(() => createNowPaymentsStore(apiKey))

  // Update API key when it changes
  useEffect(() => {
    if (apiKey && store) {
      store.getState().setApiKey(apiKey)
    }
  }, [apiKey, store])

  return (
    <NowPaymentsStoreContext.Provider value={store}>{children}</NowPaymentsStoreContext.Provider>
  )
}

export type { NowPaymentsProviderProps }
