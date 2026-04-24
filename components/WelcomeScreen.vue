<template>
  <div class="welcome">
    <h1 class="welcome-title gradient-text font-head">
      APRENDE R<br>EN MODO<br>NEON
    </h1>
    <p class="welcome-sub font-mono">// SELECCIONA UN MÓDULO PARA COMENZAR //</p>

    <div class="stats-row">
      <div class="stat-box" v-for="s in stats" :key="s.label">
        <div class="stat-num font-head text-glow-cyan">{{ s.value }}</div>
        <div class="stat-label font-mono">{{ s.label }}</div>
      </div>
    </div>

    <div class="welcome-card font-mono">
      <span class="prompt-arrow">></span>
      Elige un módulo en el panel izquierdo. Cada tema incluye teoría interactiva y ejercicios
      con una consola R real impulsada por <strong style="color:var(--cyan)">WebR</strong>.
    </div>

    <div class="module-preview">
      <div
        v-for="mod in store.modules"
        :key="mod.id"
        class="preview-card"
        @click="selectFirstTopic(mod.id)"
      >
        <div class="preview-num font-head">{{ mod.num }}</div>
        <div class="preview-name font-head">{{ mod.name }}</div>
        <div class="preview-desc font-mono">{{ mod.description }}</div>
        <div class="preview-topics font-mono">
          {{ mod.topics.length }} temas · {{ countExercises(mod.id) }} ejercicios
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRLearnStore } from '~/stores/rlearn'

const store = useRLearnStore()

const stats = computed(() => [
  { value: '3',  label: 'MÓDULOS' },
  {
    value: String(store.modules.reduce((a, m) => a + m.topics.length, 0)),
    label: 'TEMAS',
  },
  { value: String(store.totalExercises), label: 'EJERCICIOS' },
])

function countExercises (modId: string): number {
  const mod = store.modules.find(m => m.id === modId)
  return mod?.topics.reduce((a, t) => a + t.exercises.length, 0) ?? 0
}

function selectFirstTopic (modId: string) {
  store.expandedModules[modId] = true
  const mod = store.modules.find(m => m.id === modId)
  if (mod?.topics.length) {
    store.selectTopic(modId, mod.topics[0].id)
  }
}
</script>

<style scoped>
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px 24px 40px;
  gap: 24px;
  min-height: 100%;
}

.welcome-title {
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 900;
  letter-spacing: 5px;
  line-height: 1.2;
}

.welcome-sub {
  font-size: 11px;
  color: rgba(224, 224, 224, 0.45);
  letter-spacing: 4px;
}

.stats-row {
  display: flex;
  gap: 24px;
}

.stat-box {
  border: 1px solid var(--border-dim);
  border-top: 2px solid var(--cyan);
  padding: 14px 26px;
  text-align: center;
}

.stat-num {
  font-size: 32px;
  font-weight: 900;
}

.stat-label {
  font-size: 9px;
  color: rgba(224, 224, 224, 0.4);
  letter-spacing: 3px;
  margin-top: 3px;
}

.welcome-card {
  border: 1px solid var(--border-dim);
  border-left: 3px solid var(--magenta);
  background: var(--card-bg);
  padding: 14px 20px;
  font-size: 12px;
  color: rgba(224, 224, 224, 0.65);
  line-height: 1.8;
  max-width: 540px;
  text-align: left;
}

.prompt-arrow {
  color: var(--magenta);
  margin-right: 6px;
}

.module-preview {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 680px;
}

.preview-card {
  border: 1px solid var(--border-dim);
  border-top: 2px solid var(--magenta);
  background: var(--card-bg);
  padding: 16px 20px;
  width: 190px;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s;
}

.preview-card:hover {
  border-color: var(--magenta);
  box-shadow: 0 0 18px rgba(255, 0, 255, 0.2);
  transform: translateY(-2px);
}

.preview-num {
  font-size: 28px;
  font-weight: 900;
  color: var(--magenta);
  opacity: 0.5;
  line-height: 1;
}

.preview-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--fg);
  letter-spacing: 1px;
  margin: 6px 0 4px;
}

.preview-desc {
  font-size: 10px;
  color: rgba(224, 224, 224, 0.5);
  line-height: 1.5;
  margin-bottom: 8px;
}

.preview-topics {
  font-size: 9px;
  color: var(--orange);
  letter-spacing: 1px;
}
</style>
