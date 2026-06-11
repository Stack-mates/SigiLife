/**
 * api — shared response envelopes for route handlers.
 * STATUS: stub (envelope helpers are real; extend as needed)
 *
 * Every endpoint returns { data } on success or { error: { code, message } }
 * on failure — see docs/API_CONTRACT.md conventions. Add here (M1+):
 * - requireSession(): session-or-401 helper wrapping lib/auth
 * - zod parse helper mapping ZodError → VALIDATION envelope
 *
 * @see docs/API_CONTRACT.md
 */
import { NextResponse } from "next/server";

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
