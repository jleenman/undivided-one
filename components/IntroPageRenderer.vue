<script setup lang="ts">
import type { MarkdownDocument } from '~/utils/markdown'

const props = defineProps<{
  document: MarkdownDocument
  locale: 'nl' | 'en'
  eyebrow: string
  readingTimeLabel: string
  contentsLabel: string
  previous?: { label: string; to: string }
  next?: { label: string; to: string; primary?: boolean }
  secondary?: { label: string; to: string }
  pdfLabel: string
}>()

const readingTime = computed(() => {
  const words = props.document.blocks.reduce((total, block) => {
    if (block.type === 'heading') return total + block.text.split(/\s+/).filter(Boolean).length
    if (block.type === 'paragraph' || block.type === 'quote') return total + block.html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
    return total + block.items.join(' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  }, 0)
  return Math.max(1, Math.round(words / 220))
})

const sectionHeadings = computed(() => props.document.headings.filter((heading) => heading.level === 2))
</script>

<template>
  <main>
    <section class="relative isolate -mt-[72px] overflow-hidden bg-ink px-6 pb-20 pt-[144px] text-parchment md:pb-28 md:pt-[168px]" data-header-theme="dark">
      <GrowthLines variant="cta" tone="dark" />
      <div class="relative mx-auto max-w-6xl">
        <p class="mb-5 text-xs uppercase tracking-[0.24em] text-gold">{{ eyebrow }}</p>
        <h1 class="font-display display-title section-display max-w-4xl text-5xl leading-[0.92] md:text-7xl">
          {{ document.meta.title }}
        </h1>
        <p v-if="document.meta.subtitle" class="mt-7 max-w-2xl text-lg leading-8 text-parchment/72">
          {{ document.meta.subtitle }}
        </p>
        <div class="mt-8 flex flex-wrap items-center gap-3 text-sm text-parchment/62">
          <span class="border border-parchment/15 px-3 py-2">{{ readingTime }} {{ readingTimeLabel }}</span>
          <NuxtLink
            v-if="secondary"
            :to="secondary.to"
            class="border border-parchment/15 px-3 py-2 text-parchment transition hover:border-gold hover:text-gold"
          >
            {{ secondary.label }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="relative bg-bone px-6 py-14 md:py-20" data-header-theme="light">
      <div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[220px_minmax(0,760px)]">
        <aside class="no-print lg:sticky lg:top-28 lg:self-start">
          <details class="border border-ink/10 bg-bone/90 p-4 lg:hidden">
            <summary class="font-display display-title cursor-pointer text-lg">{{ contentsLabel }}</summary>
            <nav class="mt-4 flex flex-col gap-2 text-sm">
              <a v-for="heading in sectionHeadings" :key="heading.id" :href="`#${heading.id}`" class="mobile-toc-link text-ink/65">
                {{ heading.text }}
              </a>
            </nav>
          </details>

          <nav class="intro-toc hidden border-l border-ink/10 pl-5 text-sm lg:flex lg:flex-col lg:gap-3" :aria-label="contentsLabel">
            <p class="font-display display-title mb-2 text-lg text-ink">{{ contentsLabel }}</p>
            <a v-for="heading in sectionHeadings" :key="heading.id" :href="`#${heading.id}`" class="intro-toc-link">
              {{ heading.text }}
            </a>
          </nav>
        </aside>

        <article class="intro-article">
          <div class="article-body font-serif text-[1.08rem] leading-8 text-ink/86 md:text-[1.16rem]">
            <template v-for="(block, index) in document.blocks" :key="index">
              <h1 v-if="block.type === 'heading' && block.level === 1" :id="block.id" class="font-display display-title section-display mt-10 text-4xl leading-tight text-ink md:text-5xl">
                {{ block.text }}
              </h1>
              <h2 v-else-if="block.type === 'heading' && block.level === 2" :id="block.id" class="chapter-heading font-display display-title section-display mt-14 border-t border-ink/10 pt-9 text-3xl leading-tight text-ink md:text-4xl">
                {{ block.text }}
              </h2>
              <h3 v-else-if="block.type === 'heading' && block.level === 3" :id="block.id" class="mt-9 font-sans text-base font-semibold uppercase tracking-[0.14em] text-ember">
                {{ block.text }}
              </h3>
              <p v-else-if="block.type === 'paragraph'" v-html="block.html" />
              <blockquote v-else-if="block.type === 'quote'" class="quote-plane relative border-l-2 border-gold bg-ink px-6 py-6 font-sans text-base leading-7 text-parchment shadow-soft">
                <span v-html="block.html" />
              </blockquote>
              <ul v-else-if="block.type === 'list'" class="space-y-2">
                <li v-for="item in block.items" :key="item" v-html="item" />
              </ul>
            </template>
          </div>

          <nav class="no-print mt-16 grid gap-3 border-t border-ink/10 pt-8 sm:grid-cols-2" aria-label="Page navigation">
            <NuxtLink
              v-if="previous"
              :to="previous.to"
              class="intro-nav-link"
            >
              <span class="text-xs uppercase tracking-[0.18em] text-ink/45">{{ locale === 'nl' ? 'Vorige' : 'Previous' }}</span>
              <span>{{ previous.label }}</span>
            </NuxtLink>
            <NuxtLink
              v-if="next"
              :to="next.to"
              class="intro-nav-link"
              :class="next.primary ? 'intro-nav-primary' : ''"
            >
              <span class="text-xs uppercase tracking-[0.18em] text-ink/45">{{ locale === 'nl' ? 'Volgende' : 'Next' }}</span>
              <span>{{ next.label }}</span>
            </NuxtLink>
          </nav>

          <div class="no-print mt-8 border-t border-ink/10 pt-8">
            <p class="mb-4 text-sm uppercase tracking-[0.2em] text-ink/50">{{ pdfLabel }}</p>
            <DownloadButtons :locale="locale" />
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
