import type { SiteSetting } from '@/payload-types'

import { getCachedGlobal } from './getGlobals'

export const DEFAULT_SITE_TITLE = 'Payload Website Template'
export const DEFAULT_LOGO_TEXT = 'Payload Website Template'

const isMissingLogoTextColumnError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') return false

  const errorCode = 'code' in error ? error.code : undefined
  const errorMessage = 'message' in error ? error.message : undefined

  return (
    errorCode === '42703' &&
    typeof errorMessage === 'string' &&
    errorMessage.toLowerCase().includes('logo_text')
  )
}

export const getSiteSettings = async (): Promise<Pick<SiteSetting, 'logo' | 'logoText' | 'siteTitle'>> => {
  try {
    const siteSettings = (await getCachedGlobal('siteSettings', 1)()) as SiteSetting

    return {
      logo: siteSettings?.logo,
      logoText: siteSettings?.logoText || siteSettings?.siteTitle || DEFAULT_LOGO_TEXT,
      siteTitle: siteSettings?.siteTitle || DEFAULT_SITE_TITLE,
    }
  } catch (error) {
    // Prevent hard crashes when code is deployed before the new migration has been applied.
    if (isMissingLogoTextColumnError(error)) {
      return {
        logo: null,
        logoText: DEFAULT_LOGO_TEXT,
        siteTitle: DEFAULT_SITE_TITLE,
      }
    }

    throw error
  }
}
