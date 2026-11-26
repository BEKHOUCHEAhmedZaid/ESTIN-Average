export interface GradeParseResult {
  value: number | null
  isValid: boolean
  error?: string
}

/**
 * Validates whether an input string is a valid keystroke/intermediate or final grade input.
 * Rules:
 * 1. Only digits (0-9) and at most ONE decimal separator (point '.' or comma ',').
 * 2. Value must stay within [0, 20]. Numbers > 20 (e.g. 21, 25, 20.5) are rejected.
 * 3. Maximum 2 digits after the decimal separator.
 * 4. Intermediate states allowed: empty string, '1.', '12,', '0,5', '.', ','.
 */
export function isValidGradeInput(value: string): boolean {
  if (value === '') {
    return true
  }

  // Only digits and separator (. or ,) allowed. Rejects letters, spaces, -, +, symbols.
  if (!/^[0-9.,]+$/.test(value)) {
    return false
  }

  // At most one decimal separator
  const separators = value.match(/[.,]/g)
  if (separators && separators.length > 1) {
    return false
  }

  // Intermediate states with lone separator
  if (value === '.' || value === ',') {
    return true
  }

  // Maximum 2 decimal digits after separator
  const parts = value.split(/[.,]/)
  if (parts.length === 2 && parts[1].length > 2) {
    return false
  }

  // Parse numerical value to ensure 0 <= value <= 20
  const normalized = value.replace(',', '.')
  const num = parseFloat(normalized)

  if (isNaN(num)) {
    return false
  }

  if (num < 0 || num > 20) {
    return false
  }

  return true
}

/**
 * Normalizes grade value on blur:
 * - "12," -> "12"
 * - "12." -> "12"
 * - "," -> ""
 * - "." -> ""
 */
export function normalizeGradeOnBlur(value: string): string {
  const trimmed = value.trim()
  if (trimmed === '' || trimmed === '.' || trimmed === ',') {
    return ''
  }

  if (trimmed.endsWith('.') || trimmed.endsWith(',')) {
    return trimmed.slice(0, -1)
  }

  return trimmed
}

/**
 * Cleans or validates pasted text into a grade field.
 * Returns the valid cleaned candidate or trimmed text, or null if invalid.
 */
export function cleanPastedGrade(
  pastedText: string,
  currentValue = '',
  selectionStart = 0,
  selectionEnd = currentValue.length
): string | null {
  const trimmed = pastedText.trim()
  if (!trimmed) {
    return null
  }

  // Candidate if pasted text replaces current selection
  const candidate =
    currentValue.slice(0, selectionStart) + trimmed + currentValue.slice(selectionEnd)

  if (isValidGradeInput(candidate)) {
    return candidate
  }

  // Fallback: check if the pasted text alone is a valid grade
  if (isValidGradeInput(trimmed)) {
    return trimmed
  }

  return null
}

/**
 * Validates and parses grade input:
 * - Accepts empty string (returns null)
 * - Supports decimal point (.) and decimal comma (,)
 * - Rejects negative values (< 0)
 * - Rejects values > 20
 * - Rejects non-numeric text
 */
export function parseGrade(input: string | undefined | null): GradeParseResult {
  if (input === undefined || input === null || input.trim() === '') {
    return { value: null, isValid: true }
  }

  const normalized = input.trim().replace(',', '.')
  const num = Number(normalized)

  if (isNaN(num)) {
    return { value: null, isValid: false, error: 'invalid_number' }
  }

  if (num < 0) {
    return { value: 0, isValid: false, error: 'out_of_bounds_low' }
  }

  if (num > 20) {
    return { value: 20, isValid: false, error: 'out_of_bounds_high' }
  }

  return { value: num, isValid: true }
}

export function formatGrade(num: number | null | undefined, decimals = 2): string {
  if (num === null || num === undefined || isNaN(num)) {
    return '--.--'
  }
  return num.toFixed(decimals)
}
