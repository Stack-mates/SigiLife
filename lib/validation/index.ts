/**
 * validation — zod schemas for every API input. One schema per endpoint
 * body/query, named as referenced in docs/API_CONTRACT.md.
 * STATUS: partial — updateSigilSchema + voteSchema implemented (M4); remaining schemas are M2/M3/M8
 *
 * What goes here (per milestone, as endpoints are implemented):
 *   createSigilSchema   (M2) name, intention, canvasData, imageData, location?, shareWith?
 *   updateSigilSchema   (M3/M4) name?, locationName?, latitude?, longitude?
 *   voteSchema          (M4) { type: VoteType }
 *   chargeSchema        (M3) { emotion: Emotion }
 *   shareSchema         (M3) { userIds: string[] }
 *   updateUserSchema    (M1) username?, avatar?, theme?, colorTheme?,
 *                            homeLocation?, hasCompletedTutorial?
 *   vectorsSchema       (M2) { characters: string[] }
 *   placementSchema     (M8) sigilId + pos/quaternion numbers
 * Route handlers parse with these BEFORE any logic (CLAUDE.md hard rule #2);
 * lib/api maps ZodError → the VALIDATION envelope.
 *
 * @see docs/API_CONTRACT.md
 */
import { z } from "zod";

// Placeholder so the module is non-empty and zod stays imported; replace
// with the real schemas listed above.
export const placeholderSchema = z.object({});

/** PATCH /api/sigils/[id] — update mutable sigil fields (name, location). */
export const updateSigilSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  locationName: z.string().max(200).optional().nullable(),
  latitude: z.number().min(-90).max(90).optional().nullable(),
  longitude: z.number().min(-180).max(180).optional().nullable(),
});

/** POST /api/sigils/[id]/vote — cast a community vote. */
export const voteSchema = z.object({
  type: z.enum(["CHARGE", "DESTROY"]),
});
