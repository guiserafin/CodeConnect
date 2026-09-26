import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import TextLink from './TextLink'
import { axe } from '../../../test/axe'

describe('TextLink', () => {
  it('renders a link pointing to the given route', () => {
    render(
      <MemoryRouter>
        <TextLink to="/cadastro">Crie seu cadastro!</TextLink>
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Crie seu cadastro!' })).toHaveAttribute(
      'href',
      '/cadastro',
    )
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <TextLink to="/cadastro">Crie seu cadastro!</TextLink>
      </MemoryRouter>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
