import { defineStore } from 'pinia'
import type { Module, Topic, Exercise, OutputLine, OutputKind } from '~/types'
import { MODULES } from '~/data/modules'

interface State {
  modules: Module[]
  currentModuleId: string | null
  currentTopicId:  string | null
  currentExerciseId: string | null
  expandedModules: Record<string, boolean>
  completed: Record<string, boolean>      // exerciseId -> true
  output: OutputLine[]
  isExecuting: boolean
  isValidating: boolean
  hintVisible: boolean
  activeView: 'learn' | 'progress'
  codeEditorContent: string
}

let _lineId = 0
const uid = () => String(++_lineId)

export const useRLearnStore = defineStore('rlearn', {
  state: (): State => ({
    modules: MODULES,
    currentModuleId: null,
    currentTopicId: null,
    currentExerciseId: null,
    expandedModules: {},
    completed: {},
    output: [
      { id: uid(), text: 'R//LEARN Terminal v2.0 inicializado.', kind: 'system' },
      { id: uid(), text: 'Runtime: WebR (local) · Lenguaje: R', kind: 'system' },
      { id: uid(), text: '─────────────────────────────────────────', kind: 'system' },
    ],
    isExecuting: false,
    isValidating: false,
    hintVisible: false,
    activeView: 'learn',
    codeEditorContent: '# Escribe tu código R aquí\nx <- c(1, 2, 3)\nmean(x)\n',
  }),

  getters: {
    currentModule: (s): Module | null =>
      s.modules.find(m => m.id === s.currentModuleId) ?? null,

    currentTopic: (s): Topic | null => {
      const mod = s.modules.find(m => m.id === s.currentModuleId)
      return mod?.topics.find(t => t.id === s.currentTopicId) ?? null
    },

    currentExercise: (s): Exercise | null => {
      const mod = s.modules.find(m => m.id === s.currentModuleId)
      const top = mod?.topics.find(t => t.id === s.currentTopicId)
      return top?.exercises.find(e => e.id === s.currentExerciseId) ?? null
    },

    totalExercises: (s): number =>
      s.modules.reduce((acc, m) =>
        acc + m.topics.reduce((a, t) => a + t.exercises.length, 0), 0),

    completedCount: (s): number => Object.keys(s.completed).length,

    progressPercent (): number {
      return this.totalExercises
        ? Math.round((this.completedCount / this.totalExercises) * 100)
        : 0
    },

    moduleProgress: (s) => (modId: string): { done: number; total: number } => {
      const mod = s.modules.find(m => m.id === modId)
      if (!mod) return { done: 0, total: 0 }
      let total = 0, done = 0
      mod.topics.forEach(t => t.exercises.forEach(e => {
        total++
        if (s.completed[e.id]) done++
      }))
      return { done, total }
    },

    topicProgress: (s) => (modId: string, topicId: string): { done: number; total: number } => {
      const mod = s.modules.find(m => m.id === modId)
      const topic = mod?.topics.find(t => t.id === topicId)
      if (!topic) return { done: 0, total: 0 }
      const total = topic.exercises.length
      const done  = topic.exercises.filter(e => s.completed[e.id]).length
      return { done, total }
    },
  },

  actions: {
    // ── Navigation ──────────────────────────────────────────
    selectTopic (modId: string, topicId: string) {
      this.currentModuleId   = modId
      this.currentTopicId    = topicId
      this.currentExerciseId = null
      this.hintVisible       = false
      this.expandedModules[modId] = true

      // Auto-select first exercise
      const mod   = this.modules.find(m => m.id === modId)
      const topic = mod?.topics.find(t => t.id === topicId)
      if (topic?.exercises.length) {
        this.selectExercise(topic.exercises[0].id)
      }
    },

    selectExercise (exId: string) {
      this.currentExerciseId = exId
      this.hintVisible = false
      this.addOutput(`> Ejercicio: ${this.currentExercise?.title ?? exId}`, 'system')
    },

    toggleModule (modId: string) {
      this.expandedModules[modId] = !this.expandedModules[modId]
    },

    setView (view: 'learn' | 'progress') {
      this.activeView = view
    },

    toggleHint () {
      this.hintVisible = !this.hintVisible
    },

    // ── Output ───────────────────────────────────────────────
    addOutput (text: string, kind: OutputKind = 'line') {
      text.split('\n').forEach(line => {
        this.output.push({ id: uid(), text: line, kind })
      })
    },

    clearOutput () {
      this.output = [
        { id: uid(), text: 'Terminal limpiado.', kind: 'system' },
        { id: uid(), text: '─────────────────────────────────────────', kind: 'system' },
      ]
    },

    // ── Progress ─────────────────────────────────────────────
    markComplete (exId: string) {
      this.completed[exId] = true
      this.persistProgress()
    },

    persistProgress () {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('rl_progress', JSON.stringify(this.completed))
      }
    },

    loadProgress () {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem('rl_progress')
        if (raw) {
          try { this.completed = JSON.parse(raw) } catch { /**/ }
        }
      }
    },

    resetProgress () {
      this.completed = {}
      this.persistProgress()
    },

    // ── Code editor ──────────────────────────────────────────
    setCode (code: string) {
      this.codeEditorContent = code
    },
  },
})
