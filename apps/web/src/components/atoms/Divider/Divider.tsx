import type { ReactNode } from 'react'

interface DividerProps {
  children: ReactNode
}

function Divider({ children }: DividerProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-offwhite">
      <span className="h-px flex-1 bg-gray-medium/40" />
      {children}
      <span className="h-px flex-1 bg-gray-medium/40" />
    </div>
  )
}

export default Divider
