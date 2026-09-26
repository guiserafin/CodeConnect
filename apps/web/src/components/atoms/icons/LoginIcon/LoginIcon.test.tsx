import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LoginIcon from './LoginIcon'
import { axe } from '../../../../test/axe'

describe('LoginIcon', () => {
  it('renders as a decorative, hidden-from-accessibility-tree svg', () => {
    const { container } = render(<LoginIcon />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<LoginIcon />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
