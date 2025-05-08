import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { endpoint: string } }
) {
  try {
    const { endpoint } = params;
    const stripeDataUrl = process.env.NEXT_PUBLIC_STRIPE_DATA_URL;
    if (!stripeDataUrl) {
      return NextResponse.json({
        success: false,
        error: "Missing Stripe Data endpoint URL",
        type: "env_missing",
        message: "Set NEXT_PUBLIC_STRIPE_DATA_URL in your environment variables.",
      });
    }
    const response = await fetch(stripeDataUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ endpoint }),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error calling Stripe Data Lambda:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      },
      { status: 500 }
    );
  }
}
