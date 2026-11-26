import React from 'react'
import type { TrackId, SemesterNum, Language } from '../types'
import { t } from '../lib/translations'

interface TrackSelectorProps {
  selectedTrack: TrackId
  selectedSemester: SemesterNum
  onSelectTrack: (track: TrackId) => void
  onSelectSemester: (sem: SemesterNum) => void
  trackLabel: string
  onSample: () => void
  onClear: () => void
  language: Language
}

const TRACKS: { id: TrackId; label: string }[] = [
  { id: '1CP', label: '1CP' },
  { id: '2CP', label: '2CP' },
  { id: '1CS', label: '1CS' },
  { id: '2CS-AI', label: '2CS AI' },
  { id: '2CS-CS', label: '2CS CS' },
]

export const TrackSelector: React.FC<TrackSelectorProps> = ({
  selectedTrack,
  selectedSemester,
  onSelectTrack,
  onSelectSemester,
  trackLabel,
  onSample,
  onClear,
  language,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3 sm:p-4 space-y-3">
      {/* Year / Track Pills */}
      <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
        <div className="inline-flex p-0.5 rounded-lg bg-slate-100 border border-slate-200/80 text-xs font-medium w-full sm:w-auto overflow-x-auto" id="year-selector">
          {TRACKS.map((track) => {
            const isSelected = selectedTrack === track.id
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => onSelectTrack(track.id)}
                data-track={track.id}
                className={
                  isSelected
                    ? 'px-3 py-1.5 rounded-md bg-white text-blue-600 font-semibold shadow-xs transition-colors cursor-pointer'
                    : 'px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 transition-colors cursor-pointer'
                }
              >
                {track.label}
              </button>
            )
          })}
        </div>

        {/* Secondary Actions: Subtle Example / Clear links */}
        <div className="flex items-center gap-3 text-xs text-slate-500 ml-auto pt-1 sm:pt-0">
          <button
            type="button"
            onClick={onSample}
            className="hover:text-blue-600 transition-colors cursor-pointer font-medium"
            data-i18n="btn_sample"
          >
            {t(language, 'btn_sample')}
          </button>
          <span className="text-slate-300">•</span>
          <button
            type="button"
            onClick={onClear}
            className="hover:text-red-600 transition-colors cursor-pointer font-medium"
            data-i18n="btn_clear"
          >
            {t(language, 'btn_clear')}
          </button>
        </div>
      </div>

      {/* Semester Segmented Control */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-100 gap-2">
        <span className="text-xs font-semibold text-slate-700 truncate" id="current-track-label">
          {trackLabel}
        </span>
        <div className="inline-flex p-0.5 rounded-md bg-slate-100 border border-slate-200 text-xs font-medium shrink-0">
          <button
            type="button"
            id="sem-1-btn"
            onClick={() => onSelectSemester(1)}
            className={
              selectedSemester === 1
                ? 'px-3 py-1 rounded bg-white text-blue-600 font-semibold shadow-xs cursor-pointer'
                : 'px-3 py-1 rounded text-slate-600 hover:text-slate-900 cursor-pointer'
            }
          >
            S1
          </button>
          <button
            type="button"
            id="sem-2-btn"
            onClick={() => onSelectSemester(2)}
            className={
              selectedSemester === 2
                ? 'px-3 py-1 rounded bg-white text-blue-600 font-semibold shadow-xs cursor-pointer'
                : 'px-3 py-1 rounded text-slate-600 hover:text-slate-900 cursor-pointer'
            }
          >
            S2
          </button>
        </div>
      </div>
    </div>
  )
}
