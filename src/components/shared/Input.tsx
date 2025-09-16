import React, { useState, useRef, forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'filled' | 'outlined' | 'standard'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  className = '',
  id,
  variant = 'filled',
  value,
  defaultValue,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  const hasError = !!error
  const [isFocused, setIsFocused] = useState(false)
  const internalRef = useRef<HTMLInputElement>(null)
  const inputRef = ref || internalRef

  const hasValue = value !== undefined
    ? String(value).length > 0
    : defaultValue !== undefined
    ? String(defaultValue).length > 0
    : false

  const isLabelFloating = isFocused || hasValue

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    props.onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    props.onBlur?.(e)
  }

  const handleLabelClick = () => {
    if (typeof inputRef === 'object' && inputRef?.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className={`nowpayments-input-group nowpayments-input-group--${variant}`}>
      <div className="nowpayments-input-container">
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          id={inputId}
          className={`nowpayments-input ${hasError ? 'nowpayments-input--error' : ''} ${isFocused ? 'nowpayments-input--focused' : ''} ${className}`}
          value={value}
          defaultValue={defaultValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className={`nowpayments-label ${isLabelFloating ? 'nowpayments-label--floating' : ''} ${hasError ? 'nowpayments-label--error' : ''} ${isFocused ? 'nowpayments-label--focused' : ''}`}
            onClick={handleLabelClick}
          >
            {label}
          </label>
        )}
        <div className={`nowpayments-input-underline ${hasError ? 'nowpayments-input-underline--error' : ''} ${isFocused ? 'nowpayments-input-underline--focused' : ''}`} />
      </div>
      {error && (
        <div className="nowpayments-error">
          {error}
        </div>
      )}
      {helperText && !error && (
        <div className="nowpayments-helper-text">
          {helperText}
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input