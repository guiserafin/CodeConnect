import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import SocialLoginOptions from './SocialLoginOptions'

describe('SocialLoginOptions', () => {
  it('calls onSocialLogin with the matching provider for each button', async () => {
    const user = userEvent.setup()
    const onSocialLogin = vi.fn()

    render(<SocialLoginOptions onSocialLogin={onSocialLogin} />)

    await user.click(screen.getByRole('button', { name: 'Github' }))
    await user.click(screen.getByRole('button', { name: 'Gmail' }))

    expect(onSocialLogin).toHaveBeenNthCalledWith(1, 'github')
    expect(onSocialLogin).toHaveBeenNthCalledWith(2, 'google')
  })
})
