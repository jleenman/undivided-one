'use client'

import { useEffect, useState } from 'react'

import type { Page } from '@/payload-types'

import { selectHeroMedia } from './selectHeroMedia'

export const useResponsiveHeroMedia = (mediaItems: Page['hero']['media']) => {
  const [viewportWidth, setViewportWidth] = useState<number | null>(() => {
    if (typeof window === 'undefined') return null
    return window.innerWidth
  })

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return selectHeroMedia(mediaItems, viewportWidth)
}
