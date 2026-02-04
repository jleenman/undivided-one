import { describe, expect, it } from 'vitest'

import { toKebabCase } from '@/utilities/toKebabCase'

describe('toKebabCase', () => {
  it('converts camelCase to kebab-case', () => {
    expect(toKebabCase('helloWorldFromPayload')).toBe('hello-world-from-payload')
  })

  it('normalizes whitespace to single hyphens', () => {
    expect(toKebabCase('Hello   Payload  CMS')).toBe('hello-payload-cms')
  })
})
