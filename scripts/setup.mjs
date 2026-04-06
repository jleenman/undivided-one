import { randomBytes } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const envExamplePath = path.resolve(rootDir, '.env.example')
const envPath = path.resolve(rootDir, '.env')

const secretKeys = ['PAYLOAD_SECRET', 'PREVIEW_SECRET', 'CRON_SECRET']
const placeholderValues = new Set(['', 'CHANGE_ME', 'YOUR_SECRET_HERE', 'YOUR_CRON_SECRET_HERE'])

const parseEnv = (content) => {
  const entries = new Map()

  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/)

    if (match) {
      entries.set(match[1], match[2])
    }
  }

  return entries
}

const generateSecret = () => randomBytes(32).toString('hex')

if (!existsSync(envExamplePath)) {
  throw new Error('Missing .env.example')
}

const envExampleContent = readFileSync(envExamplePath, 'utf8')
const envExampleEntries = parseEnv(envExampleContent)

const envExists = existsSync(envPath)
const existingEnvContent = envExists ? readFileSync(envPath, 'utf8') : ''
const existingEnvEntries = parseEnv(existingEnvContent)

const mergedEntries = new Map(envExampleEntries)

for (const [key, value] of existingEnvEntries) {
  mergedEntries.set(key, value)
}

const generatedSecrets = []

for (const key of secretKeys) {
  const currentValue = mergedEntries.get(key)?.trim() || ''

  if (placeholderValues.has(currentValue)) {
    mergedEntries.set(key, generateSecret())
    generatedSecrets.push(key)
  }
}

const appPort = mergedEntries.get('APP_PORT')?.trim() || envExampleEntries.get('APP_PORT') || '3001'
mergedEntries.set('APP_PORT', appPort)

const serverUrl = mergedEntries.get('NEXT_PUBLIC_SERVER_URL')?.trim() || ''

if (!serverUrl || serverUrl === 'http://localhost:3000' || serverUrl === 'http://localhost:3001') {
  mergedEntries.set('NEXT_PUBLIC_SERVER_URL', `http://localhost:${appPort}`)
}

const renderedLines = envExampleContent.split(/\r?\n/).map((line) => {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/)

  if (!match) {
    return line
  }

  return `${match[1]}=${mergedEntries.get(match[1]) ?? match[2]}`
})

const extraEntries = []

for (const [key, value] of existingEnvEntries) {
  if (!envExampleEntries.has(key)) {
    extraEntries.push(`${key}=${value}`)
  }
}

if (extraEntries.length > 0) {
  renderedLines.push('', '# Existing local values', ...extraEntries)
}

writeFileSync(envPath, `${renderedLines.join('\n').trim()}\n`, 'utf8')

console.log(envExists ? 'Updated .env from .env.example' : 'Created .env from .env.example')
console.log(`Configured APP_PORT=${appPort}`)

if (generatedSecrets.length > 0) {
  console.log(`Generated secrets for: ${generatedSecrets.join(', ')}`)
} else {
  console.log('Kept existing secrets')
}
