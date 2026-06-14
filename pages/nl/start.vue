<script setup lang="ts">
import start from '~/content/nl/start.md?raw'
import { parseMarkdown } from '~/utils/markdown'

const document = parseMarkdown(start, { locale: 'nl' })

useLocalizedSeo({
  locale: 'nl',
  path: '/nl/start',
  title: 'De vraag — Undivided One',
  description: document.meta.description || 'Een korte introductie op de vraag achter Undivided One.',
})
</script>

<template>
  <IntroPageRenderer
    :document="document"
    locale="nl"
    eyebrow="UNDIVIDED ONE"
    reading-time-label="min lezen"
    contents-label="De vraag"
    :previous="{ label: 'Nederlandse home', to: '/nl' }"
    :next="{ label: 'Het argument in 10 punten', to: '/nl/argument', primary: true }"
    pdf-label="Download de volledige essay"
  />
</template>
