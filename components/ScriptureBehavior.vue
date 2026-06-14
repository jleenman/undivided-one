<script setup lang="ts">
function positionScripture(ref: HTMLElement) {
  const popover = ref.querySelector<HTMLElement>('.scripture-popover')
  if (!popover) return

  const label = ref.querySelector<HTMLElement>('.scripture-ref-label')
  const anchor = label || ref
  const rect = anchor.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const margin = 16
  const gap = 12
  const preferredWidth = Math.min(448, viewportWidth - margin * 2)

  popover.style.setProperty('--scripture-popover-width', `${preferredWidth}px`)
  popover.style.maxHeight = `${Math.max(140, viewportHeight - margin * 2)}px`

  const spaceBelow = viewportHeight - rect.bottom - margin
  const spaceAbove = rect.top - margin
  const side = spaceBelow >= Math.min(300, popover.scrollHeight + gap) || spaceBelow >= spaceAbove ? 'bottom' : 'top'
  ref.dataset.side = side

  const anchorCenter = rect.left + rect.width / 2
  const halfWidth = preferredWidth / 2
  const clampedCenter = Math.min(Math.max(anchorCenter, margin + halfWidth), viewportWidth - margin - halfWidth)
  const arrowOffset = anchorCenter - clampedCenter
  popover.style.setProperty('--scripture-popover-left', `${clampedCenter}px`)
  popover.style.setProperty('--scripture-popover-arrow', `${arrowOffset}px`)

  const availableHeight = side === 'bottom' ? spaceBelow - gap : spaceAbove - gap
  const maxHeight = Math.max(140, availableHeight)
  popover.style.maxHeight = `${maxHeight}px`
  const measuredHeight = Math.min(maxHeight, Math.max(140, popover.scrollHeight))
  const top = side === 'bottom'
    ? Math.min(viewportHeight - margin - measuredHeight, rect.bottom + gap)
    : Math.max(margin, rect.top - gap - measuredHeight)
  popover.style.setProperty('--scripture-popover-top', `${top}px`)
}

onMounted(() => {
  const refs = [...document.querySelectorAll<HTMLElement>('.scripture-ref')]
  const reposition = (event: Event) => positionScripture(event.currentTarget as HTMLElement)
  const positionActive = () => {
    for (const ref of refs) {
      if (ref.matches(':hover, :focus-within')) positionScripture(ref)
    }
  }
  const schedulePositionAll = () => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(positionActive))
  }

  for (const ref of refs) {
    ref.addEventListener('mouseenter', reposition)
    ref.addEventListener('mouseover', reposition)
    ref.addEventListener('pointerenter', reposition)
    ref.addEventListener('pointerover', reposition)
    ref.addEventListener('focusin', reposition)
    ref.addEventListener('touchstart', reposition, { passive: true })
  }
  window.addEventListener('resize', schedulePositionAll)
  window.addEventListener('orientationchange', schedulePositionAll)
  window.addEventListener('scroll', positionActive, { passive: true })

  onBeforeUnmount(() => {
    for (const ref of refs) {
      ref.removeEventListener('mouseenter', reposition)
      ref.removeEventListener('mouseover', reposition)
      ref.removeEventListener('pointerenter', reposition)
      ref.removeEventListener('pointerover', reposition)
      ref.removeEventListener('focusin', reposition)
      ref.removeEventListener('touchstart', reposition)
    }
    window.removeEventListener('resize', schedulePositionAll)
    window.removeEventListener('orientationchange', schedulePositionAll)
    window.removeEventListener('scroll', positionActive)
  })
})
</script>

<template>
  <span class="sr-only" aria-hidden="true" />
</template>
