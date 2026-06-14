<script setup lang="ts">
type GrowthVariant = 'hero' | 'throne' | 'reading' | 'cta'
type GrowthTone = 'dark' | 'light'

const props = withDefaults(defineProps<{
  variant?: GrowthVariant
  tone?: GrowthTone
  fixed?: boolean
}>(), {
  variant: 'hero',
  tone: 'dark',
  fixed: false,
})

type GrowthPath = {
  id: string
  d: string
  delay: number
  speed: number
  width: number
  opacity: number
}

const root = ref<HTMLElement | null>(null)
const progress = ref(0.22)
const drift = ref(0)

const growthPathSets: Record<GrowthVariant, GrowthPath[]> = {
  hero: [
    { id: 'spine-1', d: 'M -120 190 C 20 110 115 38 235 -42 C 335 -110 455 -170 610 -230', delay: 0, speed: 1.45, width: 1.2, opacity: 0.58 },
    { id: 'spine-2', d: 'M 20 245 C 135 160 238 118 350 105 C 465 90 560 35 640 -62', delay: 0.08, speed: 1.36, width: 0.95, opacity: 0.42 },
    { id: 'spine-3', d: 'M 105 -250 C 178 -162 230 -78 268 8 C 312 106 378 190 505 275', delay: 0.16, speed: 1.35, width: 0.85, opacity: 0.38 },
    { id: 'branch-1a', d: 'M 235 -42 C 205 -105 215 -166 268 -230 C 304 -274 355 -304 430 -325', delay: 0.22, speed: 1.95, width: 0.72, opacity: 0.4 },
    { id: 'branch-1b', d: 'M 350 105 C 318 44 328 -12 382 -70 C 420 -110 474 -132 548 -138', delay: 0.26, speed: 2.05, width: 0.68, opacity: 0.38 },
    { id: 'branch-1c', d: 'M 268 8 C 210 42 158 90 116 158 C 88 204 58 238 10 270', delay: 0.3, speed: 2, width: 0.62, opacity: 0.32 },
    { id: 'branch-2a', d: 'M 455 -170 C 428 -116 433 -64 475 -8 C 510 38 566 64 650 72', delay: 0.34, speed: 2, width: 0.62, opacity: 0.34 },
    { id: 'branch-2b', d: 'M 505 275 C 440 250 395 250 335 282 C 292 306 240 318 172 310', delay: 0.38, speed: 2.1, width: 0.58, opacity: 0.28 },
    { id: 'halo-arc-1', d: 'M -220 135 C -35 -80 218 -184 502 -124 C 585 -106 650 -70 700 -20', delay: 0.1, speed: 1.1, width: 0.5, opacity: 0.16 },
    { id: 'halo-arc-2', d: 'M -80 260 C 128 340 388 325 602 206 C 652 178 696 145 730 105', delay: 0.22, speed: 1.05, width: 0.45, opacity: 0.14 },
  ],
  throne: [
    { id: 'throne-spine-1', d: 'M -700 190 C -510 70 -325 20 -110 36 C 82 50 212 -28 368 -176 C 466 -270 590 -318 740 -322', delay: 0, speed: 1.36, width: 1.15, opacity: 0.62 },
    { id: 'throne-spine-2', d: 'M -610 286 C -360 205 -152 190 12 242 C 182 296 366 235 565 72 C 654 -2 727 -35 800 -26', delay: 0.08, speed: 1.26, width: 0.85, opacity: 0.38 },
    { id: 'throne-arc-1', d: 'M -350 -236 C -78 -370 246 -356 520 -192 C 632 -124 720 -46 790 50', delay: 0.14, speed: 1.05, width: 0.56, opacity: 0.24 },
    { id: 'throne-arc-2', d: 'M -260 332 C -8 418 298 392 584 218 C 692 152 776 82 844 -6', delay: 0.2, speed: 1.08, width: 0.52, opacity: 0.2 },
    { id: 'throne-branch-1', d: 'M -110 36 C -152 -44 -126 -132 -30 -226 C 36 -290 114 -330 216 -348', delay: 0.25, speed: 1.8, width: 0.66, opacity: 0.34 },
    { id: 'throne-branch-2', d: 'M 368 -176 C 320 -102 322 -32 398 42 C 458 101 546 126 665 115', delay: 0.3, speed: 1.9, width: 0.64, opacity: 0.34 },
    { id: 'throne-branch-3', d: 'M 12 242 C -60 206 -138 213 -218 272 C -272 312 -336 334 -420 330', delay: 0.34, speed: 1.95, width: 0.58, opacity: 0.28 },
  ],
  reading: [
    { id: 'reading-spine-1', d: 'M -720 222 C -500 105 -315 30 -104 42 C 92 54 208 -24 362 -174 C 470 -280 602 -330 760 -326', delay: 0, speed: 1.36, width: 1.18, opacity: 0.52 },
    { id: 'reading-spine-2', d: 'M -650 318 C -402 216 -172 188 30 244 C 224 298 430 232 646 60 C 720 0 785 -28 850 -18', delay: 0.08, speed: 1.28, width: 0.88, opacity: 0.34 },
    { id: 'reading-spine-3', d: 'M -430 -284 C -210 -340 18 -320 236 -220 C 420 -134 560 8 690 205', delay: 0.16, speed: 1.18, width: 0.68, opacity: 0.26 },
    { id: 'reading-branch-1', d: 'M -104 42 C -154 -50 -126 -140 -30 -232 C 36 -296 120 -336 232 -348', delay: 0.24, speed: 1.9, width: 0.68, opacity: 0.34 },
    { id: 'reading-branch-2', d: 'M 362 -174 C 312 -92 326 -22 408 48 C 470 100 552 124 666 112', delay: 0.28, speed: 1.98, width: 0.62, opacity: 0.3 },
    { id: 'reading-branch-3', d: 'M 30 244 C -52 202 -136 214 -220 274 C -276 314 -348 335 -438 326', delay: 0.34, speed: 2.02, width: 0.56, opacity: 0.26 },
    { id: 'reading-branch-4', d: 'M 236 -220 C 198 -144 218 -74 300 -8 C 366 45 452 68 560 58', delay: 0.38, speed: 1.86, width: 0.5, opacity: 0.22 },
    { id: 'reading-halo-1', d: 'M -610 -88 C -332 -218 18 -238 356 -122 C 548 -56 692 44 810 178', delay: 0.1, speed: 1.05, width: 0.46, opacity: 0.16 },
    { id: 'reading-halo-2', d: 'M -580 354 C -236 430 114 395 452 232 C 628 148 744 52 830 -70', delay: 0.2, speed: 1.05, width: 0.42, opacity: 0.14 },
  ],
  cta: [
    { id: 'cta-spine-1', d: 'M -700 230 C -468 92 -242 44 -26 88 C 164 126 330 64 508 -98 C 612 -194 726 -246 850 -252', delay: 0, speed: 1.34, width: 0.9, opacity: 0.34 },
    { id: 'cta-spine-2', d: 'M -642 334 C -418 242 -190 218 24 266 C 244 316 456 262 660 98', delay: 0.12, speed: 1.22, width: 0.62, opacity: 0.22 },
    { id: 'cta-branch-1', d: 'M -26 88 C -66 18 -48 -54 22 -120 C 80 -175 152 -205 242 -210', delay: 0.25, speed: 1.7, width: 0.5, opacity: 0.2 },
    { id: 'cta-branch-2', d: 'M 508 -98 C 458 -36 454 28 512 92 C 560 145 632 168 728 158', delay: 0.3, speed: 1.75, width: 0.48, opacity: 0.18 },
  ],
}

const paths = computed(() => growthPathSets[props.variant])
const viewBox = computed(() => '-680 -380 1360 760')
const gradientId = computed(() => `growth-stroke-${props.variant}`)
const glowId = computed(() => `growth-glow-${props.variant}`)

const pathOffset = (path: GrowthPath) => {
  const reveal = Math.min(1, Math.max(0, (progress.value - path.delay) * path.speed))
  return (1 - reveal).toFixed(3)
}

const pathGlowOpacity = (path: GrowthPath) => {
  const scale = props.variant === 'reading' ? 0.045 : 0.18
  return path.opacity * scale
}

onMounted(() => {
  const node = root.value
  if (!node) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let raf = 0

  const update = () => {
    const currentY = window.scrollY

    if (props.fixed || props.variant === 'reading') {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const raw = Math.min(1, Math.max(0, currentY / maxScroll))
      const eased = raw * raw * (3 - 2 * raw)
      progress.value = reducedMotion ? 0.86 : Math.min(1, 0.24 + eased * 0.76)
      drift.value = reducedMotion || props.variant === 'reading' ? 0 : Math.max(0, Math.min(90, currentY * 0.035))
      return
    }

    const rect = node.getBoundingClientRect()
    const raw = (window.innerHeight - rect.top) / Math.max(1, window.innerHeight + rect.height)
    const clamped = Math.min(1, Math.max(0, raw))
    const eased = clamped * clamped * (3 - 2 * clamped)
    progress.value = reducedMotion ? 0.9 : Math.min(1, 0.2 + eased * 0.86)
    drift.value = reducedMotion ? 0 : (eased - 0.5) * rect.height * 0.16
  }

  const schedule = () => {
    if (raf) return
    raf = window.requestAnimationFrame(() => {
      raf = 0
      update()
    })
  }

  update()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    window.cancelAnimationFrame(raf)
  })
})
</script>

<template>
  <div
    ref="root"
    class="growth-lines"
    :class="[`growth-lines-${variant}`, `growth-lines-${tone}`, { 'growth-lines-fixed': fixed }]"
    :style="{ '--growth-drift': `${drift}px` }"
    aria-hidden="true"
    data-engine="svg-growth-fractals"
  >
    <svg
      class="growth-map"
      :viewBox="viewBox"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
    >
      <defs>
        <linearGradient :id="gradientId" x1="0%" x2="100%" y1="45%" y2="55%">
          <stop class="growth-stop-cold" offset="0%" />
          <stop class="growth-stop-warm" offset="50%" />
          <stop class="growth-stop-light" offset="100%" />
        </linearGradient>
        <filter :id="glowId" x="-24%" y="-44%" width="148%" height="188%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g :filter="`url(#${glowId})`">
        <template v-for="path in paths" :key="path.id">
          <path
            class="growth-path growth-path-glow"
            :d="path.d"
            pathLength="1"
            :stroke="`url(#${gradientId})`"
            :style="{ strokeDashoffset: pathOffset(path), strokeWidth: `${path.width * 7}px`, opacity: pathGlowOpacity(path) }"
          />
          <path
            class="growth-path"
            :d="path.d"
            pathLength="1"
            :stroke="`url(#${gradientId})`"
            :style="{ strokeDashoffset: pathOffset(path), strokeWidth: `${path.width}px`, opacity: path.opacity }"
          />
        </template>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.growth-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  --growth-drift: 0px;
  --growth-cold: #d8e8ff;
  --growth-warm: #f2bf5e;
  --growth-light: #ffffff;
  --growth-opacity: 0.95;
}

.growth-lines-fixed {
  position: fixed;
  z-index: -1;
}

.growth-lines-light {
  --growth-cold: #172234;
  --growth-warm: #c99536;
  --growth-light: #7b5b24;
  --growth-opacity: 0.46;
}

.growth-lines-reading {
  --growth-cold: #29313a;
  --growth-warm: #9f7428;
  --growth-light: #725c32;
  --growth-opacity: 0.34;
}

.growth-lines-cta {
  --growth-opacity: 0.34;
}

.growth-map {
  width: 100%;
  height: 100%;
  opacity: var(--growth-opacity);
  mix-blend-mode: screen;
  transform: translate3d(0, var(--growth-drift), 0) scale(1.02);
  transform-origin: 50% 50%;
}

.growth-lines-light .growth-map {
  mix-blend-mode: multiply;
}

.growth-path {
  fill: none;
  stroke-dasharray: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: stroke-dashoffset 420ms cubic-bezier(.2, .8, .2, 1), opacity 420ms ease;
  animation: living-current 5.8s ease-in-out infinite alternate;
}

.growth-path-glow {
  animation-duration: 7.5s;
}

.growth-stop-cold {
  stop-color: var(--growth-cold);
  stop-opacity: .38;
}

.growth-stop-warm {
  stop-color: var(--growth-warm);
  stop-opacity: .78;
}

.growth-stop-light {
  stop-color: var(--growth-light);
  stop-opacity: .5;
}

@keyframes living-current {
  from {
    filter: brightness(.86);
  }

  to {
    filter: brightness(1.25);
  }
}

@media (prefers-reduced-motion: reduce) {
  .growth-map {
    transform: none;
  }

  .growth-path {
    animation: none;
    transition: none;
  }
}
</style>
