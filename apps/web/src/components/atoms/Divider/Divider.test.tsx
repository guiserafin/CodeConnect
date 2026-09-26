import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Divider from './Divider'
import { axe } from '../../../test/axe'

describe('Divider', () => {
  it('renders its label text', () => {
    render(<Divider>ou entre com outras contas</Divider>)

    expect(screen.getByText('ou entre com outras contas')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Divider>ou entre com outras contas</Divider>)

    expect(await axe(container)).toHaveNoViolations()
  })
})
