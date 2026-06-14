<script setup lang="ts">
import argument from '~/content/en/argument.md?raw'
import { parseMarkdown } from '~/utils/markdown'

const document = parseMarkdown(argument, { locale: 'en' })

useLocalizedSeo({
  locale: 'en',
  path: '/en/argument',
  title: 'The Argument in 10 Points — Undivided One',
  description: document.meta.description || 'Ten short points summarizing the movement of the Undivided One essay.',
})
</script>

<template>
  <IntroPageRenderer
    :document="document"
    locale="en"
    eyebrow="10 POINTS"
    reading-time-label="min read"
    contents-label="The argument"
    :previous="{ label: 'The Question', to: '/en/question' }"
    :next="{ label: 'Read the Full Essay', to: '/en/essay', primary: true }"
    pdf-label="Download the full essay"
  />
</template>
