import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Heading from './Heading'
import { axe } from '../../../test/axe'

describe('Heading', () => {
  it('renders the title as a heading and the subtitle when given', () => {
    render(<Heading title="Login" subtitle="Boas-vindas! Faça seu login." />)

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByText('Boas-vindas! Faça seu login.')).toBeInTheDocument()
  })

  it('omits the subtitle when none is given', () => {
    render(<Heading title="Login" />)

    expect(screen.queryByText(/faça seu login/i)).not.toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Heading title="Login" subtitle="Boas-vindas! Faça seu login." />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
