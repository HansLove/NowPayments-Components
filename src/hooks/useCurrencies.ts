import { useEffect, useCallback } from 'react'
import { NowPaymentsAPI } from '@/utils/api'
import { useNowPaymentsContext } from '@/hooks/useNowPaymentsContext'
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
  } = useNowPaymentsContext()

  useEffect(() => {
    if (!apiKey) {
      throw new Error('API key is required to fetch currencies')
    }

    loadCurrencies(apiKey)
  }, [apiKey])

  const loadCurrencies = useCallback(
    async (apiKey: string) => {
      const api = new NowPaymentsAPI(apiKey)
      setIsLoadingCurrencies(true)

      try {
        const [allCurrenciesResponse, enabledCurrenciesResponse] = await Promise.allSettled([
          api.getAllCurrencies(),
          api.getEnabledCurrencies(),
        ])

        if (allCurrenciesResponse.status === 'rejected')
          throw new Error(allCurrenciesResponse.reason)
        if (enabledCurrenciesResponse.status === 'rejected')
          throw new Error(enabledCurrenciesResponse.reason)

        const allCurrenciesData = allCurrenciesResponse.value.data?.currencies as Currency[]
        const enabledCurrenciesData = enabledCurrenciesResponse.value.data?.selectedCurrencies.map(
          code => code.toLowerCase()
        ) as string[]

        const selectedCurrenciesDetails = allCurrenciesData?.filter(currency => {
          return enabledCurrenciesData?.includes(currency.code.toLowerCase())
        })

        setCurrencies(selectedCurrenciesDetails || [])
        setEnabledCurrencies(enabledCurrenciesData || [])
      } catch (error: any) {
        console.error('Error fetching currencies:', error)
        setError(error.message || 'Error fetching currencies')
      } finally {
        setIsLoadingCurrencies(false)
      }
    },
    [apiKey]
  )

  const getCurrencyLogo = useCallback((path: string) => {
    return `https://nowpayments.io${path}`
  }, [])

  return {
    currencies,
    enabledCurrencies,
    isLoading: isLoadingCurrencies,
    getCurrencyLogo,
  }
}
