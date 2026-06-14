<script setup lang="ts">
import type { MarkdownDocument } from '~/utils/markdown'

const props = defineProps<{
  document: MarkdownDocument
  label: {
    contents: string
    downloadTop: string
    downloadBottom: string
  }
  locale: 'nl' | 'en'
  mode?: 'essay' | 'confession'
}>()

const tocCollapsed = ref(false)
const activeHeadingId = ref('')

const chapterHeadings = computed(() => props.document.headings.filter((item) => item.level === 2))

const isActiveHeading = (id: string) => activeHeadingId.value === id

const confessionDownload = computed(() => props.locale === 'nl'
  ? {
      href: '/downloads/undivided-confession-nl.pdf',
      label: 'Download belijdenis PDF',
    }
  : {
      href: '/downloads/undivided-confession-en.pdf',
      label: 'Download confession PDF',
    })

const scrollHashIntoView = () => {
  const id = window.location.hash.slice(1)
  if (!id) return

  const element = document.getElementById(decodeURIComponent(id))
  if (!element) return

  const offset = element.classList.contains('chapter-heading') || /^H[23]$/.test(element.tagName)
    ? 148
    : 84

  window.scrollTo({
    top: element.getBoundingClientRect().top + window.scrollY - offset,
    behavior: 'auto',
  })
}

onMounted(() => {
  const headings = chapterHeadings.value
  if (!headings.length) return

  activeHeadingId.value = headings[0]?.id ?? ''

  const correctInitialHash = () => requestAnimationFrame(() => requestAnimationFrame(scrollHashIntoView))
  correctInitialHash()
  window.addEventListener('hashchange', correctInitialHash)
  onBeforeUnmount(() => window.removeEventListener('hashchange', correctInitialHash))

  if (!('IntersectionObserver' in window)) return

  const visibleHeadings = new Map<string, number>()
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.id
        if (!id) continue
        if (entry.isIntersecting) {
          visibleHeadings.set(id, entry.boundingClientRect.top)
        } else {
          visibleHeadings.delete(id)
        }
      }

      if (visibleHeadings.size) {
        const nearest = [...visibleHeadings.entries()].sort((a, b) => Math.abs(a[1] - 120) - Math.abs(b[1] - 120))[0]
        activeHeadingId.value = nearest?.[0] ?? activeHeadingId.value
        return
      }

      const passedHeading = headings
        .map((heading) => document.getElementById(heading.id))
        .filter((element): element is HTMLElement => Boolean(element))
        .filter((element) => element.getBoundingClientRect().top <= 140)
        .pop()
      activeHeadingId.value = passedHeading?.id ?? headings[0]?.id ?? ''
    },
    {
      rootMargin: '-18% 0px -62% 0px',
      threshold: [0, 0.2, 0.6, 1],
    },
  )

  for (const heading of headings) {
    const element = document.getElementById(heading.id)
    if (element) observer.observe(element)
  }

  onBeforeUnmount(() => {
    observer.disconnect()
  })
})
</script>

<template>
  <article class="relative isolate px-6 py-12 md:py-20">
    <ReadingAura />
    <FootnoteBehavior />
    <ScriptureBehavior />
    <div
      class="relative z-10 mx-auto grid max-w-6xl gap-12 transition-[grid-template-columns] duration-500 ease-out lg:grid-cols-[var(--toc-column)_minmax(0,820px)]"
      :style="{ '--toc-column': tocCollapsed ? '76px' : '240px' }"
    >
      <aside class="no-print lg:sticky lg:top-28 lg:self-start">
        <details class="border border-ink/10 bg-bone/80 p-4 lg:hidden">
          <summary class="font-display display-title cursor-pointer text-lg">{{ label.contents }}</summary>
          <nav class="mt-4 flex flex-col gap-2 text-sm">
            <a
              v-for="heading in chapterHeadings"
              :key="heading.id"
              :href="`#${heading.id}`"
              class="toc-link"
              :class="isActiveHeading(heading.id) ? 'toc-link-active' : 'text-ink/65'"
            >
              {{ heading.text }}
            </a>
          </nav>
        </details>

        <nav
          class="chapter-orbit toc-collapse-panel hidden border-l border-ink/10 pl-5 text-sm lg:flex lg:flex-col lg:gap-3"
          :class="tocCollapsed ? 'toc-collapsed' : 'toc-expanded'"
          :aria-label="label.contents"
        >
          <div class="mb-2 flex items-center justify-between gap-3">
            <p class="font-display display-title text-lg text-ink" :class="tocCollapsed ? 'sr-only' : ''">{{ label.contents }}</p>
            <button
              type="button"
              class="toc-toggle no-print"
              :aria-label="tocCollapsed ? `${label.contents} openen` : `${label.contents} inklappen`"
              :aria-expanded="!tocCollapsed"
              @click="tocCollapsed = !tocCollapsed"
            >
              <span aria-hidden="true">{{ tocCollapsed ? '+' : '−' }}</span>
            </button>
          </div>
          <div class="toc-links">
            <a
              v-for="(heading, index) in chapterHeadings"
              :key="heading.id"
              :href="`#${heading.id}`"
              class="toc-link"
              :class="[
                isActiveHeading(heading.id) ? 'toc-link-active' : 'text-ink/60',
                tocCollapsed ? 'toc-link-compact' : '',
              ]"
              :aria-label="tocCollapsed ? heading.text : undefined"
            >
              <span class="toc-index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="toc-label">{{ heading.text }}</span>
            </a>
          </div>
        </nav>
      </aside>

      <div class="article-stage">
        <header class="article-hero mb-12 border-b border-ink/10 pb-10">
          <p class="mb-4 text-xs uppercase tracking-[0.22em] text-ember">UNDIVIDED ONE</p>
          <h1 class="font-display display-title section-display text-4xl leading-tight md:text-6xl">{{ document.meta.title }}</h1>
          <p v-if="document.meta.subtitle" class="mt-5 max-w-2xl text-lg leading-8 text-ink/68">{{ document.meta.subtitle }}</p>
          <div class="mt-8">
            <DownloadButtons v-if="mode !== 'confession'" :locale="locale" compact />
            <a
              v-else
              :href="confessionDownload.href"
              download
              class="inline-flex border border-gold bg-gold px-4 py-2 text-sm font-medium text-ink transition hover:bg-transparent"
            >
              {{ confessionDownload.label }}
            </a>
          </div>
        </header>

        <div class="article-body font-serif text-[1.08rem] leading-8 text-ink/86 md:text-[1.16rem]">
          <template v-for="(block, index) in document.blocks" :key="index">
            <h1 v-if="block.type === 'heading' && block.level === 1" :id="block.id" class="font-display display-title section-display mt-12 text-4xl leading-tight text-ink md:text-5xl">
              {{ block.text }}
            </h1>
            <h2 v-else-if="block.type === 'heading' && block.level === 2" :id="block.id" class="chapter-heading font-display display-title section-display mt-16 border-t border-ink/10 pt-10 text-3xl leading-tight text-ink md:text-4xl">
              {{ block.text }}
            </h2>
            <h3 v-else-if="block.type === 'heading' && block.level === 3" :id="block.id" class="mt-10 font-sans text-base font-semibold uppercase tracking-[0.14em] text-ember">
              {{ block.text }}
            </h3>
            <p v-else-if="block.type === 'paragraph'" v-html="block.html" />
            <blockquote v-else-if="block.type === 'quote'" class="quote-plane relative border-l-2 border-gold bg-ink px-6 py-6 pr-20 font-sans text-base leading-7 text-parchment shadow-soft">
              <span v-html="block.html" />
              <CopyButton :text="block.text" class="no-print" />
            </blockquote>
            <ul v-else-if="block.type === 'list'" class="space-y-2">
              <li v-for="item in block.items" :key="item" v-html="item" />
            </ul>
          </template>
        </div>

        <div v-if="mode !== 'confession'" class="no-print mt-16 border-t border-ink/10 pt-8">
          <p class="mb-4 text-sm uppercase tracking-[0.2em] text-ink/50">{{ label.downloadBottom }}</p>
          <DownloadButtons :locale="locale" />
        </div>
        <div v-else class="no-print mt-16 border-t border-ink/10 pt-8">
          <p class="mb-4 text-sm uppercase tracking-[0.2em] text-ink/50">{{ label.downloadBottom }}</p>
          <a
            :href="confessionDownload.href"
            download
            class="inline-flex border border-gold bg-gold px-5 py-3 text-sm font-medium text-ink transition hover:bg-transparent"
          >
            {{ confessionDownload.label }}
          </a>
        </div>
      </div>
    </div>
  </article>
</template>
