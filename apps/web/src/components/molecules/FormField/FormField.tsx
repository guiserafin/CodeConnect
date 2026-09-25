import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import Input from '../../atoms/Input'
import Label from '../../atoms/Label'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

function FormField({ label, id, ...inputProps }: FormFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div>
      <Label htmlFor={inputId}>{label}</Label>
      <Input id={inputId} {...inputProps} />
    </div>
  )
}

export default FormField
