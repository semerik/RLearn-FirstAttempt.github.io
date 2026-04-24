<template>
  <div class="app-root">
    <!-- Atmospheric effects -->
    <div class="scanlines" aria-hidden="true" />
    <div class="grid-bg"   aria-hidden="true" />
    <div class="sun-orb"   aria-hidden="true" />

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useRLearnStore } from '~/stores/rlearn'

const store = useRLearnStore()

onMounted(() => {
  store.loadProgress()
})
</script>

<style scoped>
.app-root {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
