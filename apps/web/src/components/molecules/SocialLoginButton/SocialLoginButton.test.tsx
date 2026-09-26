import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import SocialLoginButton from './SocialLoginButton'
import { axe } from '../../../test/axe'

describe('SocialLoginButton', () => {
  it('renders the provider icon and label, and calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<SocialLoginButton label="Github" iconSrc="/Github.png" onClick={onClick} />)
    const button = screen.getByRole('button', { name: 'Github' })
    expect(button.querySelector('img')).toHaveAttribute('src', '/Github.png')

    await user.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <SocialLoginButton label="Github" iconSrc="/Github.png" onClick={vi.fn()} />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
