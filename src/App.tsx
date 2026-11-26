import { useState, useEffect, useMemo, useCallback } from 'react'
import type { TrackId, SemesterNum, Language, GradesState } from './types'
import { getSemesterConfig } from './data/semesters'
import { calculateSemesterResults, getModuleKey } from './lib/calculator'
import { isValidGradeInput } from './lib/validation'
import { Header } from './components/Header'
import { TrackSelector } from './components/TrackSelector'
import { ResultsDashboard } from './components/ResultsDashboard'
import { SubjectTable } from './components/SubjectTable'
import { Footer } from './components/Footer'

const STORAGE_KEY_PREFIX = 'estin_average_grades_'
const STORAGE_LANG_KEY = 'estin_average_lang'
const STORAGE_TRACK_KEY = 'estin_average_track'
const STORAGE_SEM_KEY = 'estin_average_sem'

export default function App() {
  // Language state
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY)
      if (saved === 'fr' || saved === 'en') return saved
    } catch {
      // Ignore
    }
    return 'fr'
  })

  // Selected Track and Semester state (default 2CP S1 matching Stitch reference)
  const [track, setTrack] = useState<TrackId>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_TRACK_KEY) as TrackId
      if (['1CP', '2CP', '1CS', '2CS-AI', '2CS-CS'].includes(saved)) return saved
    } catch {
      // Ignore
    }
    return '2CP'
  })

  const [semester, setSemester] = useState<SemesterNum>(() => {
    try {
      const saved = Number(localStorage.getItem(STORAGE_SEM_KEY))
      if (saved === 1 || saved === 2) return saved as SemesterNum
    } catch {
      // Ignore
    }
    return 1
  })

  // Current Semester Config
  const config = useMemo(() => getSemesterConfig(track, semester), [track, semester])

  // Grades state for the active semester (initialized synchronously)
  const [grades, setGrades] = useState<GradesState>(() => {
    const semStorageKey = `${STORAGE_KEY_PREFIX}2CP-S1`
    try {
      const saved = localStorage.getItem(semStorageKey)
      if (saved) return JSON.parse(saved)
    } catch {
      // Ignore
    }
    // Default initial sample values for 2CP-S1 matching Stitch reference
    return {
      'SFSD-0': { exam: '14', td: '15.5' },
      'ARCH 2-1': { exam: '13.5', td: '14' },
      'ELECT2-2': { exam: '15', td: '16' },
      'ANA 3-3': { exam: '11.5', td: '13' },
      'ALG 3-4': { exam: '14', td: '14' },
      'PROBA1-5': { exam: '12', td: '14.5' },
      'ANGLAIS-6': { exam: '16.5', td: '17' },
      'ECONOMY-7': { exam: '13', td: '14' },
    }
  })

  // Load saved grades when active semester changes
  useEffect(() => {
    const semStorageKey = `${STORAGE_KEY_PREFIX}${config.id}`
    try {
      const saved = localStorage.getItem(semStorageKey)
      if (saved) {
        setGrades(JSON.parse(saved))
        return
      }
    } catch {
      // Ignore
    }

    if (config.id === '2CP-S1') {
      const initialGrades: GradesState = {
        'SFSD-0': { exam: '14', td: '15.5' },
        'ARCH 2-1': { exam: '13.5', td: '14' },
        'ELECT2-2': { exam: '15', td: '16' },
        'ANA 3-3': { exam: '11.5', td: '13' },
        'ALG 3-4': { exam: '14', td: '14' },
        'PROBA1-5': { exam: '12', td: '14.5' },
        'ANGLAIS-6': { exam: '16.5', td: '17' },
        'ECONOMY-7': { exam: '13', td: '14' },
      }
      setGrades(initialGrades)
    } else {
      setGrades({})
    }
  }, [config.id])

  // Save active track, semester, language
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LANG_KEY, language)
    } catch {
      // Ignore
    }
  }, [language])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_TRACK_KEY, track)
      localStorage.setItem(STORAGE_SEM_KEY, semester.toString())
    } catch {
      // Ignore
    }
  }, [track, semester])

  // Save grades to localStorage whenever they change
  const saveGrades = useCallback(
    (newGrades: GradesState) => {
      setGrades(newGrades)
      try {
        const semStorageKey = `${STORAGE_KEY_PREFIX}${config.id}`
        localStorage.setItem(semStorageKey, JSON.stringify(newGrades))
      } catch {
        // Ignore
      }
    },
    [config.id]
  )

  // Handle grade updates
  const handleUpdateGrade = useCallback(
    (moduleKey: string, field: 'exam' | 'td', value: string) => {
      if (!isValidGradeInput(value)) return
      // Allow user to type decimals with dot or comma
      const updated: GradesState = {
        ...grades,
        [moduleKey]: {
          ...grades[moduleKey],
          [field]: value,
        },
      }
      saveGrades(updated)
    },
    [grades, saveGrades]
  )

  // Toggle language
  const handleToggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'fr' ? 'en' : 'fr'))
  }, [])

  // Sample data button action
  const handleSample = useCallback(() => {
    const sampleGrades: GradesState = {}
    config.modules.forEach((mod, idx) => {
      const key = getModuleKey(mod.module, idx)
      // Generate realistic high-pass grades between 11.5 and 16.5
      const exam = (12 + (idx * 1.7) % 4.5).toFixed(1)
      const td = (13 + (idx * 1.3) % 4).toFixed(1)
      sampleGrades[key] = { exam, td }
    })
    saveGrades(sampleGrades)
  }, [config.modules, saveGrades])

  // Clear data button action
  const handleClear = useCallback(() => {
    const cleared: GradesState = {}
    config.modules.forEach((mod, idx) => {
      const key = getModuleKey(mod.module, idx)
      cleared[key] = { exam: '', td: '' }
    })
    saveGrades(cleared)
  }, [config.modules, saveGrades])

  // Calculate live results
  const results = useMemo(() => {
    return calculateSemesterResults(config, grades)
  }, [config, grades])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans md:text-base selection:bg-blue-100 selection:text-blue-900">
      {/* Minimal Header */}
      <Header language={language} onToggleLanguage={handleToggleLanguage} />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-full px-4 sm:px-6 md:px-8 lg:px-12 py-5 md:py-8 space-y-4 md:space-y-6">
        {/* Track & Semester Selector */}
        <TrackSelector
          selectedTrack={track}
          selectedSemester={semester}
          onSelectTrack={setTrack}
          onSelectSemester={setSemester}
          trackLabel={config.trackName[language]}
          onSample={handleSample}
          onClear={handleClear}
          language={language}
        />

        {/* Results Dashboard (Focal Point) */}
        <ResultsDashboard results={results} language={language} />

        {/* Subject Units (UE) Tables Container */}
        <SubjectTable
          units={results.units}
          grades={grades}
          onUpdateGrade={handleUpdateGrade}
          language={language}
        />
      </main>

      {/* Footer */}
      <Footer language={language} />
    </div>
  )
}
