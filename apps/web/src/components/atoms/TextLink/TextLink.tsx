import type { ReactNode } from 'react'
import { Link } from 'react-router'

interface TextLinkProps {
  to: string
  children: ReactNode
  variant?: 'underline' | 'primary'
}

function TextLink({ to, children, variant = 'underline' }: TextLinkProps) {
  const styles =
    variant === 'primary'
      ? 'font-semibold text-primary hover:underline'
      : 'text-offwhite underline underline-offset-2 hover:text-primary'

  return (
    <Link to={to} className={styles}>
      {children}
    </Link>
  )
}

export default TextLink
