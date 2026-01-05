interface AmountCardProps {
  amount: number
  isSelected: boolean
  onClick: (amount: number) => void
}

export function AmountCard({ amount, isSelected, onClick }: AmountCardProps) {
  return (
    <button
      type="button"
      className={`nowpayments-amount-card ${isSelected ? 'nowpayments-amount-card--selected' : ''}`}
      onClick={() => onClick(amount)}
    >
      ${amount.toFixed(2)}
    </button>
  )
}

export default AmountCard
