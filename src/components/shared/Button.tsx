import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'error'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClass = 'nowpayments-button'
  const variantClass = `nowpayments-button--${variant}`
  const sizeClass = `nowpayments-button--${size}`

  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="nowpayments-spinner" style={{ marginRight: '0.5rem' }} />
      )}
      {children}
    </button>
  )
}

export default Button