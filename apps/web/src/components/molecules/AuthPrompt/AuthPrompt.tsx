import type { ReactNode } from 'react'
import TextLink from '../../atoms/TextLink'

interface AuthPromptProps {
  question: string
  linkLabel: string
  to: string
  icon?: ReactNode
}

function AuthPrompt({ question, linkLabel, to, icon }: AuthPromptProps) {
  return (
    <p className="flex items-center justify-center gap-2 text-lg text-offwhite">
      <span>{question}</span>
      <TextLink to={to} variant="primary">
        {linkLabel}
      </TextLink>
      {icon && <span className="text-primary">{icon}</span>}
    </p>
  )
}

export default AuthPrompt
