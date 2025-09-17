# NOWPayments Components - Technical Guidelines

React component library for cryptocurrency payments with NOWPayments API integration. This document provides technical documentation for development and maintenance.

See [README.md](./README.md) for business context and usage examples.

## Quick Reference

- **README.md**: [link](./README.md) - Business context and user documentation
- **Build**: `npm run build` - Builds the library using Vite
- **Test**: `npm run lint && npm run type-check` - Runs linting and type checking
- **Dev**: `npm run storybook` - Starts Storybook on port 6006
- **CSS Guide**: [CSS_THEMING.md](./CSS_THEMING.md) - Complete theming guide

## Code Standards

### Naming Conventions

**Files and Directories:**
```
src/
├── components/           # Components organized by feature
│   ├── DepositModal/    # Main deposit modal
│   ├── WithdrawModal/   # Main withdrawal modal
│   └── shared/          # Reusable components
├── hooks/               # Custom hooks with 'use' prefix
├── stores/              # Zustand stores with 'Store' suffix
├── types/               # TypeScript interfaces
├── utils/               # General utilities
└── styles/              # CSS with BEM methodology
```

**React Components:**
- **PascalCase**: `DepositModal`, `CurrencySelector`
- **Files**: `index.tsx` for main component
- **Props interfaces**: `ComponentNameProps`

**Hooks and Stores:**
- **Hooks**: `useNowPayments`, `useCurrencies`
- **Stores**: `nowPaymentsStore` (Zustand)
- **Variables**: descriptive `camelCase`

**CSS and Classes:**
- **BEM methodology**: `.np-modal__header`, `.np-button--primary`
- **CSS Variables**: `--np-primary`, `--np-surface`
- **Consistent prefix**: `np-` to avoid collisions

### Common Patterns

**Component Structure Pattern:**
```tsx
// ✅ Standard component structure
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { ComponentProps } from '@/types'

interface LocalState {
  // Component-specific local state
}

export function ComponentName({
  prop1,
  prop2,
  onCallback,
}: ComponentProps) {
  // 1. State hooks
  const [localState, setLocalState] = useState<LocalState>()

  // 2. Form hooks
  const { register, handleSubmit, formState: { errors } } = useForm()

  // 3. Store hooks
  const { currencies, isLoading } = useNowPaymentsStore()

  // 4. Effects
  useEffect(() => {
    // Side effects
  }, [dependencies])

  // 5. Event handlers
  const handleEvent = async () => {
    // Handle events
  }

  // 6. Render
  return (
    <div className="np-component">
      {/* JSX content */}
    </div>
  )
}

export default ComponentName
```

**Error Handling Pattern:**
```tsx
// ✅ Consistent error handling
try {
  const result = await onSubmit(formData)
  onSuccess?.(result)
} catch (error) {
  const errorMessage = error instanceof Error
    ? error.message
    : 'An unexpected error occurred'
  setError(errorMessage)
  onError?.(new Error(errorMessage))
}
```

**Async Props Pattern:**
```tsx
// ✅ Support for sync and async props
customerEmail?: string | (() => Promise<string>)

// Implementation
const getEmail = async () => {
  return typeof customerEmail === 'function'
    ? await customerEmail()
    : customerEmail || ''
}
```

### Antipatterns to Address

**❌ Excessive props drilling:**
```tsx
// Problematic - passing props through multiple levels
<Modal>
  <ModalContent isLoading={isLoading} error={error}>
    <Step1 isLoading={isLoading} error={error} />
  </ModalContent>
</Modal>
```

**✅ Use context or store:**
```tsx
// Better - use global store or context
const { isLoading, error } = useNowPaymentsStore()
```

**❌ Direct state mutation:**
```tsx
// Problematic
currencies.push(newCurrency)
```

**✅ Immutability:**
```tsx
// Correct
setCurrencies(prev => [...prev, newCurrency])
```

**❌ Inline CSS in components:**
```tsx
// Problematic
<div style={{ color: '#3b82f6', marginTop: '1rem' }}>
```

**✅ CSS variables and classes:**
```tsx
// Correct
<div className="np-component__header">
```

## Architecture

### Frontend-Only Philosophy

**Responsabilidades del Frontend:**
- Fetching de currencies desde NOWPayments (solo para display)
- Recolección y validación de form data
- Manejo de estados de UI (loading, error, success)
- Theming y personalización visual

**Responsabilidades del Backend (cliente):**
- Procesamiento de pagos con NOWPayments API
- Manejo de webhooks e IPN callbacks
- Lógica de negocio específica
- Gestión de usuarios y sesiones

### Component Architecture

```
┌─────────────────────────────────────┐
│            Main Modals              │
├─────────────────────────────────────┤
│ DepositModal    │ WithdrawModal     │
│ (3-step flow)   │ (single form)     │
└─────────────────┴─────────────────┬─┘
                                    │
┌───────────────────────────────────┴─┐
│         Shared Components           │
├─────────────────────────────────────┤
│ Modal │ Button │ Input │ Stepper    │
│ CurrencySelector │ LoadingSpinner   │
└─────────────────────────────────────┘
```

### State Management (Zustand)

```typescript
interface NowPaymentsState {
  // API Configuration
  apiKey: string | null

  // Currency Data
  currencies: Currency[]
  enabledCurrencies: string[]

  // Loading States
  isLoadingCurrencies: boolean

  // Error Handling
  error: string | null

  // Actions
  setApiKey: (key: string) => void
  fetchCurrencies: () => Promise<void>
  setCurrencies: (currencies: Currency[]) => void
  setError: (error: string | null) => void
}
```

### Type System

**Fixed Schemas (Frontend → Backend):**
```typescript
// Estos esquemas son fijos y no deben cambiar
interface DepositFormData {
  selectedCurrency: string
  amount: number
  customerEmail?: string
}

interface WithdrawFormData {
  currency: 'usdttrc20' | 'usdtmatic'
  amount: number
  destinationAddress: string
}
```

**Flexible Response Handling:**
```typescript
// El backend puede retornar cualquier esquema
onSubmit: (formData: FixedFormData) => Promise<any>
onSuccess?: (backendResponse: any) => void
```

## Build & Development

### Scripts Principales

```bash
# Desarrollo
npm run dev              # Vite dev server (desarrollo de biblioteca)
npm run storybook        # Storybook en puerto 6006

# Build
npm run build           # Vite build para distribución
npm run build-storybook # Build static de Storybook

# Quality Assurance
npm run lint            # ESLint con configuración TypeScript
npm run type-check      # TypeScript compiler sin emit

# Preview
npm run preview         # Preview del build de Vite
```

### Build Configuration

**Vite Library Mode:**
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'NowpaymentsComponents',
      formats: ['es'],              // ES modules only
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Peer dependencies
    },
  },
})
```

**Path Aliases:**
```typescript
// Configured in vite.config.ts
'@': './src'
'@/components': './src/components'
'@/hooks': './src/hooks'
'@/types': './src/types'
'@/utils': './src/utils'
'@/stores': './src/stores'
'@/styles': './src/styles'
```

### ESLint Configuration

**Main Rules:**
- TypeScript strict mode enabled
- React hooks rules enforcement
- Unused variables as error (except `_` prefix)
- `no-explicit-any` as warning
- Storybook rules for stories

### Deployment Strategy

**Package Structure:**
```
dist/
├── index.js           # Componentes y hooks
├── index.d.ts         # Type definitions
└── styles/
    └── index.css      # CSS con variables
```

**NPM Publishing:**
```json
{
  "name": "@taloon/nowpayments-components",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles/index.css"
  },
  "files": ["dist", "README.md"]
}
```

## Testing Strategy

### Quality Assurance Commands

```bash
# Pre-commit/pre-push checks
npm run lint && npm run type-check

# Build verification
npm run build && npm run preview

# Storybook testing
npm run build-storybook
```

### Manual Testing via Storybook

**Story Coverage:**
- All shared components have stories
- Main modals with different states
- Interactive examples with mock data
- Documented theme variations

## Cross-References

- **CSS Theming**: [CSS_THEMING.md](./CSS_THEMING.md) - Complete theming guide
- **Business Context**: [README.md](./README.md) - User documentation
- **Development Progress**: [progress.md](./progress.md) - Current development status
- **Original Plan**: [nowpayments.md](./nowpayments.md) - Initial project plan

## Key Implementation Details

### Modal Portal Strategy
```tsx
// Renders modals in document.body to avoid z-index issues
return createPortal(
  <div className="np-modal-overlay">{children}</div>,
  document.body
)
```

### Currency Logo Error Handling
```tsx
<img
  src={`https://nowpayments.io/images/coins/${currency.cg_id}.svg`}
  onError={(e) => {
    e.currentTarget.style.display = 'none'
  }}
  alt={currency.name}
/>
```

### Form Validation Integration
```tsx
// React Hook Form with component integration
const { register, handleSubmit, formState: { errors } } = useForm()

<Input
  {...register('amount', {
    required: 'Amount is required',
    min: { value: 0.01, message: 'Amount must be greater than 0' },
  })}
  error={errors.amount?.message}
  label="Amount"
/>
```

### CSS Variable System
```css
/* Fallback pattern for maximum compatibility */
.np-button--primary {
  background-color: var(--np-primary, #3b82f6);
  color: var(--np-on-primary, #ffffff);
}
```

This library is ready for production and NPM publishing with the `@taloon` scope.