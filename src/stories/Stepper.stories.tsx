import type { Meta, StoryObj } from '@storybook/react'
import { Stepper } from '../components/shared/Stepper'
import type { StepperStep } from '../types'

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const basicSteps: StepperStep[] = [
  { id: 1, title: 'Step 1', completed: true, active: false },
  { id: 2, title: 'Step 2', completed: false, active: true },
  { id: 3, title: 'Step 3', completed: false, active: false },
]

const stepsWithDescriptions: StepperStep[] = [
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
    title: 'Confirm Details',
    description: 'Review and confirm your deposit',
    completed: false,
    active: false,
  },
]

export const Default: Story = {
  args: {
    steps: basicSteps,
  },
}

export const WithDescriptions: Story = {
  args: {
    steps: stepsWithDescriptions,
  },
}

export const AllCompleted: Story = {
  args: {
    steps: basicSteps.map(step => ({ ...step, completed: true, active: false })),
  },
}

export const FirstStep: Story = {
  args: {
    steps: [
      { id: 1, title: 'Step 1', completed: false, active: true },
      { id: 2, title: 'Step 2', completed: false, active: false },
      { id: 3, title: 'Step 3', completed: false, active: false },
    ],
  },
}

export const LastStep: Story = {
  args: {
    steps: [
      { id: 1, title: 'Step 1', completed: true, active: false },
      { id: 2, title: 'Step 2', completed: true, active: false },
      { id: 3, title: 'Step 3', completed: false, active: true },
    ],
  },
}