import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        isConnected: false,
        error: "Missing Supabase credentials",
        type: "env_missing",
        message: "No .env file needed - run with Doppler instead!",
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Call the Stripe health check Edge Function
    const { data, error } = await supabase.functions.invoke(
      "stripe-health-check",
      {
        method: "POST",
        body: { name: "Functions" },
      }
    );

    if (error) {
      console.error("Error calling Stripe health check function:", error);
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Stripe health check error:", error);
    return NextResponse.json({
      isConnected: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to check Stripe connection",
      type: "connection_error",
    });
  }
}

// Also add GET to handle browser requests
export async function GET() {
  return POST();
}
