import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Label from './Label'
import { axe } from '../../../test/axe'

describe('Label', () => {
  it('renders its text and associates with the given input via htmlFor', () => {
    render(
      <>
        <Label htmlFor="email">Email ou usuário</Label>
        <input id="email" />
      </>,
    )

    expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <>
        <Label htmlFor="email">Email ou usuário</Label>
        <input id="email" />
      </>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
