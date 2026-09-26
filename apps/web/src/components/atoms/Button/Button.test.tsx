import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Button from './Button'
import { axe } from '../../../test/axe'

describe('Button', () => {
  it('renders its label and calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Button onClick={onClick}>Login</Button>)
    await user.click(screen.getByRole('button', { name: 'Login' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders an icon when provided', () => {
    render(<Button icon={<span data-testid="icon" />}>Login</Button>)

    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Button onClick={vi.fn()}>Login</Button>)

    expect(await axe(container)).toHaveNoViolations()
  })
})
