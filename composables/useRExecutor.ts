// composables/useRExecutor.ts
// Runs R code in-browser using WebR and validates output locally.

import { useRLearnStore } from '~/stores/rlearn'

interface LocalExecuteResult {
  output: string
  error: string | null
  stats: string | null
}

let webRInstancePromise: Promise<any> | null = null

async function getWebR () {
  if (!import.meta.client) {
    throw new Error('WebR solo está disponible en el navegador.')
  }
  if (!webRInstancePromise) {
    webRInstancePromise = (async () => {
      const { WebR } = await import('webr')
      const webR = new WebR()
      await webR.init()
      return webR
    })()
  }
  return webRInstancePromise
}

async function runRWithWebR (code: string): Promise<LocalExecuteResult> {
  const webR = await getWebR()
  const markerOut = '___WEBR_OUT___'
  const markerErr = '___WEBR_ERR___'

  // Capture visible R console output deterministically.
  const wrappedCode = `
local({
  .webr_output <- character()
  .webr_error <- ""
  tryCatch({
    .webr_output <- capture.output({
${code}
    }, type = "output")
  }, error = function(e) {
    .webr_error <<- conditionMessage(e)
  })
  paste0("${markerOut}", paste(.webr_output, collapse = "\\n"), "${markerErr}", .webr_error)
})
`

  try {
    const payload = await webR.evalRString(wrappedCode)
    const outParts = payload.split(markerOut)
    const body = outParts.length > 1 ? outParts.slice(1).join(markerOut) : payload
    const errParts = body.split(markerErr)
    const output = (errParts[0] ?? '').trim()
    const error = (errParts[1] ?? '').trim() || null
    return { output, error, stats: null }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return { output: '', error: message, stats: null }
  }
}

function normalizeOutput (raw: string): string {
  return raw
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/^\[\d+\]\s*/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractNumbers (text: string): number[] {
  return [...text.matchAll(/-?\d+\.?\d*(?:[eE][+-]?\d+)?/g)]
    .map(m => parseFloat(m[0]))
    .filter(n => !Number.isNaN(n))
}

function compareOutputs (got: string, expected: string, tolerance = 0.01): boolean {
  const normGot = normalizeOutput(got)
  const normExp = normalizeOutput(expected)

  if (normGot === normExp) return true
  if (normGot.toLowerCase() === normExp.toLowerCase()) return true

  const numsGot = extractNumbers(normGot)
  const numsExp = extractNumbers(normExp)

  if (numsGot.length > 0 && numsGot.length === numsExp.length) {
    const withinTolerance = numsGot.every((g, i) => {
      const e = numsExp[i]
      if (e === 0) return Math.abs(g) <= tolerance
      return Math.abs((g - e) / e) <= tolerance || Math.abs(g - e) <= tolerance
    })
    if (withinTolerance) return true
  }

  if (numsExp.length === 1 && numsGot.length >= 1) {
    const e = numsExp[0]
    const matched = numsGot.some(g => {
      if (e === 0) return Math.abs(g) <= tolerance
      return Math.abs((g - e) / e) <= tolerance || Math.abs(g - e) <= tolerance
    })
    if (matched) return true
  }

  return false
}

function buildFeedback (correct: boolean, got: string, expected: string): string {
  if (correct) {
    const msgs = [
      '¡Perfecto! Tu código produce el resultado esperado.',
      '¡Excelente! Solución correcta.',
      '¡Correcto! Sigue así.',
      '¡Muy bien! Resultado validado.',
    ]
    return msgs[Math.floor(Math.random() * msgs.length)]
  }
  const normGot = normalizeOutput(got)
  const normExp = normalizeOutput(expected)
  if (!normGot) return 'Tu código no produjo ninguna salida. Recuerda usar print() o cat().'
  return `Resultado obtenido: "${normGot.substring(0, 80)}" — Esperado: "${normExp.substring(0, 80)}"`
}

export function useRExecutor () {
  const store = useRLearnStore()

  // ── Execute ──────────────────────────────────────────────
  async function executeCode (code: string): Promise<void> {
    if (store.isExecuting || !code.trim()) return

    store.isExecuting = true
    store.addOutput('', 'system')
    store.addOutput(`> Ejecutando...`, 'system')

    try {
      const result = await runRWithWebR(code)

      if (result.output) {
        store.addOutput(result.output, 'line')
      }
      if (result.error) {
        store.addOutput(result.error, 'error')
      }
      if (!result.output && !result.error) {
        store.addOutput('[sin output visible]', 'warn')
      }
      if (result.stats) {
        store.addOutput(result.stats, 'system')
      }

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error desconocido'
      store.addOutput(`Error de red: ${msg}`, 'error')
    } finally {
      store.isExecuting = false
    }
  }

  // ── Validate ─────────────────────────────────────────────
  async function validateCode (code: string): Promise<void> {
    const exercise = store.currentExercise
    if (!exercise || store.isValidating || !code.trim()) return

    store.isValidating = true
    store.addOutput('', 'system')
    store.addOutput('> Validando respuesta...', 'system')

    try {
      const result = await runRWithWebR(code)

      // Show output
      if (result.output) {
        store.addOutput(result.output, 'line')
      }
      if (result.error) {
        store.addOutput(result.error, 'error')
      }

      // Show validation result
      store.addOutput('─────────────────────────────────────────', 'system')
      const correct = !result.error && compareOutputs(result.output, exercise.expected, exercise.tolerance ?? 0.01)
      const feedback = result.error
        ? `Error de ejecución: ${result.error.substring(0, 120)}`
        : buildFeedback(correct, result.output, exercise.expected)

      if (correct) {
        store.addOutput('◈ CORRECTO ◈ ' + feedback, 'success')
        if (!store.completed[exercise.id]) {
          store.markComplete(exercise.id)
          store.addOutput('★ ¡Ejercicio completado! Progreso guardado.', 'success')
        }
      } else {
        store.addOutput('✗ INCORRECTO — ' + feedback, 'fail')
      }

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error desconocido'
      store.addOutput(`Error de red: ${msg}`, 'error')
    } finally {
      store.isValidating = false
    }
  }

  return { executeCode, validateCode }
}
