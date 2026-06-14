import { renderScriptureReferences, type ScriptureLocale } from './scripture'

export type MarkdownBlock =
  | { type: 'heading'; level: 1 | 2 | 3; text: string; id: string }
  | { type: 'paragraph'; html: string }
  | { type: 'quote'; html: string; text: string }
  | { type: 'list'; items: string[] }

export type MarkdownDocument = {
  meta: Record<string, string>
  blocks: MarkdownBlock[]
  headings: Array<{ id: string; text: string; level: 1 | 2 | 3 }>
  footnotes: Array<{ number: string; id: string; html: string }>
  missingFootnotes: string[]
}

type RenderContext = {
  footnotes: MarkdownDocument['footnotes']
  missingFootnotes: Set<string>
  refCounts: Map<string, number>
  locale: ScriptureLocale
}

export function parseMarkdown(source: string, options: { locale?: ScriptureLocale } = {}): MarkdownDocument {
  const { meta, body } = readFrontmatter(source)
  const footnotes = collectFootnotes(body)
  const context: RenderContext = {
    footnotes,
    missingFootnotes: new Set<string>(),
    refCounts: new Map<string, number>(),
    locale: options.locale ?? 'en',
  }
  const lines = body.split('\n')
  const blocks: MarkdownBlock[] = []
  const headings: MarkdownDocument['headings'] = []
  const usedIds = new Map<string, number>()
  let inFootnotes = false

  let paragraph: string[] = []
  let quote: string[] = []
  let list: string[] = []

  const flushParagraph = () => {
    if (!paragraph.length) return
    blocks.push({ type: 'paragraph', html: renderParagraph(paragraph.join(' '), context, inFootnotes) })
    paragraph = []
  }

  const flushQuote = () => {
    if (!quote.length) return
    const text = quote.join(' ')
    blocks.push({ type: 'quote', html: renderInline(text, context, true, false), text })
    quote = []
  }

  const flushList = () => {
    if (!list.length) return
    blocks.push({ type: 'list', items: list.map((item) => renderInline(item, context)) })
    list = []
  }

  const flushAll = () => {
    flushParagraph()
    flushQuote()
    flushList()
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      flushAll()
      continue
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(trimmed)
    if (heading) {
      flushAll()
      const level = heading[1].length as 1 | 2 | 3
      const text = heading[2].trim()
      const id = uniqueSlug(text, usedIds)
      blocks.push({ type: 'heading', level, text, id })
      headings.push({ id, text, level })
      inFootnotes = /^footnotes$/i.test(text)
      continue
    }

    if (trimmed.startsWith('>')) {
      flushParagraph()
      flushList()
      quote.push(trimmed.replace(/^>\s?/, ''))
      continue
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph()
      flushQuote()
      list.push(trimmed.replace(/^[-*]\s+/, ''))
      continue
    }

    flushQuote()
    flushList()
    paragraph.push(trimmed)
  }

  flushAll()
  return { meta, blocks, headings, footnotes, missingFootnotes: [...context.missingFootnotes].sort((a, b) => Number(a) - Number(b)) }
}

function readFrontmatter(source: string) {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(source)
  if (!match) return { meta: {}, body: source }

  const meta: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const index = line.indexOf(':')
    if (index < 0) continue
    const key = line.slice(0, index).trim()
    const value = line.slice(index + 1).trim().replace(/^"|"$/g, '')
    meta[key] = value
  }

  return { meta, body: source.slice(match[0].length) }
}

function renderParagraph(
  value: string,
  context: RenderContext,
  inFootnotes: boolean,
) {
  const definition = /^(\d{1,2})\s+(.+)$/.exec(value.trim())
  if (inFootnotes && definition) {
    const [, number, content] = definition
    const marker = context.refCounts.has(number)
      ? `<a class="footnote-definition-number footnote-backlink" href="#fnref-${number}" aria-label="Back to footnote ${number} reference">${number}</a>`
      : `<span class="footnote-definition-number">${number}</span>`
    return `<span id="footnote-${number}" class="footnote-target"></span>${marker} ${renderInline(content, context, false, true)}`
  }

  return renderInline(value, context)
}

function renderInline(value: string, context: RenderContext, linkFootnotes = true, linkScriptures = true) {
  let rendered = escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')

  if (!linkFootnotes) return linkScriptures ? renderScriptureReferences(rendered, context.locale) : rendered

  rendered = rendered.replace(/([.,;:!?)]|”|&quot;)\s*(\d{1,2})(?=\s|$)/g, (match, punctuation: string, number: string, offset: number) => {
    const previous = rendered[offset - 1]
    if (punctuation === ':' && /\d/.test(previous || '')) return match
    const footnote = context.footnotes.find((item) => item.number === number)
    if (!footnote) {
      context.missingFootnotes.add(number)
      return match
    }

    const count = (context.refCounts.get(number) || 0) + 1
    context.refCounts.set(number, count)
    const refId = count === 1 ? `fnref-${number}` : `fnref-${number}-${count}`
    const popoverId = count === 1 ? `footnote-popover-${number}` : `footnote-popover-${number}-${count}`

    return `${punctuation}<sup class="footnote-ref" id="${refId}"><a href="#${footnote.id}" aria-describedby="${popoverId}">${number}</a><span id="${popoverId}" class="footnote-popover" role="tooltip"><button type="button" class="popover-close footnote-popover-close" data-popover-close aria-label="Close footnote">&times;</button>${footnote.html}</span></sup>`
  })

  return linkScriptures ? renderScriptureReferences(rendered, context.locale) : rendered
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function uniqueSlug(value: string, usedIds: Map<string, number>) {
  const base =
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'section'
  const count = usedIds.get(base) || 0
  usedIds.set(base, count + 1)
  return count ? `${base}-${count + 1}` : base
}

function collectFootnotes(body: string): MarkdownDocument['footnotes'] {
  const match = /^##\s+Footnotes\s*$/im.exec(body)
  if (!match) return []

  const footnoteBody = body.slice(match.index + match[0].length)
  const paragraphs = footnoteBody
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean)

  const footnotes: MarkdownDocument['footnotes'] = []
  let current: { number: string; id: string; parts: string[] } | undefined

  for (const paragraph of paragraphs) {
    const start = /^(\d{1,2})\s+(.+)$/.exec(paragraph)
    if (start) {
      if (current) {
        footnotes.push({
          number: current.number,
          id: current.id,
          html: current.parts.map(renderFootnoteContent).join('<br><br>'),
        })
      }
      current = { number: start[1], id: `footnote-${start[1]}`, parts: [start[2]] }
    } else if (current) {
      current.parts.push(paragraph)
    }
  }

  if (current) {
    footnotes.push({
      number: current.number,
      id: current.id,
      html: current.parts.map(renderFootnoteContent).join('<br><br>'),
    })
  }

  return footnotes
}

function renderFootnoteContent(part: string) {
  return escapeHtml(part)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
}
