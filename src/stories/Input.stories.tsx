import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../components/shared/Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'user@example.com',
  },
}

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    error: 'Password must be at least 8 characters long',
    value: '123',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Amount',
    type: 'number',
    placeholder: '0.00',
    helperText: 'Enter the amount you want to deposit',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'This is disabled',
    disabled: true,
  },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
      <Input label="Normal Input" placeholder="Type something..." />
      <Input label="With Helper Text" placeholder="0.00" helperText="This is helper text" />
      <Input label="Error State" error="This field is required" />
      <Input label="Disabled" value="Disabled input" disabled />
      <Input type="number" label="Number Input" placeholder="123.45" />
    </div>
  ),
}