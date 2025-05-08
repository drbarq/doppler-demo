import { NextResponse } from "next/server";

export async function POST() {
  try {
    const stripeHealthUrl = process.env.NEXT_PUBLIC_STRIPE_HEALTH_URL;
    if (!stripeHealthUrl) {
      return NextResponse.json({
        isConnected: false,
        error: "Missing Stripe Health endpoint URL",
        type: "env_missing",
        message: "Set NEXT_PUBLIC_STRIPE_HEALTH_URL in your environment variables.",
      });
    }
    const response = await fetch(stripeHealthUrl);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Stripe health check error:", error);
    return NextResponse.json({
      isConnected: false,
      error: error instanceof Error ? error.message : "Failed to check Stripe connection",
      type: "connection_error",
    });
  }
}

// Also add GET to handle browser requests
export async function GET() {
  return POST();
}
