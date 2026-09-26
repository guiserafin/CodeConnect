import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import RegisterPage from './RegisterPage'
import { axe } from '../../test/axe'

describe('RegisterPage', () => {
  it('renders the heading, the form, the social options and the login link', () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Cadastro' })).toBeInTheDocument()
    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Github' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Gmail' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Faça seu login!' })).toHaveAttribute('href', '/login')
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('does not log the password when the form is submitted', async () => {
    const user = userEvent.setup()
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    )

    await user.type(screen.getByLabelText('Nome'), 'Guilherme Carvalho')
    await user.type(screen.getByLabelText('Email'), 'guilherme@example.com')
    await user.type(screen.getByLabelText('Senha'), 'segredo123')
    await user.click(screen.getByRole('button', { name: /cadastrar/i }))

    const loggedText = JSON.stringify(infoSpy.mock.calls)
    expect(loggedText).not.toContain('segredo123')

    infoSpy.mockRestore()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
