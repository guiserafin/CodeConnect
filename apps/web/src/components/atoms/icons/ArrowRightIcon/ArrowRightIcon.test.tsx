import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ArrowRightIcon from './ArrowRightIcon'

describe('ArrowRightIcon', () => {
  it('renders as a decorative, hidden-from-accessibility-tree svg', () => {
    const { container } = render(<ArrowRightIcon />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })
})
