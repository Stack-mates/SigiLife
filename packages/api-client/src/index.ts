/**
 * api-client — typed fetch wrapper over the JSON envelope (lib/api).
 * STATUS: implemented
 *
 * The single client-side path to the REST API. Same-origin on web, so the
 * Auth.js session cookie rides automatically; the native app will set an
 * `Authorization: Bearer <jwt>` header (lib/mobile-token) — this module is the
 * seed of the future packages/api-client both frontends share (ADR-016).
 *
 * Unwraps `{data}` on success; throws ApiError carrying the envelope's
 * `{code, message}` on failure so callers can branch on e.g. LIMIT_REACHED.
 *
 * @see docs/API_CONTRACT.md, lib/api.ts
 */
export class ApiError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.code = code;
  }
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(path, {
    method,
    headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    /* empty/non-JSON body */
  }

  if (!res.ok || (json !== null && typeof json === "object" && "error" in json)) {
    const e = (json as { error?: { code?: string; message?: string } } | null)?.error;
    throw new ApiError(e?.code ?? "INTERNAL", e?.message ?? `Request failed (${res.status})`);
  }

  return (json as { data: T }).data;
}

export const api = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
  patch: <T>(path: string, body?: unknown) => request<T>("PATCH", path, body),
  del: <T>(path: string) => request<T>("DELETE", path),
};
