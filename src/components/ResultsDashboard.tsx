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
    <div className="shrink-0 z-30 bg-white border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-6 md:gap-8">
        {/* Average Focal Point */}
        <div className="flex items-center justify-between sm:justify-start sm:flex-col sm:items-start">
          <div className="flex items-center gap-2 md:gap-3">
            <span
              className="text-xs md:text-sm lg:text-base uppercase tracking-wider font-semibold text-slate-500"
              data-i18n="title_moyenne_generale"
            >
              {t(language, 'title_moyenne_generale')}
            </span>
            {results.hasAnyGrade && (
              <span
                className={`text-[10px] md:text-xs lg:text-sm font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full ${
                  isPassing
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {isPassing ? t(language, 'status_admis') : t(language, 'status_ajourne')}
              </span>
            )}
          </div>
          <div className="mt-0.5 md:mt-2 flex items-baseline gap-1.5 md:gap-2.5">
            <span
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-mono tabular-nums ${
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
            <span className="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold text-slate-400">/ 20</span>
          </div>
        </div>

        {/* 3 Essential KPI Stats */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-6 sm:w-auto w-full">
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-1.5 sm:px-4 sm:py-2.5 md:px-5 md:py-3 text-center">
            <div className="text-[11px] md:text-xs lg:text-sm font-medium text-slate-500" data-i18n="kpi_credits">
              {t(language, 'kpi_credits')}
            </div>
            <div
              className={`text-xs sm:text-base md:text-xl lg:text-2xl font-bold mt-0.5 font-mono tabular-nums ${
                results.creditsEarned === results.totalCredits && results.hasAnyGrade
                  ? 'text-emerald-700'
                  : 'text-slate-900'
              }`}
              id="kpi-credits-val"
            >
              {results.creditsEarned} / {results.totalCredits}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-1.5 sm:px-4 sm:py-2.5 md:px-5 md:py-3 text-center">
            <div className="text-[11px] md:text-xs lg:text-sm font-medium text-slate-500" data-i18n="kpi_modules">
              {t(language, 'kpi_modules')}
            </div>
            <div className="text-xs sm:text-base md:text-xl lg:text-2xl font-bold text-slate-900 mt-0.5 font-mono tabular-nums" id="kpi-modules-val">
              {results.modulesValidatedCount} / {results.totalModulesCount}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-1.5 sm:px-4 sm:py-2.5 md:px-5 md:py-3 text-center">
            <div className="text-[11px] md:text-xs lg:text-sm font-medium text-slate-500" data-i18n="kpi_coeff">
              {t(language, 'kpi_coeff')}
            </div>
            <div className="text-xs sm:text-base md:text-xl lg:text-2xl font-bold text-slate-900 mt-0.5 font-mono tabular-nums" id="kpi-coeff-val">
              {results.totalCoefficients}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
