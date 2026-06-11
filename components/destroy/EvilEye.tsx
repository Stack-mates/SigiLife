/**
 * EvilEye — the OGL-rendered eye that watches the destroy ritual.
 * STATUS: stub · "use client" · WebGL (ogl — M5 dep, ADR-006), no SSR
 *
 * v1 contains the complete OGL implementation: 3D eye following the
 * pointer, Perlin-noise shader texture. PORT it; add unmount cleanup
 * (v1 leaked the render loop) and a reduced-motion fallback (static eye).
 *
 * v1 reference: git show main:src/components/.../DestroyComponents/EvilEye.tsx
 * @see docs/features/charge-destroy.md
 */
export function EvilEye() {
  return null;
}
