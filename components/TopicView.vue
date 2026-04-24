<template>
  <div v-if="topic" class="topic-view">
    <!-- Theory window -->
    <div class="window theory-window">
      <div class="window-bar">
        <div class="window-dots">
          <div class="window-dot" style="background:var(--magenta)" />
          <div class="window-dot" style="background:var(--cyan)" />
          <div class="window-dot" style="background:var(--orange)" />
        </div>
        <span class="window-title">TEORÍA · {{ topic.name.toUpperCase() }}</span>
      </div>
      <div class="window-body">
        <h2 class="theory-heading font-head text-glow-cyan">{{ topic.name }}</h2>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="theory-content" v-html="topic.theory" />
      </div>
    </div>

    <!-- Exercises section -->
    <section class="exercises-section" aria-label="Ejercicios">
      <h3 class="section-heading font-head">◈ EJERCICIOS PRÁCTICOS</h3>

      <ExerciseCard
        v-for="(ex, idx) in topic.exercises"
        :key="ex.id"
        :exercise="ex"
        :index="idx + 1"
        :is-selected="store.currentExerciseId === ex.id"
        :is-done="!!store.completed[ex.id]"
        :hint-visible="store.hintVisible && store.currentExerciseId === ex.id"
        @select="handleSelect(ex.id)"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRLearnStore } from '~/stores/rlearn'

const store = useRLearnStore()

const topic = computed(() => store.currentTopic)

function handleSelect (exId: string) {
  store.selectExercise(exId)
}
</script>

<style scoped>
.topic-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Theory window */
.theory-window {
  border-radius: 0;
}

.window-body {
  padding: 18px 20px;
}

.theory-heading {
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 14px;
}

.theory-content {
  font-size: 13px;
  line-height: 1.8;
  color: var(--fg);
}

/* Exercises section */
.exercises-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-heading {
  font-size: 11px;
  letter-spacing: 4px;
  color: var(--magenta);
  text-shadow: 0 0 8px rgba(255, 0, 255, 0.6);
  margin-bottom: 4px;
}
</style>

<!-- Global styles for theory HTML content -->
<style>
.theory-content p        { margin-bottom: 10px; }
.theory-content ul       { padding-left: 20px; }
.theory-content li       { margin-bottom: 4px; }
.theory-content strong   { color: var(--orange); }
.theory-content pre.code-block { margin: 12px 0; }
.theory-content .note-box { margin: 12px 0; }
</style>
