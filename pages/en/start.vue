<script setup lang="ts">
import start from '~/content/en/start.md?raw'
import { parseMarkdown } from '~/utils/markdown'

const document = parseMarkdown(start, { locale: 'en' })

useLocalizedSeo({
  locale: 'en',
  path: '/en/start',
  title: 'The Question — Undivided One',
  description: document.meta.description || 'A short introduction to the question behind Undivided One.',
})
</script>

<template>
  <IntroPageRenderer
    :document="document"
    locale="en"
    eyebrow="UNDIVIDED ONE"
    reading-time-label="min read"
    contents-label="The question"
    :previous="{ label: 'English home', to: '/en' }"
    :next="{ label: 'The Argument in 10 Points', to: '/en/argument', primary: true }"
    pdf-label="Download the full essay"
  />
</template>
