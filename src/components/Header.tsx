import React from 'react'
import type { Language } from '../types'
import { t } from '../lib/translations'

interface HeaderProps {
  language: Language
  onToggleLanguage: () => void
}

export const Header: React.FC<HeaderProps> = ({ language, onToggleLanguage }) => {
  return (
    <header className="shrink-0 z-40 bg-white border-b border-slate-200">
      <div className="w-full max-w-full px-4 sm:px-6 md:px-8 lg:px-12 h-14 md:h-16 flex items-center justify-between">
        {/* Logo & Clean Title */}
        <div className="flex items-center gap-2.5">
          <a href="#" className="flex items-center gap-2.5 group">
            {/* Professional SVG Monogram & Academic Badge */}
            <div className="h-8 w-8 md:h-9 md:w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm md:text-base shadow-xs transition-transform group-hover:scale-105">
              <svg className="w-5 h-5 md:w-5.5 md:h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg md:text-xl">ESTIN</span>
                <span className="font-semibold text-blue-600 tracking-tight text-base sm:text-lg md:text-xl">AVERAGE</span>
              </div>
              <span className="text-[10px] md:text-xs font-medium text-slate-400 tracking-wide">
                {t(language, 'app_subtitle')}
              </span>
            </div>
          </a>
        </div>

        {/* Language Switcher Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={language === 'fr' ? 'Passer en anglais' : 'Switch to French'}
            onClick={onToggleLanguage}
            className="text-xs md:text-sm font-semibold px-2.5 py-1.5 md:px-3 md:py-2 rounded border border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer select-none"
            id="lang-switch-btn"
          >
            {language === 'fr' ? (
              <>FR <span className="text-slate-400 font-normal">|</span> EN</>
            ) : (
              <>EN <span className="text-slate-400 font-normal">|</span> FR</>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
