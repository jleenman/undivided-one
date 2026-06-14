<script setup lang="ts">
const props = defineProps<{ text: string }>()
const copied = ref(false)

async function copyText() {
  if (!navigator?.clipboard) return
  await navigator.clipboard.writeText(props.text)
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 1500)
}
</script>

<template>
  <button
    type="button"
    class="absolute right-3 top-3 border border-gold/40 px-2 py-1 text-xs text-gold transition hover:bg-gold hover:text-ink"
    @click="copyText"
  >
    {{ copied ? 'Copied' : 'Copy' }}
  </button>
</template>
