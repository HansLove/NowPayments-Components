import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stepper } from '@/components/shared/Stepper'
import type { StepperStep } from '@/types'

// Mock stepper data
const defaultSteps: StepperStep[] = [
  {
    id: 1,
    title: 'Select Currency',
    description: 'Choose your preferred cryptocurrency',
    completed: true,
    active: false,
  },
  {
    id: 2,
    title: 'Enter Amount',
    description: 'Specify the amount to deposit',
    completed: false,
    active: true,
  },
  {
    id: 3,
    title: 'Payment Details',
    description: 'Complete your transaction',
    completed: false,
    active: false,
  },
]

const threeStepsCompleted: StepperStep[] = [
  {
    id: 1,
    title: 'Select Currency',
    description: 'Choose your preferred cryptocurrency',
    completed: true,
    active: false,
  },
  {
    id: 2,
    title: 'Enter Amount',
    description: 'Specify the amount to deposit',
    completed: true,
    active: false,
  },
  {
    id: 3,
    title: 'Payment Details',
    description: 'Complete your transaction',
    completed: true,
    active: false,
  },
]

const firstStepActive: StepperStep[] = [
  {
    id: 1,
    title: 'Select Currency',
    description: 'Choose your preferred cryptocurrency',
    completed: false,
    active: true,
  },
  {
    id: 2,
    title: 'Enter Amount',
    description: 'Specify the amount to deposit',
    completed: false,
    active: false,
  },
  {
    id: 3,
    title: 'Payment Details',
    description: 'Complete your transaction',
    completed: false,
    active: false,
  },
]

const fiveStepProcess: StepperStep[] = [
  {
    id: 1,
    title: 'Account Setup',
    description: 'Create your account',
    completed: true,
    active: false,
  },
  {
    id: 2,
    title: 'Verification',
    description: 'Verify your identity',
    completed: true,
    active: false,
  },
  {
    id: 3,
    title: 'Select Currency',
    description: 'Choose cryptocurrency',
    completed: false,
    active: true,
  },
  {
    id: 4,
    title: 'Enter Amount',
    description: 'Specify amount',
    completed: false,
    active: false,
  },
  {
    id: 5,
    title: 'Confirm',
    description: 'Review and confirm',
    completed: false,
    active: false,
  },
]

const minimalSteps: StepperStep[] = [
  {
    id: 1,
    title: 'Step 1',
    completed: true,
    active: false,
  },
  {
    id: 2,
    title: 'Step 2',
    completed: false,
    active: true,
  },
]

const meta: Meta<typeof Stepper> = {
  title: 'NOWPayments/Shared Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible stepper component for displaying multi-step processes. Features both horizontal and vertical layouts with visual progress indicators.

## Features

- **Orientations**: Horizontal and vertical layouts
- **Progress States**: Active, completed, and pending steps
- **Visual Indicators**: Numbers for pending steps, check marks for completed steps
- **Labels**: Optional titles and descriptions for each step
- **Connectors**: Visual lines connecting steps
- **Responsive**: Adapts to different screen sizes

## Usage

The Stepper component is used in multi-step forms like deposit and withdrawal flows to show users their progress through the process.
        `,
      },
    },
  },
  argTypes: {
    steps: {
      description: 'Array of step objects defining the stepper progression',
      table: {
        type: { summary: 'StepperStep[]' },
      },
    },
    variant: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation of the stepper',
      table: {
        defaultValue: { summary: 'horizontal' },
        type: { summary: 'horizontal | vertical' },
      },
    },
    showLabels: {
      control: 'boolean',
      description: 'Whether to show step titles and descriptions',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Stepper>

// Basic horizontal stepper
export const Default: Story = {
  args: {
    steps: defaultSteps,
    variant: 'horizontal',
    showLabels: true,
  },
}

// Horizontal variants
export const HorizontalWithLabels: Story = {
  args: {
    steps: defaultSteps,
    variant: 'horizontal',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Horizontal stepper with titles and descriptions. Step 1 is completed, step 2 is active, step 3 is pending.',
      },
    },
  },
}

export const HorizontalNoLabels: Story = {
  args: {
    steps: defaultSteps,
    variant: 'horizontal',
    showLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Horizontal stepper showing only step numbers and check marks without text labels.',
      },
    },
  },
}

// Vertical variants
export const Vertical: Story = {
  args: {
    steps: defaultSteps,
    variant: 'vertical',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical stepper layout with full labels. Useful for mobile layouts or sidebar navigation.',
      },
    },
  },
}

export const VerticalNoLabels: Story = {
  args: {
    steps: defaultSteps,
    variant: 'vertical',
    showLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical stepper without labels, showing only progress indicators.',
      },
    },
  },
}

// Different step states
export const FirstStepActive: Story = {
  args: {
    steps: firstStepActive,
    variant: 'horizontal',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper at the beginning of the process with the first step active and no completed steps.',
      },
    },
  },
}

export const AllStepsCompleted: Story = {
  args: {
    steps: threeStepsCompleted,
    variant: 'horizontal',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Stepper with all steps completed, showing check marks for all steps.',
      },
    },
  },
}

// Different step counts
export const TwoSteps: Story = {
  args: {
    steps: minimalSteps,
    variant: 'horizontal',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal stepper with only two steps. Good for simple processes.',
      },
    },
  },
}

export const FiveSteps: Story = {
  args: {
    steps: fiveStepProcess,
    variant: 'horizontal',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Extended stepper with five steps showing a more complex process flow.',
      },
    },
  },
}

// Compact versions
export const CompactHorizontal: Story = {
  args: {
    steps: defaultSteps,
    variant: 'horizontal',
    showLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact horizontal stepper without labels, saving vertical space.',
      },
    },
  },
}

export const CompactVertical: Story = {
  args: {
    steps: minimalSteps,
    variant: 'vertical',
    showLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact vertical stepper with minimal steps and no labels.',
      },
    },
  },
}

// Responsive comparison
export const ResponsiveComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%' }}>
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
          Desktop - Horizontal Layout
        </h3>
        <Stepper steps={defaultSteps} variant="horizontal" showLabels={true} />
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
          Mobile - Vertical Layout
        </h3>
        <Stepper steps={defaultSteps} variant="vertical" showLabels={true} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Comparison showing how the same steps can be displayed in different orientations for different screen sizes.',
      },
    },
  },
}

// Step progression showcase
export const ProgressionShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
      <div>
        <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
          Beginning (Step 1 Active)
        </h4>
        <Stepper steps={firstStepActive} variant="horizontal" showLabels={true} />
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
          In Progress (Step 2 Active)
        </h4>
        <Stepper steps={defaultSteps} variant="horizontal" showLabels={true} />
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
          Completed (All Steps Done)
        </h4>
        <Stepper steps={threeStepsCompleted} variant="horizontal" showLabels={true} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Showcase of stepper progression from start to completion, showing different states.',
      },
    },
  },
}