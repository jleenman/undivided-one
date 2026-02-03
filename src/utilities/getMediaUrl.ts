/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  const normalized = normalizeMediaUrl(url)
  if (!normalized) return ''

  if (cacheTag && cacheTag !== '') {
    const encodedTag = encodeURIComponent(cacheTag)
    const separator = normalized.includes('?') ? '&' : '?'
    return `${normalized}${separator}${encodedTag}`
  }

  return normalized
}

const normalizeMediaUrl = (value: string): string => {
  if (value.startsWith('/')) {
    return value
  }

  if (value.startsWith('data:') || value.startsWith('blob:')) {
    return value
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    try {
      const parsed = new URL(value)
      return `${parsed.pathname}${parsed.search}`
    } catch {
      return value
    }
  }

  return `/${value}`
}
