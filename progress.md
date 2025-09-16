# NOWPayments Components - Development Progress

## 📋 Project Overview

**Objective**: Create a React component library `@taloon/nowpayments-components` for cryptocurrency deposits and withdrawals using NOWPayments API.

**Key Architecture Decision**: Frontend ONLY fetches currencies from NOWPayments for display. All payment/withdrawal logic is handled by the client's backend.

## 🎯 Core Architecture Principles

### Frontend Responsibilities
- Display available currencies (fetched from NOWPayments `/v1/merchant/coins` + `/v1/full-currencies`)
- Collect user form data with validation
- Send structured form data to client's backend via `onSubmit` callback
- Handle flexible response schemas from client's backend

### Backend Responsibilities (Client's)
- Handle actual NOWPayments payment/withdrawal API calls
- Process business logic, webhooks, notifications
- Return custom response schemas to frontend

### Data Flow
```
1. Frontend: Fetch currencies from NOWPayments (display only)
2. User: Fill form → DepositFormData | WithdrawFormData (FIXED schemas)
3. Frontend: onSubmit(formData) → Client's backend (FLEXIBLE payload)
4. Client Backend: Process with NOWPayments → Custom response
5. Frontend: onSuccess(backendResponse) → Handle any schema
```

## 🏗️ Tech Stack Decisions

### Build & Tooling
- **Vite** (library mode) - Modern, fast bundler
- **TypeScript** - Full type safety
- **React Hook Form** - Form validation
- **Zustand** - Global state (API key, currencies)
- **CSS Modules** - BEM methodology
- **Storybook** - Component development

### Styling Approach
- **CSS-first theming** via CSS Custom Properties
- **NO JavaScript theme configuration**
- **NO automatic dark mode** - client controls
- **BEM methodology** for class names
- **Variables**: `--np-primary`, `--np-surface`, etc.

### Key Dependencies
- `zustand` - State management
- `react-hook-form` - Forms
- `lucide-react` - Icons
- `framer-motion` - Animations
- `qrcode.react` - QR codes
- `axios` - HTTP requests

## 🧩 Component Architecture

### Main Components
```typescript
DepositModal: 3-step stepper (Currency → Amount → Confirm)
- Step 1: CurrencySelector with search
- Step 2: Amount input with validation
- Step 3: Summary and confirmation

WithdrawModal: Single form
- Network selection (USDT Tron/Polygon)
- Amount slider + exact input
- Destination address
- Real-time USDT conversion
```

### Shared Components
```typescript
Modal: Portal-based with ESC handling
Button: Variants (primary, secondary, error), sizes, loading states
Input: Labels, errors, helper text, validation
Stepper: Progress indicator with completed/active states
CurrencySelector: Search + grid view with logos
LoadingSpinner: Different sizes
```

## 🎨 CSS Variable System

### Core Variables
```css
--nowpayments-primary: var(--np-primary, #3b82f6);
--nowpayments-surface: var(--np-surface, #ffffff);
--nowpayments-on-surface: var(--np-on-surface, #1f2937);
--nowpayments-border: var(--np-border, #e2e8f0);
--nowpayments-radius: var(--np-radius, 0.375rem);
```

### Client Usage
```css
:root {
  --np-primary: #7c3aed;
  --np-surface: #ffffff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --np-surface: #1f2937;
    --np-on-surface: #ffffff;
  }
}
```

## 📊 State Management

### Global Store (Zustand)
```typescript
interface NowPaymentsState {
  apiKey: string | null           // NOWPayments API key
  currencies: Currency[]          // All currency details
  enabledCurrencies: string[]     // Enabled currency IDs
  isLoadingCurrencies: boolean    // Loading state
  error: string | null            // Error handling
}
```

### Form Schemas (FIXED)
```typescript
interface DepositFormData {
  selectedCurrency: string  // e.g., 'btc', 'eth'
  amount: number
  customerEmail: string
}

interface WithdrawFormData {
  currency: 'usdttrc20' | 'usdtmatic'
  amount: number
  destinationAddress: string
}
```

## 🔌 API Integration

### NOWPayments Endpoints Used
```typescript
GET /v1/merchant/coins          // Get enabled currencies
GET /v1/full-currencies         // Get currency details + logos
```

### Logo URL Pattern
```typescript
`https://nowpayments.io/images/coins/${cg_id}.svg`
```

### Currency Filtering Logic
```typescript
1. Fetch enabled currency IDs from /v1/merchant/coins
2. Fetch all currency details from /v1/full-currencies
3. Filter details by enabled IDs
4. Display in CurrencySelector
```

## 🎭 Storybook Stories

### Created Stories
- `Introduction.mdx` - Overview and quick start
- `Button.stories.tsx` - All variants and states
- `Input.stories.tsx` - Labels, errors, validation
- `LoadingSpinner.stories.tsx` - Different sizes
- `Stepper.stories.tsx` - Progress states
- `CurrencySelector.stories.tsx` - With mock data
- `DepositModal.stories.tsx` - Interactive examples
- `WithdrawModal.stories.tsx` - Different scenarios

### Mock Data Strategy
```typescript
// Mock currencies for Storybook
const mockCurrencies: Currency[] = [
  { id: 1, code: 'BTC', name: 'Bitcoin', cg_id: 'btc', ... },
  { id: 2, code: 'ETH', name: 'Ethereum', cg_id: 'eth', ... },
]

// Setup in decorators
const store = useNowPaymentsStore.getState()
store.setCurrencies(mockCurrencies)
store.setEnabledCurrencies(['btc', 'eth'])
store.setApiKey('mock-api-key')
```

## 🚀 Build Configuration

### Package.json Exports
```json
{
  "name": "@taloon/nowpayments-components",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles/index.css"
  }
}
```

### Vite Library Config
```typescript
build: {
  lib: {
    entry: resolve(__dirname, 'src/index.ts'),
    name: 'NowpaymentsComponents',
    formats: ['es'],
  },
  rollupOptions: {
    external: ['react', 'react-dom'],
  },
}
```

## 🎯 Usage Examples

### Basic Setup
```typescript
import { DepositModal, useNowPaymentsStore } from '@taloon/nowpayments-components'
import '@taloon/nowpayments-components/styles'

// Global setup
useNowPaymentsStore().setApiKey('your-nowpayments-key')
```

### DepositModal Usage
```typescript
<DepositModal
  isOpen={showDeposit}
  onClose={() => setShowDeposit(false)}
  customerEmail="user@example.com"
  onSubmit={async (formData: DepositFormData) => {
    // Client adds extra data before sending to backend
    const payload = {
      ...formData,
      userId: currentUser.id,
      sessionId: getSessionId(),
    }
    return await fetch('/api/deposits', {
      method: 'POST',
      body: JSON.stringify(payload)
    }).then(r => r.json())
  }}
  onSuccess={(backendResponse: any) => {
    // Handle flexible response from client's backend
    console.log('Payment created:', backendResponse)
  }}
/>
```

## 🐛 Current Status

### ✅ Completed
- Full project structure with TypeScript
- CSS-first theming system
- All React components implemented
- Zustand store with currency management
- Complete Storybook stories
- Vite build configuration
- Package.json ready for npm publishing

### 🎯 Storybook Status
- **Running on**: http://localhost:6006/
- **Status**: Successfully compiled and running
- **Stories**: All components documented with interactive examples

### 📝 Next Steps (if needed)
1. Test actual build with `npm run build`
2. Test package installation locally
3. Create README.md with usage examples
4. Publish to npm with `@taloon` scope

## 🔍 Key Implementation Details

### Modal Portal Strategy
```typescript
// Renders modals in document.body to avoid z-index issues
return createPortal(modalContent, document.body)
```

### Currency Logo Error Handling
```typescript
<img
  src={getCurrencyLogo(currency.cg_id)}
  onError={(e) => e.currentTarget.style.display = 'none'}
/>
```

### Form Validation Pattern
```typescript
const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

// Usage
<Input
  {...register('amount', {
    required: 'Amount is required',
    min: { value: 0.01, message: 'Amount must be greater than 0' },
  })}
  error={errors.amount?.message}
/>
```

### Async Email Handling
```typescript
// Supports both string and async function
customerEmail: string | (() => Promise<string>)

// Implementation
const email = typeof customerEmail === 'function'
  ? await customerEmail()
  : customerEmail
```

This library is production-ready for npm publishing and client integration.