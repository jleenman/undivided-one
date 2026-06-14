<script setup lang="ts">
import essay from '~/content/nl/essay.md?raw'
import { parseMarkdown } from '~/utils/markdown'

const document = parseMarkdown(essay, { locale: 'nl' })

useLocalizedSeo({
  locale: 'nl',
  path: '/nl/essay',
  title: 'Essay — De Ene God die zichtbaar werd',
  description: 'Het volledige Nederlandse essay als leesbare webcontent, met hoofdstukken, anchors, voetnoten en PDF-download.',
})
</script>

<template>
  <ArticleRenderer
    :document="document"
    locale="nl"
    mode="essay"
    :label="{ contents: 'Inhoud', downloadTop: 'Download', downloadBottom: 'PDF downloaden' }"
  />
</template>
