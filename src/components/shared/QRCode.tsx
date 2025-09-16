import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Copy, ExternalLink } from 'lucide-react'
import Button from './Button'

interface QRCodeProps {
  value: string
  size?: number
  className?: string
  title?: string
  showActions?: boolean
  explorerUrl?: string
  onCopy?: () => void
}

export function QRCode({
  value,
  size = 200,
  className = '',
  title,
  showActions = true,
  explorerUrl,
  onCopy,
}: QRCodeProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      onCopy?.()
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  const handleExplorer = () => {
    if (explorerUrl) {
      window.open(explorerUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className={`nowpayments-qr-code ${className}`}>
      {title && (
        <h3 className="nowpayments-qr-code__title">
          {title}
        </h3>
      )}

      <div className="nowpayments-qr-code__container">
        <QRCodeSVG
          value={value}
          size={size}
          level="M"
          includeMargin={true}
          className="nowpayments-qr-code__svg"
        />
      </div>

      <div className="nowpayments-qr-code__value">
        <code className="nowpayments-qr-code__address">
          {value.length > 20 ? `${value.slice(0, 20)}...${value.slice(-10)}` : value}
        </code>
        <button
          type="button"
          className="nowpayments-qr-code__copy-btn"
          onClick={handleCopy}
          title="Copy full address"
          aria-label="Copy address to clipboard"
        >
          Show full
        </button>
      </div>

      {showActions && (
        <div className="nowpayments-qr-code__actions">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            className="nowpayments-qr-code__action-btn"
          >
            <Copy size={16} />
            Copy Address
          </Button>

          {explorerUrl && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleExplorer}
              className="nowpayments-qr-code__action-btn"
            >
              <ExternalLink size={16} />
              Explorer
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default QRCode