import axios, { type AxiosInstance } from 'axios'
import type { Currency, ApiResponse } from '../types'

const NOWPAYMENTS_API_URL = 'https://api.nowpayments.io'

/**
 * NOWPayments API wrapper for frontend operations
 * Only handles currency fetching - payments/withdrawals are handled by backend
 */
export class NowPaymentsAPI {
  private client: AxiosInstance

  constructor(apiKey: string) {
    this.client = axios.create({
      baseURL: NOWPAYMENTS_API_URL,
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    })
  }

  /**
   * Get enabled currencies for the merchant
   * Used to filter which currencies to show in the UI
   */
  async getEnabledCurrencies(): Promise<ApiResponse<{ currencies: string[] }>> {
    try {
      const response = await this.client.get('/v1/merchant/coins')
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  /**
   * Get full currency details with logos, names, etc.
   * Used to display currency information in the UI
   */
  async getAllCurrencies(): Promise<ApiResponse<{ currencies: Currency[] }>> {
    try {
      const response = await this.client.get('/v1/full-currencies')
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }
}