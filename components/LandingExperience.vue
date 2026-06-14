<script setup lang="ts">
defineProps<{ locale?: 'nl' | 'en' }>()
</script>

<template>
  <div>
    <LightChamber :locale="locale" />

    <div class="bg-bone">
      <KineticStatement
        eyebrow="Not a system"
        title="Knowing"
        :body="locale === 'nl'
          ? 'Het christelijk geloof wordt hier niet benaderd als schema, maar als herkenning: God kennen waar Hij Zichzelf heeft laten zien.'
          : 'Christian faith is approached here not as a schema, but as recognition: knowing God where He has made Himself visible.'"
      />

      <KineticStatement
        eyebrow="Revelation"
        title="Visible"
        dark
        :body="locale === 'nl'
          ? 'Openbaring is geen uitleg achteraf, maar aanwezigheid. Niet een systeem dat sluit, maar een Persoon die verschijnt.'
          : 'Revelation is not an explanation after the fact, but presence. Not a system that closes, but a Person who appears.'"
      />

      <KineticStatement
        eyebrow="Seen / unseen"
        title="Undivided One"
        :body="locale === 'nl'
          ? 'De spanning van zien en niet-zien wordt niet gladgestreken. Zij wordt gedragen als openbaring: God verschijnt zonder Zijn identiteit te delen.'
          : 'The tension of seeing and not seeing is not flattened. It is carried as revelation: God appears without dividing His identity.'"
      />

      <section class="revelation-band relative overflow-hidden bg-ink px-6 py-28 text-parchment md:py-40" data-header-theme="dark">
        <GrowthLines variant="throne" tone="dark" />
        <div class="relative mx-auto max-w-6xl">
          <p class="font-display display-title section-display max-w-5xl text-5xl leading-[0.9] md:text-8xl">One Name. One throne. One God.</p>
        </div>
      </section>

      <section class="mx-auto max-w-6xl px-6 py-20" data-header-theme="light">
        <div class="relative overflow-hidden border border-ink/10 bg-bone p-8 shadow-soft md:p-12">
          <GrowthLines variant="cta" tone="light" />
          <p class="font-display display-title section-display mb-6 text-3xl md:text-5xl">
            {{ locale === 'nl' ? 'Begin met lezen.' : 'Begin reading.' }}
          </p>
          <div class="flex flex-wrap gap-3">
            <NuxtLink to="/en/essay" class="border border-gold bg-gold px-5 py-3 text-sm font-medium text-ink transition hover:bg-transparent">
              Read in English
            </NuxtLink>
            <NuxtLink to="/nl/essay" class="border border-ink/20 px-5 py-3 text-sm font-medium text-ink transition hover:border-gold hover:text-ember">
              Lees in Nederlands
            </NuxtLink>
            <DownloadButtons />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
