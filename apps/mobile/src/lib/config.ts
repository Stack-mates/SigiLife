/**
 * Mobile API config — points the shared @sigilife/api-client at the SigiLife
 * server and (later) attaches the Bearer token. Imported for its side effect
 * by the root layout so every screen's API call is configured.
 *
 * Set EXPO_PUBLIC_API_URL to the server origin reachable from the device:
 *   - simulator:  http://localhost:3000
 *   - LAN device: http://<your-machine-ip>:3000   (e.g. http://192.168.1.200:3000)
 *   - production: https://sigi.life
 */
import { configureApi } from "@sigilife/api-client";

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

configureApi({ baseUrl: API_BASE_URL });
// Auth: once native Google sign-in lands, set getAuthHeader here to read the
// Bearer token (minted by POST /api/auth/mobile) from expo-secure-store.
