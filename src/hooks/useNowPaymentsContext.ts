import { useContext } from 'react'
import { NowPaymentsContext, type NowPaymentsContextType } from '@/providers/NowPaymentsContext'

/**
 * Hook to access the NOWPayments context
 * Must be used within a NowPaymentsProvider
 */
export function useNowPaymentsContext(): NowPaymentsContextType {
  const context = useContext(NowPaymentsContext)

  if (!context) {
    throw new Error('useNowPaymentsContext must be used within a NowPaymentsProvider')
  }

  return context
}