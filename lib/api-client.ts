export type FieldErrors = Record<string, string | string[]>

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly fieldErrors?: FieldErrors,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

type ApiErrorBody = {
  message?: string
  error?: string
  fieldErrors?: FieldErrors
}

type ApiFetchOptions = RequestInit & {
  redirectOnUnauthorized?: boolean
}

export async function apiFetch(input: RequestInfo | URL, options: ApiFetchOptions = {}) {
  const { redirectOnUnauthorized = true, ...requestInit } = options
  const response = await fetch(input, { credentials: 'include', ...requestInit })

  if (response.status === 401 && redirectOnUnauthorized && typeof window !== 'undefined') {
    window.location.replace('/session-expired')
  }

  if (response.ok) return response

  let body: ApiErrorBody = {}
  try {
    body = (await response.json()) as ApiErrorBody
  } catch {
    // Non-JSON responses use the status text below.
  }

  throw new ApiError(
    body.message ?? body.error ?? (response.statusText || 'Request failed.'),
    response.status,
    body.fieldErrors,
  )
}

export async function apiJson<T>(input: RequestInfo | URL, options: ApiFetchOptions = {}) {
  const response = await apiFetch(input, options)
  return (await response.json()) as T
}
