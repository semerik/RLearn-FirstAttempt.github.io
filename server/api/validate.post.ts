// server/api/validate.post.ts
// Executes user's R code and compares output with expected result

import type { ValidatePayload, ValidateResult, RextesterResponse } from '~/types'

// ── Helpers ───────────────────────────────────────────────────────────────────

function normalizeOutput (raw: string): string {
  return raw
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Remove R's "[1]" index annotations for comparison
    .replace(/^\[\d+\]\s*/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractNumbers (text: string): number[] {
  return [...text.matchAll(/-?\d+\.?\d*(?:[eE][+-]?\d+)?/g)]
    .map(m => parseFloat(m[0]))
    .filter(n => !isNaN(n))
}

function compareOutputs (got: string, expected: string, tolerance = 0.01): boolean {
  const normGot = normalizeOutput(got)
  const normExp = normalizeOutput(expected)

  // Exact match after normalisation
  if (normGot === normExp) return true

  // Case-insensitive string match
  if (normGot.toLowerCase() === normExp.toLowerCase()) return true

  // Numeric tolerance comparison
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

  // Single number check (student may have extra text around it)
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

// ── Handler ───────────────────────────────────────────────────────────────────

export default defineEventHandler(async (event): Promise<ValidateResult> => {
  const body = await readBody<ValidatePayload>(event)

  if (!body?.code || !body?.expected) {
    throw createError({ statusCode: 400, message: 'Missing code or expected fields' })
  }

  const sanitized = body.code
    .replace(/system\s*\(/gi, '# system(')
    .replace(/shell\s*\(/gi,  '# shell(')

  const formData = new URLSearchParams({
    LanguageChoiceWrapper: '31',
    Program: sanitized,
    Input: '',
    CompilerArgs: '',
  })

  try {
    const rextesterRes = await $fetch<RextesterResponse>(
      'https://rextester.com/rundotnet/api',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
        timeout: 15000,
      }
    )

    const rawOutput = (rextesterRes.Result ?? '').trim()
    const rawError  = rextesterRes.Errors ? rextesterRes.Errors.trim() : null

    // If there's an error, it can't be correct
    if (rawError && !rawOutput) {
      return {
        correct: false,
        output:  rawOutput,
        error:   rawError,
        feedback: `Error de ejecución: ${rawError.substring(0, 120)}`,
      }
    }

    const correct  = compareOutputs(rawOutput, body.expected, body.tolerance ?? 0.01)
    const feedback = buildFeedback(correct, rawOutput, body.expected)

    return { correct, output: rawOutput, error: rawError, feedback }

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    throw createError({
      statusCode: 502,
      message: `rextester request failed: ${message}`,
    })
  }
})
