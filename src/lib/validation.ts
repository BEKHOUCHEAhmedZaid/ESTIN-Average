export interface GradeParseResult {
  value: number | null
  isValid: boolean
  error?: string
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
