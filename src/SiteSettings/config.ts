import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteTitle',
      label: 'Website Title',
      type: 'text',
      required: true,
      defaultValue: 'Payload Website Template',
    },
    {
      name: 'logoText',
      label: 'Logo Text',
      type: 'text',
      required: true,
      defaultValue: 'Payload Website Template',
      admin: {
        description: 'Text shown next to the logo in the site header and footer.',
      },
    },
    {
      name: 'logo',
      label: 'Website Logo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
