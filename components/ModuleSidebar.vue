<template>
  <aside class="sidebar-wrap">
    <div
      v-for="mod in store.modules"
      :key="mod.id"
      class="module-group"
    >
      <!-- Module header (clickable) -->
      <button
        class="module-header btn"
        @click="store.toggleModule(mod.id)"
        :aria-expanded="!!store.expandedModules[mod.id]"
      >
        <span class="mod-label font-head">MOD {{ mod.num }}</span>
        <span class="mod-chevron">{{ store.expandedModules[mod.id] ? '▼' : '▶' }}</span>
      </button>

      <!-- Module card -->
      <div
        class="module-card"
        :class="{ active: store.currentModuleId === mod.id }"
        @click="selectFirstTopic(mod.id)"
      >
        <div class="mod-meta">
          <span class="mod-progress font-mono">
            {{ moduleProgress(mod.id).done }}/{{ moduleProgress(mod.id).total }}
          </span>
          <div class="progress-track" style="width:60px">
            <div
              class="progress-fill"
              :style="{ width: moduleProgressPct(mod.id) + '%' }"
            />
          </div>
        </div>
        <div class="mod-name font-head">{{ mod.name }}</div>
        <div class="mod-desc font-mono">{{ mod.description }}</div>
      </div>

      <!-- Topic list (expanded) -->
      <transition name="slide">
        <ul v-if="store.expandedModules[mod.id]" class="topic-list">
          <li
            v-for="topic in mod.topics"
            :key="topic.id"
            class="topic-item font-mono"
            :class="{
              active: store.currentTopicId === topic.id,
              done: topicAllDone(mod.id, topic.id),
            }"
            @click="store.selectTopic(mod.id, topic.id)"
          >
            <span class="topic-icon">
              {{ topicAllDone(mod.id, topic.id) ? '✓' : '◦' }}
            </span>
            <span class="topic-name">{{ topic.name }}</span>
            <span class="topic-count">
              {{ topicProgress(mod.id, topic.id).done }}/{{ topicProgress(mod.id, topic.id).total }}
            </span>
          </li>
        </ul>
      </transition>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRLearnStore } from '~/stores/rlearn'

const store = useRLearnStore()

function moduleProgress (modId: string) {
  return store.moduleProgress(modId)
}

function moduleProgressPct (modId: string): number {
  const { done, total } = store.moduleProgress(modId)
  return total ? Math.round((done / total) * 100) : 0
}

function topicProgress (modId: string, topicId: string) {
  return store.topicProgress(modId, topicId)
}

function topicAllDone (modId: string, topicId: string): boolean {
  const { done, total } = store.topicProgress(modId, topicId)
  return total > 0 && done === total
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
.sidebar-wrap {
  border-right: 2px solid var(--border-dim);
  background: rgba(9, 0, 20, 0.97);
  overflow-y: auto;
  padding: 12px 0 24px;
  scrollbar-width: thin;
  scrollbar-color: var(--border-dim) transparent;
}

/* Module header toggle */
.module-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px 6px;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border-dim);
  cursor: pointer;
  color: var(--orange);
  font-size: 9px;
  letter-spacing: 4px;
  text-transform: uppercase;
  transition: background 0.12s;
}
.module-header:hover { background: rgba(255, 153, 0, 0.06); }

.mod-chevron { font-size: 8px; color: var(--orange); }

/* Module card */
.module-card {
  padding: 10px 16px 10px 16px;
  border-left: 3px solid transparent;
  cursor: pointer;
  transition: all 0.12s;
}
.module-card:hover  { background: rgba(255, 0, 255, 0.07); border-left-color: var(--magenta); }
.module-card.active { background: rgba(0, 255, 255, 0.07); border-left-color: var(--cyan); }

.mod-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
.mod-progress { font-size: 9px; color: var(--orange); letter-spacing: 1px; }

.mod-name {
  font-size: 12px;
  font-weight: 700;
  color: var(--fg);
  letter-spacing: 1px;
  margin-bottom: 2px;
}

.mod-desc {
  font-size: 10px;
  color: rgba(224, 224, 224, 0.45);
  letter-spacing: 1px;
}

/* Topic list */
.topic-list {
  list-style: none;
  border-bottom: 1px solid var(--border-dim);
  margin-bottom: 4px;
}

.topic-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px 7px 28px;
  font-size: 11px;
  color: rgba(224, 224, 224, 0.55);
  border-left: 3px solid transparent;
  cursor: pointer;
  transition: all 0.12s;
}

.topic-item:hover {
  color: var(--cyan);
  background: rgba(0, 255, 255, 0.05);
}

.topic-item.active {
  color: var(--cyan);
  border-left-color: var(--cyan);
  background: rgba(0, 255, 255, 0.09);
}

.topic-item.done { color: rgba(0, 255, 255, 0.45); }
.topic-item.done .topic-icon { color: var(--cyan); }

.topic-icon { font-size: 10px; flex-shrink: 0; }
.topic-name { flex: 1; }
.topic-count { font-size: 9px; color: var(--orange); letter-spacing: 1px; }

/* Transition */
.slide-enter-active,
.slide-leave-active { transition: max-height 0.2s ease, opacity 0.2s; overflow: hidden; }
.slide-enter-from,
.slide-leave-to { max-height: 0; opacity: 0; }
.slide-enter-to,
.slide-leave-from { max-height: 400px; opacity: 1; }
</style>
