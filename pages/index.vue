<template>
  <div class="page-wrap">
    <!-- ── TOP HEADER ─────────────────────────────────────── -->
    <AppHeader />

    <!-- ── BODY ──────────────────────────────────────────── -->
    <div class="page-body">
      <!-- Learn view: sidebar + content + console -->
      <template v-if="store.activeView === 'learn'">
        <ModuleSidebar class="sidebar" />
        <div class="content-col">
          <div class="theory-area" ref="theoryArea">
            <WelcomeScreen v-if="!store.currentTopicId" />
            <TopicView     v-else />
          </div>
          <RConsole />
        </div>
      </template>

      <!-- Progress view -->
      <ProgressView v-else class="progress-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRLearnStore } from '~/stores/rlearn'

const store = useRLearnStore()
const theoryArea = ref<HTMLElement | null>(null)

// Scroll theory to top when topic changes
watch(() => store.currentTopicId, () => {
  nextTick(() => {
    if (theoryArea.value) theoryArea.value.scrollTop = 0
  })
})
</script>

<style scoped>
.page-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  position: relative;
  z-index: 10;
}

.page-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 268px;
  min-width: 268px;
  flex-shrink: 0;
}

.content-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

.theory-area {
  flex: 1;
  overflow-y: auto;
  padding: 24px 28px;
  scrollbar-width: thin;
  scrollbar-color: var(--border-dim) var(--void);
}

.progress-full {
  flex: 1;
  overflow-y: auto;
}
</style>
