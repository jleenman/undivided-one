import clsx from 'clsx'
import React from 'react'
import { getMediaUrl } from '@/utilities/getMediaUrl'

import type { Media } from '@/payload-types'

interface Props {
  className?: string
  imageClassName?: string
  textClassName?: string
  logo?: Media | null
  siteTitle: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    imageClassName,
    textClassName,
    logo,
    siteTitle,
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  const logoUrl = getMediaUrl(logo?.url)
  const alt = logo?.alt || `${siteTitle} logo`

  return (
    <span className={clsx('inline-flex items-center gap-3', className)}>
      {logoUrl && (
        /* eslint-disable @next/next/no-img-element */
        <img
          alt={alt}
          width={48}
          height={48}
          loading={loading}
          fetchPriority={priority}
          decoding="async"
          className={clsx('h-8 w-auto object-contain', imageClassName)}
          src={logoUrl}
        />
      )}
      <span className={clsx('text-base font-semibold leading-none', textClassName)}>{siteTitle}</span>
    </span>
  )
}
