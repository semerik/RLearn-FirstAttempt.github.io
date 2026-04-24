<template>
  <div class="progress-view">
    <div class="pv-header">
      <h2 class="pv-title font-head gradient-text">◈ TU PROGRESO</h2>
      <button class="btn btn-ghost" style="font-size:10px" @click="confirmReset">
        ↺ REINICIAR
      </button>
    </div>

    <!-- Overall stats -->
    <div class="overall-stats">
      <div class="stat-big">
        <div class="stat-big-num font-head text-glow-cyan">{{ store.progressPercent }}%</div>
        <div class="stat-big-label font-mono">COMPLETADO</div>
      </div>
      <div class="stat-big">
        <div class="stat-big-num font-head" style="color:var(--magenta)">
          {{ store.completedCount }}
        </div>
        <div class="stat-big-label font-mono">EJERCICIOS ✓</div>
      </div>
      <div class="stat-big">
        <div class="stat-big-num font-head" style="color:var(--orange)">
          {{ store.totalExercises - store.completedCount }}
        </div>
        <div class="stat-big-label font-mono">PENDIENTES</div>
      </div>
    </div>

    <!-- Overall progress bar -->
    <div class="overall-bar">
      <div class="progress-track" style="height:6px">
        <div class="progress-fill" :style="{ width: store.progressPercent + '%' }" />
      </div>
    </div>

    <!-- Per-module breakdown -->
    <div class="modules-grid">
      <div
        v-for="mod in store.modules"
        :key="mod.id"
        class="mod-progress-card card-neon"
      >
        <!-- Module header -->
        <div class="mpcard-header">
          <div>
            <div class="mpcard-num font-mono">MOD {{ mod.num }}</div>
            <div class="mpcard-name font-head">{{ mod.name }}</div>
          </div>
          <div class="mpcard-pct font-head text-glow-cyan">
            {{ moduleProgressPct(mod.id) }}%
          </div>
        </div>

        <!-- Progress bar -->
        <div class="progress-track" style="margin: 8px 0">
          <div
            class="progress-fill"
            :style="{ width: moduleProgressPct(mod.id) + '%' }"
          />
        </div>

        <!-- Topic rows -->
        <ul class="topic-rows">
          <li
            v-for="topic in mod.topics"
            :key="topic.id"
            class="topic-row font-mono"
          >
            <span
              class="topic-row-icon"
              :class="{ done: topicAllDone(mod.id, topic.id) }"
            >
              {{ topicAllDone(mod.id, topic.id) ? '✓' : '◦' }}
            </span>
            <span class="topic-row-name">{{ topic.name }}</span>
            <span class="topic-row-count">
              {{ store.topicProgress(mod.id, topic.id).done }}
              /
              {{ store.topicProgress(mod.id, topic.id).total }}
            </span>
          </li>
        </ul>

        <!-- Go to module button -->
        <button
          class="btn btn-secondary"
          style="width:100%; margin-top:12px; font-size:10px"
          @click="goToModule(mod.id)"
        >
          IR AL MÓDULO →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRLearnStore } from '~/stores/rlearn'

const store = useRLearnStore()

function moduleProgressPct (modId: string): number {
  const { done, total } = store.moduleProgress(modId)
  return total ? Math.round((done / total) * 100) : 0
}

function topicAllDone (modId: string, topicId: string): boolean {
  const { done, total } = store.topicProgress(modId, topicId)
  return total > 0 && done === total
}

function goToModule (modId: string) {
  store.setView('learn')
  store.expandedModules[modId] = true
  const mod = store.modules.find(m => m.id === modId)
  if (mod?.topics.length) {
    store.selectTopic(modId, mod.topics[0].id)
  }
}

function confirmReset () {
  if (confirm('¿Reiniciar todo el progreso? Esta acción no se puede deshacer.')) {
    store.resetProgress()
  }
}
</script>

<style scoped>
.progress-view {
  padding: 28px 32px 40px;
  position: relative;
  z-index: 10;
}

.pv-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.pv-title {
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 4px;
}

/* Overall stats */
.overall-stats {
  display: flex;
  gap: 32px;
  margin-bottom: 16px;
}

.stat-big {
  text-align: center;
}

.stat-big-num {
  font-size: 40px;
  font-weight: 900;
  line-height: 1;
}

.stat-big-label {
  font-size: 9px;
  color: rgba(224, 224, 224, 0.4);
  letter-spacing: 3px;
  margin-top: 4px;
}

.overall-bar {
  max-width: 600px;
  margin-bottom: 32px;
}

/* Module grid */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.mod-progress-card {
  padding: 18px;
}

.mpcard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
}

.mpcard-num {
  font-size: 9px;
  color: var(--orange);
  letter-spacing: 3px;
}

.mpcard-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--fg);
  letter-spacing: 1px;
}

.mpcard-pct {
  font-size: 26px;
  font-weight: 900;
}

/* Topic rows */
.topic-rows {
  list-style: none;
  border-top: 1px solid var(--border-dim);
  padding-top: 8px;
}

.topic-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 0;
  font-size: 11px;
  border-bottom: 1px solid rgba(45, 27, 78, 0.5);
  color: rgba(224, 224, 224, 0.55);
}

.topic-row-icon {
  font-size: 10px;
  color: rgba(224, 224, 224, 0.3);
  flex-shrink: 0;
  width: 14px;
}

.topic-row-icon.done { color: var(--cyan); }

.topic-row-name {
  flex: 1;
}

.topic-row-count {
  font-size: 9px;
  color: var(--orange);
  letter-spacing: 1px;
}
</style>
