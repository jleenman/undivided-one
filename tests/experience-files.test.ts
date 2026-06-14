import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('visual experience implementation', () => {
  it('uses a dedicated interactive light chamber on the landing page', () => {
    const landing = readFileSync('components/LandingExperience.vue', 'utf8')

    expect(landing).toContain('<LightChamber')
    expect(landing).toContain('<KineticStatement')
  })

  it('renders the homepage chamber as a scroll-driven WebGL star map', () => {
    const chamber = readFileSync('components/LightChamber.vue', 'utf8')

    expect(chamber).toContain('webgl')
    expect(chamber).toContain('uScroll')
    expect(chamber).toContain('starVertices')
    expect(chamber).toContain('<GrowthLines')
    expect(chamber).toContain('variant="hero"')
    expect(chamber).toContain('data-engine="webgl-star-map"')
  })

  it('makes the WebGL chamber dense and cinematic rather than subtle', () => {
    const chamber = readFileSync('components/LightChamber.vue', 'utf8')
    const growthLines = readFileSync('components/GrowthLines.vue', 'utf8')

    expect(chamber).toContain('STAR_COUNT = 18000')
    expect(chamber).toContain('uReveal')
    expect(chamber).toContain('STAR_CLUSTER_COUNT = 16')
    expect(chamber).toContain('nebulaFragmentShader')
    expect(chamber).toContain('gl.drawArrays(gl.TRIANGLES')
    expect(growthLines).toContain('data-engine="svg-growth-fractals"')
    expect(growthLines).toContain('pathLength="1"')
  })

  it('uses continuous vector growth paths instead of loose WebGL line fragments', () => {
    const chamber = readFileSync('components/LightChamber.vue', 'utf8')
    const growthLines = readFileSync('components/GrowthLines.vue', 'utf8')

    expect(chamber).not.toContain('lineDrawCount')
    expect(chamber).not.toContain('gl.drawArrays(gl.LINES')
    expect(growthLines).toContain('growthPathSets')
    expect(growthLines).toContain('pathOffset(path)')
    expect(chamber).not.toContain('atan(p.y, p.x)')
    expect(chamber).not.toContain('uScroll * 1.72')
    expect(chamber).not.toContain('uScroll * 0.68')
    expect(chamber).not.toContain('uScroll * 0.18')
    expect(chamber).not.toContain('for (let i = 0; i < 148')
  })

  it('keeps the kinetic statement text and adds scroll depth only', () => {
    const statement = readFileSync('components/KineticStatement.vue', 'utf8')

    expect(statement).toContain('kinetic-word')
    expect(statement).toContain('--kinetic-depth')
    expect(statement).toContain('perspective(')
  })

  it('uses a dedicated modern display treatment for major titles', () => {
    const tailwind = readFileSync('tailwind.config.ts', 'utf8')
    const css = readFileSync('assets/css/main.css', 'utf8')
    const chamber = readFileSync('components/LightChamber.vue', 'utf8')
    const article = readFileSync('components/ArticleRenderer.vue', 'utf8')
    const landing = readFileSync('components/LandingExperience.vue', 'utf8')

    expect(tailwind).toContain('display:')
    expect(css).toContain('.display-title')
    expect(css).toContain('font-variation-settings')
    expect(chamber).toContain('font-display display-title')
    expect(article).toContain('font-display display-title')
    expect(landing).toContain('font-display display-title')
  })

  it('uses the full Undivided One brand in visible chrome', () => {
    const header = readFileSync('components/AppHeader.vue', 'utf8')
    const layout = readFileSync('layouts/default.vue', 'utf8')
    const chamber = readFileSync('components/LightChamber.vue', 'utf8')

    expect(header).toContain('UNDIVIDED ONE')
    expect(layout).toContain('UNDIVIDED ONE')
    expect(chamber).toContain('UNDIVIDED ONE')
  })

  it('lets the header adapt to dark and light landing sections', () => {
    const header = readFileSync('components/AppHeader.vue', 'utf8')
    const chamber = readFileSync('components/LightChamber.vue', 'utf8')
    const statement = readFileSync('components/KineticStatement.vue', 'utf8')
    const landing = readFileSync('components/LandingExperience.vue', 'utf8')

    expect(header).toContain('activeTheme')
    expect(header).toContain('data-header-theme')
    expect(header).toContain('header-dark')
    expect(chamber).toContain('data-header-theme="dark"')
    expect(statement).toContain(':data-header-theme')
    expect(landing).toContain('data-header-theme="dark"')
  })

  it('initializes the header as dark on landing routes before scroll detection runs', () => {
    const header = readFileSync('components/AppHeader.vue', 'utf8')

    expect(header).toContain('initialHeaderTheme')
    expect(header).toContain("['/', '/nl', '/en']")
    expect(header).not.toContain("ref<'light' | 'dark'>('light')")
  })

  it('extends the dark hero behind the transparent header', () => {
    const chamber = readFileSync('components/LightChamber.vue', 'utf8')

    expect(chamber).toContain('-mt-[72px]')
    expect(chamber).toContain('pt-[72px]')
    expect(chamber).toContain('min-h-screen')
  })

  it('localizes the Dutch homepage copy beyond the Undivided One brand name', () => {
    const chamber = readFileSync('components/LightChamber.vue', 'utf8')
    const landing = readFileSync('components/LandingExperience.vue', 'utf8')
    const downloads = readFileSync('components/DownloadButtons.vue', 'utf8')

    expect(chamber).toContain("props.locale === 'nl'")
    expect(chamber).toContain('De Ene God')
    expect(chamber).toContain('Zichtbaar geworden')
    expect(chamber).toContain('Lees in het Engels')
    expect(chamber).toContain('Begin hier')

    expect(landing).toContain("locale === 'nl' ? 'Geen systeem'")
    expect(landing).toContain("locale === 'nl' ? 'Kennen'")
    expect(landing).toContain("locale === 'nl' ? 'Openbaring'")
    expect(landing).toContain("locale === 'nl' ? 'Zichtbaar'")
    expect(landing).toContain("locale === 'nl' ? 'Gezien / ongezien'")
    expect(landing).toContain('Ene Naam. Ene troon. Ene God.')
    expect(landing).toContain("locale === 'nl' ? 'Begin met de vraag.'")
    expect(landing).toContain(':labels-locale="locale"')
    expect(downloads).toContain('Download Engelse PDF')
  })

  it('adds a spatial reading layer to essay and confession pages', () => {
    const article = readFileSync('components/ArticleRenderer.vue', 'utf8')
    const aura = readFileSync('components/ReadingAura.vue', 'utf8')
    const growthLines = readFileSync('components/GrowthLines.vue', 'utf8')
    const css = readFileSync('assets/css/main.css', 'utf8')

    expect(article).toContain('<ReadingAura')
    expect(article).toContain('chapter-orbit')
    expect(aura).toContain('<GrowthLines')
    expect(aura).toContain('variant="reading"')
    expect(aura).not.toContain('<CanvasReadingLines')
    expect(aura).not.toContain('reading-grid')
    expect(growthLines).toContain('reading-spine-1')
    expect(growthLines).toContain('reading-branch-1')
    expect(growthLines).toContain("props.fixed || props.variant === 'reading'")
    expect(growthLines).toContain("props.variant === 'reading' ? 0")
    expect(growthLines).toContain('pathGlowOpacity')
    expect(growthLines).toContain('--growth-opacity: 0.34')
    expect(css).not.toContain('.article-hero::after')
    expect(css).not.toContain('.chapter-heading::before')
  })

  it('reuses scroll-growing line animation beyond the homepage hero', () => {
    const landing = readFileSync('components/LandingExperience.vue', 'utf8')
    const growthLines = readFileSync('components/GrowthLines.vue', 'utf8')

    expect(landing).toContain('variant="throne"')
    expect(landing).toContain('variant="cta"')
    expect(landing).not.toContain('h-[42rem] w-[42rem] rounded-full')
    expect(growthLines).toContain('--growth-drift')
    expect(growthLines).not.toContain('direction.value')
    expect(growthLines).not.toContain('* direction')
    expect(growthLines).toContain("variant?: GrowthVariant")
  })

  it('serves the confession introduction and bilingual PDF downloads', () => {
    const nlConfession = readFileSync('content/nl/confession.md', 'utf8')
    const enConfession = readFileSync('content/en/confession.md', 'utf8')
    const article = readFileSync('components/ArticleRenderer.vue', 'utf8')

    expect(nlConfession).toContain('# Inleiding en gebruik')
    expect(enConfession).toContain('# Introduction and use')
    expect(article).toContain('/downloads/undivided-confession-nl.pdf')
    expect(article).toContain('/downloads/undivided-confession-en.pdf')
    expect(article).toContain('Download confession PDF')
  })

  it('adds a simple visitor journey before the full essay', () => {
    const config = readFileSync('nuxt.config.ts', 'utf8')
    const header = readFileSync('components/AppHeader.vue', 'utf8')
    const chamber = readFileSync('components/LightChamber.vue', 'utf8')
    const landing = readFileSync('components/LandingExperience.vue', 'utf8')
    const introRenderer = readFileSync('components/IntroPageRenderer.vue', 'utf8')

    for (const route of ['/nl/start', '/en/start', '/nl/question', '/en/question', '/nl/argument', '/en/argument']) {
      expect(config).toContain(`'${route}'`)
    }

    expect(header).toContain('/en/start')
    expect(header).toContain('/nl/start')
    expect(chamber).toContain('/en/start')
    expect(chamber).toContain('/nl/start')
    expect(landing).toContain('/en/start')
    expect(landing).toContain('/nl/start')
    expect(introRenderer).toContain('readingTime')
    expect(introRenderer).toContain('previous')
    expect(introRenderer).toContain('next')
    expect(introRenderer).toContain('DownloadButtons')
  })

  it('keeps introductory content separate from the approved essay', () => {
    for (const file of [
      'content/en/start.md',
      'content/en/question.md',
      'content/en/argument.md',
      'content/nl/start.md',
      'content/nl/question.md',
      'content/nl/argument.md',
    ]) {
      const source = readFileSync(file, 'utf8')

      expect(source).toContain('title:')
      expect(source).toContain('description:')
      expect(source.length).toBeGreaterThan(1000)
    }
  })

  it('makes the article table of contents active and collapsible', () => {
    const article = readFileSync('components/ArticleRenderer.vue', 'utf8')
    const intro = readFileSync('components/IntroPageRenderer.vue', 'utf8')
    const css = readFileSync('assets/css/main.css', 'utf8')

    expect(article).toContain('activeHeadingId')
    expect(article).toContain('IntersectionObserver')
    expect(article).toContain('tocCollapsed')
    expect(article).toContain('toc-link-active')
    expect(article).toContain('toc-collapsed')
    expect(article).toContain('mobile-toc-link')
    expect(intro).toContain('mobile-toc-link')
    expect(css).toContain('.toc-link-active')
    expect(css).toContain('.toc-collapse-panel')
    expect(css).toContain('.mobile-toc-link')
    expect(css).toContain('overflow-wrap: anywhere')
    expect(css).toContain('data-popover-hidden')
  })

  it('keeps mobile popovers dismissible and inside the viewport', () => {
    const footnoteBehavior = readFileSync('components/FootnoteBehavior.vue', 'utf8')
    const scriptureBehavior = readFileSync('components/ScriptureBehavior.vue', 'utf8')
    const css = readFileSync('assets/css/main.css', 'utf8')

    expect(footnoteBehavior).toContain('event.target as HTMLElement')
    expect(footnoteBehavior).toContain('closest(\'[data-popover-close]\')')
    expect(footnoteBehavior).toContain('button.addEventListener(\'pointerdown\', closePopover)')
    expect(scriptureBehavior).toContain('button.addEventListener(\'pointerdown\', closePopover)')
    expect(css).toContain('.footnote-popover,')
    expect(css).toContain('position: fixed;')
    expect(css).toContain('pointer-events: auto')
    expect(css.indexOf('.footnote-ref:hover .footnote-popover')).toBeLessThan(
      css.indexOf('.footnote-ref[data-popover-hidden="true"] .footnote-popover'),
    )
    expect(css.indexOf('.scripture-ref:hover .scripture-popover')).toBeLessThan(
      css.indexOf('.scripture-ref[data-popover-hidden="true"] .scripture-popover'),
    )
    expect(css.indexOf('.footnote-popover {')).toBeLessThan(
      css.lastIndexOf('.footnote-popover,\n  .footnote-ref[data-side="top"] .footnote-popover'),
    )
    expect(css.indexOf('.scripture-popover {')).toBeLessThan(
      css.lastIndexOf('.scripture-popover,\n  .scripture-ref[data-side="top"] .scripture-popover'),
    )
  })

  it('prevents iOS viewport zoom and page-level horizontal overflow', () => {
    const nuxtConfig = readFileSync('nuxt.config.ts', 'utf8')
    const css = readFileSync('assets/css/main.css', 'utf8')
    const plugin = readFileSync('plugins/ios-zoom-guard.client.ts', 'utf8')

    expect(nuxtConfig).toContain('width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no')
    expect(nuxtConfig).toContain('viewport-fit=cover')
    expect(css).toContain('html,')
    expect(css).toContain('overflow-x: clip')
    expect(css).toContain('overscroll-behavior-x: none')
    expect(css).toContain('touch-action: pan-y')
    expect(css).toContain('touch-action: manipulation')
    expect(plugin).toContain("addEventListener('gesturestart'")
    expect(plugin).toContain("addEventListener('gesturechange'")
    expect(plugin).toContain('lastTouchEnd')
    expect(plugin).toContain('event.preventDefault()')
  })

  it('keeps hash-linked content clear of the sticky header', () => {
    const css = readFileSync('assets/css/main.css', 'utf8')
    const article = readFileSync('components/ArticleRenderer.vue', 'utf8')

    expect(css).toContain('--anchor-offset: 5.25rem')
    expect(css).toContain('--chapter-anchor-offset: 9.25rem')
    expect(css).toContain('--footnote-anchor-offset: 0rem')
    expect(css).toContain('scroll-padding-top: var(--anchor-offset)')
    expect(css).toContain('scroll-margin-top: var(--chapter-anchor-offset)')
    expect(css).toContain('scroll-margin-top: var(--footnote-anchor-offset)')
    expect(article).toContain('scrollHashIntoView')
    expect(article).toContain("element.classList.contains('chapter-heading')")
    expect(css).not.toContain('scroll-margin-top: 7rem')
    expect(css).not.toContain('top: -6rem')
  })
})
