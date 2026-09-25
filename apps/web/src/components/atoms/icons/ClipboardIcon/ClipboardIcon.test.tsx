import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ClipboardIcon from './ClipboardIcon'

describe('ClipboardIcon', () => {
  it('renders as a decorative, hidden-from-accessibility-tree svg', () => {
    const { container } = render(<ClipboardIcon />)
    const svg = container.querySelector('svg')

    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })
})
