# @taloon/nowpayments-components

React component library for cryptocurrency deposits and withdrawals using NOWPayments API.

## Overview

This library provides ready-to-use React components for implementing cryptocurrency payment flows in your applications. It includes modal components for deposits and withdrawals with a clean, customizable interface and robust form validation.

**Key Features:**
- 🔐 **Frontend-only currency display** - Fetches available currencies from NOWPayments for UI
- 🎯 **Flexible backend integration** - Your backend handles payment logic and webhooks
- 🎨 **CSS-first theming** - Customize appearance with CSS custom properties
- 📱 **Mobile-responsive** - Works seamlessly across devices
- ⚡ **TypeScript ready** - Full type safety with comprehensive interfaces
- 🧪 **Storybook included** - Interactive component documentation

## Architecture Philosophy

This library follows a **frontend display + backend processing** pattern:

- **Frontend responsibilities**: Display currencies, collect form data, handle UI states
- **Backend responsibilities**: Process payments, handle NOWPayments API calls, manage webhooks
- **Clear separation**: Fixed form schemas from frontend, flexible response handling from backend

## Installation

```bash
npm install @taloon/nowpayments-components
```

## Quick Start

### 1. Setup with Provider

```tsx
import { NowPaymentsProvider } from '@taloon/nowpayments-components'
import '@taloon/nowpayments-components/styles'

function App() {
  return (
    <NowPaymentsProvider apiKey="your-nowpayments-api-key">
      <YourApp />
    </NowPaymentsProvider>
  )
}
```

**Important**: Always import the styles manually using `import '@taloon/nowpayments-components/styles'`

### 2. Add Deposit Modal

```tsx
import { DepositModal } from '@taloon/nowpayments-components'

function App() {
  const [showDeposit, setShowDeposit] = useState(false)

  return (
    <>
      <button onClick={() => setShowDeposit(true)}>
        Make Deposit
      </button>

      <DepositModal
        isOpen={showDeposit}
        onClose={() => setShowDeposit(false)}
        customerEmail="user@example.com"
        onSubmit={async (formData) => {
          // Send to your backend API
          const response = await fetch('/api/deposits', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...formData,
              userId: currentUser.id,
              // Add any additional data your backend needs
            })
          })
          return response.json()
        }}
        onSuccess={(backendResponse) => {
          console.log('Deposit created:', backendResponse)
          setShowDeposit(false)
        }}
        onError={(error) => {
          console.error('Deposit failed:', error)
        }}
      />
    </>
  )
}
```

### 3. Add Withdrawal Modal

```tsx
import { WithdrawModal } from '@taloon/nowpayments-components'

<WithdrawModal
  isOpen={showWithdraw}
  onClose={() => setShowWithdraw(false)}
  availableBalance={userBalance}
  balanceToUsdtConverter={async (amount) => {
    // Convert your balance to USDT for display
    return amount * 0.95 // Example conversion
  }}
  onSubmit={async (formData) => {
    // Process withdrawal with your backend
    const response = await fetch('/api/withdrawals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    return response.json()
  }}
  onSuccess={(result) => {
    console.log('Withdrawal processed:', result)
    setShowWithdraw(false)
  }}
/>
```

### 4. Add Branded Payment Button

```tsx
import { ContinueWithNowPayments } from '@taloon/nowpayments-components'

<ContinueWithNowPayments
  onClick={() => setShowDeposit(true)}
  size="large"
  fullWidth
  variant="default"
/>
```

**Available Props:**
- `size`: `'small' | 'medium' | 'large'` (default: `'medium'`)
- `variant`: `'default' | 'dark' | 'light'` (default: `'default'`)
- `fullWidth`: `boolean` (default: `false`)
- `disabled`: `boolean` (default: `false`)
- `onClick`: `() => void`
- `className`: `string` for custom styling

## Customization

### Theme with CSS Variables

```css
:root {
  /* Brand colors */
  --np-primary: #7c3aed;
  --np-surface: #ffffff;
  --np-on-surface: #1f2937;

  /* Dark mode */
  --np-surface-dark: #1f2937;
  --np-on-surface-dark: #f9fafb;
}

@media (prefers-color-scheme: dark) {
  :root {
    --np-surface: var(--np-surface-dark);
    --np-on-surface: var(--np-on-surface-dark);
  }
}
```

See [CSS_THEMING.md](./CSS_THEMING.md) for complete theming guide and [docs/styling-guide.mdx](./docs/styling-guide.mdx) for style import instructions.

## Components

### Main Components

- **`DepositModal`** - 3-step deposit flow (currency selection, amount, confirmation)
- **`WithdrawModal`** - Single-form withdrawal with network selection and amount slider
- **`ContinueWithNowPayments`** - Branded button with NOWPayments logo for payment flows
- **`NowPaymentsProvider`** - Configuration provider for API key setup

### Shared Components (Advanced Usage)

- **`Modal`** - Base modal with portal rendering
- **`Button`** - Styled button with variants and loading states
- **`Input`** - Form input with validation and error handling
- **`Stepper`** - Progress indicator for multi-step flows
- **`CurrencySelector`** - Searchable currency grid with logos
- **`LoadingSpinner`** - Loading indicator in multiple sizes

## Data Flow

```
1. Frontend: Fetch currencies from NOWPayments (display only)
2. User: Fill form → DepositFormData | WithdrawFormData (FIXED schemas)
3. Frontend: onSubmit(formData) → Your backend (FLEXIBLE payload)
4. Your Backend: Process with NOWPayments → Custom response
5. Frontend: onSuccess(backendResponse) → Handle any schema
```

## Form Schemas

The library provides fixed form schemas to ensure consistent data structure:

```typescript
// From DepositModal
interface DepositFormData {
  selectedCurrency: string // e.g., 'btc', 'eth'
  amount: number
  customerEmail?: string
}

// From WithdrawModal
interface WithdrawFormData {
  currency: 'usdttrc20' | 'usdtmatic'
  amount: number
  destinationAddress: string
}
```

Your backend receives this structured data and can add additional fields before processing.

## Development

```bash
# Install dependencies
npm install

# Start Storybook for component development
npm run storybook

# Build library
npm run build

# Run linting
npm run lint

# Type checking
npm run type-check
```

## Browser Support

- Modern browsers with ES2020 support
- React 18+ required
- CSS Custom Properties support

## Contributing

1. Clone the repository
2. Install dependencies: `npm install`
3. Start Storybook: `npm run storybook`
4. Make changes and test in Storybook
5. Run linting: `npm run lint`
6. Submit a pull request

See [CLAUDE.md](./CLAUDE.md) for technical development guidelines.

## License

MIT

## Support

For technical implementation details, see [CLAUDE.md](./CLAUDE.md).

For theming and customization, see [CSS_THEMING.md](./CSS_THEMING.md).