import { useCallback } from 'react'
import { useNowPaymentsStore } from '../stores/nowPaymentsStore'

/**
 * Hook for NOWPayments operations
 * Note: Only handles currency fetching - payments/withdrawals are handled by backend
 */
export function useNowPayments() {
  const { apiKey, setError } = useNowPaymentsStore()

  const validateApiKey = useCallback(() => {
    if (!apiKey) {
      const error = 'NOWPayments API key is required. Set it using useNowPaymentsStore().setApiKey()'
      setError(error)
      throw new Error(error)
    }
  }, [apiKey, setError])

  return {
    validateApiKey,
    hasApiKey: !!apiKey,
  }
}