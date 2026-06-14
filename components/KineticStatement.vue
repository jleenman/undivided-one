<script setup lang="ts">
const section = ref<HTMLElement | null>(null)

defineProps<{
  eyebrow: string
  title: string
  body: string
  dark?: boolean
}>()

onMounted(() => {
  const node = section.value
  if (!node) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) return

  let raf = 0
  const updateDepth = () => {
    raf = 0
    const rect = node.getBoundingClientRect()
    const travel = Math.max(1, window.innerHeight + rect.height)
    const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / travel))
    node.style.setProperty('--kinetic-depth', `${(progress - 0.5) * 2}`)
  }
  const requestUpdate = () => {
    if (!raf) raf = window.requestAnimationFrame(updateDepth)
  }

  updateDepth()
  window.addEventListener('scroll', requestUpdate, { passive: true })
  window.addEventListener('resize', requestUpdate)

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', requestUpdate)
    window.removeEventListener('resize', requestUpdate)
    window.cancelAnimationFrame(raf)
  })
})
</script>

<template>
  <ScrollReveal>
    <section
      ref="section"
      class="kinetic-section relative overflow-hidden px-6 py-28 md:py-36"
      :class="dark ? 'bg-ink text-parchment' : 'bg-bone text-ink'"
      :data-header-theme="dark ? 'dark' : 'light'"
      style="--kinetic-depth: 0"
    >
      <div class="absolute inset-0 opacity-40" aria-hidden="true">
        <div class="kinetic-word font-display display-title">{{ title }}</div>
      </div>
      <div class="relative mx-auto grid max-w-6xl gap-10 md:grid-cols-[.85fr_1.15fr] md:items-end">
        <div>
          <p class="mb-6 text-xs uppercase tracking-[0.26em]" :class="dark ? 'text-gold' : 'text-ember'">{{ eyebrow }}</p>
          <h2 class="font-display display-title section-display text-5xl leading-[0.95] md:text-8xl">{{ title }}</h2>
        </div>
        <p class="max-w-2xl text-lg leading-8" :class="dark ? 'text-parchment/72' : 'text-ink/70'">{{ body }}</p>
      </div>
    </section>
  </ScrollReveal>
</template>

<style scoped>
.kinetic-section {
  perspective: 1100px;
}

.kinetic-word {
  transform:
    perspective(1100px)
    translate3d(calc(var(--kinetic-depth) * -2.5rem), 0, calc(var(--kinetic-depth) * 90px))
    rotateX(calc(var(--kinetic-depth) * -7deg))
    rotateY(calc(var(--kinetic-depth) * 4deg));
  transform-origin: 50% 50%;
  transition: transform 120ms linear;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .kinetic-word {
    transform: none;
    transition: none;
  }
}
</style>
