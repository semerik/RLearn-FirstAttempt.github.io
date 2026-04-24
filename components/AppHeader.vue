<template>
  <header class="app-header">
    <!-- Logo -->
    <div class="logo-block">
      <span class="logo gradient-text font-head">R//LEARN</span>
      <span class="logo-sub">QUANTUM EDITION v2.0</span>
    </div>

    <!-- Nav tabs -->
    <nav class="nav-tabs" role="tablist">
      <button
        class="nav-tab btn"
        :class="{ active: store.activeView === 'learn' }"
        @click="store.setView('learn')"
        role="tab"
        :aria-selected="store.activeView === 'learn'"
      >
        ◈ MÓDULOS
      </button>
      <button
        class="nav-tab btn"
        :class="{ active: store.activeView === 'progress' }"
        @click="store.setView('progress')"
        role="tab"
        :aria-selected="store.activeView === 'progress'"
      >
        ◈ PROGRESO
      </button>
    </nav>

    <!-- Progress indicator -->
    <div class="progress-block">
      <div class="progress-label font-mono">
        PROGRESO: {{ store.progressPercent }}%
        <span class="progress-counts">({{ store.completedCount }}/{{ store.totalExercises }})</span>
      </div>
      <div class="progress-track" style="width:160px; margin-top:5px">
        <div class="progress-fill" :style="{ width: store.progressPercent + '%' }" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRLearnStore } from '~/stores/rlearn'
const store = useRLearnStore()
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 24px;
  background: rgba(9, 0, 20, 0.97);
  border-bottom: 2px solid var(--magenta);
  box-shadow: 0 0 24px rgba(255, 0, 255, 0.25);
  position: sticky;
  top: 0;
  z-index: 200;
  flex-shrink: 0;
}

.logo-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.logo {
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 5px;
}

.logo-sub {
  font-size: 9px;
  color: rgba(224, 224, 224, 0.35);
  letter-spacing: 4px;
  font-family: var(--font-mono);
}

.nav-tabs {
  display: flex;
  gap: 6px;
}

.nav-tab {
  padding: 7px 16px;
  font-size: 11px;
  letter-spacing: 2px;
  border: 1px solid var(--border-dim);
  color: rgba(224, 224, 224, 0.55);
  clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
  transition: all 0.15s;
  background: transparent;
}

.nav-tab:hover,
.nav-tab.active {
  background: var(--magenta);
  color: #000;
  border-color: var(--magenta);
  box-shadow: 0 0 16px rgba(255, 0, 255, 0.5);
}

.progress-block {
  text-align: right;
}

.progress-label {
  font-size: 10px;
  color: var(--cyan);
  letter-spacing: 2px;
}

.progress-counts {
  color: rgba(0, 255, 255, 0.5);
  font-size: 9px;
}
</style>
