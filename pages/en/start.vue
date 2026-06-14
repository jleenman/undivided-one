<script setup lang="ts">
import start from '~/content/en/start.md?raw'
import { parseMarkdown } from '~/utils/markdown'

const document = parseMarkdown(start, { locale: 'en' })

useLocalizedSeo({
  locale: 'en',
  path: '/en/start',
  title: 'Start Here — Undivided One',
  description: document.meta.description || 'Begin here to understand the question behind Undivided One before reading the full essay.',
})
</script>

<template>
  <IntroPageRenderer
    :document="document"
    locale="en"
    eyebrow="UNDIVIDED ONE"
    reading-time-label="min read"
    contents-label="Start here"
    :previous="{ label: 'English home', to: '/en' }"
    :next="{ label: 'The Question', to: '/en/question', primary: true }"
    pdf-label="Download the full essay"
  />
</template>
