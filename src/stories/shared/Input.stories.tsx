import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '@/components/shared/Input'
import { useState } from 'react'

// Simple mock function for actions
const mockFn = () => {}

const meta: Meta<typeof Input> = {
  title: 'NOWPayments/Shared Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible input component with floating labels, validation states, and multiple variants. Features smooth animations and accessibility support.

## Features

- **Variants**: Filled, outlined, and standard styles
- **Floating Labels**: Labels animate when focused or filled
- **Validation**: Error states with error messages
- **Helper Text**: Additional guidance for users
- **Types**: Supports all HTML input types (text, email, number, password, etc.)
- **Accessibility**: Full keyboard navigation and screen reader support
- **Forwarded Ref**: Compatible with form libraries like React Hook Form

## Usage

The Input component is used throughout the library for form fields, search inputs, and data entry.
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text that floats when focused or filled',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: 'text',
      description: 'Error message to display below the input',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the input when there is no error',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'standard'],
      description: 'Visual style variant of the input',
      table: {
        defaultValue: { summary: 'filled' },
        type: { summary: 'filled | outlined | standard' },
      },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'number', 'password', 'tel', 'url', 'search'],
      description: 'HTML input type',
      table: {
        defaultValue: { summary: 'text' },
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Makes the input required',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Change handler function',
    },
    onFocus: {
      action: 'focused',
      description: 'Focus handler function',
    },
    onBlur: {
      action: 'blurred',
      description: 'Blur handler function',
    },
  },
  args: {
    onChange: mockFn,
    onFocus: mockFn,
    onBlur: mockFn,
  },
}

export default meta
type Story = StoryObj<typeof Input>

// Basic variants
export const Default: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter text...',
  },
}

export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Filled Input',
    placeholder: 'Enter text...',
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Outlined Input',
    placeholder: 'Enter text...',
  },
}

export const Standard: Story = {
  args: {
    variant: 'standard',
    label: 'Standard Input',
    placeholder: 'Enter text...',
  },
}

// With helper text
export const WithHelperText: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'user@example.com',
    helperText: 'We\'ll never share your email with anyone else.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with helper text that provides additional guidance to users.',
      },
    },
  },
}

// Error state
export const WithError: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input showing an error state with error message. Helper text is hidden when error is present.',
      },
    },
  },
}

// Different input types
export const EmailType: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'user@example.com',
  },
}

export const NumberType: Story = {
  args: {
    label: 'Amount',
    type: 'number',
    placeholder: '0.00',
    min: 0,
    step: 0.01,
  },
}

export const PasswordType: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password...',
  },
}

// States
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'This input is disabled',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input in disabled state. Cannot be focused or edited.',
      },
    },
  },
}

export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
    helperText: 'This field is required',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input marked as required with appropriate styling.',
      },
    },
  },
}

// Pre-filled
export const PreFilled: Story = {
  args: {
    label: 'Pre-filled Input',
    value: 'This input has a value',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with a pre-filled value. Note how the label floats automatically.',
      },
    },
  },
}

// No label
export const NoLabel: Story = {
  args: {
    placeholder: 'Input without label',
    helperText: 'This input has no label, only placeholder text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input without a label, using only placeholder text.',
      },
    },
  },
}

// Interactive controlled example
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)
      
      // Simple validation
      if (newValue.length > 0 && newValue.length < 3) {
        setError('Must be at least 3 characters')
      } else {
        setError('')
      }
    }

    return (
      <Input
        label="Controlled Input"
        value={value}
        onChange={handleChange}
        error={error}
        helperText={!error ? 'Type something to see validation in action' : undefined}
        placeholder="Start typing..."
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled input with real-time validation. Try typing to see the error state in action.',
      },
    },
  },
}

// Comparison of all variants
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '300px' }}>
      <Input variant="filled" label="Filled Variant" value="Sample text" />
      <Input variant="outlined" label="Outlined Variant" value="Sample text" />
      <Input variant="standard" label="Standard Variant" value="Sample text" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all input variants with the same content.',
      },
    },
  },
}

// Form example
export const FormExample: Story = {
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
      <Input
        label="First Name"
        type="text"
        required
        helperText="Enter your first name"
      />
      <Input
        label="Email Address"
        type="email"
        required
        helperText="We'll use this to contact you"
      />
      <Input
        label="Amount"
        type="number"
        min={0}
        step={0.01}
        placeholder="0.00"
        helperText="Enter amount in USD"
      />
      <Input
        label="Wallet Address"
        type="text"
        placeholder="0x..."
        helperText="Your cryptocurrency wallet address"
      />
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example form showing multiple input fields with different types and configurations.',
      },
    },
  },
}