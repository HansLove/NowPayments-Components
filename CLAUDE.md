# NOWPayments Components - Technical Guidelines

React component library for cryptocurrency payments with NOWPayments API integration. This document provides technical documentation for development and maintenance.

See @README.md for business context and usage examples.

## Quick Reference

- **@README.md**: Business context and user documentation
- **Build**: `npm run build` - Builds the library using Vite
- **Test**: `npm run lint && npm run type-check` - Runs linting and type checking
- **Dev**: `npm run storybook` - Starts Storybook on port 6006
- **CSS Guide**: [CSS_THEMING.md](./CSS_THEMING.md) - Complete theming guide
- **CSS Prefix**: `nowpayments-` (for clarity and namespace isolation)

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
├── hooks/               # Custom hooks for state management
├── types/               # TypeScript interfaces
├── utils/               # General utilities
└── styles/              # CSS with BEM methodology
```

**React Components:**
- **PascalCase**: `DepositModal`, `CurrencySelector`
- **Files**: `index.tsx` for main component
- **Props interfaces**: `ComponentNameProps`

**Hooks:**
- **Hooks**: `useNowPayments`, `useCurrencies`
- **Variables**: descriptive `camelCase`

**CSS and Classes:**
- **BEM methodology**: `.nowpayments-modal__header`, `.nowpayments-button--primary`
- **CSS Variables**: `--nowpayments-primary`, `--nowpayments-surface`
- **Consistent prefix**: `nowpayments-` for clarity and namespace isolation

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

  // 3. Custom hooks
  const { currencies, isLoading } = useCurrencies()

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
    <div className="nowpayments-component">
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

**✅ Use React Context or custom hooks:**
```tsx
// Better - use React Context or custom hooks
const { isLoading, error } = useCurrencies()
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
<div className="nowpayments-component__header">
```

### Established Project Patterns

**Import Organization (Consistent Order):**
```tsx
// ✅ Standard import structure observed in all components
import { useState, useEffect } from 'react'        // 1. React hooks
import { useForm } from 'react-hook-form'           // 2. Third-party hooks
import Modal from '../shared/Modal'                 // 3. Local components
import { Copy, ExternalLink } from 'lucide-react'   // 4. Icons
import { useNowPayments } from '@/hooks'            // 5. Custom hooks
import type { ComponentProps } from '@/types'       // 6. Type imports
```

**Asset Handling Pattern:**
```tsx
// ✅ Consistent asset import with TypeScript workaround
// @ts-expect-error File exists
import NowPaymentsLogo from '@/assets/nowpayments-logo.png'
```

**Inline Styles for CSS Variables:**
```tsx
// ✅ Acceptable pattern for dynamic CSS variable usage
<div style={{
  marginBottom: 'var(--nowpayments-spacing-lg)',
  fontSize: 'var(--nowpayments-font-size-sm)'
}}>
```

**Modal State Management Pattern:**
```tsx
// ✅ Standard modal state structure
const [currentStep, setCurrentStep] = useState(1)
const [isSubmitting, setIsSubmitting] = useState(false)
const [steps, setSteps] = useState(INITIAL_STEPS)
const [modalData, setModalData] = useState<DataType | null>(null)
```

**Form Integration Pattern:**
```tsx
// ✅ React Hook Form integration standard
const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormType>()

// ✅ Error handling in forms
{errors.fieldName?.message && (
  <div className="nowpayments-error">{errors.fieldName.message}</div>
)}
```

**Number Input Pattern:**
```tsx
// ✅ Use valueAsNumber for numeric inputs
<input
  type="number"
  {...register('amount', {
    required: 'Amount is required',
    valueAsNumber: true,  // Converts string to number automatically
    min: { value: 0.01, message: 'Amount must be greater than 0' },
    max: { value: maxValue, message: 'Amount exceeds maximum' },
  })}
/>

// ✅ Type safety: define amount as number (not number | undefined)
interface FormData {
  amount: number  // Not number | undefined
}

// ✅ Default values should be numbers
const { register } = useForm<FormData>({
  defaultValues: {
    amount: 0,  // Not undefined
  },
})
```

**Event Handler Naming:**
```tsx
// ✅ Consistent event handler patterns
const handleSubmit = async () => { /* form submission */ }
const handleClose = () => { /* modal closure */ }
const handleSelect = (item: Type) => { /* selection */ }
const handleCopy = async () => { /* copy to clipboard */ }
```

**Props Destructuring Pattern:**
```tsx
// ✅ Props with defaults and clear separation
export function Component({
  isOpen,
  onClose,
  customerEmail,
  onSubmit,
  onSuccess,
  onError,
  enableEmail = false,        // Defaults grouped together
  shouldNotifyByEmail = false,
}: ComponentProps) {
```

**Constants Definition:**
```tsx
// ✅ Component-level constants in UPPER_CASE
const STEPS: StepperStep[] = [
  { id: 1, title: 'Select Currency', completed: false, active: true },
  // ...
]
```

**Error Boundary Pattern:**
```tsx
// ✅ Consistent error handling with user-friendly messages
const errorMessage = error instanceof Error
  ? error.message
  : 'An unexpected error occurred'
setError(errorMessage)
onError?.(new Error(errorMessage))
```

**Loading State Management:**
```tsx
// ✅ Standard loading states across components
const [isLoading, setIsLoading] = useState(false)

// Usage in async operations
setIsLoading(true)
try {
  const result = await operation()
  onSuccess?.(result)
} finally {
  setIsLoading(false)
}
```

**Conditional Rendering Patterns:**
```tsx
// ✅ Guard clauses for early returns
if (!isOpen) return null

// ✅ Conditional content with logical AND
{error && (
  <div className="nowpayments-error">{error}</div>
)}

// ✅ Logical AND to render multiple cases
{isLoading && <LoadingSpinner /> }
{!isLoading && <Content />}
```

**TypeScript Interface Naming:**
```tsx
// ✅ Props interfaces follow ComponentNameProps pattern
interface DepositModalProps { /* ... */ }
interface WithdrawModalProps { /* ... */ }
interface CurrencySelectoryProps { /* ... */ }

// ✅ Data interfaces describe content
interface DepositFormData { /* ... */ }
interface Currency { /* ... */ }
interface StepperStep { /* ... */ }
interface PaymentDetails { /* ... */ }
```

**New Patterns (v2.0.0):**

**Email Handling Pattern:**
```tsx
// ✅ Mutually exclusive email props
interface DepositModalProps {
  customerEmail?: string | (() => Promise<string>)  // Provided email
  showEmailInput?: boolean                          // Show input for user
}

// Implementation
const shouldShowEmailInput = showEmailInput && !customerEmail
```

**onSuccess Return Pattern:**
```tsx
// ✅ onSuccess now returns PaymentDetails for controlled mapping
onSuccess?: (backendResponse: any) => PaymentDetails | Promise<PaymentDetails>

// Usage
onSuccess: (response) => {
  // Map backend response to required format
  return {
    address: response.data.depositAddress,
    paymentId: response.data.id,
  }
}
```

**Step Component Pattern:**
```tsx
// ✅ Presentation components with clear props
interface AmountEntryStepProps {
  register: UseFormRegister<{ amount: number; email?: string }>
  errors: FieldErrors<{ amount: number; email?: string }>
  showEmailInput: boolean
  customerEmail?: string | (() => Promise<string>)
  // ... other presentation props
}
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

### State Management

**Architecture**: Uses React's built-in state management with hooks and Context API.

See @src/hooks/useNowPayments.ts and @src/components/NowPaymentsProvider/index.tsx for current implementation details including context setup, custom hooks, and state management patterns.

**Why React Context**: Simpler architecture, better React 18 compatibility, and reduced bundle size.

### Type System

**Fixed Schemas (Frontend → Backend):**
See @src/types/index.ts for current `DepositFormData` and `WithdrawFormData` interfaces - these schemas are fixed and provide consistent structure for backend integration.

**Flexible Response Handling:**
The `onSubmit` and `onSuccess` patterns allow any backend response schema while maintaining type safety through the fixed form schemas.

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

### Development Workflow

**Quality Assurance Pipeline:**
```bash
# ✅ Standard pre-commit/development workflow
npm run lint && npm run type-check  # Always run before commits
npm run build                       # Verify build works
npm run storybook                   # Manual component testing
```

### Build Configuration

**Vite Library Mode:**
See @vite.config.ts for current build configuration including library mode setup, external dependencies, and output formats.

**Path Aliases:**
Configured in @vite.config.ts - all `@/*` paths resolve to `./src/*` for clean imports across the codebase.

### ESLint Configuration

See @eslint.config.js for current linting rules including TypeScript strict mode, React hooks enforcement, and Storybook-specific configurations.

### Deployment Strategy

**Package Structure:**
See @package.json for current export configuration, build outputs, and publishing setup including package name, exports mapping, and included files.

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


### CSS Variable System
```css
/* Dual-layer CSS variable system */
/* Internal variables (--nowpayments-*) */
.nowpayments-button--primary {
  background-color: var(--nowpayments-primary, #3b82f6);
  color: var(--nowpayments-on-primary, #ffffff);
}

/* Public API variables (--np-*) that map to internal ones */
:root {
  --nowpayments-primary: var(--np-primary, #3b82f6);
  --nowpayments-surface: var(--np-surface, #ffffff);
}
```

This library is ready for production and NPM publishing with the `@taloon` scope.