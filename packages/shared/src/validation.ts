/**
 * validation — zod schemas for every API input. One schema per endpoint
 * body/query, named as referenced in docs/API_CONTRACT.md.
 * STATUS: implemented — M1/M2/M3/M4 schemas present (vectorsSchema/placementSchema remain for M8)
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

/** PATCH /api/user — update the viewer's profile/preferences. */
export const updateUserSchema = z.object({
  username: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-zA-Z0-9_]+$/)
    .optional(),
  avatar: z.number().int().min(0).max(20).optional(),
  theme: z.enum(["LIGHT", "DARK"]).optional(),
  colorTheme: z.enum(["FOLIAGE", "CYBER"]).optional(),
  homeLocation: z
    .object({ lat: z.number(), lng: z.number(), name: z.string() })
    .nullable()
    .optional(),
  hasCompletedTutorial: z.boolean().optional(),
});

/** POST /api/sigils/[id]/charge — empower a sigil with a chosen emotion. */
export const chargeSchema = z.object({
  emotion: z.enum(["HOPE", "GRIEF", "RELIEF", "JOY", "LONGING"]),
});

/** POST /api/sigils/[id]/share — share a sigil with SigiFriends. */
export const shareSchema = z.object({
  userIds: z.array(z.string()).min(1).max(50),
});

/** POST /api/sigils — create a new sigil. */
export const createSigilSchema = z.object({
  name: z.string().min(1).max(100),
  intention: z.string().max(280).optional(),
  canvasData: z.unknown().optional(),
  imageData: z.string().optional(),
  style: z
    .object({ color: z.string(), ring: z.boolean(), glow: z.boolean() })
    .optional(),
  locationName: z.string().max(200).nullable().optional(),
  latitude: z.number().min(-90).max(90).nullable().optional(),
  longitude: z.number().min(-180).max(180).nullable().optional(),
  shareWith: z.array(z.string()).optional(),
});

/** GET /api/users?q= — search users to follow/share with. */
export const userSearchSchema = z.object({
  q: z.string().min(2).max(100),
});

/** GET /api/user/follows?direction= — list follower/following/mutual edges. */
export const followsQuerySchema = z.object({
  direction: z.enum(["followers", "following", "mutual"]).default("following"),
});
