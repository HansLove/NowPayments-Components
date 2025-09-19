import { useContext } from 'react'
import { createContext } from 'react'
import type { NowPaymentsStore } from '@/stores/nowPaymentsStore'

// Context for the store - exported for Provider use
export const NowPaymentsStoreContext = createContext<NowPaymentsStore | null>(null)

/**
 * Hook to access the NOWPayments store
 * Must be used within a NowPaymentsProvider
 */
export function useNowPaymentsStore() {
  const store = useContext(NowPaymentsStoreContext)

  if (!store) {
    throw new Error('useNowPaymentsStore must be used within a NowPaymentsProvider')
  }

  return store()
}