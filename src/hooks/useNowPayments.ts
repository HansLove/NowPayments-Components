import { useCallback } from 'react'
import { useNowPaymentsContext } from './useNowPaymentsContext'
import type { Currency } from '@/types'

/**
 * Hook to access the NOWPayments state and actions
 * Must be used within a NowPaymentsProvider
 *
 * Provides access to currency data, loading states, and error handling
 */
export function useNowPayments() {
  const { state, dispatch } = useNowPaymentsContext()

  // Action functions for internal use
  const setApiKey = useCallback((key: string) => {
    dispatch({ type: 'SET_API_KEY', payload: key })
  }, [dispatch])

  const setCurrencies = useCallback((currencies: Currency[]) => {
    dispatch({ type: 'SET_CURRENCIES', payload: currencies })
  }, [dispatch])

  const setEnabledCurrencies = useCallback((enabled: string[]) => {
    dispatch({ type: 'SET_ENABLED_CURRENCIES', payload: enabled })
  }, [dispatch])

  const setIsLoadingCurrencies = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_IS_LOADING_CURRENCIES', payload: loading })
  }, [dispatch])

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error })
  }, [dispatch])

  // Return state and actions
  return {
    // State
    apiKey: state.apiKey,
    currencies: state.currencies,
    enabledCurrencies: state.enabledCurrencies,
    isLoadingCurrencies: state.isLoadingCurrencies,
    error: state.error,

    // Actions
    setApiKey,
    setCurrencies,
    setEnabledCurrencies,
    setIsLoadingCurrencies,
    setError,
  }
}