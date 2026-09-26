import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ArrowRightIcon from './ArrowRightIcon'
import { axe } from '../../../../test/axe'

describe('ArrowRightIcon', () => {
  it('renders as a decorative, hidden-from-accessibility-tree svg', () => {
    const { container } = render(<ArrowRightIcon />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<ArrowRightIcon />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
