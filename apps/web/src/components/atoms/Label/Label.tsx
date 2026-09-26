import type { LabelHTMLAttributes } from 'react'

function Label({ className = '', ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={`mb-2 block text-lg font-normal text-offwhite ${className}`} {...props} />
}

export default Label
