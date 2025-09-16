import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'nowpayments-spinner--sm',
    md: '',
    lg: 'nowpayments-spinner--lg',
  }

  return (
    <div className="nowpayments-loading">
      <div className={`nowpayments-spinner ${sizeClasses[size]} ${className}`} />
    </div>
  )
}

export default LoadingSpinner