export type LocaleCode = 'nl' | 'en'

const siteUrl = 'https://undivided.one'

export function useLocalizedSeo(options: {
  locale: LocaleCode
  path: string
  title: string
  description: string
}) {
  const url = `${siteUrl}${options.path}`
  const alternatePath = options.locale === 'nl' ? options.path.replace(/^\/nl/, '/en') : options.path.replace(/^\/en/, '/nl')

  useHead({
    htmlAttrs: { lang: options.locale },
    title: options.title,
    meta: [
      { name: 'description', content: options.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: options.title },
      { property: 'og:description', content: options.description },
      { property: 'og:url', content: url },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { rel: 'canonical', href: url },
      { rel: 'alternate', hreflang: options.locale, href: url },
      { rel: 'alternate', hreflang: options.locale === 'nl' ? 'en' : 'nl', href: `${siteUrl}${alternatePath}` },
      { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/` },
    ],
  })
}
