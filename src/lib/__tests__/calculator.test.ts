import { describe, it, expect } from 'vitest'
import { calculateModuleAverage, calculateSemesterResults } from '../calculator'
import { parseGrade } from '../validation'
import { SEMESTER_DATA, getSemesterConfig } from '../../data/semesters'
import type { TrackId, SemesterNum, GradesState } from '../../types'

describe('Grade Validation & Parser', () => {
  it('parses normal integer and decimal numbers', () => {
    expect(parseGrade('15')).toEqual({ value: 15, isValid: true })
    expect(parseGrade('13.5')).toEqual({ value: 13.5, isValid: true })
    expect(parseGrade('10.25')).toEqual({ value: 10.25, isValid: true })
  })

  it('supports French comma notation', () => {
    expect(parseGrade('14,5')).toEqual({ value: 14.5, isValid: true })
    expect(parseGrade('11,75')).toEqual({ value: 11.75, isValid: true })
  })

  it('handles empty and null values gracefully', () => {
    expect(parseGrade('')).toEqual({ value: null, isValid: true })
    expect(parseGrade('   ')).toEqual({ value: null, isValid: true })
    expect(parseGrade(undefined)).toEqual({ value: null, isValid: true })
  })

  it('rejects negative numbers and caps or flags errors', () => {
    const res = parseGrade('-5')
    expect(res.isValid).toBe(false)
    expect(res.error).toBe('out_of_bounds_low')
  })

  it('rejects numbers greater than 20', () => {
    const res = parseGrade('21.5')
    expect(res.isValid).toBe(false)
    expect(res.error).toBe('out_of_bounds_high')
  })

  it('rejects non-numeric strings', () => {
    const res = parseGrade('abc')
    expect(res.isValid).toBe(false)
    expect(res.error).toBe('invalid_number')
  })
})

describe('Academic Calculation Engine', () => {
  it('calculates module average with the exact (2 * Exam + TD) / 3 formula', () => {
    // Exact standard formula:
    // (14 * 2 + 15.5) / 3 = 43.5 / 3 = 14.5
    expect(calculateModuleAverage(14, 15.5)).toBeCloseTo(14.5, 5)

    // Grade 10 on both => 10
    expect(calculateModuleAverage(10, 10)).toBe(10)

    // Grade 0 on both => 0
    expect(calculateModuleAverage(0, 0)).toBe(0)

    // Grade 20 on both => 20
    expect(calculateModuleAverage(20, 20)).toBe(20)

    // Exam 13.5, TD 14 => (27 + 14)/3 = 41/3 = 13.6666...
    expect(calculateModuleAverage(13.5, 14)).toBeCloseTo(13.66667, 4)
  })

  it('calculates exact 2CP-S1 Stitch sample data', () => {
    const config = SEMESTER_DATA['2CP-S1']
    const grades: GradesState = {
      'SFSD-0': { exam: '14', td: '15.5' },       // avg: 14.50, coef 4
      'ARCH 2-1': { exam: '13.5', td: '14' },     // avg: 13.67, coef 4
      'ELECT2-2': { exam: '15', td: '16' },       // avg: 15.33, coef 4
      'ANA 3-3': { exam: '11.5', td: '13' },      // avg: 12.00, coef 5
      'ALG 3-4': { exam: '14', td: '14' },        // avg: 14.00, coef 3
      'PROBA1-5': { exam: '12', td: '14.5' },     // avg: 12.83, coef 4
      'ANGLAIS-6': { exam: '16.5', td: '17' },    // avg: 16.67, coef 2
      'ECONOMY-7': { exam: '13', td: '14' },      // avg: 13.33, coef 2
    }

    const result = calculateSemesterResults(config, grades)

    // Verify coefficients: 4+4+4 + 5+3+4 + 2+2 = 28
    expect(result.totalCoefficients).toBe(28)
    expect(result.totalCredits).toBe(30)
    expect(result.modulesValidatedCount).toBe(8)
    expect(result.totalModulesCount).toBe(8)
    expect(result.creditsEarned).toBe(30)
    expect(result.semesterAverage).toBeGreaterThan(13.5)
    expect(result.semesterAverage).toBeLessThan(14.5)
  })

  it('tests all 10 semester configurations integrity and completeness', () => {
    const trackIds: TrackId[] = ['1CP', '2CP', '1CS', '2CS-AI', '2CS-CS']
    const semesters: SemesterNum[] = [1, 2]

    let count = 0
    trackIds.forEach(track => {
      semesters.forEach(sem => {
        count++
        const config = getSemesterConfig(track, sem)
        expect(config).toBeDefined()
        expect(config.modules.length).toBeGreaterThan(0)

        // Validate total coefficients and credits
        let totalCoeff = 0
        let totalCredits = 0
        config.modules.forEach(m => {
          expect(m.coef).toBeGreaterThan(0)
          expect(m.credit).toBeGreaterThan(0)
          expect(m.unit).toBeTruthy()
          expect(m.module).toBeTruthy()
          totalCoeff += m.coef
          totalCredits += m.credit
        })

        // Validate total coefficients and credits match the official syllabus
        const expectedCredits = config.modules.reduce((sum, m) => sum + m.credit, 0)
        expect(totalCredits).toBe(expectedCredits)
        expect(totalCoeff).toBeGreaterThan(15)

        // Specifically test the 1CP asymmetry (S1: 32 credits, S2: 28 credits => 60 credits total year)
        if (config.id === '1CP-S1') {
          expect(totalCredits).toBe(32)
        } else if (config.id === '1CP-S2') {
          expect(totalCredits).toBe(28)
        } else {
          expect(totalCredits).toBe(30)
        }

        // Test with uniform 10.0 grades
        const uniformGrades: GradesState = {}
        config.modules.forEach((m, idx) => {
          uniformGrades[`${m.module}-${idx}`] = { exam: '10', td: '10' }
        })

        const res = calculateSemesterResults(config, uniformGrades)
        expect(res.semesterAverage).toBeCloseTo(10.0, 5)
        expect(res.modulesValidatedCount).toBe(config.modules.length)
        expect(res.creditsEarned).toBe(totalCredits)

        // Test with uniform 0 grades
        const zeroGrades: GradesState = {}
        config.modules.forEach((m, idx) => {
          zeroGrades[`${m.module}-${idx}`] = { exam: '0', td: '0' }
        })
        const resZero = calculateSemesterResults(config, zeroGrades)
        expect(resZero.semesterAverage).toBe(0)
        expect(resZero.modulesValidatedCount).toBe(0)
        expect(resZero.creditsEarned).toBe(0)

        // Test with uniform 20 grades
        const maxGrades: GradesState = {}
        config.modules.forEach((m, idx) => {
          maxGrades[`${m.module}-${idx}`] = { exam: '20', td: '20' }
        })
        const resMax = calculateSemesterResults(config, maxGrades)
        expect(resMax.semesterAverage).toBe(20)
        expect(resMax.modulesValidatedCount).toBe(config.modules.length)
        expect(resMax.creditsEarned).toBe(totalCredits)
      })
    })

    expect(count).toBe(10)
  })

  it('tests compensation logic: validates semester credits if average >= 10 despite individual failing module', () => {
    const config = SEMESTER_DATA['1CP-S1']
    const totalSemCredits = config.modules.reduce((sum, m) => sum + m.credit, 0) // 32 credits for 1CP-S1
    const grades: GradesState = {}

    // Give high grades to all except one failing module (e.g. 8.0)
    config.modules.forEach((m, idx) => {
      if (idx === 0) {
        grades[`${m.module}-${idx}`] = { exam: '8', td: '8' } // failing
      } else {
        grades[`${m.module}-${idx}`] = { exam: '14', td: '14' } // passing
      }
    })

    const res = calculateSemesterResults(config, grades)
    expect(res.semesterAverage).toBeGreaterThan(10.0)
    // By Algerian higher education compensation rule, if semester average >= 10, all semester credits are awarded!
    expect(res.creditsEarned).toBe(totalSemCredits)
    expect(res.modulesValidatedCount).toBe(config.modules.length - 1)
  })

  it('tests failure without compensation: if semester average < 10, only validated credits earned', () => {
    const config = SEMESTER_DATA['1CP-S1']
    const grades: GradesState = {}

    // All fail except HIST (coef 1, credit 1) with 15/20
    config.modules.forEach((m, idx) => {
      if (m.module === 'HIST') {
        grades[`${m.module}-${idx}`] = { exam: '15', td: '15' }
      } else {
        grades[`${m.module}-${idx}`] = { exam: '5', td: '5' }
      }
    })

    const res = calculateSemesterResults(config, grades)
    expect(res.semesterAverage).toBeLessThan(10.0)
    expect(res.modulesValidatedCount).toBe(1)
    expect(res.creditsEarned).toBe(1)
  })
})
