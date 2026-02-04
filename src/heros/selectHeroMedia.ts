import type { Page } from '@/payload-types'

type HeroMediaItems = Page['hero']['media']
type HeroMediaItem = NonNullable<HeroMediaItems>[number]

const normalizeHeroMediaItems = (items: HeroMediaItems): HeroMediaItem[] => {
  if (!Array.isArray(items)) return []

  return items.filter(
    (item): item is HeroMediaItem =>
      Boolean(item) && typeof item === 'object' && typeof item.minWidth === 'number',
  )
}

export const selectHeroMedia = (items: HeroMediaItems, viewportWidth?: number | null) => {
  const normalized = normalizeHeroMediaItems(items).sort((a, b) => a.minWidth - b.minWidth)

  if (normalized.length === 0) {
    return null
  }

  if (typeof viewportWidth === 'number') {
    const match = normalized.filter((item) => item.minWidth <= viewportWidth).pop()
    if (match) {
      return match.media
    }
  }

  return normalized[normalized.length - 1]?.media ?? null
}
