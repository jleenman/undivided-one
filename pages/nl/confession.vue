<script setup lang="ts">
import confession from '~/content/nl/confession.md?raw'
import { parseMarkdown } from '~/utils/markdown'

const document = parseMarkdown(confession, { locale: 'nl' })

useLocalizedSeo({
  locale: 'nl',
  path: '/nl/confession',
  title: 'Belijdenis — Jezus is Heer',
  description: 'Een liturgische belijdenis van de Ene God die zichtbaar werd in Jezus de Messias.',
})
</script>

<template>
  <ArticleRenderer
    :document="document"
    locale="nl"
    mode="confession"
    :label="{ contents: 'Belijdenis', downloadTop: 'Download', downloadBottom: 'Download' }"
  />
</template>
