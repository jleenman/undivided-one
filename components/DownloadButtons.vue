<script setup lang="ts">
defineProps<{
  locale?: 'nl' | 'en'
  labelsLocale?: 'nl' | 'en'
  compact?: boolean
}>()
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <a
      v-if="!locale || locale === 'nl'"
      href="/downloads/undivided-essay-nl.pdf"
      download
      class="inline-flex items-center justify-center border border-gold bg-gold px-5 py-3 text-sm font-medium text-ink transition hover:bg-transparent"
      :class="{ 'px-4 py-2': compact }"
    >
      Download Nederlandse PDF
    </a>
    <a
      v-if="!locale || locale === 'en'"
      href="/downloads/undivided-essay-en.pdf"
      download
      class="inline-flex items-center justify-center border border-ink/20 px-5 py-3 text-sm font-medium text-ink transition hover:border-gold hover:text-ember"
      :class="{ 'px-4 py-2': compact }"
    >
      {{ labelsLocale === 'nl' ? 'Download Engelse PDF' : 'Download English PDF' }}
    </a>
  </div>
</template>
