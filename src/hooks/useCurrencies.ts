import { useEffect, useCallback } from 'react'
import { NowPaymentsAPI } from '@/utils/api'
import { useNowPayments } from '@/hooks/useNowPayments'
import type { Currency } from '@/types'

export function useCurrencies() {
  const {
    apiKey,
    currencies,
    enabledCurrencies,
    isLoadingCurrencies,
    setError,
    setCurrencies,
    setEnabledCurrencies,
    setIsLoadingCurrencies,
  } = useNowPayments()

  const loadCurrencies = useCallback(async () => {
    if (!apiKey) {
      setError('API key is required')
      return
    }

    setIsLoadingCurrencies(true)
    setError(null)

    try {
      const api = new NowPaymentsAPI(apiKey)

      // Get enabled currencies
      const enabledResponse = await api.getEnabledCurrencies()
      if (!enabledResponse.success || !enabledResponse.data) {
        throw new Error(enabledResponse.error || 'Failed to fetch enabled currencies')
      }

      // Get all currencies details
      const allResponse = await api.getAllCurrencies()
      if (!allResponse.success || !allResponse.data) {
        throw new Error(allResponse.error || 'Failed to fetch currency details')
      }

      const enabledCurrencyIds = enabledResponse.data.currencies
      const allCurrencies = allResponse.data.currencies

      // Filter currencies to only include enabled ones
      const enabledCurrencyDetails = allCurrencies.filter((currency: Currency) =>
        enabledCurrencyIds.includes(currency.cg_id)
      )

      setEnabledCurrencies(enabledCurrencyIds)
      setCurrencies(enabledCurrencyDetails)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred')
    } finally {
      setIsLoadingCurrencies(false)
    }
  }, [apiKey, setError, setCurrencies, setEnabledCurrencies, setIsLoadingCurrencies])

  const getCurrencyLogo = useCallback((path: string) => {
    return `https://nowpayments.io/${path}`
  }, [])

  const getEnabledCurrencies = useCallback(() => {
    return currencies.filter((currency) => currency.enable && enabledCurrencies.includes(currency.cg_id))
  }, [currencies, enabledCurrencies])

  const getCurrencyByCode = useCallback(
    (code: string) => {
      return currencies.find((currency) => currency.code.toLowerCase() === code.toLowerCase())
    },
    [currencies]
  )

  // Auto-load currencies when API key is available
  useEffect(() => {
    if (apiKey && currencies.length === 0 && !isLoadingCurrencies) {
      loadCurrencies()
    }
  }, [apiKey, currencies.length, isLoadingCurrencies, loadCurrencies])

  return {
    currencies: getEnabledCurrencies(),
    allCurrencies: currencies,
    isLoading: isLoadingCurrencies,
    loadCurrencies,
    getCurrencyLogo,
    getCurrencyByCode,
  }
}