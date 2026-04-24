// ============================================================
// R//LEARN — Shared Types
// ============================================================

export interface Exercise {
  id: string
  title: string
  description: string        // HTML allowed
  expected: string           // expected console output (trimmed)
  tolerance?: number         // optional numeric tolerance (default 0.01)
  hint: string
}

export interface Topic {
  id: string
  name: string
  theory: string             // HTML content
  exercises: Exercise[]
}

export interface Module {
  id: string
  num: string
  name: string
  description: string
  topics: Topic[]
}

// ── Console ──────────────────────────────────────────────────
export type OutputKind = 'line' | 'error' | 'system' | 'success' | 'fail' | 'warn'

export interface OutputLine {
  id: string
  text: string
  kind: OutputKind
}

// ── Execution (rextester response) ──────────────────────────
export interface RextesterResponse {
  Result: string | null
  Errors: string | null
  Warnings: string | null
  Stats: string | null
  Files: null
}

// ── API payloads ─────────────────────────────────────────────
export interface ExecutePayload {
  code: string
}

export interface ExecuteResult {
  output: string
  error: string | null
  stats: string | null
}

export interface ValidatePayload {
  code: string
  expected: string
  tolerance?: number
}

export interface ValidateResult {
  correct: boolean
  output: string
  error: string | null
  feedback: string
}

// ── Progress ─────────────────────────────────────────────────
export interface Progress {
  [exerciseId: string]: boolean
}
