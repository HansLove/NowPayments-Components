# NOWPayments Components - Technical Guidelines

Biblioteca de componentes React para criptomonedas con integración de NOWPayments API. Este documento proporciona la documentación técnica para desarrollo y mantenimiento.

Ver [README.md](./README.md) para contexto de negocio y ejemplos de uso.

## Quick Reference

- **README.md**: [link](./README.md) - Contexto de negocio y documentación de usuario
- **Build**: `npm run build` - Construye la biblioteca usando Vite
- **Test**: `npm run lint && npm run type-check` - Ejecuta linting y verificación de tipos
- **Dev**: `npm run storybook` - Inicia Storybook en puerto 6006
- **CSS Guide**: [CSS_THEMING.md](./CSS_THEMING.md) - Guía completa de theming

## Code Standards

### Naming Conventions

**Archivos y Directorios:**
```
src/
├── components/           # Componentes organizados por feature
│   ├── DepositModal/    # Modal principal de depósitos
│   ├── WithdrawModal/   # Modal principal de retiros
│   └── shared/          # Componentes reutilizables
├── hooks/               # Custom hooks con prefijo 'use'
├── stores/              # Zustand stores con sufijo 'Store'
├── types/               # Interfaces TypeScript
├── utils/               # Utilidades generales
└── styles/              # CSS con metodología BEM
```

**Componentes React:**
- **PascalCase**: `DepositModal`, `CurrencySelector`
- **Archivos**: `index.tsx` para componente principal
- **Props interfaces**: `ComponentNameProps`

**Hooks y Stores:**
- **Hooks**: `useNowPayments`, `useCurrencies`
- **Stores**: `nowPaymentsStore` (Zustand)
- **Variables**: `camelCase` descriptivo

**CSS y Clases:**
- **BEM methodology**: `.np-modal__header`, `.np-button--primary`
- **CSS Variables**: `--np-primary`, `--np-surface`
- **Prefijo consistente**: `np-` para evitar colisiones

### Common Patterns

**Component Structure Pattern:**
```tsx
// ✅ Estructura estándar de componentes
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { ComponentProps } from '@/types'

interface LocalState {
  // Estado local específico del componente
}

export function ComponentName({
  prop1,
  prop2,
  onCallback,
}: ComponentProps) {
  // 1. Hooks de estado
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
// ✅ Manejo consistente de errores
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
// ✅ Soporte para props síncronos y asíncronos
customerEmail?: string | (() => Promise<string>)

// Implementation
const getEmail = async () => {
  return typeof customerEmail === 'function'
    ? await customerEmail()
    : customerEmail || ''
}
```

### Antipatterns to Address

**❌ Props drilling excesivo:**
```tsx
// Problemático - pasar props a través de múltiples niveles
<Modal>
  <ModalContent isLoading={isLoading} error={error}>
    <Step1 isLoading={isLoading} error={error} />
  </ModalContent>
</Modal>
```

**✅ Usar context o store:**
```tsx
// Mejor - usar store global o context
const { isLoading, error } = useNowPaymentsStore()
```

**❌ Mutación directa de estado:**
```tsx
// Problemático
currencies.push(newCurrency)
```

**✅ Inmutabilidad:**
```tsx
// Correcto
setCurrencies(prev => [...prev, newCurrency])
```

**❌ CSS inline en componentes:**
```tsx
// Problemático
<div style={{ color: '#3b82f6', marginTop: '1rem' }}>
```

**✅ CSS variables y clases:**
```tsx
// Correcto
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

### Configuración de Build

**Vite Library Mode:**
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'NowpaymentsComponents',
      formats: ['es'],              // Solo ES modules
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
// Configurados en vite.config.ts
'@': './src'
'@/components': './src/components'
'@/hooks': './src/hooks'
'@/types': './src/types'
'@/utils': './src/utils'
'@/stores': './src/stores'
'@/styles': './src/styles'
```

### ESLint Configuration

**Reglas principales:**
- TypeScript strict mode habilitado
- React hooks rules enforcement
- Unused variables como error (excepto `_` prefix)
- `no-explicit-any` como warning
- Storybook rules para stories

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
- Todos los componentes shared tienen stories
- Modales principales con diferentes estados
- Interactive examples con mock data
- Theme variations documentadas

## Cross-References

- **CSS Theming**: [CSS_THEMING.md](./CSS_THEMING.md) - Guía completa de theming
- **Business Context**: [README.md](./README.md) - Documentación de usuario
- **Development Progress**: [progress.md](./progress.md) - Estado actual del desarrollo
- **Original Plan**: [nowpayments.md](./nowpayments.md) - Plan inicial del proyecto

## Key Implementation Details

### Modal Portal Strategy
```tsx
// Renderiza modales en document.body para evitar z-index issues
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
// React Hook Form con integración de componentes
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
/* Fallback pattern para máxima compatibilidad */
.np-button--primary {
  background-color: var(--np-primary, #3b82f6);
  color: var(--np-on-primary, #ffffff);
}
```

Esta biblioteca está lista para producción y publicación en NPM con el scope `@taloon`.