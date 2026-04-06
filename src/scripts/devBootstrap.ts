import { createLocalReq, getPayload } from 'payload'

import type { User } from '@/payload-types'
import configPromise from '../payload.config'
import { seed } from '../endpoints/seed'

const DEV_ADMIN_EMAIL = process.env.DEV_ADMIN_EMAIL || 'dev@undivided.local'
const DEV_ADMIN_PASSWORD = process.env.DEV_ADMIN_PASSWORD || 'devpassword'
const DEV_ADMIN_NAME = process.env.DEV_ADMIN_NAME || 'Dev Admin'
const DEFAULT_SITE_TITLE = 'Payload Website Template'

const payload = await getPayload({ config: configPromise })

const [{ docs: existingUsers }, { docs: existingPages }, { docs: existingPosts }] = await Promise.all([
  payload.find({
    collection: 'users',
    depth: 0,
    limit: 1,
    pagination: false,
  }),
  payload.find({
    collection: 'pages',
    depth: 0,
    limit: 1,
    pagination: false,
  }),
  payload.find({
    collection: 'posts',
    depth: 0,
    limit: 1,
    pagination: false,
  }),
])

let adminUser = existingUsers[0] as User | undefined

if (!adminUser) {
  payload.logger.info(`Creating dev admin user ${DEV_ADMIN_EMAIL}`)

  adminUser = await payload.create({
    collection: 'users',
    data: {
      email: DEV_ADMIN_EMAIL,
      name: DEV_ADMIN_NAME,
      password: DEV_ADMIN_PASSWORD,
    },
    depth: 0,
  })
}

const siteSettings = await payload.findGlobal({
  slug: 'siteSettings',
  depth: 0,
})

if (!siteSettings.createdAt) {
  payload.logger.info('Initializing site settings global...')

  await payload.updateGlobal({
    slug: 'siteSettings',
    data: {
      siteTitle: siteSettings.siteTitle || DEFAULT_SITE_TITLE,
      logo: siteSettings.logo || null,
    },
    depth: 0,
    context: {
      disableRevalidate: true,
    },
  })
}

const shouldSeed = existingPages.length === 0 && existingPosts.length === 0

if (shouldSeed) {
  payload.logger.info('No existing pages or posts found. Seeding demo content...')

  const req = await createLocalReq(
    { user: adminUser as User & { collection: 'users' } },
    payload,
  )

  await seed({
    payload,
    req,
    disableRevalidate: true,
  })
} else {
  payload.logger.info('Existing content found. Skipping demo seed.')
}

payload.logger.info(`Dev login: ${DEV_ADMIN_EMAIL} / ${DEV_ADMIN_PASSWORD}`)

await payload.destroy()
