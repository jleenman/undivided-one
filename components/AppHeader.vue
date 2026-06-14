<script setup lang="ts">
const route = useRoute()

const initialHeaderTheme = (path: string): 'light' | 'dark' => {
  const normalizedPath = path.replace(/\/$/, '') || '/'
  return ['/', '/nl', '/en'].includes(normalizedPath) ? 'dark' : 'light'
}

const activeTheme = ref<'light' | 'dark'>(initialHeaderTheme(route.path))

const currentLocale = computed(() => (route.path.startsWith('/nl') ? 'nl' : route.path.startsWith('/en') ? 'en' : 'root'))
const isDark = computed(() => activeTheme.value === 'dark')

const alternatePath = computed(() => {
  if (route.path.startsWith('/nl')) return route.path.replace(/^\/nl/, '/en')
  if (route.path.startsWith('/en')) return route.path.replace(/^\/en/, '/nl')
  return '/nl'
})

const updateHeaderTheme = () => {
  if (!import.meta.client) return

  const header = document.querySelector('header')
  const probeY = header ? header.getBoundingClientRect().bottom + 8 : 72
  const themedSections = Array.from(document.querySelectorAll<HTMLElement>('[data-header-theme]'))
  const currentSection = themedSections.find((section) => {
    const rect = section.getBoundingClientRect()
    return rect.top <= probeY && rect.bottom >= probeY
  })
  const theme = currentSection?.dataset.headerTheme
  activeTheme.value = theme === 'dark' || theme === 'light' ? theme : initialHeaderTheme(route.path)
}

onMounted(() => {
  let raf = 0
  const requestUpdate = () => {
    if (raf) return
    raf = window.requestAnimationFrame(() => {
      raf = 0
      updateHeaderTheme()
    })
  }

  updateHeaderTheme()
  window.addEventListener('scroll', requestUpdate, { passive: true })
  window.addEventListener('resize', requestUpdate)

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', requestUpdate)
    window.removeEventListener('resize', requestUpdate)
    window.cancelAnimationFrame(raf)
  })
})

watch(() => route.fullPath, () => {
  if (!import.meta.client) return
  activeTheme.value = initialHeaderTheme(route.path)
  window.requestAnimationFrame(updateHeaderTheme)
})
</script>

<template>
  <header
    class="no-print sticky top-0 z-40 border-b px-6 py-4 backdrop-blur-xl transition-colors duration-500"
    :class="isDark
      ? 'header-dark border-parchment/10 bg-ink/18 text-parchment'
      : 'header-light border-ink/10 bg-bone/85 text-ink'"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-4">
      <NuxtLink to="/" class="group flex items-center gap-3" aria-label="UNDIVIDED ONE home">
        <span
          class="grid h-8 w-8 place-items-center border border-gold/70 text-gold transition group-hover:bg-gold group-hover:text-ink"
          :class="isDark ? 'bg-ink/20' : ''"
        >1</span>
        <span class="display-title font-display text-lg uppercase">UNDIVIDED ONE</span>
      </NuxtLink>

      <nav class="flex items-center gap-2 text-sm">
        <NuxtLink
          v-if="currentLocale !== 'root'"
          :to="currentLocale === 'nl' ? '/nl/start' : '/en/start'"
          class="hidden px-3 py-2 transition sm:inline-flex"
          :class="isDark ? 'text-parchment/70 hover:text-parchment' : 'text-ink/70 hover:text-ink'"
        >
          {{ currentLocale === 'nl' ? 'Begin hier' : 'Start Here' }}
        </NuxtLink>
        <NuxtLink
          v-if="currentLocale !== 'root'"
          :to="currentLocale === 'nl' ? '/nl/essay' : '/en/essay'"
          class="hidden px-3 py-2 transition sm:inline-flex"
          :class="isDark ? 'text-parchment/70 hover:text-parchment' : 'text-ink/70 hover:text-ink'"
        >
          Essay
        </NuxtLink>
        <NuxtLink
          v-if="currentLocale !== 'root'"
          :to="currentLocale === 'nl' ? '/nl/confession' : '/en/confession'"
          class="hidden px-3 py-2 transition sm:inline-flex"
          :class="isDark ? 'text-parchment/70 hover:text-parchment' : 'text-ink/70 hover:text-ink'"
        >
          {{ currentLocale === 'nl' ? 'Belijdenis' : 'Confession' }}
        </NuxtLink>
        <NuxtLink
          :to="alternatePath"
          class="border px-3 py-2 transition hover:border-gold"
          :class="isDark ? 'border-parchment/20 text-parchment hover:text-gold' : 'border-ink/15 text-ink hover:text-ember'"
        >
          {{ currentLocale === 'nl' ? 'English' : 'Nederlands' }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
