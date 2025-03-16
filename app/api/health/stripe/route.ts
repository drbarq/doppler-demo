import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET() {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!stripeSecretKey || !stripePublishableKey) {
      return NextResponse.json({
        isConnected: false,
        error: "Missing Stripe credentials",
      });
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    // Simple test call to Stripe API
    await stripe.balance.retrieve();

    return NextResponse.json({ isConnected: true });
  } catch (error) {
    return NextResponse.json({
      isConnected: false,
      error:
        error instanceof Error ? error.message : "Failed to connect to Stripe",
    });
  }
}
