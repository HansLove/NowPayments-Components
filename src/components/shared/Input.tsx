import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export function Input({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  const hasError = !!error

  return (
    <div className="nowpayments-input-group">
      {label && (
        <label htmlFor={inputId} className="nowpayments-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`nowpayments-input ${hasError ? 'nowpayments-input--error' : ''} ${className}`}
        {...props}
      />
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
}

export default Input