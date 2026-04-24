<template>
  <article
    class="exercise-card card-neon"
    :class="{ selected: isSelected, done: isDone }"
    @click="$emit('select')"
    :aria-selected="isSelected"
  >
    <!-- Top row -->
    <div class="ex-top">
      <span class="ex-num font-mono">EJERCICIO {{ index }}</span>
      <span v-if="isDone"  class="badge badge-done">✓ COMPLETADO</span>
      <span v-else         class="badge badge-new">NUEVO</span>
    </div>

    <!-- Title -->
    <h4 class="ex-title font-head">{{ exercise.title }}</h4>

    <!-- Description (HTML) -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p class="ex-desc font-mono" v-html="exercise.description" />

    <!-- Hint (visible when hintVisible) -->
    <Transition name="hint-fade">
      <div v-if="hintVisible" class="ex-hint font-mono">
        <span class="hint-label">▶ PISTA:</span> {{ exercise.hint }}
      </div>
    </Transition>
  </article>
</template>

<script setup lang="ts">
import type { Exercise } from '~/types'

defineProps<{
  exercise: Exercise
  index: number
  isSelected: boolean
  isDone: boolean
  hintVisible: boolean
}>()

defineEmits<{ select: [] }>()
</script>

<style scoped>
.exercise-card {
  padding: 14px 16px;
  cursor: pointer;
  border-radius: 0;
  border-left: 3px solid transparent;
  transition: all 0.15s;
}

.exercise-card.selected {
  border-left-color: var(--magenta);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.25);
}

.exercise-card.done {
  border-top-color: var(--cyan);
  opacity: 0.85;
}

.ex-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.ex-num {
  font-size: 9px;
  color: var(--orange);
  letter-spacing: 3px;
}

.ex-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--fg);
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.ex-desc {
  font-size: 12px;
  color: rgba(224, 224, 224, 0.7);
  line-height: 1.7;
}

.ex-hint {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--border-dim);
  font-size: 11px;
  color: var(--orange);
  line-height: 1.6;
}

.hint-label {
  font-weight: 700;
  color: var(--orange);
}

/* Transitions */
.hint-fade-enter-active,
.hint-fade-leave-active { transition: opacity 0.2s, max-height 0.2s; overflow: hidden; }
.hint-fade-enter-from,
.hint-fade-leave-to { opacity: 0; max-height: 0; }
.hint-fade-enter-to,
.hint-fade-leave-from { opacity: 1; max-height: 120px; }
</style>
