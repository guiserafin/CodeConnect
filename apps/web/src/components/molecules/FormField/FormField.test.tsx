import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import FormField from './FormField'

describe('FormField', () => {
  it('links the label to the input so it is reachable by accessible name', async () => {
    const user = userEvent.setup()

    render(<FormField label="Email ou usuário" placeholder="usuario123" />)
    const input = screen.getByLabelText('Email ou usuário')
    await user.type(input, 'guilherme')

    expect(input).toHaveValue('guilherme')
  })
})
