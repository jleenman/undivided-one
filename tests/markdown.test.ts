import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { parseMarkdown } from '../utils/markdown'

describe('parseMarkdown', () => {
  it('extracts metadata, headings, quotes, and lists', () => {
    const doc = parseMarkdown(`---
title: "Example"
---

# Title

## Chapter One

Paragraph with **strong** text.

> A quotation

- first
- second
`)

    expect(doc.meta.title).toBe('Example')
    expect(doc.headings.map((heading) => heading.id)).toEqual(['title', 'chapter-one'])
    expect(doc.blocks.some((block) => block.type === 'quote')).toBe(true)
    expect(doc.blocks.some((block) => block.type === 'list')).toBe(true)
  })

  it('renders attached footnote references as linked superscript popovers', () => {
    const doc = parseMarkdown(`
Paragraph with a footnote.2 Another spaced note: 3 Not a bible reference John 17:3.

## Footnotes

2 This is the footnote content.

3 This is another footnote.
`)

    expect(doc.footnotes).toEqual([
      { number: '2', id: 'footnote-2', html: 'This is the footnote content.' },
      { number: '3', id: 'footnote-3', html: 'This is another footnote.' },
    ])
    expect(doc.blocks[0]).toMatchObject({
      type: 'paragraph',
      html: expect.stringContaining('class="footnote-ref"'),
    })
    expect(doc.blocks[0]).toMatchObject({
      html: expect.stringContaining('href="#footnote-2"'),
    })
    expect(doc.blocks[0]).toMatchObject({
      html: expect.stringContaining('href="#footnote-3"'),
    })
    expect(doc.blocks[0]).toMatchObject({
      html: expect.not.stringContaining('John 17:<sup'),
    })
  })

  it('uses unique reference ids and links footnote definitions back to the first reference', () => {
    const doc = parseMarkdown(`
First use.5 Second use.5

## Footnotes

5 Reused footnote.
`)
    const html = doc.blocks.map((block) => ('html' in block ? block.html : '')).join('\n')

    expect(html).toContain('id="fnref-5"')
    expect(html).toContain('id="fnref-5-2"')
    expect(html).toContain('href="#fnref-5"')
    expect(html).toContain('footnote-backlink')
  })

  it('does not create broken backlinks for unreferenced footnote definitions', () => {
    const doc = parseMarkdown(`
Text without reference.

## Footnotes

1 Unreferenced note.
`)
    const html = doc.blocks.map((block) => ('html' in block ? block.html : '')).join('\n')

    expect(html).not.toContain('href="#fnref-1"')
    expect(html).toContain('footnote-definition-number')
  })

  it('reports footnote references that are present in text but missing in footnotes', () => {
    const doc = parseMarkdown(`
This reference is not defined.4

## Footnotes

3 Existing footnote.
`)

    expect(doc.missingFootnotes).toEqual(['4'])
  })

  it('renders scripture references with localized hover text', () => {
    const en = parseMarkdown('John 17:3 is central.', { locale: 'en' })
    const nl = parseMarkdown('Joh. 17:3 is centraal.', { locale: 'nl' })

    expect(en.blocks[0]).toMatchObject({
      html: expect.stringContaining('class="scripture-ref"'),
    })
    expect(en.blocks[0]).toMatchObject({
      html: expect.stringContaining('tabindex="0"'),
    })
    expect(en.blocks[0]).toMatchObject({
      html: expect.stringContaining('class="scripture-ref-label"'),
    })
    expect(en.blocks[0]).toMatchObject({
      html: expect.not.stringContaining('scripture-dots'),
    })
    expect(en.blocks[0]).toMatchObject({
      html: expect.stringContaining('KJV'),
    })
    expect(en.blocks[0]).toMatchObject({
      html: expect.stringContaining('And this is life eternal'),
    })
    expect(nl.blocks[0]).toMatchObject({
      html: expect.stringContaining('SV'),
    })
    expect(nl.blocks[0]).toMatchObject({
      html: expect.stringContaining('En dit is het eeuwige leven'),
    })
  })

  it('does not add scripture hover markers inside visible block quotes', () => {
    const doc = parseMarkdown(`
> “THIS IS ETERNAL LIFE” (John 17:3).
`, { locale: 'en' })

    const quote = doc.blocks.find((block) => block.type === 'quote')

    expect(quote).toMatchObject({
      html: expect.not.stringContaining('scripture-ref'),
    })
  })

  it('has no missing footnote definitions in the real essay content', () => {
    for (const file of ['content/nl/essay.md', 'content/en/essay.md']) {
      const doc = parseMarkdown(readFileSync(file, 'utf8'), { locale: file.includes('/nl/') ? 'nl' : 'en' })

      expect(doc.missingFootnotes, file).toEqual([])
    }
  })
})
