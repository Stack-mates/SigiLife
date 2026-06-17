/**
 * @sigilife/api-client — typed fetch wrapper over the JSON envelope (lib/api).
 * STATUS: implemented
 *
 * The one client-side path to the REST API, shared by web + mobile (ADR-016).
 * - Web: defaults are zero-config — relative paths, same-origin, so the Auth.js
 *   session cookie rides automatically.
 * - Mobile (RN): call configureApi({ baseUrl, getAuthHeader }) once at startup
 *   to point at the server and attach `Authorization: Bearer <jwt>` (the token
 *   minted by POST /api/auth/mobile).
 *
 * Unwraps `{data}` on success; throws ApiError carrying the envelope's
 * `{code, message}` on failure so callers can branch on e.g. LIMIT_REACHED.
 *
 * @see docs/API_CONTRACT.md, lib/api.ts, lib/mobile-token.ts
 */
export class ApiError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.code = code;
  }
}

type ApiConfig = {
  /** Prefixed to every path. "" (web, same-origin) by default. */
  baseUrl: string;
  /** Returns an Authorization header value (e.g. "Bearer …") or null. */
  getAuthHeader?: () => string | null | Promise<string | null>;
};

const config: ApiConfig = { baseUrl: "" };

/** Configure the client (mobile sets baseUrl + getAuthHeader; web needs neither). */
export function configureApi(opts: Partial<ApiConfig>): void {
  if (opts.baseUrl !== undefined) config.baseUrl = opts.baseUrl;
  if (opts.getAuthHeader !== undefined) config.getAuthHeader = opts.getAuthHeader;
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (config.getAuthHeader) {
    const auth = await config.getAuthHeader();
    if (auth) headers["Authorization"] = auth;
  }

  const res = await fetch(`${config.baseUrl}${path}`, {
    method,
    headers: Object.keys(headers).length ? headers : undefined,
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
