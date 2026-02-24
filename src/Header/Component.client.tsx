'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import type { Media } from '@/payload-types'

interface HeaderClientProps {
  data: Header
  logo?: Media | null | number
  siteTitle: string
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, logo, siteTitle }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between">
        <Link href="/">
          <Logo
            loading="eager"
            priority="high"
            logo={typeof logo === 'object' ? logo : null}
            siteTitle={siteTitle}
            textClassName="text-foreground"
          />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
