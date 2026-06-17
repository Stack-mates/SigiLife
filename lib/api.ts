/**
 * api — shared response envelopes for route handlers.
 * STATUS: implemented (envelopes + requireViewer + parse helper)
 *
 * Every endpoint returns { data } on success or { error: { code, message } }
 * on failure — see docs/API_CONTRACT.md conventions.
 * - requireViewer(): resolves the acting user via the lib/auth dev shim;
 *   structured so real auth can later throw UNAUTHORIZED without touching callers.
 * - parse(): runs a zod schema's safeParse, mapping failure → VALIDATION envelope.
 *
 * @see docs/API_CONTRACT.md
 */
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { viewerIdFromBearer } from "@/lib/mobile-token";

export type ErrorCode =
  | "NOT_FOUND"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "VALIDATION"
  | "CONFLICT"
  | "LIMIT_REACHED"
  | "NOT_IMPLEMENTED"
  | "INTERNAL";

const STATUS: Record<ErrorCode, number> = {
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  VALIDATION: 400,
  CONFLICT: 409,
  LIMIT_REACHED: 403,
  NOT_IMPLEMENTED: 501,
  INTERNAL: 500,
};

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ data }, init);
}

export function err(code: ErrorCode, message: string) {
  return NextResponse.json({ error: { code, message } }, { status: STATUS[code] });
}

/** Standard stub response — replace with the real handler per API_CONTRACT. */
export function notImplemented(endpoint: string) {
  return err("NOT_IMPLEMENTED", `${endpoint} is a stub — see docs/API_CONTRACT.md`);
}

/**
 * Resolve the acting user (the "viewer") for an API request, in order:
 *   1. a native `Authorization: Bearer <jwt>` token (mobile),
 *   2. the Auth.js cookie session (web) or the dev fallback / enforced 401
 *      (both handled by getCurrentUserId).
 * Callers (route handlers) stay the same regardless of how the user authed.
 */
export async function requireViewer(): Promise<string> {
  const bearerId = await viewerIdFromBearer((await headers()).get("authorization"));
  if (bearerId) return bearerId;
  return getCurrentUserId();
}

/**
 * Validate `data` against a zod schema. On success returns the parsed,
 * fully-typed data; on failure returns a ready-to-return VALIDATION envelope
 * with the schema's issue messages joined.
 */
export function parse<T>(
  schema: z.ZodType<T>,
  data: unknown,
):
  | { ok: true; data: T }
  | { ok: false; response: ReturnType<typeof err> } {
  const result = schema.safeParse(data);
  if (!result.success) {
    const message = result.error.issues
      .map((issue) => {
        const path = issue.path.join(".");
        return path ? `${path}: ${issue.message}` : issue.message;
      })
      .join("; ");
    return { ok: false, response: err("VALIDATION", message || "Invalid input") };
  }
  return { ok: true, data: result.data };
}
