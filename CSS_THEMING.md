# CSS Theming Guide

This library uses **CSS Custom Properties** for theming. You can customize the appearance by defining CSS variables in your application.

## Quick Start

1. Import the components and styles:

```tsx
import { DepositModal } from '@taloon/nowpayments-components'
import '@taloon/nowpayments-components/styles'
```

2. Customize using CSS variables:

```css
:root {
  --np-primary: #7c3aed;
  --np-surface: #ffffff;
  --np-on-surface: #1f2937;
}
```

## Available CSS Variables

### Colors

```css
/* Primary Colors */
--np-primary: #3b82f6;              /* Main brand color */
--np-primary-hover: #2563eb;        /* Primary hover state */
--np-primary-active: #1d4ed8;       /* Primary active state */

/* Surface Colors */
--np-surface: #ffffff;              /* Main background */
--np-surface-variant: #f8fafc;      /* Secondary background */
--np-surface-hover: #f1f5f9;        /* Hover background */

/* Text Colors */
--np-on-surface: #1f2937;           /* Primary text */
--np-on-surface-variant: #64748b;   /* Secondary text */
--np-on-primary: #ffffff;           /* Text on primary background */

/* Status Colors */
--np-error: #ef4444;
--np-success: #10b981;
--np-warning: #f59e0b;

/* Borders */
--np-border: #e2e8f0;
--np-border-variant: #cbd5e1;
```

### Spacing

```css
--np-spacing-xs: 0.25rem;
--np-spacing-sm: 0.5rem;
--np-spacing-md: 0.75rem;
--np-spacing-lg: 1rem;
--np-spacing-xl: 1.5rem;
--np-spacing-2xl: 2rem;
```

### Typography

```css
--np-font-family: system-ui, sans-serif;
--np-font-size-xs: 0.75rem;
--np-font-size-sm: 0.875rem;
--np-font-size-base: 1rem;
--np-font-size-lg: 1.125rem;
--np-font-size-xl: 1.25rem;
--np-font-size-2xl: 1.5rem;
```

### Border Radius

```css
--np-radius-sm: 0.25rem;
--np-radius: 0.375rem;
--np-radius-md: 0.5rem;
--np-radius-lg: 0.75rem;
--np-radius-xl: 1rem;
```

### Shadows

```css
--np-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--np-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--np-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--np-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

## Theme Examples

### Dark Mode

```css
/* Automatic dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --np-surface: #1f2937;
    --np-surface-variant: #374151;
    --np-surface-hover: #4b5563;
    --np-on-surface: #f9fafb;
    --np-on-surface-variant: #d1d5db;
    --np-border: #4b5563;
    --np-border-variant: #6b7280;
    --np-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.3);
  }
}

/* Class-based dark mode */
.dark {
  --np-surface: #1f2937;
  --np-on-surface: #f9fafb;
  /* ... other dark variables */
}
```

### Custom Brand Theme

```css
:root {
  /* Purple brand theme */
  --np-primary: #7c3aed;
  --np-primary-hover: #6d28d9;
  --np-primary-active: #5b21b6;
  --np-accent: #f59e0b;

  /* Custom radius */
  --np-radius: 0.75rem;
  --np-radius-lg: 1rem;

  /* Custom font */
  --np-font-family: 'Inter', sans-serif;
}
```

### Minimal Theme

```css
:root {
  /* Minimal grayscale */
  --np-primary: #000000;
  --np-primary-hover: #1f2937;
  --np-surface: #ffffff;
  --np-on-surface: #000000;
  --np-border: #e5e7eb;

  /* Minimal spacing */
  --np-spacing-md: 0.5rem;
  --np-spacing-lg: 0.75rem;
  --np-spacing-xl: 1rem;

  /* Sharp corners */
  --np-radius: 0;
  --np-radius-lg: 0;
}
```

## Framework Integration

### Tailwind CSS

```css
:root {
  --np-primary: theme('colors.blue.500');
  --np-primary-hover: theme('colors.blue.600');
  --np-surface: theme('colors.white');
  --np-on-surface: theme('colors.gray.900');
  --np-border: theme('colors.gray.200');
  --np-radius: theme('borderRadius.lg');
}

@media (prefers-color-scheme: dark) {
  :root {
    --np-surface: theme('colors.gray.900');
    --np-on-surface: theme('colors.gray.100');
    --np-border: theme('colors.gray.700');
  }
}
```

### CSS-in-JS (styled-components)

```tsx
import styled, { createGlobalStyle } from 'styled-components'

const GlobalTheme = createGlobalStyle`
  :root {
    --np-primary: ${props => props.theme.colors.primary};
    --np-surface: ${props => props.theme.colors.background};
    --np-on-surface: ${props => props.theme.colors.text};
  }
`
```

### CSS Modules

```css
/* theme.module.css */
.lightTheme {
  --np-surface: #ffffff;
  --np-on-surface: #1f2937;
}

.darkTheme {
  --np-surface: #1f2937;
  --np-on-surface: #f9fafb;
}
```

```tsx
import styles from './theme.module.css'

function App() {
  const [isDark, setIsDark] = useState(false)

  return (
    <div className={isDark ? styles.darkTheme : styles.lightTheme}>
      <DepositModal {...props} />
    </div>
  )
}
```

## Tips

1. **Start with base variables**: You don't need to override everything, just the colors you want to change
2. **Use semantic names**: Variables like `--np-surface` work better than specific colors
3. **Test in different contexts**: Make sure your theme works with different backgrounds
4. **Consider accessibility**: Ensure sufficient contrast ratios
5. **Use fallbacks**: The library provides sensible defaults for all variables