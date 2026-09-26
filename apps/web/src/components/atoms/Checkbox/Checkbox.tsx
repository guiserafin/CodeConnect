import { useId } from 'react'

interface CheckboxProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function Checkbox({ label, checked, onChange }: CheckboxProps) {
  const id = useId()

  return (
    <label htmlFor={id} className="flex items-center gap-2 text-sm text-gray-medium">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span className="flex size-6 shrink-0 items-center justify-center rounded border-2 border-gray-medium p-1 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary">
        {checked && <img src="/checkbox-check.svg" alt="" className="h-full w-full" />}
      </span>
      {label}
    </label>
  )
}

export default Checkbox
