import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getSiteSettings } from '@/utilities/getSiteSettings'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const [headerData, siteSettings] = await Promise.all([
    getCachedGlobal('header', 1)() as Promise<Header>,
    getSiteSettings(),
  ])

  return <HeaderClient data={headerData} logo={siteSettings.logo} siteTitle={siteSettings.siteTitle} />
}
