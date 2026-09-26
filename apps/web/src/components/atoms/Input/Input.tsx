import type { InputHTMLAttributes } from 'react'

function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-lg bg-gray-medium px-4 py-3 text-sm text-graphite outline-none placeholder:text-graphite/70 focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  )
}

export default Input
