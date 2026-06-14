<script setup lang="ts">
import start from '~/content/nl/start.md?raw'
import { parseMarkdown } from '~/utils/markdown'

const document = parseMarkdown(start, { locale: 'nl' })

useLocalizedSeo({
  locale: 'nl',
  path: '/nl/start',
  title: 'Begin hier — Undivided One',
  description: document.meta.description || 'Begin hier om de vraag achter Undivided One te begrijpen voordat je de volledige essay leest.',
})
</script>

<template>
  <IntroPageRenderer
    :document="document"
    locale="nl"
    eyebrow="UNDIVIDED ONE"
    reading-time-label="min lezen"
    contents-label="Begin hier"
    :next="{ label: 'De vraag', to: '/nl/question' }"
    :secondary="{ label: 'Het argument in 10 punten', to: '/nl/argument' }"
    pdf-label="Download de volledige essay"
  />
</template>
