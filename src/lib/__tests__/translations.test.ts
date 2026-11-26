import { describe, it, expect } from 'vitest'
import { TRANSLATIONS, t } from '../translations'
import type { Language } from '../../types'

describe('Bilingual Translations Coverage', () => {
  it('has identical keys for both French and English dictionaries', () => {
    const frKeys = Object.keys(TRANSLATIONS.fr).sort()
    const enKeys = Object.keys(TRANSLATIONS.en).sort()

    expect(frKeys).toEqual(enKeys)
  })

  it('translates all core UI terms correctly in both languages', () => {
    const languages: Language[] = ['fr', 'en']
    const keys = Object.keys(TRANSLATIONS.fr) as Array<keyof typeof TRANSLATIONS.fr>

    languages.forEach((lang) => {
      keys.forEach((key) => {
        const translated = t(lang, key)
        expect(translated).toBeTruthy()
        expect(typeof translated).toBe('string')
        expect(translated.length).toBeGreaterThan(0)
      })
    })
  })

  it('returns appropriate language text when toggled', () => {
    expect(t('fr', 'title_moyenne_generale')).toBe('Moyenne Générale')
    expect(t('en', 'title_moyenne_generale')).toBe('Overall GPA')

    expect(t('fr', 'kpi_credits')).toBe('Crédits ECTS')
    expect(t('en', 'kpi_credits')).toBe('ECTS Credits')

    expect(t('fr', 'kpi_modules')).toBe('Matières Validées')
    expect(t('en', 'kpi_modules')).toBe('Passed Subjects')
  })
})
