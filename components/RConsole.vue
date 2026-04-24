<template>
  <section class="console-wrap" aria-label="Consola R interactiva">
    <!-- Console header -->
    <div class="console-header">
      <div class="console-left">
        <span class="console-title font-head">◈ CONSOLA R INTERACTIVA</span>
        <span class="api-badge font-mono">WebR (in-browser)</span>
      </div>

      <div class="console-right">
        <!-- Action buttons -->
        <button
          class="btn btn-primary"
          :disabled="store.isExecuting || store.isValidating || !code.trim()"
          @click="onRun"
        >
          <span>▶</span> EJECUTAR
        </button>

        <button
          v-if="store.currentExercise"
          class="btn btn-secondary"
          :disabled="store.isExecuting || store.isValidating || !code.trim()"
          @click="onValidate"
        >
          ◈ VALIDAR
        </button>

        <button
          v-if="store.currentExercise"
          class="btn btn-warning"
          @click="store.toggleHint()"
        >
          ? PISTA
        </button>

        <button class="btn btn-ghost" @click="store.clearOutput()">
          ✕ LIMPIAR
        </button>
      </div>
    </div>

    <!-- Console body: editor | output -->
    <div class="console-body">
      <!-- Code editor pane -->
      <div class="editor-pane">
        <div class="pane-label font-mono">EDITOR</div>
        <textarea
          ref="editorRef"
          class="code-editor font-mono"
          v-model="code"
          placeholder="# Escribe tu código R aquí..."
          spellcheck="false"
          autocomplete="off"
          autocorrect="off"
          @keydown.tab.prevent="insertTab"
          @keydown.ctrl.enter.prevent="onRun"
          @keydown.meta.enter.prevent="onRun"
        />
        <div class="editor-footer font-mono">
          <span>Ctrl+Enter → ejecutar</span>
          <span v-if="store.isExecuting" class="running-indicator cursor-blink">
            ● ejecutando...
          </span>
          <span v-else-if="store.isValidating" class="running-indicator cursor-blink">
            ● validando...
          </span>
        </div>
      </div>

      <!-- Output pane -->
      <div class="output-pane">
        <div class="pane-label font-mono">OUTPUT</div>
        <div class="output-area" ref="outputRef">
          <div
            v-for="line in store.output"
            :key="line.id"
            :class="['out-line-wrap', `out-${line.kind}`]"
          >
            {{ line.text }}
          </div>
          <!-- Blinking cursor at end -->
          <div class="out-system cursor-blink">▌</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRLearnStore } from '~/stores/rlearn'
import { useRExecutor }   from '~/composables/useRExecutor'

const store = useRLearnStore()
const { executeCode, validateCode } = useRExecutor()

const code      = ref(store.codeEditorContent)
const editorRef = ref<HTMLTextAreaElement | null>(null)
const outputRef = ref<HTMLElement | null>(null)

// Sync store code when exercise changes
watch(() => store.currentExerciseId, () => {
  // Don't wipe if user has content — only set a starter comment
  if (!code.value.trim() || code.value.startsWith('# Escribe')) {
    const ex = store.currentExercise
    if (ex) {
      code.value = `# ${ex.title}\n\n`
    }
  }
})

// Auto-scroll output on new lines
watch(() => store.output.length, async () => {
  await nextTick()
  if (outputRef.value) {
    outputRef.value.scrollTop = outputRef.value.scrollHeight
  }
})

// Keep store in sync (for composable access)
watch(code, v => store.setCode(v))

function insertTab (e: KeyboardEvent) {
  const el = e.target as HTMLTextAreaElement
  const start = el.selectionStart
  const end   = el.selectionEnd
  code.value = code.value.substring(0, start) + '  ' + code.value.substring(end)
  nextTick(() => {
    el.selectionStart = el.selectionEnd = start + 2
  })
}

async function onRun () {
  await executeCode(code.value)
}

async function onValidate () {
  await validateCode(code.value)
}
</script>

<style scoped>
.console-wrap {
  display: flex;
  flex-direction: column;
  height: 340px;
  min-height: 340px;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.88);
  border-top: 2px solid var(--border-dim);
}

/* Header */
.console-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  border-bottom: 1px solid var(--border-dim);
  background: rgba(0, 0, 0, 0.95);
  flex-shrink: 0;
  gap: 10px;
}

.console-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.console-title {
  font-size: 10px;
  letter-spacing: 3px;
  color: var(--magenta);
  text-shadow: 0 0 8px rgba(255, 0, 255, 0.5);
}

.api-badge {
  font-size: 9px;
  color: rgba(224, 224, 224, 0.3);
  border: 1px solid var(--border-dim);
  padding: 1px 7px;
  letter-spacing: 1px;
}

.console-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Body */
.console-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* Editor pane */
.editor-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-dim);
  min-width: 0;
}

.pane-label {
  font-size: 9px;
  letter-spacing: 3px;
  color: rgba(224, 224, 224, 0.3);
  padding: 4px 10px;
  border-bottom: 1px solid var(--border-dim);
  background: rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
}

.code-editor {
  flex: 1;
  background: #000;
  color: #a8ff78;
  border: none;
  outline: none;
  resize: none;
  padding: 12px 14px;
  font-size: 12px;
  line-height: 1.75;
  tab-size: 2;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--border-dim) transparent;
}

.code-editor::placeholder { color: rgba(168, 255, 120, 0.25); }

.editor-footer {
  font-size: 9px;
  color: rgba(224, 224, 224, 0.3);
  padding: 4px 10px;
  border-top: 1px solid var(--border-dim);
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  letter-spacing: 1px;
}

.running-indicator { color: var(--orange); }

/* Output pane */
.output-pane {
  width: 44%;
  min-width: 220px;
  display: flex;
  flex-direction: column;
}

.output-area {
  flex: 1;
  background: #000;
  padding: 10px 12px;
  font-size: 11.5px;
  line-height: 1.65;
  overflow-y: auto;
  word-break: break-word;
  scrollbar-width: thin;
  scrollbar-color: var(--border-dim) transparent;
}

.out-line-wrap {
  white-space: pre-wrap;
  margin-bottom: 1px;
}
</style>
