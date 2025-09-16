import React from 'react'
import { Check } from 'lucide-react'
import type { StepperStep } from '@/types'

interface StepperProps {
  steps: StepperStep[]
  variant?: 'horizontal' | 'vertical'
  showLabels?: boolean
}

export function Stepper({
  steps,
  variant = 'horizontal',
  showLabels = true
}: StepperProps) {
  return (
    <div className={`nowpayments-stepper nowpayments-stepper--${variant}`}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div
            className={`nowpayments-stepper__step ${
              step.active ? 'nowpayments-stepper__step--active' : ''
            } ${step.completed ? 'nowpayments-stepper__step--completed' : ''}`}
          >
            <div className="nowpayments-stepper__circle">
              <div className="nowpayments-stepper__circle-inner">
                {step.completed ? (
                  <Check size={18} className="nowpayments-stepper__check" />
                ) : (
                  <span className="nowpayments-stepper__number">{step.id}</span>
                )}
              </div>
            </div>

            {showLabels && step.title && (
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

          {/* Connector line between steps */}
          {index < steps.length - 1 && (
            <div
              className={`nowpayments-stepper__connector ${
                step.completed ? 'nowpayments-stepper__connector--completed' : ''
              }`}
            >
              <div className="nowpayments-stepper__connector-line" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Stepper