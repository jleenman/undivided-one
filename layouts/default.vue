<template>
  <div class="min-h-screen bg-bone text-ink selection:bg-gold/30">
    <AppHeader />
    <main>
      <slot />
    </main>
    <footer class="border-t border-ink/10 px-6 py-10 text-sm text-ink/60">
      <div class="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>UNDIVIDED ONE — The One God Made Visible</p>
        <p>Static Nuxt site. No CMS. No database.</p>
      </div>
    </footer>
  </div>
</template>
