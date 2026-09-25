import type { ReactNode } from 'react'
import Heading from '../../atoms/Heading'

interface AuthTemplateProps {
  bannerSrc: string
  bannerAlt: string
  title: string
  subtitle: string
  children: ReactNode
}

function AuthTemplate({ bannerSrc, bannerAlt, title, subtitle, children }: AuthTemplateProps) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-dark p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-graphite shadow-2xl">
        <div className="hidden flex-1 md:block">
          <img src={bannerSrc} alt={bannerAlt} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-6 p-8 sm:p-10">
          <Heading title={title} subtitle={subtitle} />
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthTemplate
