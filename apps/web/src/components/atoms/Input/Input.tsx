import type { InputHTMLAttributes } from 'react'

function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-lg bg-gray-medium/40 px-4 py-3 text-offwhite outline-none placeholder:text-offwhite/50 focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  )
}

export default Input
