import { describe, expect, it } from 'vitest'

import type { Media, Page } from '@/payload-types'

import { selectHeroMedia } from '@/heros/selectHeroMedia'

const createMedia = (id: number, filename: string) =>
  ({
    id,
    alt: filename,
    filename,
    mimeType: 'image/jpeg',
    url: `/media/${filename}`,
    width: 1200,
    height: 800,
    filesize: 1000,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  }) as Media

const responsiveMedia = (items: Array<{ minWidth: number; media: Media }>) =>
  items.map(({ minWidth, media }) => ({
    minWidth,
    media,
    id: `${media.id}-${minWidth}`,
  })) as Page['hero']['media']

describe('selectHeroMedia', () => {
  it('selects the best match for the viewport width', () => {
    const mediaItems = responsiveMedia([
      { minWidth: 0, media: createMedia(1, 'mobile.jpg') },
      { minWidth: 768, media: createMedia(2, 'tablet.jpg') },
      { minWidth: 1024, media: createMedia(3, 'desktop.jpg') },
    ])

    expect(selectHeroMedia(mediaItems, 500)).toBe(mediaItems?.[0]?.media)
    expect(selectHeroMedia(mediaItems, 900)).toBe(mediaItems?.[1]?.media)
    expect(selectHeroMedia(mediaItems, 1400)).toBe(mediaItems?.[2]?.media)
  })

  it('falls back to the largest breakpoint when no match is found', () => {
    const mediaItems = responsiveMedia([
      { minWidth: 768, media: createMedia(2, 'tablet.jpg') },
      { minWidth: 1024, media: createMedia(3, 'desktop.jpg') },
    ])

    expect(selectHeroMedia(mediaItems, 500)).toBe(mediaItems?.[1]?.media)
  })

  it('returns the last breakpoint when viewport width is unavailable', () => {
    const mediaItems = responsiveMedia([
      { minWidth: 0, media: createMedia(1, 'mobile.jpg') },
      { minWidth: 768, media: createMedia(2, 'tablet.jpg') },
    ])

    expect(selectHeroMedia(mediaItems, null)).toBe(mediaItems?.[1]?.media)
  })
})
