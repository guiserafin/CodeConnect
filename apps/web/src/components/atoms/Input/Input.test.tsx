import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Input from './Input'

describe('Input', () => {
  it('accepts typed input and forwards native props', async () => {
    const user = userEvent.setup()

    render(<Input placeholder="usuario123" required />)
    const input = screen.getByPlaceholderText('usuario123')
    await user.type(input, 'guilherme')

    expect(input).toHaveValue('guilherme')
    expect(input).toBeRequired()
  })
})
