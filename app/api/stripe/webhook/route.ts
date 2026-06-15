/**
 * /api/stripe/webhook — Stripe → SigiLife state sync.
 * STATUS: implemented (M7)
 *
 * THE only writer of Subscription + Entitlement rows (besides lib/stripe's
 * getOrCreateCustomer which creates a bare FREE row on checkout start).
 *
 * Verifies Stripe signature on raw body. Handles:
 *   checkout.session.completed       → upsert Subscription + grant entitlements
 *   customer.subscription.updated    → sync plan + recompute entitlements
 *   customer.subscription.deleted    → downgrade to FREE + remove entitlements
 *
 * Idempotent — Stripe retries on non-2xx. Always return 200 for events we
 * don't handle; return 400 only on bad signatures.
 *
 * Note: stripe v22 (dahlia API) removed current_period_end from Subscription;
 * we store billing_cycle_anchor as the next renewal reference instead.
 *
 * @see docs/API_CONTRACT.md, docs/features/monetization.md
 */
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { Plan } from "@prisma/client";

// ── Entitlement recomputation ─────────────────────────────────────────────────

async function recomputeEntitlements(
  userId: string,
  plan: Plan
): Promise<void> {
  if (plan === "PREMIUM") {
    // Grant premium entitlements (upsert = idempotent).
    await Promise.all([
      prisma.entitlement.upsert({
        where: { userId_key: { userId, key: "sigil_slots" } },
        create: { userId, key: "sigil_slots", value: 36, source: "SUBSCRIPTION" },
        update: { value: 36, source: "SUBSCRIPTION" },
      }),
      prisma.entitlement.upsert({
        where: { userId_key: { userId, key: "premium_styles" } },
        create: { userId, key: "premium_styles", value: true, source: "SUBSCRIPTION" },
        update: { value: true, source: "SUBSCRIPTION" },
      }),
    ]);
  } else {
    // Remove subscription-sourced entitlements; keep GRANT rows.
    await prisma.entitlement.deleteMany({
      where: { userId, source: "SUBSCRIPTION" },
    });
  }
}

// ── Webhook handler ───────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const rawBody = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set.");
    return NextResponse.json({ error: "Webhook secret not configured." }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Signature verification failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // ── Event dispatch ──────────────────────────────────────────────────────────

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.sigilife_user_id;
        const stripeSubscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;

        if (!userId || !stripeSubscriptionId) {
          console.warn("checkout.session.completed: missing userId or subscriptionId", {
            sessionId: session.id,
          });
          break;
        }

        await prisma.subscription.update({
          where: { userId },
          data: {
            stripeSubscriptionId,
            plan: "PREMIUM",
            status: "active",
          },
        });

        await recomputeEntitlements(userId, "PREMIUM");
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;

        const subscriptionRow = await prisma.subscription.findUnique({
          where: { stripeSubscriptionId: sub.id },
          select: { userId: true },
        });

        if (!subscriptionRow) {
          console.warn("customer.subscription.updated: no matching subscription row for", sub.id);
          break;
        }

        const { userId } = subscriptionRow;
        const plan: Plan = sub.status === "active" ? "PREMIUM" : "FREE";

        // billing_cycle_anchor is the next billing reference date (unix timestamp).
        // Store it as currentPeriodEnd for UI display of "renews on" date.
        const periodEnd = sub.billing_cycle_anchor
          ? new Date(sub.billing_cycle_anchor * 1000)
          : null;

        await prisma.subscription.update({
          where: { userId },
          data: {
            status: sub.status,
            plan,
            ...(periodEnd !== null ? { currentPeriodEnd: periodEnd } : {}),
          },
        });

        await recomputeEntitlements(userId, plan);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;

        const subscriptionRow = await prisma.subscription.findUnique({
          where: { stripeSubscriptionId: sub.id },
          select: { userId: true },
        });

        if (!subscriptionRow) {
          console.warn("customer.subscription.deleted: no matching subscription row for", sub.id);
          break;
        }

        const { userId } = subscriptionRow;

        await prisma.subscription.update({
          where: { userId },
          data: {
            plan: "FREE",
            status: "canceled",
          },
        });

        await recomputeEntitlements(userId, "FREE");
        break;
      }

      default:
        // Return 200 for events we don't handle — Stripe expects it.
        break;
    }
  } catch (e) {
    console.error(`Error handling Stripe event ${event.type}:`, e);
    // Return 500 so Stripe will retry.
    return NextResponse.json({ error: "Internal error processing event." }, { status: 500 });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
