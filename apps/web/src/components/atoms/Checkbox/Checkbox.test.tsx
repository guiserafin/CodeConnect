import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Checkbox from './Checkbox'

describe('Checkbox', () => {
  it('renders its label and reflects the checked state', () => {
    render(<Checkbox label="Lembrar-me" checked onChange={vi.fn()} />)

    expect(screen.getByLabelText('Lembrar-me')).toBeChecked()
  })

  it('calls onChange with the toggled value when clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Checkbox label="Lembrar-me" checked={false} onChange={onChange} />)
    await user.click(screen.getByLabelText('Lembrar-me'))

    expect(onChange).toHaveBeenCalledWith(true)
  })
})
