export type TrackId = '1CP' | '2CP' | '1CS' | '2CS-AI' | '2CS-CS'

export type SemesterNum = 1 | 2

export type SemesterId = 
  | '1CP-S1'
  | '1CP-S2'
  | '2CP-S1'
  | '2CP-S2'
  | '1CS-S1'
  | '1CS-S2'
  | '2CS-IA-S1'
  | '2CS-IA-S2'
  | '2CS-CS-S1'
  | '2CS-CS-S2'

export interface ModuleDefinition {
  unit: string
  module: string
  fullName?: {
    fr: string
    en: string
  }
  coef: number
  credit: number
}

export interface SemesterConfig {
  id: SemesterId
  trackId: TrackId
  semesterNum: SemesterNum
  name: {
    fr: string
    en: string
  }
  trackName: {
    fr: string
    en: string
  }
  modules: ModuleDefinition[]
}

export interface GradeEntry {
  exam: string
  td: string
}

export type GradesState = Record<string, GradeEntry>

export interface ComputedModule extends ModuleDefinition {
  key: string
  examGrade: number
  tdGrade: number
  average: number
  isPassing: boolean
  creditsEarned: number
  hasGrades: boolean
}

export interface ComputedUnit {
  name: string
  average: number
  totalCoefficients: number
  totalCredits: number
  creditsEarned: number
  isPassing: boolean
  modules: ComputedModule[]
}

export interface SemesterCalculationResult {
  units: ComputedUnit[]
  semesterAverage: number
  totalCoefficients: number
  totalCredits: number
  creditsEarned: number
  modulesValidatedCount: number
  totalModulesCount: number
  isComplete: boolean
  hasAnyGrade: boolean
}

export type Language = 'fr' | 'en'
