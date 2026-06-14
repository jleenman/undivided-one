<script setup lang="ts">
import confession from '~/content/en/confession.md?raw'
import { parseMarkdown } from '~/utils/markdown'

const document = parseMarkdown(confession, { locale: 'en' })

useLocalizedSeo({
  locale: 'en',
  path: '/en/confession',
  title: 'Confession — Jesus is Lord',
  description: 'A liturgical confession of the One God made visible in Jesus the Messiah.',
})
</script>

<template>
  <ArticleRenderer
    :document="document"
    locale="en"
    mode="confession"
    :label="{ contents: 'Confession', downloadTop: 'Download', downloadBottom: 'Download' }"
  />
</template>
