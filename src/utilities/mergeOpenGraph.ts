import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'
import { DEFAULT_SITE_TITLE } from './getSiteSettings'

type OpenGraphMetadata = NonNullable<Metadata['openGraph']>

const getDefaultOpenGraph = (siteTitle = DEFAULT_SITE_TITLE): OpenGraphMetadata => ({
  type: 'website',
  description: 'An open-source website built with Payload and Next.js.',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: siteTitle,
  title: siteTitle,
})

export const mergeOpenGraph = (
  og?: Metadata['openGraph'],
  siteTitle = DEFAULT_SITE_TITLE,
): Metadata['openGraph'] => {
  const defaultOpenGraph = getDefaultOpenGraph(siteTitle)

  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
