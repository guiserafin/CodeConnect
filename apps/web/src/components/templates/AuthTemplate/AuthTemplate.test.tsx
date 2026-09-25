import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import AuthTemplate from './AuthTemplate'

describe('AuthTemplate', () => {
  it('renders the banner, heading and the given content', () => {
    render(
      <AuthTemplate
        bannerSrc="/banner-login.png"
        bannerAlt="CodeConnect"
        title="Login"
        subtitle="Boas-vindas! Faça seu login."
      >
        <p>form-slot</p>
      </AuthTemplate>,
    )

    expect(screen.getByRole('img', { name: 'CodeConnect' })).toHaveAttribute(
      'src',
      '/banner-login.png',
    )
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByText('Boas-vindas! Faça seu login.')).toBeInTheDocument()
    expect(screen.getByText('form-slot')).toBeInTheDocument()
  })
})
