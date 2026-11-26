import { describe, it, expect } from 'vitest'
import {
  isValidGradeInput,
  normalizeGradeOnBlur,
  cleanPastedGrade,
  parseGrade,
} from '../validation'

describe('Centralized Grade Input Validation Rules', () => {
  it('refuses letters (lettres refusées)', () => {
    expect(isValidGradeInput('a')).toBe(false)
    expect(isValidGradeInput('abc')).toBe(false)
    expect(isValidGradeInput('14a')).toBe(false)
    expect(isValidGradeInput('e')).toBe(false)
  })

  it('refuses 21 (21 refusé)', () => {
    expect(isValidGradeInput('21')).toBe(false)
    expect(isValidGradeInput('25')).toBe(false)
    expect(isValidGradeInput('100')).toBe(false)
  })

  it('refuses -5 (-5 refusé)', () => {
    expect(isValidGradeInput('-5')).toBe(false)
    expect(isValidGradeInput('-')).toBe(false)
    expect(isValidGradeInput('-0.5')).toBe(false)
  })

  it('accepts 20 (20 accepté)', () => {
    expect(isValidGradeInput('20')).toBe(true)
    expect(isValidGradeInput('20.')).toBe(true)
    expect(isValidGradeInput('20,')).toBe(true)
    expect(isValidGradeInput('20.0')).toBe(true)
    expect(isValidGradeInput('20,00')).toBe(true)
  })

  it('refuses 20,5 (20,5 refusé)', () => {
    expect(isValidGradeInput('20,5')).toBe(false)
    expect(isValidGradeInput('20.5')).toBe(false)
    expect(isValidGradeInput('20,1')).toBe(false)
    expect(isValidGradeInput('20.01')).toBe(false)
  })

  it('accepts 14,5 (14,5 accepté)', () => {
    expect(isValidGradeInput('14,5')).toBe(true)
    expect(isValidGradeInput('14.5')).toBe(true)
  })

  it('accepts 14.55 (14.55 accepté)', () => {
    expect(isValidGradeInput('14.55')).toBe(true)
    expect(isValidGradeInput('14,55')).toBe(true)
  })

  it('refuses 14.555 (14.555 refusé)', () => {
    expect(isValidGradeInput('14.555')).toBe(false)
    expect(isValidGradeInput('14,555')).toBe(false)
    expect(isValidGradeInput('10.123')).toBe(false)
  })

  it('refuses invalid pasted text (texte collé invalide refusé)', () => {
    expect(cleanPastedGrade('texte collé invalide')).toBeNull()
    expect(cleanPastedGrade('abc')).toBeNull()
    expect(cleanPastedGrade('21')).toBeNull()
    expect(cleanPastedGrade('-5')).toBeNull()
    expect(cleanPastedGrade('20,5')).toBeNull()
    expect(cleanPastedGrade('14.555')).toBeNull()
  })

  it('accepts and cleans valid pasted text', () => {
    expect(cleanPastedGrade('14,5')).toBe('14,5')
    expect(cleanPastedGrade('  14.55  ')).toBe('14.55')
    expect(cleanPastedGrade('20')).toBe('20')
  })

  it('allows intermediate typing states', () => {
    expect(isValidGradeInput('')).toBe(true)
    expect(isValidGradeInput('1.')).toBe(true)
    expect(isValidGradeInput('12,')).toBe(true)
    expect(isValidGradeInput('0,5')).toBe(true)
    expect(isValidGradeInput('.')).toBe(true)
    expect(isValidGradeInput(',')).toBe(true)
  })

  it('normalizes on blur: "12," becomes "12" and "," becomes empty', () => {
    expect(normalizeGradeOnBlur('12,')).toBe('12')
    expect(normalizeGradeOnBlur('12.')).toBe('12')
    expect(normalizeGradeOnBlur(',')).toBe('')
    expect(normalizeGradeOnBlur('.')).toBe('')
    expect(normalizeGradeOnBlur('')).toBe('')
    expect(normalizeGradeOnBlur('14,5')).toBe('14,5')
    expect(normalizeGradeOnBlur('14.55')).toBe('14.55')
    expect(normalizeGradeOnBlur('20')).toBe('20')
  })

  it('maintains compatibility with existing parseGrade for calculations', () => {
    expect(parseGrade('14,5').value).toBe(14.5)
    expect(parseGrade('14.5').value).toBe(14.5)
    expect(parseGrade('20').value).toBe(20)
    expect(parseGrade('0').value).toBe(0)
    expect(parseGrade('').value).toBeNull()
  })
})
