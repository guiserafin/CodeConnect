import type { LabelHTMLAttributes } from 'react'

function Label({ className = '', ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={`mb-2 block text-sm font-medium text-offwhite ${className}`} {...props} />
}

export default Label
