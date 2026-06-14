<script setup lang="ts">
import essay from '~/content/en/essay.md?raw'
import { parseMarkdown } from '~/utils/markdown'

const document = parseMarkdown(essay, { locale: 'en' })

useLocalizedSeo({
  locale: 'en',
  path: '/en/essay',
  title: 'Essay — The One God who became visible',
  description: 'The full English essay as readable web content, with chapters, anchors, footnotes, and PDF download.',
})
</script>

<template>
  <ArticleRenderer
    :document="document"
    locale="en"
    mode="essay"
    :label="{ contents: 'Contents', downloadTop: 'Download', downloadBottom: 'PDF download' }"
  />
</template>
