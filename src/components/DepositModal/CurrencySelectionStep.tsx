import CurrencySelector from '../shared/CurrencySelector'
import type { Currency } from '@/types'

interface CurrencySelectionStepProps {
  selectedCurrency: Currency | null
  onCurrencySelect: (currency: Currency) => void
  isSubmitting: boolean
}

export function CurrencySelectionStep({
  selectedCurrency,
  onCurrencySelect,
  isSubmitting,
}: CurrencySelectionStepProps) {
  return (
    <div>
      <h3 style={{ marginBottom: 'var(--nowpayments-spacing-lg)' }}>
        Choose your preferred cryptocurrency
      </h3>
      <CurrencySelector
        selectedCurrency={selectedCurrency?.cg_id}
        onSelect={onCurrencySelect}
        disabled={isSubmitting}
      />
    </div>
  )
}

export default CurrencySelectionStep