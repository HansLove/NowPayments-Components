import { createContext, useReducer, ReactNode, Dispatch } from 'react'
import type { NowPaymentsState, NowPaymentsAction } from './types'

// Initial state
const initialState: NowPaymentsState = {
  apiKey: null,
  currencies: [],
  enabledCurrencies: [],
  isLoadingCurrencies: false,
  error: null,
}

// Reducer function
function nowPaymentsReducer(state: NowPaymentsState, action: NowPaymentsAction): NowPaymentsState {
  switch (action.type) {
    case 'SET_API_KEY':
      return { ...state, apiKey: action.payload }
    case 'SET_CURRENCIES':
      return { ...state, currencies: action.payload }
    case 'SET_ENABLED_CURRENCIES':
      return { ...state, enabledCurrencies: action.payload }
    case 'SET_IS_LOADING_CURRENCIES':
      return { ...state, isLoadingCurrencies: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

// Context types
export interface NowPaymentsContextType {
  state: NowPaymentsState
  dispatch: Dispatch<NowPaymentsAction>
}

// Create context
const NowPaymentsContext = createContext<NowPaymentsContextType | null>(null)

// Context provider component
interface NowPaymentsContextProviderProps {
  children: ReactNode
  initialApiKey?: string
}

export function NowPaymentsContextProvider({
  children,
  initialApiKey,
}: NowPaymentsContextProviderProps) {
  const [state, dispatch] = useReducer(nowPaymentsReducer, {
    ...initialState,
    apiKey: initialApiKey || null,
  })

  return (
    <NowPaymentsContext.Provider value={{ state, dispatch }}>
      {children}
    </NowPaymentsContext.Provider>
  )
}

// Export the context for use in hooks
export { NowPaymentsContext }
