import React from 'react'
import { Check } from 'lucide-react'
import type { StepperStep } from '@/types'

interface StepperProps {
  steps: StepperStep[]
}

export function Stepper({ steps }: StepperProps) {
  return (
    <div className="nowpayments-stepper">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`nowpayments-stepper__step ${
            step.active ? 'nowpayments-stepper__step--active' : ''
          } ${step.completed ? 'nowpayments-stepper__step--completed' : ''}`}
        >
          <div className="nowpayments-stepper__number">
            {step.completed ? <Check size={16} /> : step.id}
          </div>
          {step.title && (
            <div className="nowpayments-stepper__label">
              <div className="nowpayments-stepper__title">{step.title}</div>
              {step.description && (
                <div className="nowpayments-stepper__description">
                  {step.description}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Stepper