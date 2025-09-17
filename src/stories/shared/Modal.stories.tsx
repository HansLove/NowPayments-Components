import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Modal } from '@/components/shared/Modal'
import { Button } from '@/components/shared/Button'

// Simple mock function for actions
const mockFn = () => {}

const meta: Meta<typeof Modal> = {
  title: 'NOWPayments/Shared Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A flexible modal component built with React Portal for overlay dialogs and forms. Features keyboard navigation, click-outside-to-close, and automatic body scroll lock.

## Features

- **Portal Rendering**: Renders outside the normal DOM tree to avoid z-index issues
- **Keyboard Navigation**: ESC key closes the modal
- **Click Outside**: Clicking the overlay closes the modal
- **Body Scroll Lock**: Prevents background scrolling when modal is open
- **Accessibility**: Proper ARIA labels and focus management
- **Flexible Content**: Accepts any React content as children

## Usage

The Modal component is the foundation for all overlay dialogs in the library, including deposit and withdrawal modals.
        `,
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls modal visibility',
      table: {
        type: { summary: 'boolean' },
      },
    },
    title: {
      control: 'text',
      description: 'Modal title displayed in the header',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      description: 'Modal content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    onClose: {
      action: 'modal-closed',
      description: 'Callback when modal is closed',
    },
  },
  args: {
    onClose: mockFn,
  },
}

export default meta
type Story = StoryObj<typeof Modal>

// Basic modal
export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Default Modal',
    children: (
      <div style={{ padding: '1rem' }}>
        <p>This is a basic modal with some content.</p>
        <p>You can put any React content here.</p>
      </div>
    ),
  },
}

// Closed modal
export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Closed Modal',
    children: <p>This modal is closed.</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal in closed state. Use the controls to open it.',
      },
    },
  },
}

// Modal with form content
export const WithForm: Story = {
  args: {
    isOpen: true,
    title: 'Form Modal',
    children: (
      <form style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Name:
          </label>
          <input
            id="name"
            type="text"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Email:
          </label>
          <input
            id="email"
            type="email"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              background: 'white',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              background: '#007bff',
              color: 'white',
            }}
          >
            Submit
          </button>
        </div>
      </form>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal containing a form with input fields and action buttons.',
      },
    },
  },
}

// Modal with long content
export const WithLongContent: Story = {
  args: {
    isOpen: true,
    title: 'Modal with Long Content',
    children: (
      <div style={{ padding: '1rem' }}>
        <p>This modal contains a lot of content to demonstrate scrolling behavior.</p>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} style={{ marginBottom: '1rem' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Paragraph {i + 1}
          </p>
        ))}
        <p>End of content.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal with long content that demonstrates scrolling behavior within the modal.',
      },
    },
  },
}

// Modal with buttons
export const WithButtons: Story = {
  args: {
    isOpen: true,
    title: 'Modal with Actions',
    children: (
      <div style={{ padding: '1rem' }}>
        <p style={{ marginBottom: '2rem' }}>
          This modal demonstrates using the Button component inside a modal.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal using the library\'s Button components for actions.',
      },
    },
  },
}

// Warning modal
export const WarningModal: Story = {
  args: {
    isOpen: true,
    title: 'Warning',
    children: (
      <div style={{ padding: '1rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem',
            padding: '1rem',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '4px',
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          <div>
            <p style={{ margin: 0, fontWeight: 'bold' }}>
              Are you sure you want to proceed?
            </p>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
              This action cannot be undone.
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <Button variant="secondary">Cancel</Button>
          <Button variant="error">Delete</Button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal styled as a warning dialog with destructive actions.',
      },
    },
  },
}

// Success modal
export const SuccessModal: Story = {
  args: {
    isOpen: true,
    title: 'Success',
    children: (
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
        <h3 style={{ margin: '0 0 1rem 0', color: '#28a745' }}>
          Transaction Completed
        </h3>
        <p style={{ margin: '0 0 2rem 0', color: '#666' }}>
          Your payment has been processed successfully.
        </p>
        <Button variant="primary">Continue</Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal styled as a success confirmation with celebratory content.',
      },
    },
  },
}

// Interactive modal example
export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    const [counter, setCounter] = useState(0)

    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setIsOpen(true)}>
          Open Interactive Modal
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Interactive Modal"
        >
          <div style={{ padding: '1rem' }}>
            <p>This modal demonstrates interactive functionality.</p>
            <p>Counter: {counter}</p>
            <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
              <Button onClick={() => setCounter(counter - 1)}>
                Decrease
              </Button>
              <Button onClick={() => setCounter(counter + 1)}>
                Increase
              </Button>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <Button
                variant="secondary"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive modal with state management. Click the button to open the modal and interact with the counter.',
      },
    },
  },
}

// Multiple modals example
export const MultipleModals: Story = {
  render: () => {
    const [firstModal, setFirstModal] = useState(false)
    const [secondModal, setSecondModal] = useState(false)

    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setFirstModal(true)}>
          Open First Modal
        </Button>

        <Modal
          isOpen={firstModal}
          onClose={() => setFirstModal(false)}
          title="First Modal"
        >
          <div style={{ padding: '1rem' }}>
            <p>This is the first modal.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <Button
                variant="secondary"
                onClick={() => setSecondModal(true)}
              >
                Open Second Modal
              </Button>
              <Button onClick={() => setFirstModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={secondModal}
          onClose={() => setSecondModal(false)}
          title="Second Modal"
        >
          <div style={{ padding: '1rem' }}>
            <p>This is the second modal, opened from the first one.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <Button onClick={() => setSecondModal(false)}>
                Close This Modal
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Example demonstrating multiple modals and stacking behavior.',
      },
    },
  },
}