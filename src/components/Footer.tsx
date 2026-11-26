import React from 'react'
import type { Language } from '../types'
import { t } from '../lib/translations'

interface FooterProps {
  language: Language
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="mt-auto py-5 text-center text-xs text-slate-400 border-t border-slate-200/70 bg-white">
      <div className="w-full max-w-full px-4 sm:px-6 md:px-8 space-y-1">
        <p className="font-medium text-slate-600">
          {t(language, 'footer_text')}
        </p>
        <p className="text-[11px] text-slate-400">
          {t(language, 'footer_sub')}
        </p>
      </div>
    </footer>
  )
}
