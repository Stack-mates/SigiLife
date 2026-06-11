/**
 * validation — zod schemas for every API input. One schema per endpoint
 * body/query, named as referenced in docs/API_CONTRACT.md.
 * STATUS: stub
 *
 * What goes here (per milestone, as endpoints are implemented):
 *   createSigilSchema   (M2) name, intention, canvasData, imageData, location?, shareWith?
 *   updateSigilSchema   (M3) name?, location?
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
