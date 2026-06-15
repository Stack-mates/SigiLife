/**
 * /api/stripe/checkout — start a premium purchase.
 * STATUS: implemented (M7)
 *
 * POST: body {plan: "PREMIUM"} → create/reuse Stripe customer, create
 * Checkout session (price ID from env), return {url}. Success/cancel URLs
 * point at /premium. Entitlements are granted ONLY by the webhook, never here.
 *
 * @see docs/API_CONTRACT.md, docs/features/monetization.md
 */
import { z } from "zod";
import { ok, err } from "@/lib/api";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe, PRICE_IDS, getOrCreateCustomer } from "@/lib/stripe";

const BodySchema = z.object({
  plan: z.enum(["PREMIUM"]),
});

export async function POST(request: Request) {
  // 1. Parse + validate body.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return err("VALIDATION", "Request body must be valid JSON.");
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return err(
      "VALIDATION",
      parsed.error.issues.map((i) => i.message).join("; ")
    );
  }

  // 2. Resolve current user.
  const userId = await getCurrentUserId();

  // 3. Get user email (needed for Stripe customer creation).
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });

  if (!user) {
    return err("UNAUTHORIZED", "User not found.");
  }

  // 4. Get or create a Stripe customer.
  let customerId: string;
  try {
    customerId = await getOrCreateCustomer(userId, user.email);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to resolve Stripe customer.";
    return err("INTERNAL", message);
  }

  // 5. Create Stripe Checkout session.
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: PRICE_IDS.PREMIUM_MONTHLY, quantity: 1 }],
      success_url: `${appUrl}/premium?success=1`,
      cancel_url: `${appUrl}/premium`,
      metadata: { sigilife_user_id: userId },
    });

    return ok({ url: session.url });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to create Stripe Checkout session.";
    return err("INTERNAL", message);
  }
}
