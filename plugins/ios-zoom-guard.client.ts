export default defineNuxtPlugin(() => {
  let lastTouchEnd = 0

  const preventZoom = (event: Event) => {
    event.preventDefault()
  }

  const preventDoubleTapZoom = (event: TouchEvent) => {
    const now = Date.now()
    if (now - lastTouchEnd <= 320) {
      event.preventDefault()
    }
    lastTouchEnd = now
  }

  document.addEventListener('gesturestart', preventZoom, { passive: false })
  document.addEventListener('gesturechange', preventZoom, { passive: false })
  document.addEventListener('gestureend', preventZoom, { passive: false })
  document.addEventListener('touchend', preventDoubleTapZoom, { passive: false })
})
