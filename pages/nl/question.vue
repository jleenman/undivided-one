<script setup lang="ts">
import question from '~/content/nl/question.md?raw'
import { parseMarkdown } from '~/utils/markdown'

const document = parseMarkdown(question, { locale: 'nl' })

useLocalizedSeo({
  locale: 'nl',
  path: '/nl/question',
  title: 'De vraag — Undivided One',
  description: document.meta.description || 'Een korte introductie op de vraag achter Undivided One.',
})
</script>

<template>
  <IntroPageRenderer
    :document="document"
    locale="nl"
    eyebrow="DE VRAAG"
    reading-time-label="min lezen"
    contents-label="Op deze pagina"
    :previous="{ label: 'Begin hier', to: '/nl/start' }"
    :next="{ label: 'Het argument in 10 punten', to: '/nl/argument' }"
    :secondary="{ label: 'Volledige essay', to: '/nl/essay' }"
    pdf-label="Download de volledige essay"
  />
</template>
