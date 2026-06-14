<script setup lang="ts">
import argument from '~/content/nl/argument.md?raw'
import { parseMarkdown } from '~/utils/markdown'

const document = parseMarkdown(argument, { locale: 'nl' })

useLocalizedSeo({
  locale: 'nl',
  path: '/nl/argument',
  title: 'Het argument in 10 punten — Undivided One',
  description: document.meta.description || 'Tien korte punten die de beweging van de Undivided One essay samenvatten.',
})
</script>

<template>
  <IntroPageRenderer
    :document="document"
    locale="nl"
    eyebrow="10 PUNTEN"
    reading-time-label="min lezen"
    contents-label="Het argument"
    :previous="{ label: 'De vraag', to: '/nl/question' }"
    :next="{ label: 'Lees de volledige essay', to: '/nl/essay', primary: true }"
    pdf-label="Download de volledige essay"
  />
</template>
