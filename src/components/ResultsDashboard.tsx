import React from 'react'
import type { SemesterCalculationResult, Language } from '../types'
import { t } from '../lib/translations'
import { formatGrade } from '../lib/validation'

interface ResultsDashboardProps {
  results: SemesterCalculationResult
  language: Language
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results, language }) => {
  const gpa = results.semesterAverage
  const gpaStr = formatGrade(gpa)
  const isPassing = gpa >= 10.0

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs text-center sm:text-left transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Average Focal Point */}
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span
              className="text-xs uppercase tracking-wider font-semibold text-slate-500"
              data-i18n="title_moyenne_generale"
            >
              {t(language, 'title_moyenne_generale')}
            </span>
            {results.hasAnyGrade && (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isPassing
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {isPassing ? t(language, 'status_admis') : t(language, 'status_ajourne')}
              </span>
            )}
          </div>
          <div className="mt-1 flex items-baseline justify-center sm:justify-start gap-1.5">
            <span
              className={`text-4xl sm:text-5xl font-extrabold tracking-tight font-mono tabular-nums ${
                !results.hasAnyGrade
                  ? 'text-slate-400'
                  : isPassing
                  ? 'text-slate-900'
                  : 'text-rose-600'
              }`}
              id="gpa-score"
            >
              {results.hasAnyGrade ? gpaStr : '0.00'}
            </span>
            <span className="text-base font-semibold text-slate-400">/ 20</span>
          </div>
        </div>

        {/* 3 Essential KPI Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 sm:w-auto w-full pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-2 text-center">
            <div className="text-[11px] font-medium text-slate-500" data-i18n="kpi_credits">
              {t(language, 'kpi_credits')}
            </div>
            <div
              className={`text-sm sm:text-base font-bold mt-0.5 font-mono tabular-nums ${
                results.creditsEarned === results.totalCredits && results.hasAnyGrade
                  ? 'text-emerald-700'
                  : 'text-slate-900'
              }`}
              id="kpi-credits-val"
            >
              {results.creditsEarned} / {results.totalCredits}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-2 text-center">
            <div className="text-[11px] font-medium text-slate-500" data-i18n="kpi_modules">
              {t(language, 'kpi_modules')}
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 font-mono tabular-nums" id="kpi-modules-val">
              {results.modulesValidatedCount} / {results.totalModulesCount}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-2 text-center">
            <div className="text-[11px] font-medium text-slate-500" data-i18n="kpi_coeff">
              {t(language, 'kpi_coeff')}
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 font-mono tabular-nums" id="kpi-coeff-val">
              {results.totalCoefficients}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
