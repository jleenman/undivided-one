import type { SiteSetting } from '@/payload-types'

import { getCachedGlobal } from './getGlobals'

export const DEFAULT_SITE_TITLE = 'Payload Website Template'

export const getSiteSettings = async (): Promise<Pick<SiteSetting, 'logo' | 'siteTitle'>> => {
  const siteSettings = (await getCachedGlobal('siteSettings', 1)()) as SiteSetting

  return {
    logo: siteSettings?.logo,
    siteTitle: siteSettings?.siteTitle || DEFAULT_SITE_TITLE,
  }
}
