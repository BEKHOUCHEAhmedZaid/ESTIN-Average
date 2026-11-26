import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('ESTIN Average Application UI & Interactive QA', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the complete Stitch interface faithfully on initial load (2CP S1)', () => {
    const { container } = render(<App />)

    // Header branding
    expect(screen.getByText('ESTIN')).toBeDefined()
    expect(screen.getByText('AVERAGE')).toBeDefined()
    expect(screen.getByText('Calculateur Académique')).toBeDefined()

    // Language toggle button
    expect(screen.getByRole('button', { name: /Passer en anglais/i })).toBeDefined()

    // Track selector pills
    expect(screen.getByText('1CP')).toBeDefined()
    expect(screen.getByText('2CP')).toBeDefined()
    expect(screen.getByText('1CS')).toBeDefined()
    expect(screen.getByText('2CS AI')).toBeDefined()
    expect(screen.getByText('2CS CS')).toBeDefined()

    // Current track label
    expect(screen.getByText('2CP — Cycle Préparatoire')).toBeDefined()

    // Semester segmented control
    expect(screen.getByRole('button', { name: 'S1' })).toBeDefined()
    expect(screen.getByRole('button', { name: 'S2' })).toBeDefined()

    // Primary KPI cards
    expect(screen.getByText('Moyenne Générale')).toBeDefined()
    expect(screen.getByText('Crédits ECTS')).toBeDefined()
    expect(screen.getByText('Matières Validées')).toBeDefined()
    expect(screen.getByText('Total Coeff')).toBeDefined()

    // Exact mathematical verification of 2CP S1 initial metrics
    const gpaEl = container.querySelector('#gpa-score')
    expect(gpaEl?.textContent).toBe('13.83')
    expect(container.querySelector('#kpi-credits-val')?.textContent).toBe('30 / 30')
    expect(container.querySelector('#kpi-modules-val')?.textContent).toBe('8 / 8')
    expect(container.querySelector('#kpi-coeff-val')?.textContent).toBe('28')

    // Check UEs and modules for 2CP S1
    expect(screen.getByText('UEF 5')).toBeDefined()
    expect(screen.getByText('UEF 6')).toBeDefined()
    expect(screen.getByText('SFSD')).toBeDefined()
    expect(screen.getByText('ARCH 2')).toBeDefined()
  })

  it('toggles bilingual language throughout the entire application', () => {
    render(<App />)

    const langBtn = screen.getByRole('button', { name: /Passer en anglais/i })
    fireEvent.click(langBtn)

    // English titles & labels
    expect(screen.getByText('Overall GPA')).toBeDefined()
    expect(screen.getByText('ECTS Credits')).toBeDefined()
    expect(screen.getByText('Passed Subjects')).toBeDefined()
    expect(screen.getByText('Total Coeff')).toBeDefined()
    expect(screen.getByText('Sample')).toBeDefined()
    expect(screen.getByText('Clear')).toBeDefined()
    expect(screen.getAllByText('Subject').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Continuous (/20)').length).toBeGreaterThan(0)
    expect(screen.getByText('Academic Calculator')).toBeDefined()

    // Toggle back to French
    const backBtn = screen.getByRole('button', { name: /Switch to French/i })
    fireEvent.click(backBtn)

    expect(screen.getByText('Moyenne Générale')).toBeDefined()
    expect(screen.getByText('Crédits ECTS')).toBeDefined()
    expect(screen.getByText('Matières Validées')).toBeDefined()
    expect(screen.getByText('Exemple')).toBeDefined()
    expect(screen.getByText('Effacer')).toBeDefined()
  })

  it('handles the Clear button and resets grades for the current semester', () => {
    const { container } = render(<App />)

    const clearBtn = screen.getByRole('button', { name: 'Effacer' })
    fireEvent.click(clearBtn)

    // Scores should reset
    expect(container.querySelector('#gpa-score')?.textContent).toBe('0.00')
    expect(container.querySelector('#kpi-credits-val')?.textContent).toBe('0 / 30')
    expect(container.querySelector('#kpi-modules-val')?.textContent).toBe('0 / 8')
  })

  it('handles the Example button and populates realistic passing grades', () => {
    const { container } = render(<App />)

    // First clear
    fireEvent.click(screen.getByRole('button', { name: 'Effacer' }))
    expect(container.querySelector('#gpa-score')?.textContent).toBe('0.00')

    // Now populate sample
    fireEvent.click(screen.getByRole('button', { name: 'Exemple' }))

    // All 8 modules should now be passed and credits awarded
    expect(container.querySelector('#kpi-credits-val')?.textContent).toBe('30 / 30')
    expect(container.querySelector('#kpi-modules-val')?.textContent).toBe('8 / 8')
    expect(screen.getByText('Semestre Validé')).toBeDefined()
  })

  it('switches between all 5 tracks and loads correct modules and coefficients', () => {
    render(<App />)

    // Switch to 1CP
    fireEvent.click(screen.getByRole('button', { name: '1CP' }))
    expect(screen.getByText('1CP — Cycle Préparatoire')).toBeDefined()
    expect(screen.getByText('ALSDS')).toBeDefined()
    expect(screen.getByText('HIST')).toBeDefined()

    // Switch to 1CS
    fireEvent.click(screen.getByRole('button', { name: '1CS' }))
    expect(screen.getByText('1CS — Second Cycle Ingénieur')).toBeDefined()
    expect(screen.getByText("Système d'exploitation")).toBeDefined()
    expect(screen.getByText('Réseaux 1')).toBeDefined()

    // Switch to 2CS AI
    fireEvent.click(screen.getByRole('button', { name: '2CS AI' }))
    expect(screen.getByText('2CS AI — Intelligence Artificielle & Data Science')).toBeDefined()
    expect(screen.getByText('Fondements du Data Science')).toBeDefined()
    expect(screen.getByText('Cloud Computing')).toBeDefined()

    // Switch to 2CS CS
    fireEvent.click(screen.getByRole('button', { name: '2CS CS' }))
    expect(screen.getByText('2CS CS — Cybersécurité')).toBeDefined()
  })

  it('switches between S1 and S2 semesters', () => {
    render(<App />)

    // Click S2
    fireEvent.click(screen.getByRole('button', { name: 'S2' }))
    // For 2CP S2, modules are ANAL4, LOGM, POO, SINF, etc.
    expect(screen.getByText('ANAL4')).toBeDefined()
    expect(screen.getByText('LOGM')).toBeDefined()
    expect(screen.getByText('POO')).toBeDefined()

    // Click S1 back
    fireEvent.click(screen.getByRole('button', { name: 'S1' }))
    expect(screen.getByText('SFSD')).toBeDefined()
    expect(screen.getByText('ARCH 2')).toBeDefined()
  })

  it('updates subject and semester averages immediately upon typing grades (with comma support)', () => {
    const { container } = render(<App />)

    // Clear grades
    fireEvent.click(screen.getByRole('button', { name: 'Effacer' }))

    // Find the first input (SFSD Exam)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBeGreaterThan(0)

    // Type 15,5 in Exam and 14 in TD
    fireEvent.change(inputs[0], { target: { value: '15,5' } })
    fireEvent.change(inputs[1], { target: { value: '14' } })

    // Module average for (15.5*2 + 14)/3 = 45/3 = 15.00
    const modAvgEl = container.querySelector('#avg-mod-SFSD-0')
    expect(modAvgEl?.textContent).toBe('15.00')
  })
})
