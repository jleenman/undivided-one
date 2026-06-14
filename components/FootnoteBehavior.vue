<script setup lang="ts">
function positionFootnote(ref: HTMLElement) {
  const popover = ref.querySelector<HTMLElement>('.footnote-popover')
  if (!popover) return

  const link = ref.querySelector<HTMLElement>('a')
  const anchor = link || ref
  const rect = anchor.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const margin = 16
  const gap = 12
  const preferredWidth = Math.min(380, viewportWidth - margin * 2)

  popover.style.setProperty('--footnote-popover-width', `${preferredWidth}px`)
  popover.style.maxHeight = `${Math.max(140, viewportHeight - margin * 2)}px`

  const spaceBelow = viewportHeight - rect.bottom - margin
  const spaceAbove = rect.top - margin
  const side = spaceBelow >= Math.min(260, popover.scrollHeight + gap) || spaceBelow >= spaceAbove ? 'bottom' : 'top'
  ref.dataset.side = side

  const anchorCenter = rect.left + rect.width / 2
  const halfWidth = preferredWidth / 2
  const clampedCenter = Math.min(Math.max(anchorCenter, margin + halfWidth), viewportWidth - margin - halfWidth)
  const offset = clampedCenter - anchorCenter
  popover.style.setProperty('--footnote-popover-x', `${offset}px`)

  const availableHeight = side === 'bottom' ? spaceBelow - gap : spaceAbove - gap
  popover.style.maxHeight = `${Math.max(140, availableHeight)}px`
}

onMounted(() => {
  const refs = [...document.querySelectorAll<HTMLElement>('.footnote-ref')]
  const reposition = (event: Event) => {
    const ref = event.currentTarget as HTMLElement
    delete ref.dataset.popoverHidden
    positionFootnote(ref)
  }
  const positionAll = () => {
    for (const ref of refs) positionFootnote(ref)
  }
  const closeButtons = [...document.querySelectorAll<HTMLButtonElement>('.footnote-popover-close')]
  const closePopover = (event: Event) => {
    event.preventDefault()
    event.stopPropagation()
    const button = event.currentTarget as HTMLElement
    const ref = button.closest<HTMLElement>('.footnote-ref')
    if (!ref) return
    ref.dataset.popoverHidden = 'true'
    button.blur()
  }

  window.requestAnimationFrame(positionAll)

  for (const ref of refs) {
    ref.addEventListener('mouseenter', reposition)
    ref.addEventListener('mouseover', reposition)
    ref.addEventListener('pointerenter', reposition)
    ref.addEventListener('pointerover', reposition)
    ref.addEventListener('focusin', reposition)
    ref.addEventListener('touchstart', reposition, { passive: true })
  }
  for (const button of closeButtons) {
    button.addEventListener('click', closePopover)
  }
  window.addEventListener('resize', positionAll)
  window.addEventListener('scroll', positionAll, { passive: true })

  onBeforeUnmount(() => {
    for (const ref of refs) {
      ref.removeEventListener('mouseenter', reposition)
      ref.removeEventListener('mouseover', reposition)
      ref.removeEventListener('pointerenter', reposition)
      ref.removeEventListener('pointerover', reposition)
      ref.removeEventListener('focusin', reposition)
      ref.removeEventListener('touchstart', reposition)
    }
    for (const button of closeButtons) {
      button.removeEventListener('click', closePopover)
    }
    window.removeEventListener('resize', positionAll)
    window.removeEventListener('scroll', positionAll)
  })
})
</script>

<template>
  <span class="sr-only" aria-hidden="true" />
</template>
