/**
 * Prisma seed — demo fixtures for morning verification.
 * STATUS: implemented
 *
 * v1 seeded letterform vectors into an SvgVector table; the rebuild traces
 * glyphs at runtime instead (ADR-008, lib/sigil/traceGlyphs.ts), so that
 * pipeline is gone. This file now seeds a handful of demo seekers so the
 * social surfaces (UserSearch / FollowButton / FriendsList) plus the scrying
 * mirror (a sigil harper shares with you) are demoable against a real
 * database before Google auth exists.
 *
 * Idempotent: users upsert by email, follow edges use the unique
 * (followerId, followingId) constraint, and the shared sigil is keyed by
 * (owner, name), so re-running is safe.
 *
 * Run with: npm run db:seed   (or: npx tsx prisma/seed.ts)
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// The dev-identity shim's user (lib/auth.ts). Seeding it here means the seed
// can wire demo follow edges to/from "you" without depending on app boot.
const DEV_USER_EMAIL = "dev@sigilife.local";

type DemoUser = {
  email: string;
  name: string;
  username: string;
  avatar: number;
  colorTheme: "FOLIAGE" | "CYBER";
};

const DEMO_USERS: DemoUser[] = [
  { email: "harper@sigilife.local", name: "Harper", username: "harper", avatar: 0, colorTheme: "FOLIAGE" },
  { email: "bennet@sigilife.local", name: "Bennet", username: "bennet", avatar: 1, colorTheme: "CYBER" },
  { email: "wren@sigilife.local", name: "Wren", username: "wren", avatar: 0, colorTheme: "FOLIAGE" },
];

async function upsertUser(u: {
  email: string;
  name: string;
  username: string;
  avatar: number;
  colorTheme?: "FOLIAGE" | "CYBER";
}) {
  return prisma.user.upsert({
    where: { email: u.email },
    update: { name: u.name, username: u.username, avatar: u.avatar },
    create: {
      email: u.email,
      name: u.name,
      username: u.username,
      avatar: u.avatar,
      ...(u.colorTheme ? { colorTheme: u.colorTheme } : {}),
      hasCompletedTutorial: true,
    },
  });
}

/** Idempotent follow edge (relies on @@unique([followerId, followingId])). */
async function follow(followerId: string, followingId: string) {
  if (followerId === followingId) return;
  await prisma.follow.upsert({
    where: { followerId_followingId: { followerId, followingId } },
    update: {},
    create: { followerId, followingId },
  });
}

/**
 * Idempotent: ensure `owner` has a demo sigil and has shared it with
 * `recipient` — so the scrying mirror (received SigilShare) has something to
 * show. Keyed by (owner, name) since Sigil has no natural unique column.
 */
async function ensureSharedSigil(ownerId: string, recipientId: string) {
  const name = "Tended Garden";
  let sigil = await prisma.sigil.findFirst({ where: { userId: ownerId, name } });
  if (!sigil) {
    sigil = await prisma.sigil.create({
      data: {
        userId: ownerId,
        name,
        intention: "I tend what I planted and let it grow",
        status: "ACTIVE",
        isCharged: true,
        chargedEmotion: "HOPE",
      },
    });
  }
  await prisma.sigilShare.upsert({
    where: { sigilId_userId: { sigilId: sigil.id, userId: recipientId } },
    update: {},
    create: { sigilId: sigil.id, userId: recipientId },
  });
}

async function main() {
  // The acting "you" — same record lib/auth's getCurrentUserId() resolves.
  const dev = await upsertUser({
    email: DEV_USER_EMAIL,
    name: "Agent",
    username: "agent",
    avatar: 0,
  });

  const [harper, bennet, wren] = await Promise.all(DEMO_USERS.map(upsertUser));

  // Demo graph:
  // - you <-> harper  : mutual => a SigiFriend (shareable)
  // - you  -> bennet  : you follow, not yet mutual
  // - wren -> you     : a follower you don't follow back
  await follow(dev.id, harper.id);
  await follow(harper.id, dev.id);
  await follow(dev.id, bennet.id);
  await follow(wren.id, dev.id);
  // A little inter-demo cross-linking so search results show varied states.
  await follow(harper.id, bennet.id);
  await follow(bennet.id, harper.id);

  // Harper (a SigiFriend) shares a sigil with you → populates the scrying mirror.
  await ensureSharedSigil(harper.id, dev.id);

  console.log(
    `Seeded ${DEMO_USERS.length} demo seekers (harper, bennet, wren) + follow graph + 1 shared sigil; dev user = ${dev.username}.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
