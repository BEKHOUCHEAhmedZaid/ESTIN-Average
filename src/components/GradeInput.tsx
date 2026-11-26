import React, { useRef, useEffect } from 'react'
import { isValidGradeInput, normalizeGradeOnBlur, cleanPastedGrade } from '../lib/validation'

export interface GradeInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string
  onChange: (value: string) => void
  'aria-label': string
}

/**
 * Reusable and centralized grade input component.
 * Ensures:
 * - type="text" with inputMode="decimal"
 * - aria-label is present
 * - only digits and a single decimal point/comma accepted
 * - value stays within [0, 20]
 * - max 2 decimals
 * - intermediate states supported
 * - paste is cleaned/validated or rejected
 * - onBlur normalizes "12," -> "12", "," -> ""
 */
export const GradeInput: React.FC<GradeInputProps> = ({
  value,
  onChange,
  onBlur,
  'aria-label': ariaLabel,
  placeholder = '0',
  className,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // Keep DOM value in sync with state if an invalid character was typed
  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVal = e.target.value

    if (isValidGradeInput(nextVal)) {
      onChange(nextVal)
    } else {
      // Reject change and restore previous value in the DOM
      e.target.value = value
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text')
    const start = e.currentTarget.selectionStart ?? 0
    const end = e.currentTarget.selectionEnd ?? e.currentTarget.value.length

    const cleaned = cleanPastedGrade(pastedText, value, start, end)
    e.preventDefault()

    if (cleaned !== null) {
      onChange(cleaned)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const normalized = normalizeGradeOnBlur(e.target.value)
    if (normalized !== value) {
      onChange(normalized)
    }
    onBlur?.(e)
  }

  return (
    <input
      {...rest}
      ref={inputRef}
      type="text"
      inputMode="decimal"
      value={value}
      placeholder={placeholder}
      aria-label={ariaLabel}
      onChange={handleChange}
      onPaste={handlePaste}
      onBlur={handleBlur}
      className={className}
    />
  )
}
