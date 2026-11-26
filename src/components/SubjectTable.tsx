import React from 'react'
import type { ComputedUnit, GradesState, Language } from '../types'
import { t } from '../lib/translations'
import { formatGrade } from '../lib/validation'

interface SubjectTableProps {
  units: ComputedUnit[]
  grades: GradesState
  onUpdateGrade: (moduleKey: string, field: 'exam' | 'td', value: string) => void
  language: Language
}

export const SubjectTable: React.FC<SubjectTableProps> = ({
  units,
  grades,
  onUpdateGrade,
  language,
}) => {
  return (
    <div className="space-y-4 w-full" id="curriculum-container">
      {units.map((ue, ueIdx) => {
        const ueAvg = ue.average
        const ueAvgStr = formatGrade(ueAvg)
        const isUePassing = ueAvg >= 10.0

        return (
          <div
            key={ue.name + ueIdx}
            className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs"
          >
            {/* UE Header with Title & UE Average badge */}
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight">
                  {ue.name}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  ({ue.totalCoefficients} coeff • {ue.totalCredits} ECTS)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-medium">{t(language, 'ue_avg_label')}</span>
                <span
                  id={`ue-avg-${ueIdx}`}
                  className={`font-bold px-1.5 py-0.5 rounded font-mono tabular-nums ${
                    isUePassing
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-red-600 bg-red-50'
                  }`}
                >
                  {ueAvgStr}
                </span>
              </div>
            </div>

            {/* Clean Compact Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-200 bg-white">
                    <th scope="col" className="py-2.5 px-3 sm:px-4 font-semibold">
                      {t(language, 'th_subject')}
                    </th>
                    <th scope="col" className="py-2.5 px-2 text-center font-semibold w-14 sm:w-16">
                      {t(language, 'th_coeff')}
                    </th>
                    <th scope="col" className="py-2.5 px-2 text-right font-semibold w-24 sm:w-28">
                      {t(language, 'th_exam')}
                    </th>
                    <th scope="col" className="py-2.5 px-2 text-right font-semibold w-24 sm:w-28">
                      {t(language, 'th_td')}
                    </th>
                    <th scope="col" className="py-2.5 px-3 sm:px-4 text-right font-semibold w-20 sm:w-24">
                      {t(language, 'th_moyenne')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ue.modules.map((mod) => {
                    const entry = grades[mod.key]
                    const examVal = entry?.exam ?? ''
                    const tdVal = entry?.td ?? ''
                    const avg = mod.average
                    const isPassing = mod.isPassing
                    const hasInput = mod.hasGrades

                    // Display module name and subtitle if available
                    const displayName = mod.fullName?.[language] || mod.module

                    return (
                      <tr
                        key={mod.key}
                        className="hover:bg-slate-50/60 transition-colors"
                      >
                        <td className="py-2.5 px-3 sm:px-4 font-medium text-slate-800">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900 leading-tight">
                              {mod.module}
                            </span>
                            {displayName !== mod.module && (
                              <span className="text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                                {displayName}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-2.5 px-2 text-center text-slate-600 font-medium">
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
                            {mod.coef}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-right">
                          <input
                            type="text"
                            inputMode="decimal"
                            value={examVal}
                            placeholder="0"
                            onChange={(e) => onUpdateGrade(mod.key, 'exam', e.target.value)}
                            className="w-16 sm:w-20 text-right text-xs font-mono font-medium py-1 px-1.5 rounded border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                          />
                        </td>
                        <td className="py-2.5 px-2 text-right">
                          <input
                            type="text"
                            inputMode="decimal"
                            value={tdVal}
                            placeholder="0"
                            onChange={(e) => onUpdateGrade(mod.key, 'td', e.target.value)}
                            className="w-16 sm:w-20 text-right text-xs font-mono font-medium py-1 px-1.5 rounded border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                          />
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-right">
                          <span
                            id={`avg-mod-${mod.key}`}
                            className={`inline-block font-semibold font-mono px-1.5 py-0.5 rounded text-xs tabular-nums ${
                              !hasInput
                                ? 'bg-slate-100 text-slate-600'
                                : isPassing
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-red-50 text-red-600'
                            }`}
                          >
                            {formatGrade(avg)}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}
