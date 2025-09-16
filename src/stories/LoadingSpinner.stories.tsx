import type { Meta, StoryObj } from '@storybook/react'
import { LoadingSpinner } from '../components/shared/LoadingSpinner'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner size="sm" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Small</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner size="md" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Medium</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner size="lg" />
        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Large</div>
      </div>
    </div>
  ),
}