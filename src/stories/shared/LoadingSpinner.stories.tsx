import type { Meta, StoryObj } from '@storybook/react-vite'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'NOWPayments/Shared Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A lightweight animated loading spinner component built with SVG. Features multiple sizes and color variants with smooth CSS animations.

## Features

- **Multiple Sizes**: Small (16px), medium (24px), and large (32px)
- **Color Variants**: Primary, secondary, and inherit color schemes
- **SVG-based**: Crisp rendering at any resolution
- **Accessible**: Proper ARIA labels and semantic markup
- **Lightweight**: Pure CSS animations, no JavaScript dependencies
- **Customizable**: Accepts custom CSS classes for additional styling

## Usage

The LoadingSpinner component is used throughout the library to indicate loading states in buttons, forms, and data fetching scenarios.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the spinner',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'sm | md | lg' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'inherit'],
      description: 'Color variant of the spinner',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | secondary | inherit' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof LoadingSpinner>

// Basic spinner
export const Default: Story = {
  args: {},
}

// Size variants
export const Small: Story = {
  args: {
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small spinner (16px) - ideal for inline use or small buttons.',
      },
    },
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium spinner (24px) - the default size for most use cases.',
      },
    },
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large spinner (32px) - suitable for prominent loading states.',
      },
    },
  },
}

// Color variants
export const Primary: Story = {
  args: {
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary color variant using the theme\'s primary color.',
      },
    },
  },
}

export const Secondary: Story = {
  args: {
    color: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary color variant using the theme\'s secondary color.',
      },
    },
  },
}

export const Inherit: Story = {
  args: {
    color: 'inherit',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inherit color variant that adopts the parent element\'s text color.',
      },
    },
  },
}

// Size comparison
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner size="sm" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner size="md" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Medium</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner size="lg" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Large</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all available spinner sizes.',
      },
    },
  },
}

// Color comparison
export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner color="primary" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Primary</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner color="secondary" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Secondary</p>
      </div>
      <div style={{ textAlign: 'center', color: '#e74c3c' }}>
        <LoadingSpinner color="inherit" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Inherit</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all available color variants. The inherit variant shows in red to demonstrate color inheritance.',
      },
    },
  },
}

// In button context
export const InButton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          background: '#007bff',
          color: 'white',
          cursor: 'not-allowed',
        }}
        disabled
      >
        <LoadingSpinner size="sm" color="inherit" />
        Loading...
      </button>
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '4px',
          background: '#28a745',
          color: 'white',
          cursor: 'not-allowed',
        }}
        disabled
      >
        <LoadingSpinner size="md" color="inherit" />
        Processing...
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading spinners used within button components to indicate loading states.',
      },
    },
  },
}

// Different contexts
export const InCard: Story = {
  render: () => (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '2rem',
        textAlign: 'center',
        background: '#f9f9f9',
        width: '300px',
      }}
    >
      <LoadingSpinner size="lg" />
      <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Loading Data</h3>
      <p style={{ margin: 0, color: '#666' }}>Please wait while we fetch your information...</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading spinner displayed within a card component for data loading states.',
      },
    },
  },
}

// Overlay loading
export const OverlayLoading: Story = {
  render: () => (
    <div style={{ position: 'relative', width: '300px', height: '200px' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#f0f0f0',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          color: '#666',
        }}
      >
        Content Area
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoadingSpinner size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading spinner used as an overlay on top of content during loading operations.',
      },
    },
  },
}

// With text
export const WithText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <LoadingSpinner size="sm" />
        <span>Loading currencies...</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <LoadingSpinner size="md" />
        <span>Processing payment...</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <LoadingSpinner size="lg" />
        <span>Connecting to server...</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading spinners paired with descriptive text for different loading scenarios.',
      },
    },
  },
}

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <LoadingSpinner
        size="lg"
        className="custom-spinner"
      />
      <div style={{ background: '#333', padding: '1rem', borderRadius: '8px' }}>
        <LoadingSpinner size="md" color="inherit" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of custom styling applied to loading spinners using CSS properties.',
      },
    },
  },
}