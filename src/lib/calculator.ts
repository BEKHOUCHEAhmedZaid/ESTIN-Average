import type { SemesterConfig, GradesState, SemesterCalculationResult, ComputedUnit, ComputedModule } from '../types'
import { parseGrade } from './validation'

/**
 * Standard ESTIN Continuous Assessment Formula:
 * (Exam * 2 + TD/TP) / 3
 */
export function calculateModuleAverage(exam: number, td: number): number {
  return (exam * 2 + td) / 3
}

export function getModuleKey(moduleName: string, index: number): string {
  return `${moduleName}-${index}`
}

/**
 * Calculates academic results for a semester configuration given student grades.
 *
 * Implements strict ESTIN grading rules:
 * - Module Average: (2 * Exam + TD) / 3
 * - UE Average: Weighted sum of module averages in the UE / Total UE coefficients
 * - Semester Average: Weighted sum of all module averages / Total semester coefficients
 * - Validation threshold: >= 10.00 / 20.00
 * - Credit calculation: Each validated module (>= 10) awards its credits.
 * - Compensation rules (ministerial & ESTIN):
 *     If semester average >= 10.00, student validates the entire semester (30 ECTS).
 *     If semester average < 10.00, student earns credits for modules validated (>= 10.00)
 *     and for modules within validated UEs (UE avg >= 10.00).
 */
export function calculateSemesterResults(
  config: SemesterConfig,
  grades: GradesState
): SemesterCalculationResult {
  const unitMap = new Map<string, {
    modules: ComputedModule[]
    totalWeighted: number
    totalCoeff: number
    totalCredits: number
  }>()

  // Track unit insertion order
  const unitOrder: string[] = []

  let totalCoefficients = 0
  let totalCredits = 0
  let modulesValidatedCount = 0
  let hasAnyGrade = false
  let isComplete = true

  config.modules.forEach((modDef, index) => {
    const key = getModuleKey(modDef.module, index)
    const entry = grades[key]

    const examParsed = parseGrade(entry?.exam)
    const tdParsed = parseGrade(entry?.td)

    if (entry && (entry.exam !== '' || entry.td !== '')) {
      hasAnyGrade = true
    }

    if (!entry || entry.exam === '' || entry.td === '') {
      isComplete = false
    }

    const examGrade = examParsed.value ?? 0
    const tdGrade = tdParsed.value ?? 0
    const average = calculateModuleAverage(examGrade, tdGrade)
    const isPassing = average >= 10.0

    if (isPassing) {
      modulesValidatedCount++
    }

    const computedMod: ComputedModule = {
      ...modDef,
      key,
      examGrade,
      tdGrade,
      average,
      isPassing,
      creditsEarned: isPassing ? modDef.credit : 0,
      hasGrades: Boolean(entry && (entry.exam !== '' || entry.td !== '')),
    }

    totalCoefficients += modDef.coef
    totalCredits += modDef.credit

    if (!unitMap.has(modDef.unit)) {
      unitMap.set(modDef.unit, {
        modules: [],
        totalWeighted: 0,
        totalCoeff: 0,
        totalCredits: 0,
      })
      unitOrder.push(modDef.unit)
    }

    const u = unitMap.get(modDef.unit)!
    u.modules.push(computedMod)
    u.totalWeighted += average * modDef.coef
    u.totalCoeff += modDef.coef
    u.totalCredits += modDef.credit
  })

  let semesterWeightedSum = 0

  const units: ComputedUnit[] = unitOrder.map(unitName => {
    const u = unitMap.get(unitName)!
    const unitAverage = u.totalCoeff > 0 ? u.totalWeighted / u.totalCoeff : 0
    semesterWeightedSum += unitAverage * u.totalCoeff
    const isUnitPassing = unitAverage >= 10.0

    // Unit level credits: modules passing, OR all unit credits if unit is passed (compensation)
    let unitCreditsEarned = 0
    u.modules.forEach(m => {
      if (isUnitPassing || m.isPassing) {
        unitCreditsEarned += m.credit
      }
    })

    return {
      name: unitName,
      average: unitAverage,
      totalCoefficients: u.totalCoeff,
      totalCredits: u.totalCredits,
      creditsEarned: unitCreditsEarned,
      isPassing: isUnitPassing,
      modules: u.modules,
    }
  })

  const semesterAverage = totalCoefficients > 0 ? semesterWeightedSum / totalCoefficients : 0

  // ECTS validation with semester compensation:
  // If general semester average >= 10.00, student acquires the full 30 credits (compensation rule).
  // Otherwise, sum of credits from validated units and individually validated modules.
  let creditsEarned = 0
  if (semesterAverage >= 10.0) {
    creditsEarned = totalCredits // Standard 30 ECTS
  } else {
    units.forEach(u => {
      creditsEarned += u.creditsEarned
    })
  }

  return {
    units,
    semesterAverage,
    totalCoefficients,
    totalCredits,
    creditsEarned,
    modulesValidatedCount,
    totalModulesCount: config.modules.length,
    isComplete,
    hasAnyGrade,
  }
}
