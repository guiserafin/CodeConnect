import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
}

function Button({ icon, children, className = '', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-dark transition hover:brightness-95 ${className}`}
      {...props}
    >
      {children}
      {icon}
    </button>
  )
}

export default Button
