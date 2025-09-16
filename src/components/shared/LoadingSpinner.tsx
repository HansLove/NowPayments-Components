import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  color?: 'primary' | 'secondary' | 'inherit'
}

export function LoadingSpinner({
  size = 'md',
  className = '',
  color = 'primary'
}: LoadingSpinnerProps) {
  const sizeValues = {
    sm: 16,
    md: 24,
    lg: 32,
  }

  const strokeWidth = {
    sm: 2,
    md: 3,
    lg: 4,
  }

  const circleSize = sizeValues[size]
  const radius = (circleSize - strokeWidth[size]) / 2
  const circumference = radius * 2 * Math.PI

  return (
    <div className={`nowpayments-loading nowpayments-loading--${size} ${className}`}>
      <svg
        className={`nowpayments-spinner nowpayments-spinner--${color}`}
        width={circleSize}
        height={circleSize}
        viewBox={`0 0 ${circleSize} ${circleSize}`}
        aria-label="Loading"
        role="img"
      >
        <circle
          className="nowpayments-spinner__track"
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth[size]}
          strokeOpacity="0.2"
        />
        <circle
          className="nowpayments-spinner__progress"
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth[size]}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.25}
          transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
        />
      </svg>
    </div>
  )
}

export default LoadingSpinner