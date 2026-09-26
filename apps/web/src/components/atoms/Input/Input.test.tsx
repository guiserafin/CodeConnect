import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Input from './Input'
import { axe } from '../../../test/axe'

describe('Input', () => {
  it('accepts typed input and forwards native props', async () => {
    const user = userEvent.setup()

    render(<Input placeholder="usuario123" required />)
    const input = screen.getByPlaceholderText('usuario123')
    await user.type(input, 'guilherme')

    expect(input).toHaveValue('guilherme')
    expect(input).toBeRequired()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Input placeholder="usuario123" required />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
