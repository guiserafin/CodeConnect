import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import RegisterForm from './RegisterForm'
import { axe } from '../../../test/axe'

describe('RegisterForm', () => {
  it('submits the entered data', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(
      <MemoryRouter>
        <RegisterForm onSubmit={onSubmit} />
      </MemoryRouter>,
    )

    await user.type(screen.getByLabelText('Nome'), 'Guilherme Carvalho')
    await user.type(screen.getByLabelText('Email'), 'guilherme@example.com')
    await user.type(screen.getByLabelText('Senha'), 'segredo123')
    await user.click(screen.getByLabelText('Lembrar-me'))
    await user.click(screen.getByRole('button', { name: /cadastrar/i }))

    expect(onSubmit).toHaveBeenCalledWith({
      nome: 'Guilherme Carvalho',
      email: 'guilherme@example.com',
      senha: 'segredo123',
      lembrar: true,
    })
  })

  it('does not submit when required fields are empty', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(
      <MemoryRouter>
        <RegisterForm onSubmit={onSubmit} />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: /cadastrar/i }))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <RegisterForm onSubmit={vi.fn()} />
      </MemoryRouter>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
