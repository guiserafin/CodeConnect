import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import AuthPrompt from './AuthPrompt'
import { axe } from '../../../test/axe'

describe('AuthPrompt', () => {
  it('renders the question and a link to the given route', () => {
    render(
      <MemoryRouter>
        <AuthPrompt
          question="Ainda não tem conta?"
          linkLabel="Crie seu cadastro!"
          to="/cadastro"
        />
      </MemoryRouter>,
    )

    expect(screen.getByText('Ainda não tem conta?')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Crie seu cadastro!' })).toHaveAttribute(
      'href',
      '/cadastro',
    )
  })

  it('renders the icon in the same accent color as the link', () => {
    render(
      <MemoryRouter>
        <AuthPrompt
          question="Ainda não tem conta?"
          linkLabel="Crie seu cadastro!"
          to="/cadastro"
          icon={<svg data-testid="prompt-icon" />}
        />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('prompt-icon').parentElement).toHaveClass('text-primary')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <AuthPrompt question="Ainda não tem conta?" linkLabel="Crie seu cadastro!" to="/cadastro" />
      </MemoryRouter>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
