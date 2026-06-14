<script setup lang="ts">
import question from '~/content/en/question.md?raw'
import { parseMarkdown } from '~/utils/markdown'

const document = parseMarkdown(question, { locale: 'en' })

useLocalizedSeo({
  locale: 'en',
  path: '/en/question',
  title: 'The Question — Undivided One',
  description: document.meta.description || 'A short introduction to the question behind Undivided One.',
})
</script>

<template>
  <IntroPageRenderer
    :document="document"
    locale="en"
    eyebrow="THE QUESTION"
    reading-time-label="min read"
    contents-label="On this page"
    :previous="{ label: 'Start Here', to: '/en/start' }"
    :next="{ label: 'The Argument in 10 Points', to: '/en/argument' }"
    :secondary="{ label: 'Full Essay', to: '/en/essay' }"
    pdf-label="Download the full essay"
  />
</template>
