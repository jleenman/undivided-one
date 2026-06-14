<script setup lang="ts">
const el = ref<HTMLElement | null>(null)
const visible = ref(false)

onMounted(() => {
  if (!el.value) return
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    visible.value = true
    return
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      visible.value = true
      observer.disconnect()
    },
    { threshold: 0.18 },
  )
  observer.observe(el.value)
})
</script>

<template>
  <section
    ref="el"
    class="transition duration-700 ease-out"
    :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
  >
    <slot />
  </section>
</template>
