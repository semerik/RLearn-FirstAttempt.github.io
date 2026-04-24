// server/api/execute.post.ts
// Proxy for rextester.com — executes R code and returns the output
// rextester language ID for R = 31

import type { ExecutePayload, ExecuteResult, RextesterResponse } from '~/types'

export default defineEventHandler(async (event): Promise<ExecuteResult> => {
  const body = await readBody<ExecutePayload>(event)

  if (!body?.code || typeof body.code !== 'string') {
    throw createError({ statusCode: 400, message: 'Missing or invalid code field' })
  }

  // Sanitize: strip shell escapes and system() calls for safety
  const sanitized = body.code
    .replace(/system\s*\(/gi, '# system(')
    .replace(/shell\s*\(/gi,  '# shell(')
    .replace(/Sys\.sleep\s*\(\s*(?:[5-9]\d|\d{3,})/gi, '# Sys.sleep(')

  const formData = new URLSearchParams({
    LanguageChoiceWrapper: '31',      // R
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

    const output = (rextesterRes.Result ?? '').trim()
    const error  = rextesterRes.Errors ? rextesterRes.Errors.trim() : null
    const stats  = rextesterRes.Stats  ? rextesterRes.Stats.trim()  : null

    return { output, error, stats }

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    throw createError({
      statusCode: 502,
      message: `rextester request failed: ${message}`,
    })
  }
})
