import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const modalContent = (
    <div className="nowpayments-modal__overlay" onClick={onClose}>
      <div
        className="nowpayments-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="nowpayments-modal__header">
          <h2 className="nowpayments-modal__title">{title}</h2>
          <button
            className="nowpayments-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className="nowpayments-modal__body">{children}</div>
      </div>
    </div>
  )

  // Render in portal
  return createPortal(modalContent, document.body)
}

export default Modal