import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import AuthTemplate from './AuthTemplate'
import { axe } from '../../../test/axe'

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

  it('exposes the content as the page main landmark', () => {
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

    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders the decorative background marks as presentation-only', () => {
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

    const marks = screen.getAllByRole('presentation', { hidden: true })
    expect(marks.length).toBeGreaterThanOrEqual(2)
    marks.forEach((mark) => expect(mark).toHaveAttribute('src', '/auth-mark.svg'))
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <AuthTemplate
        bannerSrc="/banner-login.png"
        bannerAlt="CodeConnect"
        title="Login"
        subtitle="Boas-vindas! Faça seu login."
      >
        <p>form-slot</p>
      </AuthTemplate>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
