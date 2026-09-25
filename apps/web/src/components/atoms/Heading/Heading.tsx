interface HeadingProps {
  title: string
  subtitle?: string
}

function Heading({ title, subtitle }: HeadingProps) {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-offwhite">{title}</h1>
      {subtitle && <p className="mt-2 text-gray-medium">{subtitle}</p>}
    </div>
  )
}

export default Heading
