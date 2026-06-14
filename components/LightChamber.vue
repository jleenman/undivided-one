<script setup lang="ts">
const props = defineProps<{ locale?: 'nl' | 'en' }>()

const canvas = ref<HTMLCanvasElement | null>(null)
const webglReady = ref(false)
const pointer = reactive({ x: 0, y: 0 })
const STAR_COUNT = 18000
const STAR_CLUSTER_COUNT = 16

type ProgramBundle = {
  program: WebGLProgram
  position: number
  seed: number
  uniforms: {
    time: WebGLUniformLocation | null
    scroll: WebGLUniformLocation | null
    pointer: WebGLUniformLocation | null
    aspect: WebGLUniformLocation | null
    reveal: WebGLUniformLocation | null
  }
}

type ScreenProgramBundle = {
  program: WebGLProgram
  position: number
  uniforms: {
    time: WebGLUniformLocation | null
    scroll: WebGLUniformLocation | null
    pointer: WebGLUniformLocation | null
    aspect: WebGLUniformLocation | null
  }
}

const vertexShader = `
  precision highp float;
  attribute vec3 aPosition;
  attribute float aSeed;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uPointer;
  uniform float uAspect;
  uniform float uReveal;
  varying float vSeed;
  varying float vDepth;
  varying float vRevealMask;

  mat3 rotateX(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
  }

  mat3 rotateY(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
  }

  mat3 rotateZ(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);
  }

  void main() {
    vec3 pos = aPosition;
    float pulse = sin(uTime * 0.36 + aSeed * 13.7) * 0.018;
    float radialReveal = smoothstep(0.0, 1.0, uReveal);
    pos.xy *= 1.0 + pulse + radialReveal * 0.055;
    pos.z += sin(uTime * 0.22 + aSeed * 17.0) * 0.028;

    float yaw = -0.52 + uScroll * 0.055 + uPointer.x * 0.08;
    float pitch = 0.92 - uScroll * 0.025 + uPointer.y * 0.045;
    float roll = sin(uTime * 0.07) * 0.018 + uScroll * 0.012;
    pos = rotateZ(roll) * rotateX(pitch) * rotateY(yaw) * pos;
    pos.z -= 4.92 - uScroll * 0.06;

    float perspective = 2.35 / max(0.32, -pos.z);
    vec2 projected = pos.xy * perspective;
    projected.x /= uAspect;
    projected.y += 0.04 - uScroll * 0.012;

    float revealRadius = length(aPosition.xy) / 6.0 + aSeed * 0.18;
    vRevealMask = smoothstep(revealRadius - 0.28, revealRadius + 0.2, radialReveal);
    vSeed = aSeed;
    vDepth = clamp((pos.z + 6.0) / 7.0, 0.0, 1.0);
    gl_Position = vec4(projected, 0.0, 1.0);
    float flare = smoothstep(0.968, 1.0, fract(aSeed * 97.0));
    float micro = smoothstep(0.08, 0.72, fract(aSeed * 43.0));
    gl_PointSize = mix(0.8, 5.4, vDepth) * (0.8 + micro * 0.82 + flare * 1.55 + sin(uTime * 1.8 + aSeed * 41.0) * 0.08);
  }
`

const nebulaVertexShader = `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;

  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`

const nebulaFragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uPointer;
  uniform float uAspect;
  varying vec2 vUv;

  float field(vec2 p) {
    float r = length(p);
    float horizontal = sin((p.x * 9.0 + p.y * 2.0) + uTime * 0.24 + uScroll * 2.0);
    float vertical = sin((p.y * 7.0 - p.x * 1.6) - uTime * 0.18);
    float rings = sin(r * 24.0 - uTime * 0.34 + uScroll * 3.0);
    return smoothstep(1.0, 0.08, r) * (0.34 + rings * 0.14 + horizontal * 0.12 + vertical * 0.1);
  }

  void main() {
    vec2 p = vUv - 0.5;
    p.x *= uAspect;
    p += uPointer * 0.025;
    float glow =
      field((p + vec2(-0.22, 0.12)) * vec2(1.12, 0.72)) * 0.8 +
      field((p + vec2(0.24, -0.16)) * vec2(0.76, 1.18)) * 0.62 +
      field((p + vec2(0.04, 0.08)) * 1.38) * 0.38;
    float core =
      smoothstep(0.42, 0.0, length((p - vec2(-0.18, 0.12)) * vec2(1.2, 0.72))) * 0.38 +
      smoothstep(0.38, 0.0, length((p - vec2(0.26, -0.18)) * vec2(0.82, 1.28))) * 0.3;
    vec3 blue = vec3(0.20, 0.32, 0.56);
    vec3 amber = vec3(0.95, 0.58, 0.16);
    vec3 color = mix(blue, amber, smoothstep(0.28, 0.95, glow + core * 0.22));
    float alpha = clamp(glow * 0.23 + core * 0.16 + uScroll * 0.08, 0.0, 0.45);
    gl_FragColor = vec4(color, alpha);
  }
`

const starFragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform float uScroll;
  varying float vSeed;
  varying float vDepth;
  varying float vRevealMask;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float disc = smoothstep(0.5, 0.0, length(uv));
    float twinkle = 0.78 + sin(uTime * (0.72 + vSeed * 1.1) + vSeed * 80.0) * 0.14;
    vec3 cold = vec3(0.72, 0.82, 1.0);
    vec3 warm = vec3(1.0, 0.78, 0.34);
    vec3 color = mix(cold, warm, smoothstep(0.22, 0.96, vSeed));
    float halo = smoothstep(0.5, 0.08, length(uv)) * 0.32;
    float clusterBoost = smoothstep(0.64, 1.0, fract(vSeed * 19.0));
    float rareFlare = smoothstep(0.982, 1.0, fract(vSeed * 97.0));
    float dust = mix(0.28, 1.0, fract(vSeed * 61.0));
    float alpha = (disc + halo) * twinkle * mix(0.52, 1.0, vDepth) * (dust * 1.42 + clusterBoost * 1.78 + rareFlare * 4.2 + uScroll * 0.025);
    gl_FragColor = vec4(color, alpha);
  }
`

const lineFragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform float uScroll;
  varying float vSeed;
  varying float vDepth;
  varying float vRevealMask;

  void main() {
    float pulse = 0.72 + sin(uTime * 1.55 + uScroll * 3.4 + vSeed * 31.0) * 0.28;
    vec3 amber = vec3(1.0, 0.72, 0.24);
    vec3 silver = vec3(0.82, 0.9, 1.0);
    vec3 color = mix(silver, amber, smoothstep(0.2, 1.0, vSeed));
    float growth = smoothstep(0.08, 1.0, vRevealMask + uScroll * 0.46);
    float reveal = 0.2 + growth * 0.8;
    float alpha = pulse * reveal * mix(0.16, 0.86, vDepth) * (0.54 + uScroll * 1.28);
    gl_FragColor = vec4(color, alpha);
  }
`

const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

const createProgram = (gl: WebGLRenderingContext, fragmentSource: string): ProgramBundle | null => {
  const vs = createShader(gl, gl.VERTEX_SHADER, vertexShader)
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
  if (!vs || !fs) return null

  const program = gl.createProgram()
  if (!program) return null

  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  gl.deleteShader(vs)
  gl.deleteShader(fs)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    return null
  }

  return {
    program,
    position: gl.getAttribLocation(program, 'aPosition'),
    seed: gl.getAttribLocation(program, 'aSeed'),
    uniforms: {
      time: gl.getUniformLocation(program, 'uTime'),
      scroll: gl.getUniformLocation(program, 'uScroll'),
      pointer: gl.getUniformLocation(program, 'uPointer'),
      aspect: gl.getUniformLocation(program, 'uAspect'),
      reveal: gl.getUniformLocation(program, 'uReveal'),
    },
  }
}

const createScreenProgram = (gl: WebGLRenderingContext): ScreenProgramBundle | null => {
  const vs = createShader(gl, gl.VERTEX_SHADER, nebulaVertexShader)
  const fs = createShader(gl, gl.FRAGMENT_SHADER, nebulaFragmentShader)
  if (!vs || !fs) return null

  const program = gl.createProgram()
  if (!program) return null

  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  gl.deleteShader(vs)
  gl.deleteShader(fs)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    return null
  }

  return {
    program,
    position: gl.getAttribLocation(program, 'aPosition'),
    uniforms: {
      time: gl.getUniformLocation(program, 'uTime'),
      scroll: gl.getUniformLocation(program, 'uScroll'),
      pointer: gl.getUniformLocation(program, 'uPointer'),
      aspect: gl.getUniformLocation(program, 'uAspect'),
    },
  }
}

const addVertex = (target: number[], x: number, y: number, z: number, seed: number) => {
  target.push(x, y, z, seed)
}

const starClusters = Array.from({ length: STAR_CLUSTER_COUNT }, (_, index) => {
  const angle = index * 2.399963
  const radius = 0.9 + (index % 6) * 0.62
  return {
    x: Math.cos(angle) * radius,
    y: -1.05 + (index % 8) * 0.34,
    z: Math.sin(angle) * radius * 0.82 + ((index % 5) - 2) * 0.38,
  }
})

const buildStarVertices = () => {
  const starVertices: number[] = []
  for (let i = 0; i < STAR_COUNT; i += 1) {
    const seed = ((i * 37) % 997) / 997
    const clusterIndex = i % STAR_CLUSTER_COUNT
    const clusterWeight = i % 3 === 0 || i % 5 === 0 || i % 13 === 0 ? 0.78 : 0
    const cluster = starClusters[clusterIndex]
    const theta = i * 2.399963 + seed * 0.9 + clusterIndex * 0.13
    const layer = i % 8
    const shell = 1.1 + ((i * 19) % 100) / 100 * (5.8 + layer * 0.22)
    const galacticBand = Math.sin(theta * 0.52 + layer * 0.38) * (0.18 + layer * 0.035)
    const fieldX = Math.cos(theta) * shell * (0.78 + seed * 1.28)
    const fieldY = galacticBand * shell + Math.sin(theta * 0.21) * 0.42 + (seed - 0.5) * 0.56
    const fieldZ = Math.sin(theta) * shell * (0.82 + layer * 0.06) + (seed - 0.5) * 5.2
    const clusterSpread = 0.16 + ((i * 11) % 100) / 100 * 0.54
    const clusterX = cluster.x + Math.cos(theta * 3.1) * clusterSpread
    const clusterY = cluster.y + Math.sin(theta * 2.7) * clusterSpread * 0.72
    const clusterZ = cluster.z + Math.sin(theta * 2.3) * clusterSpread
    const x = fieldX * (1 - clusterWeight) + clusterX * clusterWeight
    const y = fieldY * (1 - clusterWeight) + clusterY * clusterWeight
    const z = fieldZ * (1 - clusterWeight) + clusterZ * clusterWeight
    addVertex(starVertices, x, y, z, seed)
  }
  return new Float32Array(starVertices)
}

const buildNebulaVertices = () => new Float32Array([
  -1, -1,
  1, -1,
  -1, 1,
  -1, 1,
  1, -1,
  1, 1,
])

const bindBuffer = (gl: WebGLRenderingContext, bundle: ProgramBundle, buffer: WebGLBuffer) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.enableVertexAttribArray(bundle.position)
  gl.vertexAttribPointer(bundle.position, 3, gl.FLOAT, false, 16, 0)
  gl.enableVertexAttribArray(bundle.seed)
  gl.vertexAttribPointer(bundle.seed, 1, gl.FLOAT, false, 16, 12)
}

const setUniforms = (gl: WebGLRenderingContext, bundle: ProgramBundle, time: number, scroll: number, aspect: number) => {
  gl.useProgram(bundle.program)
  gl.uniform1f(bundle.uniforms.time, time)
  gl.uniform1f(bundle.uniforms.scroll, scroll)
  gl.uniform2f(bundle.uniforms.pointer, pointer.x, pointer.y)
  gl.uniform1f(bundle.uniforms.aspect, aspect)
  gl.uniform1f(bundle.uniforms.reveal, Math.min(1, 0.24 + scroll * 1.45))
}

const bindScreenBuffer = (gl: WebGLRenderingContext, bundle: ScreenProgramBundle, buffer: WebGLBuffer) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.enableVertexAttribArray(bundle.position)
  gl.vertexAttribPointer(bundle.position, 2, gl.FLOAT, false, 8, 0)
}

const setScreenUniforms = (gl: WebGLRenderingContext, bundle: ScreenProgramBundle, time: number, scroll: number, aspect: number) => {
  gl.useProgram(bundle.program)
  gl.uniform1f(bundle.uniforms.time, time)
  gl.uniform1f(bundle.uniforms.scroll, scroll)
  gl.uniform2f(bundle.uniforms.pointer, pointer.x, pointer.y)
  gl.uniform1f(bundle.uniforms.aspect, aspect)
}

onMounted(() => {
  const node = canvas.value
  if (!node) return

  const gl = node.getContext('webgl', {
    alpha: true,
    antialias: true,
    depth: false,
    powerPreference: 'high-performance',
  })
  if (!gl) return

  const starProgram = createProgram(gl, starFragmentShader)
  const nebulaProgram = createScreenProgram(gl)
  if (!starProgram || !nebulaProgram) return

  const starVertices = buildStarVertices()
  const nebulaVertices = buildNebulaVertices()
  const starBuffer = gl.createBuffer()
  const nebulaBuffer = gl.createBuffer()
  if (!starBuffer || !nebulaBuffer) return

  gl.bindBuffer(gl.ARRAY_BUFFER, starBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, starVertices, gl.STATIC_DRAW)
  gl.bindBuffer(gl.ARRAY_BUFFER, nebulaBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, nebulaVertices, gl.STATIC_DRAW)

  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
  gl.disable(gl.DEPTH_TEST)
  webglReady.value = true

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let raf = 0
  let width = 1
  let height = 1
  let scrollProgress = 0

  const updateScroll = () => {
    const rect = node.getBoundingClientRect()
    const travel = Math.max(1, rect.height)
    scrollProgress = Math.min(1, Math.max(0, -rect.top / travel))
  }

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    width = Math.max(1, Math.floor(node.clientWidth * ratio))
    height = Math.max(1, Math.floor(node.clientHeight * ratio))
    node.width = width
    node.height = height
    gl.viewport(0, 0, width, height)
    updateScroll()
  }

  const move = (event: PointerEvent) => {
    const rect = node.getBoundingClientRect()
    pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
  }

  const render = (now = 0) => {
    const time = reducedMotion ? 0.8 : now * 0.001
    const easedScroll = scrollProgress * scrollProgress * (3 - 2 * scrollProgress)
    const aspect = width / height

    gl.clearColor(0.015, 0.014, 0.012, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    setScreenUniforms(gl, nebulaProgram, time, easedScroll, aspect)
    bindScreenBuffer(gl, nebulaProgram, nebulaBuffer)
    gl.drawArrays(gl.TRIANGLES, 0, nebulaVertices.length / 2)

    setUniforms(gl, starProgram, time, easedScroll, aspect)
    bindBuffer(gl, starProgram, starBuffer)
    gl.drawArrays(gl.POINTS, 0, starVertices.length / 4)

    if (!reducedMotion) raf = window.requestAnimationFrame(render)
  }

  resize()
  render()
  window.addEventListener('resize', resize)
  window.addEventListener('scroll', updateScroll, { passive: true })
  node.addEventListener('pointermove', move)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
    window.removeEventListener('scroll', updateScroll)
    node.removeEventListener('pointermove', move)
    window.cancelAnimationFrame(raf)
  })
})
</script>

<template>
  <section class="light-chamber relative isolate -mt-[72px] min-h-screen overflow-hidden bg-ink pt-[72px] text-parchment" data-header-theme="dark">
    <canvas
      ref="canvas"
      class="absolute inset-0 h-full w-full"
      aria-hidden="true"
      data-engine="webgl-star-map"
      :data-ready="webglReady ? 'true' : 'false'"
    />
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_52%_34%,rgba(242,191,94,.2),rgba(11,11,9,.18)_30%,rgba(11,11,9,.9)_78%)]" />
    <GrowthLines variant="hero" tone="dark" />
    <div class="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink to-transparent" />
    <div class="absolute left-1/2 top-[48%] h-[82vmin] w-[82vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20 opacity-60 [transform:translate(-50%,-50%)_rotateX(68deg)_rotateZ(-8deg)]" aria-hidden="true" />
    <div class="absolute left-1/2 top-[50%] h-[52vmin] w-[52vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-parchment/10 opacity-70 [transform:translate(-50%,-50%)_rotateX(70deg)_rotateZ(18deg)]" aria-hidden="true" />

    <div class="relative z-10 mx-auto flex min-h-[calc(100vh-65px)] max-w-6xl flex-col justify-center px-6 py-20">
      <p class="mb-6 text-xs uppercase tracking-[0.42em] text-gold">UNDIVIDED ONE</p>
      <h1 class="font-display display-title hero-display max-w-5xl text-6xl leading-[0.84] md:text-9xl">
        {{ props.locale === 'nl' ? 'De Ene God' : 'The One God' }}
        <span class="block text-parchment/54">{{ props.locale === 'nl' ? 'Zichtbaar geworden' : 'Made Visible' }}</span>
      </h1>
      <p class="mt-8 max-w-2xl text-lg leading-8 text-parchment/74 md:text-xl">
        {{ props.locale === 'nl'
          ? 'Een levende leeservaring rond identiteit, echad, openbaring en de grens tussen zichtbaar en ongezien.'
          : 'A living reading experience around identity, echad, revelation, and the threshold between seen and unseen.' }}
      </p>
      <div class="mt-10 flex flex-wrap gap-3">
        <NuxtLink to="/en/essay" class="border border-gold bg-gold px-5 py-3 text-sm font-medium text-ink transition hover:bg-transparent hover:text-gold">
          {{ props.locale === 'nl' ? 'Lees in het Engels' : 'Read in English' }}
        </NuxtLink>
        <NuxtLink to="/nl/essay" class="border border-parchment/25 px-5 py-3 text-sm font-medium text-parchment transition hover:border-gold hover:text-gold">
          {{ props.locale === 'nl' ? 'Lees in het Nederlands' : 'Lees in Nederlands' }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
