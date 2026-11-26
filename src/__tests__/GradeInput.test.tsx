import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useState } from 'react'
import { GradeInput } from '../components/GradeInput'

function ControlledGradeInputWrapper({
  initialValue = '',
  ariaLabel = 'Note Examen',
}: {
  initialValue?: string
  ariaLabel?: string
}) {
  const [val, setVal] = useState(initialValue)
  return (
    <GradeInput
      value={val}
      onChange={setVal}
      aria-label={ariaLabel}
    />
  )
}

describe('GradeInput Component Interactive Tests', () => {
  it('renders with type="text", inputMode="decimal" and required aria-label', () => {
    render(<ControlledGradeInputWrapper ariaLabel="Note Examen Math" />)
    const input = screen.getByLabelText('Note Examen Math') as HTMLInputElement

    expect(input.type).toBe('text')
    expect(input.inputMode).toBe('decimal')
    expect(input.getAttribute('aria-label')).toBe('Note Examen Math')
  })

  it('refuses letters during typing (lettres refusées)', () => {
    render(<ControlledGradeInputWrapper initialValue="14" />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: '14a' } })
    expect(input.value).toBe('14')

    fireEvent.change(input, { target: { value: 'abc' } })
    expect(input.value).toBe('14')
  })

  it('refuses 21 (21 refusé)', () => {
    render(<ControlledGradeInputWrapper initialValue="" />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: '21' } })
    expect(input.value).toBe('')
  })

  it('refuses -5 (-5 refusé)', () => {
    render(<ControlledGradeInputWrapper initialValue="" />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: '-5' } })
    expect(input.value).toBe('')
  })

  it('accepts 20 (20 accepté)', () => {
    render(<ControlledGradeInputWrapper initialValue="" />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: '20' } })
    expect(input.value).toBe('20')
  })

  it('refuses 20,5 (20,5 refusé)', () => {
    render(<ControlledGradeInputWrapper initialValue="20" />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: '20,5' } })
    expect(input.value).toBe('20')
  })

  it('accepts 14,5 (14,5 accepté)', () => {
    render(<ControlledGradeInputWrapper initialValue="" />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: '14,5' } })
    expect(input.value).toBe('14,5')
  })

  it('accepts 14.55 (14.55 accepté)', () => {
    render(<ControlledGradeInputWrapper initialValue="" />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: '14.55' } })
    expect(input.value).toBe('14.55')
  })

  it('refuses 14.555 (14.555 refusé)', () => {
    render(<ControlledGradeInputWrapper initialValue="14.55" />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: '14.555' } })
    expect(input.value).toBe('14.55')
  })

  it('refuses invalid pasted text (texte collé invalide refusé)', () => {
    render(<ControlledGradeInputWrapper initialValue="12" />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => 'texte collé invalide',
      },
    })
    expect(input.value).toBe('12')

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '25',
      },
    })
    expect(input.value).toBe('12')

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '-5',
      },
    })
    expect(input.value).toBe('12')
  })

  it('accepts and cleans valid pasted text', () => {
    render(<ControlledGradeInputWrapper initialValue="" />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '  15.25  ',
      },
    })
    expect(input.value).toBe('15.25')
  })

  it('normalizes value on blur: "12," becomes "12" and "," becomes empty', () => {
    render(<ControlledGradeInputWrapper initialValue="12," />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.blur(input)
    expect(input.value).toBe('12')

    fireEvent.change(input, { target: { value: ',' } })
    expect(input.value).toBe(',')
    fireEvent.blur(input)
    expect(input.value).toBe('')
  })
})
